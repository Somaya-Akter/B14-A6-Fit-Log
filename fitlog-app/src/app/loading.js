import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#0b0d0f]">
      <div className="flex flex-col items-center gap-3">
        <LoaderCircle
          size={36}
          className="animate-spin text-[#a8d400]"
        />

        <p className="text-sm font-semibold text-zinc-400">
          Loading workouts…
        </p>
      </div>
    </main>
  );
}