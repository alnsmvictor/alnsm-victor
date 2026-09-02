import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import {
  ExperienceMissionList,
  type ExperienceItem,
} from "@/components/experience/ExperienceMissionList";
import styles from "./page.module.css";

function BackIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

export default async function ExperiencePage() {
  const t = await getTranslations("Experience");
  const locale = await getLocale();
  const items = t.raw("items") as ExperienceItem[];

  return (
    <main
      className={`${styles.gridBg} ${styles.scanlineBg} relative flex h-screen flex-col overflow-hidden bg-background text-on-surface`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(19,19,19,0.74),rgba(19,19,19,0.96)),linear-gradient(90deg,rgba(173,198,255,0.04),transparent_38%)]" />

      <header className="relative z-30 flex w-full shrink-0 items-center justify-between bg-gradient-to-b from-background/90 to-transparent px-5 py-5 sm:px-8 md:px-12 lg:px-16">
        <Link
          href={`/${locale}`}
          className="text-label-mono flex items-center gap-2 text-primary opacity-80 transition-all duration-300 hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <BackIcon />
          {t("back")}
        </Link>

        <span className="text-headline-sm text-primary opacity-45">
          OPERATOR_01
        </span>
      </header>

      <section className="relative z-10 flex min-h-0 flex-1 flex-col px-5 pb-20 pt-5 sm:px-8 md:px-12 lg:px-16">
        <div className="mb-8 flex shrink-0 flex-col gap-3 md:flex-row md:items-end">
          <h1 className="font-display text-[clamp(3.5rem,8vw,6rem)] font-black uppercase leading-none text-primary">
            {t("title")}
          </h1>
          <p className="text-label-mono text-on-surface-variant opacity-70">
            {t("subtitle")}
          </p>
        </div>

        <hr className="mb-8 shrink-0 border-outline-variant/40" />

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 lg:grid-cols-12">
          <aside className="hidden pt-4 opacity-70 lg:col-span-2 lg:flex lg:flex-col lg:gap-3">
            <p className="text-label-mono text-primary">[ W ] Scroll Up</p>
            <p className="text-label-mono text-primary">[ S ] Scroll Down</p>
          </aside>

          <ExperienceMissionList
            items={items}
            scrollClassName={styles.hudScrollbar}
            modalEyebrow={t("modalEyebrow")}
            technicalStackLabel={t("technicalStack")}
            modalCloseLabel={t("modalClose")}
            verifiedLabel={t("verified")}
            accessLevelLabel={t("accessLevel")}
          />
        </div>
      </section>

      <footer className="fixed bottom-0 right-0 z-20 flex w-full justify-end bg-gradient-to-t from-background to-transparent px-5 py-5 sm:px-8 md:px-12 lg:px-16">
        <span className="text-label-mono text-on-surface-variant opacity-60">
          {t("footer")}
        </span>
      </footer>
    </main>
  );
}
