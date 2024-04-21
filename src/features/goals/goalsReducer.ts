import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { auth, database } from "../../firebase";
import { child, get, push, ref, set } from "firebase/database";

export type GoalData = {
    date: string;
    value: number;
}

export type Goal = {
    id: string;
    exercise: string;
    progress: number;
    goalType?: string;
    startingPoint: number;
    endGoal: number;
    storedValues: GoalData[]
    metric: string
    distance?: number
    key: string
}

export interface GoalsState {
    goals: Goal[];
    currentExercise: string;
    progress: number;
    goalType?: string;
    startingPoint: number;
    endGoal: number;
    currentGoal?: Goal | null;
    metric: string;
    goalStatus: string
    goalError?: boolean
    distance? : number
}

const initialState: GoalsState = {
    goals: [],
    currentExercise: "",
    progress: 0,
    goalType: "",
    startingPoint: 0,
    endGoal: 0,
    metric: 'kg',
    goalStatus: 'idle',
};


export const addGoalDb = createAsyncThunk("goals/addGoalDb", async (_, thunkAPI) => {

    const state = thunkAPI.getState() as { goals: GoalsState };
    
    const userId = auth.currentUser?.uid;
    try {
        
        const snapshot = await push(ref(database, `goals/${userId}`), {
            exercise: state.goals.currentExercise,
            progress: 0,
            goalType: state.goals.goalType,
            startingPoint: state.goals.startingPoint,
            endGoal: state.goals.endGoal,
            storedValues: {},
            metric: state.goals.metric,
            distance: state.goals.distance ?? 0
        });
        return snapshot.key;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }    
});

export const fetchGoals = createAsyncThunk("goals/fetchGoals", async () => {
    const userId = auth.currentUser?.uid;
    const snapshot = await get(child(ref(database), `goals/${userId}`));
    if (snapshot.exists()) {
        const goals = Object.entries(snapshot.val() as Record<string, Goal>).map(([key, value]) => ({
            ...value,
            key,
        }));
        return goals
    } else {
        return [];
    }
});

export const deleteGoalDb = createAsyncThunk("goals/deleteGoalDb", async (key: string) => {
    const userId = auth.currentUser?.uid;
    set(ref(database, `goals/${userId}/${key}`), null);
});

const goalsSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        setExercise: (state, action: PayloadAction<string>) => {
            state.currentExercise = action.payload;
        },
        setGoalType: (state, action: PayloadAction<string | undefined>) => {
            if (action.payload === "cardio") {
                state.metric = "minutes"
            }
            else {
                state.metric = "kg"
            }
            state.goalType = action.payload;
        },
        setStartingPoint: (state, action: PayloadAction<number>) => {
            state.startingPoint = action.payload;
        },
        setEndGoal: (state, action: PayloadAction<number>) => {
            state.endGoal = action.payload;
        },
        resetToDefaultState: (state) => {
            state.currentExercise = ""
            state.goalType = "cardio"
            state.startingPoint = 0
            state.endGoal = 0
        },
        setCurrentGoal: (state, action: PayloadAction<string>) => {
            const goalKey = action.payload;
            
                const foundGoal = state.goals.find(goal => goal.key === goalKey);
                if (foundGoal) {
                    state.currentGoal = foundGoal;
                    state.currentExercise = foundGoal.exercise
                    state.progress = foundGoal.progress
                    state.goalType = foundGoal.goalType
                    state.metric = foundGoal.metric
                } else {
                    state.currentGoal = null;
                }
            
        },
        setGoalDistance: (state, action: PayloadAction<number>) => {
            state.distance = action.payload;
        }
        
    }, extraReducers: (builder) => {
        builder
            .addCase(addGoalDb.pending, (state) => {
                state.goalStatus = "loading";
            })
            .addCase(addGoalDb.fulfilled, (state) => {
                state.goalStatus = "idle";
            })
            .addCase(addGoalDb.rejected, (state) => {
                state.goalError = true;
                state.goalStatus = "idle";
            })
            .addCase(fetchGoals.pending, (state) => {
                    state.goalStatus = "loading";
                })
            .addCase(fetchGoals.fulfilled, (state, action: PayloadAction<Goal[]>) => {
                    state.goalStatus = "idle";
                    state.goals = action.payload;
                    if (state.goals.length > 0) {
                        state.currentGoal = state.goals[0]
                        state.progress = state.currentGoal.progress
                    }
            })
            .addCase(deleteGoalDb.pending, (state) => {
                state.goalStatus = "loading";
            })
            .addCase(deleteGoalDb.fulfilled, (state) => {
                state.goalStatus = "idle";
            });
    }
});

export const { setExercise, setGoalType, setStartingPoint, setEndGoal, setCurrentGoal, resetToDefaultState, setGoalDistance } = goalsSlice.actions;

export default goalsSlice.reducer;
