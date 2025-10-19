# Quick Start Guide - Preview & Customization Feature

## 🚀 For Frontend Developers

### What Was Implemented
A new preview and customization page that appears after file processing, allowing users to select preferred flowcharts and images before finalizing their lecture.

### Key Files to Know
```
frontend/src/
├── pages/PreviewCustomization.jsx          ← Main page
├── components/features/Preview/
│   ├── SlidePreview.jsx                    ← Display component
│   └── AlternativeSelector.jsx             ← Selection component
├── hooks/useLectures.js                    ← API integration
└── App.jsx                                 ← Routing
```

### How It Works
1. User uploads file → Processing page
2. Processing completes → Redirects to `/preview/{lectureId}`
3. Preview page loads lecture with alternatives
4. User selects flowcharts and images
5. User clicks "Finalize" → Saves selections
6. Redirects to `/lecture/{lectureId}` with selected content

### Testing Locally
```bash
# Start frontend dev server
cd frontend
npm run dev

# Navigate to upload page
# Upload a file
# You'll be redirected to preview page (if backend returns correct data)
```

### Common Tasks

**Add a new feature to preview page:**
```javascript
// Edit frontend/src/pages/PreviewCustomization.jsx
// Add state, handlers, and JSX as needed
```

**Modify alternative selector styling:**
```javascript
// Edit frontend/src/components/features/Preview/AlternativeSelector.jsx
// Update Tailwind classes
```

**Change API endpoint:**
```javascript
// Edit frontend/src/hooks/useLectures.js
// Update the POST URL in updateLectureSelections()
```

## 🔌 For Backend Developers

### What You Need to Implement

#### 1. Enhance GET `/api/lectures/{lectureId}`

**Current Response (likely):**
```javascript
{
  id: "lecture-123",
  title: "...",
  visuals: [...],
  questions: [...]
}
```

**Required Response:**
```javascript
{
  id: "lecture-123",
  title: "...",
  slides: [
    {
      id: "slide-1",
      content: "Slide text...",
      selectedFlowchart: {
        id: "fc-1",
        url: "https://...",
        label: "Option 1"
      },
      selectedImage: {
        id: "img-1",
        url: "https://...",
        label: "Option 1"
      },
      flowcharts: [
        { id: "fc-1", url: "...", label: "Option 1" },
        { id: "fc-2", url: "...", label: "Option 2" }
      ],
      images: [
        { id: "img-1", url: "...", label: "Option 1" },
        { id: "img-2", url: "...", label: "Option 2" }
      ]
    }
  ]
}
```

#### 2. Implement POST `/api/lectures/{lectureId}/selections`

**Request:**
```javascript
{
  selections: {
    0: { flowchart: "fc-1", image: "img-1" },
    1: { flowchart: "fc-2", image: "img-2" }
  }
}
```

**Response:**
```javascript
// Return updated lecture object with selections applied
{
  id: "lecture-123",
  slides: [
    {
      id: "slide-1",
      selectedFlowchart: { id: "fc-1", ... },
      selectedImage: { id: "img-1", ... },
      ...
    }
  ]
}
```

### Implementation Steps

1. **Update database schema** to store alternatives
2. **Modify GET endpoint** to return slides with alternatives
3. **Create POST endpoint** to save selections
4. **Test with frontend** to verify data flow
5. **Handle edge cases** (missing data, invalid IDs, etc.)

### Testing the Backend

```bash
# Test GET endpoint
curl http://localhost:5000/api/lectures/123

# Test POST endpoint
curl -X POST http://localhost:5000/api/lectures/123/selections \
  -H "Content-Type: application/json" \
  -d '{
    "selections": {
      "0": { "flowchart": "fc-1", "image": "img-1" }
    }
  }'
```

## 🧪 For QA/Testers

### Test Scenarios

**Happy Path:**
1. Upload file
2. Wait for processing
3. See preview page with slides
4. Select different flowcharts
5. Select different images
6. Click "Finalize"
7. Verify redirect to lecture viewer
8. Verify selected content is displayed

**Edge Cases:**
- Lecture with 1 slide
- Lecture with 10+ slides
- Slide with no alternatives
- Missing flowchart data
- Missing image data
- Network error during load
- Network error during save

**Responsive Testing:**
- Mobile (iPhone, Android)
- Tablet (iPad, Android tablet)
- Desktop (Chrome, Firefox, Safari)

**Dark Mode:**
- Toggle dark mode
- Verify all colors are correct
- Verify text is readable
- Verify buttons are visible

### Reporting Issues

Include:
- Device/browser used
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots/videos
- Console errors

## 📚 Documentation

### For Quick Reference
- `DEVELOPER_QUICK_REFERENCE.md` - Code snippets and patterns
- `CODE_EXAMPLES.md` - Practical examples

### For Detailed Information
- `PREVIEW_CUSTOMIZATION_IMPLEMENTATION.md` - Technical details
- `IMPLEMENTATION_SUMMARY.md` - Feature overview
- `FINAL_IMPLEMENTATION_REPORT.md` - Complete report

### For Implementation
- `IMPLEMENTATION_CHECKLIST.md` - Step-by-step checklist

## 🆘 Troubleshooting

**Preview page not loading:**
- Check if backend returns correct data structure
- Verify lectureId in URL is valid
- Check browser console for errors

**Selections not saving:**
- Verify POST endpoint is implemented
- Check request/response format
- Look for API errors in console

**Images not displaying:**
- Verify image URLs are valid
- Check CORS settings
- Verify image format is supported

**Styling issues:**
- Check Tailwind CSS is loaded
- Verify dark mode classes are correct
- Check responsive breakpoints

## 📞 Getting Help

1. Check the documentation files
2. Review code examples
3. Look at existing similar components
4. Check browser console for errors
5. Ask in team chat/meetings

## ✅ Checklist Before Going Live

- [ ] Backend endpoints implemented
- [ ] Frontend code deployed
- [ ] All tests passing
- [ ] No console errors
- [ ] Responsive on all devices
- [ ] Dark mode working
- [ ] Error handling tested
- [ ] Performance acceptable
- [ ] Documentation complete
- [ ] Team trained on feature

## 🎯 Next Steps

1. **Backend Team**: Implement the two API endpoints
2. **Frontend Team**: Deploy the code
3. **QA Team**: Run comprehensive tests
4. **Product Team**: Gather user feedback
5. **All Teams**: Monitor for issues in production

---

**Questions?** Refer to the comprehensive documentation files or reach out to the team!

