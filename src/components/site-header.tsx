"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/i18n/context";

export function SiteHeader() {
  const { t } = useLanguage();

  return (
    <header className="p-4 flex items-center justify-between border-b">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/interview-logo.svg"
            alt="InterviewPro"
            width={24}
            height={24}
            className="mr-2"
          />
          <span className="font-semibold text-xl">InterviewPro</span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/topics">{t("header.topics")}</Link>
        </Button>
        {/* <Button className="bg-blue-600 hover:bg-blue-700">
          {t("header.signIn")}
        </Button> */}
      </div>
    </header>
  );
}
