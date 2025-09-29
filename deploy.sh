#!/bin/bash

# Products Service - Deploy Script
echo "🚀 Deploying Products Service..."

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose down

# Build and start
echo "🔨 Building and starting Products Service..."
docker-compose up --build -d

# Wait for service to be ready
echo "⏳ Waiting for service to be ready..."
sleep 15

# Check service health
echo "🏥 Checking service health..."
curl -s http://localhost:3001/health | jq -r '.status' 2>/dev/null || echo 'unhealthy'

echo "✅ Products Service deployed!"
echo "📚 API Documentation: http://localhost:3001/api"
