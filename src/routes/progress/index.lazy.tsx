import { createLazyFileRoute } from "@tanstack/react-router";
import { ProgressView } from "../../views/Progress/ProgressView.tsx";
import { fetchGoals, setCurrentGoal } from "../../Model/goals/goalsReducer.ts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store.ts";
import { Workout, fetchWorkouts } from "../../Model/workouts/workoutsSlice.ts";
import { useEffect, useState } from "react";
import { getWeekNumber } from "../../helpers.ts";

export const Route = createLazyFileRoute("/progress/")({
  component: ProgressPresenter,
});

export function ProgressPresenter() {
  const goals = useSelector((state: RootState) => state.goals);
  const workouts = useSelector((state: RootState) => state.workouts.workouts);

  const dispatch = useDispatch<AppDispatch>();

  const [isLoading, setIsLoading] = useState(true);

  const updateGoalSelection = (id: string) => {
    dispatch(setCurrentGoal(id));
  };

  useEffect(() => {
    try {
      setIsLoading(true);
      dispatch(fetchGoals());
      dispatch(fetchWorkouts());
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching data")
    }
   
  }, [dispatch]);

  function getCalendarData(
    workouts: Workout[]
  ): { date: string; count: number }[] {
    const calendarMap: { [date: string]: number } = {};

    workouts.forEach((workout) => {
      if (workout.date) {
        const date = workout.date.split("T")[0];
        if (calendarMap[date]) {
          calendarMap[date]++;
        } else {
          calendarMap[date] = 1;
        }
      }
    });

    const calendarData: { date: string; count: number }[] = [];
    for (const date in calendarMap) {
      calendarData.push({ date, count: calendarMap[date] });
    }
    return calendarData;
  }

  function getWeightlifted(workouts: Workout[]) {
    let weight = 0;
    workouts.forEach((workout) => {
      const exercises = workout.exercises;
      exercises.forEach((e) => {
        if (e.sets && e.reps && e.weight) {
          weight += e.sets * e.reps * e.weight;
        }
      });
    });
    return weight;
  }
  
  function getTotalDistance(workouts: Workout[]) {
    let distance = 0;
    workouts.forEach((workout) => {
      const exercises = workout.exercises;
      exercises.forEach((e) => {
        if (e.distance) {
          distance += e.distance;
        }
      });
    });
    return distance;
  }

  function getWorkoutsPerWeek(
    workouts: Workout[]
  ): { x: number; y: number }[] {
    const workoutsPerWeek: { [week: number]: number } = {};

    workouts.forEach((workout) => {
      if (workout.date) {
        const date = new Date(workout.date);
        const weekNumber = getWeekNumber(date);
        workoutsPerWeek[weekNumber] = (workoutsPerWeek[weekNumber] || 0) + 1;
      }
    });

    const data: { x: number; y: number }[] = Object.keys(workoutsPerWeek).map(
      (week) => ({
        x: parseInt(week),
        y: workoutsPerWeek[parseInt(week)],
      })
    );

    return data;
  }

  function getMuscleGroupsData(workouts: Workout[]) {
    let totalSets = 0;
    workouts.forEach((workout) => {
      workout.exercises.forEach((exercise) => {
        if (exercise.sets) {
          totalSets += exercise.sets;
        }
      });
    });

    const muscleGroupsData: { [key: string]: number } = {};
    workouts.forEach((workout) => {
      workout.exercises.forEach((exercise) => {
        if (exercise.muscle) {
          if (!muscleGroupsData[exercise.muscle]) {
            muscleGroupsData[exercise.muscle] = exercise.sets || 0;
          } else muscleGroupsData[exercise.muscle] += exercise.sets || 0;
        }
      });
    });

    const result: { name: string; value: number }[] = [];
    for (const muscle in muscleGroupsData) {
      result.push({
        name: muscle,
        value: parseFloat(
          ((muscleGroupsData[muscle] / totalSets) * 100).toFixed(2)
        ),
      });
    }
    return result;
  }

  function getWorkoutTypesData(workouts: Workout[]) {
    
    
    const workoutTypesData: { [name: string]: number } = {};
    let totalTypes = 0
    workouts.forEach((workout) => {
      const workoutTypeCounted: { [name: string]: boolean } = {};
      workout.exercises.forEach((exercise) => {
        if (exercise.type && !workoutTypeCounted[exercise.type]) {
          workoutTypeCounted[exercise.type] = true;
          totalTypes +=1
          if (!workoutTypesData[exercise.type]) {
            workoutTypesData[exercise.type] = 1
          } else workoutTypesData[exercise.type] += 1;
        }
      });
    });

    const result: { name: string; value: number }[] = [];
    for (const type in workoutTypesData) {
      result.push({
        name: type,
        value: parseFloat(
          ((workoutTypesData[type]) / totalTypes * 100).toFixed(2)
        ),
      });
    }
    return result;
  }
  
  const calendarData = getCalendarData(workouts);
  const totalWeight = getWeightlifted(workouts);
  const totalDistance = getTotalDistance(workouts);
  const weeklyData = getWorkoutsPerWeek(workouts);
  const muscleGroupsData = getMuscleGroupsData(workouts);
  const workoutTypesData = getWorkoutTypesData(workouts);

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
      workoutTypesData={workoutTypesData}
      isLoading={isLoading}
    />
  );
}
