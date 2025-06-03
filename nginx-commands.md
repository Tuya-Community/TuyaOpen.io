# Docker Nginx Commands for Configuration Management

## Copy updated config file to nginx container
```bash
# Copy the config file to the nginx container
docker cp docker/nginx/beta.tuyaopen.io.conf nginx:/data/server-configs-nginx/conf.d/beta.conf

# Test nginx configuration
docker exec nginx nginx -t

# Reload nginx configuration (without stopping the container)
docker exec nginx nginx -s reload
```

## Alternative: Mount config as volume (recommended for future deployments)
```bash
# Stop current nginx container
docker stop nginx

# Remove current nginx container
docker rm nginx

# Run nginx with mounted config directory
docker run -d \
  --name nginx \
  --restart unless-stopped \
  -p 80:80 \
  -p 443:443 \
  -v /path/to/your/nginx/configs:/etc/nginx/conf.d \
  -v /path/to/your/certs:/etc/nginx/certs \
  -v /path/to/h5bp:/etc/nginx/h5bp \
  nginx
```

## Quick commands for your server

### Deploy the updated config:
```bash
# On your local machine, copy config to server
scp docker/nginx/beta.tuyaopen.io.conf root@8.219.169.67:/tmp/

# On remote server
ssh root@8.219.169.67
docker cp /tmp/beta.tuyaopen.io.conf nginx:/etc/nginx/conf.d/beta.tuyaopen.io.conf
docker exec nginx nginx -t
docker exec nginx nginx -s reload
```

### Check nginx status and logs:
```bash
# Check if nginx container is running
docker ps | grep nginx

# Check nginx logs
docker logs nginx

# Check nginx configuration
docker exec nginx nginx -T

# Check what files are in the config directory
docker exec nginx ls -la /etc/nginx/conf.d/
```

### Troubleshooting:
```bash
# If nginx fails to start after config change
docker exec nginx nginx -t  # Test configuration
docker logs nginx           # Check error logs
docker restart nginx        # Restart container
``` 