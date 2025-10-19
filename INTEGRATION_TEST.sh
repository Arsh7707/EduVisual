#!/bin/bash

# EduVisual Frontend-Backend Integration Test
# This script tests all integration points between frontend and backend

echo "=========================================="
echo "EduVisual Integration Test Suite"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counters
TESTS_PASSED=0
TESTS_FAILED=0

# Function to test an endpoint
test_endpoint() {
  local method=$1
  local endpoint=$2
  local data=$3
  local description=$4
  
  echo -e "${YELLOW}Testing:${NC} $description"
  echo "  Endpoint: $method $endpoint"
  
  if [ "$method" = "GET" ]; then
    response=$(curl -s -X GET "http://localhost:5001$endpoint" \
      -H "Content-Type: application/json")
  else
    response=$(curl -s -X POST "http://localhost:5001$endpoint" \
      -H "Content-Type: application/json" \
      -d "$data")
  fi
  
  # Check if response contains success or error
  if echo "$response" | grep -q '"success":true\|"configured":true\|"provider"'; then
    echo -e "  ${GREEN}✓ PASSED${NC}"
    TESTS_PASSED=$((TESTS_PASSED + 1))
    echo "  Response: $(echo $response | jq -r '.message // .data // .' | head -c 100)..."
  else
    echo -e "  ${RED}✗ FAILED${NC}"
    TESTS_FAILED=$((TESTS_FAILED + 1))
    echo "  Response: $response"
  fi
  echo ""
}

# Test 1: Backend Health Check
echo "=== BACKEND CONNECTIVITY ==="
test_endpoint "GET" "/" "" "Backend Health Check"

# Test 2: AI Status
test_endpoint "GET" "/api/ai-status" "" "AI Service Status"

# Test 3: Visual Status
test_endpoint "GET" "/api/visual-status" "" "Visual Generator Status"

# Test 4: Text Upload
echo "=== FEATURE 1: UPLOAD/PASTE CONTENT ==="
test_endpoint "POST" "/api/lectures/text" \
  '{
    "content": "Machine Learning is a subset of artificial intelligence. It enables systems to learn from data without being explicitly programmed. There are three main types: Supervised Learning, Unsupervised Learning, and Reinforcement Learning.",
    "title": "Machine Learning Basics"
  }' \
  "Text Content Upload"

# Test 5: Visual Generation
echo "=== FEATURE 3: VISUAL GENERATION ==="
test_endpoint "POST" "/api/lectures/suggest-visuals" \
  '{
    "topics": ["Machine Learning", "Neural Networks", "Data Science"]
  }' \
  "Visual Suggestions Generation"

# Test 6: Question Generation
echo "=== FEATURE 4: QUESTION GENERATION ==="
test_endpoint "POST" "/api/lectures/generate-questions" \
  '{
    "content": "Machine learning is a subset of artificial intelligence that enables systems to learn from data without being explicitly programmed."
  }' \
  "Question Generation"

# Test 7: Content Enhancement
echo "=== FEATURE 2: AI ENHANCEMENT ==="
test_endpoint "POST" "/api/lectures/enhance" \
  '{
    "content": "Photosynthesis is the process by which plants convert light energy into chemical energy. It occurs in two main stages: the light-dependent reactions and the light-independent reactions (Calvin cycle)."
  }' \
  "Content Enhancement"

# Test 8: Export to JSON
echo "=== FEATURE 5: EXPORT ==="
test_endpoint "POST" "/api/lectures/export/json" \
  '{
    "lectureData": {
      "title": "Test Lecture",
      "topics": [
        {
          "title": "Introduction",
          "subtopics": ["Overview", "Basics"]
        }
      ]
    }
  }' \
  "Export to JSON"

# Summary
echo "=========================================="
echo "Test Summary"
echo "=========================================="
echo -e "Tests Passed: ${GREEN}$TESTS_PASSED${NC}"
echo -e "Tests Failed: ${RED}$TESTS_FAILED${NC}"
echo "Total Tests: $((TESTS_PASSED + TESTS_FAILED))"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
  echo -e "${GREEN}✓ All integration tests passed!${NC}"
  exit 0
else
  echo -e "${RED}✗ Some tests failed. Please check the output above.${NC}"
  exit 1
fi

