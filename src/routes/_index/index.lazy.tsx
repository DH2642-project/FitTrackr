import { createLazyFileRoute } from "@tanstack/react-router"
import { AppDispatch, RootState } from "../../store"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchWorkouts, Exercise } from "../../Model/workouts/workoutsSlice"
import { fetchGoals } from "../../Model/goals/goalsReducer"
import { FitnessDashboard } from "../../views/Overview/FitnessDashboardView"
import { getWeekNumber } from "../../helpers"
import { auth } from "../../firebase"
import { useAuthState } from "react-firebase-hooks/auth"

export const Route = createLazyFileRoute("/_index/")({
  component: IndexPresenter,
})

export function IndexPresenter() {
  const dispatch = useDispatch<AppDispatch>()

  const workouts = useSelector((state: RootState) => state.workouts.workouts)
  useEffect(() => {
    // Fetch workouts from database
    try {
      dispatch(fetchWorkouts())
    } catch (error) {
      console.error("Error fetching workouts. Try again later.")
    }
  }, [dispatch])

  const goals = useSelector((state: RootState) => state.goals.goals)
  useEffect(() => {
    // Fetch workouts from database
    try {
      dispatch(fetchGoals())
    } catch (error) {
      console.error("Error fetching goals. Try again later.")
    }
  }, [dispatch])

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
    <FitnessDashboard
      topGoals={topGoals}
      numExercisesToday={numExercisesToday}
      caloriesBurnedToday={caloriesBurnedToday}
      workoutsThisWeek={workoutsThisWeek}
      workoutsLastWeek={workoutsLastWeek}
      topExercisesThisWeek={topExercisesThisWeek}
      numUniqueExercisesThisWeek={numUniqueExercisesThisWeek}
      numUniqueExercisesLastWeek={numUniqueExercisesLastWeek}
      kcalBurnedThisWeek={kcalBurnedThisWeek}
      kcalBurnedLastWeek={kcalBurnedLastWeek}
      exercisesMax={exercisesMax}
      caloriesMax={caloriesMax}
      scheduledWorkouts={scheduledWorkouts}
      exercisesLastWeek={exercisesLastWeek}
      exercisesThisWeek={exercisesThisWeek}
      user={user}
    />)
}
