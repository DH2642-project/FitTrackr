import { Container, Grid, Stack, Typography } from "@mui/material"
import { Workout, Exercise } from "../../Model/workouts/workoutsSlice"
import { Goal } from "../../Model/goals/goalsReducer"
import { WelcomeCard } from "./WelcomeCard"
import { TopExercisesCard } from "./TopExercisesCard"
import { TodayCard } from "./TodayCard"
import { WeekCard } from "./WeekCard"
import { GoalsCard } from "./GoalsCard"
import { ProfileAvatar } from "../Profile/ProfileAvatar"
import { Link } from "@tanstack/react-router"
import { ScheduleCard } from "./ScheduleCard"

export function FitnessDashboard(
  {
    user,
    numExercisesToday,
    exercisesMax,
    caloriesBurnedToday,
    caloriesMax,
    workoutsThisWeek,
    workoutsLastWeek,
    exercisesThisWeek,
    exercisesLastWeek,
    numUniqueExercisesThisWeek,
    numUniqueExercisesLastWeek,
    kcalBurnedThisWeek,
    kcalBurnedLastWeek,
    topGoals,
    topExercisesThisWeek,
    scheduledWorkouts,
}: {
  user: any
  numExercisesToday: number
  exercisesMax: number
  caloriesBurnedToday: number
  caloriesMax: number
  workoutsThisWeek: Workout[]
  workoutsLastWeek: Workout[]
  exercisesThisWeek: Exercise[]
  exercisesLastWeek: Exercise[]
  numUniqueExercisesThisWeek: number
  numUniqueExercisesLastWeek: number
  kcalBurnedThisWeek: number
  kcalBurnedLastWeek: number
  topGoals: Goal[]
  topExercisesThisWeek: [string, number][]
  scheduledWorkouts: Workout[]
}) {

  return (
    <Container sx={{ paddingY: 2 }}>
      <Grid
        container
        alignItems="center"
        sx={{
          marginBottom: 2,
        }}
      >
        <Grid item xs>
          <Typography variant="h2">Hello {user?.displayName} 👋</Typography>
        </Grid>

        <Grid
          item
          component={Link}
          to="/profile"
          sx={{
            borderRadius: "50%",
            border: "2px solid",
            borderColor: "rgba(0, 0, 0, 0.50)",
            padding: "2px",
          }}
        >
          <ProfileAvatar />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs>
          <WelcomeCard exercises={numExercisesToday} />

          <Stack direction="row" gap={3} flexWrap="wrap">
            <TodayCard
              exercises={numExercisesToday}
              exercisesMax={exercisesMax}
              caloriesBurned={caloriesBurnedToday}
              caloriesMax={caloriesMax}
            />

            <WeekCard
              workoutsThisWeek={workoutsThisWeek}
              workoutsLastWeek={workoutsLastWeek}
              exercisesThisWeek={exercisesThisWeek}
              exercisesLastWeek={exercisesLastWeek}
              uniqueExercisesThisWeek={numUniqueExercisesThisWeek}
              uniqueExercisesLastWeek={numUniqueExercisesLastWeek}
              kcalBurnedThisWeek={kcalBurnedThisWeek}
              kcalBurnedLastWeek={kcalBurnedLastWeek}
            />

            {topGoals.length > 0 && <GoalsCard goals={topGoals} />}
          </Stack>
        </Grid>

        <Grid item>
          <Stack spacing={4}>
            {topExercisesThisWeek.length > 0 && (
              <TopExercisesCard exercises={topExercisesThisWeek} />
            )}

            {scheduledWorkouts.length > 0 && (
              <ScheduleCard workouts={scheduledWorkouts} />
            )}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  )
}
