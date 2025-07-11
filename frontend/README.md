# IA Catalyst Frontend

## Description

Frontend application for IA Catalyst built with Next.js 15, React 19 and Material-UI. SaaS platform that enables design, product and customer experience teams to apply artificial intelligence to validate, create and improve digital experiences.

## Technologies

- **Next.js 15** - React framework for production
- **React 19** - User interface library
- **Material-UI (MUI)** - UI component library
- **TypeScript** - Static typing
- **Docker** - Containerization
- **Google Cloud Run** - Deployment platform

## Local Development

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# The application will be available at http://localhost:3000
```

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Production Deployment

### Google Cloud Run

The application is deployed on Google Cloud Run. For deployment:

```bash
# Quick deployment (using deploy script)
./deploy.sh

# Manual deployment
gcloud builds submit --tag gcr.io/raven-ia-catalyst-prod/raven-frontend:latest .
gcloud run deploy raven-frontend --image gcr.io/raven-ia-catalyst-prod/raven-frontend:latest --platform managed --region us-central1 --allow-unauthenticated --port 3000
```

### Production URL

**Live Application:** https://raven-frontend-7u7cwe4hdq-uc.a.run.app

## Features

### Available Modules

1. **Synthetic User Generator** - Create realistic AI-powered user profiles
2. **Prompt Builder Studio** - Visual editor for reusable prompts
3. **AI UX Writer** - Generate consistent UX copy
4. **AI vs Real Comparator** - Compare synthetic vs real feedback
5. **Project Management** - Organize your experiments
6. **Analytics Dashboard** - Visualize metrics and KPIs

### User Profiles

- **UX Researcher** - Validate hypotheses quickly with synthetic users and real data
- **Product Manager** - Make data-driven decisions and justify changes with metrics
- **UX Writer** - Accelerate the creation of consistent and effective UX content

### Demo Users

- **Super Admin** (admin@raven.com / admin123) - Full access
- **Demo User** (demo@raven.com / demo123) - Standard access

## Architecture

- **Frontend**: Next.js 15 + React 19 + Material-UI
- **Backend**: NestJS + PostgreSQL (planned)
- **Deployment**: Google Cloud Run
- **Containerization**: Docker
- **Monorepo**: Nx workspace

## Design System

- **Theme**: Light mode with elegant gray color palette
- **Primary Color**: #2E2E2E (Dark Gray)
- **Secondary Color**: #6B7280 (Medium Gray)
- **Background**: #F8F9FA (Light Gray)
- **Typography**: Inter font family
- **Components**: Material-UI with custom styling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

Private project - All rights reserved. 