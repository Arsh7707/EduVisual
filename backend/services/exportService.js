import PptxGenJs from 'pptxgenjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Export lecture to PowerPoint format
 * @param {Object} lectureData - The lecture data to export
 * @param {string} filename - Output filename
 * @returns {Promise<Object>} - Export result with file path
 */
export async function exportToPowerPoint(lectureData, filename = 'lecture.pptx') {
  try {
    const prs = new PptxGenJs();

    // Set presentation properties
    prs.defineLayout({ name: 'LAYOUT1', width: 10, height: 7.5 });
    prs.defineLayout({ name: 'LAYOUT2', width: 10, height: 7.5 });

    // Title slide
    const titleSlide = prs.addSlide();
    titleSlide.background = { color: '3B82F6' };
    titleSlide.addText(lectureData.title || 'Lecture', {
      x: 0.5,
      y: 2.5,
      w: 9,
      h: 1.5,
      fontSize: 54,
      bold: true,
      color: 'FFFFFF',
      align: 'center'
    });

    if (lectureData.subtitle) {
      titleSlide.addText(lectureData.subtitle, {
        x: 0.5,
        y: 4.2,
        w: 9,
        h: 0.8,
        fontSize: 24,
        color: 'E0E7FF',
        align: 'center'
      });
    }

    // Content slides
    if (lectureData.sections && Array.isArray(lectureData.sections)) {
      for (const section of lectureData.sections) {
        // Section title slide
        const sectionSlide = prs.addSlide();
        sectionSlide.background = { color: 'F3F4F6' };
        sectionSlide.addText(section.title || 'Section', {
          x: 0.5,
          y: 1,
          w: 9,
          h: 1,
          fontSize: 40,
          bold: true,
          color: '1F2937'
        });

        // Section content
        if (section.content) {
          sectionSlide.addText(section.content, {
            x: 0.5,
            y: 2.2,
            w: 9,
            h: 4.5,
            fontSize: 14,
            color: '374151',
            align: 'left'
          });
        }

        // Add questions if available
        if (section.questions && Array.isArray(section.questions)) {
          const questionsSlide = prs.addSlide();
          questionsSlide.background = { color: 'FFFFFF' };
          questionsSlide.addText(`${section.title} - Questions`, {
            x: 0.5,
            y: 0.5,
            w: 9,
            h: 0.6,
            fontSize: 28,
            bold: true,
            color: '1F2937'
          });

          let yPos = 1.3;
          for (const question of section.questions.slice(0, 3)) {
            questionsSlide.addText(`Q: ${question.question}`, {
              x: 0.7,
              y: yPos,
              w: 8.6,
              h: 0.8,
              fontSize: 12,
              bold: true,
              color: '1F2937'
            });
            yPos += 0.9;

            if (question.type === 'multiple-choice' && question.options) {
              for (const [key, value] of Object.entries(question.options)) {
                questionsSlide.addText(`${key}) ${value}`, {
                  x: 1,
                  y: yPos,
                  w: 8.3,
                  h: 0.5,
                  fontSize: 11,
                  color: '4B5563'
                });
                yPos += 0.5;
              }
            }
            yPos += 0.3;
          }
        }
      }
    }

    // Save presentation
    const exportsDir = path.join(__dirname, '../exports');
    if (!fs.existsSync(exportsDir)) {
      fs.mkdirSync(exportsDir, { recursive: true });
    }

    const filepath = path.join(exportsDir, filename);
    await prs.writeFile({ fileName: filepath });

    return {
      success: true,
      format: 'powerpoint',
      filename: filename,
      filepath: filepath,
      message: 'Lecture exported to PowerPoint successfully'
    };
  } catch (error) {
    console.error('Error exporting to PowerPoint:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Export lecture to PDF format (HTML-based)
 * @param {Object} lectureData - The lecture data to export
 * @param {string} filename - Output filename
 * @returns {Promise<Object>} - Export result with file path
 */
export async function exportToPDF(lectureData, filename = 'lecture.pdf') {
  try {
    // Generate HTML content
    const htmlContent = generateHTMLContent(lectureData);

    // For now, return the HTML that can be converted to PDF on the frontend
    // In production, you'd use a library like puppeteer or wkhtmltopdf

    const exportsDir = path.join(__dirname, '../exports');
    if (!fs.existsSync(exportsDir)) {
      fs.mkdirSync(exportsDir, { recursive: true });
    }

    const htmlFilepath = path.join(exportsDir, filename.replace('.pdf', '.html'));
    fs.writeFileSync(htmlFilepath, htmlContent);

    return {
      success: true,
      format: 'pdf',
      filename: filename,
      htmlContent: htmlContent,
      message: 'Lecture prepared for PDF export'
    };
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Generate HTML content from lecture data
 * @param {Object} lectureData - The lecture data
 * @returns {string} - HTML content
 */
function generateHTMLContent(lectureData) {
  let html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${lectureData.title || 'Lecture'}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
    .page { page-break-after: always; padding: 40px; }
    .title-page { background: linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%); color: white; display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 100vh; }
    .title-page h1 { font-size: 48px; margin-bottom: 20px; }
    .title-page p { font-size: 24px; opacity: 0.9; }
    h1 { color: #1F2937; font-size: 36px; margin-bottom: 20px; border-bottom: 3px solid #3B82F6; padding-bottom: 10px; }
    h2 { color: #374151; font-size: 28px; margin-top: 30px; margin-bottom: 15px; }
    h3 { color: #4B5563; font-size: 20px; margin-top: 20px; margin-bottom: 10px; }
    p { margin-bottom: 15px; text-align: justify; }
    .section { margin-bottom: 40px; }
    .question { background: #F3F4F6; padding: 15px; margin: 15px 0; border-left: 4px solid #3B82F6; }
    .question-text { font-weight: bold; margin-bottom: 10px; }
    .options { margin-left: 20px; }
    .option { margin: 5px 0; }
    .answer { color: #059669; font-weight: bold; margin-top: 10px; }
    .explanation { color: #6B7280; font-size: 14px; margin-top: 10px; font-style: italic; }
    img { max-width: 100%; height: auto; margin: 20px 0; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { border: 1px solid #D1D5DB; padding: 12px; text-align: left; }
    th { background: #3B82F6; color: white; }
  </style>
</head>
<body>
  <div class="page title-page">
    <h1>${lectureData.title || 'Lecture'}</h1>
    ${lectureData.subtitle ? `<p>${lectureData.subtitle}</p>` : ''}
  </div>
`;

  // Add sections
  if (lectureData.sections && Array.isArray(lectureData.sections)) {
    for (const section of lectureData.sections) {
      html += `
  <div class="page">
    <div class="section">
      <h1>${section.title || 'Section'}</h1>
      ${section.content ? `<p>${section.content}</p>` : ''}
`;

      // Add questions
      if (section.questions && Array.isArray(section.questions)) {
        html += '<h2>Questions</h2>';
        for (const question of section.questions) {
          html += `
      <div class="question">
        <div class="question-text">${question.question}</div>
`;
          if (question.type === 'multiple-choice' && question.options) {
            html += '<div class="options">';
            for (const [key, value] of Object.entries(question.options)) {
              html += `<div class="option">${key}) ${value}</div>`;
            }
            html += '</div>';
          }
          if (question.correctAnswer) {
            html += `<div class="answer">Answer: ${question.correctAnswer}</div>`;
          }
          if (question.explanation) {
            html += `<div class="explanation">${question.explanation}</div>`;
          }
          html += '</div>';
        }
      }

      html += '</div></div>';
    }
  }

  html += '</body></html>';
  return html;
}

/**
 * Export lecture as JSON
 * @param {Object} lectureData - The lecture data
 * @param {string} filename - Output filename
 * @returns {Promise<Object>} - Export result
 */
export async function exportToJSON(lectureData, filename = 'lecture.json') {
  try {
    const exportsDir = path.join(__dirname, '../exports');
    if (!fs.existsSync(exportsDir)) {
      fs.mkdirSync(exportsDir, { recursive: true });
    }

    const filepath = path.join(exportsDir, filename);
    fs.writeFileSync(filepath, JSON.stringify(lectureData, null, 2));

    return {
      success: true,
      format: 'json',
      filename: filename,
      filepath: filepath,
      message: 'Lecture exported to JSON successfully'
    };
  } catch (error) {
    console.error('Error exporting to JSON:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

