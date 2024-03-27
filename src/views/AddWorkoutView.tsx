import { Delete, Search } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  IconButton,
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
import { Exercise } from "../features/workouts/workoutsSlice";

export default function AddWorkoutView({
  categories,
  category,
  setCategory,
  search,
  searchResults,
  addWorkout,
  exercises,
  addExercise,
  removeExercise,
}: {
  categories: string[];
  category: string;
  setCategory: (event: SelectChangeEvent) => void;
  search: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchResults: Exercise[];
  addWorkout: () => void;
  exercises: Exercise[];
  addExercise: (exercise: Exercise) => void;
  removeExercise: (id: string) => void;
}) {
  return (
    <Grid container spacing={2} sx={{ width: "100%", height: "100%", p: 2 }}>
      {/* Selected Workout */}
      <Grid item md={3} xs={12}>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h6">
              New workout
            </Typography>
            <Typography variant="subtitle1">
              {new Date().toLocaleDateString(undefined, {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </Typography>
            {exercises.length > 0 ? (
              <List disablePadding sx={{ listStyleType: "numeric", pl: 4 }}>
                {exercises.map((exercise) => (
                  <ListItem
                    key={exercise.id}
                    secondaryAction={
                      <IconButton edge="end" onClick={() => removeExercise(exercise.id)}>
                        <Delete />
                      </IconButton>
                    }
                    sx={{ display: "list-item" }}
                  >
                    {exercise.title}
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body1">No exercises added yet</Typography>
            )}
          </CardContent>
          <CardActions>
            <Button disabled={exercises.length == 0} onClick={addWorkout}>
              Add workout
            </Button>
          </CardActions>
        </Card>
      </Grid>
      {/* Add exercises */}
      <Grid item md={9} xs={12}>
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
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, lg: 12 }} sx={{ pb: 1 }}>
              {searchResults.map((result) => (
                <Grid item key={result.title} xs={2} sm={4} lg={4}>
                  <Card>
                    <CardMedia component="img" height="140" image={result.image} alt={result.title} />
                    <CardHeader title={result.title} subheader={result.description} />
                    <CardActions>
                      <Button disabled={exercises.some((e) => e.id === result.id)} onClick={() => addExercise(result)}>
                        Add to workout
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Paper>
      </Grid>
    </Grid>
  );
}
