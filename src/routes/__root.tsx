import { Container } from "@mui/material"
import { createRootRoute, Link, Outlet } from "@tanstack/react-router"
import React, { Suspense } from "react"

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

export const Route = createRootRoute({
  component: () => (
    <>
      <Container>
        <Link to="/">
          Home
        </Link>{" "}
        <Link to="/about">
          About
        </Link>
      </Container>
      <hr />
      <Outlet />

      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  ),
})
