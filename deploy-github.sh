#!/bin/bash

# Script para desplegar Raven IA Catalyst desde GitHub a Google Cloud VM

set -e

PROJECT_ID="raven-ia-catalyst-prod"
ZONE="us-central1-a"
VM_NAME="raven-deployment-vm"
REPO_URL="https://github.com/GTigre/raven-ia-catalyst.git"

echo "🚀 Desplegando Raven IA Catalyst desde GitHub..."

# Verificar que gcloud esté configurado
if ! gcloud config get-value project >/dev/null 2>&1; then
    echo "❌ Error: gcloud no está configurado. Ejecuta 'gcloud auth login' primero."
    exit 1
fi

# Crear la VM si no existe
echo "📦 Verificando VM..."
if ! gcloud compute instances describe $VM_NAME --zone=$ZONE >/dev/null 2>&1; then
    echo "🔧 Creando VM $VM_NAME..."
    gcloud compute instances create $VM_NAME \
        --zone=$ZONE \
        --machine-type=e2-standard-2 \
        --image-family=cos-stable \
        --image-project=cos-cloud \
        --boot-disk-size=20GB \
        --tags=http-server,https-server \
        --scopes=https://www.googleapis.com/auth/cloud-platform
    
    echo "⏳ Esperando que la VM esté lista..."
    sleep 30
else
    echo "✅ VM $VM_NAME ya existe"
fi

# Configurar reglas de firewall
echo "🔥 Configurando firewall..."
if ! gcloud compute firewall-rules describe allow-raven-ports >/dev/null 2>&1; then
    gcloud compute firewall-rules create allow-raven-ports \
        --allow tcp:3001,tcp:80,tcp:443 \
        --source-ranges 0.0.0.0/0 \
        --target-tags http-server,https-server
    echo "✅ Reglas de firewall creadas"
else
    echo "✅ Reglas de firewall ya existen"
fi

# Desplegar en la VM
echo "🚀 Desplegando aplicación en VM..."
gcloud compute ssh $VM_NAME --zone=$ZONE --command="
    set -e
    
    echo '📦 Instalando dependencias...'
    
    # Instalar Docker si no está instalado
    if ! command -v docker &> /dev/null; then
        echo '🐳 Instalando Docker...'
        curl -fsSL https://get.docker.com -o get-docker.sh
        sudo sh get-docker.sh
        sudo usermod -aG docker \$USER
        echo '✅ Docker instalado'
    else
        echo '✅ Docker ya está instalado'
    fi
    
    echo '✅ Git ya está disponible en Container-Optimized OS'
    
    echo '✅ Usando Container-Optimized OS - Node.js y Yarn no son necesarios (usamos Docker)'
    
    echo '📂 Clonando/actualizando repositorio...'
    
    # Clonar o actualizar el repositorio
    if [ -d '/home/\$USER/raven-ia-catalyst' ]; then
        echo '🔄 Actualizando repositorio existente...'
        cd /home/\$USER/raven-ia-catalyst
        git pull origin main
    else
        echo '📥 Clonando repositorio...'
        cd /home/\$USER
        git clone $REPO_URL
        cd raven-ia-catalyst
    fi
    
    echo '🛑 Parando contenedores existentes...'
    sudo docker stop raven-frontend 2>/dev/null || true
    sudo docker rm raven-frontend 2>/dev/null || true
    
    echo '🏗️ Construyendo aplicación...'
    cd /home/\$USER/raven-ia-catalyst/frontend
    sudo docker build -t raven-frontend:latest .
    
    echo '🚀 Ejecutando aplicación...'
              sudo docker run -d \
            --name raven-frontend \
            --restart unless-stopped \
            -p 80:3000 \
            -p 3001:3000 \
            raven-frontend:latest
    
    echo '✅ Aplicación desplegada exitosamente!'
    echo '🌐 La aplicación debería estar disponible en:'
    echo '   - http://\$(curl -s ifconfig.me):80'
    echo '   - http://\$(curl -s ifconfig.me):3001'
"

# Obtener la IP externa de la VM
echo "🌐 Obteniendo IP externa de la VM..."
EXTERNAL_IP=$(gcloud compute instances describe $VM_NAME --zone=$ZONE --format="get(networkInterfaces[0].accessConfigs[0].natIP)")

echo ""
echo "🎉 ¡Despliegue completado!"
echo "🌐 Tu aplicación está disponible en:"
echo "   - http://$EXTERNAL_IP:80"
echo "   - http://$EXTERNAL_IP:3001"
echo ""
echo "📊 Para ver los logs del contenedor:"
echo "   gcloud compute ssh $VM_NAME --zone=$ZONE --command='sudo docker logs raven-frontend'"
echo ""
echo "🔧 Para conectarte a la VM:"
echo "   gcloud compute ssh $VM_NAME --zone=$ZONE" 