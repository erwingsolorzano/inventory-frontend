// src/pages/Dashboard.tsx
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to the Inventory Dashboard!
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        You are logged in.
      </Typography>
      <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" onClick={onLogout}>
          Sign Out
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard;
