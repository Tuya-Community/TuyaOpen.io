FROM python:3.9-alpine

# Set working directory
WORKDIR /app

# Copy the web-serial directory to the container
COPY web-serial/ ./web-serial/

# Expose port 9060
EXPOSE 9060

# Change to web-serial directory and start Python HTTP server
WORKDIR /app/web-serial

# Start Python HTTP server on port 9060
CMD ["python", "-m", "http.server", "9060", "--bind", "0.0.0.0"] 