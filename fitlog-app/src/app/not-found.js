import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#0b0d0f] px-4">
      <div className="text-center">
        <p className="text-sm font-bold tracking-[0.25em] text-[#a8d400]">
          404 ERROR
        </p>

        <h1 className="mt-3 font-[var(--font-oswald)] text-5xl font-bold uppercase text-white">
          Page Not Found
        </h1>

        <p className="mt-4 text-zinc-400">
          The page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex rounded-md bg-[#a8d400] px-5 py-3 text-sm font-bold text-[#10130a]"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}