import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY;
const UNSPLASH_BASE_URL = 'https://api.unsplash.com';

/**
 * Generate visual suggestions for topics using Unsplash API
 * @param {Array<string>} topics - Array of topic keywords
 * @returns {Promise<Object>} - Visual suggestions with image URLs
 */
export async function generateVisuals(topics) {
  try {
    if (!UNSPLASH_API_KEY) {
      console.warn('⚠️  UNSPLASH_API_KEY not configured. Returning mock visuals.');
      return generateMockVisuals(topics);
    }

    const visuals = [];

    for (const topic of topics) {
      try {
        const images = await searchUnsplashImages(topic, 3);
        visuals.push({
          topic: topic,
          images: images,
          source: 'unsplash'
        });
      } catch (error) {
        console.warn(`Failed to fetch images for topic "${topic}":`, error.message);
        // Fallback to mock visuals for this topic
        visuals.push({
          topic: topic,
          images: generateMockImagesForTopic(topic),
          source: 'mock'
        });
      }
    }

    return {
      success: true,
      data: {
        visuals: visuals,
        total: visuals.length,
        timestamp: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('Error generating visuals:', error);
    return {
      success: false,
      error: error.message,
      data: {
        visuals: generateMockVisuals(topics),
        source: 'mock'
      }
    };
  }
}

/**
 * Search for images on Unsplash
 * @param {string} query - Search query
 * @param {number} perPage - Number of results to return
 * @returns {Promise<Array>} - Array of image objects
 */
async function searchUnsplashImages(query, perPage = 3) {
  try {
    const response = await axios.get(`${UNSPLASH_BASE_URL}/search/photos`, {
      params: {
        query: query,
        per_page: perPage,
        orientation: 'landscape'
      },
      headers: {
        'Authorization': `Client-ID ${UNSPLASH_API_KEY}`
      }
    });

    return response.data.results.map(photo => ({
      id: photo.id,
      url: photo.urls.regular,
      thumbUrl: photo.urls.thumb,
      description: photo.description || photo.alt_description || query,
      photographer: photo.user.name,
      photographerUrl: photo.user.links.html,
      unsplashUrl: photo.links.html
    }));
  } catch (error) {
    throw new Error(`Unsplash API error: ${error.message}`);
  }
}

/**
 * Generate mock visuals for topics (fallback when API is not available)
 * @param {Array<string>} topics - Array of topics
 * @returns {Array} - Mock visual data
 */
function generateMockVisuals(topics) {
  return topics.map(topic => ({
    topic: topic,
    images: generateMockImagesForTopic(topic),
    source: 'mock'
  }));
}

/**
 * Generate mock images for a specific topic
 * @param {string} topic - Topic keyword
 * @returns {Array} - Mock image objects
 */
function generateMockImagesForTopic(topic) {
  const mockImages = [
    {
      id: `mock-${topic}-1`,
      url: `https://via.placeholder.com/800x600?text=${encodeURIComponent(topic)}+1`,
      thumbUrl: `https://via.placeholder.com/200x150?text=${encodeURIComponent(topic)}+1`,
      description: `Illustration for ${topic}`,
      photographer: 'Placeholder',
      photographerUrl: '#',
      unsplashUrl: '#'
    },
    {
      id: `mock-${topic}-2`,
      url: `https://via.placeholder.com/800x600?text=${encodeURIComponent(topic)}+2`,
      thumbUrl: `https://via.placeholder.com/200x150?text=${encodeURIComponent(topic)}+2`,
      description: `Diagram for ${topic}`,
      photographer: 'Placeholder',
      photographerUrl: '#',
      unsplashUrl: '#'
    },
    {
      id: `mock-${topic}-3`,
      url: `https://via.placeholder.com/800x600?text=${encodeURIComponent(topic)}+3`,
      thumbUrl: `https://via.placeholder.com/200x150?text=${encodeURIComponent(topic)}+3`,
      description: `Chart for ${topic}`,
      photographer: 'Placeholder',
      photographerUrl: '#',
      unsplashUrl: '#'
    }
  ];

  return mockImages;
}

/**
 * Get a single image for a topic
 * @param {string} topic - Topic keyword
 * @returns {Promise<Object>} - Single image object
 */
export async function getImageForTopic(topic) {
  try {
    if (!UNSPLASH_API_KEY) {
      return generateMockImagesForTopic(topic)[0];
    }

    const images = await searchUnsplashImages(topic, 1);
    return images[0] || generateMockImagesForTopic(topic)[0];
  } catch (error) {
    console.warn(`Failed to fetch image for topic "${topic}":`, error.message);
    return generateMockImagesForTopic(topic)[0];
  }
}

/**
 * Check if Unsplash API is configured
 * @returns {Object} - Configuration status
 */
export function checkVisualConfiguration() {
  return {
    success: true,
    provider: 'unsplash',
    configured: !!UNSPLASH_API_KEY,
    message: UNSPLASH_API_KEY 
      ? 'Unsplash API is configured' 
      : 'Unsplash API not configured - using mock visuals'
  };
}

