import { Alert, AlertColor, Snackbar } from "@mui/material";

export default function CustomSnackbar({
  snackbarOpen,
  snackbarMessage,
  snackbarSeverity,
  setSnackbarOpen,
}: {
  snackbarOpen: boolean;
  snackbarMessage: string;
  snackbarSeverity: AlertColor;
  setSnackbarOpen: (open: boolean) => void;
}) {
  return (
    <Snackbar
      open={snackbarOpen}
      message={snackbarMessage}
      autoHideDuration={5000}
      onClose={() => setSnackbarOpen(false)}
    >
      <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
}
