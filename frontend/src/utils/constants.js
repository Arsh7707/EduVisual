export const SUPPORTED_FILE_TYPES = ['application/pdf', 'text/plain'];
export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
export const ACCEPTED_FILE_EXTENSIONS = ['.pdf', '.txt'];

export const LECTURE_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
};

export const EXPORT_FORMATS = {
  PDF: 'pdf',
  POWERPOINT: 'powerpoint',
  HTML: 'html',
};

export const COLORS = {
  primary: '#3B82F6',
  secondary: '#8B5CF6',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  neutral: '#6B7280',
};

export const FEATURES = [
  {
    icon: 'Sparkles',
    title: 'AI Enhancement',
    description: 'Automatically extract key topics and add concise explanations for clarity',
  },
  {
    icon: 'Image',
    title: 'Visual Generation',
    description: 'Auto-generate relevant images using AI to make content more engaging',
  },
  {
    icon: 'Download',
    title: 'Easy Export',
    description: 'Export your enhanced lectures to PowerPoint or PDF with one click',
  },
];

