import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardBody } from '../components/common/Card';
import { Spinner } from '../components/common/Spinner';
import { useLectures } from '../hooks/useLectures';
import { useNotification } from '../hooks/useNotification';
import { LECTURE_STATUS } from '../utils/constants';
import { CheckCircle, AlertCircle } from 'lucide-react';

export function Processing() {
  const { lectureId } = useParams();
  const navigate = useNavigate();
  const { getLectureStatus } = useLectures();
  const { error: showError } = useNotification();
  const [status, setStatus] = useState(LECTURE_STATUS.PENDING);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lectureId) {
      navigate('/upload');
      return;
    }

    const pollStatus = async () => {
      try {
        const data = await getLectureStatus(lectureId);
        setStatus(data.status);
        setProgress(data.progress || 0);

        if (data.status === LECTURE_STATUS.COMPLETED) {
          // Redirect to lecture viewer after a short delay
          setTimeout(() => navigate(`/lecture/${lectureId}`), 1500);
        } else if (data.status === LECTURE_STATUS.FAILED) {
          setError(data.error || 'Processing failed');
        }
      } catch (err) {
        setError(err.message || 'Failed to get status');
        showError('Failed to check processing status');
      }
    };

    // Poll every 2 seconds
    const interval = setInterval(pollStatus, 2000);
    pollStatus(); // Initial call

    return () => clearInterval(interval);
  }, [lectureId, navigate, getLectureStatus, showError]);

  const getStatusMessage = () => {
    switch (status) {
      case LECTURE_STATUS.PENDING:
        return 'Preparing your lecture...';
      case LECTURE_STATUS.PROCESSING:
        return 'Processing your lecture with AI...';
      case LECTURE_STATUS.COMPLETED:
        return 'Processing complete! Redirecting...';
      case LECTURE_STATUS.FAILED:
        return 'Processing failed';
      default:
        return 'Processing...';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <Card>
          <CardBody className="text-center py-12">
            {status === LECTURE_STATUS.FAILED ? (
              <>
                <AlertCircle className="mx-auto mb-4 text-red-600" size={48} />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Processing Failed</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
                <button
                  onClick={() => navigate('/upload')}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Try uploading another file
                </button>
              </>
            ) : status === LECTURE_STATUS.COMPLETED ? (
              <>
                <CheckCircle className="mx-auto mb-4 text-green-600" size={48} />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Complete!</h2>
                <p className="text-gray-600 dark:text-gray-400">Redirecting to your lecture...</p>
              </>
            ) : (
              <>
                <Spinner size="lg" className="mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {getStatusMessage()}
                </h2>
                <div className="mt-6">
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-600 dark:bg-blue-500 h-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{progress}% complete</p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-6">
                  This may take a few minutes depending on file size
                </p>
              </>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

