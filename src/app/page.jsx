import React from "react";
import WorkoutCard from "../components/WorkoutCard";
import Banner from "@/components/Banner";

export default async function LibrarySection() {
  let workouts = [];

  try {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      cache: "no-store",
    });
    if (res.ok) {
      workouts = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch workouts:", error);
  }

  return (
    <>
      <Banner></Banner>
      <section
        id="library"
        className="w-full max-w-7xl mx-auto scroll-mt-24 px-4 py-8"
      >
        <div className="mb-8">
          <h2 className="text-3xl font-black text-white tracking-wider uppercase">
            THE LIBRARY
          </h2>
          <p className="text-zinc-400 text-sm mt-1">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout.id || workout._id}
              id={workout.id || workout._id}
              title={workout.title || workout.name}
              muscleGroups={workout.muscleGroups || workout.tags || []}
              equipment={workout.equipment}
              duration={workout.duration}
              calories={
                workout.calories || workout.caloriesBurned || workout.kcal
              }
              rating={workout.rating}
              imageUrl={workout.image || workout.imageUrl}
            />
          ))}
        </div>
      </section>
    </>
  );
}
