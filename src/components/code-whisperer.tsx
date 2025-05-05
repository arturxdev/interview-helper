"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";

type CodeWhispererProps = {
  currentQuestion: number;
  totalQuestions: number;
  correct: number;
  incorrect: number;
  accuracy: number;
  children: React.ReactNode;
};

export function CodeWhisperer({
  currentQuestion,
  totalQuestions,
  correct,
  incorrect,
  accuracy,
  children,
}: CodeWhispererProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <SiteHeader />

      {/* Question Progress */}
      <div className="px-4 py-2 mt-4 w-2/3 mx-auto">
        <div className="flex items-center justify-between">
          <div>
            Question {currentQuestion} of {totalQuestions}
          </div>
          <div className="flex items-center gap-4">
            <span>Correct: {correct}</span>
            <span>|</span>
            <span>Incorrect: {incorrect}</span>
            <span>|</span>
            <span>Accuracy: {accuracy}%</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 h-2 mt-2 rounded-full">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-auto p-4">{children}</main>
    </div>
  );
}
