# AI Content Enhancer - Quick Start Guide

## 🚀 Setup (5 minutes)

### 1. Get a FREE Gemini API Key
1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key"
4. Copy the key

### 2. Configure Environment
```bash
cd EduVisual/backend
cp .env.example .env
```

Edit `.env` and add your key:
```env
AI_PROVIDER=gemini
GEMINI_API_KEY=paste_your_key_here
```

### 3. Test It Works
```bash
node services/testAiEnhancer.js
```

You should see enhanced content with summaries, clarifications, and suggestions!

## 💻 Use in Your Routes (Copy & Paste)

### Simple Route Example
```javascript
import { enhanceContent } from './services/aiEnhancer.js';

app.post('/api/enhance', async (req, res) => {
  try {
    const { content, topic } = req.body;
    const result = await enhanceContent(content, { topic });
    
    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### What You Send (Frontend → Backend)
```json
{
  "content": "Your lecture text here...",
  "topic": "Biology - Photosynthesis"
}
```

### What You Get Back (Backend → Frontend)
```json
{
  "success": true,
  "provider": "gemini",
  "data": {
    "summary": "Overall summary...",
    "sections": [
      {
        "title": "Section title",
        "summary": "Section summary",
        "clarifications": [...],
        "visualSuggestions": [...],
        "activitySuggestions": [...]
      }
    ],
    "overallSuggestions": {
      "keyTakeaways": [...],
      "recommendedVisuals": [...],
      "recommendedActivities": [...]
    }
  }
}
```

## 📁 Files Created

```
EduVisual/backend/
├── services/
│   ├── aiEnhancer.js                    ← Main service (import this)
│   ├── testAiEnhancer.js                ← Test script
│   ├── AI_ENHANCER_INTEGRATION_GUIDE.md ← Full documentation
│   └── QUICK_START.md                   ← This file
├── .env.example                          ← Environment template
└── .env                                  ← Your config (create this)
```

## ✅ Integration Checklist

- [ ] Get Gemini API key
- [ ] Create `.env` file with API key
- [ ] Run test script: `node services/testAiEnhancer.js`
- [ ] Import service in your route file
- [ ] Add POST endpoint for enhancement
- [ ] Test with curl or Postman
- [ ] Connect to frontend

## 🧪 Test with curl

```bash
curl -X POST http://localhost:5000/api/enhance \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Photosynthesis is the process by which plants convert light energy into chemical energy.",
    "topic": "Biology"
  }'
```

## 📖 Need More Details?

See `AI_ENHANCER_INTEGRATION_GUIDE.md` for:
- Complete API reference
- Error handling examples
- Advanced integration patterns
- Troubleshooting guide

## 🆘 Common Issues

**"API key not configured"**
→ Check `.env` file exists and has `GEMINI_API_KEY=your_key`

**"Module not found"**
→ Make sure you're importing from `./services/aiEnhancer.js`

**Test script fails**
→ Run `npm install` to ensure dependencies are installed

## 💡 Pro Tips

1. **Free Tier**: Gemini 1.5 Flash has a generous free tier
2. **Response Time**: Usually 2-5 seconds per request
3. **Content Length**: Works best with 100-5000 words
4. **Topic Field**: Optional but improves results
5. **Error Handling**: Always check `result.success` before using data

---

**Ready to integrate?** Start with the simple route example above! 🎉

