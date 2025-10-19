# Developer Quick Reference - Preview & Customization Feature

## 🎯 Quick Overview

The preview customization feature adds an intermediate step between file processing and lecture viewing, allowing users to select preferred alternatives for flowcharts and images.

## 📂 File Locations

```
frontend/
├── src/
│   ├── pages/
│   │   ├── PreviewCustomization.jsx          ← Main page (NEW)
│   │   ├── Processing.jsx                    ← Modified (redirect changed)
│   │   └── Upload.jsx
│   ├── components/
│   │   └── features/
│   │       └── Preview/                      ← New folder
│   │           ├── SlidePreview.jsx          ← New component
│   │           └── AlternativeSelector.jsx   ← New component
│   ├── hooks/
│   │   └── useLectures.js                    ← Modified (new method added)
│   └── App.jsx                               ← Modified (route added)
└── PREVIEW_CUSTOMIZATION_IMPLEMENTATION.md   ← Documentation (NEW)
```

## 🔧 Key Code Snippets

### 1. Using the Preview Page

```javascript
// In PreviewCustomization.jsx
const { lectureId } = useParams();
const { getLecture, updateLectureSelections } = useLectures();

// Load lecture with slides and alternatives
const data = await getLecture(lectureId);

// Save selections
await updateLectureSelections(lectureId, selections);
```

### 2. Selection State Structure

```javascript
// Track selections for each slide
const selections = {
  0: { flowchart: "flowchart-1", image: "image-1" },
  1: { flowchart: "flowchart-2", image: "image-2" },
  // ... more slides
};
```

### 3. Handling Selection Changes

```javascript
const handleFlowchartSelect = (flowchart) => {
  setSelections({
    ...selections,
    [currentSlideIndex]: {
      ...selections[currentSlideIndex],
      flowchart: flowchart.id,
    },
  });
};
```

### 4. Using AlternativeSelector Component

```javascript
<AlternativeSelector
  title="Alternative Flowcharts"
  alternatives={currentSlide.flowcharts}
  selectedId={selections[currentSlideIndex]?.flowchart}
  onSelect={handleFlowchartSelect}
  type="flowchart"
/>
```

## 🔌 Backend Integration Checklist

- [ ] Enhance `GET /api/lectures/{lectureId}` to return:
  - `slides` array with slide data
  - `selectedFlowchart` and `selectedImage` for each slide
  - `flowcharts` array with alternatives for each slide
  - `images` array with alternatives for each slide

- [ ] Implement `POST /api/lectures/{lectureId}/selections` to:
  - Accept selections object
  - Update database with selected alternatives
  - Return updated lecture object

- [ ] Ensure database schema supports:
  - Multiple alternatives per slide
  - Tracking selected alternatives
  - Persisting user selections

## 🧪 Testing Checklist

### Functionality
- [ ] Load lecture with slides and alternatives
- [ ] Display first slide on page load
- [ ] Navigate between slides
- [ ] Select different flowcharts
- [ ] Select different images
- [ ] Preview updates in real-time
- [ ] Finalize saves selections
- [ ] Redirect to lecture viewer after finalize

### Edge Cases
- [ ] Handle lecture with 0 slides
- [ ] Handle slides with no alternatives
- [ ] Handle missing flowchart data
- [ ] Handle missing image data
- [ ] Handle API errors gracefully

### UI/UX
- [ ] Responsive on mobile (1 column)
- [ ] Responsive on tablet (2 columns)
- [ ] Responsive on desktop (3 columns)
- [ ] Dark mode styling works
- [ ] Loading spinner displays
- [ ] Error messages display
- [ ] Buttons are clickable and responsive

### Performance
- [ ] Images load efficiently
- [ ] No unnecessary re-renders
- [ ] Smooth transitions between slides
- [ ] Fast selection updates

## 🎨 Styling Reference

### Colors (Tailwind)
- **Primary**: `blue-600` / `dark:blue-400`
- **Background**: `gray-50` / `dark:gray-900`
- **Cards**: `white` / `dark:gray-800`
- **Text**: `gray-900` / `dark:gray-100`
- **Borders**: `gray-200` / `dark:gray-700`

### Responsive Breakpoints
- **Mobile**: Default (1 column)
- **Tablet**: `sm:` (2 columns)
- **Desktop**: `lg:` (3 columns)

### Component Classes
- **Card**: `bg-white dark:bg-gray-800 rounded-lg shadow`
- **Button**: Uses `<Button>` component with variants
- **Grid**: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`

## 🐛 Common Issues & Solutions

### Issue: Selections not persisting
**Solution**: Ensure `updateLectureSelections` is called before navigation

### Issue: Preview not updating
**Solution**: Check that `currentSlideIndex` is being updated correctly

### Issue: Images not loading
**Solution**: Verify image URLs in API response are valid and accessible

### Issue: Dark mode not working
**Solution**: Ensure all classes use `dark:` prefix for dark mode variants

### Issue: Responsive layout broken
**Solution**: Check that Tailwind responsive prefixes are correct (sm:, lg:, etc.)

## 📊 Data Flow

```
User Action
    ↓
Event Handler (handleFlowchartSelect, etc.)
    ↓
Update selections state
    ↓
Component re-renders
    ↓
Preview updates in real-time
    ↓
User clicks Finalize
    ↓
Call updateLectureSelections()
    ↓
POST to /api/lectures/{id}/selections
    ↓
Backend saves selections
    ↓
Navigate to /lecture/{id}
    ↓
Lecture viewer displays final content
```

## 🚀 Deployment Notes

1. **Frontend**: No special deployment steps needed
2. **Backend**: Must implement the two API endpoints before deploying
3. **Database**: May need migration to support alternatives storage
4. **Testing**: Test full workflow end-to-end before production

## 📞 Support

For issues or questions:
1. Check `PREVIEW_CUSTOMIZATION_IMPLEMENTATION.md` for detailed docs
2. Review component code comments
3. Check test files for usage examples
4. Refer to existing similar components for patterns

## 🔗 Related Files

- `frontend/src/hooks/useLectures.js` - API integration
- `frontend/src/components/common/Card.jsx` - Card component
- `frontend/src/components/common/Button.jsx` - Button component
- `frontend/src/components/common/Spinner.jsx` - Loading spinner
- `frontend/src/context/AppContext.jsx` - State management

