"use client";

import { Bookmark, CalendarPlus } from "lucide-react";
import { useWorkout } from "@/context/WorkoutContext";

export default function WorkoutActions({ workout }) {
  const { plan, saved, addToPlan, saveWorkout } = useWorkout();

  const isInPlan = plan.some((item) => item.id === workout.id);
  const isSaved = saved.some((item) => item.id === workout.id);

  return (
    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={() => addToPlan(workout)}
        className={`inline-flex flex-1 items-center justify-center gap-2 rounded-md px-5 py-3 font-bold transition ${
          isInPlan
            ? "border border-[#a8d400]/50 bg-[#a8d400]/10 text-[#a8d400]"
            : "bg-[#a8d400] text-[#10130a] hover:bg-[#b7df18]"
        }`}
      >
        <CalendarPlus size={19} />

        {isInPlan ? "Added to today's plan" : "Add to today's plan"}
      </button>

      <button
        type="button"
        onClick={() => saveWorkout(workout)}
        className={`inline-flex flex-1 items-center justify-center gap-2 rounded-md border px-5 py-3 font-bold transition ${
          isSaved
            ? "border-[#a8d400]/50 bg-[#a8d400]/10 text-[#a8d400]"
            : "border-white/20 bg-transparent text-white hover:border-[#a8d400] hover:text-[#a8d400]"
        }`}
      >
        <Bookmark size={19} />

        {isSaved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
}