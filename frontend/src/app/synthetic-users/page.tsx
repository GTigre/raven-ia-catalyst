'use client';

import React from 'react';
import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';
import { useLanguage } from '../../contexts/LanguageContext';
import SyntheticUserGenerator from '../components/SyntheticUserGenerator';

export default function SyntheticUsersPage() {
  const { t } = useLanguage();
  
  return (
    <Box sx={{ p: 3 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs separator={<NavigateNext fontSize="small" />} sx={{ mb: 3 }}>
        <Link color="inherit" href="/dashboard" underline="hover">
          {t('dashboard.title')}
        </Link>
        <Typography color="text.primary">{t('syntheticUsers.title')}</Typography>
      </Breadcrumbs>

      {/* Main Content */}
      <SyntheticUserGenerator />
    </Box>
  );
} 