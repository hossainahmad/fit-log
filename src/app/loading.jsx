export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[50vh] items-center justify-center gap-3 text-sm text-zinc-400"
    >
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-700 border-t-[#a3e635]" />
      <span>Loading workouts&hellip;</span>
    </div>
  );
}
