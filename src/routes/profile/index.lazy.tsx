import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertColor } from "@mui/material";
import { ProfileView } from "../../views/ProfileView";
import { auth, database } from "../../firebase";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { useObject } from "react-firebase-hooks/database";
import { ref, set } from "firebase/database";
import { UserProfile } from "../../main";

export const Route = createLazyFileRoute("/profile/")({
  component: ProfilePresenter,
});

export function ProfilePresenter() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("info");
  const [user = null] = useAuthState(auth);
  const [signOut, signOutLoading] = useSignOut(auth);
  const [snapshot] = useObject(ref(database, "users/" + user?.uid + "/profile"));
  const userProfile: UserProfile = snapshot?.val();

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
    else {
      showSnackbar("Gender has been updated!")
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
    else {
      showSnackbar("Weight has been updated!")
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
    else {
      showSnackbar("Height has been updated!")
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
    else {
      showSnackbar("Age has been updated!")
    }
  }

  return (
    <ProfileView
    user={user}
    userProfile={userProfile}
    handleSignOut={handleSignOut}
    handleSetGender={handleSetGender}
    handleSetWeight={handleSetWeight}
    handleSetHeight={handleSetHeight}
    handleSetAge={handleSetAge}
    showSnackbar={showSnackbar}
    snackbarOpen={snackbarOpen}
    snackbarMessage={snackbarMessage}
    snackbarSeverity={snackbarSeverity}
    setSnackbarOpen={setSnackbarOpen}
    signOutLoading={signOutLoading}
  />
  );
}
