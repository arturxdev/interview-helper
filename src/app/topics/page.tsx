"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLanguage } from "@/i18n/context";
import { SiteHeader } from "@/components/site-header";
import Image from "next/image";

export default function TopicsPage() {
  const { t } = useLanguage();

  const topics = [
    {
      id: "javascript",
      questionCount: 5,
    },
    {
      id: "react",
      questionCount: 0,
    },
    {
      id: "css",
      questionCount: 0,
    },
    {
      id: "html",
      questionCount: 0,
    },
    {
      id: "typescript",
      questionCount: 0,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Practice Topics</h1>
          <Link href="/">
            <Button variant="outline">{t("back.home")}</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <Image
                className="mb-4"
                src={`/${topic.id}.svg`}
                alt={topic.id}
                width={24}
                height={24}
              />
              <h3 className="text-2xl font-semibold mb-2">
                {t(`topics.${topic.id}.title`)}
              </h3>
              <p className="text-gray-600 mb-4">
                {t(`topics.${topic.id}.description`)}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {topic.questionCount} questions
                </span>
                <Link href={`/topics/${topic.id}/practice`}>
                  <Button
                    variant="default"
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={topic.questionCount === 0}
                  >
                    {topic.questionCount > 0
                      ? t("practice.startPractice")
                      : t("practice.comingSoon")}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
