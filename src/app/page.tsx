"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/i18n/context";
import { SiteHeader } from "@/components/site-header";
import { Topic } from "@/components/topic";

export default function Home() {
  const { t } = useLanguage();
  const topics = ["javascript", "react", "css", "html", "typescript", "python"];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <SiteHeader />

      {/* Hero Section */}
      <main className="flex-1 flex flex-col">
        <section className="py-16 px-4 text-center bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center items-center mb-6">
              <span className="ml-2 text-sm text-gray-600">
                {t("hero.subtitle")}
              </span>
            </div>
            <h1 className="text-4xl  md:text-5xl lg:text-6xl font-bold mb-4">
              {t("hero.title")}
            </h1>
            <p className="text-gray-600 mb-8">{t("hero.description")}</p>
            <div className="flex justify-center gap-4">
              <Link href="/topics">
                <Button
                  variant="default"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {t("hero.viewTopics")}
                </Button>
              </Link>
              <Link href="/topics/javascript/practice">
                <Button variant="outline">{t("hero.startPractice")}</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Topics Section */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-2">
              {t("topics.title")}
            </h2>
            <p className="text-gray-600 text-center mb-8">
              {t("topics.subtitle")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* JavaScript Card */}
              {topics.map((topic) => (
                <Topic
                  key={topic}
                  img={`/${topic}.svg`}
                  title={t(`topics.${topic}.title`)}
                  description={t(`topics.${topic}.description`)}
                />
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Link href="/topics">
                <Button variant="outline">{t("topics.startPractice")}</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">
              {t("features.title")}
            </h2>
            <p className="text-center text-gray-600 mb-12">
              {t("features.subtitle")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-6 rounded-lg">
                <div className="bg-blue-100 w-10 h-10 flex items-center justify-center rounded-md mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-600"
                  >
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {t("features.topicBasedPractice.title")}
                </h3>
                <p className="text-gray-600">
                  {t("features.topicBasedPractice.description")}
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-6 rounded-lg">
                <div className="bg-blue-100 w-10 h-10 flex items-center justify-center rounded-md mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-600"
                  >
                    <path d="M12 8v4l3 3" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {t("features.difficultyLevels.title")}
                </h3>
                <p className="text-gray-600">
                  {t("features.difficultyLevels.description")}
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-6 rounded-lg">
                <div className="bg-blue-100 w-10 h-10 flex items-center justify-center rounded-md mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-600"
                  >
                    <path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" />
                    <line x1="2" x2="22" y1="20" y2="20" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {t("features.detailedExplanations.title")}
                </h3>
                <p className="text-gray-600">
                  {t("features.detailedExplanations.description")}
                </p>
              </div>

              {/* Feature 4
              <div className="bg-white p-6 rounded-lg">
                <div className="bg-blue-100 w-10 h-10 flex items-center justify-center rounded-md mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-600"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {t("features.progressTracking.title")}
                </h3>
                <p className="text-gray-600">
                  {t("features.progressTracking.description")}
                </p>
              </div> */}

              {/* Feature 5
              <div className="bg-white p-6 rounded-lg">
                <div className="bg-blue-100 w-10 h-10 flex items-center justify-center rounded-md mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-600"
                  >
                    <path d="M15 5v2" />
                    <path d="M15 11v2" />
                    <path d="M15 17v2" />
                    <path d="M7 5a5 5 0 0 1 4 8 5 5 0 0 1-4 8" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {t("features.audioExplanations.title")}
                </h3>
                <p className="text-gray-600">
                  {t("features.audioExplanations.description")}
                </p>
              </div> */}

              {/* Feature 6 */}
              {/* <div className="bg-white p-6 rounded-lg">
                <div className="bg-blue-100 w-10 h-10 flex items-center justify-center rounded-md mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-600"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {t("features.performanceAnalytics.title")}
                </h3>
                <p className="text-gray-600">
                  {t("features.performanceAnalytics.description")}
                </p>
              </div> */}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-blue-600 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">{t("cta.title")}</h2>
            <p className="mb-8">{t("cta.description")}</p>
            <Link href="/topics/javascript/practice">
              <Button
                variant="default"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                {t("cta.startPracticing")}
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-gray-500 text-sm">
        <div className="flex justify-center items-center">
          <span className="mr-1">{t("footer.builtWith")}</span>
          <a
            href="https://x.com/arturoxdev"
            className="text-black hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            @arturoxdev
          </a>
        </div>
      </footer>
    </div>
  );
}
