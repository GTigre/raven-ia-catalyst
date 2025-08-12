#!/bin/bash

# Deploy script for Raven IA Catalyst Frontend using GCP VM
# Usage: ./deploy-gcp-vm.sh

set -e

# Configuration
PROJECT_ID="ia-catalyst"
ZONE="us-central1-a"
VM_NAME="raven-deployment-vm"
IMAGE_NAME="raven-frontend"
SERVICE_NAME="raven-frontend"
REGION="us-central1"

echo "🚀 Starting GCP VM deployment for Raven IA Catalyst Frontend..."

# Check if gcloud is installed and authenticated
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI not found. Please install Google Cloud SDK first."
    echo "Visit: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Set the project
echo "📝 Setting Google Cloud project..."
gcloud config set project $PROJECT_ID

# Create VM instance if it doesn't exist
echo "🖥️  Creating VM instance..."
if ! gcloud compute instances describe $VM_NAME --zone=$ZONE &> /dev/null; then
    gcloud compute instances create $VM_NAME \
        --zone=$ZONE \
        --machine-type=e2-standard-2 \
        --image-family=ubuntu-2004-lts \
        --image-project=ubuntu-os-cloud \
        --boot-disk-size=20GB \
        --scopes=https://www.googleapis.com/auth/cloud-platform \
        --tags=http-server,https-server
    
    echo "⏳ Waiting for VM to be ready..."
    sleep 30
else
    echo "✅ VM instance already exists"
fi

# Create setup script for the VM
cat > vm-setup.sh << 'EOF'
#!/bin/bash
set -e

echo "🔧 Setting up development environment..."

# Update system
sudo apt-get update -y

# Install Docker
if ! command -v docker &> /dev/null; then
    echo "🐳 Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    sudo systemctl start docker
    sudo systemctl enable docker
fi

# Install Node.js 18
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Install Git
if ! command -v git &> /dev/null; then
    echo "🔧 Installing Git..."
    sudo apt-get install -y git
fi

# Install Google Cloud SDK (if not already installed)
if ! command -v gcloud &> /dev/null; then
    echo "☁️  Installing Google Cloud SDK..."
    curl https://sdk.cloud.google.com | bash
    exec -l $SHELL
fi

echo "✅ Development environment setup complete!"
EOF

# Copy setup script to VM and execute
echo "📋 Copying setup script to VM..."
gcloud compute scp vm-setup.sh $VM_NAME:~/setup.sh --zone=$ZONE

echo "🔧 Setting up development environment on VM..."
gcloud compute ssh $VM_NAME --zone=$ZONE --command="chmod +x ~/setup.sh && ~/setup.sh"

# Create deployment script for VM
cat > vm-deploy.sh << 'EOF'
#!/bin/bash
set -e

PROJECT_ID="ia-catalyst"
IMAGE_NAME="raven-frontend"
SERVICE_NAME="raven-frontend"
REGION="us-central1"

echo "🚀 Starting deployment process..."

# Clone or update repository
if [ -d "raven-ia-catalyst" ]; then
    echo "📦 Updating repository..."
    cd raven-ia-catalyst
    git pull origin main
else
    echo "📦 Cloning repository..."
    git clone https://github.com/your-username/raven-ia-catalyst.git
    cd raven-ia-catalyst
fi

# Navigate to frontend directory
cd frontend

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🏗️  Building project..."
npm run build

# Build Docker image
echo "🐳 Building Docker image..."
docker build -t $IMAGE_NAME .

# Tag for Google Container Registry
echo "🏷️  Tagging image for GCR..."
docker tag $IMAGE_NAME gcr.io/$PROJECT_ID/$IMAGE_NAME:latest

# Push to Google Container Registry
echo "📤 Pushing image to GCR..."
docker push gcr.io/$PROJECT_ID/$IMAGE_NAME:latest

# Deploy to Cloud Run
echo "🚀 Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
    --image gcr.io/$PROJECT_ID/$IMAGE_NAME:latest \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated \
    --port 3000 \
    --memory 1Gi \
    --cpu 1 \
    --min-instances 0 \
    --max-instances 10 \
    --timeout 300

# Get service URL
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region=$REGION --format="value(status.url)")

echo "✅ Deployment completed successfully!"
echo "🌍 Service URL: $SERVICE_URL"
EOF

# Copy deployment script to VM
echo "📋 Copying deployment script to VM..."
gcloud compute scp vm-deploy.sh $VM_NAME:~/deploy.sh --zone=$ZONE

# Execute deployment
echo "🚀 Executing deployment on VM..."
gcloud compute ssh $VM_NAME --zone=$ZONE --command="chmod +x ~/deploy.sh && ~/deploy.sh"

# Clean up temporary files
rm -f vm-setup.sh vm-deploy.sh

echo "✅ Deployment process completed!"
echo ""
echo "📊 To view logs:"
echo "gcloud run services logs read $SERVICE_NAME --region=$REGION"
echo ""
echo "🔧 To manage the service:"
echo "https://console.cloud.google.com/run/detail/$REGION/$SERVICE_NAME?project=$PROJECT_ID"
echo ""
echo "🖥️  To access the VM:"
echo "gcloud compute ssh $VM_NAME --zone=$ZONE" 