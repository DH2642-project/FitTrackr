import {
  Container,
  Grid,
  Modal,
  Paper,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Exercise, ExerciseType } from "../../Model/workouts/workoutsSlice";
import FullscreenCircularProgress from "../Application/FullscreenCircularProgress";
import { useState } from "react";
import { WorkoutSummaryView } from "./WorkoutSummaryView";
import { SearchBarView } from "../Search/SearchBarView";
import { SearchResultCard } from "./SearchResultCard";
import { AddExerciseCard } from "./AddExerciseCard";

export default function AddWorkoutView({
  setDistance,
  setTime,
  setWeight,
  sets,
  setSets,
  reps,
  setReps,
  types,
  selectedType,
  setType,
  setName,
  name,
  search,
  searchLoading,
  searchResults,
  addWorkout,
  addWorkoutLoading,
  exercises,
  addExercise,
  removeExercise,
  date,
  setDate,
}: {
  setDistance: (distance: number) => void;
  setTime: (time: number) => void;
  setWeight: (weight: number) => void;
  sets: number | undefined;
  setSets: (event: Event, value: number | number[]) => void;
  reps: number | undefined;
  setReps: (event: Event, value: number | number[]) => void;
  types: ExerciseType[];
  selectedType: ExerciseType | "all";
  setType: (event: SelectChangeEvent) => void;
  setName: (name: string) => void;
  name: string;
  search: () => void;
  searchLoading: boolean;
  searchResults: Exercise[];
  addWorkout: () => void;
  addWorkoutLoading: boolean;
  exercises: Exercise[];
  addExercise: (exercise: Exercise) => void;
  removeExercise: (name: string) => void;
  date: string;
  setDate: (date: string) => void;
}) {
  const [addModal, setAddModal] = useState(false);
  const [result, setResult] = useState<Exercise | null>(null);

  return (
    <>
      <Grid
        container
        spacing={1.5}
        sx={{
          width: "100%",
          height: "100%",
          p: "0.75rem 0rem 0.75rem 0.75rem",
        }}
      >
        {/* Selected Workout */}
        <Grid item md={3} xs={12}>
          <WorkoutSummaryView
            addWorkoutLoading={addWorkoutLoading}
            exercises={exercises}
            date={date}
            setDate={setDate}
            addWorkout={addWorkout}
            removeExercise={removeExercise}
          ></WorkoutSummaryView>
        </Grid>
        {/* Add exercises */}
        <Grid item md={9} xs={12} sx={{ minHeight: "100%" }}>
          {/* Search menu */}
          <Paper elevation={4} sx={{ width: "100%", height: "100%" }}>
            <SearchBarView
              selectedType={selectedType}
              setType={setType}
              types={types}
              search={search}
              setName={setName}
              name={name}
            ></SearchBarView>
            {/* Search results */}
            <Container sx={{ p: { xs: 1, md: 2 }, height: "100%" }}>
              {searchLoading ? (
                <FullscreenCircularProgress />
              ) : searchResults.length == 0 ? (
                <Typography variant="h6" align="center">
                  No exercises found
                </Typography>
              ) : (
                <Grid
                  container
                  spacing={{ xs: 1, md: 2 }}
                  columns={{ xs: 4, md: 8 }}
                  sx={{ pb: 1 }}
                >
                  {searchResults.map((result) => {
                    const isAdded = exercises.some(
                      (e) => e.name === result.name
                    );
                    return (
                      <SearchResultCard
                        key={result.name}
                        result={result}
                        isAdded={isAdded}
                        setResult={setResult}
                        setAddModal={setAddModal}
                        removeExercise={removeExercise}
                      ></SearchResultCard>
                    );
                  })}
                </Grid>
              )}
            </Container>
          </Paper>
        </Grid>
      </Grid>
      <Modal open={addModal} onClose={() => setAddModal(false)}>
        <AddExerciseCard
          result={result}
          sets={sets}
          reps={reps}
          setAddModal={setAddModal}
          setSets={setSets}
          setReps={setReps}
          setWeight={setWeight}
          setTime={setTime}
          setDistance={setDistance}
          addExercise={addExercise}
        />
      </Modal>
    </>
  );
}
