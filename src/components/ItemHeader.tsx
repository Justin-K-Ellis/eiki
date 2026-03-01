import cefrDictionary from "@/lib/cefrDictionary";
import { Locale } from "@/types/types";
import { CEFRLevel } from "@/db/schema";

interface ItemHeaderProps {
  cefrLevel: CEFRLevel;
  locale: Locale;
}

export default function ItemHeader({ cefrLevel, locale }: ItemHeaderProps) {
  const cefrDescription = cefrDictionary[locale][cefrLevel];

  return (
    <div className="mb-4 md:mb-6">
      <h2 className="font-bold text-3xl md:text-4xl mb-2">
        {cefrLevel}: {cefrDescription}
      </h2>
      <hr />
    </div>
  );
}
