import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, Typography, Grid, Select, MenuItem, SelectChangeEvent, CardContent } from "@mui/material";
import GoalProgressChart from "./GoalProgressChart";


const GoalChart: React.FC<{
  onGoalSelection: any;
  goals: any;
}> = ({onGoalSelection, goals }) => {
  
  

  function handleGoalCange(evt: SelectChangeEvent<string>) {
    onGoalSelection(evt.target.value);
  }

  return (
    <Card sx={{ borderRadius: 4 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h6"> Goal: </Typography>
          </Grid>
          <Grid item xs={6}>
            <Select
              value={goals.currentGoal?.id || ""}
              onChange={handleGoalCange}
            >
              {goals.goals.map((goal : any) => (
                <MenuItem key={goal.id} value={goal.id}>
                  {goal.description}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h4" textAlign="center">
              {goals.exercise}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <GoalProgressChart value={goals.progress} />
          </Grid>
        </Grid>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={goals.currentGoal?.storedValues}
            margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
          >
            <XAxis dataKey="date" />
            <YAxis
              label={{
                value: "Weight (kg)",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#ff7f0e"
              strokeWidth={3}
              activeDot={{ r: 8 }}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default GoalChart;
