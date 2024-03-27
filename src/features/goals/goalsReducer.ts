import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid'; 
import { generateRandomData } from '../../routes/progress/index.lazy';


interface Data {
    date: string;
    value: number;
}

interface Goal {
    id: string;
    description: string;
    excercise: string;
    progress: number;
    goalType: string;
    startingPoint: string;
    endGoal: string;
    storedValues: Data[]
}

interface GoalsState {
    goals: Goal[];
    description: string;
    exercise: string;
    progress: number;
    goalType: string;
    startingPoint: string;
    endGoal: string;
    currentGoal: Goal | null
}

const initialState: GoalsState = {
    goals: [],
    description: '',
    exercise: '',
    progress: 0,
    goalType: '',
    startingPoint: '',
    endGoal: '',
    currentGoal: null
};

const goalsSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        setDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload;
        },
        setExercise: (state, action: PayloadAction<string>) => {
            state.exercise = action.payload;
        },
        setGoalType: (state, action: PayloadAction<string>) => {
            state.goalType = action.payload;
        },
        setStartingPoint: (state, action: PayloadAction<string>) => {
            state.startingPoint = action.payload;
        },
        setEndGoal: (state, action: PayloadAction<string>) => {
            state.endGoal = action.payload;
        },
        addGoal: (state) => {
            const description = state.description; 
            const excercise = state.exercise; 
            const goalType = state.goalType; 
            const startingPoint = state.startingPoint;
            const endGoal = state.endGoal;    

            const newGoal: Goal = {
                id: uuidv4(),
                description,
                excercise,
                progress: Math.floor(Math.random() * 101),
                goalType,
                startingPoint,
                endGoal,
                storedValues: generateRandomData()
            };

            state.goals.push(newGoal);
            state.goalType = '';
            state.exercise = '';
        }, removeGoal: (state, action: PayloadAction<string>) => {
            state.goals = state.goals.filter(goal => goal.id !== action.payload);
        }, setCurrentGoal: (state, action: PayloadAction<string>) => {
            const goalId = action.payload;
            const foundGoal = state.goals.find(goal => goal.id === goalId);

            if (foundGoal) {
                state.currentGoal = foundGoal;
                state.description = foundGoal.description
                state.exercise = foundGoal.excercise
                state.progress = foundGoal.progress
                state.goalType = foundGoal.goalType
            } else {
                state.currentGoal = null; 
            }
        },
        
    },
});

export const { setDescription, setExercise, setGoalType, setStartingPoint, setEndGoal, addGoal, removeGoal, setCurrentGoal } = goalsSlice.actions;

export default goalsSlice.reducer;
