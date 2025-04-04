import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Paper, Fade } from '@mui/material';
import axios from 'axios';
import FeedbackAnimation from './FeedbackAnimation';

interface LoginFormProps {
  onLoginSuccess: (token: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState<'initial' | 'loading' | 'success' | 'failure'>('initial');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setStatus('loading');
    try {
      // Ajusta la URL a tu endpoint de autenticación
      const response = await axios.post('http://localhost:3000/auth/login', { email, password });
      const { token } = response.data;
      if (token) {
        setStatus('success');
        await new Promise((resolve) => setTimeout(resolve, 500));
        onLoginSuccess(token);
      } else {
        setError('Error: no se recibió token.');
        setStatus('failure');
        await new Promise((resolve) => setTimeout(resolve, 500));
        setStatus('initial');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
      setStatus('failure');
      await new Promise((resolve) => setTimeout(resolve, 500));
      setStatus('initial');
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
        backgroundColor: '#f5f5f5',
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
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
            <FeedbackAnimation status={status} />
            <Typography variant="h5" align="center" color="text.primary" gutterBottom sx={{ mt: 2 }}>
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
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Iniciando...' : 'Iniciar Sesión'}
            </Button>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
};

export default LoginForm;
