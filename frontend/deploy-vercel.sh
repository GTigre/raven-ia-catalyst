#!/bin/bash

# Deploy script for Raven IA Catalyst Frontend to Vercel
# Usage: ./deploy-vercel.sh [production|preview]

set -e

echo "🚀 Starting Vercel deployment for Raven IA Catalyst Frontend..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Make sure you're in the frontend directory."
    exit 1
fi

# Build the project locally first to catch any errors
echo "🏗️  Building project locally..."
npm run build

# Check deployment type
DEPLOY_TYPE=${1:-preview}

if [ "$DEPLOY_TYPE" = "production" ]; then
    echo "🌍 Deploying to production..."
    vercel --prod
else
    echo "🔍 Deploying preview..."
    vercel
fi

echo "✅ Deployment completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Configure environment variables in Vercel dashboard"
echo "2. Set up custom domain (optional)"
echo "3. Configure analytics (optional)"
echo ""
echo "🔧 To configure environment variables:"
echo "1. Go to https://vercel.com/dashboard"
echo "2. Select your project"
echo "3. Go to Settings > Environment Variables"
echo "4. Add the following variables:"
echo "   - NEXT_PUBLIC_STACK_AI_API_URL"
echo "   - NEXT_PUBLIC_STACK_AI_API_KEY"
echo ""
echo "📊 To view deployment logs:"
echo "vercel logs" 