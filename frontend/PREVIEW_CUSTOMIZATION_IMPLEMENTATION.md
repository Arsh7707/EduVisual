# Preview and Customization Feature Implementation

## Overview

This document describes the implementation of the interactive preview and customization feature for the EduVisual application. This feature allows users to preview and customize generated content (flowcharts and images) before finalizing their lecture.

## Workflow

### Current Flow (Before)
```
Upload File → Processing → Lecture Viewer
```

### New Flow (After)
```
Upload File → Processing → Preview Customization → Lecture Viewer
```

## Components Created

### 1. **PreviewCustomization.jsx** (`frontend/src/pages/PreviewCustomization.jsx`)
Main page component that orchestrates the preview and customization workflow.

**Features:**
- Loads lecture data with slides and alternatives
- Displays slide navigation sidebar
- Shows current slide preview
- Manages user selections for flowcharts and images
- Provides "Finalize & View Lecture" button to save selections

**Key Props:**
- `lectureId` - From URL params

**State Management:**
- `lecture` - Full lecture data with slides and alternatives
- `currentSlideIndex` - Currently selected slide
- `selections` - Object tracking selected flowchart/image IDs for each slide

### 2. **SlidePreview.jsx** (`frontend/src/components/features/Preview/SlidePreview.jsx`)
Displays the current slide with its selected flowchart and image.

**Features:**
- Shows slide content/text
- Displays currently selected flowchart
- Displays currently selected image
- Responsive image sizing

**Props:**
- `slide` - Current slide object
- `onFlowchartSelect` - Callback for flowchart selection
- `onImageSelect` - Callback for image selection

### 3. **AlternativeSelector.jsx** (`frontend/src/components/features/Preview/AlternativeSelector.jsx`)
Reusable component for selecting alternative flowcharts or images.

**Features:**
- Grid layout of alternatives (1-3 columns responsive)
- Visual selection indicator (blue border + checkmark)
- Hover effects for better UX
- Supports both flowcharts and images

**Props:**
- `title` - Section title
- `alternatives` - Array of alternative options
- `selectedId` - Currently selected alternative ID
- `onSelect` - Callback when alternative is selected
- `type` - 'flowchart' or 'image' (for future extensibility)

## API Response Structure

The backend should return lecture data with the following structure:

```javascript
{
  id: "lecture-123",
  title: "Lecture Title",
  description: "Lecture description",
  slides: [
    {
      id: "slide-1",
      content: "Slide text content...",
      selectedFlowchart: {
        id: "flowchart-1",
        url: "https://...",
        label: "Option 1"
      },
      selectedImage: {
        id: "image-1",
        url: "https://...",
        label: "Option 1"
      },
      flowcharts: [
        {
          id: "flowchart-1",
          url: "https://...",
          label: "Option 1"
        },
        {
          id: "flowchart-2",
          url: "https://...",
          label: "Option 2"
        }
      ],
      images: [
        {
          id: "image-1",
          url: "https://...",
          label: "Option 1"
        },
        {
          id: "image-2",
          url: "https://...",
          label: "Option 2"
        }
      ]
    }
  ]
}
```

## Backend API Endpoints

### 1. GET `/api/lectures/{lectureId}`
Returns lecture data with slides and alternatives.

**Response:** Lecture object (see structure above)

### 2. POST `/api/lectures/{lectureId}/selections`
Saves user's selected alternatives.

**Request Body:**
```javascript
{
  selections: {
    0: { flowchart: "flowchart-1", image: "image-1" },
    1: { flowchart: "flowchart-2", image: "image-2" }
  }
}
```

**Response:** Updated lecture object with selections applied

## Modified Files

### 1. **Processing.jsx**
- Changed redirect from `/lecture/{lectureId}` to `/preview/{lectureId}`
- Line 33: `navigate(\`/preview/${lectureId}\`)`

### 2. **useLectures.js Hook**
- Added `updateLectureSelections()` method
- Makes POST request to `/api/lectures/{lectureId}/selections`
- Updates lecture in context with new selections

### 3. **App.jsx**
- Added import for `PreviewCustomization`
- Added route: `<Route path="/preview/:lectureId" element={<PreviewCustomization />} />`

## User Flow

1. **User uploads file** → File is processed
2. **Processing completes** → Redirected to `/preview/{lectureId}`
3. **Preview page loads** → Shows first slide with alternatives
4. **User selects alternatives** → Preview updates in real-time
5. **User navigates slides** → Can customize each slide independently
6. **User clicks "Finalize"** → Selections are saved via API
7. **Redirected to lecture viewer** → Shows final lecture with selected content

## Styling & Responsiveness

- **Dark mode support** - All components use Tailwind dark: classes
- **Responsive grid** - Alternative selector uses responsive columns (1 on mobile, 2 on tablet, 3 on desktop)
- **Accessible** - Proper semantic HTML, ARIA labels, keyboard navigation support
- **Consistent design** - Uses existing Button, Card, Spinner components

## Future Enhancements

1. **Undo/Redo** - Allow users to revert changes
2. **Batch operations** - Apply same alternative to multiple slides
3. **Preview comparison** - Side-by-side comparison of alternatives
4. **Custom uploads** - Allow users to upload their own images/flowcharts
5. **Annotations** - Add notes or comments to slides
6. **Collaborative editing** - Multiple users editing same lecture

## Testing Considerations

- Test with various numbers of slides (0, 1, many)
- Test with missing alternatives (some slides may not have alternatives)
- Test real-time preview updates
- Test navigation between slides
- Test finalization and API call
- Test error handling (failed API calls, missing data)
- Test responsive design on different screen sizes
- Test dark mode styling

