import Hero from "@/components/Hero";
import WorkoutLibrary from "@/components/WorkoutLibrary";

export default function Home() {
  return (
    <main>
      <Hero />

      <section
        id="library"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <p className="text-sm font-bold tracking-[0.25em] text-[#ccff00]">
          WORKOUTS
        </p>

        <h2 className="mt-2 font-[var(--font-oswald)] text-4xl font-bold uppercase text-white sm:text-5xl">
          The Library
        </h2>

        <p className="mt-3 text-zinc-400">
          Twelve lifts covering every major muscle group.
        </p>

        <WorkoutLibrary />
      </section>
    </main>
  );
}