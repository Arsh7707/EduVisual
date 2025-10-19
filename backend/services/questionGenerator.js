import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generate educational questions from content
 * @param {string} content - The lecture content
 * @param {Object} options - Options including topic
 * @returns {Promise<Object>} - Generated questions
 */
export async function generateQuestions(content, options = {}) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.warn('⚠️  GEMINI_API_KEY not configured. Returning mock questions.');
      return generateMockQuestions(content, options);
    }

    const { topic = 'General', count = 3 } = options;

    const prompt = `You are an expert educational content creator. Generate exactly ${count} educational questions based on the following content.

For each question, include:
1. A question
2. The type (one of: "reflective", "true-false", "multiple-choice")
3. For multiple-choice: provide 4 options (a, b, c, d)
4. The correct answer
5. An explanation

Content:
${content}

Topic: ${topic}

Return ONLY a valid JSON array with this structure:
[
  {
    "id": 1,
    "type": "reflective",
    "question": "...",
    "correctAnswer": "...",
    "explanation": "..."
  },
  {
    "id": 2,
    "type": "true-false",
    "question": "...",
    "correctAnswer": "true" or "false",
    "explanation": "..."
  },
  {
    "id": 3,
    "type": "multiple-choice",
    "question": "...",
    "options": {
      "a": "...",
      "b": "...",
      "c": "...",
      "d": "..."
    },
    "correctAnswer": "a",
    "explanation": "..."
  }
]

Return ONLY the JSON array, no markdown or extra text.`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    // Parse JSON response
    let jsonText = text;
    if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/```json\n?|```\n?/g, "").replace(/```$/g, "");
    }

    const questions = JSON.parse(jsonText);

    return {
      success: true,
      provider: "gemini",
      data: {
        questions: questions,
        total: questions.length,
        topic: topic,
        generatedAt: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('Error generating questions:', error);
    return {
      success: false,
      error: error.message,
      data: {
        questions: generateMockQuestions(content, options).data.questions,
        source: 'mock'
      }
    };
  }
}

/**
 * Generate mock questions for fallback
 * @param {string} content - The content
 * @param {Object} options - Options
 * @returns {Object} - Mock questions
 */
function generateMockQuestions(content, options = {}) {
  const { topic = 'General', count = 3 } = options;
  
  // Extract first few sentences for context
  const sentences = content.split('.').slice(0, 3).join('.').trim();
  
  const mockQuestions = [
    {
      id: 1,
      type: "reflective",
      question: `What are the main concepts discussed in this ${topic} content?`,
      correctAnswer: "Students should identify and explain the key concepts from the content",
      explanation: "Reflective questions encourage critical thinking and personal understanding."
    },
    {
      id: 2,
      type: "true-false",
      question: `The content about ${topic} covers multiple important aspects.`,
      correctAnswer: "true",
      explanation: "This is generally true for comprehensive lecture content."
    },
    {
      id: 3,
      type: "multiple-choice",
      question: `Which of the following best describes the primary focus of this ${topic} lesson?`,
      options: {
        a: "Understanding fundamental concepts",
        b: "Memorizing definitions",
        c: "Practical application",
        d: "Historical context"
      },
      correctAnswer: "a",
      explanation: "Educational content typically focuses on understanding core concepts first."
    }
  ];

  return {
    success: true,
    provider: "mock",
    data: {
      questions: mockQuestions.slice(0, count),
      total: Math.min(count, mockQuestions.length),
      topic: topic,
      generatedAt: new Date().toISOString()
    }
  };
}

/**
 * Generate questions for multiple sections
 * @param {Array<Object>} sections - Array of sections with content
 * @param {Object} options - Options
 * @returns {Promise<Object>} - Questions for each section
 */
export async function generateQuestionsForSections(sections, options = {}) {
  try {
    const questionsPerSection = options.questionsPerSection || 2;
    const results = [];

    for (const section of sections) {
      const sectionQuestions = await generateQuestions(
        section.content,
        {
          topic: section.title || 'General',
          count: questionsPerSection
        }
      );

      results.push({
        section: section.title,
        ...sectionQuestions
      });
    }

    return {
      success: true,
      data: {
        sections: results,
        total: results.length,
        totalQuestions: results.reduce((sum, r) => sum + (r.data?.questions?.length || 0), 0)
      }
    };
  } catch (error) {
    console.error('Error generating questions for sections:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

