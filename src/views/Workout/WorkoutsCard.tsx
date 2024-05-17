import {
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Chip,
  CardActions,
  Button,
  IconButton,
  ListItemIcon,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Alert,
  AlertTitle,
} from "@mui/material";
import { DeleteForever, LocalFireDepartment } from "@mui/icons-material";
import { Workout } from "../../Model/workouts/workoutsSlice";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";

interface WorkoutCardProps {
  workout: Workout;
  deleteWorkout: (key: string) => void;
}

interface Exercise {
  name: string;
  sets?: number;
  reps?: number;
  difficulty?: string;
  type?: string;
  muscle?: string;
  instructions?: string;
}

const WorkoutsCard: React.FC<WorkoutCardProps> = ({ workout, deleteWorkout }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const handleClose = () => {
    setModalOpen(false);
    setCurrentExercise(null);
  };

  const handleOpen = (exercise: Exercise) => {
    setModalOpen(true);
    setCurrentExercise(exercise);
  };

  return (
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
                <ListItemIcon>
                  <IconButton
                    aria-label="info"
                    onClick={() => {
                      handleOpen(exercise);
                    }}
                  >
                    <InfoIcon />
                  </IconButton>
                </ListItemIcon>
                <ListItemText
                  primary={<Typography lineHeight={1}>{exercise.name}</Typography>}
                  secondary={
                    exercise.distance && exercise.time
                      ? `${exercise.distance} km, ${exercise.time} min`
                      : exercise.sets && exercise.reps
                        ? `${exercise.sets} sets, ${exercise.reps} reps`
                        : ""
                  }
                />
              </ListItem>
            ))}
          </List>
          <Dialog
            scroll="paper"
            open={modalOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <DialogTitle id="modal-modal-title" variant="h6" component="h2">
              Info - {currentExercise?.name}
            </DialogTitle>
            <Divider />
            <DialogContent>
              <Typography id="modal-modal-description">
                Difficulty: {currentExercise?.difficulty}
                <br />
                Type: {currentExercise?.type}
                <br />
                Muscle: {currentExercise?.muscle}
                <br />
              </Typography>
              Instructions: {currentExercise?.instructions}
              <br />
            </DialogContent>
          </Dialog>
          <Tooltip title={<Typography variant="caption">*Assumes each exercise is 7.5 min</Typography>} placement="top">
            <Chip icon={<LocalFireDepartment />} color="primary" label={`${workout.kcal} kcal*`} />
          </Tooltip>
        </CardContent>
        <CardActions>
          <Tooltip
            componentsProps={{
              tooltip: {
                sx: { p: 0, borderRadius: 20 },
              },
              arrow: {
                sx: { color: "#fff4e5" },
              },
            }}
            title={
              <Alert severity="warning" sx={{ borderRadius: 4 }}>
                <AlertTitle>Delete forever?</AlertTitle>
                This action cannot be undone.
              </Alert>
            }
            arrow
          >
            <Button startIcon={<DeleteForever />} color="error" onClick={() => deleteWorkout(workout.key!)}>
              Delete Workout
            </Button>
          </Tooltip>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default WorkoutsCard;
