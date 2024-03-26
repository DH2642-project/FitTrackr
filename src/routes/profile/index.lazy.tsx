import { createLazyFileRoute } from "@tanstack/react-router";
import Cover from "../../components/Cover";
import LoginForm from "../../components/LoginForm";
import LoggedIn from "../../components/LoggedIn";
import { UserProfile, auth, database } from "../../main";
import { useState } from "react";
import { Alert, AlertColor, CircularProgress, Snackbar } from "@mui/material";
import firebase from "firebase/compat/app";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { useObject } from "react-firebase-hooks/database";
import { ref, set } from "firebase/database";

export function ProfilePresenter() {
  // User Authentication
  const [user, userLoading] = useAuthState(auth);
  const [signOut, signOutLoading] = useSignOut(auth);
  // Database User Profile
  const [snapshot, snapshotLoading] = useObject(ref(database, "users/" + user?.uid + "/profile"));
  const userProfile: UserProfile = snapshot?.val();
  // Snackbar state
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

  function handleSetGender(event: React.ChangeEvent<HTMLInputElement>) {
    const success = set(ref(database, "users/" + user?.uid + "/profile"), {
      ...userProfile,
      gender: event.target.value,
    });
    if (!success) {
      showSnackbar("An error occurred while updating your profile.", "error");
    }
  }

  function handleSetWeight(event: React.ChangeEvent<HTMLInputElement>) {
    const success = set(ref(database, "users/" + user?.uid + "/profile"), {
      ...userProfile,
      weight: Number(event.target.value),
    });
    if (!success) {
      showSnackbar("An error occurred while updating your profile.", "error");
    }
  }

  function handleSetHeight(event: React.ChangeEvent<HTMLInputElement>) {
    const success = set(ref(database, "users/" + user?.uid + "/profile"), {
      ...userProfile,
      height: Number(event.target.value),
    });
    if (!success) {
      showSnackbar("An error occurred while updating your profile.", "error");
    }
  }

  function handleSetAge(event: React.ChangeEvent<HTMLInputElement>) {
    const success = set(ref(database, "users/" + user?.uid + "/profile"), {
      ...userProfile,
      age: Number(event.target.value),
    });
    if (!success) {
      showSnackbar("An error occurred while updating your profile.", "error");
    }
  }

  if (userLoading || snapshotLoading) {
    return (
      <Cover>
        <CircularProgress />
      </Cover>
    );
  }

  return (
    <Cover>
      {user ? (
        <LoggedIn
          user={user as firebase.User}
          signOut={handleSignOut}
          signOutLoading={signOutLoading}
          userProfile={userProfile}
          setGender={handleSetGender}
          setWeight={handleSetWeight}
          setHeight={handleSetHeight}
          setAge={handleSetAge}
        />
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
