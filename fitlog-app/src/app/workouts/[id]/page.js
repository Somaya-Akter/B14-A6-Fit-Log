import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Clock3,
  Flame,
  Star,
} from "lucide-react";

import WorkoutActions from "@/components/WorkoutActions";

async function getWorkout(id) {
  const response = await fetch(
    `https://api.abcz.workers.dev/api/fitlog/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export default async function WorkoutDetailsPage({ params }) {
  const { id } = await params;
  const workout = await getWorkout(id);

  if (!workout) {
    notFound();
  }

  const {
    name,
    image,
    muscleGroups,
    equipment,
    difficulty,
    duration,
    caloriesBurned,
    sets,
    reps,
    rating,
    description,
    instructions,
  } = workout;

  const specs = [
    ["EQUIPMENT", equipment],
    ["DIFFICULTY", difficulty],
    ["SETS", sets],
    ["REPS", reps],
    ["DURATION", `${duration} min`],
    ["CALORIES", `${caloriesBurned} kcal`],
    ["RATING", rating],
  ];

  return (
    <main className="min-h-screen bg-[#0b0d0f]">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <Link
          href="/#library"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 transition hover:text-[#a8d400]"
        >
          <ArrowLeft size={18} />
          Back to workouts
        </Link>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left Side */}
          <div className="relative min-h-[420px] overflow-hidden rounded-2xl border border-white/10 bg-[#14171a] sm:min-h-[520px]">
            <Image
              src={image}
              alt={name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Right Side */}
          <div>
            {/* Tags */}
            <div className="mb-5 flex flex-wrap gap-2">
              {muscleGroups.map((group) => (
                <span
                  key={group}
                  className="rounded-full border border-[#a8d400]/40 bg-[#a8d400]/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#a8d400]"
                >
                  {group}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="font-[var(--font-oswald)] text-4xl font-bold uppercase leading-tight text-white sm:text-5xl lg:text-6xl">
              {name}
            </h1>

            {/* Description */}
            <p className="mt-5 text-base leading-7 text-zinc-400 sm:text-lg">
              {description}
            </p>

            {/* Quick Stats */}
            <div className="mt-7 flex flex-wrap gap-5 text-sm text-zinc-300">
              <span className="flex items-center gap-2">
                <Clock3 size={18} className="text-[#a8d400]" />
                {duration} min
              </span>

              <span className="flex items-center gap-2">
                <Flame size={18} className="text-[#a8d400]" />
                {caloriesBurned} kcal
              </span>

              <span className="flex items-center gap-2">
                <Star size={18} className="text-[#a8d400]" />
                {rating}
              </span>
            </div>

            {/* Key Specs */}
            <div className="mt-9">
              <h2 className="font-[var(--font-oswald)] text-2xl font-bold uppercase text-white">
                Key Specs
              </h2>

              <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-[#14171a]">
                {specs.map(([label, value], index) => (
                  <div
                    key={label}
                    className={`flex items-center justify-between gap-4 px-5 py-4 ${
                      index !== specs.length - 1
                        ? "border-b border-white/10"
                        : ""
                    }`}
                  >
                    <span className="text-xs font-bold tracking-[0.15em] text-zinc-500">
                      {label}
                    </span>

                    <span className="text-right text-sm font-semibold text-white">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-9">
              <h2 className="font-[var(--font-oswald)] text-2xl font-bold uppercase text-white">
                Instructions
              </h2>

              <ol className="mt-5 space-y-4">
                {instructions.map((instruction, index) => (
                  <li
                    key={instruction}
                    className="flex gap-4 text-sm leading-6 text-zinc-300"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#a8d400] text-xs font-bold text-[#10130a]">
                      {index + 1}
                    </span>

                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Functional Buttons */}
            <WorkoutActions workout={workout} />
          </div>
        </div>
      </section>
    </main>
  );
}