import { Box, CircularProgress } from "@mui/material"
import { createRootRoute, Outlet } from "@tanstack/react-router"
import React, { Suspense } from "react"
import { auth } from "../firebase"
import { ProfilePresenter } from "./profile/index.lazy"
import Sidebar from "../components/Sidebar"
import { useAuthState } from "react-firebase-hooks/auth"
import {
  Add,
  DonutLarge,
  EventNote,
  FitnessCenter,
  Flag,
  Home,
  Restaurant,
} from "@mui/icons-material"
import { ProfileAvatar } from "../components/ProfileAvatar"

// TanStack devtools only in development
const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        }))
      )

function RootPresenter() {
  const [, loading] = useAuthState(auth)

  const pages = [
    {
      text: "Profile",
      path: "/profile",
      icon: <ProfileAvatar />,
    },
    { text: "Overview", path: "/", icon: <Home /> },
    { text: "Add Workout", path: "/add-workout", icon: <Add /> },
    { text: "My Workouts", path: "/workouts", icon: <FitnessCenter /> },
    { text: "Goals", path: "/goals", icon: <Flag /> },
    {
      text: "Schedule",
      path: "/schedule",
      icon: <EventNote />,
      disabled: true,
    },
    { text: "Progress", path: "/progress", icon: <DonutLarge /> },
    { text: "Meals", path: "/meals", icon: <Restaurant />, disabled: true },
  ]

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar pages={pages} />
        {loading ? (
          <Box
            sx={{
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ width: "100%", height: "100vh" }}>
            {auth.currentUser ? <Outlet /> : <ProfilePresenter />}
          </Box>
        )}
      </Box>

      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  )
}

export const Route = createRootRoute({
  component: RootPresenter,
})
