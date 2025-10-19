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
import { ArrowLeft, Download } from 'lucide-react';

export function LectureViewer() {
  const { lectureId } = useParams();
  const navigate = useNavigate();
  const { getLecture, exportLecture } = useLectures();
  const { success, error: showError } = useNotification();
  const [lecture, setLecture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

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
              <p className="text-gray-600 dark:text-gray-400">{lecture.description}</p>
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

        {/* Visuals Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Generated Visuals</h2>
          <VisualGallery visuals={lecture.visuals || []} />
        </div>

        {/* Questions Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Quiz Questions</h2>
          {lecture.questions && lecture.questions.length > 0 ? (
            <div className="space-y-4">
              {lecture.questions.map((question, index) => (
                <QuestionCard key={index} question={question} index={index} />
              ))}
            </div>
          ) : (
            <Card>
              <CardBody className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-500">No questions generated yet</p>
              </CardBody>
            </Card>
          )}
        </div>
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

