import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AlertColor } from "@mui/material";
import { fetchWorkouts, deleteWorkout } from "../../features/workouts/workoutsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import WorkoutsView from "../../views/WorkoutsView";
import CustomSnackbar from "../../components/CustomSnackbar";
import FullscreenCircularProgress from "../../components/FullscreenCircularProgress";

export const Route = createLazyFileRoute("/workouts/")({
  component: WorkoutsPresenter,
});

// TODO: Add view for previous workouts
export function WorkoutsPresenter() {
  const workoutsState = useSelector((state: RootState) => state.workouts);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Fetch workouts from database
    try {
      dispatch(fetchWorkouts());
    } catch (error) {
      showSnackbar("Error fetching workouts. Try again later.", "error");
    }
  }, [dispatch]);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("info");

  function showSnackbar(message: string, severity: AlertColor = "info") {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
    setSnackbarSeverity(severity);
  }

  async function handleDeleteWorkout(key: string) {
    try {
      await dispatch(deleteWorkout(key));
      showSnackbar("Workout deleted.", "success");
      await dispatch(fetchWorkouts());
    } catch (error) {
      showSnackbar("Error deleting workout. Try again later.", "error");
    }
  }

  const sortedWorkouts = [...workoutsState.workouts].sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date as string).getTime() - new Date(a.date as string).getTime();
    }
    return 0;
  });

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const previousWorkouts = sortedWorkouts.filter(workout => new Date(workout.date as string) < now);
  const todaysWorkouts = sortedWorkouts.filter(workout => new Date(workout.date as string) >= now && new Date(workout.date as string) < tomorrow);
  const upcomingWorkouts = sortedWorkouts.filter(workout => new Date(workout.date as string) >= tomorrow);

  const [isPreviousWorkoutsExpanded, setIsPreviousWorkoutsExpanded] = useState(false);
  const [isUpcomingWorkoutsExpanded, setIsUpcomingWorkoutsExpanded] = useState(false);

  if (status === "loading") {
    return <FullscreenCircularProgress />;
  }

  return (
    <>
      <WorkoutsView
        workoutsLoading={workoutsState.status === "loading"}
        deleteWorkout={handleDeleteWorkout}
        previousWorkouts={previousWorkouts}
        todaysWorkouts={todaysWorkouts}
        upcomingWorkouts={upcomingWorkouts}
        isPreviousWorkoutsExpanded={isPreviousWorkoutsExpanded}
        setIsPreviousWorkoutsExpanded={setIsPreviousWorkoutsExpanded}
        isUpcomingWorkoutsExpanded={isUpcomingWorkoutsExpanded}
        setIsUpcomingWorkoutsExpanded={setIsUpcomingWorkoutsExpanded}
      />
      <CustomSnackbar
        snackbarOpen={snackbarOpen}
        snackbarMessage={snackbarMessage}
        snackbarSeverity={snackbarSeverity}
        setSnackbarOpen={setSnackbarOpen}
      />
    </>
  );
}
