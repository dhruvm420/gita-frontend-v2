import { Metadata } from "next";
import { headers } from "next/headers";

import NotFound from "components/NotFound";
import { getDailyVerse } from "lib/getDailyVerse";
import { paramsToLocale } from "shared/functions";
import { getTranslations } from "shared/translate/server";

import { VerseOfTheDay } from "./verse-of-the-day";

export async function generateMetadata(): Promise<Metadata> {
  const gitaVerse = await getDailyVerse();

  if (!gitaVerse) {
    return {};
  }

  const { chapter_number, verse_number } = gitaVerse;

  return {
    title: `Bhagavad Gita Chapter ${chapter_number} Verse ${verse_number} - BhagavadGita.io`,
    openGraph: {
      url: `https://bhagavadgita.io/chapter/${chapter_number}/verse/${verse_number}/`,
      siteName: "Bhagavad Gita",
      locale: "en_US",
      type: "article",
      authors: "https://www.facebook.com/radhakrishnablog/",
      tags: ["Krishna", "Bhagavad Gita", "Bhagwad Gita"],
      section: "Bhagavad Gita",
      title: `Bhagavad Gita Chapter ${chapter_number} Verse ${verse_number} - BhagavadGita.io`,
      images: [
        {
          url: "https://bhagavadgita.io/static/images/sribhagavadgita.jpg",
          secureUrl:
            "https://bhagavadgita.io/static/images/sribhagavadgita.jpg",
          height: 1080,
          width: 1920,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Bhagavad Gita Chapter ${chapter_number} Verse ${verse_number} - BhagavadGita.io`,
      images: ["https://bhagavadgita.io/static/images/sribhagavadgita.jpg"],
      site: "@ShriKrishna",
    },
    alternates: {
      languages: {
        en: `https://bhagavadgita.io/chapter/${chapter_number}/verse/${verse_number}/`,
        "en-US": `https://bhagavadgita.io/chapter/${chapter_number}/verse/${verse_number}/`,
        "en-GB": `https://bhagavadgita.io/chapter/${chapter_number}/verse/${verse_number}/`,
        "en-IN": `https://bhagavadgita.io/chapter/${chapter_number}/verse/${verse_number}/`,
        hi: `https://bhagavadgita.io/chapter/${chapter_number}/verse/${verse_number}/hi`,
      },
    },
  };
}

const Page = async ({ params }: ParamsWithLocale) => {
  const locale = paramsToLocale(params);
  const dailyVerse = await getDailyVerse();
  const headersList = headers();

  if (!dailyVerse) {
    return <NotFound hint="Daily verse not found" />;
  }

  return (
    <VerseOfTheDay
      dailyVerse={dailyVerse}
      translations={await getTranslations(locale)}
      locale={locale}
    />
  );
};

export default Page;
