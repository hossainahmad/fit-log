import React from "react";
import WorkoutDetailActions from "@/components/WorkoutDetailActions";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function WorkoutDetailPage({ params }) {
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
      const data = await res.json();
      // Handle if API returns data wrapped in array or single object
      workout = Array.isArray(data) ? data[0] : data;
    }
  } catch (error) {
    console.error("Failed to fetch workout details:", error);
  }

  if (!workout) notFound();

  const imageUrl = workout.image || workout.imageUrl || workout.img;
  const muscleGroups = workout.muscleGroups || workout.tags || [];
  const workoutTitle = workout.title || workout.name || "Untitled Lift";
  const workoutCalories = [
    workout.caloriesBurned,
    workout.calories,
    workout.kcal,
  ].find((value) => value !== undefined && value !== null && value !== "");

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left Column: Image */}
        <div className="relative w-full aspect-[4/3] sm:aspect-square rounded-2xl bg-[#121318] border border-zinc-800/80 overflow-hidden flex items-center justify-center">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={workoutTitle}
              className="w-full h-full object-cover"
              width={392}
              height={192}
            />
          ) : (
            <div className="text-zinc-600 font-medium uppercase tracking-wider text-xs">
              No Image Available
            </div>
          )}
        </div>

        {/* Right Column: Information */}
        <div className="flex flex-col">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight uppercase mb-3">
            {workoutTitle || "Untitled Lift"}
          </h1>

          {/* Muscle Group Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {muscleGroups.map((group, idx) => (
              <span
                key={idx}
                className="bg-[#a3e635] text-black font-extrabold text-xs tracking-wider uppercase px-3 py-1 rounded-full"
              >
                {group}
              </span>
            ))}
          </div>

          {workout.description && (
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              {workout.description}
            </p>
          )}

          {/* Key Specs Table */}
          <div className="bg-[#121318] border border-zinc-800/80 rounded-2xl p-5 mb-6 space-y-3.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-400 uppercase tracking-widest font-semibold">
                EQUIPMENT
              </span>
              <span className="text-white font-medium">
                {workout.equipment || "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-400 uppercase tracking-widest font-semibold">
                DIFFICULTY
              </span>
              <span className="text-white font-medium">
                {workout.difficulty || "Intermediate"}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-400 uppercase tracking-widest font-semibold">
                SETS
              </span>
              <span className="text-white font-medium">
                {workout.sets || "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-400 uppercase tracking-widest font-semibold">
                REPS
              </span>
              <span className="text-white font-medium">
                {workout.reps || "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-400 uppercase tracking-widest font-semibold">
                DURATION
              </span>
              <span className="text-white font-medium">
                {workout.duration ? `${workout.duration} min` : "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-400 uppercase tracking-widest font-semibold">
                CALORIES
              </span>
              <span className="text-white font-medium">
                {workoutCalories ? `${workoutCalories} kcal` : "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-400 uppercase tracking-widest font-semibold">
                RATING
              </span>
              <span className="text-white font-medium">
                {workout.rating || "4.8"}
              </span>
            </div>
          </div>

          {/* Instructions List */}
          {workout.instructions && workout.instructions.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-extrabold tracking-widest uppercase mb-3 text-white">
                INSTRUCTIONS
              </h3>
              <ol className="space-y-2.5">
                {workout.instructions.map((step, idx) => (
                  <li
                    key={idx}
                    className="text-xs text-zinc-300 leading-relaxed flex gap-2"
                  >
                    <span className="font-bold text-[#a3e635]">{idx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Interactive Action Buttons */}
          <WorkoutDetailActions workout={workout} />
        </div>
      </div>
    </div>
  );
}
