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

  return (
    <>
      <Container sx={{ p: { xs: 1, md: 2 }, width: "100%", height: "100%" }}>
        <Typography variant="h4" align="center" gutterBottom>
          My Workouts
        </Typography>
        {workoutsLoading && <FullscreenCircularProgress />}
        <Typography variant="h5" align="left" gutterBottom>
          Upcoming Workouts
        </Typography>
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {!workoutsLoading && sortedWorkouts.length > 0 ? (
            sortedWorkouts.map((workout) => (
              <WorkoutsCard key={workout.key} workout={workout} deleteWorkout={deleteWorkout} />
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