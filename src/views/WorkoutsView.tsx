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
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { Workout } from "../features/workouts/workoutsSlice";
import { LocalFireDepartment } from "@mui/icons-material";
import FullscreenCircularProgress from "../components/FullscreenCircularProgress";

export default function WorkoutsView({
  workouts,
  workoutsLoading,
  deleteWorkout,
}: {
  workouts: Workout[];
  workoutsLoading: boolean;
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
      <Container sx={{ p: { xs: 1, md: 2 }, width: "100%", height: "100%" }}>
        <Typography variant="h4" align="center" gutterBottom>
          My Workouts
        </Typography>
        {workoutsLoading && <FullscreenCircularProgress />}
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {!workoutsLoading && sortedWorkouts.length > 0 ? (
            sortedWorkouts.map((workout) => (
              <Grid key={workout.key} item xs={4} sm={4} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" gutterBottom lineHeight={1}>
                      {workout.date
                        ? new Date(workout.date as string).toLocaleDateString(undefined, {
                            weekday: "short",
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "No date"}
                    </Typography>
                    <Typography variant="subtitle1">
                      {workout.date
                        ? new Date(workout.date as string).toLocaleTimeString(undefined, {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "No time"}
                    </Typography>
                    <List
                      sx={{
                        position: "relative",
                        overflow: "auto",
                        height: { xs: "", sm: "11.5rem" },
                        maxHeight: { xs: "11.5rem", sm: "" },
                        mb: 1,
                      }}
                    >
                      {workout.exercises.map((exercise) => (
                        <ListItem disablePadding key={exercise.name}>
                          <ListItemText
                            primary={<Typography lineHeight={1}>{exercise.name}</Typography>}
                            secondary={
                              exercise.sets ? (
                                `${exercise.sets} sets, ${exercise.reps} reps`
                              ) : (
                                <em>Sets/reps omitted</em>
                              )
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                    <Tooltip
                      title={<Typography variant="caption">*Assumes each exercise is 15 min</Typography>}
                      placement="top"
                    >
                      <Chip icon={<LocalFireDepartment />} color="primary" label={`${workout.kcal} kcal*`} />
                    </Tooltip>
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
