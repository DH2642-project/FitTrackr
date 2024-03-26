import { Avatar, Box, CircularProgress } from "@mui/material";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import React, { Suspense } from "react";
import { auth } from "../main";
import { ProfilePresenter } from "./profile/index.lazy";
import Sidebar from "../components/Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import { AccountCircle, DonutLarge, EventNote, FitnessCenter, Flag, Home, Restaurant } from "@mui/icons-material";

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
      );

function RootPresenter() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const [user, loading] = useAuthState(auth);

  const pages = [
    {
      text: "Profile",
      path: "/profile",
      icon: loading ? (
        <CircularProgress sx={{ color: "primary.contrastText" }} />
      ) : user?.photoURL ? (
        <Avatar src={user.photoURL} />
      ) : (
        <AccountCircle />
      ),
    },
    { text: "Overview", path: "/", icon: <Home /> },
    { text: "Exercises", path: "/exercises", icon: <FitnessCenter /> },
    { text: "Goals", path: "/goals", icon: <Flag />, disabled: true },
    { text: "Schedule", path: "/schedule", icon: <EventNote />, disabled: true },
    { text: "Progress", path: "/progress", icon: <DonutLarge />, disabled: true },
    { text: "Meals", path: "/meals", icon: <Restaurant />, disabled: true },
  ];

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar isMobile={isMobile} pages={pages} />
        {loading ? (
          <Box sx={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ width: "100%", height: "100vh" }}>{auth.currentUser ? <Outlet /> : <ProfilePresenter />}</Box>
        )}
      </Box>

      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  );
}

export const Route = createRootRoute({
  component: RootPresenter,
});
