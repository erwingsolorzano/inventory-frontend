import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const DashboardNavbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProductsClick = () => {
    // Redirige a la ruta donde se listan los productos
    navigate('/productos');
    setMobileOpen(false);
  };

  const drawer = (
    <div>
        {/* <ListItem button onClick={handleProductsClick}> */}
      <List>
        <ListItem component="button">
          <ListItemText primary="Productos" />
        </ListItem>
        {/* Puedes agregar más elementos de menú aquí */}
      </List>
    </div>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {/* Botón de menú (solo se muestra en pantallas xs) */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          {/* Botón "Productos" para pantallas medianas en adelante */}
          <Button
            color="inherit"
            onClick={handleProductsClick}
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Productos
          </Button>
        </Toolbar>
      </AppBar>
      {/* Drawer para móviles */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Mejora el rendimiento en dispositivos móviles
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default DashboardNavbar;
