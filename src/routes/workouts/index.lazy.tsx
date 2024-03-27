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
  const workouts = useSelector((state: RootState) => state.workouts.workouts);
  const status = useSelector((state: RootState) => state.workouts.status);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Fetch workouts from database
    dispatch(fetchWorkouts());
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

  function handleDeleteWorkout(key: string) {
    dispatch(deleteWorkout(key));
    dispatch(fetchWorkouts());
    showSnackbar("Workout deleted.", "success");
  }

  if (status === "loading") {
    return <FullscreenCircularProgress />;
  }

  return (
    <>
      <WorkoutsView workouts={workouts} deleteWorkout={handleDeleteWorkout} />
      <CustomSnackbar
        snackbarOpen={snackbarOpen}
        snackbarMessage={snackbarMessage}
        snackbarSeverity={snackbarSeverity}
        setSnackbarOpen={setSnackbarOpen}
      />
    </>
  );
}
