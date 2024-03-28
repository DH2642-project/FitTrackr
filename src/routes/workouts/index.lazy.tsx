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

  if (status === "loading") {
    return <FullscreenCircularProgress />;
  }

  return (
    <>
      <WorkoutsView workouts={workoutsState.workouts} deleteWorkout={handleDeleteWorkout} />
      <CustomSnackbar
        snackbarOpen={snackbarOpen}
        snackbarMessage={snackbarMessage}
        snackbarSeverity={snackbarSeverity}
        setSnackbarOpen={setSnackbarOpen}
      />
    </>
  );
}
