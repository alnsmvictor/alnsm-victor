import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import enMessages from "../../messages/en.json";
import ptMessages from "../../messages/pt.json";
import { routing } from "./routing";

const messages = {
  en: enMessages,
  pt: ptMessages,
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;

  if (!hasLocale(routing.locales, requested)) {
    notFound();
  }

  return {
    locale: requested,
    messages: messages[requested],
  };
});
