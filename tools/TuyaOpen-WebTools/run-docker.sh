#!/bin/bash
set -euo pipefail

echo "[INFO] Starting TuyaOpen-WebTools on port 9060..."

# Check for required commands
for cmd in docker; do
  if ! command -v "$cmd" &>/dev/null; then
    echo "[ERROR] $cmd is required but not installed. Aborting."
    exit 1
  fi
done

# Check if we're in the right directory (should contain web-serial directory)
if [ ! -d "web-serial" ]; then
  echo "[ERROR] web-serial directory not found. Please run this script from the TuyaOpen-WebTools root directory."
  exit 1
fi

# Build the Docker image locally using buildx
IMAGE_NAME="tuyaopen-webtools:local"

echo "[INFO] Building Docker image $IMAGE_NAME using buildx..."
docker buildx build --load -t "$IMAGE_NAME" .

# Stop any running container with the same name
CONTAINER_NAME="tuyaopen-webtools"
echo "[INFO] Stopping and removing any running container named $CONTAINER_NAME..."
if docker ps -a --format '{{.Names}}' | grep -wq "$CONTAINER_NAME"; then
  docker stop "$CONTAINER_NAME" &>/dev/null || true
  docker rm "$CONTAINER_NAME" &>/dev/null || true
fi

# Start the service on port 9060
echo "[INFO] Starting TuyaOpen-WebTools service on port 9060 using docker run..."
docker run -d \
  --name "$CONTAINER_NAME" \
  --restart unless-stopped \
  -p 9060:9060 \
  "$IMAGE_NAME"

echo "[INFO] Done. Access the service at: http://localhost:9060"