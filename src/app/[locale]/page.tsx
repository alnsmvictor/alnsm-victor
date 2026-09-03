import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { HomeKeyboardMenu } from "@/components/navigation/HomeKeyboardMenu";
import styles from "./page.module.css";

type IconName = "user" | "briefcase" | "terminal" | "bolt" | "mail";

function MenuIcon({ name }: { name: IconName }) {
  const sharedProps = {
    className: "h-6 w-6 md:h-5 md:w-5",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  const icons = {
    user: (
      <svg {...sharedProps}>
        <path d="M20 21a8 8 0 0 0-16 0" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    briefcase: (
      <svg {...sharedProps}>
        <path d="M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1" />
        <rect x="3" y="6" width="18" height="14" rx="1" />
        <path d="M3 12h18" />
      </svg>
    ),
    terminal: (
      <svg {...sharedProps}>
        <path d="m7 8 4 4-4 4" />
        <path d="M13 16h4" />
        <rect x="3" y="4" width="18" height="16" rx="1" />
      </svg>
    ),
    bolt: (
      <svg {...sharedProps}>
        <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
      </svg>
    ),
    mail: (
      <svg {...sharedProps}>
        <rect x="3" y="5" width="18" height="14" rx="1" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  };

  return icons[name];
}

export default async function Home() {
  const t = await getTranslations("Home");
  const locale = await getLocale();
  const nextLocale = locale === "pt" ? "en" : "pt";
  const menuItems = [
    {
      key: "profile",
      href: "#profile",
      icon: "user" as const,
      label: t("menu.profile"),
    },
    {
      key: "experience",
      href: `/${locale}/experience`,
      icon: "briefcase" as const,
      label: t("menu.experience"),
    },
    {
      key: "skills",
      href: `/${locale}/skills`,
      icon: "bolt" as const,
      label: t("menu.skills"),
    },
    {
      key: "contact",
      href: `/${locale}/contact`,
      icon: "mail" as const,
      label: t("menu.contact"),
    },
  ];

  return (
    <main
      className={`${styles.gridBg} ${styles.scanlineBg} relative flex min-h-screen overflow-hidden bg-background text-on-surface`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(19,19,19,0.18),rgba(19,19,19,0.72)),linear-gradient(180deg,rgba(19,19,19,0.18),rgba(19,19,19,0.95))]" />

      <Link
        href={`/${nextLocale}`}
        aria-label={t("languageAria")}
        className="text-label-mono fixed right-5 top-5 z-30 flex min-h-11 items-center gap-3 border border-primary/50 bg-primary/10 px-4 text-primary shadow-[0_0_24px_rgba(173,198,255,0.12)] backdrop-blur-md transition-all duration-300 hover:bg-primary hover:text-on-primary hover:shadow-[0_0_36px_rgba(173,198,255,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:right-8 md:top-8"
      >
        <span className="h-2 w-2 animate-pulse bg-current" />
        <span>{locale.toUpperCase()}</span>
        <span className="opacity-70">{t("languageButton")}</span>
      </Link>

      <section className="relative z-10 flex min-h-screen w-full flex-col px-5 pb-12 pt-32 sm:px-8 md:px-12 md:pb-24 md:pt-[calc(var(--spacing)*70)] lg:px-16">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center md:mx-0 md:items-start md:text-left">
          <div className="mb-5 flex w-full max-w-sm items-center justify-center gap-3 border-l-2 border-primary bg-primary/10 px-4 py-2 text-left shadow-[0_0_22px_rgba(173,198,255,0.06)] md:w-fit md:max-w-none md:justify-start">
            <MenuIcon name="terminal" />
            <p className="text-label-mono text-primary">{t("status")}</p>
            <span className="h-1.5 w-1.5 animate-pulse bg-primary" />
          </div>

          <h1 className="font-display pt-20 text-[clamp(4.4rem,18vw,7.5rem)] font-black uppercase leading-[0.86] tracking-normal text-white sm:pt-24 md:pt-0 md:text-[clamp(3.8rem,10vw,7.5rem)]">
            {t("name")}
          </h1>

          <p className="text-label-mono mt-5 max-w-sm text-center text-primary md:max-w-none md:text-left">
            {t("eyebrow")}
          </p>

          <div className="relative mt-8 hidden w-full max-w-sm border border-outline-variant bg-surface/45 px-5 py-4 text-left backdrop-blur-sm sm:max-w-2xl sm:px-7 md:block md:max-w-3xl md:py-5">
            <span className="absolute bottom-[-1px] left-[-1px] h-2 w-2 border-b border-l border-primary/60" />
            <span className="absolute bottom-[-1px] right-[-1px] h-2 w-2 border-b border-r border-primary/60" />
            <span className="absolute right-5 top-1/2 h-4 w-1 -translate-y-1/2 animate-pulse bg-primary" />

            <p className="font-mono text-xl font-semibold leading-9 text-on-surface-variant">
              {t("description")}
            </p>
          </div>
        </div>

        <HomeKeyboardMenu ariaLabel={t("menuLabel")} items={menuItems} />
      </section>

      <footer className="fixed bottom-0 z-20 hidden w-full items-center justify-between border-t border-outline-variant bg-background/95 px-8 py-2 backdrop-blur-sm md:flex lg:px-12">
        <div className="flex gap-10">
          <span className="text-label-mono text-tertiary opacity-80">
            {t("footerNavigate")}
          </span>
          <span className="text-label-mono text-tertiary opacity-80">
            {t("footerSelect")}
          </span>
        </div>

        <div className="flex gap-10">
          <span className="text-label-mono text-on-surface opacity-65">
            {t("footerStatus")}
          </span>
          <span className="text-label-mono text-on-surface opacity-65">
            {t("footerLocation")}
          </span>
        </div>
      </footer>
    </main>
  );
}
