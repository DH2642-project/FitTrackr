import { Link } from "@tanstack/react-router"
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material"

export function TopExercisesCard({
  exercises,
}: {
  exercises: [string, number][]
}) {
  return (
    <Card
      sx={{
        minWidth: 275,
      }}
    >
      <CardContent
        sx={{
          paddingBottom: 0,
        }}
      >
        <Typography variant="h5" component="div">
          Top exercises this week
        </Typography>
        <Typography variant="body2">
          Based on total reps completed this week.
        </Typography>
        <List disablePadding>
          {exercises.map(([name, totalReps], index) => (
            <ListItem key={name} disableGutters>
              <ListItemAvatar>
                <Avatar>
                  <Typography variant="h5">{index + 1}</Typography>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={name} secondary={`${totalReps} reps`} />
            </ListItem>
          ))}
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
