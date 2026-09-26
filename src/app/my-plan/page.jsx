"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import WorkoutCard from "@/components/WorkoutCard";

const getWorkoutCalories = (workout) => {
  const calories = [
    workout.calories,
    workout.caloriesBurned,
    workout.kcal,
  ].find((value) => value !== undefined && value !== null && value !== "");
  return Number.parseInt(calories, 10) || 0;
};

const getWorkoutName = (workout) => workout.title || workout.name || "";

export default function MyPlanPage() {
  const {
    planList,
    savedList,
    isHydrated,
    markAsDone,
    removeFromPlan,
    removeFromSaved,
  } = usePlan();
  const [activeTab, setActiveTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");
  const [searchQuery, setSearchQuery] = useState("");

  const currentList = activeTab === "plan" ? planList : savedList;

  const totalExercises = planList.length;
  const totalMinutes = planList.reduce((acc, curr) => {
    const dur = Number.parseInt(curr.duration, 10) || 0;
    return acc + dur;
  }, 0);
  const totalCalories = planList.reduce(
    (acc, curr) => acc + getWorkoutCalories(curr),
    0,
  );

  const filteredList = currentList.filter((workout) => {
    const groups = workout.muscleGroups || workout.tags || [];
    const searchableText = [
      getWorkoutName(workout),
      workout.equipment,
      ...(Array.isArray(groups) ? groups : [groups]),
    ]
      .join(" ")
      .toLowerCase();
    return searchableText.includes(searchQuery.trim().toLowerCase());
  });

  const sortedList = [...filteredList].sort((a, b) => {
    if (sortBy === "duration") {
      return (
        (Number.parseInt(b.duration, 10) || 0) -
        (Number.parseInt(a.duration, 10) || 0)
      );
    }
    if (sortBy === "calories") {
      return getWorkoutCalories(b) - getWorkoutCalories(a);
    }
    if (sortBy === "rating") {
      return (
        (Number.parseFloat(b.rating) || 0) - (Number.parseFloat(a.rating) || 0)
      );
    }
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-white min-h-[80vh]">
      <div className="mb-8">
        <h1 className="text-4xl font-black tracking-wider uppercase mb-2">
          MY PLAN
        </h1>
        <p className="text-zinc-400 text-sm">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 mb-8 sm:grid-cols-3">
        <div className="flex flex-col rounded-xl border border-zinc-800/80 bg-[#121318] p-5">
          <span className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-1">
            Exercises
          </span>
          <span className="text-4xl font-black text-[#a3e635]">
            {totalExercises}
          </span>
        </div>

        <div className="flex flex-col rounded-xl border border-zinc-800/80 bg-[#121318] p-5">
          <span className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-1">
            Minutes
          </span>
          <span className="text-4xl font-black text-white">{totalMinutes}</span>
        </div>

        <div className="flex flex-col rounded-xl border border-zinc-800/80 bg-[#121318] p-5">
          <span className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-1">
            Calories
          </span>
          <span className="text-4xl font-black text-white">
            {totalCalories}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div
          role="tablist"
          aria-label="Workout lists"
          className="bg-[#121318] p-1.5 rounded-xl border border-zinc-800/80 inline-flex gap-1"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "plan"}
            onClick={() => setActiveTab("plan")}
            className={`px-5 py-2 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all ${
              activeTab === "plan"
                ? "bg-[#1e2028] text-white shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Today&apos;s Plan ({planList.length})
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "saved"}
            onClick={() => setActiveTab("saved")}
            className={`px-5 py-2 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all ${
              activeTab === "saved"
                ? "bg-[#1e2028] text-white shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Saved ({savedList.length})
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-[#121318] px-3 py-2 text-zinc-400">
            <Search className="h-4 w-4" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search workouts"
              aria-label="Search workouts by name, equipment, or muscle group"
              className="w-36 bg-transparent text-xs text-white outline-none placeholder:text-zinc-500 sm:w-48"
            />
          </label>
          <label className="flex items-center gap-2">
            <span className="text-zinc-400 text-xs font-semibold uppercase">
              Sort By
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#121318] border border-zinc-800 text-white text-xs font-bold rounded-xl px-4 py-2 focus:outline-none focus:border-zinc-600"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </label>
        </div>
      </div>

      {!isHydrated ? (
        <p role="status" className="py-12 text-center text-sm text-zinc-400">
          Loading workouts…
        </p>
      ) : sortedList.length === 0 && searchQuery.trim() ? (
        <div className="border border-dashed border-zinc-800 rounded-2xl p-12 text-center">
          <p className="text-zinc-400 text-sm">
            No workouts match your search.
          </p>
        </div>
      ) : sortedList.length === 0 ? (
        <div className="border border-dashed border-zinc-800 rounded-3xl p-16 flex flex-col items-center justify-center text-center my-6">
          <h3 className="text-xl font-black tracking-wider uppercase mb-2">
            NOTHING HERE YET
          </h3>
          <p className="text-zinc-400 text-sm max-w-sm mb-6 font-normal">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="bg-[#a3e635] hover:bg-[#b8f542] text-black font-extrabold text-xs tracking-wider uppercase px-6 py-3 rounded-xl transition-all"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedList.map((workout) => (
            <WorkoutCard
              key={workout.id || workout._id}
              id={workout.id || workout._id}
              title={workout.title || workout.name}
              muscleGroups={workout.muscleGroups || workout.tags || []}
              equipment={workout.equipment}
              duration={workout.duration}
              calories={workout.calories}
              caloriesBurned={workout.caloriesBurned}
              kcal={workout.kcal}
              rating={workout.rating}
              imageUrl={workout.image || workout.imageUrl}
              isDone={Boolean(workout.done)}
              onMarkDone={
                activeTab === "plan"
                  ? () => markAsDone(workout.id || workout._id)
                  : undefined
              }
              onRemove={() =>
                activeTab === "plan"
                  ? removeFromPlan(workout.id || workout._id)
                  : removeFromSaved(workout.id || workout._id)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
