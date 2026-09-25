"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, LoaderCircle } from "lucide-react";
import WorkoutCard from "./WorkoutCard";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("duration");

  useEffect(() => {
    async function loadWorkouts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to load workouts.");
        }

        const data = await response.json();
        setWorkouts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  const sortedWorkouts = useMemo(() => {
    const list = [...workouts];

    if (sortBy === "duration") {
      return list.sort((a, b) => a.duration - b.duration);
    }

    if (sortBy === "calories") {
      return list.sort((a, b) => b.caloriesBurned - a.caloriesBurned);
    }

    if (sortBy === "rating") {
      return list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [workouts, sortBy]);

  return (
    <div className="mt-10">
      {/* Sort */}
      <div className="mb-8 flex justify-end">
        <div className="relative">
          <label htmlFor="sort-workouts" className="sr-only">
            Sort workouts
          </label>

          <select
            id="sort-workouts"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="appearance-none rounded-md border border-white/15 bg-[#14171a] py-3 pl-4 pr-11 text-sm font-semibold text-white outline-none transition focus:border-[#ccff00]"
          >
            <option value="duration">Sort By: Duration</option>
            <option value="calories">Sort By: Calories</option>
            <option value="rating">Sort By: Rating</option>
          </select>

          <ChevronDown
            size={17}
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#ccff00]"
          />
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex min-h-64 flex-col items-center justify-center gap-3 text-zinc-400">
          <LoaderCircle
            size={34}
            className="animate-spin text-[#ccff00]"
          />
          <p>Loading workouts…</p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-5 text-center text-red-300">
          {error}
        </div>
      )}

      {/* Workout Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </div>
  );
}