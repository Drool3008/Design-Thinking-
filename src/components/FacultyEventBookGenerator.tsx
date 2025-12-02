/**
 * FacultyEventBookGenerator - Set 6
 * 
 * Faculty-only component for generating a combined "Event Book" PDF/PNG
 * from all published newsletter drafts within a selected date range.
 * 
 * Features:
 * - Date range selection
 * - Preview filtered drafts
 * - Generate combined book HTML
 * - Download as PDF or PNG
 * - Accessibility: keyboard navigation, screen reader support
 */

import { useState, useMemo, useEffect, useRef } from 'react';
import { getPublishedDraftsByDateRange, type PublishedDraft } from '../data/publishedDrafts';
import { buildBookHtml, downloadBookAsPdf, downloadBookAsPng, downloadAsHtml, downloadAsText } from '../utils/bookBuilder';

interface FacultyEventBookGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
}

type ViewState = 'filter' | 'preview' | 'book';

export default function FacultyEventBookGenerator({ isOpen, onClose }: FacultyEventBookGeneratorProps) {
  // Date range state
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredDrafts, setFilteredDrafts] = useState<PublishedDraft[]>([]);
  const [hasFiltered, setHasFiltered] = useState(false);
  
  // View state
  const [viewState, setViewState] = useState<ViewState>('filter');
  
  // Book generation state
  const [bookHtml, setBookHtml] = useState('');
  const [downloadStatus, setDownloadStatus] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Options
  const [includeImages, setIncludeImages] = useState(true);
  const [compactMode, setCompactMode] = useState(false);
  
  // Refs for accessibility
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  
  // Set default date range (last 6 months)
  useEffect(() => {
    const today = new Date();
    const sixMonthsAgo = new Date(today);
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    setEndDate(today.toISOString().split('T')[0]);
    setStartDate(sixMonthsAgo.toISOString().split('T')[0]);
  }, []);
  
  // Focus trap and ESC key handling
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);
  
  // Filter drafts by date range
  const handleFilter = () => {
    if (!startDate || !endDate) return;
    
    const drafts = getPublishedDraftsByDateRange(startDate, endDate);
    setFilteredDrafts(drafts);
    setHasFiltered(true);
    
    if (drafts.length > 0) {
      setViewState('preview');
    }
  };
  
  // Generate the book HTML
  const handleGenerateBook = () => {
    const html = buildBookHtml(filteredDrafts, startDate, endDate, {
      includeImages,
      compactMode,
    });
    setBookHtml(html);
    setViewState('book');
  };
  
  // Download handlers
  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    setDownloadStatus('Starting PDF generation...');
    
    const filename = `IIIT-Event-Compendium-${startDate}-to-${endDate}.pdf`;
    await downloadBookAsPdf(bookHtml, filename, setDownloadStatus);
    
    setIsDownloading(false);
    setTimeout(() => setDownloadStatus(''), 3000);
  };
  
  const handleDownloadPng = async () => {
    setIsDownloading(true);
    setDownloadStatus('Starting image generation...');
    
    const filename = `IIIT-Event-Compendium-${startDate}-to-${endDate}.png`;
    await downloadBookAsPng(bookHtml, filename, setDownloadStatus);
    
    setIsDownloading(false);
    setTimeout(() => setDownloadStatus(''), 3000);
  };
  
  const handleDownloadHtml = () => {
    const filename = `IIIT-Event-Compendium-${startDate}-to-${endDate}.html`;
    downloadAsHtml(bookHtml, filename);
  };
  
  const handleDownloadText = () => {
    const filename = `IIIT-Event-Compendium-${startDate}-to-${endDate}.txt`;
    downloadAsText(filteredDrafts, startDate, endDate, filename);
  };
  
  // Reset to filter view
  const handleBack = () => {
    if (viewState === 'book') {
      setViewState('preview');
    } else if (viewState === 'preview') {
      setViewState('filter');
      setHasFiltered(false);
    }
  };
  
  // Format date for display
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  // Date range display
  const dateRangeDisplay = useMemo(() => {
    if (!startDate || !endDate) return '';
    return `${formatDate(startDate)} → ${formatDate(endDate)}`;
  }, [startDate, endDate]);
  
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="book-generator-title"
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 id="book-generator-title" className="text-xl font-bold text-white">
              Download Event Book
            </h2>
            <p className="text-teal-100 text-sm">
              Generate a combined compendium of past event newsletters
            </p>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
            aria-label="Close dialog"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Progress Steps */}
        <div className="bg-gray-50 px-6 py-3 border-b">
          <div className="flex items-center justify-center gap-4">
            {[
              { id: 'filter', label: '1. Select Dates', icon: '📅' },
              { id: 'preview', label: '2. Preview Events', icon: '👁️' },
              { id: 'book', label: '3. Download Book', icon: '📚' },
            ].map((step, i) => (
              <div key={step.id} className="flex items-center gap-4">
                {i > 0 && <div className="w-12 h-0.5 bg-gray-300" />}
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    viewState === step.id
                      ? 'bg-teal-600 text-white'
                      : 'bg-white text-gray-600'
                  }`}
                >
                  <span>{step.icon}</span>
                  <span className="font-medium">{step.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Step 1: Date Range Filter */}
          {viewState === 'filter' && (
            <div className="max-w-xl mx-auto">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Select Date Range</h3>
                <p className="text-gray-600">
                  Choose a date range to filter newsletter drafts for your Event Book.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="start-date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <div>
                  <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    id="end-date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </div>
              
              {/* Options */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Book Options</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeImages}
                      onChange={(e) => setIncludeImages(e.target.checked)}
                      className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                    />
                    <span className="text-gray-700">Include event photos</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={compactMode}
                      onChange={(e) => setCompactMode(e.target.checked)}
                      className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                    />
                    <span className="text-gray-700">Compact mode (smaller layout)</span>
                  </label>
                </div>
              </div>
              
              <button
                onClick={handleFilter}
                disabled={!startDate || !endDate}
                className="w-full py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg font-semibold hover:from-teal-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Filter Drafts →
              </button>
              
              {/* No results message */}
              {hasFiltered && filteredDrafts.length === 0 && (
                <div className="mt-6 p-6 bg-amber-50 border border-amber-200 rounded-xl text-center">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-amber-800 mb-1">No Events Found</h4>
                  <p className="text-amber-700 text-sm mb-4">
                    No newsletter drafts were found in the selected date range.
                  </p>
                  <button
                    onClick={() => setHasFiltered(false)}
                    className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    Try Different Dates
                  </button>
                </div>
              )}
            </div>
          )}
          
          {/* Step 2: Preview Drafts */}
          {viewState === 'preview' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {filteredDrafts.length} Event{filteredDrafts.length !== 1 ? 's' : ''} Found
                  </h3>
                  <p className="text-gray-600">{dateRangeDisplay}</p>
                </div>
                <button
                  onClick={handleGenerateBook}
                  className="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg font-semibold hover:from-teal-700 hover:to-emerald-700 transition-all"
                >
                  Generate Book →
                </button>
              </div>
              
              {/* Draft list */}
              <div className="space-y-4">
                {filteredDrafts.map((draft, index) => (
                  <div
                    key={draft.id}
                    className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-teal-700 font-bold">{String(index + 1).padStart(2, '0')}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate">{draft.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {formatDate(draft.date)}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            {draft.club}
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm mt-2 line-clamp-2">{draft.summary}</p>
                      </div>
                      {draft.photos.length > 0 && includeImages && (
                        <div className="flex-shrink-0">
                          <img
                            src={draft.photos[0]}
                            alt=""
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Step 3: Book Preview & Download */}
          {viewState === 'book' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Event Book Ready</h3>
                  <p className="text-gray-600">{dateRangeDisplay} • {filteredDrafts.length} events</p>
                </div>
              </div>
              
              {/* Download buttons */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <button
                  onClick={handleDownloadPdf}
                  disabled={isDownloading}
                  className="flex flex-col items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors disabled:opacity-50"
                >
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium text-red-700">Download PDF</span>
                </button>
                
                <button
                  onClick={handleDownloadPng}
                  disabled={isDownloading}
                  className="flex flex-col items-center gap-2 p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors disabled:opacity-50"
                >
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium text-blue-700">Download PNG</span>
                </button>
                
                <button
                  onClick={handleDownloadHtml}
                  className="flex flex-col items-center gap-2 p-4 bg-purple-50 border border-purple-200 rounded-xl hover:bg-purple-100 transition-colors"
                >
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  <span className="font-medium text-purple-700">Download HTML</span>
                </button>
                
                <button
                  onClick={handleDownloadText}
                  className="flex flex-col items-center gap-2 p-4 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-medium text-gray-700">Download TXT</span>
                </button>
              </div>
              
              {/* Download status */}
              {downloadStatus && (
                <div className="mb-6 p-4 bg-teal-50 border border-teal-200 rounded-lg flex items-center gap-3">
                  {isDownloading && (
                    <div className="w-5 h-5 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
                  )}
                  <span className="text-teal-700">{downloadStatus}</span>
                </div>
              )}
              
              {/* Book preview */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-100 px-4 py-2 border-b flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                  <div className="w-3 h-3 bg-green-400 rounded-full" />
                  <span className="ml-4 text-sm text-gray-600">Book Preview</span>
                </div>
                <div className="h-[400px] overflow-y-auto bg-gray-50">
                  <iframe
                    srcDoc={bookHtml}
                    title="Event Book Preview"
                    className="w-full h-full border-0"
                    sandbox="allow-same-origin"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={viewState === 'filter'}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewState === 'filter'
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            ← Back
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
