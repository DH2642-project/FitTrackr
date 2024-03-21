import { Password, Person } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/login")({
  component: () => (
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
          Welcome!
        </Typography>
        <Stack direction="column" spacing={2}>
          <TextField
            color="secondary"
            label="Username"
            type="text"
            variant="outlined"
            sx={{ my: 1 }}
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Password />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" size="large" sx={{ my: 1 }}>
            Login
          </Button>
        </Stack>
      </Paper>
    </Box>
  ),
});
