import commentaryAuthors from "constant/commentary_authors.json";
import languages from "constant/languages.json";
import translationAuthors from "constant/translation_authors.json";

import {
  defaultCommentaryAuthorId,
  defaultLocale,
  defaultTranslationAuthorId,
  supportedLocales,
} from "./constants";

const defaultStyles = {
  fontSize: {
    heading: "text-4xl",
    subHeading1: "text-3xl",
    subHeading2: "text-2xl",
    para: "text-xl",
  },
  lineHeight: "leading-none",
  backgroundColor: "light-bg",
};

type FontSize = "large" | "small" | "";

export const getMyStyles = () => {
  const myStyles = JSON.parse(JSON.stringify(defaultStyles));

  const fontSize: FontSize = "" as FontSize;
  const spacing = ["medium"][0];
  const bg = ["bg-dark-bg"][0];

  if (fontSize === "large") {
    myStyles.fontSize = {
      heading: "text-4xl",
      subHeading1: "text-intro",
      subHeading2: "text-paragraph",
      para: "text-paragraph",
    };
  } else if (fontSize == "small") {
    myStyles.fontSize = {
      heading: "text-3xl",
      subHeading1: "text-2xl",
      subHeading2: "text-xl",
      para: "text-md",
    };
  }

  if (spacing === "large") {
    myStyles.lineHeight = "leading-loose";
  } else if (spacing === "medium") {
    myStyles.lineHeight = "leading-normal";
  } else if (spacing === "small") {
    myStyles.lineHeight = "leading-none";
  }

  if (bg === "bg-dark-bg") {
    myStyles.backgroundColor = "dark-bg";
  } else if (bg === "bg-light-bg") {
    myStyles.backgroundColor = "white";
  } else if (bg === "bg-yellow-bg") {
    myStyles.backgroundColor = "yellow-bg";
  }

  return myStyles;
};

// export const getMyLanguage = () => {
//   const languageId = getCookie("languageId") || 1;
//   return (
//     languages.find(({ id }) => String(id) === String(languageId)) ||
//     languages[0]
//   );
// };

// export const getMyCommentaryAuthor = () => {
//   const commentaryAuthorId = getCookie("commentaryAuthorId") || 16;
//   return (
//     commentaryAuthors.find(
//       ({ id }) => String(id) === String(commentaryAuthorId),
//     ) || commentaryAuthors[0]
//   );
// };

// export const getMyTranslationAuthor = () => {
//   const translationAuthorId = getCookie("translationAuthorId") || 16;
//   return (
//     translationAuthors.find(
//       ({ id }) => String(id) === String(translationAuthorId),
//     ) || translationAuthors[0]
//   );
// };

export const getLanguageById = (languageId: number) =>
  languages.find(({ id }) => id === languageId);

export const getTranslationAuthorById = (translationAuthorId: number) =>
  translationAuthors.find(({ id }) => id === translationAuthorId);

export const getCommentaryAuthorById = (commentaryAuthorId: number) =>
  commentaryAuthors.find(({ id }) => id === commentaryAuthorId);

export const isLocale = (value: unknown): value is Locale =>
  supportedLocales.includes(String(value));

export const deprecated_headerToLocale = (headerLocale: string) =>
  isLocale(headerLocale) ? headerLocale : defaultLocale;

export const paramsToLocale = (localeFromParams: { locale: string[] }) => {
  const paramsLocale = Array.isArray(localeFromParams?.locale)
    ? localeFromParams.locale[0]
    : "en";
  return isLocale(paramsLocale) ? paramsLocale : defaultLocale;
};

export const getLanguageSettings = (
  {
    translationAuthorId,
    commentaryAuthorId,
  }: {
    translationAuthorId: number;
    commentaryAuthorId: number;
  } = {
    translationAuthorId: defaultTranslationAuthorId,
    commentaryAuthorId: defaultCommentaryAuthorId,
  },
): LanguageSettings => ({
  translationAuthor:
    getTranslationAuthorById(translationAuthorId) ||
    getTranslationAuthorById(defaultTranslationAuthorId)!,
  commentaryAuthor:
    getCommentaryAuthorById(commentaryAuthorId) ||
    getCommentaryAuthorById(defaultCommentaryAuthorId)!,
});
