# EduVisual 🎓✨

**Transform your lectures into engaging, interactive lessons with AI-powered visuals and questions.**

EduVisual is an AI-powered tool designed for professors to automatically enhance their lecture materials with visual elements, interactive questions, and clear explanations. It solves the problem of text-heavy, static lecture content by making it more visually appealing and engaging for students.

## 🎯 Problem Statement

Professors often struggle to create visually engaging and interactive lecture materials. Traditional slides and notes tend to be text-heavy and static, making it difficult for students—especially visual and auditory learners—to stay attentive and retain key concepts. While AI tools like Turbo AI and Notion assist students in summarizing content, there is no purpose-built solution for educators to automatically transform their raw materials into visually enhanced, interactive lessons.

## ✨ Solution

EduVisual provides a complete MVP pipeline that transforms raw lecture content into polished, interactive lessons through:

1. **Content Upload & Parsing** - Upload or paste lecture content in text or PDF format
2. **AI Enhancement** - Automatic summarization, clarification, and visual suggestions
3. **Visual Generation** - Contextually relevant images from Unsplash
4. **Question Generation** - Auto-generated reflective, true/false, and multiple-choice questions
5. **Export Options** - Download as PowerPoint, PDF, or JSON

## 🚀 Features

### Feature 1: Upload or Paste Lecture Content ✅
- **Text Input**: Paste lecture content directly
- **File Upload**: Support for `.txt` and `.pdf` formats
- **Content Parsing**: Automatic extraction of main topics and subtopics
- **Validation**: Robust error handling and input validation

### Feature 2: AI Content Enhancer ✅
- **Summarization**: Break down content into digestible sections
- **Clarification**: Add simple explanations for complex concepts
- **Visual Suggestions**: Identify optimal placement for visuals
- **Activity Recommendations**: Suggest interactive elements

### Feature 3: Auto Visual Generator ✅
- **Unsplash Integration**: Fetch contextually relevant images
- **Keyword Extraction**: Intelligent topic-based image search
- **Fallback Support**: Mock visuals when API unavailable
- **Multiple Images**: 3 image suggestions per topic

### Feature 4: Interactive Question Generator ✅
- **Multiple Question Types**: Reflective, true/false, multiple-choice
- **2-3 Questions Per Section**: Optimal learning reinforcement
- **Explanations**: Detailed answers and reasoning
- **Flexible Generation**: Per-section or bulk generation

### Feature 5: Preview & Export ✅
- **PowerPoint Export**: Professional presentation format
- **PDF Export**: Print-ready document format
- **JSON Export**: Data format for integration
- **Live Preview**: See enhanced content before export

## 📋 Tech Stack

### Backend
- **Framework**: Express.js (Node.js)
- **AI Services**: 
  - Google Gemini 1.5 Flash (Content Enhancement & Questions)
  - Unsplash API (Visual Generation)
- **Export**: 
  - PptxGenJs (PowerPoint)
  - HTML2PDF (PDF)
- **File Handling**: Multer, PDF-Parse

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Routing**: React Router v6
- **UI Components**: Custom + Lucide Icons

### Database
- Currently file-based (localStorage on frontend)
- Ready for MongoDB/PostgreSQL integration

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Git
- API Keys:
  - [Google Gemini API Key](https://makersuite.google.com/app/apikey) (Free)
  - [Unsplash API Key](https://unsplash.com/oauth/applications) (Free)

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
# AI Provider Configuration
AI_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_api_key_here

# Visual Generator Configuration
UNSPLASH_API_KEY=your_unsplash_api_key_here

# Server Configuration
PORT=5001
NODE_ENV=development
EOF

# Start the backend server
npm start
```

The backend will run on `http://localhost:5001`

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
cat > .env.local << EOF
VITE_API_URL=http://localhost:5001
EOF

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📚 API Endpoints

### Health & Status
- `GET /` - Health check
- `GET /api/ai-status` - AI service status
- `GET /api/visual-status` - Visual generator status

### Feature 1: Content Upload
- `POST /api/lectures/text` - Upload text content
  ```json
  {
    "content": "Your lecture text...",
    "title": "Lecture Title (optional)"
  }
  ```

### Feature 2: AI Enhancement
- `POST /api/lectures/enhance` - Enhance content with AI
  ```json
  {
    "content": "Your lecture text...",
    "topic": "Topic (optional)"
  }
  ```

### Feature 3: Visual Generation
- `POST /api/lectures/suggest-visuals` - Generate visual suggestions
  ```json
  {
    "topics": ["Topic 1", "Topic 2", "Topic 3"]
  }
  ```

### Feature 4: Question Generation
- `POST /api/lectures/generate-questions` - Generate questions
  ```json
  {
    "content": "Your lecture text...",
    "topic": "Topic (optional)",
    "count": 3
  }
  ```

- `POST /api/lectures/generate-questions-sections` - Generate questions for sections
  ```json
  {
    "sections": [
      {
        "title": "Section 1",
        "content": "Content..."
      }
    ],
    "questionsPerSection": 2
  }
  ```

### Feature 5: Export
- `POST /api/lectures/export/powerpoint` - Export to PowerPoint
- `POST /api/lectures/export/pdf` - Export to PDF
- `POST /api/lectures/export/json` - Export to JSON

All export endpoints accept:
```json
{
  "lectureData": { /* lecture object */ },
  "filename": "output.pptx"
}
```

## 🎮 Usage Workflow

### Step 1: Upload Content
```bash
curl -X POST http://localhost:5001/api/lectures/text \
  -H "Content-Type: application/json" \
  -d '{
    "content": "1. Introduction to Machine Learning\n- What is ML\n- Types of ML",
    "title": "ML Basics"
  }'
```

### Step 2: Enhance with AI
```bash
curl -X POST http://localhost:5001/api/lectures/enhance \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Your lecture content...",
    "topic": "Machine Learning"
  }'
```

### Step 3: Generate Visuals
```bash
curl -X POST http://localhost:5001/api/lectures/suggest-visuals \
  -H "Content-Type: application/json" \
  -d '{
    "topics": ["Machine Learning", "Neural Networks", "Deep Learning"]
  }'
```

### Step 4: Generate Questions
```bash
curl -X POST http://localhost:5001/api/lectures/generate-questions \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Your lecture content...",
    "topic": "Machine Learning",
    "count": 3
  }'
```

### Step 5: Export
```bash
curl -X POST http://localhost:5001/api/lectures/export/powerpoint \
  -H "Content-Type: application/json" \
  -d '{
    "lectureData": { /* complete lecture object */ },
    "filename": "my_lecture.pptx"
  }'
```

## 📁 Project Structure

```
EduVisual/
├── backend/
│   ├── services/
│   │   ├── aiEnhancer.js           # AI content enhancement
│   │   ├── visualGenerator.js       # Unsplash integration
│   │   ├── questionGenerator.js     # Question generation
│   │   ├── exportService.js         # Export functionality
│   │   └── README.md                # Service documentation
│   ├── index.js                     # Main server file
│   ├── package.json
│   └── .env                         # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── components/              # React components
│   │   ├── pages/                   # Page components
│   │   ├── services/                # API services
│   │   ├── context/                 # React context
│   │   ├── hooks/                   # Custom hooks
│   │   └── App.jsx                  # Main app component
│   ├── package.json
│   └── .env.local                   # Frontend env variables
│
└── README.md                         # This file
```

## 🔑 Environment Variables

### Backend (.env)
```env
# AI Provider
AI_PROVIDER=gemini
GEMINI_API_KEY=your_key_here

# Visual Generator
UNSPLASH_API_KEY=your_key_here

# Server
PORT=5001
NODE_ENV=development
```

### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:5001
```

## 🧪 Testing

### Test Backend Endpoints
```bash
# Test health check
curl http://localhost:5001/

# Test text upload
curl -X POST http://localhost:5001/api/lectures/text \
  -H "Content-Type: application/json" \
  -d '{"content": "This is a test lecture about machine learning. Machine learning is a subset of artificial intelligence."}'

# Test AI enhancement
curl -X POST http://localhost:5001/api/lectures/enhance \
  -H "Content-Type: application/json" \
  -d '{"content": "Machine learning basics...", "topic": "ML"}'
```

### Test Frontend
1. Open `http://localhost:5173` in your browser
2. Navigate to Upload page
3. Paste or upload lecture content
4. View enhanced content with visuals and questions
5. Export to desired format

## 🎨 Design Highlights

### User Experience
- **Intuitive Interface**: Clean, modern design with Tailwind CSS
- **Dark Mode Support**: Comfortable viewing in any lighting
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Feedback**: Loading states and progress indicators

### Technical Excellence
- **Modular Architecture**: Separated concerns (services, controllers, routes)
- **Error Handling**: Comprehensive error messages and fallbacks
- **API Integration**: Seamless integration with Gemini and Unsplash
- **Performance**: Optimized for fast content processing

## 🚀 Deployment

### Backend Deployment (Heroku/Railway)
```bash
# Create Procfile
echo "web: node index.js" > Procfile

# Deploy
git push heroku main
```

### Frontend Deployment (Vercel/Netlify)
```bash
# Build
npm run build

# Deploy
vercel deploy
```

## 📊 Evaluation Criteria Alignment

### 1. Creativity & Innovation (25%)
- **Novel Approach**: Combines multiple AI services (Gemini + Unsplash) for comprehensive enhancement
- **Unique Features**: Automatic topic extraction, multi-format export, fallback mechanisms
- **Smart Integration**: Seamless workflow from upload to export

### 2. Problem Relevance & Impact (20%)
- **Real Problem**: Addresses genuine pain point for educators
- **Clear Value**: Saves time, improves student engagement, enhances learning outcomes
- **Scalable Solution**: Works for any subject matter

### 3. Technical Execution (25%)
- **Clean Architecture**: Well-organized code with separation of concerns
- **Robust Implementation**: Error handling, validation, fallbacks
- **API Integration**: Proper use of Gemini and Unsplash APIs
- **Performance**: Optimized for speed and reliability

### 4. User Experience & Design (15%)
- **Polished UI**: Modern, intuitive interface
- **Accessibility**: Clear navigation, helpful feedback
- **Responsive**: Works across devices
- **Professional**: Production-ready appearance

### 5. Presentation & Communication (15%)
- **Clear Documentation**: Comprehensive README with examples
- **Easy Setup**: Simple installation and configuration
- **Well-Commented Code**: Self-documenting code
- **Demo-Ready**: Quick start guide included

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

- **Project**: EduVisual - UVEC 2025 Hackathon
- **Date**: October 19, 2025
- **Duration**: 9:15 AM - 4:30 PM

## 🙏 Acknowledgments

- Google Gemini API for AI capabilities
- Unsplash for beautiful, free images
- React and Express communities
- UVEC 2025 Hackathon organizers

## 📞 Support

For issues, questions, or suggestions:
1. Check the documentation in `/backend/services/README.md`
2. Review API examples in this README
3. Check error messages and logs
4. Open an issue on GitHub

---

**Made with ❤️ for educators and students**

