import { Grid, Typography, TextField } from "@mui/material";

export function CardioGoalForm(props: any) {

function handleDescriptionChange(evt: React.ChangeEvent<HTMLInputElement>) {
  props.onDescriptionChange(evt.target.value);
}

  function handleDistanceChange(evt: React.ChangeEvent<HTMLInputElement>) {
    props.onDistanceChange(evt.target.value);
  }

  function handleStartingPointChange(evt: React.ChangeEvent<HTMLInputElement>) {
    props.onStartingPointChange(evt.target.value);
  };

  function handleEndGoalChange(evt: React.ChangeEvent<HTMLInputElement>){
    props.onEndGoalChange(evt.target.value);
  };
    
  return (
    <Grid container spacing={2}>
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
        <Typography variant="h6"> Distance: </Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="outlined-basic"
          label="km"
          variant="outlined"
          onChange={handleDistanceChange}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h6"> Start: </Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="outlined-basic"
          label="mm:ss"
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
          label="mm:ss"
          variant="outlined"
          onChange={handleEndGoalChange}
        />
      </Grid>
    </Grid>
  );
}
