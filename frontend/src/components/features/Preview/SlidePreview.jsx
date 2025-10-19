import React from 'react';
import { Card, CardBody } from '../../common/Card';

export function SlidePreview({ slide, onFlowchartSelect, onImageSelect }) {
  if (!slide) {
    return (
      <Card>
        <CardBody className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">No slide selected</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardBody className="space-y-6">
        {/* Slide Content */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Slide Content
          </h3>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-gray-700 dark:text-gray-300">
            {slide.content}
          </div>
        </div>

        {/* Selected Flowchart */}
        {slide.selectedFlowchart && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Current Flowchart
            </h3>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 flex items-center justify-center min-h-[200px]">
              <img
                src={slide.selectedFlowchart.url}
                alt={slide.selectedFlowchart.label}
                className="max-w-full max-h-[300px] object-contain"
              />
            </div>
          </div>
        )}

        {/* Selected Image */}
        {slide.selectedImage && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Current Image
            </h3>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 flex items-center justify-center min-h-[200px]">
              <img
                src={slide.selectedImage.url}
                alt={slide.selectedImage.label}
                className="max-w-full max-h-[300px] object-contain"
              />
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
}

