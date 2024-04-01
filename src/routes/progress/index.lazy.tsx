import {Grid } from "@mui/material";
import { createLazyFileRoute } from "@tanstack/react-router";
import ActivityChart from "../../components/Progress/ActivityChart.tsx";
import GoalChart from "../../components/Progress/GoalChart.tsx";
import { setCurrentGoal } from "../../features/goals/goalsReducer.ts";
import { useDispatch, useSelector } from "react-redux";
import { TotalView } from "../../components/Progress/TotalView.tsx";
import CalendarChart from "../../components/Progress/CalendarChart.tsx";
import { RootState } from "../../store.ts";

export const Route = createLazyFileRoute("/progress/")({
  component: ProgressPresenter,
});


interface Data {
  date: string;
  value: number;
}
// Random weright loss data
export function generateRandomData() {
  const startDate = new Date(2024, 0, 1); // January 1, 2024
  const endDate = new Date(); // Current date

  const data: Data[] = [];
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

const generateWeeklyData = () => {
  
  const data = [
    { week: 1, completedWorkouts: 5 },
    { week: 2, completedWorkouts: 4 },
    { week: 3, completedWorkouts: 3 },
    { week: 4, completedWorkouts: 7 },
  ];
  

  return data;
};

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
            <GoalChart onGoalSelection={updateGoalSelection} goals={goals} ></GoalChart>
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
                title={"Weekly activity"}
              ></ActivityChart>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <CalendarChart></CalendarChart>
        </Grid>
      </Grid>
    </>
  );
}