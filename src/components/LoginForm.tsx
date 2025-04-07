import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Paper, Fade, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import FeedbackAnimation from './FeedbackAnimation';

interface LoginFormProps {
  onLoginSuccess: (token: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'initial' | 'loading' | 'success' | 'failure'>('initial');

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'error' | 'success'>('error');

  const validateEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!validateEmail(email)) {
      setSnackbarMessage('Ingresa un email válido.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
  
    setStatus('loading');
  
    try {
      const response = await axios.post('http://localhost:3000/auth/login', { email, password });
      const { token } = response.data;
  
      if (token) {
        setStatus('success');
        await new Promise((resolve) => setTimeout(resolve, 500));
        onLoginSuccess(token);
      } else {
        throw new Error('No se recibió token.');
      }
    } catch (err: any) {
      setSnackbarMessage(err.response?.data?.message || err.message || 'Error al iniciar sesión.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      setStatus('failure');
      setTimeout(() => setStatus('initial'), 500);
    }
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-background)',
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
            backgroundColor: 'var(--color-accent)',
            color: 'var(--color-primary)',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
            <FeedbackAnimation status={status} />
            <Typography variant="h5" align="center" gutterBottom sx={{ mt: 2 }}>
              Inventory Login
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              type="email"
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
              fullWidth
              sx={{
                mt: 2,
                bgcolor: 'var(--color-secondary)',
                color: '#fff',
                '&:hover': {
                  bgcolor: 'var(--color-primary)',
                },
              }}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Iniciando...' : 'Iniciar Sesión'}
            </Button>
          </Box>
        </Paper>
      </Fade>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity={snackbarSeverity}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LoginForm;
