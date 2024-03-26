import { createLazyFileRoute } from "@tanstack/react-router"

import { useDispatch, useSelector } from "react-redux";
import { SelectChangeEvent, Container, Typography, Select, MenuItem, Button } from "@mui/material";
import { CardioGoalForm } from "../../components/Goals/CardioGoalForm";

import {
  setDescription,
  setDistance,
  setEndGoal,
  setGoalType,
  setStartingPoint,
  addGoal,
  removeGoal,
} from "../../features/goals/goalsReducer";
import { CurrentGoals } from "../../components/Goals/CurrentGoals";

export const Route = createLazyFileRoute("/goals/")({
  component: Goals,
})

export function Goals() {
  const goalType = useSelector((state: any) => state.goalType);
  
  const dispatch = useDispatch();

  const handleSelectChange = (evt: SelectChangeEvent<string>) => {
    dispatch(setGoalType(evt.target.value));
  };

  function updateDescription(description: string) {
    dispatch(setDescription(description));
  }

  function updateDistance(dist: string) {
  dispatch(setDistance(dist))
  }

  function updateStartingPoint(startingPoint: string) {
    dispatch(setStartingPoint(startingPoint));
  }
  function updateEndGoal(endGoal: string) {
    dispatch(setEndGoal(endGoal));
  }
  
  function handleSubmit() {
    dispatch(addGoal())
  };

  function deleteGoal(id: string) {
    dispatch(removeGoal(id))
  }

  return (
    <Container>
      <Typography variant="h5">Create Goal</Typography>
      <Select
        value={goalType}
        onChange={handleSelectChange}
        defaultValue="Cardio"
      >
        <MenuItem value="Cardio">Cardio</MenuItem>
        <MenuItem value="Weight">Weight</MenuItem>
        <MenuItem value="Strength">Strength</MenuItem>
      </Select>

      <CardioGoalForm
        onDescriptionChange={updateDescription}
        onDistanceChange={updateDistance}
        onStartingPointChange={updateStartingPoint}
        onEndGoalChange={updateEndGoal}
      ></CardioGoalForm>

    

      <Button variant="contained" onClick={handleSubmit}>
        Add goal
      </Button>

      <CurrentGoals onDeleteGoal={deleteGoal}></CurrentGoals>
    </Container>
  );
}