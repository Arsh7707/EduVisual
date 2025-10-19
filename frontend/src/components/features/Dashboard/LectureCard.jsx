import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardFooter } from '../../common/Card';
import { Button } from '../../common/Button';
import { formatDate } from '../../../utils/formatters';
import { LECTURE_STATUS } from '../../../utils/constants';
import { FileText, Trash2, Download } from 'lucide-react';

export function LectureCard({ lecture, onDelete, onExport }) {
  const getStatusColor = (status) => {
    switch (status) {
      case LECTURE_STATUS.COMPLETED:
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case LECTURE_STATUS.PROCESSING:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case LECTURE_STATUS.FAILED:
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg dark:hover:shadow-gray-700 transition-shadow">
      <CardBody>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3 flex-1">
            <FileText className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" size={24} />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">{lecture.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{lecture.fileName}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-2 ${getStatusColor(lecture.status)}`}>
            {getStatusLabel(lecture.status)}
          </span>
        </div>

        <div className="space-y-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
          <p>
            <span className="font-medium">Uploaded:</span> {formatDate(lecture.createdAt)}
          </p>
          {lecture.slides && (
            <p>
              <span className="font-medium">Slides:</span> {lecture.slides.length}
            </p>
          )}
          {lecture.topics && (
            <p>
              <span className="font-medium">Topics:</span> {lecture.topics.length}
            </p>
          )}
        </div>

        {lecture.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">{lecture.description}</p>
        )}
      </CardBody>

      <CardFooter className="flex gap-2">
        <Link to={`/lecture/${lecture.id}`} className="flex-1">
          <Button variant="primary" size="sm" className="w-full">
            View
          </Button>
        </Link>
        {lecture.status === LECTURE_STATUS.COMPLETED && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onExport?.(lecture.id)}
            className="flex items-center justify-center gap-2"
          >
            <Download size={16} />
            Export
          </Button>
        )}
        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete?.(lecture.id)}
          className="flex items-center justify-center gap-2"
        >
          <Trash2 size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
}

