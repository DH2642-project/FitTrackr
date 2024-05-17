# FitTrackr

> A web application where users can set goals for their workouts and track their progress over time. Users can create and log their own workout sessions. User data is visualized through various types of graphs.
## URL to deployed site
[FitTrackr](https://dh2642-project-7eb8e.web.app/).
## Development

1. Install dependencies:
    ```bash
    npm install
    ```

2. Run development server:
    ```bash
    npm run dev
    ```

3. Open the url [`localhost:5137`](http://localhost:5173/) in your browser.

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
- [Recharts](https://recharts.org/)

## APIs
[Exercises API](https://api-ninjas.com/api/exercises)  
[Calories burned API]((https://api-ninjas.com/api/caloriesburned))  

## 3rd party components
All charts to visualize data are from [Recharts](https://recharts.org/) (except the calendar heat map which is from [uiw](https://uiwjs.github.io/react-heat-map/). The calendar date picker used when adding a workout is from [Material UI](https://mui.com/material-ui/all-components/).

## File structure

- [.github/workflows](./.github/workflows) - github actions for automatically deploying to firebase hosting on new commits and pull requests
- [public/](./public/) - public files and assets
- [src/](./src/) - source files
  - [Model/](./src/Model/) - redux slices and type definitions for page features
    - [addWorkout/](./src/features/addWorkout/) - state and types for the add workout feature
    - [goals/](./src/features/goals/) - state and types for the add goals feature
    - [profile/](./src/features/profile/) - state and types for the profile feature
    - [workouts/](./src/features/workouts/) - state and types for the workouts feature
  - [PresenterUtils](./src/PresenterUtils/) - folder for utility functions to presenters
      - [PresenterUtils](./src/PresenterUtils/handlers.tsx) handlers used by several presenters 
  - [routes/](./src/routes/) - folder for Presenters (Tanstack Router routes)
    - [\_\_root.tsx](./src/routes/__root.tsx) - root layout for rendering sidebar menu and common parts between routes
    - [\_index/](./src/routes/_index/) - route for index page with overview dashboard
    - [add-workout/](./src/routes/add-workout/) - route for add workout page with exercise search and select
    - [goals/](./src/routes/goals/) - route for goals page with goals list and create goal menu
    - [profile/](./src/routes/profile/) - route for profile page with user profile and data
    - [progress/](./src/routes/progress/) - route for progress page with statistics for workouts, goals and more
    - [workouts/](./src/routes/workouts/) - route for workouts page with todays, upcoming and previous workouts
  - [views/](./src/views/)
    - [Application/](./src/views/Application) - folder for high level application views
    - [Goals/](./src/views/Goals/) - folder for different views on the goals page
    - [Overview/](./src/views/Overview/) - folder for different metrics cards on the overview page
    - [Profile/](./src/views/Profile/) - folder for diffferent profile related views and login
    - [Progress/](./src/views/Progress/) - folder for different statistics views and charts on the Progress page
    - [Search/](./src/views/Search/) folder for Search related views
    - [Workout/](./src/views/Workout/) folder for workout views
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

## User feedback at the prototyping stage (30 min)
[User feedback](https://docs.google.com/document/d/1k6fzGHI7aa6IgPLAlqMR2oYAVkYn4_AuWQaJ9bH7bTk/edit?usp=sharing)
## User feedback at the formative evaluation stage (30 min)
[User feedback](https://docs.google.com/document/d/1GcTGc8E_z0utTma-zfnyhMJC1-z6frFx-SRWyb9syuY/edit)

The creative solution that was implemented based on user feedback was a chart visualizing the proportions between different exercise types. This way the user can see if they should prioritize cardio, strength training, stretching, etc. 

## Other comments
The group is aiming for grade A
