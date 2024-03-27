import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ref, push, get, child, set } from "firebase/database";
import { auth, database } from "../../main";

export const categories = ["Strength", "Cardio", "Flexibility", "Balance"];

// TODO: Implement proper Exercise type
export type Exercise = {
  id: string; // TODO: Change to number? Check API
  title: string;
  description: string;
  image?: string;
};

export type Workout = {
  exercises: Exercise[];
  kcal?: number;
  key?: string;
};

// Define a type for the slice state
export interface WorkoutsState {
  workouts: Workout[];
  status: string;
  error?: string;
}

// Define the initial state using that type
const initialState: WorkoutsState = {
  workouts: [],
  status: "loading", // always fetch data on page load
};

export const fetchWorkouts = createAsyncThunk("workouts/fetchWorkouts", async () => {
  const userId = auth.currentUser?.uid;
  const snapshot = await get(child(ref(database), `workouts/${userId}`));
  if (snapshot.exists()) {
    const workouts = Object.entries(snapshot.val() as Record<string, Workout>).map(([key, value]) => ({
      ...value,
      key,
    }));
    return workouts;
  } else {
    return [];
  }
});

export const addWorkout = createAsyncThunk("workouts/addWorkout", async (workout: Workout) => {
  const userId = auth.currentUser?.uid;
  const snapshot = await push(ref(database, `workouts/${userId}`), workout);
  return snapshot.key;
});

export const deleteWorkout = createAsyncThunk("workouts/deleteWorkout", async (key: string) => {
  const userId = auth.currentUser?.uid;
  set(ref(database, `workouts/${userId}/${key}`), null);
});

export const workoutsSlice = createSlice({
  name: "workouts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkouts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWorkouts.fulfilled, (state, action: PayloadAction<Workout[]>) => {
        state.status = "idle";
        state.workouts = action.payload;
      })
      .addCase(addWorkout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addWorkout.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(deleteWorkout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteWorkout.fulfilled, (state) => {
        state.status = "idle";
      });
  },
});

export default workoutsSlice.reducer;
