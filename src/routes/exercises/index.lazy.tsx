// import { createLazyFileRoute } from "@tanstack/react-router"
// import { useDispatch, useSelector } from "react-redux"
// import { RootState } from "../../store"
// import {
//   Button,
//   Box,
//   Card,
//   Stack,
//   TextField,
//   Typography,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
// } from "@mui/material"
// import { FormEvent, useState } from "react"
// import {
//   add,
//   update,
//   remove,
//   Exercise,
// } from "../../features/workouts/workoutsSlice"

// export const Route = createLazyFileRoute("/exercises/")({
//   component: ExercisesPage,
// })

// function ExercisesPage() {
//   const exercises = useSelector((state: RootState) => state.workouts.workouts)
//   const dispatch = useDispatch()

//   const [newExercise, setNewExercise] = useState("")
//   const [editingExercise, setEditingExercise] = useState<Exercise | null>(null)
//   const [renamedExercise, setRenamedExercise] = useState("")

//   const handleCloseEditor = () => {
//     setEditingExercise(null)
//     setRenamedExercise("")
//   }

//   const handleAddExercise = (event: FormEvent) => {
//     event.preventDefault()

//     dispatch(
//       add({
//         id: Math.random(),
//         name: newExercise,
//       })
//     )
//   }

//   const handleUpdateExercise = (event: FormEvent) => {
//     event.preventDefault()

//     if (editingExercise) {
//       dispatch(
//         update({
//           id: editingExercise.id,
//           name: renamedExercise,
//         })
//       )
//     }

//     handleCloseEditor()
//   }

//   const handleDeleteExercise = (id: number) => {
//     dispatch(remove(id))
//   }

//   return (
//     <>
//       <Typography variant="h3">Exercises</Typography>

//       <form onSubmit={handleAddExercise}>
//         <TextField
//           label="Add new exercise"
//           variant="outlined"
//           value={newExercise}
//           onChange={(e) => setNewExercise(e.target.value)}
//         />
//         <Button type="submit">Add</Button>
//       </form>

//       <Stack spacing={2}>
//         {exercises.map((exercise) => (
//           <Card key={exercise.id}>
//             <Box padding={2}>
//               <Stack direction="row" spacing={2}>
//                 <Typography variant="h5">{exercise.name}</Typography>
//                 <Button
//                   type="button"
//                   variant="contained"
//                   onClick={() => {
//                     setEditingExercise(exercise)
//                     setRenamedExercise(exercise.name)
//                   }}
//                 >
//                   Edit
//                 </Button>
//                 <Button
//                   type="button"
//                   variant="contained"
//                   color="error"
//                   onClick={() => handleDeleteExercise(exercise.id)}
//                 >
//                   Delete
//                 </Button>
//               </Stack>
//             </Box>
//           </Card>
//         ))}
//       </Stack>

//       <Dialog
//         open={Boolean(editingExercise)}
//         onClose={handleCloseEditor}
//         PaperProps={{
//           component: "form",
//           onSubmit: handleUpdateExercise,
//         }}
//       >
//         <DialogTitle>Edit exercise</DialogTitle>
//         <DialogContent>
//           <DialogContentText>Edit the exercise name</DialogContentText>
//           <TextField
//             autoFocus
//             required
//             margin="dense"
//             id="name"
//             label="Exercise name"
//             type="text"
//             value={renamedExercise}
//             onChange={(e) => setRenamedExercise(e.target.value)}
//             fullWidth
//             variant="standard"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseEditor}>Cancel</Button>
//           <Button type="submit">Save</Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   )
// }
