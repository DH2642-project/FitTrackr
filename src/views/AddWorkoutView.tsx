import { Search } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  InputAdornment,
  List,
  ListItem,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Exercise, Workout } from "../features/workouts/workoutsSlice";

export default function WorkoutsView({
  categories,
  category,
  setCategory,
  search,
  searchResults,
  addWorkout,
  deleteWorkout,
  exercises,
  addExercise,
  workouts,
}: {
  categories: string[];
  category: string;
  setCategory: (event: SelectChangeEvent) => void;
  search: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchResults: Exercise[];
  addWorkout: () => void;
  deleteWorkout: (id: number) => void;
  exercises: Exercise[];
  addExercise: (exercise: Exercise) => void;
  workouts: Workout[];
}) {
  return (
    <Stack direction="column">
      <Container>
        <Typography variant="h3">Previous workouts:</Typography>
        {workouts.map((workout) => (
          <Card key={workout.id}>
            <CardHeader title="Workout session" />
            <CardContent>
              <List>
                {workout.exercises.map((exercise) => (
                  <ListItem key={exercise.id}>{exercise.title}</ListItem>
                ))}
              </List>
            </CardContent>
            <CardActions>
              <Button onClick={() => deleteWorkout(workout.id)}>Delete session</Button>
            </CardActions>
          </Card>
        ))}
      </Container>
      <Grid container rowSpacing={2} columnSpacing={2} sx={{ width: "100%", height: "100%", p: 2 }}>
        <Grid item md={8} xs={12}>
          {/* Search menu */}
          <Paper elevation={4} sx={{ width: "100%", height: "100%" }}>
            <Container sx={{ pt: 2 }}>
              <Stack direction="row" spacing={2}>
                {/* Filter by category */}
                <Select variant="standard" value={category} onChange={setCategory}>
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
                {/* Search field */}
                <TextField
                  variant="standard"
                  sx={{ width: "100%" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                  onChange={search}
                />
              </Stack>
            </Container>
            {/* Search results */}
            <Container sx={{ pt: 2 }}>
              <Grid container rowSpacing={2} columnSpacing={2} sx={{ pb: 1 }}>
                {searchResults.map((result) => (
                  <Grid item key={result.title} md={6} xs={12}>
                    <Card>
                      <CardMedia component="img" height="140" image={result.image} alt={result.title} />
                      <CardHeader title={result.title} subheader={result.description} />
                      <CardActions>
                        <Button onClick={() => addExercise(result)}>Add to workout</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Paper>
        </Grid>
        <Grid item md={4} xs={12}>
          <Card>
            <CardHeader title="Workout session" />
            <CardContent>
              <List>
                {exercises && exercises.map((workout) => <ListItem key={workout.id}>{workout.title}</ListItem>)}
              </List>
            </CardContent>
            <CardActions>
              <Button onClick={addWorkout}>Add session</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}
