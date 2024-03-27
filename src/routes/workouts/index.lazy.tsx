import { createLazyFileRoute } from "@tanstack/react-router";
import WorkoutsView from "../../views/AddWorkoutView";
import { useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import { Exercise, add, categories, remove } from "../../features/workouts/workoutsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

export const Route = createLazyFileRoute("/workouts/")({
  component: WorkoutsPresenter,
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
export function WorkoutsPresenter() {
  const workouts = useSelector((state: RootState) => state.workouts.workouts);
  const dispatch = useDispatch();

  const [searchResults, setSearchResults] = useState<Exercise[]>(testData);

  const [category, setCategory] = useState(categories[0]);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  function handleSetCategory(event: SelectChangeEvent) {
    setCategory(event.target.value);
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    // Search logic goes here...
  }

  function handleAddExercise(exercise: Exercise) {
    setExercises([...exercises, exercise]);
  }

  function handleAddWorkout() {
    dispatch(
      add({
        id: Math.random(),
        exercises,
      })
    );
    setExercises([]);
  }

  function handleDeleteWorkout(id: number) {
    dispatch(remove(id));
  }

  return (
    <WorkoutsView
      category={category}
      categories={categories}
      setCategory={handleSetCategory}
      search={handleSearch}
      searchResults={searchResults}
      addExercise={handleAddExercise}
      exercises={exercises}
      workouts={workouts}
      addWorkout={handleAddWorkout}
      deleteWorkout={handleDeleteWorkout}
    />
  );
}
