import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, Typography } from "@mui/material";

import theme from "../../theme";

export function ActivityChart({
  data,
  title,
  legend,
  yAxisLabel,
}: {
  data: { x: number; y: number }[];
  title: string;
  legend: string;
  yAxisLabel: string;
}) {
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
            <XAxis dataKey="x" />
            <YAxis
              label={{
                value: yAxisLabel,
                angle: -90,
                position: "insideLeft",
              }}
            />
            <YAxis />
            <Tooltip />
            <Legend formatter={() => legend} />
            <Bar dataKey="y" fill={theme.palette.primary.main} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
