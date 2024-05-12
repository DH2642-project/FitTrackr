// utils/handlers.ts
import { AppDispatch } from "../store";
import { setSearchName, setSearchType, setDistance, searchExercises } from "../Model/addWorkout/addWorkoutSlice";
import { ExerciseType } from "../Model/workouts/workoutsSlice";
import { SelectChangeEvent } from "@mui/material";
import { useDispatch } from "react-redux";

export function useHandlers() {
  const dispatch = useDispatch<AppDispatch>();

  function handleSetName(name: string) {
    dispatch(setSearchName(name));
  }

  async function handleSearch() {
    const response = await dispatch(searchExercises());

    if (response.meta.requestStatus === "rejected") {
      console.log("Error fetching exercises. Try again later.", "error");
    }
  }

  function handleSetType(event: SelectChangeEvent) {
    dispatch(setSearchType(event.target.value as ExerciseType | "all"));
  }

  function handleSetDistance(distance: number) {
    dispatch(setDistance(distance));
  }

  return { handleSetName, handleSearch, handleSetType, handleSetDistance };
}