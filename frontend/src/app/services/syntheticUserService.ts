// Servicio para la API de Usuarios Sintéticos de Stack AI
export interface SyntheticUserRequest {
  documents?: string[]; // URLs de archivos de referencia
  message: string; // Mensaje o prompt para el usuario sintético
  userId?: string; // ID del usuario o conversación
}

export interface SyntheticUserResponse {
  output?: string;
  error?: string;
  status?: string;
  run_id?: string;
  citations?: any;
  metadata?: any;
}

export interface SyntheticUserProfile {
  id: string;
  name: string;
  persona: string;
  demographics: {
    age: number;
    gender: string;
    occupation: string;
    location: string;
  };
  psychographics: {
    interests: string[];
    values: string[];
    personality: string;
  };
  digitalBehavior: {
    deviceUsage: string;
    socialMediaUsage: string;
    onlineShoppingHabits: string;
  };
  createdAt: Date;
  lastUsed: Date;
}

class SyntheticUserService {
  private readonly apiUrl = 'https://api.stack-ai.com/inference/v0/run/a0613a2d-2698-4b56-a97a-5ca11fc52e98/68548cb3792f2750414e7f43';
  private readonly apiKey = '251b52c5-e53f-4399-b917-0e4cd20c8c78';

  /**
   * Consulta la API de usuarios sintéticos
   */
  async queryUser(request: SyntheticUserRequest): Promise<SyntheticUserResponse> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'doc-0': request.documents || [],
          'in-0': request.message,
          'user_id': request.userId || `user_${Date.now()}`
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      return {
        output: result.outputs?.['out-0'] || result.output,
        run_id: result.run_id,
        citations: result.citations,
        metadata: result.metadata,
        status: 'success'
      };
    } catch (error) {
      console.error('Error querying synthetic user:', error);
      return {
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        status: 'error'
      };
    }
  }

  /**
   * Genera un perfil de usuario sintético
   */
  async generateUserProfile(prompt: string, documents?: string[]): Promise<SyntheticUserResponse> {
    const profilePrompt = `
Genera un perfil detallado de usuario sintético basado en: ${prompt}

Incluye:
1. Información demográfica (edad, género, ocupación, ubicación)
2. Características psicográficas (intereses, valores, personalidad)
3. Comportamiento digital (uso de dispositivos, redes sociales, compras online)
4. Motivaciones y frustraciones
5. Objetivos y necesidades

Responde en formato JSON estructurado.
    `;

    return this.queryUser({
      message: profilePrompt,
      documents,
      userId: `profile_${Date.now()}`
    });
  }

  /**
   * Simula una conversación con el usuario sintético
   */
  async simulateConversation(
    userProfile: string,
    scenario: string,
    message: string,
    documents?: string[]
  ): Promise<SyntheticUserResponse> {
    const conversationPrompt = `
Actúa como un usuario sintético con este perfil:
${userProfile}

Escenario: ${scenario}

Responde al siguiente mensaje de manera natural y consistente con tu perfil:
"${message}"

Mantén la personalidad, tono y características del perfil. Responde como lo haría este usuario real.
    `;

    return this.queryUser({
      message: conversationPrompt,
      documents,
      userId: `conversation_${Date.now()}`
    });
  }

  /**
   * Valida una experiencia de usuario con múltiples usuarios sintéticos
   */
  async validateUserExperience(
    experience: string,
    userProfiles: string[],
    documents?: string[]
  ): Promise<SyntheticUserResponse[]> {
    const validationPromises = userProfiles.map(async (profile, index) => {
      const validationPrompt = `
Actúa como este usuario sintético:
${profile}

Evalúa la siguiente experiencia de usuario:
${experience}

Proporciona feedback detallado sobre:
1. Primera impresión
2. Facilidad de uso
3. Claridad de la información
4. Emociones generadas
5. Probabilidad de completar la acción
6. Sugerencias de mejora

Responde desde la perspectiva de este usuario específico.
      `;

      return this.queryUser({
        message: validationPrompt,
        documents,
        userId: `validation_${index}_${Date.now()}`
      });
    });

    return Promise.all(validationPromises);
  }

  /**
   * Genera insights comparativos entre usuarios sintéticos y reales
   */
  async generateComparativeInsights(
    syntheticFeedback: string[],
    realFeedback: string[],
    documents?: string[]
  ): Promise<SyntheticUserResponse> {
    const insightsPrompt = `
Analiza y compara el feedback de usuarios sintéticos vs usuarios reales:

FEEDBACK SINTÉTICO:
${syntheticFeedback.map((fb, i) => `Usuario Sintético ${i + 1}: ${fb}`).join('\n\n')}

FEEDBACK REAL:
${realFeedback.map((fb, i) => `Usuario Real ${i + 1}: ${fb}`).join('\n\n')}

Genera un informe comparativo que incluya:
1. Similitudes encontradas
2. Diferencias significativas
3. Patrones comunes
4. Validación de hipótesis
5. Recomendaciones basadas en el análisis
6. Nivel de confianza en los resultados sintéticos

Formato: Informe ejecutivo con métricas y visualizaciones sugeridas.
    `;

    return this.queryUser({
      message: insightsPrompt,
      documents,
      userId: `insights_${Date.now()}`
    });
  }

  /**
   * Almacena perfiles de usuarios sintéticos en localStorage
   */
  saveUserProfile(profile: SyntheticUserProfile): void {
    const profiles = this.getSavedProfiles();
    profiles.push(profile);
    localStorage.setItem('synthetic_user_profiles', JSON.stringify(profiles));
  }

  /**
   * Obtiene perfiles guardados del localStorage
   */
  getSavedProfiles(): SyntheticUserProfile[] {
    const saved = localStorage.getItem('synthetic_user_profiles');
    return saved ? JSON.parse(saved) : [];
  }

  /**
   * Elimina un perfil guardado
   */
  deleteUserProfile(profileId: string): void {
    const profiles = this.getSavedProfiles().filter(p => p.id !== profileId);
    localStorage.setItem('synthetic_user_profiles', JSON.stringify(profiles));
  }

  /**
   * Obtiene historial de conversaciones
   */
  getConversationHistory(userId: string): any[] {
    const history = localStorage.getItem(`conversation_history_${userId}`);
    return history ? JSON.parse(history) : [];
  }

  /**
   * Guarda mensaje en historial de conversación
   */
  saveConversationMessage(userId: string, message: any): void {
    const history = this.getConversationHistory(userId);
    history.push({
      ...message,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem(`conversation_history_${userId}`, JSON.stringify(history));
  }
}

export const syntheticUserService = new SyntheticUserService(); 