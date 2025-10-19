import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import { PDFParse } from "pdf-parse";
import { enhanceContent, checkConfiguration } from "./services/aiEnhancer.js";
import { generateVisuals, checkVisualConfiguration } from "./services/visualGenerator.js";
import { generateQuestions, generateQuestionsForSections } from "./services/questionGenerator.js";
import { exportToPowerPoint, exportToPDF, exportToJSON } from "./services/exportService.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['application/pdf', 'text/plain'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type. Only PDF and TXT files are allowed. Received: ${file.mimetype}`));
    }
  }
});

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "EduVisual backend is running 🚀",
    version: "1.0.0"
  });
});

// AI Status endpoint
app.get("/api/ai-status", (req, res) => {
  const status = checkConfiguration();
  res.json(status);
});

// Feature 1: Upload/Paste Content - Text Input
app.post("/api/lectures/text", async (req, res) => {
  try {
    const { content, title } = req.body;

    // Validation
    if (!content || content.trim().length < 10) {
      return res.status(400).json({
        success: false,
        error: "Content must be at least 10 characters long"
      });
    }

    // Parse topics from content (simple heuristic)
    const topics = parseTopics(content);

    res.json({
      success: true,
      message: "Text content processed successfully",
      data: {
        title: title || "Untitled Lecture",
        contentLength: content.length,
        topics: topics,
        summary: {
          totalTopics: topics.length,
          totalSubtopics: topics.reduce((sum, t) => sum + (t.subtopics?.length || 0), 0)
        }
      }
    });
  } catch (error) {
    console.error("Error processing text:", error);
    res.status(500).json({
      success: false,
      error: "Failed to process text content",
      details: error.message
    });
  }
});

// In-memory storage for lecture status (in production, use a database)
const lectureStore = new Map();

// Feature 1: Upload/Paste Content - File Upload (PDF or TXT)
app.post("/api/lectures/upload", upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No file provided"
      });
    }

    let content = '';
    const fileName = req.file.originalname;
    const fileType = req.file.mimetype;

    // Handle PDF files
    if (fileType === 'application/pdf') {
      try {
        const parser = new PDFParse({ data: req.file.buffer });
        const pdfData = await parser.getText();
        content = pdfData.text;
      } catch (pdfError) {
        console.error("PDF parsing error:", pdfError);
        return res.status(400).json({
          success: false,
          error: "Failed to parse PDF file",
          details: pdfError.message
        });
      }
    }
    // Handle TXT files
    else if (fileType === 'text/plain') {
      content = req.file.buffer.toString('utf-8');
    }
    else {
      return res.status(400).json({
        success: false,
        error: `Unsupported file type: ${fileType}`
      });
    }

    // Validate content
    if (!content || content.trim().length < 10) {
      return res.status(400).json({
        success: false,
        error: "File content must be at least 10 characters long"
      });
    }

    // Parse topics from content
    const topics = parseTopics(content);

    // Generate a unique lecture ID
    const lectureId = `lecture_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Store lecture data with initial status
    const lectureData = {
      id: lectureId,
      title: fileName.replace(/\.[^/.]+$/, ''),
      fileName: fileName,
      fileType: fileType,
      content: content,
      contentLength: content.length,
      topics: topics,
      status: 'processing',
      progress: 10,
      createdAt: new Date().toISOString(),
      slides: []
    };

    lectureStore.set(lectureId, lectureData);

    // Generate slides asynchronously in the background
    (async () => {
      try {
        const slides = [];
        let progress = 20;

        for (let i = 0; i < topics.length; i++) {
          const topic = topics[i];
          const topicContent = `${topic.title}\n${topic.description || ''}`;

          // Enhance topic content with AI
          const enhancedResult = await enhanceContent(topicContent, { topic: topic.title });
          const enhancedContent = enhancedResult.success ? enhancedResult.data : { summary: topic.description };
          progress += 20 / topics.length;

          // Generate questions for this topic
          const questionsResult = await generateQuestions(topicContent, { topic: topic.title });
          const questions = questionsResult.success ? questionsResult.data : [];
          progress += 20 / topics.length;

          // Generate visuals for this topic
          const visualsResult = await generateVisuals([topic.title]);
          const visualsData = visualsResult.success ? visualsResult.data : { visuals: [] };
          const visuals = visualsData.visuals && visualsData.visuals.length > 0 ? visualsData.visuals[0].images : [];
          progress += 20 / topics.length;

          slides.push({
            id: `slide_${i}`,
            title: topic.title,
            description: topic.description || '',
            enhancedContent: enhancedContent,
            questions: questions,
            visuals: visuals,
            subtopics: topic.subtopics || [],
            selectedImage: visuals.length > 0 ? visuals[0] : null,
            selectedFlowchart: null
          });

          // Update progress
          const updatedLecture = lectureStore.get(lectureId);
          if (updatedLecture) {
            updatedLecture.progress = Math.min(90, Math.round(progress));
            updatedLecture.slides = slides;
            lectureStore.set(lectureId, updatedLecture);
          }
        }

        // Mark as completed
        const finalLecture = lectureStore.get(lectureId);
        if (finalLecture) {
          finalLecture.status = 'completed';
          finalLecture.progress = 100;
          finalLecture.slides = slides;
          lectureStore.set(lectureId, finalLecture);
        }
      } catch (error) {
        console.error("Error generating slides:", error);
        const failedLecture = lectureStore.get(lectureId);
        if (failedLecture) {
          failedLecture.status = 'failed';
          failedLecture.error = error.message;
          lectureStore.set(lectureId, failedLecture);
        }
      }
    })();

    res.json({
      success: true,
      message: "File uploaded and processing started",
      data: {
        id: lectureId,
        title: fileName.replace(/\.[^/.]+$/, ''), // Remove file extension
        fileName: fileName,
        fileType: fileType,
        contentLength: content.length,
        topics: topics,
        summary: {
          totalTopics: topics.length,
          totalSubtopics: topics.reduce((sum, t) => sum + (t.subtopics?.length || 0), 0)
        }
      }
    });
  } catch (error) {
    console.error("File upload error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to process file upload",
      details: error.message
    });
  }
});

// Get lecture status endpoint
app.get("/api/lectures/:lectureId/status", (req, res) => {
  try {
    const { lectureId } = req.params;

    const lecture = lectureStore.get(lectureId);

    if (!lecture) {
      return res.status(404).json({
        success: false,
        error: "Lecture not found"
      });
    }

    res.json({
      success: true,
      status: lecture.status,
      progress: lecture.progress,
      data: lecture
    });
  } catch (error) {
    console.error("Error getting lecture status:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get lecture status",
      details: error.message
    });
  }
});

// Get lecture data endpoint
app.get("/api/lectures/:lectureId", (req, res) => {
  try {
    const { lectureId } = req.params;

    const lecture = lectureStore.get(lectureId);

    if (!lecture) {
      return res.status(404).json({
        success: false,
        error: "Lecture not found"
      });
    }

    res.json({
      success: true,
      data: lecture
    });
  } catch (error) {
    console.error("Error getting lecture:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get lecture",
      details: error.message
    });
  }
});

// Generate slides with AI enhancements
app.post("/api/lectures/:lectureId/generate-slides", async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = lectureStore.get(lectureId);

    if (!lecture) {
      return res.status(404).json({
        success: false,
        error: "Lecture not found"
      });
    }

    // Generate slides from topics
    const slides = [];

    for (const topic of lecture.topics) {
      // Enhance topic content with AI
      const enhancedContent = await enhanceContent(topic.title, topic.description || '');

      // Generate questions for this topic
      const questions = await generateQuestions(topic.title, topic.description || '');

      // Generate visuals for this topic
      const visuals = await generateVisuals(topic.title);

      slides.push({
        id: `slide_${slides.length}`,
        title: topic.title,
        description: topic.description || '',
        enhancedContent: enhancedContent,
        questions: questions,
        visuals: visuals,
        subtopics: topic.subtopics || [],
        selectedImage: visuals.length > 0 ? visuals[0] : null,
        selectedFlowchart: null
      });
    }

    // Update lecture with slides
    lecture.slides = slides;
    lecture.status = 'completed';
    lectureStore.set(lectureId, lecture);

    res.json({
      success: true,
      data: {
        id: lectureId,
        title: lecture.title,
        slides: slides,
        totalSlides: slides.length
      }
    });
  } catch (error) {
    console.error("Error generating slides:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate slides",
      details: error.message
    });
  }
});

// Feature 2: AI Content Enhancement
app.post("/api/lectures/enhance", async (req, res) => {
  try {
    const { content, topic } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        error: "Content is required"
      });
    }

    const result = await enhanceContent(content, { topic });

    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json({
        success: false,
        error: result.error
      });
    }
  } catch (error) {
    console.error("Enhancement error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to enhance content",
      details: error.message
    });
  }
});

// Feature 3: Generate Visual Suggestions
app.post("/api/lectures/suggest-visuals", async (req, res) => {
  try {
    const { topics } = req.body;

    if (!topics || !Array.isArray(topics)) {
      return res.status(400).json({
        success: false,
        error: "Topics array is required"
      });
    }

    // Generate visuals using Unsplash API
    const result = await generateVisuals(topics);

    res.json(result);
  } catch (error) {
    console.error("Visual suggestion error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate visual suggestions",
      details: error.message
    });
  }
});

// Visual Generator Status
app.get("/api/visual-status", (req, res) => {
  const status = checkVisualConfiguration();
  res.json(status);
});

// Feature 4: Generate Questions
app.post("/api/lectures/generate-questions", async (req, res) => {
  try {
    const { content, topic, count = 3 } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        error: "Content is required"
      });
    }

    // Generate questions using AI
    const result = await generateQuestions(content, { topic, count });

    res.json(result);
  } catch (error) {
    console.error("Question generation error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate questions",
      details: error.message
    });
  }
});

// Generate questions for multiple sections
app.post("/api/lectures/generate-questions-sections", async (req, res) => {
  try {
    const { sections, questionsPerSection = 2 } = req.body;

    if (!sections || !Array.isArray(sections)) {
      return res.status(400).json({
        success: false,
        error: "Sections array is required"
      });
    }

    const result = await generateQuestionsForSections(sections, { questionsPerSection });

    res.json(result);
  } catch (error) {
    console.error("Section question generation error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate questions for sections",
      details: error.message
    });
  }
});

// Feature 5: Export to PowerPoint
app.post("/api/lectures/export/powerpoint", async (req, res) => {
  try {
    const { lectureData, filename = "lecture.pptx" } = req.body;

    if (!lectureData) {
      return res.status(400).json({
        success: false,
        error: "Lecture data is required"
      });
    }

    const result = await exportToPowerPoint(lectureData, filename);

    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    console.error("PowerPoint export error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to export to PowerPoint",
      details: error.message
    });
  }
});

// Export to PDF
app.post("/api/lectures/export/pdf", async (req, res) => {
  try {
    const { lectureData, filename = "lecture.pdf" } = req.body;

    if (!lectureData) {
      return res.status(400).json({
        success: false,
        error: "Lecture data is required"
      });
    }

    const result = await exportToPDF(lectureData, filename);

    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    console.error("PDF export error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to export to PDF",
      details: error.message
    });
  }
});

// Export to JSON
app.post("/api/lectures/export/json", async (req, res) => {
  try {
    const { lectureData, filename = "lecture.json" } = req.body;

    if (!lectureData) {
      return res.status(400).json({
        success: false,
        error: "Lecture data is required"
      });
    }

    const result = await exportToJSON(lectureData, filename);

    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    console.error("JSON export error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to export to JSON",
      details: error.message
    });
  }
});

// Helper function to parse topics
function parseTopics(content) {
  const lines = content.split('\n').filter(line => line.trim().length > 0);
  const topics = [];
  let currentTopic = null;

  for (const line of lines) {
    const trimmedLine = line.trim();
    const indentLevel = line.search(/\S/);

    // Check if it's a main topic
    if (/^\d+[\.\)]\s/.test(trimmedLine) || /^[A-Z\s]+$/.test(trimmedLine) || trimmedLine.endsWith(':')) {
      if (currentTopic) topics.push(currentTopic);
      currentTopic = {
        title: cleanTitle(trimmedLine),
        subtopics: []
      };
    } else if (currentTopic && (indentLevel > 0 || /^[\-\*\•]\s/.test(trimmedLine))) {
      currentTopic.subtopics.push(cleanTitle(trimmedLine));
    } else if (!currentTopic && trimmedLine.length > 0) {
      currentTopic = {
        title: cleanTitle(trimmedLine),
        subtopics: []
      };
    }
  }

  if (currentTopic) topics.push(currentTopic);
  return topics;
}

// Helper function to clean titles
function cleanTitle(title) {
  return title
    .replace(/^\d+[\.\)]\s*/, '')
    .replace(/^-\s+/, '')
    .replace(/:\s*$/, '')
    .replace(/^[\-\*\•]\s*/, '')
    .trim();
}

// Helper function to extract keywords
function extractKeywords(text) {
  const words = text.toLowerCase().split(/\s+/);
  const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'is', 'are']);
  return words.filter(word => word.length > 3 && !stopWords.has(word)).slice(0, 5);
}

// Multer error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'FILE_TOO_LARGE') {
      return res.status(400).json({
        success: false,
        error: "File is too large. Maximum size is 50MB"
      });
    }
    return res.status(400).json({
      success: false,
      error: `File upload error: ${err.message}`
    });
  } else if (err) {
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }
  next();
});

// General error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    success: false,
    error: "Internal server error",
    details: err.message
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
