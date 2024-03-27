import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertColor } from "@mui/material";
import { remove } from "../../features/workouts/workoutsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import WorkoutsView from "../../views/WorkoutsView";
import CustomSnackbar from "../../components/CustomSnackbar";

export const Route = createLazyFileRoute("/workouts/")({
  component: WorkoutsPresenter,
});

// TODO: Add view for previous workouts
export function WorkoutsPresenter() {
  const workouts = useSelector((state: RootState) => state.workouts.workouts);
  const dispatch = useDispatch();

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("info");

  function showSnackbar(message: string, severity: AlertColor = "info") {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
    setSnackbarSeverity(severity);
  }

  function handleDeleteWorkout(id: number) {
    dispatch(remove(id));
    showSnackbar("Workout deleted.", "success");
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
