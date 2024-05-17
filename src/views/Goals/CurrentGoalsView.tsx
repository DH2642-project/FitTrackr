import { Grid, Button, Card, Stack, Typography, CardContent, Alert, AlertTitle, Tooltip } from "@mui/material";
import { GoalProgressChart } from "../Progress/GoalProgressChart";
import { Goal } from "../../Model/goals/goalsReducer";
import { toFriendlyString } from "../../helpers";
import { DeleteForever } from "@mui/icons-material";

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
              <Typography variant="body1">
                {"Type " + toFriendlyString(goal.goalType || "")}
              </Typography>
              <Typography variant="body1">
                Goal: {goal.endGoal} {goal.metric}
              </Typography>
            </Grid>

            <Grid item xs={3}>
              <GoalProgressChart
                value={goal.progress}
                circleSize={150}
              ></GoalProgressChart>
            </Grid>
          </Grid>
          <Tooltip
            componentsProps={{
              tooltip: {
                sx: { p: 0, borderRadius: 20 },
              },
              arrow: {
                sx: { color: "#fff4e5" },
              },
            }}
            title={
              <Alert severity="warning" sx={{ borderRadius: 4 }}>
                <AlertTitle>Delete forever?</AlertTitle>
                This action cannot be undone.
              </Alert>
            }
            arrow
          >
            <Button
              type="button"
              variant="outlined"
              color="error"
              startIcon={<DeleteForever />}
              onClick={() => onDeleteGoal(goal.key)}
            >
              Delete goal
            </Button>
          </Tooltip>
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
