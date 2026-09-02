import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import styles from "./page.module.css";

type ContactIcon = "mail" | "linkedin" | "github";

type ContactChannel = {
  label: string;
  href: string;
  icon: ContactIcon;
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

function ContactChannelIcon({ name }: { name: ContactIcon }) {
  const sharedProps = {
    className: "h-9 w-9 md:h-14 md:w-14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  const icons = {
    mail: (
      <svg {...sharedProps}>
        <rect x="3" y="5" width="18" height="14" rx="1" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
    linkedin: (
      <svg {...sharedProps}>
        <path d="M8 11v5" />
        <path d="M8 8v.01" />
        <path d="M12 16v-5" />
        <path d="M16 16v-3a2 2 0 0 0-4 0" />
        <rect x="3" y="3" width="18" height="18" rx="1" />
      </svg>
    ),
    github: (
      <svg {...sharedProps}>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3c3 0 6-2 6-5.5a4.5 4.5 0 0 0-1.2-3.1 4.2 4.2 0 0 0-.1-3.1s-1-.3-3.3 1.2a11.2 11.2 0 0 0-6 0C7.1 3 6.1 3.3 6.1 3.3A4.2 4.2 0 0 0 6 6.4a4.5 4.5 0 0 0-1.2 3.1C4.8 13 7.8 15 10.8 15a4.8 4.8 0 0 0-1 3v4" />
      </svg>
    ),
  };

  return icons[name];
}

export default async function ContactPage() {
  const t = await getTranslations("Contact");
  const locale = await getLocale();
  const channels = t.raw("channels") as ContactChannel[];

  return (
    <main
      className={`${styles.gridBg} ${styles.scanlineBg} relative flex h-screen flex-col overflow-hidden bg-background text-on-surface`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(173,198,255,0.08),transparent_22%),linear-gradient(180deg,rgba(19,19,19,0.72),rgba(19,19,19,0.98))]" />

      <header className="relative z-30 flex w-full shrink-0 items-center justify-between bg-gradient-to-b from-background/90 to-transparent px-5 py-4 sm:px-8 md:px-12 md:py-5 lg:px-16">
        <Link
          href={`/${locale}`}
          className="text-label-mono flex items-center gap-2 text-primary opacity-80 transition-all duration-300 hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <BackIcon />
          {t("back")}
        </Link>

        <span className="text-headline-sm hidden text-primary opacity-60 sm:block">
          OPERATOR_01
        </span>
      </header>

      <section className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center px-5 pb-4 pt-3 text-center sm:px-8 md:px-12 md:pb-24 md:pt-5 lg:px-16">
        <p className="text-label-mono mb-3 text-primary md:mb-5">
          {t("eyebrow")}
        </p>

        <h1 className="font-display text-[clamp(2.5rem,13vw,4rem)] font-black uppercase leading-none text-on-surface md:text-[clamp(3.5rem,9vw,6.75rem)]">
          {t("title")}
        </h1>

        <p className="mt-3 max-w-4xl text-xl font-bold uppercase leading-tight text-on-surface-variant sm:text-2xl md:mt-5 md:text-headline-md">
          {t("subtitle")}
        </p>

        <div className="mt-8 grid w-full max-w-6xl grid-cols-1 gap-3 md:mt-20 md:grid-cols-3 md:gap-4">
          {channels.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : "_self"}
              rel={
                channel.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="group relative flex min-h-28 flex-col items-center justify-center gap-3 border border-outline-variant/50 bg-surface-container-low/45 px-6 py-4 text-primary backdrop-blur-sm transition-all duration-300 hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_40px_rgba(173,198,255,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:min-h-48 md:gap-5 md:py-8"
            >
              <span className="transition-[filter,transform] duration-300 group-hover:scale-110 group-hover:[filter:drop-shadow(0_0_14px_rgba(173,198,255,0.55))]">
                <ContactChannelIcon name={channel.icon} />
              </span>
              <span className="text-label-mono text-on-surface">
                {channel.label}
              </span>
            </a>
          ))}
        </div>

        <a
          href={t("primaryHref")}
          className="text-label-mono mt-5 min-h-11 border border-on-surface-variant px-8 py-3 text-on-surface transition-all duration-300 hover:border-primary hover:bg-primary hover:text-on-primary hover:shadow-[0_0_40px_rgba(173,198,255,0.16)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:mt-20 md:min-h-14 md:px-10 md:py-5"
        >
          {t("primaryAction")}
        </a>
      </section>

      <footer className="fixed bottom-0 right-0 z-20 hidden w-full justify-end bg-gradient-to-t from-background to-transparent px-5 py-5 sm:px-8 md:flex md:px-12 lg:px-16">
        <span className="text-label-mono text-on-surface-variant opacity-60">
          {t("footer")}
        </span>
      </footer>
    </main>
  );
}
