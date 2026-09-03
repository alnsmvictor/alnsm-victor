"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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

function isExperienceItem(item: unknown): item is ExperienceItem {
  return (
    typeof item === "object" &&
    item !== null &&
    "stack" in item &&
    Array.isArray(item.stack)
  );
}

type ExperienceMissionListProps = {
  items: ExperienceItem[];
  scrollClassName?: string;
  modalEyebrow: string;
  technicalStackLabel: string;
  modalCloseLabel: string;
  verifiedLabel: string;
  accessLevelLabel: string;
};

export function ExperienceMissionList({
  items,
  scrollClassName,
  modalEyebrow,
  technicalStackLabel,
  modalCloseLabel,
  verifiedLabel,
  accessLevelLabel,
}: ExperienceMissionListProps) {
  const [selectedItem, setSelectedItem] = useState<ExperienceItem | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const experienceItems = useMemo(
    () =>
      items
        .flatMap((item) => (Array.isArray(item) ? item : [item]))
        .filter(isExperienceItem),
    [items],
  );

  useEffect(() => {
    const selectedCard = cardRefs.current[selectedIndex];

    selectedCard?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, [selectedIndex]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;

      if (!isDesktop) {
        return;
      }

      if (event.key === "Escape" && selectedItem) {
        event.preventDefault();
        setSelectedItem(null);
        return;
      }

      if (selectedItem || experienceItems.length === 0) {
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((currentIndex) =>
          Math.min(currentIndex + 1, experienceItems.length - 1),
        );
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((currentIndex) => Math.max(currentIndex - 1, 0));
      }

      if (event.key === "Enter") {
        event.preventDefault();
        setSelectedItem(experienceItems[selectedIndex]);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [experienceItems, selectedIndex, selectedItem]);

  return (
    <>
      <div
        className={`${scrollClassName ?? ""} flex h-full min-h-0 flex-col gap-4 overflow-y-auto pr-1 pb-24 lg:col-span-10 lg:pr-4`}
      >
        {experienceItems.map((item, index) => (
          <button
            key={`${item.company}-${item.period}`}
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
            type="button"
            onClick={() => {
              setSelectedIndex(index);
              setSelectedItem(item);
            }}
            onMouseEnter={() => setSelectedIndex(index)}
            className={`group relative min-h-64 w-full shrink-0 cursor-pointer overflow-hidden border bg-surface-container-low/55 p-6 text-left backdrop-blur-md transition-colors duration-300 hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:p-7 ${
              selectedIndex === index
                ? "border-primary shadow-[0_0_42px_rgba(173,198,255,0.1)]"
                : "border-outline-variant/40"
            }`}
          >
            <span className="pointer-events-none absolute inset-0 -translate-y-full bg-primary/5 transition-transform duration-1000 ease-linear group-hover:translate-y-full" />

            <span className="relative flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <span>
                <span
                  className={`text-label-mono mb-3 flex items-center gap-2 ${
                    selectedIndex === index
                      ? "text-primary"
                      : "text-on-surface-variant"
                  }`}
                >
                  {selectedIndex === index && (
                    <span className="h-2 w-2 animate-pulse bg-primary" />
                  )}
                  {item.mission} {"//"} {item.status}
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
          data-keyboard-modal
          role="dialog"
          aria-modal="true"
          aria-labelledby="experience-modal-title"
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-background/70 px-4 py-6 backdrop-blur-md sm:items-center sm:px-5 sm:py-8"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative w-full max-w-5xl border border-primary/45 bg-surface/90 p-5 shadow-[0_0_80px_rgba(173,198,255,0.12)] backdrop-blur-xl sm:p-8 lg:p-10"
            onClick={(event) => event.stopPropagation()}
          >
            <span className="absolute left-[-1px] top-[-1px] h-4 w-4 border-l-2 border-t-2 border-primary" />
            <span className="absolute right-[-1px] top-[-1px] h-4 w-4 border-r-2 border-t-2 border-primary" />
            <span className="absolute bottom-[-1px] left-[-1px] h-4 w-4 border-b-2 border-l-2 border-primary" />
            <span className="absolute bottom-[-1px] right-[-1px] h-4 w-4 border-b-2 border-r-2 border-primary" />

            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 pr-10 sm:pr-0">
                <p className="text-label-mono mb-2 flex max-w-[16rem] items-start gap-2 text-primary sm:max-w-none">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {modalEyebrow}
                </p>
                <h2
                  id="experience-modal-title"
                  className="font-display max-w-full break-words text-[clamp(2rem,8vw,3rem)] font-black uppercase leading-[0.96] text-on-surface sm:text-[clamp(2.35rem,5vw,3.5rem)]"
                >
                  {selectedItem.title}
                </h2>
                <p className="text-headline-sm mt-2 uppercase text-primary">
                  {selectedItem.company}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                aria-label={modalCloseLabel}
                className="text-label-mono absolute right-5 top-5 flex min-h-10 items-center gap-2 text-on-surface-variant opacity-70 transition-colors hover:text-primary hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:static sm:min-h-0"
              >
                <span className="hidden sm:inline">{modalCloseLabel}</span>
                <span aria-hidden="true" className="text-xl leading-none">
                  x
                </span>
              </button>
            </div>

            <div className="border-l border-outline-variant pl-4">
              <p className="text-base font-semibold leading-7 text-on-surface-variant sm:text-body-md">
                {selectedItem.details}
              </p>
            </div>

            <div className="mt-5">
              <p className="text-label-mono mb-3 text-on-surface-variant">
                {technicalStackLabel} {"//"} {verifiedLabel}
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

            <div className="mt-7 flex flex-col gap-2 border-t border-outline-variant/40 pt-4 sm:flex-row sm:items-center sm:justify-between">
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
