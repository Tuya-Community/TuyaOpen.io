#!/bin/bash

# Deploy the Decap CMS OAuth server
# Usage: ./deploy-oauth.sh
#
# REQUIRED: Set GITHUB_CLIENT_SECRET environment variable before running
# Example: GITHUB_CLIENT_SECRET=your_secret ./deploy-oauth.sh

# Configuration
IMAGE_NAME="decap-oauth-server"
CONTAINER_NAME="decap-oauth-server"
PORT=9070

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

if [ -z "$GITHUB_CLIENT_SECRET" ]; then
  echo -e "${RED}Error: GITHUB_CLIENT_SECRET environment variable is required!${NC}"
  echo -e "${YELLOW}Usage: GITHUB_CLIENT_SECRET=your_secret $0${NC}"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OAUTH_DIR="$SCRIPT_DIR/oauth-server"

if [ ! -f "$OAUTH_DIR/Dockerfile" ]; then
  echo -e "${RED}Error: oauth-server/Dockerfile not found. Run from docker/ directory.${NC}"
  exit 1
fi

echo -e "${YELLOW}Building OAuth server Docker image...${NC}"
docker build -t $IMAGE_NAME:latest "$OAUTH_DIR"
if [ $? -ne 0 ]; then
  echo -e "${RED}Docker build failed!${NC}"
  exit 1
fi

echo -e "${YELLOW}Stopping and removing old container (if exists)...${NC}"
docker stop $CONTAINER_NAME 2>/dev/null || true
docker rm $CONTAINER_NAME 2>/dev/null || true

echo -e "${YELLOW}Starting new OAuth server container...${NC}"
docker run -d \
  --name $CONTAINER_NAME \
  --restart unless-stopped \
  -p $PORT:9060 \
  -e GITHUB_CLIENT_SECRET="$GITHUB_CLIENT_SECRET" \
  -e GITHUB_CLIENT_ID="Ov23li0MAyFEPdgrMMwm" \
  -e OAUTH_PORT=9060 \
  $IMAGE_NAME:latest

if docker ps | grep -q $CONTAINER_NAME; then
  echo -e "${GREEN}✅ OAuth server deployed! Container $CONTAINER_NAME is running on port $PORT.${NC}"
  docker ps | grep $CONTAINER_NAME
else
  echo -e "${RED}❌ Container failed to start. Showing logs:${NC}"
  docker logs $CONTAINER_NAME
  exit 1
fi

echo -e "${GREEN}🔐 OAuth server ready at: http://127.0.0.1:$PORT/oauth/auth${NC}"
echo -e "${YELLOW}📝 Make sure nginx proxies /oauth/ to port $PORT${NC}"

