import { Password, Person } from "@mui/icons-material";
import { Box, Button, InputAdornment, Link, Paper, Stack, TextField, Typography } from "@mui/material";
import { createLazyFileRoute, Link as ReactRouterLink } from "@tanstack/react-router";
import { useState } from "react";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ username: false, password: false });

  const handleCreateAccount = () => {
    setError({ username: !username, password: !password });
  };
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('/login.jpg')",
        backgroundSize: "cover",
      }}
    >
      <Paper elevation={12} sx={{ padding: 2, borderRadius: 2 }}>
        <Typography variant="h4" mb={2}>
          Welcome to FitTrackr!
        </Typography>
        <Stack direction="column" spacing={2}>
          <TextField
            color="secondary"
            label="Username"
            type="text"
            variant="outlined"
            sx={{ my: 1 }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={error.username}
            helperText={error.username ? "Username is required" : ""}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            color="secondary"
            label="Password"
            type="password"
            variant="outlined"
            sx={{ my: 1 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error.password}
            helperText={error.password ? "Password is required" : ""}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Password />
                </InputAdornment>
              ),
            }}
          />
          <Link component={ReactRouterLink} to="/login" color="info.main">
            Already have an account? Log in here
          </Link>
          <Button variant="contained" size="large" sx={{ my: 1 }} onClick={handleCreateAccount}>
            Create account
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

export const Route = createLazyFileRoute("/signup")({
  component: Signup,
});
