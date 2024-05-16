import { DeleteOutlined, Done } from "@mui/icons-material";
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
  Divider,
  Container,
  Alert,
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
      </CardContent>
      <Divider />
      <CardContent sx={{ pb: 1 }}>
        <Container sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
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
        </Container>
        {exercises.length === 0 ? (
          <Alert severity="info">Start by adding exercises to your workout</Alert>
        ) : (
          <List disablePadding>
            {exercises.map((exercise) => (
              <ListItem
                key={exercise.name}
                disablePadding
                secondaryAction={
                  <IconButton color="error" edge="end" onClick={() => removeExercise(exercise.name)}>
                    <DeleteOutlined />
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
        )}
      </CardContent>
      {exercises.length > 0 && (
        <CardActions>
          {addWorkoutLoading ? (
            <Button startIcon={<CircularProgress color="inherit" size={20} />} disabled>
              Loading...
            </Button>
          ) : (
            <Button startIcon={<Done />} variant="contained" disabled={exercises.length === 0} onClick={addWorkout}>
              Register workout
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  );
}
