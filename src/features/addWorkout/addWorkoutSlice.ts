import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Exercise, Workout } from "../workouts/workoutsSlice";
import { auth, database } from "../../firebase";
import { push, ref } from "firebase/database";

// Define a type for the slice state
export interface AddWorkoutState {
  workout: Workout;
  status: string;
  error?: string;
}

// Define the initial state using that type
const initialState: AddWorkoutState = {
  workout: {
    date: new Date().toISOString(),
    exercises: [],
    kcal: 0,
  },
  status: "loading", // always fetch data on page load
};

export const registerWorkout = createAsyncThunk("addWorkout/registerWorkout", async (workout: Workout) => {
  const userId = auth.currentUser?.uid;
  const snapshot = await push(ref(database, `workouts/${userId}`), workout);
  return snapshot.key;
});

export const addWorkoutSlice = createSlice({
  name: "workouts",
  initialState,
  reducers: {
    addExercise: (state, action: PayloadAction<Exercise>) => {
      state.workout.exercises.push(action.payload);
    },
    removeExercise: (state, action: PayloadAction<Exercise>) => {
      state.workout.exercises = state.workout.exercises.filter((exercise) => exercise !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerWorkout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerWorkout.fulfilled, (state) => {
        state.status = "idle";
      });
  },
});

export default addWorkoutSlice.reducer;
