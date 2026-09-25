"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWorkout } from "@/context/WorkoutContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useWorkout();

  const isWorkoutActive =
    pathname === "/" || pathname.startsWith("/workouts");

  const isPlanActive = pathname === "/my-plan";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0d0f]/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:flex-nowrap sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Image
            src="/assets/logo.png"
            alt="FitLog logo"
            width={42}
            height={42}
            priority
            className="h-9 w-9 object-contain sm:h-10 sm:w-10"
          />

          <span className="font-[var(--font-oswald)] text-xl font-bold tracking-wide text-white sm:text-2xl">
            FITLOG
          </span>
        </Link>

        <div className="order-3 flex w-full items-center justify-center gap-8 sm:order-none sm:w-auto">
          <Link
            href="/#library"
            className={`relative px-1 py-2 text-sm font-semibold transition ${
              isWorkoutActive
                ? "text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Workout

            {isWorkoutActive && (
              <span className="absolute bottom-0 left-1/2 h-1 w-3 -translate-x-1/2 rounded-full bg-zinc-400" />
            )}
          </Link>

          <Link
            href="/my-plan"
            className={`relative px-1 py-2 text-sm font-semibold transition ${
              isPlanActive
                ? "text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            My Plan

            {isPlanActive && (
              <span className="absolute bottom-0 left-1/2 h-1 w-3 -translate-x-1/2 rounded-full bg-zinc-400" />
            )}
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/my-plan"
            className="rounded-full bg-[#a8d400] px-3 py-2 text-xs font-bold text-[#10130a] transition hover:bg-[#b7df18] sm:px-4 sm:text-sm"
          >
            Plan <span className="ml-1">{plan.length}</span>
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full border border-zinc-600 px-3 py-2 text-xs font-bold text-white transition hover:border-zinc-400 sm:px-4 sm:text-sm"
          >
            Saved <span className="ml-1">{saved.length}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}