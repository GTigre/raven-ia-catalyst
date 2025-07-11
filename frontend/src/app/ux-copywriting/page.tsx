'use client';

import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Breadcrumbs, 
  Link,
  Card,
  CardContent,
  Chip,
  Alert,
  Paper
} from '@mui/material';
import { Home, Edit, Psychology, Lightbulb, TrendingUp } from '@mui/icons-material';
import UXCopywritingChat from '../../components/UXCopywritingChat';

export default function UXCopywritingPage() {
  const [generatedCopies, setGeneratedCopies] = useState<string[]>([]);

  const handleCopyGenerated = (copy: string) => {
    setGeneratedCopies(prev => [copy, ...prev.slice(0, 4)]); // Keep last 5 copies
  };

  const copywritingTips = [
    {
      title: "Be Clear and Concise",
      description: "Use simple language that users can understand quickly",
      icon: <Lightbulb />
    },
    {
      title: "Focus on Benefits",
      description: "Highlight what users gain, not just features",
      icon: <TrendingUp />
    },
    {
      title: "Create Urgency",
      description: "Use action-oriented language that motivates users",
      icon: <Psychology />
    }
  ];

  const commonCopyTypes = [
    { type: "Call-to-Action Buttons", examples: ["Get Started", "Learn More", "Try Free"] },
    { type: "Error Messages", examples: ["Something went wrong", "Please check your input"] },
    { type: "Empty States", examples: ["No items yet", "Start by adding content"] },
    { type: "Onboarding", examples: ["Welcome aboard!", "Let's get you set up"] },
    { type: "Success Messages", examples: ["Successfully saved", "Welcome back!"] }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
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
          <Edit sx={{ mr: 0.5 }} fontSize="inherit" />
          UX Copywriting Assistant
        </Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          UX Copywriting Assistant
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          AI-powered chatbot to help you create, improve, and optimize copy for better user experiences
        </Typography>
      </Box>

             <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', lg: 'row' } }}>
         {/* Main Chat Interface */}
         <Box sx={{ flex: 2 }}>
           <UXCopywritingChat 
             userId="ux-copywriter-123"
             onCopyGenerated={handleCopyGenerated}
           />
         </Box>

         {/* Sidebar with Tips and Recent Copies */}
         <Box sx={{ flex: 1 }}>
          {/* Recent Generated Copies */}
          {generatedCopies.length > 0 && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Recent Generated Copy
                </Typography>
                {generatedCopies.map((copy, index) => (
                  <Paper 
                    key={index}
                    elevation={0}
                    sx={{ 
                      p: 2, 
                      mb: 2, 
                      bgcolor: 'grey.50', 
                      borderRadius: 1,
                      border: '1px solid',
                      borderColor: 'divider'
                    }}
                  >
                    <Typography variant="body2" sx={{ 
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {copy}
                    </Typography>
                  </Paper>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Copywriting Tips */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                UX Copywriting Tips
              </Typography>
              {copywritingTips.map((tip, index) => (
                <Box key={index} sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                  <Box sx={{ mr: 2, color: 'primary.main', mt: 0.5 }}>
                    {tip.icon}
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                      {tip.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {tip.description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* Common Copy Types */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Common Copy Types
              </Typography>
              {commonCopyTypes.map((category, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {category.type}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {category.examples.map((example, exIndex) => (
                      <Chip 
                        key={exIndex}
                        label={example}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.7rem' }}
                      />
                    ))}
                  </Box>
                </Box>
              ))}
                         </CardContent>
           </Card>
         </Box>
       </Box>

      {/* Info Section */}
      <Box sx={{ mt: 6 }}>
        <Alert severity="info" sx={{ borderRadius: 2 }}>
          <Typography variant="body2">
            <strong>Pro Tip:</strong> Be specific in your requests. Instead of "improve this copy," 
            try "improve this CTA button for a SaaS signup page targeting small businesses."
          </Typography>
        </Alert>
      </Box>
    </Container>
  );
} 