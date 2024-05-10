import { useDispatch, useSelector } from "react-redux";
import { SelectChangeEvent} from "@mui/material";
import {
  setEndGoal,
  setGoalType,
  setExercise,
  addGoalDb,
  fetchGoals,
  deleteGoalDb,
  resetToDefaultState,
  setGoalDistance,
} from "../features/goals/goalsReducer";
import React, { useEffect, useState } from "react";
import { AppDispatch,RootState } from "../store";
import { searchExercises, setSearchName, setSearchType } from "../features/addWorkout/addWorkoutSlice";
import { Exercise, ExerciseType, ExerciseTypes } from "../features/workouts/workoutsSlice";

export interface ChildrenProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    updateExercise: (exercise: Exercise) => void;
    updateEndGoal: (endGoal: number) => void;
    handleAddGoal: () => Promise<void>;
    isAddButtonDisabled: boolean;
    handleSearch: () => Promise<void>;
    handleSetName: (name: string) => void;
    handleSetDistance: (distance: number) => void;
    handleSetType: (event: SelectChangeEvent) => void;
    filteredGoals: any[]; 
    goalType: string | undefined;
    metric: any;
    selectedType: ExerciseType | "all";
    searchLoading: boolean;
    searchResults: any; 
    name: string;
    types: ExerciseType[];
    goals: any,
    addWorkoutState: any,
    ExerciseTypes: any;
    deleteGoal: (key: string) => Promise<void>;
  }

export function GoalsPresenter({ children }: { children: (props: ChildrenProps) => React.ReactElement}) {
  const dispatch = useDispatch<AppDispatch>();

  const [open, setOpen] = useState(false);

  function updateExercise(exercise: Exercise) {
    dispatch(setExercise(exercise.name));
    dispatch(setGoalType(exercise.type));
  }


  function updateEndGoal(endGoal: number) {
    dispatch(setEndGoal(endGoal));
  }

  function handleSetDistance(distance: number) {
    dispatch(setGoalDistance(distance));
  }

  async function handleAddGoal() {
    const response = await dispatch(addGoalDb());
    if (response.meta.requestStatus === "rejected") {
      console.log("Error adding goal.");
    } 
    dispatch(fetchGoals());
    dispatch(resetToDefaultState());
    dispatch(setSearchName(""));
    setOpen(false);

  }

  async function deleteGoal(key: string) {
    const response = await dispatch(deleteGoalDb(key));
    if (response.meta.requestStatus === "rejected") {
      console.log("Error deleting goal.");
    } 
    dispatch(fetchGoals());
  }

  const goals = useSelector((state: RootState) => state.goals);

  const [isAddButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (goals.endGoal && goals.currentExercise) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [goals.endGoal, goals.currentExercise]);

  useEffect(() => {
    // Fetch workouts from database
    try {
      dispatch(fetchGoals());
    } catch (error) {
      console.log("Error fetching goals. Try again later.", "error");
    }
  }, [dispatch]);

  //CODE DUPLICATION!!!
  const addWorkoutState = useSelector((state: RootState) => state.addWorkout);
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

  const filteredGoals = goals.goals.filter(goal => goal.key !== undefined);


  return children({
    open,
    setOpen,
    updateExercise,
    updateEndGoal,
    handleAddGoal,
    isAddButtonDisabled,
    handleSearch,
    handleSetName,
    handleSetDistance,
    handleSetType,
    filteredGoals,
    goalType: goals.goalType,
    metric: goals.metric,
    selectedType: addWorkoutState.searchType,
    searchLoading: addWorkoutState.searchStatus !== "idle",
    searchResults: addWorkoutState.searchResults,
    name: addWorkoutState.searchName,
    types: ExerciseTypes,
    deleteGoal,
    goals,
    addWorkoutState,
    ExerciseTypes,
  });
}