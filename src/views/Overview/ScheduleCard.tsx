import {
  Button,
  Card,
  CardActions,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material"
import { Workout } from "../../features/workouts/workoutsSlice"
import { Link } from "@tanstack/react-router"

export function ScheduleCard({ workouts }: { workouts: Workout[] }) {
  return (
    <Card
      sx={{
        minWidth: 250,
      }}
    >
      <CardContent
        sx={{
          paddingBottom: 0,
        }}
      >
        <Typography variant="h5" component="div">
          Schedule
        </Typography>
        <Typography variant="body2">
          Workouts scheduled for the week.
        </Typography>

        <List disablePadding>
          {workouts.map((workout) => {
            const workoutDate = workout.date ? new Date(workout.date) : null
            if (!workoutDate) {
              return null
            }

            return (
              <ListItem key={workout.key} disableGutters>
                <ListItemText
                  primary={
                    workoutDate.toLocaleDateString(undefined, {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    }) +
                    " at " +
                    workoutDate.toLocaleTimeString(undefined, {
                      hour: "numeric",
                      minute: "numeric",
                    })
                  }
                  secondary={`${workout.exercises.length} exercise${workout.exercises.length === 1 ? "" : "s"}`}
                />
              </ListItem>
            )
          })}
        </List>
      </CardContent>

      <CardActions>
        <Button component={Link} to="/workouts">
          View all workouts
        </Button>
      </CardActions>
    </Card>
  )
}
