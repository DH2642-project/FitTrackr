import { Container, Grid, Stack, Typography } from "@mui/material"
import { Exercise, Workout } from "../features/workouts/workoutsSlice"
import { Goal } from "../features/goals/goalsReducer"
import { WelcomeCard } from "./Overview/WelcomeCard"
import { getWeekNumber } from "../helpers"
import { TopExercisesCard } from "./Overview/TopExercisesCard"
import { TodayCard } from "./Overview/TodayCard"
import { WeekCard } from "./Overview/WeekCard"
import { GoalsCard } from "./Overview/GoalsCard"
import { ProfileAvatar } from "../components/ProfileAvatar"
import { Link } from "@tanstack/react-router"
import { auth } from "../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { ScheduleCard } from "./Overview/ScheduleCard"

export function FitnessDashboard({
  workouts,
  goals,
}: {
  workouts: Workout[]
  goals: Goal[]
}) {
  const [user] = useAuthState(auth)

  const workoutsBeforeNow = workouts.filter(
    (workout) => workout.date && new Date(workout.date) < new Date()
  )

  const topGoals = [...goals]
    .sort((a, b) => b.progress - a.progress)
    .filter((goal) => goal.progress > 0 && goal.progress < 100)
    .slice(0, 3)

  const workoutsToday = workoutsBeforeNow.filter(
    (workout) =>
      workout.date &&
      new Date(workout.date).toDateString() === new Date().toDateString()
  )
  const numExercisesToday = workoutsToday.reduce(
    (acc, workout) => acc + workout.exercises.length,
    0
  )
  const caloriesBurnedToday = Math.round(
    workoutsToday.reduce((acc, workout) => acc + (workout.kcal ?? 0), 0)
  )

  // get number of workouts this week and compare to last week
  const weekNumber = getWeekNumber(new Date())
  const weekNumberLastWeek = getWeekNumber(
    new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
  )

  const workoutsThisWeek = workoutsBeforeNow.filter(
    (workout) =>
      workout.date && getWeekNumber(new Date(workout.date)) === weekNumber
  )
  const workoutsLastWeek = workoutsBeforeNow.filter(
    (workout) =>
      workout.date &&
      getWeekNumber(new Date(workout.date)) === weekNumberLastWeek
  )

  const getExerciseCounts = (exercises: Exercise[]) =>
    exercises.reduce(
      (acc, exercise) => {
        acc[exercise.name] =
          (acc[exercise.name] ?? 0) +
          (exercise.sets ?? 0) * (exercise.reps ?? 0)
        return acc
      },
      {} as Record<string, number>
    )

  const exercisesThisWeek = workoutsThisWeek.flatMap(
    (workout) => workout.exercises
  )
  const exerciseThisWeekCounts = getExerciseCounts(exercisesThisWeek)
  const topExercisesThisWeek = Object.entries(exerciseThisWeekCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
  const exercisesLastWeek = workoutsLastWeek.flatMap(
    (workout) => workout.exercises
  )
  const exerciseLastWeekCounts = getExerciseCounts(exercisesLastWeek)

  const numUniqueExercisesThisWeek = Object.keys(exerciseThisWeekCounts).length
  const numUniqueExercisesLastWeek = Object.keys(exerciseLastWeekCounts).length
  const kcalBurnedThisWeek = Math.round(
    workoutsThisWeek.reduce((acc, workout) => acc + (workout.kcal ?? 0), 0)
  )
  const kcalBurnedLastWeek = Math.round(
    workoutsLastWeek.reduce((acc, workout) => acc + (workout.kcal ?? 0), 0)
  )

  const exercisesPerDayThisWeek =
    exercisesThisWeek.length /
    (new Date().getDay() === 0 ? 7 : new Date().getDay())
  const exercisesPerDayLastWeek =
    exercisesLastWeek.length /
    (new Date().getDay() === 0 ? 7 : new Date().getDay())

  const exercisesMax = Math.max(
    exercisesPerDayThisWeek,
    exercisesPerDayLastWeek
  )

  const caloriesPerDayThisWeek =
    kcalBurnedThisWeek / (new Date().getDay() === 0 ? 7 : new Date().getDay())
  const caloriesPerDayLastWeek =
    kcalBurnedLastWeek / (new Date().getDay() === 0 ? 7 : new Date().getDay())

  const caloriesMax = Math.max(caloriesPerDayThisWeek, caloriesPerDayLastWeek)

  const scheduledWorkouts = workouts
    .filter((workout) => {
      const workoutDate = workout.date ? new Date(workout.date) : null
      if (!workoutDate) return false
      return (
        workoutDate > new Date() &&
        workoutDate < new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
      )
    })
    .sort(
      (a, b) =>
        (a.date ? new Date(a.date).getTime() : 0) -
        (b.date ? new Date(b.date).getTime() : 0)
    )
    .slice(0, 5)

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
