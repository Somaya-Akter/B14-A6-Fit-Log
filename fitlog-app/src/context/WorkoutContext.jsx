"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

const WorkoutContext = createContext(null);

export function WorkoutProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Load saved data from localStorage
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog-plan");
      const storedSaved = localStorage.getItem("fitlog-saved");

      if (storedPlan) {
        setPlan(JSON.parse(storedPlan));
      }

      if (storedSaved) {
        setSaved(JSON.parse(storedSaved));
      }
    } catch {
      console.error("Could not load FitLog data from localStorage.");
    } finally {
      setLoaded(true);
    }
  }, []);

  // Save plan to localStorage
  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan, loaded]);

  // Save saved-list to localStorage
  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved, loaded]);

  const addToPlan = (workout) => {
    const alreadyAdded = plan.some((item) => item.id === workout.id);

    if (alreadyAdded) {
      toast.warning(`${workout.name} is already in today's plan.`);
      return;
    }

    if (plan.length >= 5) {
      toast.warning("Today's plan can contain a maximum of 5 workouts.");
      return;
    }

    setPlan((currentPlan) => [...currentPlan, workout]);
    toast.success("Added to today's plan.");
  };

  const saveWorkout = (workout) => {
    const alreadySaved = saved.some((item) => item.id === workout.id);

    if (alreadySaved) {
      toast.warning(`${workout.name} is already saved.`);
      return;
    }

    setSaved((currentSaved) => [...currentSaved, workout]);
    toast.success("Saved for later.");
  };

  const removeFromPlan = (id) => {
    setPlan((currentPlan) =>
      currentPlan.filter((workout) => workout.id !== id)
    );

    toast.info("Workout removed from today's plan.");
  };

  const removeFromSaved = (id) => {
    setSaved((currentSaved) =>
      currentSaved.filter((workout) => workout.id !== id)
    );

    toast.info("Workout removed from saved workouts.");
  };

  const markAsDone = (id) => {
    const workout = plan.find((item) => item.id === id);

    setPlan((currentPlan) =>
      currentPlan.filter((item) => item.id !== id)
    );

    if (workout) {
      toast.success(`${workout.name} marked as done.`);
    }
  };

  return (
    <WorkoutContext.Provider
      value={{
        plan,
        saved,
        loaded,
        addToPlan,
        saveWorkout,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error("useWorkout must be used inside WorkoutProvider");
  }

  return context;
}