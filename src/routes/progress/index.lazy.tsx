import { createLazyFileRoute } from "@tanstack/react-router";
import { ProgressView } from "../../views/ProgressView.tsx";
import { fetchGoals, setCurrentGoal } from "../../features/goals/goalsReducer.ts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store.ts";
import { fetchWorkouts } from "../../features/workouts/workoutsSlice.ts";
import { useEffect } from "react";
import { getCalendarData, getMuscleGroupsData, getTotalDistance, getWeightlifted, getWorkoutsPerWeek } from "../../utils/progressUtils.tsx";

export const Route = createLazyFileRoute("/progress/")({
  component: ProgressPresenter,
});

export function ProgressPresenter() {
  const goals = useSelector((state: RootState) => state.goals);
  const workouts = useSelector((state: RootState) => state.workouts.workouts);

  const dispatch = useDispatch<AppDispatch>();

  const updateGoalSelection = (id: string) => {
    dispatch(setCurrentGoal(id));
  };

  useEffect(() => {
    try {
       dispatch(fetchGoals());
       dispatch(fetchWorkouts());
    } catch (error) {
      console.log("Error fetching data")
    }
   
  }, [dispatch]);

  const calendarData = getCalendarData(workouts);
  const totalWeight = getWeightlifted(workouts);
  const totalDistance = getTotalDistance(workouts);
  const weeklyData = getWorkoutsPerWeek(workouts);
  const muscleGroupsData = getMuscleGroupsData(workouts);

  return (
    <ProgressView
      goals={goals}
      workouts={workouts}
      updateGoalSelection={updateGoalSelection}
      calendarData={calendarData}
      totalWeight={totalWeight}
      totalDistance={totalDistance}
      weeklyData={weeklyData}
      muscleGroupsData={muscleGroupsData}
    />
  );
}
