// src/components/LoginForm.tsx
import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Paper, Fade } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import axios from 'axios';

interface LoginFormProps {
  onLoginSuccess: (token: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Adjust the URL to match your backend endpoint
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });
      const { token } = response.data;
      if (token) {
        onLoginSuccess(token);
      } else {
        setError('Login failed: no token returned');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Use an inventory-themed background image; replace the URL with your actual image
        backgroundImage: 'url(https://via.placeholder.com/1920x1080?text=Inventory+Warehouse)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Fade in timeout={600}>
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 2,
            width: '100%',
            maxWidth: 400,
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // semi-transparent white for a modern look
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
            <InventoryIcon sx={{ fontSize: 48, color: 'primary.main' }} />
            <Typography variant="h4" align="center" color="text.primary" gutterBottom>
              Inventory Login
            </Typography>
          </Box>
          {error && (
            <Typography variant="body1" align="center" color="error" gutterBottom>
              {error}
            </Typography>
          )}
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
};

export default LoginForm;
