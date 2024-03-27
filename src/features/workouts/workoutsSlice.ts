import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  id: number;
};

// Define a type for the slice state
export interface WorkoutsState {
  workouts: Workout[];
}

// Define the initial state using that type
const initialState: WorkoutsState = {
  workouts: [],
};

export const workoutsSlice = createSlice({
  name: "workouts",
  initialState,
  reducers: {
    /**  Add a workout to the list
     * @param state - The current state
     * @param action - The workout to add
     * @returns void
     */
    add: (state, action: PayloadAction<Workout>) => {
      state.workouts.push(action.payload);
    },
    /** Remove a workout in the list
     * @param state - The current state
     * @param action - The id of the workout to remove
     * @returns void
     */
    remove: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.workouts = state.workouts.filter((e) => e.id !== id);
    },
  },
});

export const { add, remove } = workoutsSlice.actions;

export default workoutsSlice.reducer;
