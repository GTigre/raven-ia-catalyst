'use client';

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Chip,
  Divider
} from '@mui/material';
import { Psychology, Send, Clear } from '@mui/icons-material';
import { stackAIService } from '../services/stackAI';

interface StackAIDemoProps {
  userId?: string;
}

export default function StackAIDemo({ userId = 'demo-user' }: StackAIDemoProps) {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await stackAIService.generateUXCopy(prompt, userId);
      setResponse(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setPrompt('');
    setResponse(null);
    setError(null);
  };

  const handleExamplePrompt = (examplePrompt: string) => {
    setPrompt(examplePrompt);
  };

  const examplePrompts = [
    'Give me a better copy for "Buy Now"',
    'Improve this CTA: "Sign Up Today"',
    'Create engaging copy for a SaaS landing page',
    'Generate UX copy for a checkout button',
    'Improve this headline: "Welcome to our website"'
  ];

  return (
    <Card sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Psychology sx={{ mr: 2, color: 'primary.main' }} />
          <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
            Stack AI UX Copy Generator
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Test the Stack AI integration by generating improved UX copy
        </Typography>

        {/* Example Prompts */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
            Try these examples:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {examplePrompts.map((example, index) => (
              <Chip
                key={index}
                label={example}
                variant="outlined"
                size="small"
                onClick={() => handleExamplePrompt(example)}
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Input Section */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Enter your prompt"
            placeholder="Example: Give me a better copy for 'Sign Up'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading || !prompt.trim()}
              startIcon={loading ? <CircularProgress size={20} /> : <Send />}
              sx={{ flex: 1 }}
            >
              {loading ? 'Generating...' : 'Generate Copy'}
            </Button>
            
            <Button
              variant="outlined"
              onClick={handleClear}
              startIcon={<Clear />}
              disabled={loading}
            >
              Clear
            </Button>
          </Box>
        </Box>

        {/* Error Display */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>Error:</strong> {error}
            </Typography>
          </Alert>
        )}

        {/* Response Display */}
        {response && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Generated Copy:
            </Typography>
            
            {/* Formatted Response */}
            {response.outputs && response.outputs['out-0'] && (
              <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                    {response.outputs['out-0']}
                  </Typography>
                </CardContent>
              </Card>
            )}

            {/* Raw Response (collapsible) */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
                Raw API Response:
              </Typography>
              <Card variant="outlined" sx={{ bgcolor: 'grey.50' }}>
                <CardContent>
                  <pre style={{ 
                    whiteSpace: 'pre-wrap', 
                    wordBreak: 'break-word',
                    fontFamily: 'monospace',
                    fontSize: '0.75rem',
                    margin: 0,
                    color: '#666'
                  }}>
                    {JSON.stringify(response, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            </Box>
          </Box>
        )}

        {/* API Info */}
        <Box sx={{ mt: 4, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="caption" color="text.secondary">
            <strong>API Endpoint:</strong> Stack AI Inference API<br />
            <strong>User ID:</strong> {userId}<br />
            <strong>Status:</strong> Connected
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
} 