import React from "react";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import Image from "next/image";

export default function WorkoutCard({
  id,
  detailsId = id,
  imageUrl,
  muscleGroups = [],
  tags = muscleGroups,
  title = "BARBELL BENCH PRESS",
  equipment = "Barbell, Bench",
  duration = "25 min",
  calories = "180 kcal",
  rating = "4.8",
}) {
  const displayGroups = muscleGroups.length > 0 ? muscleGroups : tags;

  return (
    <Link href={`/workouts/${id || detailsId}`} className="block group">
      <div className="bg-[#121318] border border-zinc-800/80 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 group-hover:border-zinc-700 group-hover:-translate-y-0.5 h-full">
        <div className="relative w-full aspect-video bg-zinc-900 overflow-hidden flex items-center justify-center">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
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
              {title}
            </h3>

            <p className="text-zinc-500 text-xs font-normal mb-6">
              {equipment}
            </p>
          </div>

          <div className="flex items-center gap-4 text-zinc-400 text-xs pt-2 border-t border-zinc-800/50">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-zinc-400" />
              <span>{duration}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-zinc-400 fill-zinc-400/20" />
              <span>{calories}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-zinc-400 fill-zinc-400/20" />
              <span>{rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
