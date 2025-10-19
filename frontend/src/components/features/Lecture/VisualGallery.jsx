import React, { useState } from 'react';
import { Card, CardBody } from '../../common/Card';
import { Modal } from '../../common/Modal';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function VisualGallery({ visuals = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  if (!visuals || visuals.length === 0) {
    return (
      <Card>
        <CardBody className="text-center py-12">
          <p className="text-gray-500">No visuals generated yet</p>
        </CardBody>
      </Card>
    );
  }

  const currentVisual = selectedIndex !== null ? visuals[selectedIndex] : null;

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? visuals.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === visuals.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visuals.map((visual, index) => (
          <Card
            key={index}
            className="cursor-pointer overflow-hidden"
            onClick={() => setSelectedIndex(index)}
          >
            <div className="aspect-video bg-gray-200 overflow-hidden">
              {visual.url ? (
                <img
                  src={visual.url}
                  alt={visual.title || `Visual ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-300">
                  <span className="text-gray-600">No image</span>
                </div>
              )}
            </div>
            <CardBody>
              <h3 className="font-semibold text-gray-900 truncate">{visual.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{visual.description}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Modal for full view */}
      <Modal
        isOpen={selectedIndex !== null}
        onClose={() => setSelectedIndex(null)}
        title={currentVisual?.title || 'Visual'}
        size="lg"
      >
        <div className="space-y-4">
          {currentVisual?.url && (
            <img
              src={currentVisual.url}
              alt={currentVisual.title}
              className="w-full rounded-lg"
            />
          )}
          <p className="text-gray-700">{currentVisual?.description}</p>
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
            >
              <ChevronLeft size={20} />
              Previous
            </button>
            <span className="text-sm text-gray-600">
              {selectedIndex + 1} / {visuals.length}
            </span>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
            >
              Next
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

