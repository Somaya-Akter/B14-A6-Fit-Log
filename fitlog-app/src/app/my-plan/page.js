"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock3,
  Dumbbell,
  Flame,
  Star,
  X,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

import { useWorkout } from "@/context/WorkoutContext";

export default function MyPlanPage() {
  const {
    plan,
    saved,
    loaded,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
  } = useWorkout();

  const [activeTab, setActiveTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");

  const currentList = activeTab === "plan" ? plan : saved;

  // Metrics change according to the selected tab
  const metrics = useMemo(() => {
    return {
      exercises: currentList.length,

      minutes: currentList.reduce(
        (total, workout) => total + Number(workout.duration || 0),
        0
      ),

      calories: currentList.reduce(
        (total, workout) =>
          total + Number(workout.caloriesBurned || 0),
        0
      ),
    };
  }, [currentList]);

  // Challenge: Sort the currently selected list
  const sortedList = useMemo(() => {
    const list = [...currentList];

    if (sortBy === "duration") {
      return list.sort(
        (a, b) => Number(a.duration) - Number(b.duration)
      );
    }

    if (sortBy === "calories") {
      return list.sort(
        (a, b) =>
          Number(b.caloriesBurned) - Number(a.caloriesBurned)
      );
    }

    if (sortBy === "rating") {
      return list.sort(
        (a, b) => Number(b.rating) - Number(a.rating)
      );
    }

    return list;
  }, [currentList, sortBy]);

  return (
    <main className="min-h-screen bg-[#0b0d0f]">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Heading */}
        <div>
          <p className="text-sm font-bold tracking-[0.25em] text-[#a8d400]">
            WORKOUT TRACKER
          </p>

          <h1 className="mt-2 font-[var(--font-oswald)] text-4xl font-bold uppercase text-white sm:text-5xl">
            My Plan
          </h1>

          <p className="mt-3 text-zinc-400">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Metrics */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-[#14171a] p-5">
            <div className="flex items-center gap-3 text-zinc-400">
              <Dumbbell size={19} className="text-[#a8d400]" />

              <span className="text-xs font-bold uppercase tracking-widest">
                Exercises
              </span>
            </div>

            <p className="mt-3 text-3xl font-bold text-white">
              {metrics.exercises}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#14171a] p-5">
            <div className="flex items-center gap-3 text-zinc-400">
              <Clock3 size={19} className="text-[#a8d400]" />

              <span className="text-xs font-bold uppercase tracking-widest">
                Minutes
              </span>
            </div>

            <p className="mt-3 text-3xl font-bold text-white">
              {metrics.minutes}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#14171a] p-5">
            <div className="flex items-center gap-3 text-zinc-400">
              <Flame size={19} className="text-[#a8d400]" />

              <span className="text-xs font-bold uppercase tracking-widest">
                Calories
              </span>
            </div>

            <p className="mt-3 text-3xl font-bold text-white">
              {metrics.calories}
            </p>
          </div>
        </div>

        {/* Tabs + Sort */}
        <div className="mt-10 flex flex-col gap-4 border-b border-white/10 pb-3 sm:flex-row sm:items-end sm:justify-between">
          {/* Tabs */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("plan")}
              className={`border-b-2 px-4 py-3 text-sm font-bold transition ${
                activeTab === "plan"
                  ? "border-[#a8d400] text-white"
                  : "border-transparent text-zinc-500 hover:text-white"
              }`}
            >
              Today&apos;s Plan ({plan.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`border-b-2 px-4 py-3 text-sm font-bold transition ${
                activeTab === "saved"
                  ? "border-[#a8d400] text-white"
                  : "border-transparent text-zinc-500 hover:text-white"
              }`}
            >
              Saved ({saved.length})
            </button>
          </div>

          {/* Challenge Sort Dropdown */}
          <div className="flex items-center gap-3">
            <label
              htmlFor="plan-sort"
              className="text-sm font-semibold text-zinc-400"
            >
              Sort By
            </label>

            <div className="relative">
              <select
                id="plan-sort"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="appearance-none rounded-md border border-white/15 bg-[#14171a] py-2.5 pl-4 pr-10 text-sm font-semibold text-white outline-none transition focus:border-[#a8d400]"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>

              <ChevronDown
                size={17}
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#a8d400]"
              />
            </div>
          </div>
        </div>

        {/* Loading */}
        {!loaded && (
          <div className="flex min-h-64 items-center justify-center text-zinc-400">
            Loading workouts…
          </div>
        )}

        {/* Empty State */}
        {loaded && currentList.length === 0 && (
          <div className="mt-7 flex min-h-[360px] flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-[#111315] px-6 text-center">
            <Dumbbell size={42} className="text-zinc-600" />

            <h2 className="mt-5 font-[var(--font-oswald)] text-3xl font-bold uppercase text-white">
              NOTHING HERE YET
            </h2>

            <p className="mt-3 max-w-md text-zinc-400">
              Browse the library and add a lift to get today moving.
            </p>

            <Link
              href="/#library"
              className="mt-6 rounded-md bg-[#a8d400] px-5 py-3 text-sm font-bold text-[#10130a] transition hover:bg-[#b7df18]"
            >
              Go to workouts
            </Link>
          </div>
        )}

        {/* Workout List */}
        {loaded && sortedList.length > 0 && (
          <div className="mt-7 space-y-4">
            {sortedList.map((workout) => (
              <article
                key={workout.id}
                className="flex flex-col gap-5 rounded-xl border border-white/10 bg-[#14171a] p-4 md:flex-row md:items-center"
              >
                {/* Image */}
                <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-lg bg-[#1b1f23] md:h-32 md:w-44">
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 176px"
                    className="object-cover"
                  />
                </div>

                {/* Information */}
                <div className="min-w-0 flex-1">
                  <h2 className="font-[var(--font-oswald)] text-2xl font-bold uppercase text-white">
                    {workout.name}
                  </h2>

                  <p className="mt-1 text-sm text-zinc-500">
                    {workout.equipment}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-zinc-300">
                    <span className="flex items-center gap-1.5">
                      <Clock3 size={16} className="text-[#a8d400]" />
                      {workout.duration} min
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Flame size={16} className="text-[#a8d400]" />
                      {workout.caloriesBurned} kcal
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Star size={16} className="text-[#a8d400]" />
                      {workout.rating}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/workouts/${workout.id}`}
                    className="rounded-md border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-[#a8d400] hover:text-[#a8d400]"
                  >
                    View Details
                  </Link>

                  {activeTab === "plan" && (
                    <button
                      type="button"
                      onClick={() => markAsDone(workout.id)}
                      className="inline-flex items-center gap-2 rounded-md bg-[#a8d400] px-4 py-2 text-sm font-bold text-[#10130a] transition hover:bg-[#b7df18]"
                    >
                      <CheckCircle2 size={17} />
                      Mark as Done
                    </button>
                  )}

                  <button
                    type="button"
                    aria-label={`Remove ${workout.name}`}
                    onClick={() =>
                      activeTab === "plan"
                        ? removeFromPlan(workout.id)
                        : removeFromSaved(workout.id)
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-zinc-400 transition hover:border-red-400/50 hover:text-red-400"
                  >
                    <X size={18} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}