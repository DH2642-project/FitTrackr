import { Link } from "@tanstack/react-router"
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material"
import { Goal } from "../../features/goals/goalsReducer"
import { GoalProgressChart } from "../Progress/GoalProgressChart"

export function GoalsCard({ goals }: { goals: Goal[] }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Goal progress
        </Typography>
        <Typography variant="body2">
          The top goals you are closest to completing.
        </Typography>
        <Stack direction="row">
          {goals.map((goal) => (
            <Box
              component={Link}
              to="/goals"
              key={goal.key}
              sx={{
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              <GoalProgressChart value={goal.progress} circleSize={150} />
              <Typography align="center">{goal.exercise}</Typography>
            </Box>
          ))}
        </Stack>
      </CardContent>
      <CardActions>
        <Button component={Link} to="/goals">
          View all goals
        </Button>
      </CardActions>
    </Card>
  )
}
