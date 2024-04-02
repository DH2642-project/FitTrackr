import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid'; 
import { generateRandomData } from '../../routes/progress/index.lazy';


export type GoalData = {
    date: string;
    value: number;
}

export type Goal = {
    id: string;
    description: string;
    excercise: string;
    progress: number;
    goalType: string;
    startingPoint: number;
    endGoal: number;
    storedValues: GoalData[]
    metric: string
}

export interface GoalsState {
    goals: Goal[];
    description: string;
    currentExercise: string;
    progress: number;
    goalType: string;
    startingPoint: number;
    endGoal: number;
    currentGoal: Goal | null;
    metric: string;
}

const initialState: GoalsState = {
    goals: [],
    description: '',
    currentExercise: "Run",
    progress: 0,
    goalType: "Cardio",
    startingPoint: 0,
    endGoal: 0,
    currentGoal: null,
    metric: 'minutes'
};


// mock data
const cardioExercises = ["Run", "Swim", "Walk"]
const strengthExercises = ["Pushups", "Situps", "Squat"];
export const allExercises = { cardio: cardioExercises, strength: strengthExercises }

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
        addGoal: (state) => {
            const description = state.description; 
            const excercise = state.currentExercise; 
            const goalType = state.goalType; 
            const startingPoint = state.startingPoint;
            const endGoal = state.endGoal;  
            const progress = Math.floor(Math.random() * 101);
            const metric = state.metric

            const newGoal: Goal = {
                id: uuidv4(),
                description,
                excercise,
                progress: progress,
                goalType,
                startingPoint,
                endGoal,
                storedValues: generateRandomData(),
                metric,
            };

            state.goals.push(newGoal);
            state.currentGoal = newGoal;
            state.progress = progress;
            state.currentExercise = "Run"
            state.goalType = "Cardio"
            state.description = ""
            state.startingPoint = 0
            state.endGoal = 0
            
        }, removeGoal: (state, action: PayloadAction<string>) => {
            state.goals = state.goals.filter(goal => goal.id !== action.payload);
        }, setCurrentGoal: (state, action: PayloadAction<string>) => {
            const goalId = action.payload;
            const foundGoal = state.goals.find(goal => goal.id === goalId);

            if (foundGoal) {
                state.currentGoal = foundGoal;
                state.description = foundGoal.description
                state.currentExercise = foundGoal.excercise
                state.progress = foundGoal.progress
                state.goalType = foundGoal.goalType
                state.metric = foundGoal.metric
            } else {
                state.currentGoal = null; 
            }
        },
        
    },
});

export const { setDescription, setExercise, setGoalType, setStartingPoint, setEndGoal, addGoal, removeGoal, setCurrentGoal } = goalsSlice.actions;

export default goalsSlice.reducer;
