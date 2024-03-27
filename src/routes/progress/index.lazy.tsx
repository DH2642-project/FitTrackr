import {Grid } from "@mui/material";
import { createLazyFileRoute } from "@tanstack/react-router";
import  WeightChart  from "../../components/Progress/WeightLossChart.tsx";
import ActivityChart from "../../components/Progress/ActivityChart.tsx";

export const Route = createLazyFileRoute("/progress/")({
  component: ProgressPresenter,
});


interface Data {
  date: string;
  value: number;
}
// Random weright loss data
const generateWeightLossData = (): Data[] => {
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

// Random monthly data
const generateMonthlyData = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0); // Last day of the month

  const data = [];

  for (
    let date = startDate;
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    const dateString = date.toISOString().slice(0, 10); // Format: YYYY-MM-DD
    const strength = Math.floor(Math.random() * 120); // Random strength minutes
    const cardio = Math.floor(Math.random() * 120); // Random cardio minutes

    data.push({ date: dateString, strength, cardio });
  }

  return data;
};


export function ProgressPresenter() {
    const weightLossData = generateWeightLossData();
    const monthlyData = generateMonthlyData();
    return (
      <>
        <Grid container spacing={4} sx={{ padding: "30px" }}>
          <Grid item xs={6}>
            <WeightChart
              data={weightLossData}
              title={"Weight loss"}
              progress={65}
            ></WeightChart>
          </Grid>
          <Grid item xs={6}>
            <ActivityChart
              data={monthlyData}
              title={"Monthly activity"}
            ></ActivityChart>
          </Grid>
        </Grid>
      </>
    );
}