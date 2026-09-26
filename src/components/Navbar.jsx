"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const { planList, savedList } = usePlan();

  return (
    <header className="w-full border-b border-zinc-800/80 bg-[#0a0a0c]/90 sticky top-0 z-40 backdrop-blur-md px-4 py-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <Link
          href="/"
          className="flex items-center gap-2 text-white font-black tracking-wider text-xl uppercase"
        >
          {/* <span className="text-[#a3e635] text-2xl">🏋️</span> */}
          <Image src="/logo.png" alt="FitLog logo" width={28} height={28} />
          <span>FITLOG</span>
        </Link>
        <nav
          aria-label="Main navigation"
          className="flex items-center gap-1 sm:gap-3"
        >
          <Link
            href="/"
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
              pathname === "/" || pathname.startsWith("/workouts")
                ? "bg-[#181920] text-[#a3e635] border border-zinc-800"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
              pathname === "/my-plan"
                ? "bg-[#181920] text-[#a3e635] border border-zinc-800"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Counter Badges */}
        <div className="flex items-center gap-4 text-xs font-bold">
          <Link
            href="/my-plan"
            aria-label={`Today's plan, ${planList.length} workouts`}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white"
          >
            <span>Plan</span>
            <span className="bg-[#a3e635] text-black min-w-5 h-5 px-1 rounded-full flex items-center justify-center font-black text-[11px]">
              {planList.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            aria-label={`Saved workouts, ${savedList.length} workouts`}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white"
          >
            <span>Saved</span>
            <span className="bg-zinc-800 text-zinc-300 min-w-5 h-5 px-1 rounded-full flex items-center justify-center font-extrabold text-[11px] border border-zinc-700">
              {savedList.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
