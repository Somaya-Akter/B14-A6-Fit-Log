"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const handleBrowseClick = (event) => {
    event.preventDefault();

    const librarySection = document.getElementById("library");

    if (librarySection) {
      librarySection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      window.history.replaceState(null, "", "#library");
    }
  };

  return (
    <section className="border-b border-white/10 bg-[#0b0d0f]">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div>
          <p className="mb-4 text-sm font-bold tracking-[0.25em] text-[#b6dc28]">
            WORKOUT LIBRARY
          </p>

          <h1 className="font-[var(--font-oswald)] text-5xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Train With Intent.
            <br />
            Log Every Set.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <a
            href="#library"
            onClick={handleBrowseClick}
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#a8d400] px-6 py-3 text-sm font-bold uppercase tracking-wide text-[#10130a] transition hover:bg-[#b7df18]"
          >
            <ArrowDown size={17} />
            Browse Workouts
          </a>
        </div>

        <div className="flex justify-center lg:justify-end">
          <Image
            src="/assets/banner.png"
            alt="FitLog workout banner"
            width={700}
            height={520}
            priority
            className="h-auto w-full max-w-2xl object-contain"
          />
        </div>
      </div>
    </section>
  );
}