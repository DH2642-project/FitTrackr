import { DonutLarge, EventNote, FitnessCenter, Flag, Home, Login, Menu, Person, Restaurant } from "@mui/icons-material";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import React, { Suspense, useState } from "react";

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

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

function SideBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      {/* Mobile Menu button */}
      {isMobile && (
        <IconButton
          size="large"
          onClick={() => setSidebarOpen(true)}
          sx={{
            color: "primary.contrastText",
            top: 0,
            left: 0,
            position: "fixed",
            zIndex: 1000,
            bgcolor: "primary.main",
            borderRadius: "0 0 30px 0",
          }}
        >
          <Menu />
        </IconButton>
      )}
      <Drawer
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            bgcolor: "#535353",
            color: "white",
            width: 240,
            boxSizing: "border-box",
          },
          "& .MuiListItemIcon-root": {
            // for icons
            color: "white",
          },
        }}
        variant={isMobile ? "temporary" : "permanent"}
        anchor="left"
      >
        <Toolbar>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              width: "100%",
            }}
          >
            FitTrackr
          </Typography>
        </Toolbar>
        <List>
          {[
            { text: "Login", path: "/login", icon: <Login /> },
            { text: "Overview", path: "/", icon: <Home /> },
            { text: "Exercises", path: "/exercises", icon: <FitnessCenter /> },
            { text: "Goals", path: "/goals", icon: <Flag />, disabled: true },
            { text: "Schedule", path: "/schedule", icon: <EventNote />, disabled: true },
            { text: "Progress", path: "/progress", icon: <DonutLarge />, disabled: true },
            { text: "Meals", path: "/meals", icon: <Restaurant />, disabled: true },
            { text: "About", path: "/about", icon: <Person /> },
          ].map((page, index) => (
            <ListItemButton
              key={index}
              component={Link}
              to={page.path}
              sx={{
                borderRadius: "30px",
                "&.active": {
                  backgroundColor: "primary.main",
                },
              }}
              disabled={page.disabled}
            >
              <ListItemIcon>{page.icon}</ListItemIcon>
              <ListItemText primary={<Typography variant="h6">{page.text}</Typography>} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export const Route = createRootRoute({
  component: () => (
    <>
      <Box sx={{ display: "flex" }}>
        <SideBar />
        {/* Padding on mobile for button */}
        <Box sx={{ width: "100%", height: "100vh" }}>
          <Outlet />
        </Box>
      </Box>

      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  ),
});
