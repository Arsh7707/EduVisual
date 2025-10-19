/**
 * AI Content Enhancer Service (Gemini-only)
 *
 * This service enhances educational lecture content using Google Gemini 2.5 Flash.
 * It performs summarization, clarification, and suggests visuals & activities.
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("❌ Missing GEMINI_API_KEY in .env file.");
  process.exit(1);
}

console.log("🔹 Using Google Generative AI (Gemini 1.5 Flash)");

// Initialize Gemini client (v1 endpoint)
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// ---------------------------------------------------------------------------
// Prompt Template
// ---------------------------------------------------------------------------

const ENHANCEMENT_PROMPT = `You are an expert educational content enhancer. Your task is to analyze lecture content and enhance it for better student comprehension.

For the given lecture content, you must:

1. **Summarize**: Break down the content into clear, digestible sections with concise summaries
2. **Clarify**: Add brief explanations for complex concepts, technical terms, or difficult ideas
3. **Suggest Visuals**: Identify where diagrams, charts, images, or infographics would help understanding
4. **Suggest Activities**: Recommend where interactive elements (quizzes, exercises, simulations) should be placed

Return your response in the following JSON format:
{
  "summary": "A brief overall summary of the lecture content (2-3 sentences)",
  "sections": [
    {
      "title": "Section title",
      "content": "Original content for this section",
      "summary": "Concise summary of this section",
      "clarifications": [
        { "term": "Complex term or concept", "explanation": "Simple, clear explanation" }
      ],
      "visualSuggestions": [
        { "type": "diagram|chart|image|infographic", "description": "What the visual should show", "placement": "before|after|inline", "reason": "Why this visual would help" }
      ],
      "activitySuggestions": [
        { "type": "quiz|exercise|simulation|discussion", "description": "What the activity should involve", "placement": "before|after|inline", "reason": "Why this activity would help" }
      ]
    }
  ],
  "overallSuggestions": {
    "keyTakeaways": ["Key point 1", "Key point 2", "..."],
    "recommendedVisuals": ["Overall visual recommendation 1", "..."],
    "recommendedActivities": ["Overall activity recommendation 1", "..."]
  }
}

Be specific, practical, and focused on enhancing student learning outcomes.`;

// ---------------------------------------------------------------------------
// Core Enhancement Logic
// ---------------------------------------------------------------------------

export async function enhanceContent(content, options = {}) {
  if (!content || typeof content !== "string" || content.trim().length === 0) {
    throw new Error("Content must be a non-empty string");
  }

  const topic = options.topic || "Not specified";
  const enhancedPrompt = `Topic: ${topic}\n\n${ENHANCEMENT_PROMPT}\n\nLecture Content:\n${content}`;

  try {
    console.log("🔸 Sending request to Gemini (model: gemini-2.5-flash)…");

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;
    const text = response.text().trim();

    // Handle JSON extraction (removes Markdown code blocks)
    let jsonText = text;
    if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/```json\n?|```\n?/g, "").replace(/```$/g, "");
    }

    const enhancedContent = JSON.parse(jsonText);

    console.log("✅ Enhancement completed successfully.");

    return {
      success: true,
      provider: "gemini",
      data: enhancedContent,
      metadata: {
        originalLength: content.length,
        processedAt: new Date().toISOString(),
        topic,
      },
    };
  } catch (error) {
    console.error("❌ Gemini enhancement failed:", error.message);
    return {
      success: false,
      provider: "gemini",
      error: error.message,
      metadata: {
        originalLength: content.length,
        processedAt: new Date().toISOString(),
        topic,
      },
    };
  }
}

// ---------------------------------------------------------------------------
// Configuration Check
// ---------------------------------------------------------------------------

export function checkConfiguration() {
  if (!GEMINI_API_KEY) {
    return {
      configured: false,
      provider: "gemini",
      message: "Gemini API key not found. Please set GEMINI_API_KEY in .env file",
    };
  }

  return {
    configured: true,
    provider: "gemini",
    message: "Gemini AI is configured and ready",
  };
}

export default {
  enhanceContent,
  checkConfiguration,
};
