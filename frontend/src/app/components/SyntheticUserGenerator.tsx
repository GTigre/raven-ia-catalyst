'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from '@mui/material';
import {
  Person,
  Add,
  Chat,
  Assessment,
  Delete,
  ExpandMore,
  Psychology,
  Insights,
  CloudUpload,
} from '@mui/icons-material';
import { syntheticUserService, SyntheticUserProfile, SyntheticUserResponse } from '../services/syntheticUserService';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function SyntheticUserGenerator() {
  const [activeTab, setActiveTab] = useState(0);
  const [profiles, setProfiles] = useState<SyntheticUserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Estado para generación de perfiles
  const [profilePrompt, setProfilePrompt] = useState('');
  const [generatedProfile, setGeneratedProfile] = useState<string | null>(null);
  
  // Estado para simulación de conversación
  const [selectedProfile, setSelectedProfile] = useState<string>('');
  const [scenario, setScenario] = useState('');
  const [conversationMessage, setConversationMessage] = useState('');
  const [conversationResponse, setConversationResponse] = useState<string | null>(null);
  
  // Estado para validación de experiencia
  const [experience, setExperience] = useState('');
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
  const [validationResults, setValidationResults] = useState<SyntheticUserResponse[]>([]);
  
  // Estado para comparación
  const [syntheticFeedback, setSyntheticFeedback] = useState<string[]>(['']);
  const [realFeedback, setRealFeedback] = useState<string[]>(['']);
  const [comparisonInsights, setComparisonInsights] = useState<string | null>(null);
  
  // Estado para documentos
  const [documentUrls, setDocumentUrls] = useState<string[]>(['']);

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = () => {
    const savedProfiles = syntheticUserService.getSavedProfiles();
    setProfiles(savedProfiles);
  };

  const handleGenerateProfile = async () => {
    if (!profilePrompt.trim()) {
      setError('Por favor ingresa una descripción para el perfil');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const documents = documentUrls.filter(url => url.trim() !== '');
      const response = await syntheticUserService.generateUserProfile(profilePrompt, documents);
      
      if (response.error) {
        setError(response.error);
      } else {
        setGeneratedProfile(response.output || 'Perfil generado exitosamente');
        setSuccess('Perfil generado exitosamente');
      }
    } catch (err) {
      setError('Error al generar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleSimulateConversation = async () => {
    if (!selectedProfile || !scenario || !conversationMessage) {
      setError('Por favor completa todos los campos para la simulación');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const documents = documentUrls.filter(url => url.trim() !== '');
      const response = await syntheticUserService.simulateConversation(
        selectedProfile,
        scenario,
        conversationMessage,
        documents
      );
      
      if (response.error) {
        setError(response.error);
      } else {
        setConversationResponse(response.output || 'Respuesta generada');
        setSuccess('Conversación simulada exitosamente');
      }
    } catch (err) {
      setError('Error al simular la conversación');
    } finally {
      setLoading(false);
    }
  };

  const handleValidateExperience = async () => {
    if (!experience || selectedProfiles.length === 0) {
      setError('Por favor describe la experiencia y selecciona al menos un perfil');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const documents = documentUrls.filter(url => url.trim() !== '');
      const responses = await syntheticUserService.validateUserExperience(
        experience,
        selectedProfiles,
        documents
      );
      
      setValidationResults(responses);
      setSuccess('Validación completada exitosamente');
    } catch (err) {
      setError('Error al validar la experiencia');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateInsights = async () => {
    const synthFeedback = syntheticFeedback.filter(fb => fb.trim() !== '');
    const realFeedbackFiltered = realFeedback.filter(fb => fb.trim() !== '');
    
    if (synthFeedback.length === 0 || realFeedbackFiltered.length === 0) {
      setError('Por favor ingresa feedback tanto sintético como real');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const documents = documentUrls.filter(url => url.trim() !== '');
      const response = await syntheticUserService.generateComparativeInsights(
        synthFeedback,
        realFeedbackFiltered,
        documents
      );
      
      if (response.error) {
        setError(response.error);
      } else {
        setComparisonInsights(response.output || 'Insights generados');
        setSuccess('Insights comparativos generados exitosamente');
      }
    } catch (err) {
      setError('Error al generar insights');
    } finally {
      setLoading(false);
    }
  };

  const addFeedbackField = (type: 'synthetic' | 'real') => {
    if (type === 'synthetic') {
      setSyntheticFeedback([...syntheticFeedback, '']);
    } else {
      setRealFeedback([...realFeedback, '']);
    }
  };

  const updateFeedback = (index: number, value: string, type: 'synthetic' | 'real') => {
    if (type === 'synthetic') {
      const updated = [...syntheticFeedback];
      updated[index] = value;
      setSyntheticFeedback(updated);
    } else {
      const updated = [...realFeedback];
      updated[index] = value;
      setRealFeedback(updated);
    }
  };

  const removeFeedbackField = (index: number, type: 'synthetic' | 'real') => {
    if (type === 'synthetic') {
      setSyntheticFeedback(syntheticFeedback.filter((_, i) => i !== index));
    } else {
      setRealFeedback(realFeedback.filter((_, i) => i !== index));
    }
  };

  const addDocumentUrl = () => {
    setDocumentUrls([...documentUrls, '']);
  };

  const updateDocumentUrl = (index: number, value: string) => {
    const updated = [...documentUrls];
    updated[index] = value;
    setDocumentUrls(updated);
  };

  const removeDocumentUrl = (index: number) => {
    setDocumentUrls(documentUrls.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          <Psychology sx={{ mr: 1, verticalAlign: 'middle' }} />
          Generador de Usuarios Sintéticos
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Crea, simula y valida experiencias con usuarios sintéticos impulsados por IA
        </Typography>
      </Box>

      {/* Alerts */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      )}

      {/* Main Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
          <Tab icon={<Person />} label="Generar Perfil" />
          <Tab icon={<Chat />} label="Simular Conversación" />
          <Tab icon={<Assessment />} label="Validar Experiencia" />
          <Tab icon={<Insights />} label="Comparar Feedback" />
        </Tabs>
      </Box>

      {/* Tab 1: Generar Perfil */}
      <TabPanel value={activeTab} index={0}>
        <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
          <Box sx={{ flex: 1 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Descripción del Usuario
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Describe el tipo de usuario que quieres generar"
                  placeholder="Ej: Mujer de 28 años, diseñadora gráfica, vive en Madrid, usa mucho Instagram..."
                  value={profilePrompt}
                  onChange={(e) => setProfilePrompt(e.target.value)}
                  sx={{ mb: 2 }}
                />
                
                {/* Documentos de referencia */}
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography>Documentos de Referencia (Opcional)</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {documentUrls.map((url, index) => (
                      <Box key={index} sx={{ display: 'flex', mb: 1 }}>
                        <TextField
                          fullWidth
                          size="small"
                          label={`URL del documento ${index + 1}`}
                          value={url}
                          onChange={(e) => updateDocumentUrl(index, e.target.value)}
                          sx={{ mr: 1 }}
                        />
                        <IconButton onClick={() => removeDocumentUrl(index)}>
                          <Delete />
                        </IconButton>
                      </Box>
                    ))}
                    <Button startIcon={<CloudUpload />} onClick={addDocumentUrl}>
                      Agregar Documento
                    </Button>
                  </AccordionDetails>
                </Accordion>

                <Button
                  variant="contained"
                  onClick={handleGenerateProfile}
                  disabled={loading}
                  sx={{ mt: 2 }}
                  startIcon={loading ? <CircularProgress size={20} /> : <Add />}
                >
                  {loading ? 'Generando...' : 'Generar Perfil'}
                </Button>
              </CardContent>
            </Card>
          </Box>
          
          <Box sx={{ flex: 1 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Perfil Generado
                </Typography>
                {generatedProfile ? (
                  <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                    <Typography variant="body2" style={{ whiteSpace: 'pre-wrap' }}>
                      {generatedProfile}
                    </Typography>
                  </Paper>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    El perfil generado aparecerá aquí
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Box>
        </Box>
      </TabPanel>

      {/* Tab 2: Simular Conversación */}
      <TabPanel value={activeTab} index={1}>
        <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
          <Box sx={{ flex: 1 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Configuración de Simulación
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Perfil del Usuario"
                  placeholder="Describe el perfil del usuario o pega un perfil generado"
                  value={selectedProfile}
                  onChange={(e) => setSelectedProfile(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Escenario"
                  placeholder="Ej: Está navegando por una tienda online buscando ropa deportiva"
                  value={scenario}
                  onChange={(e) => setScenario(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Mensaje/Pregunta"
                  placeholder="Ej: ¿Qué opinas de esta página de producto?"
                  value={conversationMessage}
                  onChange={(e) => setConversationMessage(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  onClick={handleSimulateConversation}
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <Chat />}
                >
                  {loading ? 'Simulando...' : 'Simular Conversación'}
                </Button>
              </CardContent>
            </Card>
          </Box>
          
          <Box sx={{ flex: 1 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Respuesta del Usuario Sintético
                </Typography>
                {conversationResponse ? (
                  <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                    <Typography variant="body2" style={{ whiteSpace: 'pre-wrap' }}>
                      {conversationResponse}
                    </Typography>
                  </Paper>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    La respuesta del usuario sintético aparecerá aquí
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Box>
        </Box>
      </TabPanel>

      {/* Tab 3: Validar Experiencia */}
      <TabPanel value={activeTab} index={2}>
        <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
          <Box sx={{ flex: 1 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Experiencia a Validar
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Describe la experiencia de usuario"
                  placeholder="Ej: Proceso de registro en la aplicación móvil"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Typography variant="subtitle2" gutterBottom>
                  Perfiles de Usuario (uno por línea)
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  label="Perfiles de usuarios sintéticos"
                  placeholder="Perfil 1: Mujer de 25 años, estudiante...&#10;Perfil 2: Hombre de 35 años, ejecutivo..."
                  value={selectedProfiles.join('\n')}
                  onChange={(e) => setSelectedProfiles(e.target.value.split('\n'))}
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  onClick={handleValidateExperience}
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <Assessment />}
                >
                  {loading ? 'Validando...' : 'Validar Experiencia'}
                </Button>
              </CardContent>
            </Card>
          </Box>
          
          <Box sx={{ flex: 1 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Resultados de Validación
                </Typography>
                {validationResults.length > 0 ? (
                  <Box>
                    {validationResults.map((result, index) => (
                      <Accordion key={index}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <Typography>Usuario Sintético {index + 1}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography variant="body2" style={{ whiteSpace: 'pre-wrap' }}>
                            {result.output || result.error || 'Sin respuesta'}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Los resultados de validación aparecerán aquí
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Box>
        </Box>
      </TabPanel>

      {/* Tab 4: Comparar Feedback */}
      <TabPanel value={activeTab} index={3}>
        <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
          <Box sx={{ flex: 1 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Comparación de Feedback
                </Typography>
                
                <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                  Feedback Sintético
                </Typography>
                {syntheticFeedback.map((feedback, index) => (
                  <Box key={index} sx={{ display: 'flex', mb: 1 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label={`Feedback sintético ${index + 1}`}
                      value={feedback}
                      onChange={(e) => updateFeedback(index, e.target.value, 'synthetic')}
                      sx={{ mr: 1 }}
                    />
                    <IconButton onClick={() => removeFeedbackField(index, 'synthetic')}>
                      <Delete />
                    </IconButton>
                  </Box>
                ))}
                <Button onClick={() => addFeedbackField('synthetic')} size="small">
                  Agregar Feedback Sintético
                </Button>

                <Typography variant="subtitle2" gutterBottom sx={{ mt: 3 }}>
                  Feedback Real
                </Typography>
                {realFeedback.map((feedback, index) => (
                  <Box key={index} sx={{ display: 'flex', mb: 1 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label={`Feedback real ${index + 1}`}
                      value={feedback}
                      onChange={(e) => updateFeedback(index, e.target.value, 'real')}
                      sx={{ mr: 1 }}
                    />
                    <IconButton onClick={() => removeFeedbackField(index, 'real')}>
                      <Delete />
                    </IconButton>
                  </Box>
                ))}
                <Button onClick={() => addFeedbackField('real')} size="small">
                  Agregar Feedback Real
                </Button>

                <Button
                  variant="contained"
                  onClick={handleGenerateInsights}
                  disabled={loading}
                  sx={{ mt: 3 }}
                  startIcon={loading ? <CircularProgress size={20} /> : <Insights />}
                >
                  {loading ? 'Generando...' : 'Generar Insights'}
                </Button>
              </CardContent>
            </Card>
          </Box>
          
          <Box sx={{ flex: 1 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Insights Comparativos
                </Typography>
                {comparisonInsights ? (
                  <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                    <Typography variant="body2" style={{ whiteSpace: 'pre-wrap' }}>
                      {comparisonInsights}
                    </Typography>
                  </Paper>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Los insights comparativos aparecerán aquí
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Box>
        </Box>
      </TabPanel>
    </Box>
  );
} 