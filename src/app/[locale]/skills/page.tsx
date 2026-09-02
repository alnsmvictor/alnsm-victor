import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import styles from "./page.module.css";

type SkillIcon =
  | "code"
  | "braces"
  | "brush"
  | "layout"
  | "server"
  | "terminal"
  | "gauge"
  | "database"
  | "folder"
  | "git"
  | "github"
  | "linux"
  | "plug";

type SkillCategory = {
  label: string;
  count: string;
  skills: Array<{
    name: string;
    icon: SkillIcon;
  }>;
};

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

function SkillSlotIcon({ name }: { name: SkillIcon }) {
  const sharedProps = {
    className: "h-10 w-10 md:h-12 md:w-12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  const icons = {
    code: (
      <svg {...sharedProps}>
        <path d="m16 18 6-6-6-6" />
        <path d="m8 6-6 6 6 6" />
      </svg>
    ),
    braces: (
      <svg {...sharedProps}>
        <path d="M8 3H7a2 2 0 0 0-2 2v3a2 2 0 0 1-2 2 2 2 0 0 1 2 2v3a2 2 0 0 0 2 2h1" />
        <path d="M16 3h1a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2 2 2 0 0 0-2 2v3a2 2 0 0 1-2 2h-1" />
      </svg>
    ),
    brush: (
      <svg {...sharedProps}>
        <path d="m14.5 4.5 5 5L8 21H3v-5L14.5 4.5Z" />
        <path d="m13 6 5 5" />
      </svg>
    ),
    layout: (
      <svg {...sharedProps}>
        <rect x="3" y="4" width="18" height="16" rx="1" />
        <path d="M3 9h18" />
        <path d="M9 9v11" />
      </svg>
    ),
    server: (
      <svg {...sharedProps}>
        <rect x="4" y="4" width="16" height="6" rx="1" />
        <rect x="4" y="14" width="16" height="6" rx="1" />
        <path d="M7 7h.01" />
        <path d="M7 17h.01" />
      </svg>
    ),
    terminal: (
      <svg {...sharedProps}>
        <path d="m7 8 4 4-4 4" />
        <path d="M13 16h4" />
        <rect x="3" y="4" width="18" height="16" rx="1" />
      </svg>
    ),
    gauge: (
      <svg {...sharedProps}>
        <path d="M21 12a9 9 0 0 0-18 0" />
        <path d="m12 12 4-4" />
        <path d="M7 12h.01" />
        <path d="M17 12h.01" />
      </svg>
    ),
    database: (
      <svg {...sharedProps}>
        <ellipse cx="12" cy="5" rx="7" ry="3" />
        <path d="M5 5v14c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
        <path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
      </svg>
    ),
    folder: (
      <svg {...sharedProps}>
        <path d="M3 7h6l2 2h10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
        <path d="M3 7V5a2 2 0 0 1 2-2h4l2 2h5" />
      </svg>
    ),
    git: (
      <svg {...sharedProps}>
        <path d="m15 6 3 3-3 3" />
        <path d="M6 18V9a3 3 0 0 1 3-3h9" />
      </svg>
    ),
    github: (
      <svg {...sharedProps}>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3c3 0 6-2 6-5.5a4.5 4.5 0 0 0-1.2-3.1 4.2 4.2 0 0 0-.1-3.1s-1-.3-3.3 1.2a11.2 11.2 0 0 0-6 0C7.1 3 6.1 3.3 6.1 3.3A4.2 4.2 0 0 0 6 6.4a4.5 4.5 0 0 0-1.2 3.1C4.8 13 7.8 15 10.8 15a4.8 4.8 0 0 0-1 3v4" />
      </svg>
    ),
    linux: (
      <svg {...sharedProps}>
        <path d="M12 2c-2 0-3 2-3 5v2l-2 3v5h10v-5l-2-3V7c0-3-1-5-3-5Z" />
        <path d="M9 17 7 21" />
        <path d="m15 17 2 4" />
      </svg>
    ),
    plug: (
      <svg {...sharedProps}>
        <path d="M12 22v-5" />
        <path d="M9 8V2" />
        <path d="M15 8V2" />
        <path d="M6 8h12v4a6 6 0 0 1-12 0V8Z" />
      </svg>
    ),
  };

  return icons[name];
}

export default async function SkillsPage() {
  const t = await getTranslations("Skills");
  const locale = await getLocale();
  const categories = t.raw("categories") as SkillCategory[];

  return (
    <main
      className={`${styles.gridBg} ${styles.scanlineBg} relative flex h-screen flex-col overflow-hidden bg-background text-on-surface`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(19,19,19,0.72),rgba(19,19,19,0.96)),linear-gradient(90deg,rgba(173,198,255,0.04),transparent_38%)]" />

      <header className="relative z-30 flex w-full shrink-0 items-center justify-between bg-gradient-to-b from-background/90 to-transparent px-5 py-5 sm:px-8 md:px-12 lg:px-16">
        <Link
          href={`/${locale}`}
          className="text-label-mono flex items-center gap-2 text-primary opacity-80 transition-all duration-300 hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <BackIcon />
          {t("back")}
        </Link>

        <span className="text-headline-sm text-primary opacity-45">
          LOADOUT_01
        </span>
      </header>

      <section className="relative z-10 flex min-h-0 flex-1 flex-col px-5 pb-20 pt-5 sm:px-8 md:px-12 lg:px-16">
        <div className="mb-8 shrink-0">
          <h1 className="font-display text-[clamp(3rem,8vw,6rem)] font-black uppercase leading-none text-on-surface">
            {t("title")}
          </h1>
          <p className="text-label-mono mt-4 text-primary">{t("subtitle")}</p>
        </div>

        <hr className="mb-8 shrink-0 border-outline-variant/40" />

        <div
          className={`${styles.hudScrollbar} min-h-0 flex-1 overflow-y-auto pr-1 pb-24 lg:pr-4`}
        >
          <div className="flex min-h-full flex-col gap-10">
            {categories.map((category) => (
              <section key={category.label}>
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-label-mono border-l-2 border-primary pl-2 text-on-surface">
                    {category.label}
                  </h2>
                  <span className="text-label-mono text-on-surface">
                    [{category.count}]
                  </span>
                </div>

                <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
                  {category.skills.map((skill, index) => (
                    <li key={skill.name}>
                      <div
                        className={`group relative flex min-h-40 flex-col justify-between border bg-surface-container-low/55 p-4 transition-colors duration-300 hover:border-primary hover:bg-primary/10 md:min-h-44 ${
                          index === 0
                            ? "border-primary/70 text-primary"
                            : "border-outline-variant/50 text-on-surface-variant"
                        }`}
                      >
                        <span className="absolute right-2 top-2 text-label-mono opacity-35">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="mt-6 flex flex-1 items-center justify-center opacity-90 transition-[filter,text-shadow,transform] duration-300 group-hover:scale-105 group-hover:opacity-100 group-hover:[filter:drop-shadow(0_0_12px_rgba(173,198,255,0.45))] group-hover:[text-shadow:0_0_14px_rgba(173,198,255,0.45)]">
                          <SkillSlotIcon name={skill.icon} />
                        </span>

                        <span className="text-label-mono text-center text-[0.65rem] leading-tight text-on-surface">
                          {skill.name}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
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
