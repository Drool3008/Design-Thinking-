/**
 * FacultySummaryWidget Component
 * 
 * A modal component for faculty users to view and download event summaries.
 * Supports multiple summary categories with PDF/PNG download options.
 * 
 * Features:
 * - Dropdown to select summary category
 * - Preview panel with scrollable content
 * - Download as PDF or PNG
 * - Copy to clipboard
 * - Fallback to text download if PDF/PNG fails
 * - Accessible with keyboard navigation and focus trap
 * 
 * Usage:
 * <FacultySummaryWidget eventId="demo-event-1" onClose={() => setOpen(false)} />
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  getSummariesForEvent,
  getSummaryByCategory,
  categoryLabels,
  categoryDescriptions,
  type SummaryCategory,
  type SummaryEntry,
} from '../data/summaries';
import {
  downloadAsPdf,
  downloadAsPng,
  copyToClipboard,
  formatDate,
} from '../utils/downloadUtils';

interface FacultySummaryWidgetProps {
  eventId: string;
  eventTitle?: string;
  onClose?: () => void;
}

// All available categories for the dropdown
const allCategories: SummaryCategory[] = [
  'research',
  'lab',
  'eventRecap',
  'mediaHighlights',
  'attendance',
  'studentImpact',
];

const FacultySummaryWidget: React.FC<FacultySummaryWidgetProps> = ({
  eventId,
  eventTitle = 'Event',
  onClose,
}) => {
  // State
  const [selectedCategory, setSelectedCategory] = useState<SummaryCategory | null>(null);
  const [currentSummary, setCurrentSummary] = useState<SummaryEntry | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<string>('');
  const [showCopiedToast, setShowCopiedToast] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Refs
  const modalRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get available summaries for this event
  const availableSummaries = getSummariesForEvent(eventId);
  const availableCategories = availableSummaries.map((s) => s.category);

  // Handle category selection
  const handleCategorySelect = (category: SummaryCategory) => {
    setSelectedCategory(category);
    const summary = getSummaryByCategory(eventId, category);
    setCurrentSummary(summary || null);
    setDropdownOpen(false);
  };

  // Handle PDF download
  const handleDownloadPdf = async () => {
    if (!previewRef.current || !currentSummary) return;

    setIsDownloading(true);
    setDownloadStatus('Generating PDF...');

    const result = await downloadAsPdf(
      previewRef.current,
      `summary-${eventId}-${selectedCategory}`,
      currentSummary.title,
      currentSummary.text,
      (msg) => setDownloadStatus(msg)
    );

    setIsDownloading(false);
    setTimeout(() => setDownloadStatus(''), 3000);

    if (!result.success) {
      setDownloadStatus('Download failed. Please try again.');
    }
  };

  // Handle PNG download
  const handleDownloadPng = async () => {
    if (!previewRef.current || !currentSummary) return;

    setIsDownloading(true);
    setDownloadStatus('Generating PNG...');

    const result = await downloadAsPng(
      previewRef.current,
      `summary-${eventId}-${selectedCategory}`,
      currentSummary.text,
      (msg) => setDownloadStatus(msg)
    );

    setIsDownloading(false);
    setTimeout(() => setDownloadStatus(''), 3000);

    if (!result.success) {
      setDownloadStatus('Download failed. Please try again.');
    }
  };

  // Handle copy to clipboard
  const handleCopy = async () => {
    if (!currentSummary) return;

    const success = await copyToClipboard(currentSummary.text);
    if (success) {
      setShowCopiedToast(true);
      setTimeout(() => setShowCopiedToast(false), 2000);
    }
  };

  // Handle back to full event
  const handleBackToEvent = () => {
    setSelectedCategory(null);
    setCurrentSummary(null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus trap and ESC key handling
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (dropdownOpen) {
          setDropdownOpen(false);
        } else {
          onClose?.();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, dropdownOpen]);

  // Focus modal on mount
  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  // Render markdown-like text with basic formatting
  const renderFormattedText = useCallback((text: string) => {
    const lines = text.split('\n');
    
    return lines.map((line, index) => {
      // Headers
      if (line.startsWith('# ')) {
        return (
          <h1 key={index} className="text-2xl font-bold text-gray-900 mt-6 mb-3 first:mt-0">
            {line.slice(2)}
          </h1>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h2 key={index} className="text-xl font-semibold text-gray-800 mt-5 mb-2">
            {line.slice(3)}
          </h2>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <h3 key={index} className="text-lg font-semibold text-gray-700 mt-4 mb-2">
            {line.slice(4)}
          </h3>
        );
      }

      // Blockquotes
      if (line.startsWith('> ')) {
        return (
          <blockquote
            key={index}
            className="border-l-4 border-purple-400 pl-4 py-2 my-3 bg-purple-50 italic text-gray-700"
          >
            {line.slice(2)}
          </blockquote>
        );
      }

      // List items
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return (
          <li key={index} className="ml-4 text-gray-600 list-disc list-inside">
            {line.slice(2)}
          </li>
        );
      }

      // Numbered lists
      if (/^\d+\.\s/.test(line)) {
        return (
          <li key={index} className="ml-4 text-gray-600 list-decimal list-inside">
            {line.replace(/^\d+\.\s/, '')}
          </li>
        );
      }

      // Table rows (simplified)
      if (line.startsWith('|') && line.endsWith('|')) {
        const cells = line.split('|').filter((c) => c.trim());
        const isHeader = lines[index + 1]?.includes('---');
        return (
          <div
            key={index}
            className={`grid gap-2 py-1 px-2 ${isHeader ? 'font-semibold bg-gray-100' : 'bg-white'}`}
            style={{ gridTemplateColumns: `repeat(${cells.length}, 1fr)` }}
          >
            {cells.map((cell, i) => (
              <span key={i} className="text-sm text-gray-600">
                {cell.trim()}
              </span>
            ))}
          </div>
        );
      }

      // Skip separator lines
      if (line.match(/^[\|\-\s]+$/)) {
        return null;
      }

      // Empty lines
      if (!line.trim()) {
        return <div key={index} className="h-3" />;
      }

      // Regular paragraph
      return (
        <p key={index} className="text-gray-600 leading-relaxed mb-2">
          {line}
        </p>
      );
    });
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="summary-modal-title"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 id="summary-modal-title" className="text-xl font-bold text-white">
              Faculty Summaries
            </h2>
            <p className="text-purple-200 text-sm">{eventTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Category Dropdown */}
        <div className="px-6 py-4 border-b bg-gray-50">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Choose summary type
          </label>
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full md:w-96 flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
            >
              <span className={selectedCategory ? 'text-gray-900' : 'text-gray-500'}>
                {selectedCategory ? categoryLabels[selectedCategory] : 'Select a summary type...'}
              </span>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div
                className="absolute z-10 w-full md:w-96 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto"
                role="listbox"
              >
                {allCategories.map((category) => {
                  const isAvailable = availableCategories.includes(category);
                  return (
                    <button
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      className={`w-full px-4 py-3 text-left hover:bg-purple-50 transition-colors flex items-center justify-between ${
                        selectedCategory === category ? 'bg-purple-100' : ''
                      } ${!isAvailable ? 'opacity-50' : ''}`}
                      role="option"
                      aria-selected={selectedCategory === category}
                    >
                      <div>
                        <div className="font-medium text-gray-900">{categoryLabels[category]}</div>
                        <div className="text-sm text-gray-500">{categoryDescriptions[category]}</div>
                      </div>
                      {isAvailable ? (
                        <span className="text-green-500 text-sm flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Available
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">Not available</span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* No category selected state */}
          {!selectedCategory && (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-lg font-medium">Select a summary type</p>
              <p className="text-sm">Choose from the dropdown above to view available summaries</p>
            </div>
          )}

          {/* Summary not found state */}
          {selectedCategory && !currentSummary && (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No relevant summary for the chosen filter
              </h3>
              <p className="text-gray-500 mb-6 text-center max-w-md">
                A {categoryLabels[selectedCategory].toLowerCase()} has not been generated for this event yet.
              </p>
              <button
                onClick={handleBackToEvent}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to full event
              </button>
            </div>
          )}

          {/* Summary found - show preview */}
          {currentSummary && (
            <div className="space-y-4">
              {/* Summary metadata */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pb-4 border-b">
                {currentSummary.author && (
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>By {currentSummary.author}</span>
                  </div>
                )}
                {currentSummary.generatedAt && (
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{formatDate(currentSummary.generatedAt)}</span>
                  </div>
                )}
              </div>

              {/* Key points (if available) */}
              {currentSummary.keyPoints && currentSummary.keyPoints.length > 0 && (
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                  <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      />
                    </svg>
                    Key Points
                  </h4>
                  <ul className="space-y-1">
                    {currentSummary.keyPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-purple-700">
                        <span className="text-purple-400 mt-1">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Images gallery (if available) */}
              {currentSummary.images && currentSummary.images.length > 0 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {currentSummary.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`Summary image ${i + 1}`}
                      className="w-32 h-24 object-cover rounded-lg shadow-sm flex-shrink-0"
                    />
                  ))}
                </div>
              )}

              {/* Main content preview */}
              <div
                ref={previewRef}
                className="bg-white border border-gray-200 rounded-lg p-6 max-h-96 overflow-y-auto shadow-inner"
              >
                {renderFormattedText(currentSummary.text)}
              </div>
            </div>
          )}
        </div>

        {/* Footer with actions */}
        <div className="border-t bg-gray-50 px-6 py-4">
          {/* Download status message */}
          {downloadStatus && (
            <div className="mb-3 text-sm text-center text-purple-600 animate-pulse">
              {downloadStatus}
            </div>
          )}

          {/* Copied toast */}
          {showCopiedToast && (
            <div className="mb-3 text-sm text-center text-green-600 flex items-center justify-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Copied to clipboard!
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Close
            </button>

            {currentSummary && (
              <div className="flex items-center gap-2">
                {/* Copy button */}
                <button
                  onClick={handleCopy}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
                  aria-label="Copy to clipboard"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Copy
                </button>

                {/* Download PNG button */}
                <button
                  onClick={handleDownloadPng}
                  disabled={isDownloading}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Download as PNG"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  PNG
                </button>

                {/* Download PDF button */}
                <button
                  onClick={handleDownloadPdf}
                  disabled={isDownloading}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Download as PDF"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  PDF
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultySummaryWidget;
