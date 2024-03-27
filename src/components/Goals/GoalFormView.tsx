import { Grid, Typography, TextField, SelectChangeEvent, MenuItem, Select } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export function GoalFormView(props: any) {

  const goalType = useSelector((state: RootState) => state.goals.goalType);

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
    
  return (
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

      <Grid item xs={6}>
        <Typography variant="h6"> Description: </Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="outlined-basic"
          label=""
          variant="outlined"
          onChange={handleDescriptionChange}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h6"> Start: </Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="outlined-basic"
          label={props.goalMetric}
          variant="outlined"
          onChange={handleStartingPointChange}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h6"> Goal: </Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="outlined-basic"
          label={props.goalMetric}
          variant="outlined"
          onChange={handleEndGoalChange}
        />
      </Grid>
    </Grid>
  );
}
