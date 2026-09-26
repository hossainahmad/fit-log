import React from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Clock, Flame, Star, X } from "lucide-react";
import Image from "next/image";

export default function WorkoutCard({
  id,
  _id,
  detailsId = id || _id,
  imageUrl,
  image = imageUrl,
  muscleGroups = [],
  tags = muscleGroups,
  name,
  title,
  equipment = "Barbell, Bench",
  duration,
  calories,
  caloriesBurned,
  kcal,
  rating = "4.8",
  isDone = false,
  onMarkDone,
  onRemove,
}) {
  const displayTitle = title || name || "UNTITLED WORKOUT";
  const displayImage = image || imageUrl;
  const displayGroups =
    muscleGroups && muscleGroups.length > 0 ? muscleGroups : tags;

  const formattedDuration = duration
    ? typeof duration === "number" || !duration.toString().includes("min")
      ? `${duration} min`
      : duration
    : "25 min";

  const displayCalories = [calories, caloriesBurned, kcal].find(
    (value) => value !== undefined && value !== null && value !== "",
  );
  const formattedCalories = displayCalories
    ? typeof displayCalories === "number" ||
      !displayCalories.toString().includes("kcal")
      ? `${displayCalories} kcal`
      : displayCalories
    : "180 kcal";

  const cardContent = (
    <>
      <div className="relative w-full aspect-video bg-zinc-900 overflow-hidden flex items-center justify-center">
        {displayImage ? (
          <Image
            src={displayImage}
            alt={displayTitle}
            width={392}
            height={192}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-zinc-600">
            <span className="text-xs uppercase tracking-wider font-semibold">
              Image Slot
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {displayGroups.map((group, idx) => (
              <span
                key={idx}
                className="bg-[#a3e635] text-black font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full"
              >
                {group}
              </span>
            ))}
          </div>

          <h3 className="text-white font-black text-lg tracking-wide uppercase leading-tight mb-1 group-hover:text-[#a3e635] transition-colors">
            {displayTitle}
          </h3>

          <p className="text-zinc-500 text-xs font-normal mb-6">{equipment}</p>
        </div>

        <div className="flex items-center gap-4 text-zinc-400 text-xs pt-2 border-t border-zinc-800/50">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-zinc-400" />
            <span>{formattedDuration}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-zinc-400 fill-zinc-400/20" />
            <span>{formattedCalories}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-zinc-400 fill-zinc-400/20" />
            <span>{rating}</span>
          </div>
        </div>
      </div>
    </>
  );

  if (onMarkDone || onRemove) {
    return (
      <article className="bg-[#121318] border border-zinc-800/80 rounded-xl overflow-hidden flex flex-col h-full">
        <Link href={`/workouts/${detailsId}`} className="block group flex-1">
          {cardContent}
        </Link>
        <div className="flex items-center gap-2 p-3 border-t border-zinc-800/80">
          <Link
            href={`/workouts/${detailsId}`}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-2 text-xs font-bold text-zinc-200 hover:bg-zinc-800"
          >
            <ArrowUpRight className="h-3.5 w-3.5" />
            View Details
          </Link>
          {onMarkDone && (
            <button
              type="button"
              onClick={onMarkDone}
              disabled={isDone}
              aria-pressed={isDone}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#a3e635] px-3 py-2 text-xs font-extrabold text-black hover:bg-[#b8f542] disabled:cursor-default disabled:bg-zinc-800 disabled:text-zinc-400"
            >
              <Check className="h-3.5 w-3.5" />
              {isDone ? "Done" : "Mark as Done"}
            </button>
          )}
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              aria-label={`Remove ${displayTitle}`}
              title="Remove workout"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-700 text-zinc-300 hover:border-red-400 hover:text-red-300"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </article>
    );
  }

  return (
    <Link href={`/workouts/${detailsId}`} className="block h-full group">
      <div className="bg-[#121318] border border-zinc-800/80 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 group-hover:border-zinc-700 group-hover:-translate-y-0.5 h-full">
        {cardContent}
      </div>
    </Link>
  );
}
