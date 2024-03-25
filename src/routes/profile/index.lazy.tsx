import { createLazyFileRoute } from "@tanstack/react-router";
import Cover from "../../components/Cover";
import LoginForm from "../../components/LoginForm";
import LoggedIn from "../../components/LoggedIn";
import { auth } from "../../main";
import { useEffect, useState } from "react";
import { Alert, AlertColor, CircularProgress, Snackbar } from "@mui/material";
import firebase from "firebase/compat/app";
import { onAuthStateChanged } from "firebase/auth";

function Profile() {
  const [loading, setLoading] = useState(true);
  // TODO: user should be in model or store?
  const [user, setUser] = useState<firebase.User | null>(firebase.auth().currentUser);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>();

  function showSnackbar(message: string, severity: AlertColor = "info") {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
    setSnackbarSeverity(severity);
  }

  function handleLogout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        showSnackbar("Successfully signed out!", "success");
      })
      .catch((error) => {
        // Handle error
        showSnackbar(`Error signing out: ${error.message}`, "error");
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user as firebase.User | null);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <Cover>
        <CircularProgress />
      </Cover>
    );
  }

  return (
    <Cover>
      {user ? <LoggedIn user={user} logout={handleLogout} /> : <LoginForm />}
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
  component: Profile,
});
