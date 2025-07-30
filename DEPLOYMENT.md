# 🚀 Chatbot App Deployment Guide

## Quick Deploy Options

### Option 1: Railway (Recommended - Easiest)

1. **Sign up** at https://railway.app
2. **Connect your GitHub repository**
3. **Deploy automatically** - Railway will detect your Docker setup

**Steps:**

```bash
# 1. Push your code to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# 2. Go to Railway.app and connect your repo
# 3. Railway will automatically deploy using your Dockerfile
```

### Option 2: Render

1. **Sign up** at https://render.com
2. **Create a new Web Service**
3. **Connect your GitHub repository**
4. **Configure:**
   - Build Command: `pip install -r app/requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Option 3: Heroku

1. **Install Heroku CLI**
2. **Create Heroku app:**

```bash
heroku create your-chatbot-app
heroku container:push web
heroku container:release web
```

### Option 4: Vercel (Frontend) + Railway (Backend)

**Frontend (Vercel):**

1. Deploy `client/` folder to Vercel
2. Set build command: `npm run build`
3. Set output directory: `build`

**Backend (Railway):**

1. Deploy `app/` folder to Railway
2. Railway will use the Dockerfile automatically

## Local Development

### With Docker:

```bash
docker compose up --build
```

### Without Docker:

```bash
# Backend
cd app
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend (in another terminal)
cd client
npm install
npm start
```

## Environment Variables

If you need to add environment variables later:

- **Railway:** Add in the Railway dashboard
- **Render:** Add in the Render dashboard
- **Heroku:** `heroku config:set KEY=value`

## Custom Domain

After deployment:

1. **Railway:** Add custom domain in dashboard
2. **Render:** Add custom domain in dashboard
3. **Heroku:** `heroku domains:add yourdomain.com`

## Monitoring

- **Railway:** Built-in monitoring
- **Render:** Built-in monitoring
- **Heroku:** `heroku logs --tail`

## Troubleshooting

### Common Issues:

1. **Port issues:** Make sure your app uses `$PORT` environment variable
2. **Dependencies:** Ensure all requirements are in `requirements.txt`
3. **Static files:** Make sure static files are properly served

### Debug Commands:

```bash
# Check if app runs locally
cd app
python -m uvicorn main:app --reload

# Test Docker build
docker build -t chatbot .
docker run -p 8000:8000 chatbot
```
