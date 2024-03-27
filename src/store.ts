import { configureStore } from '@reduxjs/toolkit'
import workoutsReducer from './features/workouts/workoutsSlice'

export const store = configureStore({
    reducer: {
        workouts: workoutsReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

