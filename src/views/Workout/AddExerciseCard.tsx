import { Add, ExpandMore } from "@mui/icons-material";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  OutlinedInput,
  InputAdornment,
  Slider,
  Button,
  CardActions,
  Card,
  CardContent,
  Grid,
  Divider,
} from "@mui/material";
import { Exercise } from "../../Model/workouts/workoutsSlice";

export function AddExerciseCard({
  result,
  sets,
  reps,
  setAddModal,
  setSets,
  setReps,
  setWeight,
  setTime,
  setDistance,
  addExercise,
}: {
  result: Exercise | null;
  sets: number | undefined;
  reps: number | undefined;
  setAddModal: (value: React.SetStateAction<boolean>) => void;
  setSets: (event: Event, value: number | number[]) => void;
  setReps: (event: Event, value: number | number[]) => void;
  setWeight: (weight: number) => void;
  setTime: (time: number) => void;
  setDistance: (distance: number) => void;
  addExercise: (exercise: Exercise) => void;
}) {
  return (
    <Card
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: { xs: "90%", md: 600 },
        maxHeight: "80vh",
        overflowY: "auto",
        boxShadow: 24,
      }}
    >
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {result?.name}
        </Typography>
        {result?.instructions && (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>Instructions</AccordionSummary>
            <AccordionDetails>{result.instructions}</AccordionDetails>
          </Accordion>
        )}
        {result?.type === "cardio" ? (
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm>
              <Typography variant="subtitle1">Distance</Typography>
              <OutlinedInput
                endAdornment={<InputAdornment position="end">km</InputAdornment>}
                onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setDistance(parseFloat(evt.target.value))}
                type="number"
                placeholder="Enter distance"
                required
                fullWidth
              />
            </Grid>
            <Grid item>
              <Divider orientation="vertical" variant="middle" />
            </Grid>
            <Grid item xs={12} sm>
              <Typography variant="subtitle1">Time</Typography>
              <OutlinedInput
                endAdornment={<InputAdornment position="end">minutes</InputAdornment>}
                onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setTime(parseFloat(evt.target.value))}
                type="number"
                placeholder="Enter time"
                required
                fullWidth
              />
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} md>
              <Typography variant="subtitle1">Sets</Typography>
              <Slider value={sets} onChange={setSets} step={1} marks min={1} max={8} valueLabelDisplay="on" />
              <Typography variant="subtitle1">Reps</Typography>
              <Slider value={reps} onChange={setReps} step={1} marks min={1} max={20} valueLabelDisplay="on" />
            </Grid>
            <Grid item sx={{ display: { xs: "none", md: "inline-block" } }}>
              <Divider orientation="vertical" variant="middle" />
            </Grid>
            <Grid item xs={12} md>
              <Typography variant="subtitle1">Weight</Typography>
              <OutlinedInput
                endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                type="number"
                onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setWeight(parseFloat(evt.target.value))}
                placeholder="Enter weight"
                required
                fullWidth
              />
            </Grid>
          </Grid>
        )}
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          startIcon={<Add />}
          onClick={() => {
            addExercise(result!);
            setAddModal(false);
          }}
          variant="contained"
        >
          Add exercise
        </Button>
        <Button onClick={() => setAddModal(false)}>Cancel</Button>
      </CardActions>
    </Card>
  );
}
