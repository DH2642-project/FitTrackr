import { Button, Stack, SelectChangeEvent } from "@mui/material";
import { CurrentGoalsView } from "./CurrentGoalsView";
import { GoalFormView } from "./GoalFormView";
import { Exercise, ExerciseType } from "../../Model/workouts/workoutsSlice";
import { Goal } from "../../Model/goals/goalsReducer";

interface GoalsViewProps {
  goals: any;
  addWorkoutState: any;
  handleAddGoal: () => void;
  handleSetType: (event: SelectChangeEvent) => void;
  handleSearch: () => void;
  handleSetName: (name: string) => void;
  handleSetDistance: (distance: number) => void;
  updateExercise: (exercise: Exercise) => void;
  updateEndGoal: (endGoal: number) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  isAddButtonDisabled: boolean;
  ExerciseTypes: ExerciseType[];
  filteredGoals: Goal[];
  deleteGoal: (key: string) => Promise<void>;
}

export function GoalsView({
    goals,
    addWorkoutState,
    handleAddGoal,
    handleSetType,
    handleSearch,
    handleSetName,
    handleSetDistance,
    updateExercise,
    updateEndGoal,
    open,
    setOpen,
    isAddButtonDisabled,
    ExerciseTypes,
    filteredGoals,
    deleteGoal,
}: GoalsViewProps) {
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
            onExerciseChange={updateExercise}
            onEndGoalChange={updateEndGoal}
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
            onDistanceChange={handleSetDistance}
        />
        <Button variant="contained" onClick={() => setOpen(true)}>
          Create new goal
        </Button>
      </Stack>
    );
  }