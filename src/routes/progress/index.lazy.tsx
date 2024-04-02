import {Grid } from "@mui/material";
import { createLazyFileRoute } from "@tanstack/react-router";
import { ActivityChart } from "../../components/Progress/ActivityChart.tsx";
import GoalChart from "../../components/Progress/GoalChart.tsx";
import { GoalData, setCurrentGoal } from "../../features/goals/goalsReducer.ts";
import { useDispatch, useSelector } from "react-redux";
import { TotalView } from "../../components/Progress/TotalView.tsx";
import CalendarChart from "../../components/Progress/CalendarChart.tsx";
import { RootState } from "../../store.ts";

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

export type BarChartData = {
  x: number,
  y: number
}
function generateWeeklyData(): BarChartData[] {
  const data : BarChartData[] = [
    { x: 1, y: 5 },
    { x: 2, y: 4 },
    { x: 3, y: 3 },
    { x: 4, y: 7 },
  ];
  return data;
};

const calendarData = [
  { date: "2024/01/11", count: 2 },
  { date: "2024/04/12", count: 2 },
  { date: "2024/05/01", count: 1 },
  { date: "2024/05/02", count: 3 },
  { date: "2024/05/03", count: 1 },
  { date: "2024/05/04", count: 1 },
  { date: "2024/05/08", count: 2 },
  { date: "2024/12/08", count: 3 },
];

export function ProgressPresenter() {
  const goals = useSelector((state: RootState) => state.goals);
  const weeklyData = generateWeeklyData(); 
  const dispatch = useDispatch();
  
  const updateGoalSelection = (id: string) => {
    dispatch(setCurrentGoal(id));
  };

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
              <TotalView title={"Total workouts"} value={"7"}></TotalView>
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
            value={"163"}
          ></TotalView>
        </Grid>
        <Grid item xs={8}>
          <CalendarChart data={calendarData}></CalendarChart>
        </Grid>
      </Grid>
    </>
  );
}