import { createLazyFileRoute } from "@tanstack/react-router";
import AddWorkoutView from "../../views/AddWorkoutView";
import { useState } from "react";
import { AlertColor, SelectChangeEvent } from "@mui/material";
import { Exercise, addWorkout, categories } from "../../features/workouts/workoutsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import CustomSnackbar from "../../components/CustomSnackbar";

export const Route = createLazyFileRoute("/add-workout/")({
  component: AddWorkoutPresenter,
});

const testData: Exercise[] = [
  {
    id: "1",
    title: "Pushups",
    description: "A classic upper body exercise",
    image: "https://picsum.photos/400/200",
  },
  {
    id: "2",
    title: "Pullups",
    description: "A classic upper body exercise",
    image: "https://picsum.photos/400/201",
  },
  {
    id: "3",
    title: "Squats",
    description: "A classic lower body exercise",
    image: "https://picsum.photos/400/202",
  },
  {
    id: "4",
    title: "Lunges",
    description: "A classic lower body exercise",
    image: "https://picsum.photos/400/203",
  },
  {
    id: "5",
    title: "Planks",
    description: "A classic core exercise",
    image: "https://picsum.photos/400/204",
  },
  {
    id: "6",
    title: "Crunches",
    description: "A classic core exercise",
    image: "https://picsum.photos/400/205",
  },
  {
    id: "7",
    title: "Running",
    description: "A classic cardio exercise",
    image: "https://picsum.photos/400/206",
  },
  {
    id: "8",
    title: "Cycling",
    description: "A classic cardio exercise",
    image: "https://picsum.photos/400/207",
  },
  {
    id: "9",
    title: "Yoga",
    description: "A classic flexibility exercise",
    image: "https://picsum.photos/400/208",
  },
  {
    id: "10",
    title: "Pilates",
    description: "A classic flexibility exercise",
    image: "https://picsum.photos/400/209",
  },
  {
    id: "11",
    title: "Tai Chi",
    description: "A classic balance exercise",
    image: "https://picsum.photos/400/210",
  },
  {
    id: "12",
    title: "Qi Gong",
    description: "A classic balance exercise",
    image: "https://picsum.photos/400/211",
  },
];
// TODO: Add view for previous workouts
export function AddWorkoutPresenter() {
  useSelector((state: RootState) => state.workouts.workouts);
  const dispatch = useDispatch<AppDispatch>();

  const [searchResults, setSearchResults] = useState<Exercise[]>(testData);

  const [category, setCategory] = useState(categories[0]);
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

  function handleSetCategory(event: SelectChangeEvent) {
    setCategory(event.target.value);
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    // Search logic goes here...
  }

  function handleAddExercise(exercise: Exercise) {
    setExercises([...exercises, exercise]);
  }

  function handleRemoveExercise(id: string) {
    setExercises(exercises.filter((exercise) => exercise.id !== id));
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
        categories={categories}
        category={category}
        setCategory={handleSetCategory}
        search={handleSearch}
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
