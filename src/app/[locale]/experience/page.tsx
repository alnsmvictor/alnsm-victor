import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";

type ExperienceItem = {
  mission: string;
  status: string;
  title: string;
  company: string;
  period: string;
  description: string;
  stack: string[];
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

export default async function ExperiencePage() {
  const t = await getTranslations("Experience");
  const locale = await getLocale();
  const items = t.raw("items") as ExperienceItem[];

  return (
    <main className="grid-bg scanline-bg relative min-h-screen overflow-hidden bg-background text-on-surface">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(19,19,19,0.74),rgba(19,19,19,0.96)),linear-gradient(90deg,rgba(173,198,255,0.04),transparent_38%)]" />

      <header className="fixed left-0 top-0 z-30 flex w-full items-center justify-between bg-gradient-to-b from-background/90 to-transparent px-5 py-6 sm:px-8 md:px-12 lg:px-16">
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

      <section className="relative z-10 flex min-h-screen flex-col px-5 pb-28 pt-28 sm:px-8 md:px-12 lg:px-16">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end">
          <h1 className="font-display text-[clamp(3.5rem,8vw,6rem)] font-black uppercase leading-none text-primary">
            {t("title")}
          </h1>
          <p className="text-label-mono text-on-surface-variant opacity-70">
            {t("subtitle")}
          </p>
        </div>

        <hr className="mb-8 border-outline-variant/40" />

        <div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-12">
          <aside className="hidden pt-4 opacity-70 lg:col-span-2 lg:flex lg:flex-col lg:gap-3">
            <p className="text-label-mono text-primary">[ W ] Scroll Up</p>
            <p className="text-label-mono text-primary">[ S ] Scroll Down</p>
          </aside>

          <div className="flex flex-col gap-4 lg:col-span-10">
            {items.map((item, index) => (
              <article
                key={`${item.company}-${item.period}`}
                className="group relative overflow-hidden border border-outline-variant/40 bg-surface-container-low/55 p-5 backdrop-blur-md transition-colors duration-300 hover:border-primary sm:p-6"
              >
                <div className="pointer-events-none absolute inset-0 -translate-y-full bg-primary/5 transition-transform duration-1000 ease-linear group-hover:translate-y-full" />

                <div className="relative flex flex-col justify-between gap-4 md:flex-row md:items-start">
                  <div>
                    <p
                      className={`text-label-mono mb-3 flex items-center gap-2 ${
                        index === 0 ? "text-primary" : "text-on-surface-variant"
                      }`}
                    >
                      {index === 0 && (
                        <span className="h-2 w-2 animate-pulse bg-primary" />
                      )}
                      {item.mission} // {item.status}
                    </p>

                    <h2 className="text-headline-md uppercase text-on-surface">
                      {item.title}
                    </h2>
                    <p className="text-headline-sm uppercase text-on-surface-variant">
                      {item.company}
                    </p>
                  </div>

                  <p className="text-label-mono w-fit border border-outline/40 px-2 py-1 text-outline">
                    {item.period}
                  </p>
                </div>

                <p className="text-body-md relative mt-5 max-w-4xl text-on-surface-variant">
                  {item.description}
                </p>

                <div className="relative mt-5 flex flex-wrap gap-2">
                  {item.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-label-mono bg-surface px-2 py-1 text-on-surface"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
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
