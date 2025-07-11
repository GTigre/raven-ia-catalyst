'use client';

import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Box, 
  Card, 
  CardContent, 
  Avatar, 
  Chip,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton
} from '@mui/material';
import { 
  Psychology, 
  Build, 
  Edit, 
  Compare, 
  Dashboard, 
  Analytics,
  PersonSearch,
  Business,
  Create,
  Login,
  Person,
  Star,
  CheckCircle,
  Notifications
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../contexts/LanguageContext';
import Header from '../components/Header';

export default function LandingPage() {
  const router = useRouter();
  const { t } = useLanguage();

  const handleLogin = () => {
    router.push('/login');
  };

  const handleSignUp = () => {
    router.push('/login');
  };

  const handleModuleClick = (module: any) => {
    if (module.isActive && module.route) {
      router.push(module.route);
    }
  };

  const modules = [
    // Módulos funcionales (al principio)
    {
      title: t('modules.syntheticUsers.title'),
      description: t('modules.syntheticUsers.description'),
      icon: <PersonSearch />,
      color: '#6B7280',
      isActive: true,
      route: '/synthetic-users'
    },
    {
      title: t('modules.uxWriter.title'),
      description: t('modules.uxWriter.description'),
      icon: <Edit />,
      color: '#374151',
      isActive: true,
      route: '/ux-copywriting'
    },
    // Módulos en desarrollo (después, en gris)
    {
      title: t('modules.promptBuilder.title'),
      description: t('modules.promptBuilder.description'),
      icon: <Build />,
      color: '#9CA3AF',
      isActive: false,
      route: null
    },
    {
      title: t('modules.comparator.title'),
      description: t('modules.comparator.description'),
      icon: <Compare />,
      color: '#9CA3AF',
      isActive: false,
      route: null
    },
    {
      title: t('modules.projectManagement.title'),
      description: t('modules.projectManagement.description'),
      icon: <Dashboard />,
      color: '#9CA3AF',
      isActive: false,
      route: null
    },
    {
      title: t('modules.analytics.title'),
      description: t('modules.analytics.description'),
      icon: <Analytics />,
      color: '#9CA3AF',
      isActive: false,
      route: null
    }
  ];

  const userProfiles = [
    {
      role: t('userProfiles.uxResearcher.title'),
      description: t('userProfiles.uxResearcher.description'),
      icon: <Psychology />,
      color: '#6B7280'
    },
    {
      role: t('userProfiles.productManager.title'),
      description: t('userProfiles.productManager.description'),
      icon: <Business />,
      color: '#4B5563'
    },
    {
      role: t('userProfiles.uxWriter.title'),
      description: t('userProfiles.uxWriter.description'),
      icon: <Create />,
      color: '#374151'
    }
  ];

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

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <Header showAuthButtons={true} showDashboardButton={false} />

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              color: 'text.primary',
              mb: 3
            }}
          >
            {t('home.title')}
          </Typography>
          <Typography 
            variant="h5" 
            color="text.secondary" 
            sx={{ mb: 4, maxWidth: '800px', mx: 'auto', fontWeight: 400 }}
          >
            {t('home.subtitle')}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              size="large" 
              startIcon={<Star />}
              onClick={handleSignUp}
              sx={{ borderRadius: 3, px: 4, py: 1.5 }}
            >
              {t('home.getStarted')}
            </Button>
          </Box>
        </Box>

        {/* MVP Modules Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 4, fontWeight: 'bold' }}>
            {t('modules.title')}
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 3 }}>
            {modules.map((module, index) => (
              <Card 
                key={index} 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  cursor: module.isActive ? 'pointer' : 'default',
                  opacity: module.isActive ? 1 : 0.6,
                  transition: 'all 0.2s ease',
                  '&:hover': module.isActive ? {
                    transform: 'translateY(-4px)',
                    boxShadow: 3
                  } : {},
                  filter: module.isActive ? 'none' : 'grayscale(0.5)'
                }}
                onClick={() => handleModuleClick(module)}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ 
                      bgcolor: module.color, 
                      mr: 2,
                      opacity: module.isActive ? 1 : 0.7
                    }}>
                      {module.icon}
                    </Avatar>
                    <Box>
                      <Typography 
                        variant="h6" 
                        component="h3" 
                        gutterBottom
                        sx={{ 
                          color: module.isActive ? 'text.primary' : 'text.disabled'
                        }}
                      >
                        {module.title}
                      </Typography>
                      <Chip 
                        label={module.isActive ? t('modules.syntheticUsers.status') : t('modules.inDevelopment')} 
                        color={module.isActive ? "success" : "default"} 
                        size="small" 
                        icon={module.isActive ? <CheckCircle /> : undefined}
                        sx={{
                          opacity: module.isActive ? 1 : 0.6
                        }}
                      />
                    </Box>
                  </Box>
                  <Typography 
                    variant="body2" 
                    color={module.isActive ? "text.secondary" : "text.disabled"}
                  >
                    {module.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* User Profiles Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 4, fontWeight: 'bold' }}>
            {t('userProfiles.title')}
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3 }}>
            {userProfiles.map((profile, index) => (
              <Card key={index} sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: profile.color, mr: 2 }}>
                      {profile.icon}
                    </Avatar>
                    <Typography variant="h6" component="h3">
                      {profile.role}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {profile.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Demo Users Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 4, fontWeight: 'bold' }}>
            {t('demoUsers.title')}
          </Typography>
          <Paper sx={{ p: 3 }}>
            <List>
              {demoUsers.map((user, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: user.color }}>
                      <Person />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={user.name}
                    secondary={`${user.email} • ${user.password} • ${user.role}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: 'grey.100', py: 3 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            {t('footer.poweredBy')}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
