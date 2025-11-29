/**
 * EventGroupContentCapture Component
 * Set 3: Allows Event Group to capture and upload event content.
 * 
 * Features:
 * - Upload photos, videos, audio, text notes (URL-based)
 * - Organized by media type
 * - Preview and delete capability
 * - Content flows to archiver view
 */

import React, { useState } from 'react';
import type { EventGroupMedia } from '../data/events';

interface EventGroupContentCaptureProps {
  media: EventGroupMedia;
  onMediaChange: (media: EventGroupMedia) => void;
  readOnly?: boolean;
}

type MediaType = 'photos' | 'videos' | 'audio' | 'textNotes';

interface MediaTab {
  key: MediaType;
  label: string;
  icon: React.ReactNode;
}

const EventGroupContentCapture: React.FC<EventGroupContentCaptureProps> = ({
  media,
  onMediaChange,
  readOnly = false,
}) => {
  const [activeTab, setActiveTab] = useState<MediaType>('photos');
  const [inputValue, setInputValue] = useState('');

  const mediaTabs: MediaTab[] = [
    {
      key: 'photos',
      label: 'Photos',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      key: 'videos',
      label: 'Videos',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      key: 'audio',
      label: 'Audio',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
    },
    {
      key: 'textNotes',
      label: 'Notes',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
  ];

  const getPlaceholder = () => {
    switch (activeTab) {
      case 'photos':
        return 'Enter photo URL (e.g., https://images.unsplash.com/...)';
      case 'videos':
        return 'Enter video URL (e.g., https://youtube.com/watch?v=...)';
      case 'audio':
        return 'Enter audio URL (e.g., https://example.com/audio.mp3)';
      case 'textNotes':
        return 'Enter a note about the event...';
    }
  };

  const addItem = () => {
    if (!inputValue.trim()) return;

    const newMedia = { ...media };
    newMedia[activeTab] = [...(media[activeTab] || []), inputValue.trim()];
    onMediaChange(newMedia);
    setInputValue('');
  };

  const removeItem = (type: MediaType, index: number) => {
    const newMedia = { ...media };
    newMedia[type] = media[type].filter((_, i) => i !== index);
    onMediaChange(newMedia);
  };

  const getItemCount = (type: MediaType) => media[type]?.length || 0;

  const totalCount = Object.values(media).reduce((sum, arr) => sum + (arr?.length || 0), 0);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Captured Content</h3>
            <p className="text-sm text-gray-500">
              Upload photos, videos, audio recordings, and notes from the event
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full">
              {totalCount} items
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px px-6" aria-label="Tabs">
          {mediaTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 py-4 px-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.key
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.icon}
              {tab.label}
              {getItemCount(tab.key) > 0 && (
                <span className={`ml-1 px-2 py-0.5 text-xs rounded-full ${
                  activeTab === tab.key
                    ? 'bg-indigo-100 text-indigo-600'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {getItemCount(tab.key)}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Input Section */}
      {!readOnly && (
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex gap-3">
            {activeTab === 'textNotes' ? (
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={getPlaceholder()}
                rows={3}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              />
            ) : (
              <input
                type="url"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={getPlaceholder()}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                onKeyDown={(e) => e.key === 'Enter' && addItem()}
              />
            )}
            <button
              onClick={addItem}
              disabled={!inputValue.trim()}
              className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Add {activeTab === 'textNotes' ? 'Note' : 'URL'}
            </button>
          </div>
        </div>
      )}

      {/* Content List */}
      <div className="p-6">
        {/* Photos Grid */}
        {activeTab === 'photos' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {media.photos.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p>No photos added yet</p>
              </div>
            ) : (
              media.photos.map((url, index) => (
                <div key={index} className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={url}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200?text=Invalid+URL';
                    }}
                  />
                  {!readOnly && (
                    <button
                      onClick={() => removeItem('photos', index)}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Videos List */}
        {activeTab === 'videos' && (
          <div className="space-y-3">
            {media.videos.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <p>No videos added yet</p>
              </div>
            ) : (
              media.videos.map((url, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg group">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-gray-900 hover:text-indigo-600 truncate block"
                    >
                      {url}
                    </a>
                    <p className="text-xs text-gray-500">Video {index + 1}</p>
                  </div>
                  {!readOnly && (
                    <button
                      onClick={() => removeItem('videos', index)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Audio List */}
        {activeTab === 'audio' && (
          <div className="space-y-3">
            {media.audio.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                <p>No audio recordings added yet</p>
              </div>
            ) : (
              media.audio.map((url, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg group">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-gray-900 hover:text-indigo-600 truncate block"
                    >
                      {url}
                    </a>
                    <p className="text-xs text-gray-500">Audio {index + 1}</p>
                  </div>
                  {!readOnly && (
                    <button
                      onClick={() => removeItem('audio', index)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Text Notes */}
        {activeTab === 'textNotes' && (
          <div className="space-y-3">
            {media.textNotes.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p>No notes added yet</p>
              </div>
            ) : (
              media.textNotes.map((note, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg group">
                  <div className="w-8 h-8 bg-yellow-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-yellow-700">{index + 1}</span>
                  </div>
                  <p className="flex-1 text-sm text-gray-700">{note}</p>
                  {!readOnly && (
                    <button
                      onClick={() => removeItem('textNotes', index)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventGroupContentCapture;
