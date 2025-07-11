'use client';

import React from 'react';
import { Container, Typography, Box, Breadcrumbs, Link } from '@mui/material';
import { Home, Psychology } from '@mui/icons-material';
import StackAIDemo from '../../components/StackAIDemo';

export default function StackAIDemoPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/dashboard"
        >
          <Home sx={{ mr: 0.5 }} fontSize="inherit" />
          Dashboard
        </Link>
        <Typography
          sx={{ display: 'flex', alignItems: 'center' }}
          color="text.primary"
        >
          <Psychology sx={{ mr: 0.5 }} fontSize="inherit" />
          Stack AI Demo
        </Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          Stack AI Integration Demo
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          Test the Stack AI API integration for UX copy generation and improvement
        </Typography>
      </Box>

      {/* Demo Component */}
      <StackAIDemo userId="demo-user-123" />

      {/* Additional Information */}
      <Box sx={{ mt: 6, p: 3, bgcolor: 'background.paper', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          Integration Details
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          This demo showcases the integration with Stack AI's inference API for UX copy generation. 
          The service can be used to improve existing copy, generate new content, and provide AI-powered 
          suggestions for better user experience.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Features:</strong>
        </Typography>
        <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
          <li>Real-time UX copy generation</li>
          <li>Copy improvement suggestions</li>
          <li>Context-aware responses</li>
          <li>Document-based input support</li>
          <li>User session tracking</li>
        </ul>
      </Box>
    </Container>
  );
} 