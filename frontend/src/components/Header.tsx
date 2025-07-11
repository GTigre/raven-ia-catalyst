'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import {
  Login,
  Person,
  Notifications,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

interface HeaderProps {
  showAuthButtons?: boolean;
  showDashboardButton?: boolean;
  title?: string;
}

export default function Header({ 
  showAuthButtons = true, 
  showDashboardButton = false,
  title = 'IA Catalyst'
}: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useLanguage();

  const handleLogin = () => {
    router.push('/login');
  };

  const handleSignUp = () => {
    router.push('/login');
  };

  const handleDashboard = () => {
    router.push('/dashboard');
  };

  const handleHome = () => {
    router.push('/');
  };

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Box
            component="img"
            src="/raven-logo.png"
            alt="IA Catalyst Logo"
            sx={{ 
              width: 40, 
              height: 40, 
              mr: 2,
              borderRadius: '50%',
              objectFit: 'contain',
              cursor: 'pointer'
            }}
            onClick={handleHome}
          />
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 'bold', 
              color: 'text.primary',
              cursor: 'pointer'
            }}
            onClick={handleHome}
          >
            {title}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {/* Notifications icon - always visible */}
          <IconButton
            size="medium"
            sx={{
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <Notifications />
          </IconButton>

          {/* Language selector - always visible */}
          <LanguageSelector />

          {/* Dashboard button - conditional */}
          {showDashboardButton && pathname !== '/dashboard' && (
            <Button 
              variant="outlined" 
              startIcon={<DashboardIcon />}
              onClick={handleDashboard}
              sx={{ borderRadius: 2, ml: 1 }}
            >
              {t('navigation.dashboard')}
            </Button>
          )}

          {/* Auth buttons - conditional */}
          {showAuthButtons && (
            <>
              <Button 
                variant="outlined" 
                startIcon={<Login />}
                onClick={handleLogin}
                sx={{ borderRadius: 2, ml: 1 }}
              >
                {t('navigation.login')}
              </Button>
              <Button 
                variant="contained" 
                startIcon={<Person />}
                onClick={handleSignUp}
                sx={{ borderRadius: 2 }}
              >
                {t('navigation.signup')}
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
} 