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
  Modal,
  Box,
} from "@mui/material";
import { LocalFireDepartment } from "@mui/icons-material";
import { Workout } from "../features/workouts/workoutsSlice";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";

interface WorkoutCardProps {
  workout: Workout;
  deleteWorkout: (key: string) => void;
}

const WorkoutsCard: React.FC<WorkoutCardProps> = ({ workout, deleteWorkout }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentExercise, setCurrentExercise] = useState<any | null>(null);
  const handleClose = () => {
    setModalOpen(false);
    setCurrentExercise(null);
  };

  const handleOpen = (exercise: any) => {
    console.log(exercise);
    setModalOpen(true);
    setCurrentExercise(exercise);
  }

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
                <ListItemText
                  primary={
                    <div>
                      <Typography lineHeight={1}>{exercise.name}</Typography>
                      <IconButton size="small" edge="end" aria-label="info" sx={{ p: 0 }} onClick={() => {
                        handleOpen(exercise);
                      }}>
                        <InfoIcon />
                      </IconButton>
                    </div>
                  }
                  secondary={exercise.sets ? `${exercise.sets} sets, ${exercise.reps} reps` : <em>Sets/reps omitted</em>}
                />
              </ListItem>
            ))}
          </List>
          <Modal
            open={modalOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)', 
              width: 400, 
              bgcolor: 'background.paper', 
              border: '2px solid #000', 
              boxShadow: 24, 
              p: 4 
            }}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Info - {currentExercise?.name}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Difficulty: {currentExercise?.difficulty}<br />
                Type: {currentExercise?.type}<br />
                Muscle: {currentExercise?.muscle}<br />
                Instructions: {currentExercise?.instructions}<br />
              </Typography>
            </Box>
          </Modal>
          <Tooltip title={<Typography variant="caption">*Assumes each exercise is 7.5 min</Typography>} placement="top">
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
};

export default WorkoutsCard;
