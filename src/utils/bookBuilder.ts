/**
 * Book Builder Utilities - Set 6
 * 
 * Utilities for combining multiple newsletter drafts into a single
 * "Event Book" document for faculty download.
 * 
 * Features:
 * - Combine drafts into magazine-style HTML book
 * - Generate PDF using jspdf + html2canvas
 * - Generate PNG using html2canvas
 * - Fallback to text download if libraries fail
 */

import type { PublishedDraft } from '../data/publishedDrafts';

/**
 * Format a date for display
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format a date range for the book title
 */
function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const startStr = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const endStr = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  return `${startStr} → ${endStr}`;
}

/**
 * Build the complete HTML book from multiple drafts
 */
export function buildBookHtml(
  drafts: PublishedDraft[],
  startDate: string,
  endDate: string,
  options?: {
    includeImages?: boolean;
    compactMode?: boolean;
    includeFacultyAttendance?: boolean;
  }
): string {
  const { includeImages = true, compactMode = false } = options || {};
  const dateRange = formatDateRange(startDate, endDate);
  
  // Generate table of contents
  const tocEntries = drafts.map((draft, index) => ({
    title: draft.title,
    date: formatDate(draft.date),
    club: draft.club,
    page: index + 2, // Page 1 is title page
  }));

  // Build the HTML document
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IIIT Event Compendium (${dateRange})</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: 'Georgia', 'Times New Roman', serif;
      background: #f8f9fa;
      color: #333;
      line-height: 1.6;
    }
    
    .book-container {
      max-width: 900px;
      margin: 0 auto;
      background: white;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
    }
    
    /* Title Page */
    .title-page {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 50%, #1e3a5f 100%);
      color: white;
      padding: 60px 40px;
      position: relative;
      overflow: hidden;
    }
    
    .title-page::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      opacity: 0.3;
    }
    
    .title-page h1 {
      font-size: 48px;
      font-weight: 700;
      margin-bottom: 16px;
      letter-spacing: -1px;
      position: relative;
      z-index: 1;
    }
    
    .title-page .subtitle {
      font-size: 24px;
      font-weight: 300;
      margin-bottom: 40px;
      opacity: 0.9;
      position: relative;
      z-index: 1;
    }
    
    .title-page .date-range {
      font-size: 20px;
      padding: 12px 32px;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 50px;
      backdrop-filter: blur(10px);
      position: relative;
      z-index: 1;
    }
    
    .title-page .college-name {
      position: absolute;
      bottom: 40px;
      font-size: 16px;
      opacity: 0.7;
      letter-spacing: 3px;
      text-transform: uppercase;
    }
    
    .title-page .decoration {
      position: absolute;
      width: 200px;
      height: 200px;
      border: 2px solid rgba(255, 255, 255, 0.1);
      border-radius: 50%;
    }
    
    .title-page .decoration-1 { top: -50px; right: -50px; }
    .title-page .decoration-2 { bottom: -80px; left: -80px; width: 300px; height: 300px; }
    
    /* Table of Contents */
    .toc-page {
      padding: 60px 50px;
      background: #fafafa;
      border-bottom: 1px solid #e5e7eb;
    }
    
    .toc-page h2 {
      font-size: 32px;
      color: #1e3a5f;
      margin-bottom: 8px;
      font-weight: 600;
    }
    
    .toc-page .toc-subtitle {
      color: #666;
      font-size: 14px;
      margin-bottom: 40px;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    
    .toc-list {
      list-style: none;
    }
    
    .toc-item {
      display: flex;
      align-items: baseline;
      padding: 16px 0;
      border-bottom: 1px dashed #ddd;
    }
    
    .toc-item:last-child {
      border-bottom: none;
    }
    
    .toc-number {
      font-size: 24px;
      font-weight: 700;
      color: #1e3a5f;
      width: 50px;
      flex-shrink: 0;
    }
    
    .toc-content {
      flex: 1;
    }
    
    .toc-title {
      font-size: 18px;
      color: #333;
      font-weight: 500;
    }
    
    .toc-meta {
      font-size: 13px;
      color: #888;
      margin-top: 4px;
    }
    
    .toc-page-num {
      font-size: 14px;
      color: #1e3a5f;
      font-weight: 600;
      width: 40px;
      text-align: right;
    }
    
    /* Event Section */
    .event-section {
      padding: ${compactMode ? '40px' : '60px'} 50px;
      border-bottom: 1px solid #e5e7eb;
      page-break-inside: avoid;
    }
    
    .event-section:nth-child(even) {
      background: #fafafa;
    }
    
    .event-header {
      margin-bottom: ${compactMode ? '24px' : '40px'};
      padding-bottom: 20px;
      border-bottom: 3px solid #1e3a5f;
    }
    
    .event-number {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 3px;
      color: #888;
      margin-bottom: 8px;
    }
    
    .event-title {
      font-size: ${compactMode ? '28px' : '36px'};
      color: #1e3a5f;
      font-weight: 700;
      margin-bottom: 12px;
      line-height: 1.2;
    }
    
    .event-meta {
      display: flex;
      gap: 24px;
      flex-wrap: wrap;
      font-size: 14px;
      color: #666;
    }
    
    .event-meta span {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    
    .event-summary {
      font-size: ${compactMode ? '16px' : '18px'};
      line-height: 1.8;
      color: #444;
      margin-bottom: ${compactMode ? '24px' : '32px'};
    }
    
    .event-gallery {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(${compactMode ? '150px' : '200px'}, 1fr));
      gap: ${compactMode ? '12px' : '16px'};
      margin-bottom: 32px;
    }
    
    .event-gallery img {
      width: 100%;
      height: ${compactMode ? '120px' : '160px'};
      object-fit: cover;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    .event-content-wrapper {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
    }
    
    .event-content-wrapper iframe {
      display: none;
    }
    
    /* Embedded newsletter preview */
    .newsletter-embed {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      overflow: hidden;
    }
    
    /* Footer */
    .book-footer {
      padding: 40px 50px;
      background: #1e3a5f;
      color: white;
      text-align: center;
    }
    
    .book-footer p {
      font-size: 14px;
      opacity: 0.8;
    }
    
    .book-footer .college {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 8px;
      opacity: 1;
    }
    
    /* Print styles */
    @media print {
      .book-container {
        box-shadow: none;
      }
      
      .title-page {
        page-break-after: always;
      }
      
      .toc-page {
        page-break-after: always;
      }
      
      .event-section {
        page-break-inside: avoid;
        page-break-after: always;
      }
    }
    
    /* Page numbers */
    .page-indicator {
      text-align: center;
      padding: 16px;
      font-size: 12px;
      color: #888;
      border-top: 1px solid #e5e7eb;
    }
  </style>
</head>
<body>
  <div class="book-container">
    <!-- Title Page -->
    <div class="title-page">
      <div class="decoration decoration-1"></div>
      <div class="decoration decoration-2"></div>
      <h1>Event Compendium</h1>
      <p class="subtitle">A Collection of Campus Highlights</p>
      <p class="date-range">${dateRange}</p>
      <p class="college-name">IIIT College Newsletter Archive</p>
    </div>
    
    <!-- Table of Contents -->
    <div class="toc-page">
      <h2>Contents</h2>
      <p class="toc-subtitle">${drafts.length} Event${drafts.length !== 1 ? 's' : ''} in this Compendium</p>
      <ul class="toc-list">
`;

  // Add TOC entries
  tocEntries.forEach((entry, index) => {
    html += `
        <li class="toc-item">
          <span class="toc-number">${String(index + 1).padStart(2, '0')}</span>
          <div class="toc-content">
            <div class="toc-title">${entry.title}</div>
            <div class="toc-meta">${entry.club} • ${entry.date}</div>
          </div>
          <span class="toc-page-num">${entry.page}</span>
        </li>
`;
  });

  html += `
      </ul>
    </div>
`;

  // Add event sections
  drafts.forEach((draft, index) => {
    html += `
    <!-- Event ${index + 1}: ${draft.title} -->
    <div class="event-section">
      <div class="event-header">
        <div class="event-number">Event ${String(index + 1).padStart(2, '0')}</div>
        <h2 class="event-title">${draft.title}</h2>
        <div class="event-meta">
          <span>📅 ${formatDate(draft.date)}</span>
          <span>🏛️ ${draft.club}</span>
          ${draft.venue ? `<span>📍 ${draft.venue}</span>` : ''}
        </div>
      </div>
      
      <p class="event-summary">${draft.summary}</p>
      
      ${includeImages && draft.photos.length > 0 ? `
      <div class="event-gallery">
        ${draft.photos.slice(0, compactMode ? 3 : 6).map((photo) => `
        <img src="${photo}" alt="Event photo" loading="lazy">
        `).join('')}
      </div>
      ` : ''}
      
      <div class="page-indicator">Page ${index + 2}</div>
    </div>
`;
  });

  // Add footer
  html += `
    <!-- Footer -->
    <div class="book-footer">
      <p class="college">IIIT College</p>
      <p>Event Compendium • ${dateRange}</p>
      <p>Generated on ${formatDate(new Date().toISOString())}</p>
    </div>
  </div>
</body>
</html>`;

  return html;
}

/**
 * Download the book as PDF using jspdf + html2canvas
 */
export async function downloadBookAsPdf(
  html: string,
  filename: string,
  onStatus?: (status: string) => void
): Promise<void> {
  try {
    onStatus?.('Loading PDF library...');
    
    // Dynamically import libraries
    const [html2canvasModule, jspdfModule] = await Promise.all([
      import('html2canvas'),
      import('jspdf'),
    ]);
    
    const html2canvas = html2canvasModule.default;
    const { jsPDF } = jspdfModule;
    
    onStatus?.('Rendering book...');
    
    // Create a temporary container
    const container = document.createElement('div');
    container.innerHTML = html;
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.width = '900px';
    document.body.appendChild(container);
    
    // Wait for images to load
    const images = container.querySelectorAll('img');
    await Promise.all(
      Array.from(images).map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) {
              resolve(null);
            } else {
              img.onload = () => resolve(null);
              img.onerror = () => resolve(null);
            }
          })
      )
    );
    
    onStatus?.('Generating PDF pages...');
    
    // Capture the content
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      allowTaint: true,
    });
    
    document.body.removeChild(container);
    
    // Calculate PDF dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    onStatus?.('Creating PDF document...');
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    let heightLeft = imgHeight;
    let position = 0;
    
    // Add first page
    pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    // Add additional pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    onStatus?.('Saving PDF...');
    pdf.save(filename);
    onStatus?.('Complete!');
  } catch (error) {
    console.error('PDF generation failed:', error);
    onStatus?.('PDF generation failed. Downloading as HTML instead...');
    
    // Fallback to HTML download
    downloadAsHtml(html, filename.replace('.pdf', '.html'));
  }
}

/**
 * Download the book as PNG using html2canvas
 */
export async function downloadBookAsPng(
  html: string,
  filename: string,
  onStatus?: (status: string) => void
): Promise<void> {
  try {
    onStatus?.('Loading image library...');
    
    const html2canvasModule = await import('html2canvas');
    const html2canvas = html2canvasModule.default;
    
    onStatus?.('Rendering book...');
    
    // Create a temporary container
    const container = document.createElement('div');
    container.innerHTML = html;
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.width = '900px';
    document.body.appendChild(container);
    
    // Wait for images to load
    const images = container.querySelectorAll('img');
    await Promise.all(
      Array.from(images).map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) {
              resolve(null);
            } else {
              img.onload = () => resolve(null);
              img.onerror = () => resolve(null);
            }
          })
      )
    );
    
    onStatus?.('Generating image...');
    
    // Capture the content
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      allowTaint: true,
    });
    
    document.body.removeChild(container);
    
    onStatus?.('Saving image...');
    
    // Download as PNG
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    onStatus?.('Complete!');
  } catch (error) {
    console.error('PNG generation failed:', error);
    onStatus?.('PNG generation failed. Downloading as HTML instead...');
    
    // Fallback to HTML download
    downloadAsHtml(html, filename.replace('.png', '.html'));
  }
}

/**
 * Download the book as HTML (fallback)
 */
export function downloadAsHtml(html: string, filename: string): void {
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

/**
 * Download the book as plain text (ultimate fallback)
 */
export function downloadAsText(
  drafts: PublishedDraft[],
  startDate: string,
  endDate: string,
  filename: string
): void {
  const dateRange = formatDateRange(startDate, endDate);
  
  let text = `IIIT EVENT COMPENDIUM\n`;
  text += `${'='.repeat(50)}\n`;
  text += `Date Range: ${dateRange}\n`;
  text += `Total Events: ${drafts.length}\n`;
  text += `Generated: ${formatDate(new Date().toISOString())}\n\n`;
  text += `${'='.repeat(50)}\n\n`;
  text += `TABLE OF CONTENTS\n`;
  text += `${'-'.repeat(30)}\n`;
  
  drafts.forEach((draft, index) => {
    text += `${index + 1}. ${draft.title} (${formatDate(draft.date)})\n`;
  });
  
  text += `\n${'='.repeat(50)}\n\n`;
  
  drafts.forEach((draft, index) => {
    text += `\n${'─'.repeat(50)}\n`;
    text += `EVENT ${index + 1}: ${draft.title.toUpperCase()}\n`;
    text += `${'─'.repeat(50)}\n\n`;
    text += `Date: ${formatDate(draft.date)}\n`;
    text += `Club: ${draft.club}\n`;
    if (draft.venue) {
      text += `Venue: ${draft.venue}\n`;
    }
    text += `\n`;
    text += `Summary:\n`;
    text += `${draft.summary}\n\n`;
  });
  
  text += `\n${'='.repeat(50)}\n`;
  text += `End of Event Compendium\n`;
  text += `IIIT College • ${dateRange}\n`;
  
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
