'use client';

import React, { useState, useEffect } from 'react';
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
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Divider
} from '@mui/material';
import { 
  Psychology, 
  Build, 
  Edit, 
  Compare, 
  Dashboard as DashboardIcon, 
  Analytics,
  PersonSearch,
  Business,
  Create,
  Logout,
  Person,
  Star,
  CheckCircle,
  Menu as MenuIcon,
  Home,
  Settings,
  Help,
  Notifications,
  TrendingUp,
  Group,
  Assignment
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [user, setUser] = useState<any>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const modules = [
    {
      title: 'Generador de Usuarios Sintéticos',
      description: 'Crea perfiles de usuarios realistas impulsados por IA',
      icon: <Psychology />,
      color: '#6B7280',
      stats: '12 usuarios creados',
      status: 'Activo',
      path: '/synthetic-users'
    },
    {
      title: 'Prompt Builder Studio',
      description: 'Visual editor for reusable prompts',
      icon: <Build />,
      color: '#4B5563',
      stats: '8 prompts saved',
      status: 'Active',
      path: '/prompts'
    },
    {
      title: 'UX Copywriting Assistant',
      description: 'AI-powered chatbot for creating and improving UX copy',
      icon: <Edit />,
      color: '#374151',
      stats: '24 texts generated',
      status: 'Active',
      path: '/ux-copywriting'
    },
    {
      title: 'AI vs Real Comparator',
      description: 'Compare synthetic vs real feedback',
      icon: <Compare />,
      color: '#1F2937',
      stats: '3 comparisons',
      status: 'Active',
      path: '/comparator'
    },
    {
      title: 'Project Management',
      description: 'Organize your experiments',
      icon: <Assignment />,
      color: '#6B7280',
      stats: '5 active projects',
      status: 'Active',
      path: '/projects'
    },
    {
      title: 'Analytics Dashboard',
      description: 'Visualize metrics and KPIs',
      icon: <Analytics />,
      color: '#4B5563',
      stats: '15 metrics',
      status: 'Active',
      path: '/analytics'
    }
  ];

  const quickStats = [
    {
      title: 'Active Experiments',
      value: '12',
      icon: <TrendingUp />,
      color: '#059669',
      trend: '+15%'
    },
    {
      title: 'Synthetic Users',
      value: '48',
      icon: <Group />,
      color: '#0284C7',
      trend: '+23%'
    },
    {
      title: 'Prompts Created',
      value: '32',
      icon: <Create />,
      color: '#7C3AED',
      trend: '+8%'
    },
    {
      title: 'Validations',
      value: '156',
      icon: <CheckCircle />,
      color: '#DC2626',
      trend: '+42%'
    }
  ];

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Projects', icon: <Assignment />, path: '/projects' },
    { text: 'Synthetic Users', icon: <PersonSearch />, path: '/synthetic-users' },
    { text: 'Prompts', icon: <Build />, path: '/prompts' },
    { text: 'Analytics', icon: <Analytics />, path: '/analytics' },
    { text: 'Settings', icon: <Settings />, path: '/settings' },
    { text: 'Help', icon: <Help />, path: '/help' }
  ];

  if (!user) {
    return null;
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <AppBar position="static" elevation={0}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
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
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton color="inherit">
              <Notifications />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleMenuOpen}>
              <Avatar sx={{ bgcolor: user.color, mr: 1 }}>
                <Person />
              </Avatar>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                  {user.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {user.role}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'text.primary' }}>
            Menu
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List>
            {menuItems.map((item, index) => (
              <ListItem key={index} sx={{ cursor: 'pointer' }} onClick={() => setDrawerOpen(false)}>
                <ListItemIcon sx={{ color: 'text.secondary' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* User Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{ mt: 1 }}
      >
        <MenuItem onClick={handleMenuClose}>
          <Person sx={{ mr: 2 }} />
          Profile
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Settings sx={{ mr: 2 }} />
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <Logout sx={{ mr: 2 }} />
          Sign Out
        </MenuItem>
      </Menu>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Welcome Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
            Welcome, {user.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            IA Catalyst Control Panel
          </Typography>
        </Box>

        {/* Quick Stats */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary', mb: 3 }}>
            Quick Overview
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {quickStats.map((stat, index) => (
              <Box key={index} sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(25% - 12px)' } }}>
                <Card sx={{ 
                  borderRadius: 2,
                  transition: 'all 0.2s ease',
                  '&:hover': { 
                    transform: 'translateY(-2px)',
                    boxShadow: 2
                  }
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Avatar sx={{ bgcolor: stat.color, width: 48, height: 48 }}>
                        {stat.icon}
                      </Avatar>
                      <Chip 
                        label={stat.trend} 
                        color="success" 
                        size="small" 
                        sx={{ fontWeight: 500 }}
                      />
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Modules Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary', mb: 3 }}>
            Available Modules
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            {modules.map((module, index) => (
              <Box key={index} sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(33.333% - 16px)' } }}>
                <Card sx={{ 
                  height: '100%',
                  borderRadius: 2,
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  '&:hover': { 
                    transform: 'translateY(-4px)',
                    boxShadow: 3
                  }
                }}
                onClick={() => module.path && router.push(module.path)}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: module.color, mr: 2 }}>
                        {module.icon}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                          {module.title}
                        </Typography>
                        <Chip 
                          label={module.status} 
                          color="primary" 
                          size="small" 
                          sx={{ fontWeight: 500 }}
                        />
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {module.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" color="text.secondary">
                        {module.stats}
                      </Typography>
                      <Button 
                        variant="outlined" 
                        size="small"
                        sx={{ borderRadius: 1 }}
                      >
                        Open
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Recent Activity */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary', mb: 3 }}>
            Recent Activity
          </Typography>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#059669', width: 32, height: 32 }}>
                  <CheckCircle fontSize="small" />
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary' }}>
                    New synthetic user created
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    2 hours ago
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#0284C7', width: 32, height: 32 }}>
                  <Build fontSize="small" />
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary' }}>
                    Prompt updated in "E-commerce UX" project
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    5 hours ago
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#7C3AED', width: 32, height: 32 }}>
                  <Analytics fontSize="small" />
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary' }}>
                    Validation report completed
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    1 day ago
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
} 