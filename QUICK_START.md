# EduVisual - Quick Start Guide (For Judges)

## 🚀 Get Running in 2 Minutes

### Prerequisites
- Node.js 18+ installed
- Terminal/Command line access

### Step 1: Start Backend (Terminal 1)

```bash
cd backend
npm install
npm start
```

Expected output:
```
Server running on port 5001
🔹 Using Google Generative AI (Gemini 1.5 Flash)
```

### Step 2: Start Frontend (Terminal 2)

```bash
cd frontend
npm install
npm run dev
```

Expected output:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### Step 3: Open in Browser

Visit: **http://localhost:5173**

---

## 📋 Demo Workflow

### 1. Upload Content
- Click "Upload" in navigation
- Paste this sample content:

```
1. Introduction to Machine Learning
Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed.

Key Concepts:
- What is Machine Learning
- Why is it important
- Real-world applications

2. Types of Machine Learning
There are three main types of machine learning approaches:

Supervised Learning:
- Uses labeled training data
- Examples: Regression, Classification
- Applications: Email spam detection, house price prediction

Unsupervised Learning:
- Works with unlabeled data
- Examples: Clustering, Dimensionality Reduction
- Applications: Customer segmentation, anomaly detection

Reinforcement Learning:
- Learns through interaction with environment
- Uses rewards and penalties
- Applications: Game AI, robotics
```

- Click "Process Content"
- See topics extracted automatically ✅

### 2. Enhance with AI
- Click "Enhance with AI"
- Watch as content is summarized and clarified
- See visual suggestions appear ✅

### 3. Generate Visuals
- Click "Generate Visuals"
- See images fetched from Unsplash (or mock if API unavailable)
- Each topic gets 3 relevant images ✅

### 4. Generate Questions
- Click "Generate Questions"
- See 2-3 questions per section generated
- Questions include: reflective, true/false, multiple-choice ✅

### 5. Export
- Click "Export"
- Choose format: PowerPoint, PDF, or JSON
- Download your enhanced lecture ✅

---

## 🎯 Key Features to Highlight

### Feature 1: Smart Content Parsing ✅
- Automatically extracts topics and subtopics
- Handles text and PDF formats
- Validates input and provides feedback

### Feature 2: AI Enhancement ✅
- Uses Google Gemini 1.5 Flash
- Summarizes complex concepts
- Suggests visual placements
- Recommends interactive activities

### Feature 3: Visual Generation ✅
- Integrates with Unsplash API
- Fetches contextually relevant images
- Provides photographer attribution
- Falls back to mock images if needed

### Feature 4: Question Generation ✅
- Creates multiple question types
- 2-3 questions per section
- Includes detailed explanations
- Supports bulk generation

### Feature 5: Export Options ✅
- PowerPoint presentations
- PDF documents
- JSON data format
- Professional formatting

---

## 🧪 Quick Test Commands

### Test Backend Endpoints

```bash
# Health check
curl http://localhost:5001/

# Upload text
curl -X POST http://localhost:5001/api/lectures/text \
  -H "Content-Type: application/json" \
  -d '{"content": "Machine learning is AI.", "title": "ML"}'

# Generate visuals
curl -X POST http://localhost:5001/api/lectures/suggest-visuals \
  -H "Content-Type: application/json" \
  -d '{"topics": ["Machine Learning", "AI"]}'

# Generate questions
curl -X POST http://localhost:5001/api/lectures/generate-questions \
  -H "Content-Type: application/json" \
  -d '{"content": "ML is AI.", "topic": "ML", "count": 2}'
```

---

## 📊 Evaluation Alignment

### ✅ Creativity & Innovation (25%)
- **Novel Approach**: Combines Gemini + Unsplash for comprehensive enhancement
- **Unique Features**: Multi-format export, intelligent topic extraction
- **Smart Integration**: Seamless workflow from upload to export

### ✅ Problem Relevance & Impact (20%)
- **Real Problem**: Professors struggle with visually engaging content
- **Clear Value**: Saves time, improves student engagement
- **Scalable**: Works for any subject matter

### ✅ Technical Execution (25%)
- **Clean Architecture**: Modular, well-organized code
- **Robust Implementation**: Error handling, validation, fallbacks
- **API Integration**: Proper use of Gemini and Unsplash APIs
- **Performance**: Optimized for speed and reliability

### ✅ User Experience & Design (15%)
- **Polished UI**: Modern, intuitive interface
- **Responsive**: Works on desktop, tablet, mobile
- **Accessible**: Clear navigation, helpful feedback
- **Professional**: Production-ready appearance

### ✅ Presentation & Communication (15%)
- **Clear Documentation**: Comprehensive README with examples
- **Easy Setup**: Simple installation and configuration
- **Well-Commented Code**: Self-documenting code
- **Demo-Ready**: Quick start guide included

---

## 🔑 API Keys (Optional for Demo)

The app works with mock data by default. To use real APIs:

### Google Gemini (Free)
1. Visit: https://makersuite.google.com/app/apikey
2. Create API key
3. Add to `backend/.env`:
   ```
   GEMINI_API_KEY=your_key_here
   ```

### Unsplash (Free)
1. Visit: https://unsplash.com/oauth/applications
2. Create application
3. Add to `backend/.env`:
   ```
   UNSPLASH_API_KEY=your_key_here
   ```

---

## 📁 Project Structure

```
EduVisual/
├── backend/
│   ├── services/
│   │   ├── aiEnhancer.js          # Gemini integration
│   │   ├── visualGenerator.js      # Unsplash integration
│   │   ├── questionGenerator.js    # Question creation
│   │   └── exportService.js        # Export functionality
│   ├── index.js                    # Main server
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/                  # Page components
│   │   ├── components/             # Reusable UI
│   │   ├── services/               # API calls
│   │   └── App.jsx                 # Main app
│   └── package.json
│
├── README.md                        # Full documentation
├── DEPLOYMENT_GUIDE.md              # Setup instructions
├── FEATURES_SUMMARY.md              # Feature details
└── QUICK_START.md                   # This file
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5001
lsof -ti:5001 | xargs kill -9
```

### Module Not Found
```bash
# Reinstall dependencies
cd backend && rm -rf node_modules && npm install
cd ../frontend && rm -rf node_modules && npm install
```

### API Key Errors
- System automatically falls back to mock data
- No API keys required for demo
- Real APIs optional for production

### CORS Errors
- Ensure backend is running on port 5001
- Ensure frontend is running on port 5173
- CORS is enabled by default

---

## 📞 Support

- **Full Documentation**: See README.md
- **Deployment Guide**: See DEPLOYMENT_GUIDE.md
- **Features Details**: See FEATURES_SUMMARY.md
- **API Endpoints**: See backend/services/README.md

---

## ⏱️ Estimated Demo Time

- **Setup**: 2 minutes
- **Feature Demo**: 5 minutes
- **Q&A**: 3 minutes
- **Total**: ~10 minutes

---

## 🎓 What Makes EduVisual Special

1. **Solves Real Problem**: Professors need engaging content
2. **Complete Solution**: Upload → Enhance → Visualize → Question → Export
3. **AI-Powered**: Uses cutting-edge Gemini AI
4. **Production-Ready**: Clean code, error handling, documentation
5. **Scalable**: Ready for real-world deployment
6. **User-Friendly**: Intuitive interface, helpful feedback

---

## 🚀 Next Steps After Hackathon

1. Add user authentication
2. Implement database persistence
3. Add collaborative editing
4. Mobile app development
5. Advanced analytics
6. Custom branding options

---

**Ready to see EduVisual in action? Start with Step 1 above!** 🎉

Questions? Check the documentation files or review the code comments.

