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
  distance?: number
  time?: number
  weight?: number
  reps?: number
  sets?: number
  addModal: boolean
}

// Define the initial state using that type
const initialState: AddWorkoutState = {
  workout: {
    exercises: [],
    date: new Date().toISOString(),
  },
  workoutStatus: "idle",
  searchName: "",
  searchType: "all",
  searchResults: [],
  searchStatus: "idle",
  sets: 3,
  reps: 10,
  time: 0,
  distance: 0,
  weight: 0,
  addModal: false
};

export const addWorkout = createAsyncThunk("addWorkout/addWorkout", async (_, thunkAPI) => {
  async function getKcalCB(exercise: Exercise) {
    const estimate = 45;
    const query = new URLSearchParams({ activity: exercise.name }); //TODO: couple with weight from user profile once made a slice
    const response = await fetch("https://api.api-ninjas.com/v1/caloriesburned?" + query, {
      method: "GET",
      headers: {
        "X-Api-Key": import.meta.env.VITE_API_NINJAS_API_KEY,
      },
    });
    if (!response.ok) {
      return estimate;
    }
    const data = await response.json();

    if (data.length === 0) {
      return estimate;
    }
    return data[0].calories_per_hour * 0.125; // assume 7.5 minutes
  }

  const state = thunkAPI.getState() as { addWorkout: AddWorkoutState };
  const userId = auth.currentUser?.uid;
  try {
    const snapshot = await push(ref(database, `workouts/${userId}`), {
      ...state.addWorkout.workout,
      date: state.addWorkout.workout.date,
      kcal: await state.addWorkout.workout.exercises.reduce(
        async (acc, exercise) => (await acc) + (await getKcalCB(exercise)),
        Promise.resolve(0)
      ),
    });
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
      "X-Api-Key": import.meta.env.VITE_API_NINJAS_API_KEY,
    },
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    thunkAPI.rejectWithValue("Error fetching exercises");
    return;
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
    removeExercise: (state, action: PayloadAction<string>) => {
      state.workout.exercises = state.workout.exercises.filter((exercise) => exercise.name !== action.payload);
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
    setDate: (state, action: PayloadAction<string>) => {
      state.workout.date = action.payload;
    },
    setDistance: (state, action: PayloadAction<number>) => {
      state.distance = action.payload;
    },
    setTime: (state, action: PayloadAction<number>) => {
      state.time = action.payload;
    },
    setReps: (state, action: PayloadAction<number>) => {
      state.reps = action.payload;
    },
    setSets: (state, action: PayloadAction<number>) => {
      state.sets = action.payload;
    }, 
    setWeight: (state, action: PayloadAction<number>) => {
      state.weight = action.payload;
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

export const { addExercise, removeExercise, clearExercises, setSearchName, setSearchType, setSearchResults, setDate, setDistance, setTime, setReps, setSets, setWeight } =
  addWorkoutSlice.actions;

export default addWorkoutSlice.reducer;
