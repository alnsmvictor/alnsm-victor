"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

type EscapeBackProps = {
  href: string;
};

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

export function EscapeBack({ href }: EscapeBackProps) {
  const router = useRouter();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      const hasOpenModal = document.querySelector("[data-keyboard-modal]");

      if (
        event.key !== "Escape" ||
        !isDesktop ||
        hasOpenModal ||
        isTypingTarget(event.target)
      ) {
        return;
      }

      event.preventDefault();
      router.push(href);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [href, router]);

  return null;
}
