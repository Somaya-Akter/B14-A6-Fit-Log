import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#090b0d]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-7 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Image
            src="/assets/logo.png"
            alt="FitLog logo"
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
          />

          <span className="font-[var(--font-oswald)] text-xl font-bold tracking-wide text-white">
            FITLOG
          </span>
        </div>

        <p className="text-center text-sm text-zinc-500 sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}