# Guía de Despliegue - Raven IA Catalyst Frontend

## 🚀 Opciones de Despliegue

### 1. Vercel (Recomendado - Más Simple)

#### Instalación de Vercel CLI
```bash
npm install -g vercel
```

#### Despliegue
```bash
# Desde el directorio raven-ia-catalyst/frontend
vercel login
vercel --prod
```

#### Variables de Entorno
Configura en Vercel Dashboard:
- `NEXT_PUBLIC_STACK_AI_API_URL`: URL de la API de Stack AI
- `NEXT_PUBLIC_STACK_AI_API_KEY`: Clave de la API de Stack AI

### 2. Netlify

#### Instalación de Netlify CLI
```bash
npm install -g netlify-cli
```

#### Despliegue
```bash
# Desde el directorio raven-ia-catalyst/frontend
netlify login
netlify deploy --prod --dir=.next
```

### 3. Railway

#### Instalación de Railway CLI
```bash
npm install -g @railway/cli
```

#### Despliegue
```bash
railway login
railway link
railway up
```

### 4. Google Cloud Run (Alternativa a Cloud Build)

#### Usando Docker directamente
```bash
# Construir imagen
docker build -t raven-frontend .

# Etiquetar para Google Cloud
docker tag raven-frontend gcr.io/your-project-id/raven-frontend

# Subir imagen
docker push gcr.io/your-project-id/raven-frontend

# Desplegar
gcloud run deploy raven-frontend \
  --image gcr.io/your-project-id/raven-frontend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## 🔧 Configuración Local

### Prerrequisitos
- Node.js 18+
- npm o yarn

### Instalación
```bash
cd raven-ia-catalyst/frontend
npm install
```

### Desarrollo
```bash
npm run dev
```

### Build de Producción
```bash
npm run build
npm start
```

## 📋 Checklist Pre-Despliegue

- [ ] Build local exitoso (`npm run build`)
- [ ] Variables de entorno configuradas
- [ ] Pruebas locales funcionando
- [ ] Dominio configurado (opcional)

## 🌍 URLs de Ejemplo

### Vercel
- **Desarrollo**: `https://raven-frontend-git-main-youruser.vercel.app`
- **Producción**: `https://raven-frontend.vercel.app`

### Netlify
- **Desarrollo**: `https://deploy-preview-123--raven-frontend.netlify.app`
- **Producción**: `https://raven-frontend.netlify.app`

## 🔍 Troubleshooting

### Error: Module not found
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: Build failed
```bash
npm run build
# Revisar errores en la consola
```

### Error: Environment variables
- Verificar configuración en el dashboard de la plataforma
- Usar prefijo `NEXT_PUBLIC_` para variables del cliente

## 📊 Métricas de Despliegue

| Plataforma | Tiempo Build | Tiempo Deploy | Costo |
|------------|--------------|---------------|-------|
| Vercel     | ~2 min       | ~30 seg       | Gratis |
| Netlify    | ~2 min       | ~30 seg       | Gratis |
| Railway    | ~3 min       | ~1 min        | $5/mes |
| Cloud Run  | ~5 min       | ~2 min        | Variable |

## 🎯 Recomendación

**Para desarrollo rápido**: Usa Vercel
**Para producción**: Usa Vercel o Netlify
**Para empresas**: Usa Google Cloud Run

---

*Última actualización: $(date)* 