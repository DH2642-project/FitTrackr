import { DonutLarge, EventNote, FitnessCenter, Flag, Home, Person, Restaurant } from "@mui/icons-material";
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import React, { Suspense } from "react";

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

export const Route = createRootRoute({
  component: () => (
    <>
      <Box sx={{ display: "flex" }}>
        <Drawer
          sx={{
            width: 240,
            flexShrink: 0,
            bgcolor: "#535353",
            "& .MuiDrawer-paper": {
              bgcolor: "#535353",
              color: "#ffffff",
              width: 240,
              boxSizing: "border-box",
            },
            "& .MuiListItemIcon-root": {
              color: "#ffffff",
            },
          }}
          variant="permanent"
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
              { text: "Overview", path: "/", icon: <Home /> },
              { text: "Exercises", path: "/exercises", icon: <FitnessCenter />, disabled: true },
              { text: "Goals", path: "/goals", icon: <Flag />, disabled: true },
              { text: "Schedule", path: "/schedule", icon: <EventNote />, disabled: true },
              { text: "Progress", path: "/progress", icon: <DonutLarge />, disabled: true },
              { text: "Meals", path: "/meals", icon: <Restaurant />, disabled: true },
              { text: "About", path: "/about", icon: <Person /> },
            ].map((obj, index) => (
              <ListItemButton
                key={index}
                component={Link}
                to={obj.path}
                sx={{
                  borderRadius: "30px",
                  "&.active": {
                    backgroundColor: "#ff904d",
                  },
                }}
                disabled={obj.disabled}
              >
                <ListItemIcon>{obj.icon}</ListItemIcon>
                <ListItemText primary={<Typography variant="h6">{obj.text}</Typography>} />
              </ListItemButton>
            ))}
          </List>
        </Drawer>
        <Outlet />
      </Box>

      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  ),
});
