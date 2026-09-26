import React from "react";
import Image from "next/image";

export default function Banner() {
  return (
    <div className="w-full max-w-7xl mx-auto  px-4 py-6">
      <div className="relative overflow-hidden rounded-2xl bg-[#121318] border border-zinc-800/80 p-8 sm:p-12 lg:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 max-w-2xl z-10">
          <span className="text-xs font-bold tracking-widest text-[#a3e635] uppercase mb-4 block">
            Workout Library
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-[0.95] mb-6">
            Train with intent. <br className="hidden sm:inline" />
            Log every set.
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-lg mb-8 font-normal">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into todays plan, and watch the weeks work add up.
          </p>

          <button className="bg-[#a3e635] hover:bg-[#b8f542] text-black font-extrabold text-xs sm:text-sm tracking-wider uppercase px-6 py-3.5 rounded-lg transition-all transform active:scale-95 shadow-md shadow-[#a3e635]/10">
            Browse Workouts
          </button>
        </div>
        <div className="relative w-full max-w-70 sm:max-w-85 lg:max-w-95 h-64 sm:h-80 lg:h-96 flex items-center justify-center shrink-0">
          <Image
            src="/banner.png"
            alt="Banner Illustration"
            fill
            priority
            className="object-contain object-center drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
          />
        </div>
      </div>
    </div>
  );
}
