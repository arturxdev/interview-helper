"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, X, ChevronRight, RefreshCw } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

export default function SummaryPage() {
  const searchParams = useSearchParams();
  const correct = parseInt(searchParams.get("correct") || "0");
  const incorrect = parseInt(searchParams.get("incorrect") || "0");
  const topic = searchParams.get("topic") || "";

  const total = correct + incorrect;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  let message = "";
  if (accuracy >= 90) {
    message = "Outstanding! You&apos;ve mastered this topic.";
  } else if (accuracy >= 70) {
    message = "Great job! You have a solid understanding.";
  } else if (accuracy >= 50) {
    message = "Good effort. With some practice, you&apos;ll improve.";
  } else {
    message = "Keep practicing. You&apos;ll get better with time.";
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <div className="container mx-auto py-12 px-4 max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Practice Summary</h1>
          <p className="text-gray-600">
            Here&apos;s how you did on the {topic} questions
          </p>
        </div>

        <div className="bg-white border rounded-lg shadow-sm p-8 mb-8">
          <div className="flex justify-center mb-8">
            <div className="relative w-48 h-48">
              <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-4xl font-bold">{accuracy}%</span>
              </div>
              <svg
                className="absolute top-0 left-0 w-full h-full"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#eaeaea"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={
                    accuracy >= 70
                      ? "#22c55e"
                      : accuracy >= 50
                      ? "#eab308"
                      : "#ef4444"
                  }
                  strokeWidth="10"
                  strokeDasharray={`${accuracy * 2.83} 283`}
                  strokeDashoffset="0"
                  transform="rotate(-90 50 50)"
                />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="text-center p-4 border rounded-lg bg-green-50 border-green-100">
              <div className="flex justify-center mb-2">
                <Check className="text-green-600" size={24} />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-1">
                {correct}
              </div>
              <div className="text-sm text-gray-500">Correct</div>
            </div>

            <div className="text-center p-4 border rounded-lg bg-red-50 border-red-100">
              <div className="flex justify-center mb-2">
                <X className="text-red-600" size={24} />
              </div>
              <div className="text-3xl font-bold text-red-600 mb-1">
                {incorrect}
              </div>
              <div className="text-sm text-gray-500">Incorrect</div>
            </div>
          </div>

          <div className="text-center p-4 bg-blue-50 rounded-lg mb-8">
            <p className="text-lg">{message}</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href={`/topics/${topic}/practice`}>
              <Button
                variant="outline"
                className="w-full sm:w-auto flex items-center gap-2"
              >
                <RefreshCw size={16} />
                Practice Again
              </Button>
            </Link>

            <Link href="/topics">
              <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                Try Another Topic
                <ChevronRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
