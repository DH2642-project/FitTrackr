import {Grid } from "@mui/material";
import { createLazyFileRoute } from "@tanstack/react-router";
import { ActivityChart } from "../../views/Progress/ActivityChart.tsx";
import GoalChart from "../../views/Progress/GoalChart.tsx";
import { GoalData, setCurrentGoal } from "../../features/goals/goalsReducer.ts";
import { useDispatch, useSelector } from "react-redux";
import { TotalView } from "../../views/Progress/TotalView.tsx";
import CalendarChart from "../../views/Progress/CalendarChart.tsx";
import { RootState } from "../../store.ts";
import { Workout } from "../../features/workouts/workoutsSlice.ts";

export const Route = createLazyFileRoute("/progress/")({
  component: ProgressPresenter,
});


// Random weright loss data
export function generateRandomData() {
  const startDate = new Date(2024, 0, 1); // January 1, 2024
  const endDate = new Date(); // Current date

  const data: GoalData[] = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const randomWeight = Math.random() * 10 + 65; // Generate weight between 75 and 80
    data.push({
      date: currentDate.toISOString().slice(0, 10),
      value: randomWeight,
    });
    currentDate.setDate(
      currentDate.getDate() + Math.floor(Math.random() * 5) + 1
    ); // Randomly add 1-5 days
  }

  return data;
};




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
  console.log(calendarData)
  return calendarData;
}

function getWeightlifted(workouts: Workout[])  {
  const dummyWeight = 10
  let weight = 0
  workouts.forEach((workout) => {
    const exercises = workout.exercises
    exercises.forEach((e) => {
      if (e.sets && e.reps) {
        weight += e.sets * e.reps * dummyWeight
      }
    });

  });
  return weight
}

function getWorkoutsPerWeek(workouts: Workout[]): { x: number;  y: number}[] {
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

function getWeekNumber(date: Date): number {
  const oneJan = new Date(date.getFullYear(), 0, 1);
  const millisecsInDay = 86400000; 
  return Math.ceil(
    ((date.getTime() - oneJan.getTime()) / millisecsInDay +
      oneJan.getDay() +
      1) /
      7
  );
}


export function ProgressPresenter() {
  const goals = useSelector((state: RootState) => state.goals);
  const workouts = useSelector((state: RootState) => state.workouts.workouts);
   
  const dispatch = useDispatch();
  
  const updateGoalSelection = (id: string) => {
    dispatch(setCurrentGoal(id));
  };

  const calendarData = getCalendarData(workouts)
  const totalWeight = getWeightlifted(workouts)
  const weeklyData = getWorkoutsPerWeek(workouts);

  return (
    <>
      <Grid container spacing={4} sx={{ padding: "30px" }}>
        {goals.goals.length > 0 && (
          <Grid item xs={6}>
            <GoalChart
              onGoalSelection={updateGoalSelection}
              goals={goals}
            ></GoalChart>
          </Grid>
        )}

        <Grid item xs={6}>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <TotalView title={"Total distance (km)"} value={"55"}></TotalView>
            </Grid>
            <Grid item xs={6}>
              <TotalView title={"Total workouts"} value={workouts.length}></TotalView>
            </Grid>
            <Grid item xs={12}>
              <ActivityChart
                data={weeklyData}
                title="Weekly activity"
                legend="Week"
                yAxisLabel="Completed workouts"
              ></ActivityChart>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <TotalView
            title={"Total weight lifted (kg)"}
            value={totalWeight}
          ></TotalView>
        </Grid>
        <Grid item xs={8}>
          <CalendarChart data={calendarData}></CalendarChart>
        </Grid>
      </Grid>
    </>
  );
}