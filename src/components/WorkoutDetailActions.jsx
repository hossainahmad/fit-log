"use client";

import React from "react";
import { CalendarPlus, Bookmark } from "lucide-react";
import { usePlan } from "@/context/PlanContext";

export default function WorkoutDetailActions({ workout }) {
  const { addToPlan, addToSaved, planList } = usePlan();
  const alreadyPlanned = planList.some(
    (item) => (item.id || item._id) === (workout.id || workout._id),
  );
  const planIsFull = planList.length >= 5 && !alreadyPlanned;

  return (
    <div className="flex flex-wrap items-center gap-4 mt-6">
      <button
        type="button"
        onClick={() => addToPlan(workout)}
        disabled={planIsFull}
        className="flex items-center justify-center gap-2 bg-[#a3e635] hover:bg-[#b8f542] text-black font-extrabold text-xs sm:text-sm tracking-wider uppercase px-5 py-3 rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-300"
      >
        <CalendarPlus className="w-4 h-4" />
        <span>{planIsFull ? "Plan full" : "Add to today's plan"}</span>
      </button>

      <button
        type="button"
        onClick={() => addToSaved(workout)}
        className="flex items-center justify-center gap-2 bg-[#121318] hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-semibold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all cursor-pointer"
      >
        <Bookmark className="w-4 h-4" />
        <span>Save for later</span>
      </button>
    </div>
  );
}
