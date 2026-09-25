import Image from "next/image";
import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";

export default function WorkoutCard({ workout }) {
  const {
    id,
    name,
    image,
    muscleGroups,
    equipment,
    duration,
    caloriesBurned,
    rating,
  } = workout;

  return (
    <Link
      href={`/workouts/${id}`}
      className="group overflow-hidden rounded-xl border border-white/10 bg-[#14171a] transition duration-300 hover:-translate-y-1 hover:border-[#ccff00]/60"
    >
      {/* Workout Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#1b1f23]">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      {/* Card Content */}
      <div className="p-5">
        {/* Muscle Group Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded-full border border-[#ccff00]/40 bg-[#ccff00]/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#ccff00]"
            >
              {group}
            </span>
          ))}
        </div>

        {/* Workout Name */}
        <h3 className="font-[var(--font-oswald)] text-2xl font-bold uppercase text-white transition group-hover:text-[#ccff00]">
          {name}
        </h3>

        {/* Equipment */}
        <p className="mt-2 text-sm text-zinc-400">
          {equipment}
        </p>

        {/* Stats */}
        <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-white/10 pt-4 text-sm text-zinc-300">
          <span className="flex items-center gap-1.5">
            <Clock3 size={16} className="text-[#ccff00]" />
            {duration} min
          </span>

          <span className="flex items-center gap-1.5">
            <Flame size={16} className="text-[#ccff00]" />
            {caloriesBurned} kcal
          </span>

          <span className="flex items-center gap-1.5">
            <Star size={16} className="text-[#ccff00]" />
            {rating}
          </span>
        </div>
      </div>
    </Link>
  );
}