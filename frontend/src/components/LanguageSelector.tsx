'use client';

import React, { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Chip,
} from '@mui/material';
import { Language as LanguageIcon, ExpandMore } from '@mui/icons-material';
import { useLanguage } from '../contexts/LanguageContext';

const languages = [
  {
    code: 'en',
    name: 'English',
    flag: 'ENG',
  },
  {
    code: 'es',
    name: 'Español',
    flag: 'ES',
  },
  {
    code: 'it',
    name: 'Italiano',
    flag: 'ITA',
  },
  {
    code: 'pt',
    name: 'Português',
    flag: 'POR',
  },
];

export default function LanguageSelector() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { locale, setLocale } = useLanguage();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (languageCode: string) => {
    setLocale(languageCode);
    handleClose();
  };

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  return (
    <Box>
      <Chip
        label={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography sx={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'white' }}>
              {currentLanguage.flag}
            </Typography>
            <ExpandMore sx={{ fontSize: '1rem', color: 'white' }} />
          </Box>
        }
        onClick={handleClick}
        sx={{
          backgroundColor: '#6B7280',
          border: '1px solid #9CA3AF',
          color: 'white',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: '#4B5563',
          },
          '& .MuiChip-label': {
            px: 1,
            py: 0.5,
          }
        }}
        aria-label="Select language"
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 160,
            '& .MuiMenuItem-root': {
              px: 2,
              py: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {languages.map((language) => (
          <MenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            selected={language.code === locale}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'rgba(25, 118, 210, 0.08)',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.12)',
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Typography sx={{ fontSize: '0.75rem', fontWeight: 'bold', minWidth: '28px' }}>
                {language.flag}
              </Typography>
            </ListItemIcon>
            <ListItemText
              primary={language.name}
              primaryTypographyProps={{
                variant: 'body2',
                fontWeight: language.code === locale ? 600 : 400,
              }}
            />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
} 