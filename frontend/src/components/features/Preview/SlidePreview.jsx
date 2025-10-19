import React from 'react';
import { Card, CardBody } from '../../common/Card';
import { BookOpen, Sparkles, HelpCircle } from 'lucide-react';

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
        {/* Slide Title */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {slide.title}
          </h2>
        </div>

        {/* Original Content */}
        {slide.description && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={18} className="text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Original Content
              </h3>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-gray-700 dark:text-gray-300 max-h-48 overflow-y-auto">
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{slide.description}</p>
            </div>
          </div>
        )}

        {/* AI Enhanced Content */}
        {slide.enhancedContent && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={18} className="text-purple-600 dark:text-purple-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                AI-Enhanced Content
              </h3>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 text-gray-700 dark:text-gray-300 max-h-48 overflow-y-auto">
              {typeof slide.enhancedContent === 'string' ? (
                <p className="whitespace-pre-wrap text-sm leading-relaxed">{slide.enhancedContent}</p>
              ) : (
                <div className="text-sm space-y-3">
                  {slide.enhancedContent.summary && (
                    <div>
                      <p className="font-semibold text-purple-900 dark:text-purple-200 mb-1">Summary:</p>
                      <p className="leading-relaxed">{slide.enhancedContent.summary}</p>
                    </div>
                  )}
                  {slide.enhancedContent.sections && slide.enhancedContent.sections.length > 0 && (
                    <div>
                      <p className="font-semibold text-purple-900 dark:text-purple-200 mb-2">Key Points:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {slide.enhancedContent.sections.slice(0, 3).map((section, idx) => (
                          <li key={idx} className="text-xs">{section.summary || section.title}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Generated Questions */}
        {slide.questions && slide.questions.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle size={18} className="text-green-600 dark:text-green-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Discussion Questions ({slide.questions.length})
              </h3>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 space-y-3 max-h-48 overflow-y-auto">
              {slide.questions.slice(0, 3).map((question, idx) => (
                <div key={idx} className="text-sm">
                  <p className="font-semibold text-green-900 dark:text-green-200 mb-1">
                    Q{idx + 1}: {question.question}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 italic">
                    Type: {question.type}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Selected Image */}
        {slide.selectedImage && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Selected Image
            </h3>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 flex items-center justify-center min-h-[200px]">
              <img
                src={slide.selectedImage.urls?.regular || slide.selectedImage.url}
                alt={slide.selectedImage.alt_description || 'Slide image'}
                className="max-w-full max-h-[300px] object-contain rounded"
              />
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
}

