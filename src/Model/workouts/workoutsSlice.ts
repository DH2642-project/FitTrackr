import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ref, get, child, set } from "firebase/database";
import { auth, database } from "../../firebase";

export type ExerciseType =
  | "cardio"
  | "olympic_weightlifting"
  | "plyometrics"
  | "powerlifting"
  | "strength"
  | "stretching"
  | "strongman";

export const ExerciseTypes: ExerciseType[] = [
  "cardio",
  "olympic_weightlifting",
  "plyometrics",
  "powerlifting",
  "strength",
  "stretching",
  "strongman",
];

export type ExerciseMuscle =
  | "abdominals"
  | "abductors"
  | "adductors"
  | "biceps"
  | "calves"
  | "chest"
  | "forearms"
  | "glutes"
  | "hamstrings"
  | "lats"
  | "lower_back"
  | "middle_back"
  | "neck"
  | "quadriceps"
  | "traps"
  | "triceps";

export type ExerciseDifficulty = "beginner" | "intermediate" | "expert";

export type Exercise = {
  name: string;
  type?: ExerciseType;
  muscle?: string;
  difficulty?: ExerciseDifficulty;
  instructions?: string;
  equipment?: string;
  sets?: number;
  reps?: number;
  weight?: number;
  distance?: number;
  time?: number;
};

export type Workout = {
  exercises: Exercise[];
  date?: string;
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

export const deleteWorkout = createAsyncThunk("workouts/deleteWorkout", async (key: string) => {
  const userId = auth.currentUser?.uid;
  await set(ref(database, `workouts/${userId}/${key}`), null);
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
      .addCase(deleteWorkout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteWorkout.fulfilled, (state) => {
        state.status = "idle";
      });
  },
});

export default workoutsSlice.reducer;
