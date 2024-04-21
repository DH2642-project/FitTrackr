
import { getWeekNumber } from "../helpers.ts";
import { Exercise, Workout } from "../features/workouts/workoutsSlice.ts";
import { GoalData } from "../features/goals/goalsReducer.ts";

export function generateRandomData() {
  const startDate = new Date(2024, 0, 1);
  const endDate = new Date();

  const data: GoalData[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const randomWeight = Math.random() * 10 + 65;
    data.push({
      date: currentDate.toISOString().slice(0, 10),
      value: randomWeight,
    });
    currentDate.setDate(
      currentDate.getDate() + Math.floor(Math.random() * 5) + 1
    );
  }
  return data;
}

export function getCalendarData(
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

export function getWeightlifted(workouts: Workout[]) {
  const dummyWeight = 10;
  let weight = 0;
  workouts.forEach((workout) => {
    const exercises = workout.exercises;
    exercises.forEach((e) => {
      if (e.sets && e.reps) {
        weight += e.sets * e.reps * dummyWeight;
      }
    });
  });
  return weight;
}

export function getWorkoutsPerWeek(workouts: Workout[]): { x: number; y: number }[] {
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

export function getMuscleGroupsData(workouts: Workout[]) {
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
      value: parseFloat(((muscleGroupsData[muscle] / totalSets) * 100).toFixed(2)),
    });
  }
  return result;
}