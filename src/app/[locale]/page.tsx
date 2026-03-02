import HomePageCard from "@/components/HomePageCard";

export default function Home() {
  return (
    <section className="flex flex-col md:flex-row gap-4">
      <HomePageCard
        title="Reading"
        description="Short passages"
        content="Graded reading passages from CEFR level A1 to C2."
        link="/reading"
      />
      <HomePageCard
        title="Vocab Practice"
        description="Practice makes perfect"
        content="Perfect your vocab knowledge with spaced repetition."
        link="/vocab"
      />
    </section>
  );
}
