import { Delete, Search } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Exercise, ExerciseType } from "../features/workouts/workoutsSlice";
import FullscreenCircularProgress from "../components/FullscreenCircularProgress";
import { useState } from "react";

export default function AddWorkoutView({
  types,
  selectedType,
  setType,
  search,
  searchLoading,
  searchResults,
  addWorkout,
  exercises,
  addExercise,
  removeExercise,
}: {
  types: ExerciseType[];
  selectedType: ExerciseType | "all";
  setType: (event: SelectChangeEvent) => void;
  search: (name: string) => void;
  searchLoading: boolean;
  searchResults: Exercise[];
  addWorkout: () => void;
  exercises: Exercise[];
  addExercise: (exercise: Exercise) => void;
  removeExercise: (name: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Grid container spacing={2} sx={{ width: "100%", height: "100%", p: 2 }}>
      {/* Selected Workout */}
      <Grid item md={3} xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6">New workout</Typography>
            <Typography variant="subtitle1">
              {new Date().toLocaleDateString(undefined, {
                weekday: "short",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <List disablePadding>
              {exercises.map((exercise) => (
                <ListItem
                  key={exercise.name}
                  secondaryAction={
                    <IconButton edge="end" onClick={() => removeExercise(exercise.name)}>
                      <Delete />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={exercise.name}
                    secondary={[
                      exercise.type?.replace("_", " ").toLocaleUpperCase(),
                      exercise.muscle?.replace("_", " ").toLocaleUpperCase(),
                    ].join(", ")}
                  />
                </ListItem>
              ))}
            </List>
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
              {/* Filter by type */}
              <Select variant="standard" value={selectedType || "all"} onChange={setType}>
                <MenuItem key={1} value={"all"}>
                  ALL
                </MenuItem>
                {types.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type.replace("_", " ").toLocaleUpperCase()}
                  </MenuItem>
                ))}
              </Select>
              {/* Search field */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  search(searchQuery);
                }}
                style={{ flexGrow: 1 }}
              >
                <TextField
                  placeholder="Search Exercise"
                  variant="standard"
                  sx={{ width: "100%" }}
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton type="submit">
                          <Search />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </form>
            </Stack>
          </Container>
          {/* Search results */}
          <Container sx={{ pt: 2 }}>
            {searchLoading ? (
              <FullscreenCircularProgress />
            ) : searchResults.length == 0 ? (
              <Typography variant="h5">No exercises found, try another search </Typography>
            ) : (
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, lg: 12 }} sx={{ pb: 1 }}>
                {searchResults.map((result) => (
                  <Grid item key={result.name} xs={4} sm={4} lg={4}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" noWrap>
                          {result.name}
                        </Typography>
                        <Stack direction="row" spacing={0.5} useFlexGap flexWrap="wrap" sx={{ p: 0 }}>
                          {result.difficulty && (
                            <Chip color="secondary" size="small" label={result.difficulty.toLocaleUpperCase()} />
                          )}
                          {result.type && (
                            <Chip
                              color="success"
                              size="small"
                              label={result.type.replace("_", " ").toLocaleUpperCase()}
                            />
                          )}
                          {result.muscle && (
                            <Chip
                              color="primary"
                              size="small"
                              label={result.muscle.replace("_", " ").toLocaleUpperCase()}
                            />
                          )}
                        </Stack>
                        <Typography variant="body1" noWrap>
                          {result.instructions}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          disabled={exercises.some((e) => e.name === result.name)}
                          onClick={() => addExercise(result)}
                        >
                          Add to workout
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Container>
        </Paper>
      </Grid>
    </Grid>
  );
}
