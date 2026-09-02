import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";

type IconName = "user" | "briefcase" | "terminal" | "bolt" | "mail";

const menuItems: Array<{
  key: "profile" | "experience" | "projects" | "skills" | "contact";
  href: string;
  icon: IconName;
}> = [
  { key: "profile", href: "#profile", icon: "user" },
  { key: "experience", href: "#experience", icon: "briefcase" },
  { key: "projects", href: "#projects", icon: "terminal" },
  { key: "skills", href: "#skills", icon: "bolt" },
  { key: "contact", href: "#contact", icon: "mail" },
];

function MenuIcon({ name }: { name: IconName }) {
  const sharedProps = {
    className: "h-5 w-5",
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

  return (
    <main className="grid-bg scanline-bg relative flex min-h-screen overflow-hidden bg-background text-on-surface">
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

      <section className="relative z-10 flex min-h-screen w-full flex-col px-5 pb-24 pt-20 sm:px-8 md:px-12 md:pt-[calc(var(--spacing)*70)] lg:px-16">
        <div className="w-full max-w-5xl">
          <div className="mb-5 flex w-fit items-center gap-3 border-l-2 border-primary bg-primary/10 px-4 py-2 shadow-[0_0_22px_rgba(173,198,255,0.06)]">
            <MenuIcon name="terminal" />
            <p className="text-label-mono text-primary">{t("status")}</p>
            <span className="h-1.5 w-1.5 animate-pulse bg-primary" />
          </div>

          <h1 className="font-display text-[clamp(3.8rem,10vw,7.5rem)] font-black uppercase leading-[0.9] tracking-normal text-white">
            {t("name")}
          </h1>

          <p className="text-label-mono mt-5 text-primary">{t("eyebrow")}</p>

          <div className="relative mt-8 w-full max-w-3xl border border-outline-variant bg-surface/45 px-5 py-5 backdrop-blur-sm sm:px-7">
            <span className="absolute bottom-[-1px] left-[-1px] h-2 w-2 border-b border-l border-primary/60" />
            <span className="absolute bottom-[-1px] right-[-1px] h-2 w-2 border-b border-r border-primary/60" />
            <span className="absolute right-5 top-1/2 h-4 w-1 -translate-y-1/2 animate-pulse bg-primary" />

            <p className="text-body-lg font-semibold text-on-surface-variant">
              {t("description")}
            </p>
          </div>
        </div>

        <nav
          aria-label={t("menuLabel")}
          className="mt-auto self-end pb-3 pt-16 text-right sm:min-w-80 md:min-w-96 lg:absolute lg:bottom-20 lg:right-10 lg:pt-0"
        >
          <ul className="flex flex-col items-end gap-1">
            {menuItems.map((item, index) => (
              <li key={item.href}>
                <a
                  href={
                    item.key === "experience"
                      ? `/${locale}/experience`
                      : item.key === "skills"
                        ? `/${locale}/skills`
                        : item.href
                  }
                  className={`group flex min-h-9 items-center justify-end gap-3 px-4 py-1.5 transition-all duration-500 ease-out hover:bg-[linear-gradient(90deg,transparent,rgba(173,198,255,0.08),transparent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${
                    index === 0 ? "text-primary opacity-100" : "opacity-55"
                  } hover:text-primary hover:opacity-100`}
                >
                  <span className="text-headline-md uppercase leading-none transition-[text-shadow] duration-500 group-hover:[text-shadow:0_0_12px_rgba(173,198,255,0.45)]">
                    {t(`menu.${item.key}`)}
                  </span>
                  <span className="transition-[text-shadow] duration-500 group-hover:[text-shadow:0_0_12px_rgba(173,198,255,0.45)]">
                    <MenuIcon name={item.icon} />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
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
