// src/components/LoginForm.tsx
import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Paper, Fade } from '@mui/material';
import axios from 'axios';
import ShapeAnimation from './ShapeAnimation';

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
      // Ajusta la URL de tu endpoint de login
      const response = await axios.post('http://localhost:3000/auth/login', { email, password });
      const { token } = response.data;
      if (token) {
        // Espera 2 segundos para que se vea la animación
        await new Promise((resolve) => setTimeout(resolve, 2000));
        onLoginSuccess(token);
      } else {
        setError('Error: no se recibió token.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
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
            {/* Se muestra la animación: por defecto se ve el cuadrado, y cuando loading=true se transforma en círculo rotatorio */}
            <ShapeAnimation loading={loading} />
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
              disabled={loading}
            >
              {loading ? 'Iniciando...' : 'Iniciar Sesión'}
            </Button>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
};

export default LoginForm;
