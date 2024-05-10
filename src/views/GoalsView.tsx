import { Button, Stack } from "@mui/material";
import { CurrentGoalsView } from "./Goals/CurrentGoalsView";
import { GoalFormView } from "./Goals/GoalFormView";
import { Goal } from "../../features/goals/goalsReducer";

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
    ...props
}:{
    goals: any;
    addWorkoutState: any;
    handleAddGoal: any;
    handleSetType: any;
    handleSearch: any;
    handleSetName: any;
    handleSetDistance: any;
    updateExercise: any;
    updateEndGoal: any;
    open: boolean;
    isAddButtonDisabled: any;
    ExerciseTypes: any;
    filteredGoals: any;
    deleteGoal: any;
    setOpen: any;
}) {
    return (
      <Stack sx={{ margin: "30px" }} spacing={2}>
        <CurrentGoalsView
          goals={props.filteredGoals}
          onDeleteGoal={props.deleteGoal}
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