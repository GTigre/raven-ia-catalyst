'use client';

import React from 'react';
import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';
import SyntheticUserGenerator from '../components/SyntheticUserGenerator';

export default function SyntheticUsersPage() {
  return (
    <Box sx={{ p: 3 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs separator={<NavigateNext fontSize="small" />} sx={{ mb: 3 }}>
        <Link color="inherit" href="/dashboard" underline="hover">
          Dashboard
        </Link>
        <Typography color="text.primary">Usuarios Sintéticos</Typography>
      </Breadcrumbs>

      {/* Main Content */}
      <SyntheticUserGenerator />
    </Box>
  );
} 