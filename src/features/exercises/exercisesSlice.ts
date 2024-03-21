import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// TODO: Implement proper Exercise type
export type Exercise = {
    id: number
    name: string
}

// Define a type for the slice state
export interface ExerciseState {
    exercises: Exercise[]
}

// Define the initial state using that type
const initialState: ExerciseState = {
    exercises: [],
}

export const exerciseSlice = createSlice({
    name: "exercise",
    initialState,
    reducers: {
        create: (state, action: PayloadAction<Exercise>) => {
            state.exercises.push(action.payload)
        },
        update: (state, action: PayloadAction<Exercise>) => {
            const { id, name } = action.payload
            const exercise = state.exercises.find((e) => e.id === id)
            if (exercise) {
                exercise.name = name
            }
        },
        remove: (state, action: PayloadAction<number>) => {
            const id = action.payload
            state.exercises = state.exercises.filter((e) => e.id !== id)
        },
    },
})

export const { create, update, remove } = exerciseSlice.actions

export default exerciseSlice.reducer
