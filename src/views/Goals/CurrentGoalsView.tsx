import {
  Grid,
  Button,
  Card,
  Stack,
  Typography,
  CardContent,
} from "@mui/material";
import { GoalProgressChart } from "../Progress/GoalProgressChart";
import { Goal } from "../../features/goals/goalsReducer";

export function CurrentGoalsView({
  onDeleteGoal,
  goals,
}: {
  onDeleteGoal: (key: string) => Promise<void>;
  goals: Goal[];
}) {
  function currentGoalCardCB(goal: Goal) {
    return (
      <Card key={goal.key} sx={{ borderRadius: 4 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <Typography variant="h4">{goal.exercise}</Typography>
              <Typography variant="body1">Type: {goal.goalType}</Typography>
              <Typography variant="body1">
                Start: {goal.startingPoint}
              </Typography>
              <Typography variant="body1">Goal: {goal.endGoal}</Typography>
            </Grid>

            <Grid item xs={3}>
              <GoalProgressChart
                value={goal.progress}
                circleSize={150}
              ></GoalProgressChart>
            </Grid>
          </Grid>

          <Button
            type="button"
            variant="contained"
            color="error"
            onClick={() => onDeleteGoal(goal.key)}
          >
            Delete
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Typography variant="h4">My goals</Typography>
      <Stack spacing={2}>{goals.map(currentGoalCardCB)}</Stack>
    </>
  );
}
