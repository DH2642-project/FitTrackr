import { Avatar, Button, Stack, Typography } from "@mui/material";
import firebase from "firebase/compat/app";

export default function LoggedIn({
  user,
  signOut,
  signOutLoading,
}: {
  user: firebase.User;
  signOut: () => void;
  signOutLoading: boolean;
}) {
  const displayName = user.displayName;
  const email = user.email;
  const photoURL = user.photoURL;

  return (
    <>
      <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
        <Typography variant="h6" mb={2} textAlign="center">
          Hi, {displayName || "there"}!
        </Typography>
        {photoURL && <Avatar alt={"Profile Picture"} src={photoURL} />}
      </Stack>
      <Typography variant="body2" mb={2} textAlign="center">
        You are logged in as <b>{email}</b>.
      </Typography>
      <Button variant="contained" color="error" onClick={signOut} disabled={signOutLoading}>
        {signOutLoading ? "Signing out..." : "Sign out"}
      </Button>
    </>
  );
}
