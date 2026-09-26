"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("Workouts");
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  return (
    <nav className="w-full max-w-7xl mx-auto bg-[#0a0a0c] text-white border-b border-zinc-800 px-6 py-3 flex items-center justify-between mt-2 mb-2">
      <div className="flex items-center gap-2 cursor-pointer">
        <Image src="/logo.png" alt="FitLog Logo" width={28} height={28}></Image>
        <Link href="/">
          <span className="font-extrabold text-lg tracking-wider uppercase font-sans">
            FITLOG
          </span>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab("Workouts")}
          className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${
            activeTab === "Workouts"
              ? "bg-[#1e2d08] text-[#a3e635]"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          Workouts
        </button>

        <button
          onClick={() => setActiveTab("My Plan")}
          className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${
            activeTab === "My Plan"
              ? "bg-[#1e2d08] text-[#a3e635]"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          My Plan
        </button>
      </div>
      <div className="flex items-center gap-6 text-sm text-zinc-300">
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <span>Plan</span>
          <span className="bg-[#a3e635] text-black font-semibold text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {planCount}
          </span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <span>Saved</span>
          <span className="border border-zinc-700 bg-zinc-900/50 text-zinc-300 text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {savedCount}
          </span>
        </div>
      </div>
    </nav>
  );
}
