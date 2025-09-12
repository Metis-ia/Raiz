import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import AdminLayout from '../admin/AdminLayout';

// Imports dos componentes de RH
import TrainingDashboard from './rh/TrainingDashboard';
import ControlePonto from './rh/ControlePonto';
import Colaboradores from './rh/Colaboradores';
import PerfilColaborador from './rh/PerfilColaborador';
import DetalhesPonto from './rh/DetalhesPonto';

const HumanResources = () => {
  return (
    <AdminLayout>
      <Box className="p-4">
        <Typography variant="h4" className="font-bold mb-4">Recursos Humanos</Typography>
        <Box className="flex space-x-4 mb-4">
          <Link to="/admin/rh/colaboradores" className="p-2 border rounded hover:bg-gray-200">Colaboradores</Link>
          <Link to="/admin/rh/ponto" className="p-2 border rounded hover:bg-gray-200">Controle de Ponto</Link>
          <Link to="/admin/rh/treinamento" className="p-2 border rounded hover:bg-gray-200">Treinamento</Link>
        </Box>
        <Outlet />
      </Box>
    </AdminLayout>
  );
};

export default HumanResources;