"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLanguage } from "@/i18n/context";
import { SiteHeader } from "@/components/site-header";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Topic {
  id: string;
  name: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  questionCount: number;
}

export default function TopicsPage() {
  const { t, language } = useLanguage();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/topics");

        if (!response.ok) {
          throw new Error("Failed to fetch topics");
        }

        const data = await response.json();
        if (data.success) {
          setTopics(data.data);
        } else {
          throw new Error(data.error || "Failed to fetch topics");
        }
      } catch (err) {
        console.error("Error fetching topics:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

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

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading topics...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 h-64 flex items-center justify-center">
            <p>{error}</p>
          </div>
        ) : (
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
                  {topic.name[language as keyof typeof topic.name]}
                </h3>
                <p className="text-gray-600 mb-4">
                  {
                    topic.description[
                      language as keyof typeof topic.description
                    ]
                  }
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
        )}
      </div>
    </div>
  );
}
