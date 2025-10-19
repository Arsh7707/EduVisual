# AI Content Enhancer Service

## 📋 Overview

This service provides AI-powered content enhancement for the EduVisual project (UVEC 2025 Hackathon). It uses Google Gemini 1.5 Flash or OpenAI GPT-4o-mini to:

1. **Summarize** uploaded lecture content into digestible sections
2. **Clarify** complex concepts with simple explanations
3. **Suggest** optimal placement for visuals (diagrams, charts, images)
4. **Recommend** interactive activities (quizzes, exercises, simulations)

## 🎯 Features

- ✅ **Dual AI Support**: Works with both Gemini and OpenAI
- ✅ **Modular Design**: Easy to integrate without touching existing routes
- ✅ **Comprehensive Output**: Structured JSON with summaries, clarifications, and suggestions
- ✅ **Error Handling**: Graceful error handling with detailed error messages
- ✅ **Environment-based Config**: Secure API key management via .env
- ✅ **Well Documented**: Complete integration guide and examples

## 📁 Files in This Directory

| File | Purpose |
|------|---------|
| `aiEnhancer.js` | Main service module - import this in your routes |
| `testAiEnhancer.js` | Test script to verify the service works |
| `QUICK_START.md` | 5-minute setup guide |
| `AI_ENHANCER_INTEGRATION_GUIDE.md` | Complete documentation with examples |
| `README.md` | This file - overview and navigation |

## 🚀 Quick Start

### 1. Setup (2 minutes)
```bash
# Get a FREE Gemini API key from:
# https://makersuite.google.com/app/apikey

# Create .env file
cp .env.example .env

# Add your API key to .env
# AI_PROVIDER=gemini
# GEMINI_API_KEY=your_key_here
```

### 2. Test (1 minute)
```bash
node services/testAiEnhancer.js
```

### 3. Integrate (2 minutes)
```javascript
import { enhanceContent } from './services/aiEnhancer.js';

app.post('/api/enhance', async (req, res) => {
  const { content, topic } = req.body;
  const result = await enhanceContent(content, { topic });
  res.json(result);
});
```

## 📚 Documentation

- **New to this?** → Start with `QUICK_START.md`
- **Ready to integrate?** → See `AI_ENHANCER_INTEGRATION_GUIDE.md`
- **Want to test?** → Run `node services/testAiEnhancer.js`
- **Need API reference?** → Check function docs in `aiEnhancer.js`

## 🔧 API Reference (Quick)

### `enhanceContent(content, options)`

**Input:**
```javascript
await enhanceContent("Your lecture text...", {
  topic: "Biology - Photosynthesis"  // optional
});
```

**Output:**
```javascript
{
  success: true,
  provider: "gemini",
  data: {
    summary: "Overall summary...",
    sections: [...],           // Detailed section breakdowns
    overallSuggestions: {...}  // Key takeaways and recommendations
  },
  metadata: {...}
}
```

### `checkConfiguration()`

**Returns:**
```javascript
{
  configured: true,
  provider: "gemini",
  message: "Gemini AI is configured and ready"
}
```

## 🎨 What You Get

For each piece of content, the AI provides:

### 📝 Summaries
- Overall lecture summary
- Section-by-section summaries
- Key takeaways

### 💡 Clarifications
- Simple explanations for complex terms
- Context for technical concepts
- Definitions for jargon

### 🎨 Visual Suggestions
- Type: diagram, chart, image, infographic
- Description of what to show
- Placement: before, after, or inline
- Reason why it helps learning

### 🎯 Activity Suggestions
- Type: quiz, exercise, simulation, discussion
- Description of the activity
- Placement recommendation
- Educational benefit

## 🔐 Security

- API keys stored in `.env` (not committed to git)
- `.env.example` provided as template
- No hardcoded credentials
- Environment-based configuration

## 💰 Cost & Performance

### Gemini 1.5 Flash (Recommended)
- **Cost**: FREE tier available
- **Speed**: 2-5 seconds per request
- **Limit**: 60 requests/minute (free tier)

### OpenAI GPT-4o-mini
- **Cost**: ~$0.15 per 1M input tokens
- **Speed**: 2-4 seconds per request
- **Limit**: Depends on your plan

## 🤝 Integration with Your Friend's Work

This service is designed to **avoid merge conflicts**:

- ✅ Separate `services/` directory
- ✅ No modifications to `index.js`
- ✅ No route definitions included
- ✅ Pure service module - import and use
- ✅ Your friend can add routes independently

## 🧪 Testing

### Test the Service
```bash
node services/testAiEnhancer.js
```

### Test via API (after integration)
```bash
curl -X POST http://localhost:5000/api/enhance \
  -H "Content-Type: application/json" \
  -d '{"content": "Your text...", "topic": "Biology"}'
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "API key not configured" | Check `.env` file has correct key |
| "Module not found" | Run `npm install` |
| JSON parsing errors | Service handles this automatically |
| Slow responses | Normal for AI - 2-5 seconds expected |

## 📞 Support

1. Check `QUICK_START.md` for setup issues
2. See `AI_ENHANCER_INTEGRATION_GUIDE.md` for integration help
3. Run test script to verify configuration
4. Check console logs for detailed error messages

## 🎓 Example Use Cases

1. **Student uploads lecture notes** → Get summarized sections
2. **Teacher pastes textbook content** → Get clarifications added
3. **Content creator needs visuals** → Get placement suggestions
4. **Educator wants engagement** → Get activity recommendations

## 📦 Dependencies

- `@google/generative-ai` - Gemini API client
- `openai` - OpenAI API client
- `dotenv` - Environment variable management

All dependencies are already installed! ✅

## 🎉 Ready to Use

The service is **production-ready** and waiting for integration:

1. ✅ Dependencies installed
2. ✅ Service module created
3. ✅ Documentation complete
4. ✅ Test script ready
5. ✅ Examples provided

**Next step:** Follow `QUICK_START.md` to set up your API key and test!

---

**Built for UVEC 2025 Hackathon** 🚀

