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
} from "@mui/material";


import {
  setDescription,
  setEndGoal,
  setGoalType,
  setStartingPoint,
  addGoal,
  removeGoal,
  setExercise,
} from "../../features/goals/goalsReducer";
import { CurrentGoalsView } from "../../components/Goals/CurrentGoalsView";
import { GoalFormView } from "../../components/Goals/GoalFormView";
import { RootState } from "../../store";
import { useState } from "react";

export const Route = createLazyFileRoute("/goals/")({
  component: Goals,
});

export function Goals() {
  const goalType = useSelector((state: RootState) => state.goals.goalType);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const updateGoalType = (type : string) => {
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

  
  // mock data
  const cardioExercises = ["Run", "Swim", "Walk"]
  const strengthExercises = ["Pushups", "Situps", "Squat"];
  const exercises = { cardio: cardioExercises, strength: strengthExercises }
  
  return (
    <Container>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Create new goal
      </Button>
      <Typography variant="h5">My goals</Typography>
      <CurrentGoalsView onDeleteGoal={deleteGoal}></CurrentGoalsView>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Goal</DialogTitle>
        <DialogContent>
          <GoalFormView
            onDescriptionChange={updateDescription}
            onExerciseChange={updateExercise}
            onStartingPointChange={updateStartingPoint}
            onEndGoalChange={updateEndGoal}
            onUpdateGoalType={updateGoalType}
            exercises={exercises}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Add goal</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
