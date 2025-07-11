# Módulo de Usuarios Sintéticos - Raven IA Catalyst

## 📋 Descripción General

El módulo de **Usuarios Sintéticos** es una funcionalidad clave de Raven IA Catalyst que permite crear, simular y validar experiencias de usuario utilizando perfiles de usuarios generados por inteligencia artificial. Este módulo ayuda a los equipos de UX a obtener insights rápidos y realistas sin necesidad de usuarios reales.

## 🎯 Funcionalidades Principales

### 1. **Generador de Perfiles de Usuario**
- **Descripción**: Crea perfiles detallados de usuarios sintéticos basados en prompts descriptivos
- **Entrada**: Descripción textual del tipo de usuario deseado
- **Salida**: Perfil completo con información demográfica, psicográfica y comportamental
- **Ejemplo**: "Mujer de 28 años, diseñadora gráfica, vive en Madrid"

### 2. **Simulador de Conversaciones**
- **Descripción**: Simula conversaciones naturales con usuarios sintéticos en escenarios específicos
- **Entrada**: Perfil de usuario, escenario y mensaje/pregunta
- **Salida**: Respuesta natural del usuario sintético
- **Uso**: Validación de interfaces, pruebas de usabilidad, feedback de productos

### 3. **Validador de Experiencias**
- **Descripción**: Evalúa experiencias de usuario con múltiples perfiles sintéticos
- **Entrada**: Descripción de la experiencia y lista de perfiles
- **Salida**: Feedback detallado desde múltiples perspectivas
- **Métricas**: Primera impresión, facilidad de uso, emociones, probabilidad de conversión

### 4. **Comparador de Feedback**
- **Descripción**: Compara y analiza feedback sintético vs feedback real
- **Entrada**: Arrays de feedback sintético y real
- **Salida**: Informe comparativo con similitudes, diferencias y recomendaciones
- **Valor**: Validación de la efectividad de usuarios sintéticos

## 🛠️ Arquitectura Técnica

### Componentes Principales

```
📁 src/app/
├── 📁 services/
│   └── syntheticUserService.ts     # Servicio principal de la API
├── 📁 components/
│   └── SyntheticUserGenerator.tsx  # Componente principal de UI
├── 📁 synthetic-users/
│   └── page.tsx                    # Página del módulo
└── 📁 test/
    ├── test-synthetic-users.js     # Pruebas completas
    └── test-simple-synthetic.js    # Prueba básica
```

### API Integration

**Endpoint**: `https://api.stack-ai.com/inference/v0/run/a0613a2d-2698-4b56-a97a-5ca11fc52e98/68548cb3792f2750414e7f43`

**Formato de Request**:
```json
{
  "doc-0": ["URL_TO_FILE_1", "URL_TO_FILE_2"],
  "in-0": "Prompt para el usuario sintético",
  "user_id": "identificador_unico"
}
```

**Formato de Response**:
```json
{
  "outputs": {
    "out-0": "Respuesta del usuario sintético"
  },
  "run_id": "id_de_ejecucion",
  "citations": null,
  "metadata": null
}
```

## 📊 Casos de Uso

### 1. **UX Researcher**
- **Objetivo**: Validar hipótesis de diseño rápidamente
- **Proceso**: 
  1. Crear perfiles de usuarios objetivo
  2. Simular interacciones con prototipos
  3. Obtener feedback detallado
  4. Comparar con usuarios reales (opcional)

### 2. **Product Manager**
- **Objetivo**: Evaluar impacto de nuevas funcionalidades
- **Proceso**:
  1. Definir escenarios de uso
  2. Generar múltiples perfiles de usuarios
  3. Validar experiencias propuestas
  4. Generar insights comparativos

### 3. **Service Designer**
- **Objetivo**: Identificar puntos de fricción en customer journeys
- **Proceso**:
  1. Mapear journey completo
  2. Crear perfiles para diferentes segmentos
  3. Simular experiencia paso a paso
  4. Identificar momentos críticos

## 🎨 Interfaz de Usuario

### Estructura de Tabs

1. **Generar Perfil**
   - Campo de descripción del usuario
   - Sección de documentos de referencia (opcional)
   - Botón de generación
   - Panel de resultados

2. **Simular Conversación**
   - Campo de perfil de usuario
   - Campo de escenario
   - Campo de mensaje/pregunta
   - Panel de respuesta

3. **Validar Experiencia**
   - Descripción de la experiencia
   - Lista de perfiles (uno por línea)
   - Panel de resultados por perfil

4. **Comparar Feedback**
   - Campos dinámicos para feedback sintético
   - Campos dinámicos para feedback real
   - Panel de insights comparativos

### Características de UX

- **Responsive Design**: Funciona en desktop y móvil
- **Estados de Carga**: Indicadores visuales durante procesamiento
- **Manejo de Errores**: Alertas claras y específicas
- **Feedback Visual**: Alertas de éxito y progreso
- **Navegación**: Breadcrumbs y tabs intuitivos

## 📈 Métricas y KPIs

### Métricas de Uso
- Número de perfiles generados
- Conversaciones simuladas
- Experiencias validadas
- Comparaciones realizadas

### Métricas de Calidad
- Tiempo de respuesta de la API
- Tasa de éxito de las consultas
- Nivel de satisfacción del usuario
- Precisión vs usuarios reales

## 🔧 Configuración y Despliegue

### Variables de Entorno
```bash
NEXT_PUBLIC_STACK_AI_API_URL=https://api.stack-ai.com/inference/v0/run/...
NEXT_PUBLIC_STACK_AI_API_KEY=tu_api_key_aqui
```

### Comandos de Desarrollo
```bash
# Desarrollo local
npm run dev

# Construcción para producción
npm run build

# Pruebas de la API
node src/app/test-synthetic-users.js
```

## 🧪 Testing

### Pruebas Automatizadas
- **test-synthetic-users.js**: Suite completa de pruebas
- **test-simple-synthetic.js**: Prueba básica de conectividad

### Casos de Prueba
1. Generación de perfil básico
2. Simulación de conversación
3. Validación de experiencia múltiple
4. Comparación de feedback

## 🚀 Roadmap Futuro

### Próximas Funcionalidades
- [ ] Plantillas de perfiles por industria
- [ ] Exportación de resultados a PDF/Excel
- [ ] Integración con herramientas de análisis
- [ ] Biblioteca de perfiles reutilizables
- [ ] Métricas avanzadas de validación

### Mejoras Técnicas
- [ ] Cache de respuestas frecuentes
- [ ] Optimización de prompts
- [ ] Procesamiento en lotes
- [ ] Integración con bases de datos externas

## 📞 Soporte y Documentación

### Recursos Adicionales
- [Documentación de Stack AI](https://docs.stack-ai.com)
- [Guía de Prompts Efectivos](./PROMPT_GUIDE.md)
- [Casos de Uso Detallados](./USE_CASES.md)

### Contacto
Para soporte técnico o consultas sobre el módulo, contactar al equipo de desarrollo.

---

**Versión**: 1.0.0  
**Última Actualización**: Julio 2025  
**Autor**: Equipo Raven IA Catalyst 