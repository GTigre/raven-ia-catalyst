#!/bin/bash

# Deploy script for IA Catalyst Frontend to Google Cloud Run
# Usage: ./deploy.sh

echo "🚀 Starting deployment of IA Catalyst Frontend..."

# Set project ID
PROJECT_ID="raven-ia-catalyst-prod"
SERVICE_NAME="raven-frontend"
REGION="us-central1"

# Set the project
echo "📝 Setting Google Cloud project..."
gcloud config set project $PROJECT_ID

# Build and push the Docker image
echo "🏗️  Building and pushing Docker image..."
gcloud builds submit --tag gcr.io/$PROJECT_ID/$SERVICE_NAME:latest .

# Deploy to Cloud Run
echo "🚀 Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
  --image gcr.io/$PROJECT_ID/$SERVICE_NAME:latest \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --port 3000 \
  --memory 1Gi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10 \
  --timeout 300

# Get the service URL
echo "🌐 Getting service URL..."
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region=$REGION --format="value(status.url)")

echo ""
echo "✅ Deployment completed successfully!"
echo "🌍 Service URL: $SERVICE_URL"
echo ""
echo "📊 To view logs:"
echo "gcloud logs tail --follow --filter=\"resource.type=cloud_run_revision AND resource.labels.service_name=$SERVICE_NAME\" --project=$PROJECT_ID"
echo ""
echo "🔧 To manage the service:"
echo "https://console.cloud.google.com/run/detail/$REGION/$SERVICE_NAME?project=$PROJECT_ID" 