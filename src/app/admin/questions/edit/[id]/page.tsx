"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface QuestionFormData {
  topic: string;
  difficulty: string;
  type: string;
  question: {
    en: string;
    es: string;
  };
  code: string;
  options: {
    en: string[];
    es: string[];
  };
  correctAnswer: string;
  explanation: {
    en: string;
    es: string;
  };
}

export default function EditQuestionPage() {
  const router = useRouter();
  const params = useParams();
  const questionId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<QuestionFormData>({
    topic: "",
    difficulty: "",
    type: "",
    question: {
      en: "",
      es: "",
    },
    code: "",
    options: {
      en: ["", "", "", ""],
      es: ["", "", "", ""],
    },
    correctAnswer: "",
    explanation: {
      en: "",
      es: "",
    },
  });

  // Fetch question data
  useEffect(() => {
    async function fetchQuestion() {
      try {
        const response = await fetch(`/api/questions/${questionId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch question");
        }

        const data = await response.json();

        if (data.success) {
          const question = data.data;

          // Ensure options have 4 items (for the UI)
          const enOptions = question.options?.en || [];
          const esOptions = question.options?.es || [];

          while (enOptions.length < 4) {
            enOptions.push("");
          }

          while (esOptions.length < 4) {
            esOptions.push("");
          }

          setFormData({
            topic: question.topic || "",
            difficulty: question.difficulty || "",
            type: question.type || "",
            question: question.question || { en: "", es: "" },
            code: question.code || "",
            options: {
              en: enOptions,
              es: esOptions,
            },
            correctAnswer: question.correctAnswer?.toString() || "",
            explanation: question.explanation || { en: "", es: "" },
          });
        } else {
          setError("Failed to load question data");
        }
      } catch (err) {
        console.error("Error fetching question:", err);
        setError("Failed to load question. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchQuestion();
  }, [questionId]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [field, lang] = name.split(".");

      if (field === "question" || field === "explanation") {
        setFormData({
          ...formData,
          [field]: {
            ...(formData[field as keyof typeof formData] as Record<
              string,
              string
            >),
            [lang]: value,
          },
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleOptionChange = (
    index: number,
    language: "en" | "es",
    value: string
  ) => {
    const newOptions = { ...formData.options };
    newOptions[language][index] = value;

    setFormData({
      ...formData,
      options: newOptions,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Submit to API
      const response = await fetch(`/api/questions/${questionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update question");
      }

      // Redirect to admin questions page
      router.push("/admin/questions");
    } catch (err) {
      console.error("Error updating question:", err);
      setError("Failed to update question. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <div className="container mx-auto py-8 px-4 text-center">
          Loading question data...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/questions">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Questions
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Edit Question</h1>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 mb-6 rounded-md">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Topic */}
            <div>
              <label htmlFor="topic" className="block text-sm font-medium mb-1">
                Topic
              </label>
              <select
                id="topic"
                name="topic"
                value={formData.topic}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="javascript">JavaScript</option>
                <option value="react">React</option>
                <option value="css">CSS</option>
                <option value="html">HTML</option>
                <option value="typescript">TypeScript</option>
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label
                htmlFor="difficulty"
                className="block text-sm font-medium mb-1"
              >
                Difficulty
              </label>
              <select
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            {/* Type */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium mb-1">
                Question Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="multiple-choice">Multiple Choice</option>
                <option value="code-output">Code Output</option>
                <option value="true-false">True/False</option>
              </select>
            </div>
          </div>

          {/* Question (English) */}
          <div className="mb-6">
            <label
              htmlFor="question.en"
              className="block text-sm font-medium mb-1"
            >
              Question (English)
            </label>
            <input
              type="text"
              id="question.en"
              name="question.en"
              value={formData.question.en}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Question (Spanish) */}
          <div className="mb-6">
            <label
              htmlFor="question.es"
              className="block text-sm font-medium mb-1"
            >
              Question (Spanish)
            </label>
            <input
              type="text"
              id="question.es"
              name="question.es"
              value={formData.question.es}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Code Block */}
          <div className="mb-6">
            <label htmlFor="code" className="block text-sm font-medium mb-1">
              Code Block (optional)
            </label>
            <textarea
              id="code"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              rows={6}
              className="w-full p-2 border rounded-md font-mono"
            />
          </div>

          {/* Options */}
          {formData.type !== "true-false" && (
            <div className="mb-6">
              <h3 className="text-md font-medium mb-3">Options</h3>

              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">English Options</h4>
                {formData.options.en.map((option, index) => (
                  <div key={`option-en-${index}`} className="mb-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(index, "en", e.target.value)
                        }
                        className="w-full p-2 border rounded-md"
                        placeholder={`Option ${index + 1}`}
                        required={formData.type !== "true-false"}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Spanish Options</h4>
                {formData.options.es.map((option, index) => (
                  <div key={`option-es-${index}`} className="mb-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(index, "es", e.target.value)
                        }
                        className="w-full p-2 border rounded-md"
                        placeholder={`Opción ${index + 1}`}
                        required={formData.type !== "true-false"}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Correct Answer */}
          <div className="mb-6">
            <label
              htmlFor="correctAnswer"
              className="block text-sm font-medium mb-1"
            >
              Correct Answer
            </label>
            <input
              type="text"
              id="correctAnswer"
              name="correctAnswer"
              value={formData.correctAnswer}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              For multiple choice, enter the exact text of the correct option.
              For true/false, enter "true" or "false".
            </p>
          </div>

          {/* Explanation (English) */}
          <div className="mb-6">
            <label
              htmlFor="explanation.en"
              className="block text-sm font-medium mb-1"
            >
              Explanation (English)
            </label>
            <textarea
              id="explanation.en"
              name="explanation.en"
              value={formData.explanation.en}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Explanation (Spanish) */}
          <div className="mb-6">
            <label
              htmlFor="explanation.es"
              className="block text-sm font-medium mb-1"
            >
              Explanation (Spanish)
            </label>
            <textarea
              id="explanation.es"
              name="explanation.es"
              value={formData.explanation.es}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={submitting}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6"
            >
              {submitting ? "Updating..." : "Update Question"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
