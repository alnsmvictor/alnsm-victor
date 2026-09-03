"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type IconName = "user" | "briefcase" | "bolt" | "mail";

type HomeKeyboardMenuItem = {
  key: string;
  label: string;
  href: string;
  icon: IconName;
};

type HomeKeyboardMenuProps = {
  ariaLabel: string;
  items: HomeKeyboardMenuItem[];
};

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

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return (
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.isContentEditable
  );
}

function isInteractiveOutsideMenu(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const interactiveElement = target.closest(
    "a, button, input, textarea, select, [tabindex]",
  );
  const keyboardMenu = target.closest("[data-keyboard-menu]");

  return Boolean(interactiveElement && !keyboardMenu);
}

export function HomeKeyboardMenu({ ariaLabel, items }: HomeKeyboardMenuProps) {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;

      if (
        !isDesktop ||
        isTypingTarget(event.target) ||
        isInteractiveOutsideMenu(event.target)
      ) {
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((currentIndex) => (currentIndex + 1) % items.length);
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex(
          (currentIndex) => (currentIndex - 1 + items.length) % items.length,
        );
      }

      if (event.key === "Enter") {
        event.preventDefault();
        const selectedItem = items[selectedIndex];

        if (selectedItem.href.startsWith("#")) {
          window.location.hash = selectedItem.href;
          return;
        }

        router.push(selectedItem.href);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [items, router, selectedIndex]);

  return (
    <nav
      data-keyboard-menu
      aria-label={ariaLabel}
      className="mt-auto self-end pb-3 pt-16 text-right sm:min-w-80 lg:absolute lg:bottom-20 lg:right-10 lg:pt-0"
    >
      <ul className="flex flex-col items-end gap-2 md:gap-1">
        {items.map((item, index) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={selectedIndex === index ? "page" : undefined}
              onMouseEnter={() => setSelectedIndex(index)}
              className={`group flex min-h-11 items-center justify-end gap-4 px-4 py-1.5 transition-all duration-500 ease-out hover:bg-[linear-gradient(90deg,transparent,rgba(173,198,255,0.08),transparent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary md:min-h-9 md:gap-3 ${
                selectedIndex === index ? "text-primary opacity-100" : "opacity-55"
              } hover:text-primary hover:opacity-100`}
            >
              <span className="text-4xl font-bold uppercase leading-none transition-[text-shadow] duration-500 group-hover:[text-shadow:0_0_12px_rgba(173,198,255,0.45)] md:text-headline-md">
                {item.label}
              </span>
              <span className="transition-[text-shadow] duration-500 group-hover:[text-shadow:0_0_12px_rgba(173,198,255,0.45)]">
                <MenuIcon name={item.icon} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
