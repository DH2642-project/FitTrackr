import { Password, Person } from "@mui/icons-material";
import { Box, Button, Container, InputAdornment, TextField, Typography } from "@mui/material";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/login")({
  component: () => (
    <Container maxWidth="lg">
      <Box
        sx={{
          height: "90vh",
          width: 400,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" mb={1}>
          User login
        </Typography>
        <TextField
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
        <Button variant="contained" sx={{ my: 1 }}>
          Login
        </Button>
      </Box>
    </Container>
  ),
});
