import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import {Card, Typography} from "@mui/material";

const ActivityChart: React.FC<{ data: any[]; title: string }> = ({ data, title }) => {
  return (
    <Card>
      <Typography variant="h4" textAlign="center">{title}</Typography>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
        >
          <XAxis dataKey="date" />
          <YAxis
            label={{ value: "Minutes", angle: -90, position: "insideLeft" }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="strength" fill="#FFA500" />
          <Bar dataKey="cardio" fill="#FF5F00" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ActivityChart;
