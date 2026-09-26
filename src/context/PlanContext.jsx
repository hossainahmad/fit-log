"use client";

import React, {
  createContext,
  useContext,
  useState,
  useSyncExternalStore,
} from "react";

const PlanContext = createContext();

const readSnapshot = (key) => {
  try {
    return localStorage.getItem(key) || "[]";
  } catch {
    return "[]";
  }
};

const parseList = (snapshot) => {
  try {
    const value = JSON.parse(snapshot);
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
};

const subscribeToKey = (eventName, onChange) => {
  const handleStorage = (event) => {
    if (
      !event.key ||
      event.key === "fitlog_plan" ||
      event.key === "fitlog_saved"
    ) {
      onChange();
    }
  };

  window.addEventListener(eventName, onChange);
  window.addEventListener("storage", handleStorage);
  return () => {
    window.removeEventListener(eventName, onChange);
    window.removeEventListener("storage", handleStorage);
  };
};

const updateList = (key, eventName, updater) => {
  const nextList = updater(parseList(readSnapshot(key)));
  localStorage.setItem(key, JSON.stringify(nextList));
  window.dispatchEvent(new Event(eventName));
};

export function PlanProvider({ children }) {
  const planSnapshot = useSyncExternalStore(
    (onChange) => subscribeToKey("fitlog:plan-change", onChange),
    () => readSnapshot("fitlog_plan"),
    () => "[]",
  );
  const savedSnapshot = useSyncExternalStore(
    (onChange) => subscribeToKey("fitlog:saved-change", onChange),
    () => readSnapshot("fitlog_saved"),
    () => "[]",
  );
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => typeof window !== "undefined",
    () => false,
  );
  const planList = parseList(planSnapshot);
  const savedList = parseList(savedSnapshot);
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const addToPlan = (workout) => {
    const workoutName = workout.title || workout.name || "Untitled workout";
    const exists = planList.some(
      (item) => (item.id || item._id) === (workout.id || workout._id),
    );
    if (exists) {
      showToast(`"${workoutName}" is already in today's plan`);
      return;
    }

    if (planList.length >= 5) {
      showToast("Today's plan is full. Remove a lift before adding another.");
      return;
    }

    updateList("fitlog_plan", "fitlog:plan-change", (prev) => [
      ...prev,
      workout,
    ]);
    showToast(`Added "${workoutName}" to today's plan`);
  };

  const addToSaved = (workout) => {
    const workoutName = workout.title || workout.name || "Untitled workout";
    const exists = savedList.some(
      (item) => (item.id || item._id) === (workout.id || workout._id),
    );
    if (!exists) {
      updateList("fitlog_saved", "fitlog:saved-change", (prev) => [
        ...prev,
        workout,
      ]);
      showToast(`Saved "${workoutName}" for later`);
    } else {
      showToast(`"${workoutName}" is already saved`);
    }
  };

  const removeFromPlan = (id) => {
    updateList("fitlog_plan", "fitlog:plan-change", (prev) =>
      prev.filter((item) => (item.id || item._id) !== id),
    );
    showToast("Removed from today's plan");
  };

  const removeFromSaved = (id) => {
    updateList("fitlog_saved", "fitlog:saved-change", (prev) =>
      prev.filter((item) => (item.id || item._id) !== id),
    );
    showToast("Removed from saved lifts");
  };

  const markAsDone = (id) => {
    const workout = planList.find((item) => (item.id || item._id) === id);
    if (!workout || workout.done) return;

    updateList("fitlog_plan", "fitlog:plan-change", (prev) =>
      prev.map((item) =>
        (item.id || item._id) === id ? { ...item, done: true } : item,
      ),
    );
    showToast(`Marked "${workout.title || workout.name || "Workout"}" as done`);
  };

  return (
    <PlanContext.Provider
      value={{
        planList,
        savedList,
        isHydrated,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
      }}
    >
      {children}

      {/* Global Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#a3e635] text-black px-4 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-xl tracking-wide flex items-center gap-2 transition-all animate-bounce">
          <span>✓</span>
          <span>{toast}</span>
        </div>
      )}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  return useContext(PlanContext);
}
