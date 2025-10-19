import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardHeader } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { FileUploadZone } from '../components/features/Upload/FileUploadZone';
import { useLectures } from '../hooks/useLectures';
import { useNotification } from '../hooks/useNotification';
import { AppContext } from '../context/AppContext';
import { formatFileSize } from '../utils/formatters';

export function Upload() {
  const navigate = useNavigate();
  const { uploadLecture } = useLectures();
  const { success, error: showError } = useNotification();
  const { setLoading } = useContext(AppContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      showError('Please select a file first');
      return;
    }

    try {
      setIsUploading(true);
      setLoading(true);
      const lecture = await uploadLecture(selectedFile);
      success('Lecture uploaded successfully!');
      setSelectedFile(null);
      // Navigate to processing page
      navigate(`/processing/${lecture.id}`);
    } catch (err) {
      showError(err.message || 'Failed to upload lecture');
    } finally {
      setIsUploading(false);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Upload Lecture</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Upload your lecture materials (PDF or TXT) to get started with AI enhancement
          </p>
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold text-gray-900">Select Your File</h2>
          </CardHeader>
          <CardBody className="space-y-6">
            <FileUploadZone onFileSelect={handleFileSelect} disabled={isUploading} />

            {selectedFile && (
              <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Selected File</h3>
                <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <p>
                    <span className="font-medium">Name:</span> {selectedFile.name}
                  </p>
                  <p>
                    <span className="font-medium">Size:</span> {formatFileSize(selectedFile.size)}
                  </p>
                  <p>
                    <span className="font-medium">Type:</span> {selectedFile.type}
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={handleUpload}
                loading={isUploading}
                disabled={!selectedFile || isUploading}
                className="flex-1"
              >
                Upload & Process
              </Button>
              {selectedFile && (
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => setSelectedFile(null)}
                  disabled={isUploading}
                >
                  Clear
                </Button>
              )}
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-sm text-gray-600 dark:text-gray-400">
              <p className="font-semibold mb-2">Tips for best results:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Use clear, well-formatted lecture materials</li>
                <li>PDF files work best for complex layouts</li>
                <li>Ensure text is readable and not scanned images</li>
                <li>Maximum file size is 50MB</li>
              </ul>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

