# Guía Manual de Despliegue usando VM en GCP

## Paso 1: Crear la Máquina Virtual

```bash
# Configurar proyecto
gcloud config set project raven-ia-catalyst-prod

# Crear VM
gcloud compute instances create raven-deployment-vm \
    --zone=us-central1-a \
    --machine-type=e2-standard-2 \
    --image-family=ubuntu-2004-lts \
    --image-project=ubuntu-os-cloud \
    --boot-disk-size=20GB \
    --scopes=https://www.googleapis.com/auth/cloud-platform \
    --tags=http-server,https-server
```

## Paso 2: Conectar a la VM

```bash
gcloud compute ssh raven-deployment-vm --zone=us-central1-a
```

## Paso 3: Configurar el Entorno en la VM

Una vez conectado a la VM, ejecutar:

```bash
# Actualizar sistema
sudo apt-get update -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
sudo systemctl start docker
sudo systemctl enable docker

# Instalar Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar Git
sudo apt-get install -y git

# Salir y volver a conectar para aplicar cambios de Docker
exit
```

## Paso 4: Reconectar y Configurar Git

```bash
# Reconectar a la VM
gcloud compute ssh raven-deployment-vm --zone=us-central1-a

# Configurar Git (opcional)
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

## Paso 5: Clonar el Repositorio

```bash
# Clonar tu repositorio (ajusta la URL)
git clone https://github.com/tu-usuario/raven-ia-catalyst.git
cd raven-ia-catalyst/frontend
```

## Paso 6: Instalar Dependencias y Construir

```bash
# Instalar dependencias
npm install

# Construir la aplicación
npm run build
```

## Paso 7: Construir la Imagen Docker

```bash
# Construir imagen usando el Dockerfile simplificado
docker build -f Dockerfile.vm -t raven-frontend .

# Verificar que la imagen se creó
docker images | grep raven-frontend
```

## Paso 8: Subir a Google Container Registry

```bash
# Etiquetar imagen para GCR
docker tag raven-frontend gcr.io/raven-ia-catalyst-prod/raven-frontend:latest

# Configurar Docker para GCR
gcloud auth configure-docker

# Subir imagen
docker push gcr.io/raven-ia-catalyst-prod/raven-frontend:latest
```

## Paso 9: Desplegar a Cloud Run

```bash
# Desplegar el servicio
gcloud run deploy raven-frontend \
    --image gcr.io/raven-ia-catalyst-prod/raven-frontend:latest \
    --platform managed \
    --region us-central1 \
    --allow-unauthenticated \
    --port 3000 \
    --memory 1Gi \
    --cpu 1 \
    --min-instances 0 \
    --max-instances 10 \
    --timeout 300

# Obtener URL del servicio
gcloud run services describe raven-frontend --region=us-central1 --format="value(status.url)"
```

## Paso 10: Configurar Variables de Entorno (Opcional)

```bash
# Actualizar el servicio con variables de entorno
gcloud run services update raven-frontend \
    --region us-central1 \
    --set-env-vars="NEXT_PUBLIC_STACK_AI_API_URL=tu-api-url,NEXT_PUBLIC_STACK_AI_API_KEY=tu-api-key"
```

## Comandos Útiles

### Verificar estado de la VM
```bash
gcloud compute instances list --filter="name=raven-deployment-vm"
```

### Ver logs de Cloud Run
```bash
gcloud run services logs read raven-frontend --region=us-central1
```

### Eliminar VM después del despliegue
```bash
gcloud compute instances delete raven-deployment-vm --zone=us-central1-a
```

### Actualizar el servicio
```bash
# Repetir pasos 6-9 para actualizar
```

## Troubleshooting

### Error de permisos de Docker
```bash
sudo usermod -aG docker $USER
# Salir y volver a conectar
```

### Error de autenticación con GCR
```bash
gcloud auth configure-docker
```

### Error de memoria insuficiente
```bash
# Aumentar memoria de la VM
gcloud compute instances set-machine-type raven-deployment-vm \
    --zone=us-central1-a \
    --machine-type=e2-standard-4
```

## Costos Estimados

- **VM e2-standard-2**: ~$0.067/hora
- **Cloud Run**: Gratis para tráfico bajo
- **Container Registry**: ~$0.026/GB/mes

**Recomendación**: Eliminar la VM después del despliegue para reducir costos. 