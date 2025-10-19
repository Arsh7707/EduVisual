#!/bin/bash

BASE_URL="http://localhost:5001"
BLUE='\033[0;34m'
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}EduVisual MVP - Comprehensive Test Suite${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Test 1: Health Check
echo -e "${BLUE}Test 1: Health Check${NC}"
curl -s "$BASE_URL/" | jq .
echo ""
echo ""

# Test 2: AI Status
echo -e "${BLUE}Test 2: AI Service Status${NC}"
curl -s "$BASE_URL/api/ai-status" | jq .
echo ""
echo ""

# Test 3: Visual Status
echo -e "${BLUE}Test 3: Visual Generator Status${NC}"
curl -s "$BASE_URL/api/visual-status" | jq .
echo ""
echo ""

# Test 4: Upload Text Content
echo -e "${BLUE}Test 4: Upload Text Content${NC}"
RESPONSE=$(curl -s -X POST "$BASE_URL/api/lectures/text" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "1. Introduction to Machine Learning\nMachine learning is a subset of artificial intelligence that enables systems to learn and improve from experience.\n- What is ML\n- Types of ML\n- Supervised Learning\n- Unsupervised Learning\n2. Supervised Learning\nSupervised learning uses labeled data to train models.\n- Regression\n- Classification",
    "title": "Machine Learning Basics"
  }')
echo "$RESPONSE" | jq .
echo ""
echo ""

# Test 5: Generate Visual Suggestions
echo -e "${BLUE}Test 5: Generate Visual Suggestions${NC}"
curl -s -X POST "$BASE_URL/api/lectures/suggest-visuals" \
  -H "Content-Type: application/json" \
  -d '{
    "topics": ["Machine Learning", "Neural Networks", "Data Science"]
  }' | jq .
echo ""
echo ""

# Test 6: Generate Questions
echo -e "${BLUE}Test 6: Generate Questions${NC}"
curl -s -X POST "$BASE_URL/api/lectures/generate-questions" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Machine learning is a subset of artificial intelligence. It enables systems to learn from data without being explicitly programmed. There are three main types: supervised learning, unsupervised learning, and reinforcement learning.",
    "topic": "Machine Learning",
    "count": 2
  }' | jq .
echo ""
echo ""

# Test 7: Enhance Content with AI
echo -e "${BLUE}Test 7: Enhance Content with AI${NC}"
curl -s -X POST "$BASE_URL/api/lectures/enhance" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Photosynthesis is the process by which plants convert light energy into chemical energy. It occurs in two main stages: the light-dependent reactions and the light-independent reactions (Calvin cycle).",
    "topic": "Biology - Photosynthesis"
  }' | jq . | head -50
echo ""
echo ""

# Test 8: Export to JSON
echo -e "${BLUE}Test 8: Export to JSON${NC}"
curl -s -X POST "$BASE_URL/api/lectures/export/json" \
  -H "Content-Type: application/json" \
  -d '{
    "lectureData": {
      "title": "Test Lecture",
      "sections": [
        {
          "title": "Introduction",
          "content": "This is the introduction"
        }
      ]
    },
    "filename": "test_lecture.json"
  }' | jq .
echo ""
echo ""

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}All tests completed!${NC}"
echo -e "${GREEN}========================================${NC}"

