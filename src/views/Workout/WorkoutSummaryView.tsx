import { Remove } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  IconButton,
  ListItemText,
  CardActions,
  Button,
  CircularProgress,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import dayjs from "dayjs";
import { Exercise } from "../../Model/workouts/workoutsSlice";

export function WorkoutSummaryView({
  addWorkoutLoading,
  exercises,
  date,
  setDate,
  addWorkout,
  removeExercise,
}: {
  addWorkoutLoading: boolean;
  exercises: Exercise[];
  date: string;
  setDate: (date: string) => void;
  addWorkout: () => void;
  removeExercise: (name: string) => void;
}) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" align="center">
          New Workout
        </Typography>
        <Typography variant="subtitle1" align="center">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              name="workout-date"
              ampm={false}
              defaultValue={dayjs(new Date(date).toISOString())}
              onChange={(newValue) => {
                if (newValue) setDate(newValue.toISOString());
              }}
            />
          </LocalizationProvider>
        </Typography>
        <List disablePadding>
          {exercises.map((exercise) => (
            <ListItem
              key={exercise.name}
              disablePadding
              secondaryAction={
                <IconButton edge="end" onClick={() => removeExercise(exercise.name)}>
                  <Remove />
                </IconButton>
              }
            >
              <ListItemText
                primary={<Typography lineHeight={1}>{exercise.name}</Typography>}
                secondary={
                  exercise.type !== "cardio"
                    ? `${exercise.sets} sets, ${exercise.reps} reps, ${exercise.weight} kg `
                    : `${exercise.distance} km, ${exercise.time} minutes`
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions>
        {addWorkoutLoading ? (
          <Button startIcon={<CircularProgress color="inherit" size={20} />} disabled>
            Loading...
          </Button>
        ) : (
          <Button variant="contained" disabled={exercises.length == 0} onClick={addWorkout}>
            Register workout
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
