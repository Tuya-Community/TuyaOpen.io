#!/bin/bash

# Configuration
IMAGE_NAME="docusaurus:latest"
CONTAINER_NAME="docusaurus-tuyaopen.io"
GIT_BRANCH="master"
PORT=9050

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if in project root
if [ ! -d ".git" ] || [ ! -f "dockerfile" ]; then
  echo -e "${RED}Error: Please run this script from the project root (where .git and dockerfile exist).${NC}"
  exit 1
fi

echo -e "${YELLOW}Pulling latest changes from ${GIT_BRANCH}...${NC}"
git checkout $GIT_BRANCH && git pull origin $GIT_BRANCH
if [ $? -ne 0 ]; then
  echo -e "${RED}Git pull failed!${NC}"
  exit 1
fi

echo -e "${YELLOW}Building Docker image...${NC}"
docker build -t $IMAGE_NAME --target production .
if [ $? -ne 0 ]; then
  echo -e "${RED}Docker build failed!${NC}"
  exit 1
fi

echo -e "${YELLOW}Stopping and removing old container (if exists)...${NC}"
docker stop $CONTAINER_NAME 2>/dev/null || true
docker rm $CONTAINER_NAME 2>/dev/null || true

echo -e "${YELLOW}Starting new container...${NC}"
docker run -d \
  --name $CONTAINER_NAME \
  --restart unless-stopped \
  -p $PORT:$PORT \
  $IMAGE_NAME

if docker ps | grep -q $CONTAINER_NAME; then
  echo -e "${GREEN}✅ Deployment successful! Container $CONTAINER_NAME is running on port $PORT.${NC}"
  docker ps | grep $CONTAINER_NAME
else
  echo -e "${RED}❌ Container failed to start. Showing logs:${NC}"
  docker logs $CONTAINER_NAME
  exit 1
fi

echo -e "${GREEN}🌐 Your site should be available at: https://tuyaopen.io${NC}"
echo -e "${YELLOW}📝 Note: Update nginx config if needed. See nginx-commands.md for help.${NC}" 