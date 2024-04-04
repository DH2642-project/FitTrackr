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
import WorkoutsCard from "../components/WorkoutsCard";

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

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const previousWorkouts = sortedWorkouts.filter(workout => new Date(workout.date as string) < now);
  const todaysWorkouts = sortedWorkouts.filter(workout => new Date(workout.date as string) >= now && new Date(workout.date as string) < tomorrow);
  const upcomingWorkouts = sortedWorkouts.filter(workout => new Date(workout.date as string) >= tomorrow);

  return (
    <Container sx={{ p: { xs: 1, md: 2 }, width: "100%", height: "100%" }}>
      <Typography variant="h4" align="center" gutterBottom>
        My Workouts
      </Typography>
      {workoutsLoading && <FullscreenCircularProgress />}
      <Typography variant="h5" align="left" gutterBottom>
        Today's Workouts
      </Typography>
      <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {!workoutsLoading && todaysWorkouts.length > 0 ? (
          todaysWorkouts.map((workout) => (
            <WorkoutsCard key={workout.key} workout={workout} deleteWorkout={deleteWorkout} />
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" align="left">
              There are no workout scheduled for today
            </Typography>
          </Grid>
        )}
      </Grid>
      
      <Typography variant="h5" align="left" gutterBottom>
        Upcoming Workouts
      </Typography>
      <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {!workoutsLoading && upcomingWorkouts.length > 0 ? (
          upcomingWorkouts.map((workout) => (
            <WorkoutsCard key={workout.key} workout={workout} deleteWorkout={deleteWorkout} />
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" align="left">
              There are no upcoming workouts
            </Typography>
          </Grid>
        )}
      </Grid>

      <Typography variant="h5" align="left" gutterBottom>
        Previous Workouts
      </Typography>
      <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {!workoutsLoading && previousWorkouts.length > 0 ? (
          previousWorkouts.map((workout) => (
            <WorkoutsCard key={workout.key} workout={workout} deleteWorkout={deleteWorkout} />
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" align="left">
              There are no previous workouts
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}