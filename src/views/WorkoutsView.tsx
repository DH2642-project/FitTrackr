import { Button, Card, CardActions, CardContent, CardHeader, Container, Grid, List, ListItem } from "@mui/material";
import { Workout } from "../features/workouts/workoutsSlice";

export default function WorkoutsView({
  workouts,
  deleteWorkout,
}: {
  workouts: Workout[];
  deleteWorkout: (id: number) => void;
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
          {workouts.map((workout) => (
            <Grid item xs={2} sm={4} md={4}>
              <Card key={workout.id}>
                <CardHeader title="Workout" />
                <CardContent>
                  <List dense>
                    {workout.exercises.map((exercise) => (
                      <ListItem key={exercise.id}>{exercise.title}</ListItem>
                    ))}
                  </List>
                </CardContent>
                <CardActions>
                  <Button color="error" onClick={() => deleteWorkout(workout.id)}>
                    Delete Workout
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
