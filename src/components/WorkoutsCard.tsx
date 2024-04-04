import { Grid, Card, CardContent, Typography, List, ListItem, ListItemText, Tooltip, Chip, CardActions, Button } from '@mui/material';
import { LocalFireDepartment } from '@mui/icons-material';
import { Workout } from "../features/workouts/workoutsSlice";

interface WorkoutCardProps {
  workout: Workout;
  deleteWorkout: (key: string) => void;
}

const WorkoutsCard: React.FC<WorkoutCardProps> = ({ workout, deleteWorkout }) => (
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
);

export default WorkoutsCard;