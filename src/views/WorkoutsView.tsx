import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  Grid,
  List,
  ListItem,
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
  return (
    <>
      <Container sx={{ py: 2 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ width: "100%", height: "100%" }}
        >
          {workouts.length > 0 ? (
            workouts.map((workout) => (
              <Grid key={workout.key} item xs={2} sm={4} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">
                      {workout.date ? new Date(workout.date as string).toLocaleDateString() : "No date"}
                    </Typography>
                    <Typography variant="body2">{workout.key}</Typography>
                    <List dense sx={{ listStyleType: "numeric", pl: 4 }}>
                      {workout.exercises.map((exercise) => (
                        <ListItem key={exercise.id} sx={{ display: "list-item" }}>
                          {exercise.title}
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
