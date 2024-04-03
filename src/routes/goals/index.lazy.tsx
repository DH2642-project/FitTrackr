import { createLazyFileRoute } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";
import { Button, Stack } from "@mui/material";
import {
  setDescription,
  setEndGoal,
  setGoalType,
  setStartingPoint,
  removeGoal,
  setExercise,
  allExercises,
  addGoalDb,
  fetchGoals,
  deleteGoalDb,
  resetToDefaultState,
  setCurrentGoal,
} from "../../features/goals/goalsReducer";
import { CurrentGoalsView } from "../../views/Goals/CurrentGoalsView";
import { GoalFormView } from "../../views/Goals/GoalFormView";
import { useEffect, useState } from "react";
import { AppDispatch,RootState } from "../../store";

export const Route = createLazyFileRoute("/goals/")({
  component: Goals,
});

export function Goals() {
  const dispatch = useDispatch<AppDispatch>();

  const [open, setOpen] = useState(false);

  function updateGoalType(type: string) {
    dispatch(setGoalType(type));
  }

  function updateDescription(description: string) {
    dispatch(setDescription(description));
  }

  function updateExercise(exercise: string) {
    dispatch(setExercise(exercise));
  }

  function updateStartingPoint(startingPoint: number) {
    dispatch(setStartingPoint(startingPoint));
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
    setOpen(false);
  }

  async function deleteGoal(key: string) {
    const response = await dispatch(deleteGoalDb(key));
    if (response.meta.requestStatus === "rejected") {
      console.log("Error adding goal.");
    } 
    dispatch(fetchGoals());
  }

  const goals = useSelector((state: RootState) => state.goals);

  let exerciseOptions;
  if (goals.goalType === "Cardio") {
    exerciseOptions = allExercises.cardio;
  } else {
    exerciseOptions = allExercises.strength;
  }

  const [isAddButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (goals.description && goals.startingPoint && goals.endGoal) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [goals.description, goals.startingPoint, goals.endGoal]);

  useEffect(() => {
    // Fetch workouts from database
    try {
      dispatch(fetchGoals());
    } catch (error) {
      console.log("Error fetching goals. Try again later.", "error");
    }
  }, [dispatch]);

  return (
    <Stack sx={{ margin: "30px" }} spacing={2}>
      <CurrentGoalsView
        goals={goals.goals}
        onDeleteGoal={deleteGoal}
      ></CurrentGoalsView>
      <GoalFormView
        open={open}
        setOpen={setOpen}
        goalType={goals.goalType}
        exercise={goals.currentExercise}
        onDescriptionChange={updateDescription}
        onExerciseChange={updateExercise}
        onStartingPointChange={updateStartingPoint}
        onEndGoalChange={updateEndGoal}
        onUpdateGoalType={updateGoalType}
        exerciseOptions={exerciseOptions}
        metric={goals.metric}
        handleSubmit={handleAddGoal}
        isAddButtonDisabled={isAddButtonDisabled}
      />
      <Button variant="contained" onClick={() => setOpen(true)}>
        Create new goal
      </Button>
    </Stack>
  );
}
