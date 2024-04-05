import { createLazyFileRoute } from "@tanstack/react-router"
import { AppDispatch, RootState } from "../../store"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchWorkouts } from "../../features/workouts/workoutsSlice"
import { fetchGoals } from "../../features/goals/goalsReducer"
import { FitnessDashboard } from "../../views/FitnessDashboardView"

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

  return <FitnessDashboard workouts={workouts} goals={goals} />
}
