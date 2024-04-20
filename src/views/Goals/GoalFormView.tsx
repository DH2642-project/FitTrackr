import {
  Grid,
  Typography,
  TextField,
  SelectChangeEvent,
  MenuItem,
  Select,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { SearchBarView } from "../Workout/SearchBarView";
import { Exercise, ExerciseType } from "../../features/workouts/workoutsSlice";
import FullscreenCircularProgress from "../../components/FullscreenCircularProgress";

export function GoalFormView({
  open,
  setOpen,
  goalType,
  exercise,
  onDescriptionChange,
  onExerciseChange,
  onStartingPointChange,
  onEndGoalChange,
  onUpdateGoalType,
  metric,
  handleSubmit,
  isAddButtonDisabled,
  selectedType,
  setType,
  types,
  search,
  searchLoading,
  searchResults,
  setName,
  name,
  exercises,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  goalType: string | undefined;
  exercise: string;
  onDescriptionChange: (description: string) => void;
  onExerciseChange: (exercise: string) => void;
  onStartingPointChange: (startingPoint: number) => void;
  onEndGoalChange: (endGoal: number) => void;
  onUpdateGoalType: (type: string) => void;
  metric: string;
  handleSubmit: () => void;
  isAddButtonDisabled: boolean;
  selectedType: ExerciseType | "all";
  setType: (event: SelectChangeEvent) => void;
  types: ExerciseType[];
  search: () => void;
  searchLoading: boolean;
  searchResults: Exercise[];
  setName: (name: string) => void;
  name: string;
  exercises: Exercise[];
}) {
  

  function handleStartingPointChange(evt: React.ChangeEvent<HTMLInputElement>) {
    onStartingPointChange(parseFloat(evt.target.value));
  }

  function handleEndGoalChange(evt: React.ChangeEvent<HTMLInputElement>) {
    onEndGoalChange(parseFloat(evt.target.value));
  }


  // Don't know how to set correct type
  function handleExerciseChange(evt: any) {
    console.log(evt.target)
    onExerciseChange(evt.target.value);
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Add New Goal</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6"> Select exercise: </Typography>
            <SearchBarView
              selectedType={selectedType}
              setType={setType}
              types={types}
              search={search}
              setName={setName}
              name={name}
            ></SearchBarView>
          </Grid>
          <Grid container>
            {searchLoading ? (
              <FullscreenCircularProgress />
            ) : searchResults.length == 0 ? (
              <Grid item xs={12}>
                <Typography variant="h6" align="center">
                  No exercises found
                </Typography>
              </Grid>
            ) : (
              <Grid container>
                <FormControl>
                  <RadioGroup
                    onChange={handleExerciseChange}
                  >
                    {searchResults.map((result: Exercise, index: number) => {
                      return (
                        <FormControlLabel 
                            key = {index}
                            value={result.name}
                            control={<Radio />}
                            label={result.name}
                          />
                      );
                    })}
                  </RadioGroup>
                </FormControl>
              </Grid>
            )}
          </Grid>

          <Grid item xs={6}>
            <Typography variant="h6"> Start: </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label={metric}
              type="number"
              id="outlined-basic"
              variant="outlined"
              required
              onChange={handleStartingPointChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6"> Goal: </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label={metric}
              type="number"
              id="outlined-basic"
              variant="outlined"
              required
              onChange={handleEndGoalChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={() => handleSubmit()} disabled={isAddButtonDisabled}>
          Add goal
        </Button>
      </DialogActions>
    </Dialog>
  );
}
