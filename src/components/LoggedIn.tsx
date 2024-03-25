import { Button, Typography } from "@mui/material";
import firebase from "firebase/compat/app";

export default function LoggedIn() {
  return (
    <>
      <Typography variant="h6" mb={2} textAlign="center">
        Hi, {firebase.auth().currentUser!.displayName || "there"}!
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          firebase.auth().signOut();
        }}
      >
        Logout
      </Button>
    </>
  );
}
