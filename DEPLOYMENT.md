# Infohive Chatbot - Deployment Guide

## Overview

This is a full-stack chatbot application with a React frontend and Node.js backend, ready for deployment on various platforms.

## Architecture

- **Frontend**: React.js application
- **Backend**: Node.js/Express.js server
- **Containerization**: Docker with multi-stage build (optional)
- **Deployment**: Supports Railway, Render, Heroku, Vercel, and other cloud platforms

## Quick Deploy Options (No Docker Required)

### 1. Railway Deployment (Recommended - Easiest)

1. **Sign up** at https://railway.app
2. **Connect your GitHub repository**
3. **Railway will automatically detect** your Node.js setup and deploy
4. **Your app will be available** at `https://your-app-name.railway.app`

**Steps:**

```bash
# 1. Push your code to GitHub
git add .
git commit -m "Ready for Railway deployment"
git push origin main

# 2. Go to Railway.app and connect your repo
# 3. Railway will automatically deploy using Nixpacks
```

### 2. Render Deployment

1. **Sign up** at https://render.com
2. **Create a new Web Service**
3. **Connect your GitHub repository**
4. **Configure:**
   - **Build Command**: `cd client && npm install && npm run build && cd ../server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Environment**: Node

### 3. Heroku Deployment

1. **Install Heroku CLI**
2. **Create Heroku app:**

```bash
# Install Heroku CLI
# Create app
heroku create your-chatbot-app

# Set environment variables
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

### 4. Vercel + Railway Split Deployment

**Frontend (Vercel):**

1. Deploy `client/` folder to Vercel
2. Set build command: `npm run build`
3. Set output directory: `build`

**Backend (Railway):**

1. Deploy `server/` folder to Railway
2. Railway will use the `railway.json` configuration

### 5. Netlify + Railway Split Deployment

**Frontend (Netlify):**

1. Connect your GitHub repo to Netlify
2. Set build command: `cd client && npm install && npm run build`
3. Set publish directory: `client/build`

**Backend (Railway):**

1. Deploy `server/` folder to Railway

## Docker Deployment (Optional)

### Docker Deployment

```bash
# Build the Docker image
docker build -t infohive-chatbot .

# Run the container
docker run -p 3001:3001 -e NODE_ENV=production infohive-chatbot

# Or use docker-compose
docker-compose up -d
```

## Environment Variables

### Required for Production

- `NODE_ENV=production`
- `PORT=3001` (or let platform set it automatically)
- `FRONTEND_URL=https://your-frontend-domain.vercel.app`

### Optional

- `DATABASE_URL` (for future database integration)
- `OPENAI_API_KEY` (for future AI integration)

## Local Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# Start development servers
# Terminal 1 - Start server
cd server && npm run dev

# Terminal 2 - Start client
cd client && npm start
```

### Development URLs

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- API Endpoint: http://localhost:3001/api/chat

## Production Features

### Security

- CORS configured for production domains
- Non-root user in Docker container (if using Docker)
- Environment-based configuration

### Performance

- Multi-stage Docker build (if using Docker)
- Optimized production builds
- Health checks configured

### Scalability

- Stateless application design
- Environment variable configuration
- Container-ready architecture (optional)

## API Endpoints

### POST /api/chat

Handles chatbot interactions

**Request Body:**

```json
{
  "message": "Where is the library?"
}
```

**Response:**

```json
{
  "response": "The library is located in the main academic building..."
}
```

## Monitoring and Health Checks

### Health Check Endpoint

- URL: `/api/chat`
- Method: POST
- Expected: 200 OK response

### Docker Health Check (if using Docker)

- Interval: 30s
- Timeout: 10s
- Retries: 3

## Troubleshooting

### Common Issues

1. **Port Conflicts**

   - Ensure port 3001 is available
   - Check if another service is using the port

2. **CORS Errors**

   - Verify FRONTEND_URL environment variable
   - Check browser console for CORS errors

3. **Build Failures**

   - Ensure Node.js 18+ is installed
   - Clear node_modules and reinstall dependencies

4. **Docker Issues (if using Docker)**

   - Check Docker logs: `docker logs <container_id>`
   - Verify Dockerfile syntax
   - Ensure .dockerignore is properly configured

### Logs

```bash
# Docker logs (if using Docker)
docker logs <container_id>

# Railway logs
railway logs

# Heroku logs
heroku logs --tail

# Local development logs
npm run dev
```

## Platform-Specific Notes

### Railway

- Automatically detects Node.js projects
- Uses Nixpacks for dependency management
- Provides automatic HTTPS
- Free tier available

### Render

- Free tier with automatic deployments
- Custom domain support
- Built-in monitoring

### Heroku

- Free tier discontinued, but still popular
- Excellent documentation
- Many add-ons available

### Vercel

- Great for frontend deployment
- Automatic deployments from Git
- Excellent performance

## Future Enhancements

### Planned Features

- Database integration for conversation history
- User authentication
- Advanced AI integration
- Real-time chat features
- Analytics dashboard

### Scalability Considerations

- Load balancing for multiple instances
- Database clustering
- CDN for static assets
- Caching strategies

## Support

For deployment issues:

1. Check the logs for error messages
2. Verify environment variables are set correctly
3. Ensure all dependencies are installed
4. Test locally before deploying

## License

This project is licensed under the MIT License.
