import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardBody } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Spinner } from '../components/common/Spinner';
import { SlidePreview } from '../components/features/Preview/SlidePreview';
import { AlternativeSelector } from '../components/features/Preview/AlternativeSelector';
import { useLectures } from '../hooks/useLectures';
import { useNotification } from '../hooks/useNotification';
import { ArrowLeft, Check } from 'lucide-react';

export function PreviewCustomization() {
  const { lectureId } = useParams();
  const navigate = useNavigate();
  const { getLecture, updateLectureSelections } = useLectures();
  const { success, error: showError } = useNotification();

  const [lecture, setLecture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [selections, setSelections] = useState({});

  useEffect(() => {
    const loadLecture = async () => {
      try {
        setLoading(true);
        const data = await getLecture(lectureId);
        setLecture(data);
        // Initialize selections with current selections
        if (data.slides) {
          const initialSelections = {};
          data.slides.forEach((slide, index) => {
            initialSelections[index] = {
              flowchart: slide.selectedFlowchart?.id,
              image: slide.selectedImage?.id,
            };
          });
          setSelections(initialSelections);
        }
      } catch (err) {
        showError('Failed to load lecture');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    loadLecture();
  }, [lectureId, getLecture, showError, navigate]);

  const currentSlide = lecture?.slides?.[currentSlideIndex];

  const handleFlowchartSelect = (flowchart) => {
    setSelections({
      ...selections,
      [currentSlideIndex]: {
        ...selections[currentSlideIndex],
        flowchart: flowchart.id,
      },
    });
  };

  const handleImageSelect = (image) => {
    setSelections({
      ...selections,
      [currentSlideIndex]: {
        ...selections[currentSlideIndex],
        image: image.id,
      },
    });
  };

  const handleFinalize = async () => {
    try {
      setSaving(true);
      await updateLectureSelections(lectureId, selections);
      success('Selections saved successfully!');
      navigate(`/lecture/${lectureId}`);
    } catch (err) {
      showError('Failed to save selections');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!lecture || !lecture.slides || lecture.slides.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Card>
            <CardBody className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                No slides available for customization
              </p>
              <Button
                variant="primary"
                onClick={() => navigate('/dashboard')}
              >
                Back to Dashboard
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium mb-4"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Customize Your Lecture
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Preview and select your preferred flowcharts and images for each slide
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Slide Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardBody className="space-y-2">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Slides ({lecture.slides.length})
                </h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {lecture.slides.map((slide, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlideIndex(index)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        currentSlideIndex === index
                          ? 'bg-blue-600 dark:bg-blue-700 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Slide {index + 1}</span>
                        {selections[index]?.flowchart && (
                          <Check size={16} className="text-green-500" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Slide Preview */}
          <div className="lg:col-span-3">
            <SlidePreview slide={currentSlide} />
          </div>
        </div>

        {/* Alternative Selectors */}
        <div className="space-y-6 mb-8">
          {currentSlide?.flowcharts && currentSlide.flowcharts.length > 0 && (
            <AlternativeSelector
              title="Alternative Flowcharts"
              alternatives={currentSlide.flowcharts}
              selectedId={selections[currentSlideIndex]?.flowchart}
              onSelect={handleFlowchartSelect}
              type="flowchart"
            />
          )}

          {currentSlide?.images && currentSlide.images.length > 0 && (
            <AlternativeSelector
              title="Alternative Images"
              alternatives={currentSlide.images}
              selectedId={selections[currentSlideIndex]?.image}
              onSelect={handleImageSelect}
              type="image"
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate('/dashboard')}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={handleFinalize}
            loading={saving}
            disabled={saving}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <Check size={20} />
            Finalize & View Lecture
          </Button>
        </div>
      </div>
    </div>
  );
}

