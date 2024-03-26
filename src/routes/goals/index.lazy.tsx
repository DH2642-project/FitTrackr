import { createLazyFileRoute } from "@tanstack/react-router";

import { useDispatch, useSelector } from "react-redux";
import {
  SelectChangeEvent,
  Container,
  Typography,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { GoalFormView } from "../../components/Goals/GoalFormView";

import {
  setDescription,
  setEndGoal,
  setGoalType,
  setStartingPoint,
  addGoal,
  removeGoal,
} from "../../features/goals/goalsReducer";
import { CurrentGoalsView } from "../../components/Goals/CurrentGoalsView";
import { RootState } from "../../store";

export const Route = createLazyFileRoute("/goals/")({
  component: Goals,
});

export function Goals() {
  const goalType = useSelector((state: RootState) => state.goals.goalType);

  const dispatch = useDispatch();

  const handleSelectChange = (evt: SelectChangeEvent<string>) => {
    dispatch(setGoalType(evt.target.value));
  };

  function updateDescription(description: string) {
    dispatch(setDescription(description));
  }

  function updateStartingPoint(startingPoint: string) {
    dispatch(setStartingPoint(startingPoint));
  }
  function updateEndGoal(endGoal: string) {
    dispatch(setEndGoal(endGoal));
  }

  function handleSubmit() {
    dispatch(addGoal());
  }

  function deleteGoal(id: string) {
    dispatch(removeGoal(id));
  }

  let formMetric;

  if (goalType === "Cardio") {
    formMetric = "mm:ss";
  } else if (goalType === "Weight") {
    formMetric = "kg";
  } else {
    formMetric = "kg";
  }

  return (
    <Container>
      <Typography variant="h5">My goals</Typography>
      <CurrentGoalsView onDeleteGoal={deleteGoal}></CurrentGoalsView>
      <Typography variant="h5">Create goal</Typography>
      <Select
        value={goalType}
        onChange={handleSelectChange}
        defaultValue="Cardio"
      >
        <MenuItem value="Cardio">Cardio</MenuItem>
        <MenuItem value="Weight">Weight</MenuItem>
        <MenuItem value="Strength">Strength</MenuItem>
      </Select>
      <GoalFormView
        onDescriptionChange={updateDescription}
        onStartingPointChange={updateStartingPoint}
        onEndGoalChange={updateEndGoal}
        goalMetric={formMetric}
      />
      
      <Button variant="contained" onClick={handleSubmit}>
        Add goal
      </Button>
    </Container>
  );
}
