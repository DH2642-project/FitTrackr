import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateRandomData } from '../../routes/progress/index.lazy';
import { auth, database } from "../../firebase";
import { child, get, push, ref, set } from "firebase/database";


export type GoalData = {
    date: string;
    value: number;
}

export type Goal = {
    id: string;
    description: string;
    exercise: string;
    progress: number;
    goalType: string;
    startingPoint: number;
    endGoal: number;
    storedValues: GoalData[]
    metric: string
    key? : string
}

export interface GoalsState {
    goals: Goal[];
    description: string;
    currentExercise: string;
    progress: number;
    goalType: string;
    startingPoint: number;
    endGoal: number;
    currentGoal?: Goal | null;
    metric: string;
    goalStatus: string
    goalError?: boolean
}

const initialState: GoalsState = {
    goals: [],
    description: '',
    currentExercise: "Run",
    progress: 0,
    goalType: "Cardio",
    startingPoint: 0,
    endGoal: 0,
    metric: 'minutes',
    goalStatus: 'idle'
};


// mock data
const cardioExercises = ["Run", "Swim", "Walk"]
const strengthExercises = ["Pushups", "Situps", "Squat"];
export const allExercises = { cardio: cardioExercises, strength: strengthExercises }

export const addGoalDb = createAsyncThunk("goals/addGoalDb", async (_, thunkAPI) => {

    const state = thunkAPI.getState() as { goals: GoalsState };
    
    const userId = auth.currentUser?.uid;
    try {
        const snapshot = await push(ref(database, `goals/${userId}`), {
            description:  state.goals.description,
            exercise: state.goals.currentExercise,
            progress: Math.floor(Math.random() * 101),
            goalType: state.goals.goalType,
            startingPoint: state.goals.startingPoint,
            endGoal: state.goals.endGoal,
            storedValues: generateRandomData(),
            metric: state.goals.metric
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
        setDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload;
        },
        setExercise: (state, action: PayloadAction<string>) => {
            state.currentExercise = action.payload;
        },
        setGoalType: (state, action: PayloadAction<string>) => {
            state.currentExercise = "Run"
            if (action.payload === "Cardio") {
                state.currentExercise = cardioExercises[0];
                state.metric = "minutes"
            } else if (action.payload === "Strength") {
                state.currentExercise = strengthExercises[0];
                state.metric = "kg / reps"
            } else {
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
            state.currentExercise = "Run"
            state.goalType = "Cardio"
            state.description = ""
            state.startingPoint = 0
            state.endGoal = 0
        },
        setCurrentGoal: (state, action: PayloadAction<string>) => {
            const goalKey = action.payload;
            
                const foundGoal = state.goals.find(goal => goal.key === goalKey);
                if (foundGoal) {
                    state.currentGoal = foundGoal;
                    state.description = foundGoal.description
                    state.currentExercise = foundGoal.exercise
                    state.progress = foundGoal.progress
                    state.goalType = foundGoal.goalType
                    state.metric = foundGoal.metric
                } else {
                    state.currentGoal = null;
                }
            
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

export const { setDescription, setExercise, setGoalType, setStartingPoint, setEndGoal, setCurrentGoal, resetToDefaultState } = goalsSlice.actions;

export default goalsSlice.reducer;
