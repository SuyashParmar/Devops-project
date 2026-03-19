#!/bin/bash
# Idempotent Deployment Script for ShopSmart

# Exit immediately if a command exits with a non-zero status
set -e

echo "Starting Deployment Process..."

# 1. Ensure project directory exists idempotently
mkdir -p /home/ubuntu/devops-project

# 2. Navigate to project directory
cd /home/ubuntu/devops-project

# 3. Pull latest code from GitHub
echo "Pulling latest changes..."
git pull origin main || echo "Git pull failed or no origin set, proceeding..."

# 4. Idempotently install backend dependencies
echo "Installing backend dependencies..."
cd server
npm ci || npm install

# 5. Idempotent PM2 service start/restart
echo "Managing backend service with PM2..."
if pm2 show shopsmart-backend > /dev/null 2>&1; then
    echo "Restarting shopsmart-backend..."
    pm2 restart shopsmart-backend
else
    echo "Starting shopsmart-backend..."
    pm2 start src/index.js --name shopsmart-backend
fi

# 6. Idempotently install and build frontend
echo "Building frontend..."
cd ../client
npm ci || npm install

# Dynamically fetch EC2 Public IP so frontend React app knows where the backend is
export PUBLIC_IP=$(curl -s http://checkip.amazonaws.com || echo "localhost")
export VITE_API_URL="http://$PUBLIC_IP:5001"
echo "Compiling React App with VITE_API_URL=$VITE_API_URL"
npm run build

# 7. Host frontend static files via PM2
echo "Managing frontend service with PM2..."
if pm2 show shopsmart-frontend > /dev/null 2>&1; then
    echo "Restarting shopsmart-frontend..."
    pm2 restart shopsmart-frontend
else
    echo "Starting shopsmart-frontend statically..."
    pm2 serve dist 3000 --name shopsmart-frontend --spa
fi

echo "Deployment completed successfully! Frontend on port 3000, Backend on port 5001."
