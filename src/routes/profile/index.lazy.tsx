import { createLazyFileRoute } from "@tanstack/react-router";
import Cover from "../../components/Cover";
import LoginForm from "../../components/LoginForm";
import LoggedIn from "../../components/LoggedIn";
import { auth } from "../../main";
import { useState } from "react";
import { Alert, AlertColor, CircularProgress, Snackbar } from "@mui/material";
import firebase from "firebase/compat/app";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";

export function ProfilePresenter() {
  const [user, userLoading] = useAuthState(auth);
  const [signOut, signOutLoading] = useSignOut(auth);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>();

  function showSnackbar(message: string, severity: AlertColor = "info") {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
    setSnackbarSeverity(severity);
  }

  async function handleSignOut() {
    const success = await signOut();
    if (!success) {
      showSnackbar("An error occurred while signing out.", "error");
    }
  }

  if (userLoading) {
    return (
      <Cover>
        <CircularProgress />
      </Cover>
    );
  }

  return (
    <Cover>
      {user ? (
        <LoggedIn user={user as firebase.User} signOut={handleSignOut} signOutLoading={signOutLoading} />
      ) : (
        <LoginForm />
      )}
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
    </Cover>
  );
}

export const Route = createLazyFileRoute("/profile/")({
  component: ProfilePresenter,
});
