/**
 * Download Utilities - Faculty Summary Widget
 * 
 * Helper functions for generating PDF and PNG downloads from DOM elements.
 * Uses html2canvas for canvas capture and jspdf for PDF generation.
 * Includes fallback to text download if libraries are unavailable.
 * 
 * Dependencies (optional - fallback provided):
 * - html2canvas: npm install html2canvas
 * - jspdf: npm install jspdf
 */

// Type definitions for dynamic imports
type Html2CanvasType = (element: HTMLElement, options?: Record<string, unknown>) => Promise<HTMLCanvasElement>;

interface JsPDFType {
  new (options?: Record<string, unknown>): {
    internal: { pageSize: { getWidth: () => number; getHeight: () => number } };
    setFontSize: (size: number) => void;
    text: (text: string, x: number, y: number) => void;
    addPage: () => void;
    addImage: (data: string, format: string, x: number, y: number, w: number, h: number) => void;
    save: (filename: string) => void;
  };
}

/**
 * Dynamically import html2canvas (tree-shaking friendly)
 */
async function getHtml2Canvas(): Promise<Html2CanvasType | null> {
  try {
    const module = await import('html2canvas');
    return module.default as Html2CanvasType;
  } catch (error) {
    console.warn('html2canvas not available:', error);
    return null;
  }
}

/**
 * Dynamically import jsPDF (tree-shaking friendly)
 */
async function getJsPDF(): Promise<JsPDFType | null> {
  try {
    const module = await import('jspdf');
    return module.jsPDF as JsPDFType;
  } catch (error) {
    console.warn('jspdf not available:', error);
    return null;
  }
}

/**
 * Download result interface
 */
export interface DownloadResult {
  success: boolean;
  method: 'pdf' | 'png' | 'txt';
  error?: string;
}

/**
 * Status callback for progress updates
 */
export type StatusCallback = (message: string) => void;

/**
 * Capture a DOM element as a canvas using html2canvas
 */
async function captureToCanvas(
  element: HTMLElement,
  onStatus?: StatusCallback
): Promise<HTMLCanvasElement | null> {
  const html2canvas = await getHtml2Canvas();
  
  if (!html2canvas) {
    onStatus?.('html2canvas library not available');
    return null;
  }

  onStatus?.('Capturing content...');
  
  try {
    const canvas = await html2canvas(element, {
      scale: 2, // Higher resolution
      useCORS: true, // Allow cross-origin images
      logging: false,
      backgroundColor: '#ffffff',
      // Improve text rendering
      letterRendering: true,
    });
    return canvas;
  } catch (error) {
    console.error('Canvas capture failed:', error);
    onStatus?.('Failed to capture content');
    return null;
  }
}

/**
 * Download element as PNG image
 * Falls back to text download if capture fails
 */
export async function downloadAsPng(
  element: HTMLElement,
  filename: string,
  fallbackText?: string,
  onStatus?: StatusCallback
): Promise<DownloadResult> {
  onStatus?.('Generating PNG...');
  
  const canvas = await captureToCanvas(element, onStatus);
  
  if (canvas) {
    try {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${filename}.png`;
      link.href = dataUrl;
      link.click();
      
      onStatus?.('PNG downloaded successfully!');
      return { success: true, method: 'png' };
    } catch (error) {
      console.error('PNG generation failed:', error);
      onStatus?.('PNG generation failed, trying fallback...');
    }
  }
  
  // Fallback to text download
  if (fallbackText) {
    downloadAsText(fallbackText, filename);
    onStatus?.('Downloaded as text file (PNG unavailable)');
    return { success: true, method: 'txt', error: 'PNG generation failed' };
  }
  
  onStatus?.('Download failed');
  return { success: false, method: 'png', error: 'PNG generation failed and no fallback provided' };
}

/**
 * Download element as PDF document
 * Falls back to text download if capture fails
 */
export async function downloadAsPdf(
  element: HTMLElement,
  filename: string,
  title?: string,
  fallbackText?: string,
  onStatus?: StatusCallback
): Promise<DownloadResult> {
  onStatus?.('Generating PDF...');
  
  const [canvas, JsPDF] = await Promise.all([
    captureToCanvas(element, onStatus),
    getJsPDF(),
  ]);
  
  if (canvas && JsPDF) {
    try {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new JsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      // Calculate dimensions to fit A4
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth - 20; // 10mm margin on each side
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Add title if provided
      if (title) {
        pdf.setFontSize(16);
        pdf.text(title, 10, 15);
      }
      
      const startY = title ? 25 : 10;
      
      // If image is taller than page, we need multiple pages
      let remainingHeight = imgHeight;
      let pageNum = 0;
      
      while (remainingHeight > 0) {
        if (pageNum > 0) {
          pdf.addPage();
        }
        
        const availableHeight = pageNum === 0 ? pageHeight - startY - 10 : pageHeight - 20;
        
        // For first page, use the full image
        // For subsequent pages, this is a simplified approach
        if (pageNum === 0) {
          pdf.addImage(imgData, 'PNG', 10, startY, imgWidth, imgHeight);
        }
        
        remainingHeight -= availableHeight;
        pageNum++;
        
        // Safety: limit to 10 pages
        if (pageNum >= 10) break;
      }
      
      pdf.save(`${filename}.pdf`);
      
      onStatus?.('PDF downloaded successfully!');
      return { success: true, method: 'pdf' };
    } catch (error) {
      console.error('PDF generation failed:', error);
      onStatus?.('PDF generation failed, trying fallback...');
    }
  }
  
  // Fallback to text download
  if (fallbackText) {
    downloadAsText(fallbackText, filename);
    onStatus?.('Downloaded as text file (PDF unavailable)');
    return { success: true, method: 'txt', error: 'PDF generation failed' };
  }
  
  onStatus?.('Download failed');
  return { success: false, method: 'pdf', error: 'PDF generation failed and no fallback provided' };
}

/**
 * Download text content as a .txt file
 */
export function downloadAsText(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = `${filename}.txt`;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}

/**
 * Copy text to clipboard
 * Returns true if successful
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    // Fallback for older browsers
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    } catch (fallbackError) {
      console.error('Copy to clipboard failed:', fallbackError);
      return false;
    }
  }
}

/**
 * Format a date string for display
 */
export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
