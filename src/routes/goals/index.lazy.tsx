import { createLazyFileRoute } from "@tanstack/react-router";

import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
} from "@mui/material";


import {
  setDescription,
  setEndGoal,
  setGoalType,
  setStartingPoint,
  addGoal,
  removeGoal,
  setExercise,
  allExercises,
} from "../../features/goals/goalsReducer";
import { CurrentGoalsView } from "../../components/Goals/CurrentGoalsView";
import { GoalFormView } from "../../components/Goals/GoalFormView";
import { useState } from "react";
import { RootState } from "../../store";

export const Route = createLazyFileRoute("/goals/")({
  component: Goals,
});

export function Goals() {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const updateGoalType = (type: string) => {
    dispatch(setGoalType(type));
  };

  function updateDescription(description: string) {
    dispatch(setDescription(description));
  }

  function updateExercise(exercise: string) {
    dispatch(setExercise(exercise));
  }

  function updateStartingPoint(startingPoint: string) {
    dispatch(setStartingPoint(startingPoint));
  }
  function updateEndGoal(endGoal: string) {
    dispatch(setEndGoal(endGoal));
  }

  function handleSubmit() {
    dispatch(addGoal());
    setOpen(false);
  }

  function deleteGoal(id: string) {
    dispatch(removeGoal(id));
  }

  const goals = useSelector((state: RootState) => state.goals);
  
  let exerciseOptions;
  if (goals.goalType === "Cardio") {
    exerciseOptions = allExercises.cardio;
  } else {
    exerciseOptions = allExercises.strength
  }
    
  return (
    <Stack sx={{ margin: "30px" }} spacing={2}>
      <CurrentGoalsView onDeleteGoal={deleteGoal}></CurrentGoalsView>
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
        handleSubmit={handleSubmit}
      />
      <Button variant="contained" onClick={() => setOpen(true)}>
        Create new goal
      </Button>
    </Stack>
  );
}
