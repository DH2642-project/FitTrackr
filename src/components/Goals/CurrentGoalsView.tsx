import { Grid,Button, Card, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import GoalProgressChart from "../Progress/GoalProgressChart";

export function CurrentGoalsView(props: any) {
     function currentGoalCardCB(goal: any) {
       return (
         <Card key={goal.id}>
           <Grid container spacing={2}>
             <Grid item xs={10}>
               <Typography variant="h4">{goal.description}</Typography>
             </Grid>
             <Grid item xs={2}>
               <GoalProgressChart value={82}></GoalProgressChart>
             </Grid>
           </Grid>

           <Button
             type="button"
             variant="contained"
             color="error"
             onClick={() => props.onDeleteGoal(goal.id)}
           >
             Delete
           </Button>
         </Card>
       );
     }
    const goals = useSelector(
        (state: RootState) => state.goals.goals
    );
    return (
        <Stack spacing={2}>
            {goals.map(currentGoalCardCB)}
        </Stack>
    )
}