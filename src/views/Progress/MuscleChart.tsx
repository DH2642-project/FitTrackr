import { Card, CardContent, Typography } from "@mui/material";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import theme from "../../theme";

export function MuscleChart({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  const COLORS = [
    "#1f77b4", // blue
    "#ff7f0e", // orange
    "#2ca02c", // green
    "#d62728", // red
    "#9467bd", // purple
    "#8c564b", // brown
    "#e377c2", // pink
    "#7f7f7f", // gray
    "#bcbd22", // olive
    "#17becf", // cyan
    "#1a9850", // dark green
    "#66c2a5", // light green
    "#fc8d62", // salmon
    "#8da0cb", // lavender
    "#e78ac3", // light pink
    "#a6d854", // lime green
    "#ffd92f", // yellow
    "#e5c494", // beige
    "#b3b3b3", // light gray
    "#ffeda0", // light yellow
  ];

  return (
    <Card sx={{ borderRadius: 4 }}>
      <CardContent>
        <Typography variant="h4">Muscles worked</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Tooltip />
            <Legend layout="vertical" verticalAlign="middle" align="right" />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill={theme.palette.primary.main}
              label={({ value }) => `(${value}%)`}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default MuscleChart;
