import React from "react";
import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0c] text-zinc-400 border-t border-zinc-800/80 px-6 py-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Dumbbell className="w-5 h-5 text-[#ccff00] -rotate-45" />
          <span className="font-extrabold text-white text-base tracking-wider uppercase font-sans">
            FITLOG
          </span>
        </div>
        <p className="text-xs text-zinc-400 font-normal tracking-wide text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
