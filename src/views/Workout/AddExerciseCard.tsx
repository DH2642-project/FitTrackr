import { ExpandMore } from "@mui/icons-material";
import {
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  OutlinedInput,
  InputAdornment,
  Slider,
  Button,
} from "@mui/material";
import { Exercise } from "../../features/workouts/workoutsSlice";

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
    <Paper
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 350,
        maxHeight: "80vh",
        overflowY: "auto",
        boxShadow: 24,
        p: 4,
      }}
    >
      <Typography variant="h5" gutterBottom>
        {result?.name}
      </Typography>
      {result?.instructions && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            Instructions
          </AccordionSummary>
          <AccordionDetails>{result.instructions}</AccordionDetails>
        </Accordion>
      )}
      {result?.type === "cardio" ? (
        <>
          <Typography variant="subtitle1">Distance</Typography>
          <OutlinedInput
            endAdornment={<InputAdornment position="end">km</InputAdornment>}
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
              setDistance(parseFloat(evt.target.value))
            }
            type="number"
          />
          <Typography variant="subtitle1">Time</Typography>
          <OutlinedInput
            endAdornment={
              <InputAdornment position="end">minutes</InputAdornment>
            }
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
              setTime(parseFloat(evt.target.value))
            }
            type="number"
          />
        </>
      ) : (
        <>
          <Typography variant="subtitle1">Sets</Typography>
          <Slider
            value={sets}
            onChange={setSets}
            step={1}
            marks
            min={1}
            max={8}
            valueLabelDisplay="on"
          />
          <Typography variant="subtitle1">Reps</Typography>
          <Slider
            value={reps}
            onChange={setReps}
            step={1}
            marks
            min={1}
            max={20}
            valueLabelDisplay="on"
          />
          <Typography variant="subtitle1">Weight</Typography>
          <OutlinedInput
            endAdornment={<InputAdornment position="end">kg</InputAdornment>}
            type="number"
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
              setWeight(parseFloat(evt.target.value))
            }
          />
        </>
      )}

      <Button
        onClick={() => {
          addExercise(result!);
          setAddModal(false);
        }}
      >
        Add to workout
      </Button>
    </Paper>
  );
}
