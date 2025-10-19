import React, { useState } from 'react';
import { Card, CardBody } from '../../common/Card';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function QuestionCard({ question, index }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="mb-4">
      <CardBody>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-start justify-between gap-4 text-left"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-sm font-semibold">
                {index + 1}
              </span>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">{question.question}</h3>
            </div>
            {isExpanded && (
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Options:</p>
                  <ul className="space-y-2">
                    {question.options?.map((option, idx) => (
                      <li key={idx} className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">{String.fromCharCode(65 + idx)}.</span> {option}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Correct Answer:</p>
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium">{question.correctAnswer}</p>
                </div>
                {question.explanation && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Explanation:</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{question.explanation}</p>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex-shrink-0 text-gray-400 dark:text-gray-600">
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </button>
      </CardBody>
    </Card>
  );
}

