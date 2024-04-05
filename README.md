# FitTrackr

> A web application where users can set goals for their fitness and health and track their progress over time. Users should be able to create and log their own workout sessions and meals. User data is visualized through various types of graphs. Examples of data that can be visualized include weight loss over time and running distance for each week of the past month.

# Development

1. Install dependencies:
    ```bash
    npm install
    ```

2. Run development server:
    ```bash
    npm run dev
    ```

3. Open the url [`localhost:5137`](http://localhost:5173/) in your browser.

## What we’ve done:

- User prototype testing (30 min)

- **Login**: Users can log in through Google and email and their information persists across sessions.
- **Profile**: Users can add personal information like weight and height.
- **Overview**: Provides a high-level view and statistics on goals and workouts.
- **Add Workouts**: Exercises are fetched from an API and the user can create custom workouts, and save them (stored on Firebase).
- **My Workouts**: Shows users their past and upcoming workouts.
- **Goals**: Users can set goals (currently only a few different options).
- **Progress**: Users can track statistics on workouts and progress towards their goals. The data is visualized through various graphs from ReCharts. Currently, the data on the progress page is randomly generated and not linked to logged workouts. Most of the data about workouts are pulled from the real workout data.

## What we plan to do:

We still need to connect the completed workouts to the goals and the progress view. Right now, the Goals and Workouts are completely independent and implemented using placeholder data. This needs to be updated such that the views use the relevant data from the profile. We still have to add meals and count calories consumed each day in order to get the calories calculated correctly. We need to add responsiveness for the pages /goals and /progress. The goals and progress page should also display a spinning wheel while waiting for data from Pirebase

Users should also be able to add data about weight and time when they create the workouts. We also plan to make the sidebar invisible when the user is not logged in.

When all of the above are implemented, a user evaluation of the platform needs to be conducted and feedback from that needs to be implemented.

## Tech stack
- Typescript
- React
- Vite
- [Material UI](https://mui.com/material-ui/all-components/)
  - Components
  - Icons
- [Firebase](https://console.firebase.google.com/u/0/project/dh2642-project-7eb8e)
  - [Authentication](https://firebase.google.com/docs/auth/web/start)
  - [Realtime Database](https://firebase.google.com/docs/database/web/read-and-write)
  - Hosting
- [Tanstack Router](https://tanstack.com/router/latest/docs/framework/react/quick-start)
- Redux with [Redux Toolkit](https://redux-toolkit.js.org/tutorials/quick-start)

## File structure

- [.github/workflows](./.github/workflows) - github actions for automatically deploying to firebase hosting on new commits and pull requests
- [public/](./public/) - public files and assets
- [src/](./src/) - source files
  - [components/](./src/components/) - reusable components
  - [features/](./src/features/) - redux slices and type definitions for page features
    - [addWorkout/](./src/features/addWorkout/) - state and types for the add workout feature
    - [goals/](./src/features/goals/) - state and types for the add goals feature
    - [workouts/](./src/features/workouts/) - state and types for the workouts feature
  - [routes/](./src/routes/) - folder for Tanstack Router routes
    - [\_\_root.tsx](./src/routes/__root.tsx) - root layout for rendering sidebar menu and common parts between routes
    - [\_index/](./src/routes/_index/) - route for index page with overview dashboard
    - [add-workout/](./src/routes/add-workout/) - route for add workout page with exercise search and select
    - [goals/](./src/routes/goals/) - route for goals page with goals list and create goal menu
    - [profile/](./src/routes/profile/) - route for profile page with user profile and data
    - [progress/](./src/routes/progress/) - route for progress page with statistics for workouts, goals and more
    - [workouts/](./src/routes/workouts/) - route for workouts page with todays, upcoming and previous workouts
  - [views/](./src/views/)
    - [Goals/](./src/views/Goals/) - folder for different views on the goals page
    - [Overview/](./src/views/Overview/) - folder for different metrics cards on the overview page
    - [Progress/](./src/views/Progress/) - folder for different statistics views and charts on the Progress page
    - [AddWorkoutView.tsx](./src/views/AddWorkoutView.tsx) - view for add workout page
    - [FitnessDashboardView.tsx](./src/views/FitnessDashboardView.tsx) - view for dashboard page
    - [LoggedInView.tsx](./src/views/LoggedInView.tsx) - view for profile page when logged in
    - [LoginFormView.tsx](./src/views/LoginFormView.tsx) - view for profile page when not logged in
    - [WorkoutsView.tsx](./src/views/WorkoutsView.tsx) - view for workouts page
  - [firebase.ts](./src/firebase.ts) - firebase config and initialization
  - [helpers.ts](./src/helpers.ts) - common helper functions
  - [main.tsx](./src/main.tsx) - main component for react with providers for redux store, MUI theme and Tanstack router
  - [routeTree.gen.ts](./src/routeTree.gen.ts) - auto generated file from Tanstack router
  - [store.ts](./src/store.ts) - main store for all the separate feature reducers & slices
  - [theme.tsx](./src/theme.tsx) - theme config for Material UI
  - [vite-env.d.ts](./src/vite-env.d.ts) - auto generated file for Vite types
- [.env](./.env) - environment variables: currently only `VITE_API_NINJAS_API_KEY`
- [.eslintrc](./.eslintrc) - Eslint linting config with typescript and React rules
- [.firebaserc](./.firebaserc) - firebase project id for hosting
- [.gitignore](./.gitignore) - files that should not be added to git
- [database.rules.json](./database.rules.json) - rules for the firebase realtime database
- [firebase.json](./firebase.json) - firebase hosting config for Vite
- [index.html](./index.html) - main mountpoint for the SPA
- [package-lock.json](./package-lock.json) - exact versions of dependencies
- [package.json](./package.json) - dependencies and project scripts
- [README.md](./README.md) - this README
- [tsconfig.json](./tsconfig.json) - typescript configuration from Vite
- [tsconfig.node.json](./tsconfig.node.json) - typescript configuration from Vite for nodejs
- [vite.config.ts](./vite.config.ts) - Vite config
