import "server-only";
import { languageOptions } from "@/lib/constants";
const { defaultLocale, locales } = languageOptions;

export type LangType = typeof en;
const dictionaries: Record<string, () => Promise<LangType>> = locales.reduce(
  (acc, locale) => {
    acc[locale] = () =>
      import(`./dictionaries/${locale}`).then((module) => module.default);
    return acc;
  },
  {} as Record<string, () => Promise<LangType>>
); // Add index signature to the type of 'dictionaries'

const getDictionary = async (locale: string): Promise<LangType> => {
  return dictionaries[locale]();
};
export default getDictionary;
import en from "./dictionaries/en";
