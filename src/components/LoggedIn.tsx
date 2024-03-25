import {
  Avatar,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import firebase from "firebase/compat/app";
import { UserProfile } from "../main";

export default function LoggedIn({
  user,
  signOut,
  signOutLoading,
  userProfile,
  setGender,
}: {
  user: firebase.User;
  signOut: () => void;
  signOutLoading: boolean;
  userProfile: UserProfile | null;
  setGender: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
      <Divider sx={{ my: 1 }} />
      <Typography variant="h5" textAlign={"center"}>
        User Profile
      </Typography>
      <FormControl>
        <FormLabel>Gender</FormLabel>
        <RadioGroup value={userProfile?.gender} onChange={setGender}>
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
        </RadioGroup>
      </FormControl>
      <Divider sx={{ my: 1 }} />
      <Typography variant="body2" mb={1} textAlign="center">
        You are logged in as <b>{email}</b>.
      </Typography>
      <Button variant="contained" color="error" onClick={signOut} disabled={signOutLoading}>
        {signOutLoading ? "Signing out..." : "Sign out"}
      </Button>
    </>
  );
}
