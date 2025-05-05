"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Question, javascriptQuestions } from "@/lib/questions/javascript";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CodeWhisperer } from "@/components/code-whisperer";

export default function PracticePage() {
  const params = useParams();
  const router = useRouter();
  const topic = params.topic as string;

  // Questions based on topic
  const [questions, setQuestions] = useState<Question[]>([]);

  // Current state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  // Load questions based on topic
  useEffect(() => {
    if (topic === "javascript") {
      setQuestions(javascriptQuestions);
    } else {
      // Redirect to topics page if topic doesn't exist or has no questions
      router.push("/topics");
    }
  }, [topic, router]);

  const currentQuestion = questions[currentIndex];

  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || isAnswered) return;

    setIsAnswered(true);

    if (selectedAnswer === currentQuestion.correctAnswer.toString()) {
      setCorrectCount((prev) => prev + 1);
    } else {
      setIncorrectCount((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      // Navigate to summary page with results as query params
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
    }
  };

  if (questions.length === 0) {
    return <div className="container mx-auto p-8 text-center">Loading...</div>;
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
            {currentQuestion.question}
          </h2>

          {currentQuestion.code && (
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-md mb-6 overflow-x-auto">
              <code>{currentQuestion.code}</code>
            </pre>
          )}

          {/* Answer options */}
          <div className="space-y-3 mb-6">
            {currentQuestion.options?.map((option, index) => (
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

          {/* Explanation (shown after answering) */}
          {isAnswered && (
            <div className="bg-blue-50 p-4 rounded-md mb-6">
              <h3 className="font-semibold mb-2">Explanation</h3>
              <p>{currentQuestion.explanation}</p>
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
              Previous
            </Button>

            {!isAnswered ? (
              <Button
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Submit Answer
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
              >
                {currentIndex === questions.length - 1 ? "See Results" : "Next"}
                <ArrowRight size={16} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </CodeWhisperer>
  );
}
