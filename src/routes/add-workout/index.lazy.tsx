import { createLazyFileRoute } from "@tanstack/react-router";
import AddWorkoutView from "../../views/Workout/AddWorkoutView";
import { useEffect, useState } from "react";
import { AlertColor } from "@mui/material";
import { Exercise, ExerciseTypes } from "../../features/workouts/workoutsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import CustomSnackbar from "../../components/CustomSnackbar";
import {
  addWorkout,
  addExercise,
  removeExercise,
  searchExercises,
  setDate,
  setTime,
  setWeight,
  setSets,
  setReps,
} from "../../features/addWorkout/addWorkoutSlice";
import { useHandlers } from "../../utils/handlers";

export const Route = createLazyFileRoute("/add-workout/")({
  component: AddWorkoutPresenter,
});

export function AddWorkoutPresenter() {
  const { handleSetName, handleSearch, handleSetType, handleSetDistance } = useHandlers();
  const addWorkoutState = useSelector((state: RootState) => state.addWorkout);
  const dispatch = useDispatch<AppDispatch>();

  function handleSetTime(time: number) {
    dispatch(setTime(time));
  }

  function handleSetWeight(weight : number) {
    dispatch(setWeight(weight));
  }

  function handleSetSets(_: Event, value: number | number[]) {
    dispatch(setSets(value as number));
  }

  function handleSetReps(_: Event, value: number | number[]) {
    dispatch(setReps(value as number));
  }

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("info");

  function showSnackbar(message: string, severity: AlertColor = "info") {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
    setSnackbarSeverity(severity);
  }

  function handleAddExercise(exercise: Exercise) {
    const sets = addWorkoutState.sets
    const reps = addWorkoutState.reps
    const weight = addWorkoutState.weight
    const distance = addWorkoutState.distance
    const time = addWorkoutState.time
    dispatch(addExercise({ ...exercise, sets, reps, weight, distance, time }));
  }

  function handleRemoveExercise(name: string) {
    dispatch(removeExercise(name));
  }

  async function handleAddWorkout() {
    const response = await dispatch(addWorkout());
    if (response.meta.requestStatus === "rejected") {
      showSnackbar("Error adding workout. Try again later.", "error");
    } else {
      showSnackbar("Workout added.", "success");
    }
  }

  function handleSetDate(date: string) {
    dispatch(setDate(date));
  }

  useEffect(() => {
    if (addWorkoutState.searchResults.length === 0 && addWorkoutState.searchName === "") {
      try {
        dispatch(searchExercises());
      } catch (error) {
        showSnackbar("Error fetching exercises. Try again later.", "error");
      }
    }
  }, [dispatch, addWorkoutState.searchName, addWorkoutState.searchResults.length]);

  if (addWorkoutState.searchResults === undefined) {
    return (
      <CustomSnackbar
        snackbarOpen={true}
        snackbarMessage="Error fetching exercises. Try again later."
        snackbarSeverity="error"
        setSnackbarOpen={setSnackbarOpen}
      />
    );
  }

  return (
    <>
      <AddWorkoutView
        setDistance={handleSetDistance}
        setTime={handleSetTime}
        setWeight={handleSetWeight}
        sets={addWorkoutState.sets}
        setSets={handleSetSets}
        reps={addWorkoutState.reps}
        setReps={handleSetReps}
        types={ExerciseTypes}
        selectedType={addWorkoutState.searchType}
        setType={handleSetType}
        setName={handleSetName}
        name={addWorkoutState.searchName}
        search={handleSearch}
        searchLoading={addWorkoutState.searchStatus !== "idle"}
        searchResults={addWorkoutState.searchResults}
        addWorkout={handleAddWorkout}
        addWorkoutLoading={addWorkoutState.workoutStatus === "loading"}
        exercises={addWorkoutState.workout.exercises}
        addExercise={handleAddExercise}
        removeExercise={handleRemoveExercise}
        date={addWorkoutState.workout.date || new Date().toISOString()}
        setDate={handleSetDate}
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
