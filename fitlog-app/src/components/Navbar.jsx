"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isWorkoutActive = pathname === "/";
  const isPlanActive = pathname === "/my-plan";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0d0f]/95 backdrop-blur">
      <nav className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src="/assets/logo.png"
            alt="FitLog logo"
            width={42}
            height={42}
            priority
            className="h-10 w-10 object-contain"
          />

          <span className="font-[var(--font-oswald)] text-2xl font-bold tracking-wide text-white">
            FITLOG
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-2 sm:gap-6">
          <Link
            href="/#library"
            className={`rounded-md px-2 py-2 text-sm font-semibold transition sm:px-3 ${
              isWorkoutActive
                ? "text-[#ccff00]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`rounded-md px-2 py-2 text-sm font-semibold transition sm:px-3 ${
              isPlanActive
                ? "text-[#ccff00]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* Status Counters */}
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/my-plan"
            className="rounded-full bg-[#ccff00] px-3 py-2 text-xs font-bold text-black transition hover:bg-[#b8e600] sm:px-4 sm:text-sm"
          >
            Plan <span className="ml-1">0</span>
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full border border-zinc-600 px-3 py-2 text-xs font-bold text-white transition hover:border-[#ccff00] hover:text-[#ccff00] sm:px-4 sm:text-sm"
          >
            Saved <span className="ml-1">0</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}