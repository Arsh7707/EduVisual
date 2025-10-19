# AI Content Enhancer - Integration Guide

## Overview
The AI Content Enhancer service provides intelligent content enhancement for educational materials using either Google Gemini 1.5 Flash or OpenAI GPT-4o-mini.

## Setup Instructions

### 1. Environment Configuration
Copy `.env.example` to `.env` and add your API key:

```bash
cp .env.example .env
```

Then edit `.env` and add your API key:

**For Gemini (Recommended - Free tier available):**
```env
AI_PROVIDER=gemini
GEMINI_API_KEY=your_actual_gemini_api_key
```

**For OpenAI:**
```env
AI_PROVIDER=openai
OPENAI_API_KEY=your_actual_openai_api_key
```

### 2. Get API Keys

**Gemini API Key:**
- Visit: https://makersuite.google.com/app/apikey
- Sign in with Google account
- Click "Create API Key"
- Copy the key to your `.env` file

**OpenAI API Key:**
- Visit: https://platform.openai.com/api-keys
- Sign in or create account
- Click "Create new secret key"
- Copy the key to your `.env` file

## Module API Reference

### Import the Service

```javascript
import { enhanceContent, checkConfiguration } from './services/aiEnhancer.js';
// OR
import aiEnhancer from './services/aiEnhancer.js';
```

### Function: `enhanceContent(content, options)`

Enhances lecture content with AI-powered summaries, clarifications, and suggestions.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `content` | string | Yes | The lecture content to enhance (plain text) |
| `options` | object | No | Configuration options |
| `options.provider` | string | No | Override AI provider ('gemini' or 'openai') |
| `options.topic` | string | No | Topic/subject for better context |

#### Returns

Returns a Promise that resolves to an object with the following structure:

```javascript
{
  success: true,
  provider: 'gemini', // or 'openai'
  data: {
    summary: "Brief overall summary of the lecture",
    sections: [
      {
        title: "Section title",
        content: "Original content",
        summary: "Section summary",
        clarifications: [
          {
            term: "Complex term",
            explanation: "Simple explanation"
          }
        ],
        visualSuggestions: [
          {
            type: "diagram|chart|image|infographic",
            description: "What to show",
            placement: "before|after|inline",
            reason: "Why it helps"
          }
        ],
        activitySuggestions: [
          {
            type: "quiz|exercise|simulation|discussion",
            description: "What the activity involves",
            placement: "before|after|inline",
            reason: "Why it helps"
          }
        ]
      }
    ],
    overallSuggestions: {
      keyTakeaways: ["Key point 1", "Key point 2"],
      recommendedVisuals: ["Visual recommendation 1"],
      recommendedActivities: ["Activity recommendation 1"]
    }
  },
  metadata: {
    originalLength: 1234,
    processedAt: "2025-10-19T12:00:00.000Z",
    topic: "Photosynthesis"
  }
}
```

#### Error Response

If enhancement fails:

```javascript
{
  success: false,
  error: "Error message",
  provider: 'gemini',
  metadata: {
    originalLength: 1234,
    processedAt: "2025-10-19T12:00:00.000Z",
    topic: "Not specified"
  }
}
```

### Function: `checkConfiguration()`

Validates that the AI service is properly configured.

#### Returns

```javascript
{
  configured: true,
  provider: 'gemini',
  message: 'Gemini AI is configured and ready'
}
```

## Integration Examples

### Example 1: Basic Route Integration

```javascript
// In your routes file (e.g., routes/content.js)
import express from 'express';
import { enhanceContent } from '../services/aiEnhancer.js';

const router = express.Router();

router.post('/enhance', async (req, res) => {
  try {
    const { content, topic } = req.body;
    
    // Validate input
    if (!content) {
      return res.status(400).json({
        error: 'Content is required'
      });
    }
    
    // Enhance the content
    const result = await enhanceContent(content, { topic });
    
    // Return result
    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json({
        error: result.error,
        details: result
      });
    }
  } catch (error) {
    console.error('Enhancement route error:', error);
    res.status(500).json({
      error: 'Failed to enhance content',
      message: error.message
    });
  }
});

export default router;
```

### Example 2: Integration with File Upload

```javascript
// After extracting text from uploaded file
import { enhanceContent } from '../services/aiEnhancer.js';

router.post('/upload-and-enhance', upload.single('file'), async (req, res) => {
  try {
    // Assume you've extracted text from the file
    const extractedText = req.extractedText; // Your extraction logic
    const topic = req.body.topic;
    
    // Enhance the extracted content
    const enhanced = await enhanceContent(extractedText, { topic });
    
    res.json({
      original: extractedText,
      enhanced: enhanced.data,
      metadata: enhanced.metadata
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### Example 3: Health Check Endpoint

```javascript
import { checkConfiguration } from '../services/aiEnhancer.js';

router.get('/ai-status', (req, res) => {
  const status = checkConfiguration();
  res.json(status);
});
```

### Example 4: Using in index.js (if needed)

```javascript
// In index.js - only if you want to add routes directly
import { enhanceContent, checkConfiguration } from './services/aiEnhancer.js';

// Health check
app.get('/api/ai-status', (req, res) => {
  res.json(checkConfiguration());
});

// Enhancement endpoint
app.post('/api/enhance', async (req, res) => {
  try {
    const { content, topic } = req.body;
    const result = await enhanceContent(content, { topic });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## Expected Input Format

### Simple Text Input
```json
{
  "content": "Photosynthesis is the process by which plants convert light energy into chemical energy...",
  "topic": "Biology - Photosynthesis"
}
```

### After Text Extraction from File
```json
{
  "content": "Chapter 1: Introduction to Quantum Mechanics\n\nQuantum mechanics is a fundamental theory...",
  "topic": "Physics - Quantum Mechanics"
}
```

## Expected Output Format

The enhanced content will have this structure:

```json
{
  "success": true,
  "provider": "gemini",
  "data": {
    "summary": "This lecture covers photosynthesis, explaining how plants convert light into energy through chlorophyll and the Calvin cycle.",
    "sections": [
      {
        "title": "Introduction to Photosynthesis",
        "content": "Photosynthesis is the process...",
        "summary": "Plants use light energy to create glucose",
        "clarifications": [
          {
            "term": "Chlorophyll",
            "explanation": "The green pigment in plants that captures light energy"
          }
        ],
        "visualSuggestions": [
          {
            "type": "diagram",
            "description": "Diagram showing the structure of a chloroplast with labeled parts",
            "placement": "after",
            "reason": "Visual representation helps students understand where photosynthesis occurs"
          }
        ],
        "activitySuggestions": [
          {
            "type": "quiz",
            "description": "Multiple choice quiz on the basic components of photosynthesis",
            "placement": "after",
            "reason": "Reinforces understanding of key concepts"
          }
        ]
      }
    ],
    "overallSuggestions": {
      "keyTakeaways": [
        "Photosynthesis converts light energy to chemical energy",
        "Chlorophyll is essential for capturing light",
        "The process produces oxygen as a byproduct"
      ],
      "recommendedVisuals": [
        "Animated diagram of the light-dependent reactions",
        "Comparison chart of C3, C4, and CAM photosynthesis"
      ],
      "recommendedActivities": [
        "Virtual lab simulation of photosynthesis rate experiments",
        "Group discussion on the importance of photosynthesis for life on Earth"
      ]
    }
  },
  "metadata": {
    "originalLength": 1523,
    "processedAt": "2025-10-19T12:00:00.000Z",
    "topic": "Biology - Photosynthesis"
  }
}
```

## Error Handling

Always wrap calls in try-catch blocks:

```javascript
try {
  const result = await enhanceContent(content, { topic });
  
  if (!result.success) {
    // Handle enhancement failure
    console.error('Enhancement failed:', result.error);
    return res.status(500).json({ error: result.error });
  }
  
  // Success - use result.data
  res.json(result);
} catch (error) {
  // Handle unexpected errors
  console.error('Unexpected error:', error);
  res.status(500).json({ error: 'Internal server error' });
}
```

## Testing the Service

### Test with curl

```bash
curl -X POST http://localhost:5000/api/enhance \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Photosynthesis is the process by which plants convert light energy into chemical energy stored in glucose.",
    "topic": "Biology"
  }'
```

### Test Configuration

```bash
curl http://localhost:5000/api/ai-status
```

## Performance Considerations

- **Response Time**: Typically 2-5 seconds depending on content length
- **Content Length**: Works best with 100-5000 words
- **Rate Limits**: 
  - Gemini: 60 requests per minute (free tier)
  - OpenAI: Depends on your plan
- **Cost**:
  - Gemini 1.5 Flash: Free tier available
  - GPT-4o-mini: ~$0.15 per 1M input tokens

## Troubleshooting

### "API key not configured" error
- Check that `.env` file exists in backend directory
- Verify API key is correctly set
- Restart the server after changing `.env`

### "Invalid AI provider" error
- Check `AI_PROVIDER` in `.env` is either 'gemini' or 'openai'

### JSON parsing errors
- The service handles markdown code blocks automatically
- If issues persist, check API response format

## Next Steps for Integration

1. ✅ Service is ready to use
2. Create your route handler (see examples above)
3. Add the route to your Express app
4. Test with sample content
5. Integrate with your file upload feature
6. Add frontend integration

## Questions?

If you need help integrating this service, check:
- The function signatures in `aiEnhancer.js`
- The examples in this guide
- Test the service independently before integrating

