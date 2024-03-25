import { Box, CircularProgress } from "@mui/material";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import React, { Suspense } from "react";
import { auth } from "../main";
import firebase from "firebase/compat/app";
import { ProfilePresenter } from "./profile/index.lazy";
import Sidebar from "../components/Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";

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

  // const [user, setUser] = useState<firebase.User | null>(auth.currentUser as firebase.User | null);
  const [user, loading] = useAuthState(auth);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar user={user as firebase.User | null} loading={loading} isMobile={isMobile} />
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
