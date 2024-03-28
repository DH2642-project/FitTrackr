import { createLazyFileRoute } from "@tanstack/react-router";
import AddWorkoutView from "../../views/AddWorkoutView";
import { useEffect, useState } from "react";
import { AlertColor, SelectChangeEvent } from "@mui/material";
import { Exercise, addWorkout, ExerciseType, ExerciseTypes } from "../../features/workouts/workoutsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import CustomSnackbar from "../../components/CustomSnackbar";

export const Route = createLazyFileRoute("/add-workout/")({
  component: AddWorkoutPresenter,
});

export function AddWorkoutPresenter() {
  useSelector((state: RootState) => state.workouts.workouts);
  const dispatch = useDispatch<AppDispatch>();

  const [searchResults, setSearchResults] = useState<Exercise[]>([]);
  const [searchLoading, setSearchLoading] = useState(true);
  useEffect(() => {
    handleSearch("");
  }, []);

  const [type, setType] = useState<ExerciseType | "all">("all");
  const [exercises, setExercises] = useState<Exercise[]>([]);

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
    setType(event.target.value as ExerciseType | "all");
  }

  async function handleSearch(name: string) {
    setSearchLoading(true);
    const query = new URLSearchParams(type === "all" ? { name } : { name, type });
    const url = "https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?" + query;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
        "X-RapidAPI-Host": "exercises-by-api-ninjas.p.rapidapi.com",
      },
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Error fetching exercises.");
      }
      const data = await response.json();
      setSearchResults(data);
      setSearchLoading(false);
    } catch (error) {
      showSnackbar("Error fetching exercises. Try again later.", "error");
      setSearchLoading(false);
    }
  }

  function handleAddExercise(exercise: Exercise) {
    setExercises([...exercises, exercise]);
  }

  function handleRemoveExercise(name: string) {
    setExercises(exercises.filter((exercise) => exercise.name !== name));
  }

  async function handleAddWorkout() {
    const kcal = exercises.reduce((acc) => acc + 100, 0); // TODO: Calculate kcal
    const date = new Date().toISOString();
    try {
      await dispatch(addWorkout({ exercises, kcal, date }));
      setExercises([]);
      showSnackbar('Workout added. See "Workouts" page.', "success");
    } catch (error) {
      showSnackbar("Error adding workout. Try again later.", "error");
    }
  }

  return (
    <>
      <AddWorkoutView
        types={ExerciseTypes}
        selectedType={type}
        setType={handleSetType}
        search={handleSearch}
        searchLoading={searchLoading}
        searchResults={searchResults}
        addWorkout={handleAddWorkout}
        exercises={exercises}
        addExercise={handleAddExercise}
        removeExercise={handleRemoveExercise}
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
