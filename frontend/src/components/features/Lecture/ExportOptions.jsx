import React, { useState } from 'react';
import { Modal } from '../../common/Modal';
import { Button } from '../../common/Button';
import { EXPORT_FORMATS } from '../../../utils/constants';
import { FileText, Download } from 'lucide-react';

export function ExportOptions({ isOpen, onClose, onExport, loading = false }) {
  const [selectedFormat, setSelectedFormat] = useState(EXPORT_FORMATS.PDF);

  const formats = [
    {
      id: EXPORT_FORMATS.PDF,
      label: 'PDF',
      description: 'Export as a PDF document',
      icon: FileText,
    },
    {
      id: EXPORT_FORMATS.POWERPOINT,
      label: 'PowerPoint',
      description: 'Export as a PowerPoint presentation',
      icon: FileText,
    },
    {
      id: EXPORT_FORMATS.HTML,
      label: 'HTML',
      description: 'Export as an interactive HTML file',
      icon: FileText,
    },
  ];

  const handleExport = () => {
    onExport(selectedFormat);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Export Lecture" size="md">
      <div className="space-y-4">
        <p className="text-gray-600">Choose the format you want to export your lecture in:</p>

        <div className="space-y-3">
          {formats.map((format) => (
            <label
              key={format.id}
              className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors"
              style={{
                borderColor: selectedFormat === format.id ? '#3B82F6' : '#E5E7EB',
                backgroundColor: selectedFormat === format.id ? '#EFF6FF' : '#FFFFFF',
              }}
            >
              <input
                type="radio"
                name="format"
                value={format.id}
                checked={selectedFormat === format.id}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="w-4 h-4 text-blue-600"
              />
              <div className="ml-4 flex-1">
                <p className="font-medium text-gray-900">{format.label}</p>
                <p className="text-sm text-gray-600">{format.description}</p>
              </div>
            </label>
          ))}
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleExport}
            loading={loading}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <Download size={18} />
            Export
          </Button>
        </div>
      </div>
    </Modal>
  );
}

