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
  ListItemIcon
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
  CheckCircle
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  const handleSignUp = () => {
    router.push('/login');
  };

  const modules = [
    {
      title: 'Synthetic User Generator',
      description: 'Create realistic user profiles with AI to validate digital experiences.',
      icon: <PersonSearch />,
      color: '#6B7280'
    },
    {
      title: 'Prompt Builder Studio',
      description: 'Visual editor to create and manage reusable prompts by industry.',
      icon: <Build />,
      color: '#4B5563'
    },
    {
      title: 'AI UX Writer',
      description: 'Generate consistent UX texts adapted to your brand voice.',
      icon: <Edit />,
      color: '#374151'
    },
    {
      title: 'AI vs Real Comparator',
      description: 'Compare synthetic user feedback with real data to validate hypotheses.',
      icon: <Compare />,
      color: '#1F2937'
    },
    {
      title: 'Project Management',
      description: 'Organize experiments, results and collaborate with your team in real time.',
      icon: <Dashboard />,
      color: '#6B7280'
    },
    {
      title: 'Analytics Dashboard',
      description: 'Visualize KPIs, validation metrics and insights from your experiments.',
      icon: <Analytics />,
      color: '#4B5563'
    }
  ];

  const userProfiles = [
    {
      role: 'UX Researcher',
      description: 'Validate hypotheses quickly with synthetic users and real data.',
      icon: <Psychology />,
      color: '#6B7280'
    },
    {
      role: 'Product Manager',
      description: 'Make data-driven decisions and justify changes with metrics.',
      icon: <Business />,
      color: '#4B5563'
    },
    {
      role: 'UX Writer',
      description: 'Accelerate the creation of consistent and effective UX content.',
      icon: <Create />,
      color: '#374151'
    }
  ];

  const demoUsers = [
    {
      name: 'Super Admin',
      email: 'admin@raven.com',
      password: 'admin123',
      role: 'Administrator',
      color: '#1F2937'
    },
    {
      name: 'Demo User',
      email: 'demo@raven.com',
      password: 'demo123',
      role: 'User',
      color: '#6B7280'
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Box
              component="img"
              src="/raven-logo.png"
              alt="IA Catalyst Logo"
              sx={{ 
                width: 60, 
                height: 60, 
                mr: 2,
                borderRadius: '50%',
                objectFit: 'contain'
              }}
            />
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
              IA Catalyst
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              variant="outlined" 
              startIcon={<Login />}
              onClick={handleLogin}
              sx={{ borderRadius: 2 }}
            >
              Login
            </Button>
            <Button 
              variant="contained" 
              startIcon={<Person />}
              onClick={handleSignUp}
              sx={{ borderRadius: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

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
            Disrupt with intelligence, scale with purpose.
          </Typography>
          <Typography 
            variant="h5" 
            color="text.secondary" 
            sx={{ mb: 4, maxWidth: '800px', mx: 'auto', fontWeight: 400 }}
          >
            SaaS platform that enables design, product and customer experience teams 
            to apply artificial intelligence to validate, create and improve digital experiences.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              size="large" 
              startIcon={<Star />}
              onClick={handleSignUp}
              sx={{ borderRadius: 3, px: 4, py: 1.5 }}
            >
              Get Started Free
            </Button>
            <Button 
              variant="outlined" 
              size="large" 
              startIcon={<Login />}
              onClick={handleLogin}
              sx={{ borderRadius: 3, px: 4, py: 1.5 }}
            >
              View Demo
            </Button>
          </Box>
        </Box>

        {/* Modules Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 4, fontWeight: 'bold', color: 'text.primary' }}>
            MVP Modules
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            {modules.map((module, index) => (
              <Box key={index} sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(33.333% - 16px)' } }}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    transition: 'all 0.2s ease',
                    '&:hover': { 
                      transform: 'translateY(-4px)',
                      boxShadow: 3
                    },
                    borderRadius: 2
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: module.color, mr: 2 }}>
                        {module.icon}
                      </Avatar>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                        {module.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {module.description}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Chip 
                        icon={<CheckCircle />} 
                        label="Active" 
                        color="primary" 
                        size="small" 
                        sx={{ fontWeight: 500 }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>

        {/* User Profiles Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 4, fontWeight: 'bold', color: 'text.primary' }}>
            User Profiles
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            {userProfiles.map((profile, index) => (
              <Box key={index} sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(33.333% - 16px)' } }}>
                <Paper 
                  sx={{ 
                    p: 3, 
                    textAlign: 'center',
                    transition: 'all 0.2s ease',
                    '&:hover': { 
                      transform: 'translateY(-2px)',
                      boxShadow: 2
                    },
                    borderRadius: 2
                  }}
                >
                  <Avatar sx={{ bgcolor: profile.color, mx: 'auto', mb: 2, width: 56, height: 56 }}>
                    {profile.icon}
                  </Avatar>
                  <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                    {profile.role}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {profile.description}
                  </Typography>
                </Paper>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Demo Users Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 4, fontWeight: 'bold', color: 'text.primary' }}>
            Demo Users
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
            {demoUsers.map((user, index) => (
              <Box key={index} sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(33.333% - 16px)' }, maxWidth: '400px' }}>
                <Card 
                  sx={{ 
                    borderRadius: 2,
                    transition: 'all 0.2s ease',
                    '&:hover': { 
                      transform: 'translateY(-2px)',
                      boxShadow: 2
                    }
                  }}
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
                        <Chip label={user.role} size="small" color="secondary" />
                      </Box>
                    </Box>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <Person fontSize="small" sx={{ color: 'text.secondary' }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={user.email} 
                          primaryTypographyProps={{ color: 'text.primary' }}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>🔑</Typography>
                        </ListItemIcon>
                        <ListItemText 
                          primary={user.password} 
                          primaryTypographyProps={{ color: 'text.primary' }}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: 'grey.100', py: 4, mt: 8, borderTop: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            IA Catalyst - Powered by Next.js 15 + React 19 + Material-UI + NestJS + PostgreSQL
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
