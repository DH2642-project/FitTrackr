import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AlertColor } from "@mui/material";
import { ProfileView } from "../../views/Profile/ProfileView";
import { auth } from "../../firebase";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchProfile, setAge, setGender, setHeight, setWeight } from "../../Model/profile/profileSlice";

export const Route = createLazyFileRoute("/profile/")({
  component: ProfilePresenter,
});

export function ProfilePresenter() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>("info");
  const [user = null] = useAuthState(auth);
  const [signOut, signOutLoading] = useSignOut(auth);
  const profileState = useSelector((state: RootState) => state.profile);

  // const [snapshot] = useObject(ref(database, "users/" + user?.uid + "/profile"));
  // const userProfile: UserProfile = snapshot?.val();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Fetch profile from database
    dispatch(fetchProfile());
  }, [dispatch]);

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

  async function handleSetGender(event: React.ChangeEvent<HTMLInputElement>) {
    await dispatch(setGender(event.target.value));
    await dispatch(fetchProfile());
  }

  async function handleSetWeight(event: React.ChangeEvent<HTMLInputElement>) {
    await dispatch(setWeight(Number(event.target.value)));
    await dispatch(fetchProfile());
  }

  async function handleSetHeight(event: React.ChangeEvent<HTMLInputElement>) {
    await dispatch(setHeight(Number(event.target.value)));
    await dispatch(fetchProfile());
  }

  async function handleSetAge(event: React.ChangeEvent<HTMLInputElement>) {
    await dispatch(setAge(Number(event.target.value)));
    await dispatch(fetchProfile());
  }

  return (
    <ProfileView
      user={user}
      userProfile={profileState.userProfile || null}
      userProfileLoading={profileState.status === "loading"}
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
