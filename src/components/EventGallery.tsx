/**
 * EventGallery Component
 * Displays photos, videos, and documents for ended/archived events.
 * Updated for Set 2 + Set 3 workflow - supports documents and shows media source.
 */

import React, { useState, useMemo } from 'react';
import type { MediaLinks } from '../data/events';

interface EventGalleryProps {
  mediaLinks: MediaLinks;
  eventTitle: string;
  showSource?: boolean;  // Set 3: Show which role uploaded the content
}

const EventGallery: React.FC<EventGalleryProps> = ({ mediaLinks, eventTitle, showSource = false }) => {
  const [activeTab, setActiveTab] = useState<'photos' | 'videos' | 'documents' | 'audio' | 'notes'>('photos');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Combine media from all sources
  const allPhotos = useMemo(() => {
    const photos: { url: string; source: string }[] = [];
    mediaLinks.photos?.forEach(url => photos.push({ url, source: 'General' }));
    mediaLinks.eventGroup?.photos?.forEach(url => photos.push({ url, source: 'Event Group' }));
    mediaLinks.archiver?.photos?.forEach(url => photos.push({ url, source: 'Archiver' }));
    return photos;
  }, [mediaLinks]);

  const allVideos = useMemo(() => {
    const videos: { url: string; source: string }[] = [];
    mediaLinks.videos?.forEach(url => videos.push({ url, source: 'General' }));
    mediaLinks.eventGroup?.videos?.forEach(url => videos.push({ url, source: 'Event Group' }));
    mediaLinks.archiver?.videos?.forEach(url => videos.push({ url, source: 'Archiver' }));
    return videos;
  }, [mediaLinks]);

  const allDocuments = useMemo(() => {
    const docs: { url: string; source: string }[] = [];
    mediaLinks.documents?.forEach(url => docs.push({ url, source: 'General' }));
    mediaLinks.archiver?.documents?.forEach(url => docs.push({ url, source: 'Archiver' }));
    return docs;
  }, [mediaLinks]);

  const allAudio = useMemo(() => {
    const audio: { url: string; source: string }[] = [];
    mediaLinks.eventGroup?.audio?.forEach(url => audio.push({ url, source: 'Event Group' }));
    return audio;
  }, [mediaLinks]);

  const allNotes = useMemo(() => {
    const notes: { text: string; source: string }[] = [];
    mediaLinks.eventGroup?.textNotes?.forEach(text => notes.push({ text, source: 'Event Group' }));
    return notes;
  }, [mediaLinks]);

  const hasPhotos = allPhotos.length > 0;
  const hasVideos = allVideos.length > 0;
  const hasDocuments = allDocuments.length > 0;
  const hasAudio = allAudio.length > 0;
  const hasNotes = allNotes.length > 0;

  if (!hasPhotos && !hasVideos && !hasDocuments && !hasAudio && !hasNotes) {
    return null;
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % allPhotos.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + allPhotos.length) % allPhotos.length);
  };

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Get filename from URL
  const getFileName = (url: string) => {
    try {
      const pathname = new URL(url).pathname;
      return pathname.split('/').pop() || 'Document';
    } catch {
      return url.split('/').pop() || 'Document';
    }
  };

  // Source badge color
  const getSourceColor = (source: string) => {
    switch (source) {
      case 'Event Group':
        return 'bg-blue-100 text-blue-700';
      case 'Archiver':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Count how many media types we have
  const mediaTypeCount = [hasPhotos, hasVideos, hasDocuments, hasAudio, hasNotes].filter(Boolean).length;

  return (
    <div className="mt-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Event Gallery</h2>
        
        {/* Tab Buttons (show if more than one media type exists) */}
        {mediaTypeCount > 1 && (
          <div className="flex bg-gray-100 rounded-lg p-1 flex-wrap gap-1">
            {hasPhotos && (
              <button
                onClick={() => setActiveTab('photos')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'photos'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Photos ({allPhotos.length})
              </button>
            )}
            {hasVideos && (
              <button
                onClick={() => setActiveTab('videos')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'videos'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Videos ({allVideos.length})
              </button>
            )}
            {hasDocuments && (
              <button
                onClick={() => setActiveTab('documents')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'documents'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Documents ({allDocuments.length})
              </button>
            )}
            {hasAudio && (
              <button
                onClick={() => setActiveTab('audio')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'audio'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                Audio ({allAudio.length})
              </button>
            )}
            {hasNotes && (
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'notes'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <svg className="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Notes ({allNotes.length})
              </button>
            )}
          </div>
        )}
      </div>

      {/* Photos Grid */}
      {activeTab === 'photos' && hasPhotos && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allPhotos.map((photo, index) => (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              className="relative aspect-square overflow-hidden rounded-lg group"
            >
              <img
                src={photo.url}
                alt={`${eventTitle} - Photo ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {showSource && photo.source !== 'General' && (
                <span className={`absolute top-2 left-2 px-2 py-0.5 text-xs font-medium rounded-full ${getSourceColor(photo.source)}`}>
                  {photo.source}
                </span>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Videos Grid */}
      {activeTab === 'videos' && hasVideos && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allVideos.map((video, index) => {
            const youtubeId = getYouTubeId(video.url);
            return (
              <div key={index} className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                {showSource && video.source !== 'General' && (
                  <span className={`absolute top-2 left-2 z-10 px-2 py-0.5 text-xs font-medium rounded-full ${getSourceColor(video.source)}`}>
                    {video.source}
                  </span>
                )}
                {youtubeId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    title={`${eventTitle} - Video ${index + 1}`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={video.url}
                    controls
                    className="w-full h-full object-cover"
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Documents List */}
      {activeTab === 'documents' && hasDocuments && (
        <div className="space-y-3">
          {allDocuments.map((doc, index) => (
            <a
              key={index}
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{getFileName(doc.url)}</p>
                <p className="text-sm text-gray-500 truncate">{doc.url}</p>
              </div>
              {showSource && doc.source !== 'General' && (
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getSourceColor(doc.source)}`}>
                  {doc.source}
                </span>
              )}
              <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ))}
        </div>
      )}

      {/* Audio List */}
      {activeTab === 'audio' && hasAudio && (
        <div className="space-y-3">
          {allAudio.map((audio, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900">Audio Recording {index + 1}</p>
                <a
                  href={audio.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-purple-600 hover:underline truncate block"
                >
                  {audio.url}
                </a>
              </div>
              {showSource && (
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getSourceColor(audio.source)}`}>
                  {audio.source}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Notes List */}
      {activeTab === 'notes' && hasNotes && (
        <div className="space-y-3">
          {allNotes.map((note, index) => (
            <div key={index} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-yellow-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-yellow-700">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">{note.text}</p>
                  {showSource && (
                    <span className={`mt-2 inline-block px-2 py-0.5 text-xs font-medium rounded-full ${getSourceColor(note.source)}`}>
                      {note.source}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox for Photos */}
      {lightboxOpen && hasPhotos && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Arrows */}
          {allPhotos.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 text-white hover:text-gray-300 transition-colors"
              >
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 text-white hover:text-gray-300 transition-colors"
              >
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Image */}
          <img
            src={allPhotos[lightboxIndex].url}
            alt={`${eventTitle} - Photo ${lightboxIndex + 1}`}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Counter & Source */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm flex items-center gap-3">
            <span>{lightboxIndex + 1} / {allPhotos.length}</span>
            {showSource && allPhotos[lightboxIndex].source !== 'General' && (
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getSourceColor(allPhotos[lightboxIndex].source)}`}>
                {allPhotos[lightboxIndex].source}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventGallery;
