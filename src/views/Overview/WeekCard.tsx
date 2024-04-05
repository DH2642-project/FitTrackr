import { Card, CardContent, Stack, Typography } from "@mui/material"
import { Exercise, Workout } from "../../features/workouts/workoutsSlice"
import { MetricsCard } from "./MetricsCard"

export function WeekCard({
  workoutsThisWeek,
  workoutsLastWeek,
  exercisesThisWeek,
  exercisesLastWeek,
  uniqueExercisesThisWeek,
  uniqueExercisesLastWeek,
  kcalBurnedThisWeek,
  kcalBurnedLastWeek,
}: {
  workoutsThisWeek: Workout[]
  workoutsLastWeek: Workout[]
  exercisesThisWeek: Exercise[]
  exercisesLastWeek: Exercise[]
  uniqueExercisesThisWeek: number
  uniqueExercisesLastWeek: number
  kcalBurnedThisWeek: number
  kcalBurnedLastWeek: number
}) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          This week
        </Typography>

        <Stack direction="row" gap={2} flexWrap="wrap">
          <MetricsCard
            title="Workouts"
            thisWeek={workoutsThisWeek.length}
            lastWeek={workoutsLastWeek.length}
          />
          <MetricsCard
            title="Exercises per workout"
            thisWeek={
              workoutsThisWeek.length > 0
                ? Math.round(
                    (exercisesThisWeek.length / workoutsThisWeek.length) * 10
                  ) / 10
                : 0
            }
            lastWeek={
              workoutsLastWeek.length > 0
                ? Math.round(
                    (exercisesLastWeek.length / workoutsLastWeek.length) * 10
                  ) / 10
                : 0
            }
          />
          <MetricsCard
            title="Unique exercises"
            thisWeek={uniqueExercisesThisWeek}
            lastWeek={uniqueExercisesLastWeek}
          />
          <MetricsCard
            title="Calories burned"
            thisWeek={kcalBurnedThisWeek}
            lastWeek={kcalBurnedLastWeek}
          />
        </Stack>
      </CardContent>
    </Card>
  )
}
