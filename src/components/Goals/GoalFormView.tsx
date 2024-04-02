import { Grid, Typography, TextField, SelectChangeEvent, MenuItem, Select, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

export function GoalFormView(props: any) {


function handleDescriptionChange(evt: React.ChangeEvent<HTMLInputElement>) {
  props.onDescriptionChange(evt.target.value);
}

  function handleStartingPointChange(evt: React.ChangeEvent<HTMLInputElement>) {
    props.onStartingPointChange(evt.target.value);
  };

  function handleEndGoalChange(evt: React.ChangeEvent<HTMLInputElement>){
    props.onEndGoalChange(evt.target.value);
  };

  function handleSelectChange(evt: SelectChangeEvent<string>) {
    props.onUpdateGoalType(evt.target.value)
  }

  function handleExerciseChange(evt: SelectChangeEvent<string>) {
    props.onExerciseChange(evt.target.value);
  }
    
  
  return (
    <Dialog open={props.open} onClose={() => props.setOpen(false)}>
      <DialogTitle>Add New Goal</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h6"> Type: </Typography>
          </Grid>
          <Grid item xs={6}>
            <Select
              value={props.goalType}
              onChange={handleSelectChange}
              defaultValue="Cardio"
            >
              <MenuItem value="Cardio">Cardio</MenuItem>
              <MenuItem value="Weight">Weight</MenuItem>
              <MenuItem value="Strength">Strength</MenuItem>
            </Select>
          </Grid>

          {props.goalType !== "Weight" && (
            <>
              <Grid item xs={6}>
                <Typography variant="h6"> Exercise: </Typography>
              </Grid>
              <Grid item xs={6}>
                <Select value={props.exercise} onChange={handleExerciseChange}>
                  {props.exerciseOptions.map(
                    (option: string, index: number) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    )
                  )}
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
              label={props.metric}
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
              label={props.metric}
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
        <Button onClick={() => props.setOpen(false)}>Cancel</Button>
        <Button onClick={() => props.handleSubmit()}>Add goal</Button>
      </DialogActions>
    </Dialog>
  );
}
