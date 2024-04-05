import { Link } from "@tanstack/react-router"
import { Box, Button, Paper, Typography } from "@mui/material"

export function WelcomeCard({ exercises }: { exercises: number }) {
  return (
    <Paper
      sx={{
        padding: 2,
        marginBottom: 2,
        backgroundImage:
          // Photo by Victor Freitas on Unsplash:
          // https://unsplash.com/photos/person-about-to-lift-the-barbel-WvDYdXDzkhs?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash
          "url(https://unsplash.com/photos/WvDYdXDzkhs/download?w=2400)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Typography variant="h4" sx={{ color: "white" }}>
        Welcome to your fitness dashboard
      </Typography>
      <Typography sx={{ color: "white", paddingY: 2 }}>
        {exercises > 0
          ? `You've completed ${exercises} exercise${exercises > 1 ? "s" : ""} today. Keep up the good work!`
          : "You haven't logged any exercises today. Let's get moving!"}
      </Typography>
      <Button
        component={Link}
        to="/add-workout"
        variant="contained"
        sx={{ paddingX: 4, marginTop: 3 }}
        startIcon={<Box>🏋️</Box>}
      >
        Log a workout
      </Button>
    </Paper>
  )
}
