import {
  Grid,
  Typography,
  TextField,
  SelectChangeEvent,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { SearchBarView } from "../Search/SearchBarView";
import { Exercise, ExerciseType } from "../../Model/workouts/workoutsSlice";
import FullscreenCircularProgress from "../Application/FullscreenCircularProgress";

export function GoalFormView({
  open,
  setOpen,
  goalType,
  onExerciseChange,
  onEndGoalChange,
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
  onDistanceChange,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  goalType: string | undefined;
  onExerciseChange: (exercise: Exercise) => void;
  onEndGoalChange: (endGoal: number) => void;
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
  onDistanceChange: (distance: number) => void;
}) {
  function handleEndGoalChange(evt: React.ChangeEvent<HTMLInputElement>) {
    onEndGoalChange(parseFloat(evt.target.value));
  }

  function handleExerciseChange(evt: React.ChangeEvent<HTMLInputElement>) {
    onExerciseChange(JSON.parse(evt.target.value) as Exercise);
  }

  function handleDistanceChange(evt: React.ChangeEvent<HTMLInputElement>) {
    onDistanceChange(parseFloat(evt.target.value));
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Add New Goal</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6"> Select exercise: </Typography>
          </Grid>
          <Grid item xs={12}>
            <SearchBarView
              selectedType={selectedType}
              setType={setType}
              types={types}
              search={search}
              setName={setName}
              name={name}
            ></SearchBarView>
          </Grid>
          <Grid item xs={12}>
            {searchLoading ? (
              <FullscreenCircularProgress />
            ) : searchResults.length == 0 ? (
              <Grid item xs={12}>
                <Typography variant="h6" align="center">
                  No exercises found
                </Typography>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <FormControl>
                  <RadioGroup onChange={handleExerciseChange}>
                    {searchResults.map((result: Exercise, index: number) => {
                      return (
                        <FormControlLabel
                          key={index}
                          value={JSON.stringify(result)}
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
          {goalType === "cardio" && (
            <>
              <Grid item xs={6}>
                <Typography variant="h6"> Distance: </Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label={"km"}
                  type="number"
                  id="outlined-basic"
                  variant="outlined"
                  required
                  onChange={handleDistanceChange}
                />
              </Grid>
            </>
          )}
          {searchResults.length !== 0 && (
            <>
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
            </>
          )}
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
