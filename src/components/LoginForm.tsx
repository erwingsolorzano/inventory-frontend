// src/components/LoginForm.tsx
import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Paper, Fade } from '@mui/material';
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
        backgroundColor: 'background.default'
      }}
    >
      <Fade in timeout={500}>
        <Paper 
          elevation={3} 
          sx={{
            padding: 4, 
            borderRadius: 2, 
            width: '100%', 
            backgroundColor: '#ffffff'
          }}
        >
          <Typography variant="h4" align="center" color="text.primary" gutterBottom>
            Login
          </Typography>
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
