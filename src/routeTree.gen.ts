/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const ProfileIndexLazyImport = createFileRoute('/profile/')()
const GoalsIndexLazyImport = createFileRoute('/goals/')()
const ExercisesIndexLazyImport = createFileRoute('/exercises/')()
const IndexIndexLazyImport = createFileRoute('/_index/')()

// Create/Update Routes

const ProfileIndexLazyRoute = ProfileIndexLazyImport.update({
  path: '/profile/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/profile/index.lazy').then((d) => d.Route))

const GoalsIndexLazyRoute = GoalsIndexLazyImport.update({
  path: '/goals/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/goals/index.lazy').then((d) => d.Route))

const ExercisesIndexLazyRoute = ExercisesIndexLazyImport.update({
  path: '/exercises/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/exercises/index.lazy').then((d) => d.Route),
)

const IndexIndexLazyRoute = IndexIndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/_index/index.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_index/': {
      preLoaderRoute: typeof IndexIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/exercises/': {
      preLoaderRoute: typeof ExercisesIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/goals/': {
      preLoaderRoute: typeof GoalsIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/profile/': {
      preLoaderRoute: typeof ProfileIndexLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexIndexLazyRoute,
  ExercisesIndexLazyRoute,
  GoalsIndexLazyRoute,
  ProfileIndexLazyRoute,
])

/* prettier-ignore-end */
