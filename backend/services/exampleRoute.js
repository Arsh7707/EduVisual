/**
 * Example Route Integration for AI Content Enhancer
 * 
 * This is a REFERENCE FILE showing how to integrate the AI enhancer service.
 * Your friend can copy these examples into their actual route files.
 * 
 * DO NOT import this file directly - it's just for reference!
 */

import express from 'express';
import { enhanceContent, checkConfiguration } from './aiEnhancer.js';

const router = express.Router();

/**
 * Example 1: Basic Enhancement Endpoint
 * POST /api/enhance
 * 
 * Request body:
 * {
 *   "content": "Your lecture text here...",
 *   "topic": "Biology - Photosynthesis" (optional)
 * }
 */
router.post('/api/enhance', async (req, res) => {
  try {
    const { content, topic } = req.body;
    
    // Validate input
    if (!content) {
      return res.status(400).json({
        success: false,
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
        success: false,
        error: result.error,
        details: result
      });
    }
  } catch (error) {
    console.error('Enhancement route error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to enhance content',
      message: error.message
    });
  }
});

/**
 * Example 2: Health Check / Status Endpoint
 * GET /api/ai-status
 * 
 * Returns the configuration status of the AI service
 */
router.get('/api/ai-status', (req, res) => {
  const status = checkConfiguration();
  res.json(status);
});

/**
 * Example 3: Integration with File Upload
 * POST /api/upload-and-enhance
 * 
 * This assumes you have file upload middleware set up
 * and text extraction logic in place
 */
router.post('/api/upload-and-enhance', async (req, res) => {
  try {
    // Assume your friend has already extracted text from the uploaded file
    // This is just showing how to use the enhancer after extraction
    const extractedText = req.body.extractedText; // From your friend's upload handler
    const topic = req.body.topic;
    
    if (!extractedText) {
      return res.status(400).json({
        success: false,
        error: 'No text content found in uploaded file'
      });
    }
    
    // Enhance the extracted content
    const enhanced = await enhanceContent(extractedText, { topic });
    
    if (enhanced.success) {
      res.json({
        success: true,
        original: {
          text: extractedText,
          length: extractedText.length
        },
        enhanced: enhanced.data,
        metadata: enhanced.metadata
      });
    } else {
      res.status(500).json({
        success: false,
        error: enhanced.error
      });
    }
  } catch (error) {
    console.error('Upload and enhance error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Example 4: Batch Enhancement
 * POST /api/enhance-batch
 * 
 * Enhance multiple pieces of content at once
 * 
 * Request body:
 * {
 *   "items": [
 *     { "content": "Text 1", "topic": "Topic 1" },
 *     { "content": "Text 2", "topic": "Topic 2" }
 *   ]
 * }
 */
router.post('/api/enhance-batch', async (req, res) => {
  try {
    const { items } = req.body;
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Items array is required'
      });
    }
    
    // Process all items
    const results = await Promise.all(
      items.map(async (item) => {
        try {
          const result = await enhanceContent(item.content, { topic: item.topic });
          return {
            success: result.success,
            data: result.data,
            error: result.error || null
          };
        } catch (error) {
          return {
            success: false,
            error: error.message
          };
        }
      })
    );
    
    res.json({
      success: true,
      results: results,
      total: results.length,
      successful: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length
    });
  } catch (error) {
    console.error('Batch enhancement error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Example 5: Get Only Summaries (Lightweight)
 * POST /api/summarize
 * 
 * Returns only the summary parts, not the full enhancement
 */
router.post('/api/summarize', async (req, res) => {
  try {
    const { content, topic } = req.body;
    
    if (!content) {
      return res.status(400).json({
        success: false,
        error: 'Content is required'
      });
    }
    
    const result = await enhanceContent(content, { topic });
    
    if (result.success) {
      // Extract only summary information
      const summaryOnly = {
        success: true,
        summary: result.data.summary,
        sectionSummaries: result.data.sections.map(section => ({
          title: section.title,
          summary: section.summary
        })),
        keyTakeaways: result.data.overallSuggestions?.keyTakeaways || []
      };
      res.json(summaryOnly);
    } else {
      res.status(500).json({
        success: false,
        error: result.error
      });
    }
  } catch (error) {
    console.error('Summarize error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Example 6: Get Only Visual Suggestions
 * POST /api/suggest-visuals
 * 
 * Returns only the visual suggestions
 */
router.post('/api/suggest-visuals', async (req, res) => {
  try {
    const { content, topic } = req.body;
    
    if (!content) {
      return res.status(400).json({
        success: false,
        error: 'Content is required'
      });
    }
    
    const result = await enhanceContent(content, { topic });
    
    if (result.success) {
      // Extract only visual suggestions
      const allVisuals = result.data.sections.flatMap(section => 
        section.visualSuggestions || []
      );
      
      res.json({
        success: true,
        visualSuggestions: allVisuals,
        recommendedVisuals: result.data.overallSuggestions?.recommendedVisuals || [],
        total: allVisuals.length
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error
      });
    }
  } catch (error) {
    console.error('Visual suggestions error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * HOW TO USE THIS FILE:
 * 
 * 1. This is a REFERENCE file - don't import it directly
 * 2. Copy the route examples you need into your actual route files
 * 3. Adjust the paths and logic to match your application structure
 * 4. Make sure to import the enhancer service at the top of your file
 * 
 * Example integration in index.js:
 * 
 * import { enhanceContent, checkConfiguration } from './services/aiEnhancer.js';
 * 
 * app.post('/api/enhance', async (req, res) => {
 *   const { content, topic } = req.body;
 *   const result = await enhanceContent(content, { topic });
 *   res.json(result);
 * });
 */

export default router;

