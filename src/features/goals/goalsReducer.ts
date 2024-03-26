import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid'; 

interface Goal {
    id: string;
    description: string;
    progress: number;
    goalType: string;
    startingPoint: string;
    endGoal: string;
}

interface GoalsState {
    goals: Goal[];
    description: string;
    progress: number
    goalType: string;
    startingPoint: string;
    endGoal: string;
}

const initialState: GoalsState = {
    goals: [],
    description: '',
    progress: 0,
    goalType: "Cardio",
    startingPoint: '',
    endGoal: '',
};

const goalsSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        setDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload;
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
            const goalType = state.goalType; 
            const startingPoint = state.startingPoint;
            const endGoal = state.endGoal;    

            const newGoal: Goal = {
                id: uuidv4(),
                description,
                progress: Math.floor(Math.random() * 101),
                goalType,
                startingPoint,
                endGoal,
            };

            state.goals.push(newGoal);

        }, removeGoal: (state, action: PayloadAction<string>) => {
            state.goals = state.goals.filter(goal => goal.id !== action.payload);
        },
        
    },
});

export const { setDescription, setGoalType, setStartingPoint, setEndGoal, addGoal, removeGoal } = goalsSlice.actions;

export default goalsSlice.reducer;
