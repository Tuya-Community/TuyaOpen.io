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

# Default to fast deployment
FULL_REBUILD=false

# Parse command-line arguments
if [ "$1" == "-a" ] || [ "$1" == "--all" ]; then
  echo -e "${YELLOW}Full rebuild flag detected. Performing a full rebuild.${NC}"
  FULL_REBUILD=true
fi

# Check if in project root
if [ ! -d ".git" ] || [ ! -f "dockerfile" ]; then
  echo -e "${RED}Error: Please run this script from the project root (where .git and dockerfile exist).${NC}"
  exit 1
fi

# Check current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "$GIT_BRANCH" ]; then
    echo -e "${RED}Error: Must be on the '${GIT_BRANCH}' branch to deploy. You are currently on '${CURRENT_BRANCH}'.${NC}"
    exit 1
fi

echo -e "${YELLOW}Pulling latest changes from ${GIT_BRANCH}...${NC}"
OLD_HEAD=$(git rev-parse HEAD)
git pull origin $GIT_BRANCH
if [ $? -ne 0 ]; then
  echo -e "${RED}Git pull failed!${NC}"
  exit 1
fi
NEW_HEAD=$(git rev-parse HEAD)

if [ "$OLD_HEAD" == "$NEW_HEAD" ]; then
    echo -e "${GREEN}✅ Already up-to-date. No deployment needed.${NC}"
    exit 0
fi

echo -e "${GREEN}Changes detected. Proceeding with deployment...${NC}"

if [ "$FULL_REBUILD" = true ]; then
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
else
  # Fast update
  echo -e "${YELLOW}Performing fast update. Use -a for a full rebuild.${NC}"
  if ! docker ps -f "name=^/${CONTAINER_NAME}$" --format '{{.Names}}' | grep -q $CONTAINER_NAME; then
    echo -e "${RED}Container ${CONTAINER_NAME} is not running.${NC}"
    echo -e "${YELLOW}Please run the script with the '-a' flag first to build and start the container.${NC}"
    echo -e "${YELLOW}Example: ./deploy.sh -a${NC}"
    exit 1
  fi

  echo -e "${YELLOW}Copying new files into the container...${NC}"
  git archive HEAD | docker exec -i ${CONTAINER_NAME} tar -x -C /home/node/app/
  if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to copy files into the container.${NC}"
    exit 1
  fi
  
  echo -e "${YELLOW}Re-building site inside the container...${NC}"
  docker exec ${CONTAINER_NAME} npm run build
  if [ $? -ne 0 ]; then
    echo -e "${RED}Site build failed inside the container.${NC}"
    exit 1
  fi

  echo -e "${YELLOW}Restarting container to apply changes...${NC}"
  docker restart $CONTAINER_NAME > /dev/null
fi

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
echo -e "${YELLOW}💡 Tip: For changes to dependencies (package.json) or build config, run a full rebuild with './deploy.sh -a'.${NC}" 