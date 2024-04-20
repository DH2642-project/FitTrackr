import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  Typography,
  Grid,
  Select,
  MenuItem,
  SelectChangeEvent,
  CardContent,
} from "@mui/material";
import { GoalProgressChart } from "./GoalProgressChart";
import { Goal, GoalsState } from "../../features/goals/goalsReducer";
import theme from "../../theme";

export function GoalChart({
  onGoalSelection,
  goals,
}: {
  onGoalSelection: (id: string) => void;
  goals: GoalsState;
}) {
  function handleGoalCange(evt: SelectChangeEvent<string>) {
    onGoalSelection(evt.target.value);
  }

  return (
    <Card sx={{ borderRadius: 4 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4"> Goals</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6"> Select a goal: </Typography>
          </Grid>
          <Grid item xs={6}>
            <Select
              value={goals.currentGoal?.key || ''}
              onChange={handleGoalCange}
            >
              {goals.goals.map((goal: Goal) => (
                <MenuItem key={goal.key} value={goal.key}>
                  {goal.exercise}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6"> Progress: </Typography>
          </Grid>
          <Grid item xs={6}>
            <GoalProgressChart value={goals.progress} circleSize={75} />
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
                value: goals.currentGoal?.metric,
                angle: -90,
                position: "insideLeft",
              }}
            />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke={theme.palette.primary.main}
              strokeWidth={3}
              activeDot={{ r: 8 }}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
