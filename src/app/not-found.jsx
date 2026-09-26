import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[65vh] flex-col items-center justify-center px-4 text-center text-white">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#a3e635]">
        404
      </p>
      <h1 className="mb-3 text-3xl font-black uppercase">Page not found</h1>
      <p className="mb-6 max-w-sm text-sm text-zinc-400">
        This page doesn&apos;t exist or the workout is no longer available.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-[#a3e635] px-5 py-3 text-xs font-extrabold uppercase tracking-wider text-black hover:bg-[#b8f542]"
      >
        Go to workouts
      </Link>
    </div>
  );
}
