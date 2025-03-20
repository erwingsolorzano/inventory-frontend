// src/App.tsx
import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Typography, Button, Box } from '@mui/material';

const theme = createTheme({
  palette: {
    background: {
      default: '#f5f5f5',  // Global background
    },
    primary: {
      main: '#3498db',     // Primary color (buttons, highlights)
    },
    secondary: {
      main: '#2ecc71',     // Accent color (optional)
    },
    text: {
      primary: '#2c3e50',  // Text & labels
    },
  },
});

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const handleLoginSuccess = (receivedToken: string) => {
    localStorage.setItem('token', receivedToken);
    setToken(receivedToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!token ? (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      ) : (
        <Container sx={{ mt: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Welcome!
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            You are logged in. Your token: {token}
          </Typography>
          <Box display="flex" justifyContent="center">
            <Button variant="contained" color="primary" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Container>
      )}
    </ThemeProvider>
  );
}

export default App;
