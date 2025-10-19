import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Spinner } from '../components/common/Spinner';
import { LectureCard } from '../components/features/Dashboard/LectureCard';
import { useLectures } from '../hooks/useLectures';
import { useNotification } from '../hooks/useNotification';
import { Plus, BookOpen } from 'lucide-react';

export function Dashboard() {
  const { lectures, fetchLectures, removeLecture, exportLecture } = useLectures();
  const { success, error: showError } = useNotification();
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(null);

  useEffect(() => {
    const loadLectures = async () => {
      try {
        setLoading(true);
        await fetchLectures();
      } catch (err) {
        // Silently handle loading errors without showing notification
      } finally {
        setLoading(false);
      }
    };

    loadLectures();
  }, [fetchLectures]);

  const handleDelete = async (lectureId) => {
    if (!window.confirm('Are you sure you want to delete this lecture?')) {
      return;
    }

    try {
      await removeLecture(lectureId);
      success('Lecture deleted successfully');
    } catch (err) {
      showError('Failed to delete lecture');
    }
  };

  const handleExport = async (lectureId, format) => {
    try {
      setExporting(lectureId);
      const data = await exportLecture(lectureId, format);
      success('Lecture exported successfully');
      // Trigger download if URL is provided
      if (data.downloadUrl) {
        window.open(data.downloadUrl, '_blank');
      }
    } catch (err) {
      showError('Failed to export lecture');
    } finally {
      setExporting(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pl-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">My Lectures</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage and view all your enhanced lectures
            </p>
          </div>
          <Link to="/upload">
            <Button variant="primary" size="lg" className="flex items-center gap-2">
              <Plus size={20} />
              New Lecture
            </Button>
          </Link>
        </div>

        {lectures.length === 0 ? (
          <Card>
            <CardBody className="text-center py-16">
              <BookOpen className="mx-auto mb-4 text-gray-400 dark:text-gray-600" size={48} />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">No lectures yet</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Upload your first lecture to get started with AI enhancement
              </p>
              <Link to="/upload">
                <Button variant="primary">Upload Lecture</Button>
              </Link>
            </CardBody>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lectures.map((lecture) => (
              <LectureCard
                key={lecture.id}
                lecture={lecture}
                onDelete={handleDelete}
                onExport={(id) => handleExport(id, 'pdf')}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

