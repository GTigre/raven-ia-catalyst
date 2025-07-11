'use client';

import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Avatar, 
  CircularProgress,
  Divider,
  Card,
  CardContent,
  Alert
} from '@mui/material';
import { 
  Psychology, 
  Login as LoginIcon, 
  Person,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../contexts/LanguageContext';
import Header from '../../components/Header';

export default function LoginPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const demoUsers = [
    {
      name: t('demoUsers.superAdmin'),
      email: 'admin@raven.com',
      password: 'admin123',
      role: t('demoUsers.administrator'),
      color: '#1F2937'
    },
    {
      name: t('demoUsers.demoUser'),
      email: 'demo@raven.com',
      password: 'demo123',
      role: t('demoUsers.user'),
      color: '#6B7280'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate authentication
    setTimeout(() => {
      const user = demoUsers.find(u => u.email === email && u.password === password);
      
      if (user) {
        // Save user to localStorage
        localStorage.setItem('user', JSON.stringify(user));
        router.push('/dashboard');
      } else {
        setError('Invalid credentials. Please use the available demo users.');
      }
      setLoading(false);
    }, 1500);
  };

  const handleDemoLogin = (user: typeof demoUsers[0]) => {
    setEmail(user.email);
    setPassword(user.password);
    setError('');
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: 'background.default'
    }}>
      {/* Header */}
      <Header showAuthButtons={false} showDashboardButton={false} />
      
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'center' }}>
          {/* Login Form */}
          <Box sx={{ flex: 1, width: '100%' }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4, 
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                <Box
                  component="img"
                  src="/raven-logo.png"
                  alt="Raven Logo"
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    mb: 2,
                    borderRadius: '8px',
                    objectFit: 'contain'
                  }}
                />
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                  {t('login.title')}
                </Typography>
                <Typography variant="body1" color="text.secondary" align="center">
                  {t('login.subtitle')}
                </Typography>
              </Box>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label={t('login.email')}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  sx={{ mb: 3 }}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label={t('login.password')}
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  sx={{ mb: 3 }}
                  variant="outlined"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{ 
                    py: 1.5, 
                    mb: 2,
                    borderRadius: 2,
                    fontWeight: 500
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    <>
                      <LoginIcon sx={{ mr: 1 }} />
                      {t('login.loginButton')}
                    </>
                  )}
                </Button>
              </form>
            </Paper>
          </Box>

          {/* Demo Users */}
          <Box sx={{ flex: 1, width: '100%' }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ 
              fontWeight: 'bold', 
              color: 'text.primary',
              textAlign: 'center',
              mb: 3
            }}>
              {t('demoUsers.title')}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
              Use these credentials to test the platform
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {demoUsers.map((user, index) => (
                <Card 
                  key={index}
                  sx={{ 
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': { 
                      transform: 'translateY(-2px)',
                      boxShadow: 2
                    }
                  }}
                  onClick={() => handleDemoLogin(user)}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: user.color, mr: 2 }}>
                        <Person />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                          {user.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {user.role}
                        </Typography>
                      </Box>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Email:</strong> {user.email}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Password:</strong> {user.password}
                      </Typography>
                    </Box>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ mt: 2, borderRadius: 1 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDemoLogin(user);
                      }}
                    >
                      Use these credentials
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
} 