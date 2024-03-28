import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Workout } from "../features/workouts/workoutsSlice";
import { LocalFireDepartment } from "@mui/icons-material";

export default function WorkoutsView({
  workouts,
  deleteWorkout,
}: {
  workouts: Workout[];
  deleteWorkout: (key: string) => void;
}) {
  // Sort workouts by date
  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date as string).getTime() - new Date(a.date as string).getTime();
    }
    return 0;
  });

  return (
    <>
      <Container sx={{ py: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          My Workouts
        </Typography>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ width: "100%", height: "100%" }}
        >
          {sortedWorkouts.length > 0 ? (
            sortedWorkouts.map((workout) => (
              <Grid key={workout.key} item xs={4} sm={4} md={4}>
                <Card>
                  <CardHeader
                    title={
                      <Typography variant="h6">
                        {workout.date
                          ? new Date(workout.date as string).toLocaleDateString(undefined, {
                              weekday: "short",
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "No date"}
                      </Typography>
                    }
                    subheader={
                      workout.date
                        ? new Date(workout.date).toLocaleTimeString(undefined, {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "No time"
                    }
                    sx={{ pb: 0 }}
                  />
                  <CardContent sx={{ py: 0 }}>
                    <List>
                      {workout.exercises.map((exercise) => (
                        <ListItem key={exercise.name}>
                          <ListItemText
                            primary={exercise.name}
                            secondary={`${exercise.sets} sets, ${exercise.reps} reps`}
                          />
                        </ListItem>
                      ))}
                    </List>
                    <Chip icon={<LocalFireDepartment />} color="primary" label={`${workout.kcal} kcal`} />
                  </CardContent>
                  <CardActions>
                    <Button color="error" onClick={() => deleteWorkout(workout.key!)}>
                      Delete Workout
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h5" align="center">
                No workouts found
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
}
