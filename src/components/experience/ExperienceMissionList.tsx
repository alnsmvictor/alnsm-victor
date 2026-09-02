"use client";

import { useEffect, useState } from "react";

export type ExperienceItem = {
  mission: string;
  status: string;
  title: string;
  company: string;
  period: string;
  description: string;
  details: string;
  accessLevel: string;
  syncStatus: string;
  stack: string[];
};

type ExperienceMissionListProps = {
  items: ExperienceItem[];
  modalEyebrow: string;
  technicalStackLabel: string;
  modalCloseLabel: string;
  verifiedLabel: string;
  accessLevelLabel: string;
};

export function ExperienceMissionList({
  items,
  modalEyebrow,
  technicalStackLabel,
  modalCloseLabel,
  verifiedLabel,
  accessLevelLabel,
}: ExperienceMissionListProps) {
  const [selectedItem, setSelectedItem] = useState<ExperienceItem | null>(null);

  useEffect(() => {
    if (!selectedItem) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedItem(null);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedItem]);

  return (
    <>
      <div className="hud-scrollbar flex h-full min-h-0 flex-col gap-4 overflow-y-auto pr-1 pb-24 lg:col-span-10 lg:pr-4">
        {items.map((item, index) => (
          <button
            key={`${item.company}-${item.period}`}
            type="button"
            onClick={() => setSelectedItem(item)}
            className="group relative min-h-64 w-full shrink-0 cursor-pointer overflow-hidden border border-outline-variant/40 bg-surface-container-low/55 p-6 text-left backdrop-blur-md transition-colors duration-300 hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:p-7"
          >
            <span className="pointer-events-none absolute inset-0 -translate-y-full bg-primary/5 transition-transform duration-1000 ease-linear group-hover:translate-y-full" />

            <span className="relative flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <span>
                <span
                  className={`text-label-mono mb-3 flex items-center gap-2 ${
                    index === 0 ? "text-primary" : "text-on-surface-variant"
                  }`}
                >
                  {index === 0 && (
                    <span className="h-2 w-2 animate-pulse bg-primary" />
                  )}
                  {item.mission} // {item.status}
                </span>

                <span className="text-headline-md block uppercase text-on-surface">
                  {item.title}
                </span>
                <span className="text-headline-sm block uppercase text-on-surface-variant">
                  {item.company}
                </span>
              </span>

              <span className="text-label-mono w-fit border border-outline/40 px-2 py-1 text-outline">
                {item.period}
              </span>
            </span>

            <span className="text-body-md relative mt-5 block text-on-surface-variant">
              {item.description}
            </span>

            <span className="relative mt-5 flex flex-wrap gap-2">
              {item.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-label-mono bg-surface px-2 py-1 text-on-surface"
                >
                  {tech}
                </span>
              ))}
            </span>
          </button>
        ))}
      </div>

      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="experience-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 px-5 py-8 backdrop-blur-md"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative w-full max-w-5xl border border-primary/45 bg-surface/80 p-6 shadow-[0_0_80px_rgba(173,198,255,0.12)] backdrop-blur-xl sm:p-8 lg:p-10"
            onClick={(event) => event.stopPropagation()}
          >
            <span className="absolute left-[-1px] top-[-1px] h-4 w-4 border-l-2 border-t-2 border-primary" />
            <span className="absolute right-[-1px] top-[-1px] h-4 w-4 border-r-2 border-t-2 border-primary" />
            <span className="absolute bottom-[-1px] left-[-1px] h-4 w-4 border-b-2 border-l-2 border-primary" />
            <span className="absolute bottom-[-1px] right-[-1px] h-4 w-4 border-b-2 border-r-2 border-primary" />

            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-label-mono mb-2 flex items-center gap-2 text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {modalEyebrow}
                </p>
                <h2
                  id="experience-modal-title"
                  className="text-headline-md uppercase text-on-surface"
                >
                  {selectedItem.title}
                </h2>
                <p className="text-headline-sm uppercase text-primary">
                  {selectedItem.company}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="text-label-mono flex items-center gap-2 text-on-surface-variant opacity-70 transition-colors hover:text-primary hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                {modalCloseLabel}
                <span aria-hidden="true" className="text-xl leading-none">
                  x
                </span>
              </button>
            </div>

            <div className="border-l border-outline-variant pl-4">
              <p className="text-body-md font-semibold text-on-surface-variant">
                {selectedItem.details}
              </p>
            </div>

            <div className="mt-5">
              <p className="text-label-mono mb-3 text-on-surface-variant">
                {technicalStackLabel} // {verifiedLabel}
              </p>

              <div className="flex flex-wrap gap-2">
                {selectedItem.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-label-mono border border-primary/30 bg-primary/10 px-2 py-1 text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 border-t border-outline-variant/40 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-label-mono text-on-surface-variant opacity-60">
                {accessLevelLabel}: {selectedItem.accessLevel}
              </span>
              <span className="text-label-mono text-primary opacity-70">
                {selectedItem.syncStatus}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
