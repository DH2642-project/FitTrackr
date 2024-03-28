import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Exercise, ExerciseType, Workout } from "../workouts/workoutsSlice";
import { auth, database } from "../../firebase";
import { push, ref } from "firebase/database";

// Define a type for the slice state
export interface AddWorkoutState {
  workout: Workout;
  workoutStatus: string;
  workoutError?: boolean;
  error?: string;
  searchName: string;
  searchType: ExerciseType | "all";
  searchError?: boolean;
  searchResults: Exercise[];
  searchStatus: string;
}

// Define the initial state using that type
const initialState: AddWorkoutState = {
  workout: {
    date: new Date().toISOString(),
    exercises: [],
    kcal: 0,
  },
  workoutStatus: "idle",
  searchName: "",
  searchType: "all",
  searchResults: [],
  searchStatus: "idle",
};

export const addWorkout = createAsyncThunk("addWorkout/addWorkout", async (_, thunkAPI) => {
  const state = thunkAPI.getState() as { addWorkout: AddWorkoutState };
  const userId = auth.currentUser?.uid;
  try {
    const snapshot = await push(ref(database, `workouts/${userId}`), state.addWorkout.workout);
    // Clear exercises
    thunkAPI.dispatch(clearExercises());
    return snapshot.key;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const searchExercises = createAsyncThunk("addWorkout/searchExercises", async (_, thunkAPI) => {
  const state = thunkAPI.getState() as { addWorkout: AddWorkoutState };
  const { searchName, searchType } = state.addWorkout;
  const query = new URLSearchParams(
    searchType === "all" ? { name: searchName } : { name: searchName, type: searchType }
  );
  const url = "https://api.api-ninjas.com/v1/exercises?" + query;
  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": import.meta.env.VITE_RAPID_API_KEY,
    },
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    thunkAPI.rejectWithValue("Error fetching exercises");
  }
  const data = await response.json();
  return data;
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
    clearExercises: (state) => {
      state.workout.exercises = [];
    },
    setSearchName: (state, action: PayloadAction<string>) => {
      state.searchName = action.payload;
    },
    setSearchType: (state, action: PayloadAction<ExerciseType | "all">) => {
      state.searchType = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<Exercise[]>) => {
      state.searchResults = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addWorkout.pending, (state) => {
        state.workoutStatus = "loading";
      })
      .addCase(addWorkout.fulfilled, (state) => {
        state.workoutStatus = "idle";
      })
      .addCase(addWorkout.rejected, (state) => {
        state.workoutError = true;
        state.workoutStatus = "idle";
      })
      .addCase(searchExercises.pending, (state) => {
        state.searchStatus = "loading";
      })
      .addCase(searchExercises.fulfilled, (state, action: PayloadAction<Exercise[]>) => {
        state.searchResults = action.payload;
        state.searchStatus = "idle";
      })
      .addCase(searchExercises.rejected, (state) => {
        state.searchError = true;
        state.searchStatus = "idle";
      });
  },
});

export const { addExercise, removeExercise, clearExercises, setSearchName, setSearchType, setSearchResults } =
  addWorkoutSlice.actions;

export default addWorkoutSlice.reducer;
