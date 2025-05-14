"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Question } from "@/lib/questions/javascript";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CodeWhisperer } from "@/components/code-whisperer";
import { useLanguage } from "@/i18n/context";

export default function PracticePage() {
  const params = useParams();
  const router = useRouter();
  const topic = params.topic as string;
  const { language, t } = useLanguage();

  // Questions based on topic
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Current state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  // Justification state
  const [justification, setJustification] = useState("");
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [evaluatingFeedback, setEvaluatingFeedback] = useState(false);

  // Load questions from API
  useEffect(() => {
    async function fetchQuestions() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/questions?topic=${topic}&randomize=true`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }

        const data = await response.json();

        if (data.success && data.data.length > 0) {
          setQuestions(data.data);
        } else {
          // Redirect to topics page if topic doesn't exist or has no questions
          router.push("/topics");
        }
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Failed to load questions. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [topic, router]);

  const currentQuestion = questions[currentIndex];

  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = async () => {
    if (!selectedAnswer || isAnswered) return;

    setIsAnswered(true);
    const isCorrect =
      selectedAnswer === currentQuestion.correctAnswer.toString();

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    } else {
      setIncorrectCount((prev) => prev + 1);
    }

    // Evaluate justification if provided
    if (justification.trim()) {
      setEvaluatingFeedback(true);
      try {
        const response = await fetch("/api/evaluate-justification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userJustification: justification,
            questionExplanation: currentQuestion.explanation[language],
            isCorrect,
          }),
        });

        const data = await response.json();
        if (data.success) {
          setAiFeedback(data.feedback);
        }
      } catch (error) {
        console.error("Error getting AI feedback:", error);
      } finally {
        setEvaluatingFeedback(false);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setJustification("");
      setAiFeedback(null);
    } else {
      router.push(
        `/topics/${topic}/practice/summary?correct=${correctCount}&incorrect=${incorrectCount}&topic=${topic}`
      );
    }
  };

  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setJustification("");
      setAiFeedback(null);
    }
  };

  if (loading) {
    return <div className="container mx-auto p-8 text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto p-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="container mx-auto p-8 text-center">
        No questions available for this topic.
      </div>
    );
  }

  const accuracy =
    correctCount + incorrectCount > 0
      ? Math.round((correctCount / (correctCount + incorrectCount)) * 100)
      : 0;

  return (
    <CodeWhisperer
      currentQuestion={currentIndex + 1}
      totalQuestions={questions.length}
      correct={correctCount}
      incorrect={incorrectCount}
      accuracy={accuracy}
    >
      {/* Question card */}
      <div className="w-2/3 mx-auto">
        <div className="border rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="px-2 py-1 text-xs bg-gray-100 rounded font-medium">
              {currentQuestion.difficulty}
            </span>
          </div>

          <h2 className="text-xl font-semibold mb-4">
            {currentQuestion.question[language]}
          </h2>

          {currentQuestion.code && (
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-md mb-6 overflow-x-auto">
              <code>{currentQuestion.code}</code>
            </pre>
          )}

          {/* Answer options */}
          <div className="space-y-3 mb-6">
            {currentQuestion.options?.[language].map((option, index) => (
              <button
                key={index}
                className={`w-full text-left p-3 rounded-md border ${
                  selectedAnswer === option
                    ? isAnswered
                      ? option === currentQuestion.correctAnswer.toString()
                        ? "bg-green-50 border-green-500"
                        : "bg-red-50 border-red-500"
                      : "bg-blue-50 border-blue-500"
                    : isAnswered &&
                      option === currentQuestion.correctAnswer.toString()
                    ? "bg-green-50 border-green-500"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => handleAnswerSelect(option)}
                disabled={isAnswered}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Justification textarea */}
          <div className="mb-6">
            <label
              htmlFor="justification"
              className="block text-sm font-medium mb-2"
            >
              Justify your answer:
            </label>
            <Textarea
              id="justification"
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              placeholder="Explain your reasoning for this answer..."
              disabled={isAnswered}
              className="min-h-[100px]"
            />
          </div>

          {/* AI Feedback */}
          {evaluatingFeedback && (
            <div className="bg-yellow-50 p-4 rounded-md mb-6">
              <p className="text-yellow-800">
                Evaluating your justification...
              </p>
            </div>
          )}

          {aiFeedback && (
            <div className="bg-purple-50 p-4 rounded-md mb-6">
              <h3 className="font-semibold mb-2 text-purple-800">
                AI Feedback on Your Reasoning:
              </h3>
              <p className="text-purple-700">{aiFeedback}</p>
            </div>
          )}

          {/* Explanation (shown after answering) */}
          {isAnswered && (
            <div className="bg-blue-50 p-4 rounded-md mb-6">
              <h3 className="font-semibold mb-2">
                {t("practice.explanation")}
              </h3>
              <p>{currentQuestion.explanation[language]}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevQuestion}
              disabled={currentIndex === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              {t("practice.previous")}
            </Button>

            {!isAnswered ? (
              <Button
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {t("practice.submit")}
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
              >
                {currentIndex === questions.length - 1
                  ? t("practice.seeResults")
                  : t("practice.next")}
                <ArrowRight size={16} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </CodeWhisperer>
  );
}
