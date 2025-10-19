import React from 'react';
import { Card, CardBody, CardHeader } from '../../common/Card';

export function AlternativeSelector({
  title,
  alternatives,
  selectedId,
  onSelect,
  type = 'flowchart',
}) {
  if (!alternatives || alternatives.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {alternatives.map((alternative) => (
            <button
              key={alternative.id}
              onClick={() => onSelect(alternative)}
              className={`relative rounded-lg overflow-hidden transition-all duration-300 border-2 ${
                selectedId === alternative.id
                  ? 'border-blue-600 dark:border-blue-400 ring-2 ring-blue-300 dark:ring-blue-700'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              {/* Image Container */}
              <div className="bg-gray-50 dark:bg-gray-800 aspect-square flex items-center justify-center overflow-hidden">
                <img
                  src={alternative.url}
                  alt={alternative.label}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Label */}
              <div className="bg-white dark:bg-gray-700 p-3">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 text-center">
                  {alternative.label}
                </p>
              </div>

              {/* Selected Indicator */}
              {selectedId === alternative.id && (
                <div className="absolute top-2 right-2 bg-blue-600 dark:bg-blue-500 text-white rounded-full p-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

