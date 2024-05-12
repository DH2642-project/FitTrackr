import { configureStore } from "@reduxjs/toolkit";
import workoutsReducer from "./Model/workouts/workoutsSlice";
import addWorkoutReducer from "./Model/addWorkout/addWorkoutSlice";
import goalsReducer from "./Model/goals/goalsReducer";

export const store = configureStore({
  reducer: {
    workouts: workoutsReducer,
    addWorkout: addWorkoutReducer,
    goals: goalsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
