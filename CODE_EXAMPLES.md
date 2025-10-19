# Code Examples - Preview & Customization Feature

## Example 1: Backend API Response Structure

### GET `/api/lectures/{lectureId}`

```javascript
{
  id: "lecture-abc123",
  title: "Introduction to Machine Learning",
  description: "A comprehensive guide to ML basics",
  status: "COMPLETED",
  slides: [
    {
      id: "slide-1",
      content: "Machine Learning is a subset of AI that enables systems to learn from data...",
      selectedFlowchart: {
        id: "flowchart-1",
        url: "https://cdn.example.com/flowcharts/ml-process-1.png",
        label: "ML Process Flow"
      },
      selectedImage: {
        id: "image-1",
        url: "https://cdn.example.com/images/ml-diagram-1.png",
        label: "ML Diagram"
      },
      flowcharts: [
        {
          id: "flowchart-1",
          url: "https://cdn.example.com/flowcharts/ml-process-1.png",
          label: "ML Process Flow"
        },
        {
          id: "flowchart-2",
          url: "https://cdn.example.com/flowcharts/ml-process-2.png",
          label: "Alternative Flow"
        },
        {
          id: "flowchart-3",
          url: "https://cdn.example.com/flowcharts/ml-process-3.png",
          label: "Detailed Flow"
        }
      ],
      images: [
        {
          id: "image-1",
          url: "https://cdn.example.com/images/ml-diagram-1.png",
          label: "ML Diagram"
        },
        {
          id: "image-2",
          url: "https://cdn.example.com/images/ml-diagram-2.png",
          label: "Alternative Diagram"
        }
      ]
    },
    {
      id: "slide-2",
      content: "Supervised learning uses labeled data to train models...",
      selectedFlowchart: {
        id: "flowchart-4",
        url: "https://cdn.example.com/flowcharts/supervised-1.png",
        label: "Supervised Learning"
      },
      selectedImage: {
        id: "image-3",
        url: "https://cdn.example.com/images/supervised-1.png",
        label: "Supervised Learning"
      },
      flowcharts: [
        {
          id: "flowchart-4",
          url: "https://cdn.example.com/flowcharts/supervised-1.png",
          label: "Supervised Learning"
        },
        {
          id: "flowchart-5",
          url: "https://cdn.example.com/flowcharts/supervised-2.png",
          label: "Alternative"
        }
      ],
      images: [
        {
          id: "image-3",
          url: "https://cdn.example.com/images/supervised-1.png",
          label: "Supervised Learning"
        },
        {
          id: "image-4",
          url: "https://cdn.example.com/images/supervised-2.png",
          label: "Alternative"
        }
      ]
    }
  ]
}
```

## Example 2: POST Request to Save Selections

### POST `/api/lectures/{lectureId}/selections`

**Request Body:**
```javascript
{
  selections: {
    0: {
      flowchart: "flowchart-1",
      image: "image-1"
    },
    1: {
      flowchart: "flowchart-5",
      image: "image-4"
    }
  }
}
```

**Response:**
```javascript
{
  id: "lecture-abc123",
  title: "Introduction to Machine Learning",
  // ... rest of lecture data with updated selections
  slides: [
    {
      id: "slide-1",
      selectedFlowchart: { id: "flowchart-1", ... },
      selectedImage: { id: "image-1", ... }
    },
    {
      id: "slide-2",
      selectedFlowchart: { id: "flowchart-5", ... },
      selectedImage: { id: "image-4", ... }
    }
  ]
}
```

## Example 3: Using the useLectures Hook

```javascript
import { useLectures } from '../hooks/useLectures';

function MyComponent() {
  const { getLecture, updateLectureSelections } = useLectures();

  // Load lecture with alternatives
  const loadLecture = async (lectureId) => {
    try {
      const lecture = await getLecture(lectureId);
      console.log('Lecture loaded:', lecture);
      // lecture.slides contains all alternatives
    } catch (error) {
      console.error('Failed to load:', error);
    }
  };

  // Save user selections
  const saveSelections = async (lectureId, selections) => {
    try {
      const updated = await updateLectureSelections(lectureId, selections);
      console.log('Selections saved:', updated);
    } catch (error) {
      console.error('Failed to save:', error);
    }
  };

  return (
    <div>
      <button onClick={() => loadLecture('lecture-123')}>Load</button>
      <button onClick={() => saveSelections('lecture-123', {
        0: { flowchart: 'fc-1', image: 'img-1' }
      })}>Save</button>
    </div>
  );
}
```

## Example 4: Component Usage

```javascript
import { SlidePreview } from '../components/features/Preview/SlidePreview';
import { AlternativeSelector } from '../components/features/Preview/AlternativeSelector';

function PreviewPage() {
  const [currentSlide, setCurrentSlide] = useState(null);
  const [selections, setSelections] = useState({});

  const handleFlowchartSelect = (flowchart) => {
    setSelections({
      ...selections,
      flowchart: flowchart.id
    });
  };

  return (
    <div>
      {/* Display current slide */}
      <SlidePreview slide={currentSlide} />

      {/* Show alternatives */}
      <AlternativeSelector
        title="Choose a Flowchart"
        alternatives={currentSlide?.flowcharts}
        selectedId={selections.flowchart}
        onSelect={handleFlowchartSelect}
        type="flowchart"
      />

      <AlternativeSelector
        title="Choose an Image"
        alternatives={currentSlide?.images}
        selectedId={selections.image}
        onSelect={(image) => setSelections({
          ...selections,
          image: image.id
        })}
        type="image"
      />
    </div>
  );
}
```

## Example 5: State Management Pattern

```javascript
// Initialize selections from lecture data
const initializeSelections = (slides) => {
  const selections = {};
  slides.forEach((slide, index) => {
    selections[index] = {
      flowchart: slide.selectedFlowchart?.id,
      image: slide.selectedImage?.id,
    };
  });
  return selections;
};

// Update selection for current slide
const updateSelection = (selections, slideIndex, type, id) => {
  return {
    ...selections,
    [slideIndex]: {
      ...selections[slideIndex],
      [type]: id,
    },
  };
};

// Usage
const selections = initializeSelections(lecture.slides);
const updated = updateSelection(selections, 0, 'flowchart', 'fc-2');
```

## Example 6: Error Handling

```javascript
const handleFinalize = async () => {
  try {
    setSaving(true);
    
    // Validate selections
    if (!selections || Object.keys(selections).length === 0) {
      showError('Please make at least one selection');
      return;
    }

    // Save to backend
    const result = await updateLectureSelections(lectureId, selections);
    
    if (!result) {
      showError('Failed to save selections');
      return;
    }

    success('Selections saved successfully!');
    navigate(`/lecture/${lectureId}`);
    
  } catch (error) {
    console.error('Error:', error);
    showError(error.message || 'An error occurred');
  } finally {
    setSaving(false);
  }
};
```

## Example 7: Responsive Grid Layout

```javascript
// AlternativeSelector uses this grid pattern
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {alternatives.map((alt) => (
    <button key={alt.id} className="...">
      {/* Alternative card */}
    </button>
  ))}
</div>

// Breakpoints:
// - Mobile (default): 1 column
// - Tablet (sm:): 2 columns
// - Desktop (lg:): 3 columns
```

## Example 8: Dark Mode Support

```javascript
// All components use dark: prefix for dark mode
<div className="bg-white dark:bg-gray-800">
  <h1 className="text-gray-900 dark:text-gray-100">Title</h1>
  <p className="text-gray-600 dark:text-gray-400">Description</p>
  <button className="border-gray-200 dark:border-gray-700">
    Button
  </button>
</div>
```

## Example 9: Loading States

```javascript
// Show spinner while loading
if (loading) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner size="lg" />
    </div>
  );
}

// Show button loading state
<Button
  loading={saving}
  disabled={saving}
  onClick={handleFinalize}
>
  {saving ? 'Saving...' : 'Finalize'}
</Button>
```

## Example 10: Navigation Flow

```javascript
// After upload completes
navigate(`/processing/${lecture.id}`);

// After processing completes
navigate(`/preview/${lecture.id}`);

// After finalization
navigate(`/lecture/${lecture.id}`);

// Cancel from preview
navigate('/dashboard');
```

