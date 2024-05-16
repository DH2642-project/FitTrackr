import { createLazyFileRoute } from "@tanstack/react-router";
import { GoalsView } from "../../views/Goals/GoalsView";
import { useDispatch, useSelector } from "react-redux";
import {
  setEndGoal,
  setGoalType,
  setExercise,
  addGoalDb,
  fetchGoals,
  deleteGoalDb,
  resetToDefaultState,
} from "../../Model/goals/goalsReducer";
import { useEffect, useState } from "react";
import { AppDispatch,RootState } from "../../store";
import { setSearchName } from "../../Model/addWorkout/addWorkoutSlice";
import { Exercise, ExerciseTypes } from "../../Model/workouts/workoutsSlice";
import { useHandlers } from "../../PresenterUtils/handlers";

export const Route = createLazyFileRoute("/goals/")({
  component: GoalsPresenter,
});

export function GoalsPresenter() {
  const { handleSetName, handleSearch, handleSetType, handleSetDistance } = useHandlers();
  const dispatch = useDispatch<AppDispatch>();

  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  function updateExercise(exercise: Exercise) {
    dispatch(setExercise(exercise.name));
    dispatch(setGoalType(exercise.type));
  }

  function updateEndGoal(endGoal: number) {
    dispatch(setEndGoal(endGoal));
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
      setIsLoading(true);
      dispatch(fetchGoals());
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching goals. Try again later.", "error");
    }
  }, [dispatch]);

  const addWorkoutState = useSelector((state: RootState) => state.addWorkout);
  
  const filteredGoals = goals.goals.filter(goal => goal.key !== undefined);

  return(
    <GoalsView
      open={open}
      setOpen={setOpen}
      updateExercise={updateExercise}
      updateEndGoal={updateEndGoal}
      handleAddGoal={handleAddGoal}
      isAddButtonDisabled={isAddButtonDisabled}
      handleSearch={handleSearch}
      handleSetName={handleSetName}
      handleSetDistance={handleSetDistance}
      handleSetType={handleSetType}
      filteredGoals={filteredGoals}
      deleteGoal={deleteGoal}
      goals={goals}
      addWorkoutState={addWorkoutState}
      ExerciseTypes={ExerciseTypes}
      isLoading={isLoading}
    />
  );
}
