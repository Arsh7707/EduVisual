# EduVisual - Deployment & Setup Guide

## Quick Start (5 minutes)

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Step 1: Clone & Install Backend

```bash
cd backend
npm install
```

### Step 2: Configure Environment

Create `.env` file in backend directory:

```env
# Get free API key from: https://makersuite.google.com/app/apikey
AI_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_api_key_here

# Get free API key from: https://unsplash.com/oauth/applications
UNSPLASH_API_KEY=your_unsplash_api_key_here

PORT=5001
NODE_ENV=development
```

### Step 3: Start Backend

```bash
npm start
```

Backend runs on `http://localhost:5001`

### Step 4: Install & Start Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

## API Keys Setup

### Google Gemini API (Free)

1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key to `.env`

**Features:**
- 60 requests per minute (free tier)
- Unlimited requests per day
- Perfect for MVP

### Unsplash API (Free)

1. Visit: https://unsplash.com/oauth/applications
2. Create new application
3. Accept terms
4. Copy Access Key to `.env`

**Features:**
- 50 requests per hour (free tier)
- High-quality images
- Fallback to mock images if unavailable

## Testing the MVP

### Test All Endpoints

```bash
cd backend
chmod +x test-mvp.sh
./test-mvp.sh
```

### Manual Testing

```bash
# Test health check
curl http://localhost:5001/

# Test text upload
curl -X POST http://localhost:5001/api/lectures/text \
  -H "Content-Type: application/json" \
  -d '{
    "content": "1. Introduction\nThis is a test lecture.",
    "title": "Test"
  }'

# Test visual generation
curl -X POST http://localhost:5001/api/lectures/suggest-visuals \
  -H "Content-Type: application/json" \
  -d '{"topics": ["Machine Learning", "AI"]}'

# Test question generation
curl -X POST http://localhost:5001/api/lectures/generate-questions \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Machine learning is AI.",
    "topic": "ML",
    "count": 2
  }'
```

## Production Deployment

### Backend (Heroku)

```bash
# Create Procfile
echo "web: node index.js" > Procfile

# Create .env on Heroku
heroku config:set GEMINI_API_KEY=your_key
heroku config:set UNSPLASH_API_KEY=your_key

# Deploy
git push heroku main
```

### Backend (Railway)

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
railway up
```

### Frontend (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Frontend (Netlify)

```bash
# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5001
lsof -ti:5001 | xargs kill -9

# Or use different port
PORT=5002 npm start
```

### API Key Errors

- Check `.env` file exists
- Verify API keys are correct
- Check API key quotas on provider dashboards
- System will fallback to mock data if API unavailable

### CORS Errors

- Ensure backend is running on correct port
- Check `VITE_API_URL` in frontend `.env.local`
- Verify CORS is enabled in backend (it is by default)

### Module Not Found

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Environment Variables Reference

### Backend (.env)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| AI_PROVIDER | Yes | gemini | AI service provider |
| GEMINI_API_KEY | Yes | - | Google Gemini API key |
| UNSPLASH_API_KEY | No | - | Unsplash API key |
| PORT | No | 5001 | Server port |
| NODE_ENV | No | development | Environment |

### Frontend (.env.local)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| VITE_API_URL | No | http://localhost:5001 | Backend API URL |

## Performance Optimization

### Backend
- Implement caching for repeated requests
- Use connection pooling for APIs
- Add rate limiting
- Compress responses with gzip

### Frontend
- Code splitting with React.lazy()
- Image optimization
- Service workers for offline support
- CDN for static assets

## Monitoring & Logging

### Backend Logs
```bash
# View logs
npm start 2>&1 | tee app.log

# Monitor with PM2
npm install -g pm2
pm2 start index.js --name "eduvisual"
pm2 logs eduvisual
```

### Frontend Errors
- Check browser console (F12)
- Check network tab for API calls
- Use React DevTools extension

## Security Checklist

- [ ] API keys stored in `.env` (not in code)
- [ ] CORS properly configured
- [ ] Input validation on all endpoints
- [ ] Error messages don't expose sensitive info
- [ ] Rate limiting implemented
- [ ] HTTPS enabled in production
- [ ] Environment variables set on production server

## Database Integration (Future)

When ready to add persistence:

```bash
# Install MongoDB driver
npm install mongoose

# Or PostgreSQL
npm install pg
```

Update backend to store:
- User accounts
- Lecture history
- Generated content
- Export history

## Scaling Considerations

1. **Horizontal Scaling**: Deploy multiple backend instances
2. **Load Balancing**: Use nginx or cloud provider LB
3. **Caching**: Redis for API responses
4. **Queue System**: Bull/RabbitMQ for async tasks
5. **CDN**: CloudFlare for static assets
6. **Database**: MongoDB Atlas or PostgreSQL managed service

## Support & Resources

- **Gemini API Docs**: https://ai.google.dev/
- **Unsplash API Docs**: https://unsplash.com/developers
- **Express.js Docs**: https://expressjs.com/
- **React Docs**: https://react.dev/
- **Vite Docs**: https://vitejs.dev/

## Next Steps

1. ✅ Set up local development environment
2. ✅ Configure API keys
3. ✅ Test all endpoints
4. ✅ Deploy backend to production
5. ✅ Deploy frontend to production
6. ✅ Set up monitoring
7. ✅ Add database persistence
8. ✅ Implement user authentication
9. ✅ Add payment processing (if needed)
10. ✅ Scale infrastructure

---

**Questions?** Check the main README.md or backend/services/README.md for more details.

