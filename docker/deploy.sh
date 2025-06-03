#!/bin/bash

# Parse command line arguments
while getopts "u:h:" opt; do
  case $opt in
    u) REMOTE_USER="$OPTARG" ;;
    h) REMOTE_HOST="$OPTARG" ;;
    \?) echo "Invalid option -$OPTARG" >&2; exit 1 ;;
  esac
done

# Validate required arguments
if [ -z "$REMOTE_USER" ] || [ -z "$REMOTE_HOST" ]; then
    echo "Usage: $0 -u <remote_user> -h <remote_host>"
    echo "Example: $0 -u root -h {REMOTE-IP}"
    exit 1
fi

# Configuration
REMOTE_DIR="~/code/"
IMAGE_NAME="docusaurus-beta"
CONTAINER_NAME="docusaurus-beta"
DOMAIN="tuyaopen.io"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}Starting deployment process for $DOMAIN...${NC}"

# Build the Docker image
echo -e "${YELLOW}Building Docker image...${NC}"
docker build -t $IMAGE_NAME:latest --target production .

if [ $? -ne 0 ]; then
    echo -e "${RED}Docker build failed!${NC}"
    exit 1
fi

# Save the image to a tar file
echo -e "${YELLOW}Saving Docker image...${NC}"
docker save $IMAGE_NAME:latest | gzip > $IMAGE_NAME.tar.gz

# Copy the image to the remote server
echo -e "${YELLOW}Copying image to remote server...${NC}"
scp $IMAGE_NAME.tar.gz $REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/

if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to copy image to remote server!${NC}"
    rm $IMAGE_NAME.tar.gz
    exit 1
fi

# Execute remote commands
echo -e "${YELLOW}Deploying on remote server...${NC}"
ssh $REMOTE_USER@$REMOTE_HOST << EOF
    cd $REMOTE_DIR
    
    # Load the Docker image
    echo "Loading Docker image..."
    docker load < $IMAGE_NAME.tar.gz
    
    # Stop and remove existing container if it exists
    echo "Stopping existing container..."
    docker stop $CONTAINER_NAME 2>/dev/null || true
    docker rm $CONTAINER_NAME 2>/dev/null || true
    
    # Run the new container
    echo "Starting new container on port 9050..."
    docker run -d \
        --name $CONTAINER_NAME \
        --restart unless-stopped \
        -p 9050:9050 \
        $IMAGE_NAME:latest
    
    # Check if container is running
    if docker ps | grep -q $CONTAINER_NAME; then
        echo "✅ Container $CONTAINER_NAME is running successfully"
        docker ps | grep $CONTAINER_NAME
    else
        echo "❌ Container failed to start"
        docker logs $CONTAINER_NAME
        exit 1
    fi
    
    # Clean up
    rm $IMAGE_NAME.tar.gz
    
    echo "🚀 Deployment completed! Site should be available at https://$DOMAIN"
EOF

if [ $? -ne 0 ]; then
    echo -e "${RED}Remote deployment failed!${NC}"
    rm $IMAGE_NAME.tar.gz
    exit 1
fi

# Clean up local files
echo -e "${YELLOW}Cleaning up local files...${NC}"
rm $IMAGE_NAME.tar.gz

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo -e "${GREEN}🌐 Your site should be available at: https://$DOMAIN${NC}"
echo -e "${YELLOW}📝 Note: Make sure to update nginx config on the server if needed${NC}"