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
} from "@mui/material";

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
  exerciseOptions,
  metric,
  handleSubmit,
  isAddButtonDisabled,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  goalType: string;
  exercise: string;
  onDescriptionChange: (description: string) => void;
  onExerciseChange: (exercise: string) => void;
  onStartingPointChange: (startingPoint: number) => void;
  onEndGoalChange: (endGoal: number) => void;
  onUpdateGoalType: (type: string) => void;
  exerciseOptions: string[];
  metric: string;
  handleSubmit: () => void;
  isAddButtonDisabled: boolean;
}) {
  function handleDescriptionChange(evt: React.ChangeEvent<HTMLInputElement>) {
    onDescriptionChange(evt.target.value);
  }

  function handleStartingPointChange(evt: React.ChangeEvent<HTMLInputElement>) {
    onStartingPointChange(parseFloat(evt.target.value));
  }

  function handleEndGoalChange(evt: React.ChangeEvent<HTMLInputElement>) {
    onEndGoalChange(parseFloat(evt.target.value));
  }

  function handleSelectChange(evt: SelectChangeEvent<string>) {
    onUpdateGoalType(evt.target.value);
  }

  function handleExerciseChange(evt: SelectChangeEvent<string>) {
    onExerciseChange(evt.target.value);
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Add New Goal</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h6"> Type: </Typography>
          </Grid>
          <Grid item xs={6}>
            <Select
              value={goalType}
              onChange={handleSelectChange}
              defaultValue="Cardio"
            >
              <MenuItem value="Cardio">Cardio</MenuItem>
              <MenuItem value="Weight">Weight</MenuItem>
              <MenuItem value="Strength">Strength</MenuItem>
            </Select>
          </Grid>

          {goalType !== "Weight" && (
            <>
              <Grid item xs={6}>
                <Typography variant="h6"> Exercise: </Typography>
              </Grid>
              <Grid item xs={6}>
                <Select value={exercise} onChange={handleExerciseChange}>
                  {exerciseOptions.map((option: string, index: number) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </>
          )}

          <Grid item xs={6}>
            <Typography variant="h6"> Description: </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Describe your goal"
              variant="outlined"
              required
              onChange={handleDescriptionChange}
            />
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
