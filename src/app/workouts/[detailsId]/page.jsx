import React from "react";
import { CalendarPlus, Bookmark } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// import { notFound } from "next-[#0a0a0c]";

export default async function WorkoutDetailPage({ params }) {
  // Await params for Next.js 15+ compatibility
  const { detailsId } = await params;

  let workout = null;

  try {
    const res = await fetch(
      `https://api.abcz.workers.dev/api/fitlog/${detailsId}`,
      {
        cache: "no-store",
      },
    );
    if (res.ok) {
      workout = await res.json();
    }
  } catch (error) {
    console.error("Error fetching workout detail:", error);
  }

  if (!workout) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] text-white flex items-center justify-center">
        <p className="text-zinc-400">Workout not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left Column: Image */}
        <div className="relative w-full aspect-4/3 sm:aspect-square rounded-2xl bg-zinc-900 border border-zinc-800/80 overflow-hidden flex items-center justify-center">
          {workout.image || workout.imageUrl ? (
            <Image
              width={588}
              height={735}
              src={workout.image || workout.imageUrl}
              alt="Workout Mindset"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-zinc-600 font-medium uppercase tracking-wider text-sm">
              No Image Available
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight uppercase mb-3">
            {workout.title}
          </h1>

          <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-normal">
            {workout.description}
          </p>

          {/* Tags */}
          <div className="flex items-center gap-2 mb-8">
            {(workout.tags || []).map((tag, idx) => (
              <span
                key={idx}
                className="bg-[#a3e635] text-black font-extrabold text-xs tracking-wider uppercase px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="bg-[#121318] border border-zinc-800/80 rounded-2xl p-5 mb-8 space-y-3.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-400 uppercase tracking-widest font-semibold">
                EQUIPMENT
              </span>
              <span className="text-white font-medium">
                {workout.equipment}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-400 uppercase tracking-widest font-semibold">
                DIFFICULTY
              </span>
              <span className="text-white font-medium">
                {workout.difficulty}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-400 uppercase tracking-widest font-semibold">
                SETS
              </span>
              <span className="text-white font-medium">{workout.sets}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-400 uppercase tracking-widest font-semibold">
                REPS
              </span>
              <span className="text-white font-medium">{workout.reps}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-400 uppercase tracking-widest font-semibold">
                DURATION
              </span>
              <span className="text-white font-medium">{workout.duration}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-400 uppercase tracking-widest font-semibold">
                CALORIES
              </span>
              <span className="text-white font-medium">
                {workout.caloriesBurned}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-400 uppercase tracking-widest font-semibold">
                RATING
              </span>
              <span className="text-white font-medium">{workout.rating}</span>
            </div>
          </div>

          {workout.instructions && workout.instructions.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-extrabold tracking-widest uppercase mb-4 text-white">
                INSTRUCTIONS
              </h3>
              <ol className="space-y-3">
                {workout.instructions.map((step, idx) => (
                  <li
                    key={idx}
                    className="text-xs sm:text-sm text-zinc-300 leading-relaxed flex gap-2"
                  >
                    <span className="font-semibold text-zinc-400">
                      {idx + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
          <div className="flex flex-wrap items-center gap-4">
            <button className="flex items-center justify-center gap-2 bg-[#a3e635] hover:bg-[#b8f542] text-black font-extrabold text-xs sm:text-sm tracking-wider uppercase px-5 py-3 rounded-xl transition-all">
              <CalendarPlus className="w-4 h-4" />
              <span>Add to todays plan</span>
            </button>

            <button className="flex items-center justify-center gap-2 bg-[#121318] hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-semibold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all">
              <Bookmark className="w-4 h-4" />
              <span>Save for later</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
