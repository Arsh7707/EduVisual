import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardBody, CardHeader } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Spinner } from '../components/common/Spinner';
import { VisualGallery } from '../components/features/Lecture/VisualGallery';
import { QuestionCard } from '../components/features/Lecture/QuestionCard';
import { ExportOptions } from '../components/features/Lecture/ExportOptions';
import { useLectures } from '../hooks/useLectures';
import { useNotification } from '../hooks/useNotification';
import { ArrowLeft, Download, ChevronLeft, ChevronRight, BookOpen, Sparkles, HelpCircle } from 'lucide-react';

export function LectureViewer() {
  const { lectureId } = useParams();
  const navigate = useNavigate();
  const { getLecture, exportLecture } = useLectures();
  const { success, error: showError } = useNotification();
  const [lecture, setLecture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const loadLecture = async () => {
      try {
        setLoading(true);
        const data = await getLecture(lectureId);
        setLecture(data);
      } catch (err) {
        showError('Failed to load lecture');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    loadLecture();
  }, [lectureId, getLecture, showError, navigate]);

  const handleExport = async (format) => {
    try {
      setExporting(true);
      const data = await exportLecture(lectureId, format);
      success('Lecture exported successfully');
      if (data.downloadUrl) {
        window.open(data.downloadUrl, '_blank');
      }
      setShowExportModal(false);
    } catch (err) {
      showError('Failed to export lecture');
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!lecture) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Card>
            <CardBody className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">Lecture not found</p>
              <Button variant="primary" onClick={() => navigate('/dashboard')} className="mt-4">
                Back to Dashboard
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }

  const slides = lecture?.slides || [];
  const currentSlide = slides[currentSlideIndex];

  const handlePreviousSlide = () => {
    setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex(Math.min(slides.length - 1, currentSlideIndex + 1));
  };

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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{lecture.title}</h1>
              {slides.length > 0 && (
                <p className="text-gray-600 dark:text-gray-400">
                  Slide {currentSlideIndex + 1} of {slides.length}
                </p>
              )}
            </div>
            <Button
              variant="primary"
              onClick={() => setShowExportModal(true)}
              className="flex items-center gap-2"
            >
              <Download size={20} />
              Export
            </Button>
          </div>
        </div>

        {/* Slides View */}
        {slides.length > 0 ? (
          <div className="space-y-8">
            {/* Current Slide */}
            <Card className="border-2 border-blue-200 dark:border-blue-800">
              <CardBody className="space-y-6">
                {/* Slide Title */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {currentSlide?.title}
                  </h2>
                </div>

                {/* Original Content */}
                {currentSlide?.description && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen size={20} className="text-blue-600 dark:text-blue-400" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        Original Content
                      </h3>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-gray-700 dark:text-gray-300">
                      <p className="whitespace-pre-wrap leading-relaxed">{currentSlide.description}</p>
                    </div>
                  </div>
                )}

                {/* AI Enhanced Content */}
                {currentSlide?.enhancedContent && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles size={20} className="text-purple-600 dark:text-purple-400" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        AI-Enhanced Summary
                      </h3>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 text-gray-700 dark:text-gray-300">
                      {typeof currentSlide.enhancedContent === 'string' ? (
                        <p className="leading-relaxed">{currentSlide.enhancedContent}</p>
                      ) : (
                        <div className="space-y-3">
                          {currentSlide.enhancedContent.summary && (
                            <div>
                              <p className="font-semibold text-purple-900 dark:text-purple-200 mb-2">Summary:</p>
                              <p className="leading-relaxed">{currentSlide.enhancedContent.summary}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Selected Image */}
                {currentSlide?.selectedImage && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                      Visual Aid
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 flex items-center justify-center min-h-[300px]">
                      <img
                        src={currentSlide.selectedImage.urls?.regular || currentSlide.selectedImage.url}
                        alt={currentSlide.selectedImage.alt_description || 'Slide image'}
                        className="max-w-full max-h-[400px] object-contain rounded"
                      />
                    </div>
                  </div>
                )}

                {/* Questions */}
                {currentSlide?.questions && currentSlide.questions.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <HelpCircle size={20} className="text-green-600 dark:text-green-400" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        Discussion Questions
                      </h3>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 space-y-3">
                      {currentSlide.questions.map((question, idx) => (
                        <div key={idx} className="pb-3 border-b border-green-200 dark:border-green-800 last:border-b-0 last:pb-0">
                          <p className="font-semibold text-green-900 dark:text-green-200 mb-1">
                            Q{idx + 1}: {question.question}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                            Type: {question.type}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="secondary"
                onClick={handlePreviousSlide}
                disabled={currentSlideIndex === 0}
                className="flex items-center gap-2"
              >
                <ChevronLeft size={20} />
                Previous
              </Button>

              <div className="flex items-center gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlideIndex(idx)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      idx === currentSlideIndex
                        ? 'bg-blue-600 dark:bg-blue-400 w-8'
                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                    }`}
                    title={`Slide ${idx + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="secondary"
                onClick={handleNextSlide}
                disabled={currentSlideIndex === slides.length - 1}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight size={20} />
              </Button>
            </div>
          </div>
        ) : (
          <Card>
            <CardBody className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 mb-4">No slides available</p>
              <Button variant="primary" onClick={() => navigate('/dashboard')}>
                Back to Dashboard
              </Button>
            </CardBody>
          </Card>
        )}
      </div>

      {/* Export Modal */}
      <ExportOptions
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={handleExport}
        loading={exporting}
      />
    </div>
  );
}

