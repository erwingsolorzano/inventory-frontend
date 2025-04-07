// src/pages/Dashboard.tsx
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import DashboardNavbar from '../components/DashboardNavbar';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  return (
    <>
      <DashboardNavbar />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          ¡Bienvenido al Dashboard de Inventario!
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Has iniciado sesión exitosamente.
        </Typography>
        <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={onLogout}>
            Cerrar Sesión
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Dashboard;
