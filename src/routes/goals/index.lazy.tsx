import { createLazyFileRoute } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";
import { Button, SelectChangeEvent, Stack } from "@mui/material";
import {
  setDescription,
  setEndGoal,
  setGoalType,
  setStartingPoint,
  setExercise,
  addGoalDb,
  fetchGoals,
  deleteGoalDb,
  resetToDefaultState,
} from "../../features/goals/goalsReducer";
import { CurrentGoalsView } from "../../views/Goals/CurrentGoalsView";
import { GoalFormView } from "../../views/Goals/GoalFormView";
import { useEffect, useState } from "react";
import { AppDispatch,RootState } from "../../store";
import { searchExercises, setSearchName, setSearchType } from "../../features/addWorkout/addWorkoutSlice";
import { Exercise, ExerciseType, ExerciseTypes } from "../../features/workouts/workoutsSlice";

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

  const [isAddButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (goals.startingPoint && goals.endGoal) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [goals.startingPoint, goals.endGoal]);

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
  
  return (
    <Stack sx={{ margin: "30px" }} spacing={2}>
      <CurrentGoalsView
        goals={filteredGoals}
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
        metric={goals.metric}
        handleSubmit={handleAddGoal}
        isAddButtonDisabled={isAddButtonDisabled}
        selectedType={addWorkoutState.searchType}
        setType={handleSetType}
        types={ExerciseTypes}
        search={handleSearch}
        searchLoading={addWorkoutState.searchStatus !== "idle"}
        searchResults={addWorkoutState.searchResults}
        setName={handleSetName}
        name={addWorkoutState.searchName}
        exercises={addWorkoutState.workout.exercises}
      />
      <Button variant="contained" onClick={() => setOpen(true)}>
        Create new goal
      </Button>
    </Stack>
  );
}
