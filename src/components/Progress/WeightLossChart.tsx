import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, Typography, Grid } from "@mui/material";
import GoalProgressChart from "./GoalProgressChart";

const WeightLossChart: React.FC<{
  data: any[];
  title: string;
  progress: number;
}> = ({ data, title, progress }) => {
  return (
    <Card>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h4" textAlign="center">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <GoalProgressChart value={progress} />
        </Grid>
      </Grid>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
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
            dataKey="weight"
            stroke="#ff7f0e"
            activeDot={{ r: 8 }}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default WeightLossChart;
