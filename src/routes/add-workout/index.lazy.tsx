import { createLazyFileRoute } from "@tanstack/react-router";
import AddWorkoutView from "../../views/AddWorkoutView";
import { ChangeEvent, useEffect, useState } from "react";
import { AlertColor, SelectChangeEvent } from "@mui/material";
import { Exercise, ExerciseType, ExerciseTypes } from "../../features/workouts/workoutsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import CustomSnackbar from "../../components/CustomSnackbar";
import {
  addWorkout,
  addExercise,
  removeExercise,
  searchExercises,
  setSearchType,
  setSearchName,
  setDate,
} from "../../features/addWorkout/addWorkoutSlice";

export const Route = createLazyFileRoute("/add-workout/")({
  component: AddWorkoutPresenter,
});

export function AddWorkoutPresenter() {
  const addWorkoutState = useSelector((state: RootState) => state.addWorkout);
  const dispatch = useDispatch<AppDispatch>();

  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [weight, setWeight] = useState(0);
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);

  function handleSetDistance(distance: number) {
    setDistance(distance);
  }

  function handleSetTime(time: number) {
    setTime(time);
  }

  function handleSetWeight(weight : number) {
    setWeight(weight);
  }

  function handleSetSets(_: Event, value: number | number[]) {
    setSets(value as number);
  }

  function handleSetReps(_: Event, value: number | number[]) {
    setReps(value as number);
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

  function handleSetType(event: SelectChangeEvent) {
    dispatch(setSearchType(event.target.value as ExerciseType | "all"));
  }

  function handleSetName(name: string) {
    dispatch(setSearchName(name));
  }

  async function handleSearch() {
    const response = await dispatch(searchExercises());

    if (response.meta.requestStatus === "rejected") {
      showSnackbar("Error fetching exercises. Try again later.", "error");
    }
  }

  function handleAddExercise(exercise: Exercise) {
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
        sets={sets}
        setSets={handleSetSets}
        reps={reps}
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
