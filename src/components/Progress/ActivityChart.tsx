import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import {Card, CardContent, Typography} from "@mui/material";

const ActivityChart: React.FC<{ data: any[]; title: string }> = ({
  data,
  title,
}) => {
  return (
    <Card sx={{ borderRadius: 4 }}>
      <CardContent>
        <Typography variant="h4" textAlign="center">
          {title}
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
          >
            <XAxis dataKey="week" />
            <YAxis
              label={{
                value: "Completed Workouts",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <YAxis />
            <Tooltip />
            <Legend />

            <Bar dataKey="completedWorkouts" fill="#ff7f0e" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ActivityChart;
