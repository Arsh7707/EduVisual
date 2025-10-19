import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { validateFile } from '../../../utils/validators';
import { formatFileSize } from '../../../utils/formatters';
import { ACCEPTED_FILE_EXTENSIONS, MAX_FILE_SIZE } from '../../../utils/constants';

export function FileUploadZone({ onFileSelect, disabled = false }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      const errors = validateFile(file);

      if (errors.length > 0) {
        alert(errors.join('\n'));
        return;
      }

      onFileSelect(file);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
        isDragActive
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
          : 'border-gray-300 hover:border-blue-400 bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:hover:border-blue-400'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
      <p className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
        {isDragActive ? 'Drop your file here' : 'Drop your lecture file here'}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">or click to browse</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Supports: {ACCEPTED_FILE_EXTENSIONS.join(', ')} (Max {formatFileSize(MAX_FILE_SIZE)})
      </p>
    </div>
  );
}

