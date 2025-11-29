/**
 * Archiver Event Page - Set 2 Workflow
 * 
 * Per-event archival management page:
 * - Upload links section
 * - Upload window controls
 * - Add media (photos, videos, documents)
 * - Archival workflow actions (clean, validate, generate summary, finalize)
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { generateUploadLink, type Event, type ArchivalInfo } from '../data/events';
import UploadWindowControls from '../components/UploadWindowControls';
import ArchivalActions from '../components/ArchivalActions';

const ArchiverEventPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { getEventById } = useEvents();
  
  // Get event from context
  const originalEvent = useMemo(() => {
    return eventId ? getEventById(eventId) : undefined;
  }, [eventId, getEventById]);

  // Local state for event modifications
  const [event, setEvent] = useState<Event | undefined>(originalEvent);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newDocUrl, setNewDocUrl] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (originalEvent) {
      setEvent({ ...originalEvent });
    }
  }, [originalEvent]);

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900">Event Not Found</h2>
          <p className="mt-2 text-gray-600">The event you're looking for doesn't exist.</p>
          <Link
            to="/dashboard/archiver"
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const showNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const uploadLink = generateUploadLink(event.id, event.title);

  // Check if upload window is expired
  const isUploadExpired = () => {
    if (!event.archival?.uploadWindowExpiresAt) return false;
    return new Date(event.archival.uploadWindowExpiresAt) < new Date();
  };

  // Handle setting upload expiration
  const handleSetExpiration = (expiresAt: string) => {
    setEvent({
      ...event,
      archival: {
        ...event.archival,
        uploadWindowExpiresAt: expiresAt,
        isUploadWindowExpired: new Date(expiresAt) < new Date(),
      },
    });
    showNotification('Upload window updated successfully.');
  };

  // Handle adding media
  const handleAddPhoto = () => {
    if (!newPhotoUrl.trim()) return;
    if (isUploadExpired()) {
      showNotification('Upload window has expired. Extend the window to add media.');
      return;
    }
    
    const updatedPhotos = [...(event.mediaLinks?.photos || []), newPhotoUrl.trim()];
    setEvent({
      ...event,
      mediaLinks: {
        ...event.mediaLinks,
        photos: updatedPhotos,
        videos: event.mediaLinks?.videos || [],
        documents: event.mediaLinks?.documents || [],
      },
    });
    setNewPhotoUrl('');
    showNotification('Photo added successfully.');
  };

  const handleAddVideo = () => {
    if (!newVideoUrl.trim()) return;
    if (isUploadExpired()) {
      showNotification('Upload window has expired. Extend the window to add media.');
      return;
    }
    
    const updatedVideos = [...(event.mediaLinks?.videos || []), newVideoUrl.trim()];
    setEvent({
      ...event,
      mediaLinks: {
        ...event.mediaLinks,
        photos: event.mediaLinks?.photos || [],
        videos: updatedVideos,
        documents: event.mediaLinks?.documents || [],
      },
    });
    setNewVideoUrl('');
    showNotification('Video added successfully.');
  };

  const handleAddDocument = () => {
    if (!newDocUrl.trim()) return;
    if (isUploadExpired()) {
      showNotification('Upload window has expired. Extend the window to add media.');
      return;
    }
    
    const updatedDocs = [...(event.mediaLinks?.documents || []), newDocUrl.trim()];
    setEvent({
      ...event,
      mediaLinks: {
        ...event.mediaLinks,
        photos: event.mediaLinks?.photos || [],
        videos: event.mediaLinks?.videos || [],
        documents: updatedDocs,
      },
    });
    setNewDocUrl('');
    showNotification('Document added successfully.');
  };

  // Handle removing media
  const handleRemovePhoto = (index: number) => {
    const updatedPhotos = event.mediaLinks?.photos?.filter((_, i) => i !== index) || [];
    setEvent({
      ...event,
      mediaLinks: {
        ...event.mediaLinks,
        photos: updatedPhotos,
        videos: event.mediaLinks?.videos || [],
        documents: event.mediaLinks?.documents || [],
      },
    });
  };

  const handleRemoveVideo = (index: number) => {
    const updatedVideos = event.mediaLinks?.videos?.filter((_, i) => i !== index) || [];
    setEvent({
      ...event,
      mediaLinks: {
        ...event.mediaLinks,
        photos: event.mediaLinks?.photos || [],
        videos: updatedVideos,
        documents: event.mediaLinks?.documents || [],
      },
    });
  };

  const handleRemoveDocument = (index: number) => {
    const updatedDocs = event.mediaLinks?.documents?.filter((_, i) => i !== index) || [];
    setEvent({
      ...event,
      mediaLinks: {
        ...event.mediaLinks,
        photos: event.mediaLinks?.photos || [],
        videos: event.mediaLinks?.videos || [],
        documents: updatedDocs,
      },
    });
  };

  // Handle archival updates
  const handleUpdateArchival = (archival: ArchivalInfo) => {
    setEvent({
      ...event,
      archival: archival,
    });
  };

  // Handle finalize
  const handleFinalize = () => {
    setEvent({
      ...event,
      status: 'archived',
      archival: {
        ...event.archival,
        finalizedAt: new Date().toISOString(),
      },
    });
  };

  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const canAddMedia = !isUploadExpired() && event.status !== 'archived';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="mb-6">
        <nav className="flex items-center gap-2 text-sm">
          <Link to="/dashboard/archiver" className="text-blue-600 hover:text-blue-800">
            Archiver Dashboard
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">{event.title}</span>
        </nav>
      </div>

      {/* Page Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <img
            src={event.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400'}
            alt={event.title}
            className="w-full md:w-48 h-32 rounded-lg object-cover"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{event.title}</h1>
                <p className="mt-1 text-gray-600">{event.club} • {event.type}</p>
              </div>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                event.status === 'archived' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-amber-100 text-amber-700'
              }`}>
                {event.status === 'archived' ? 'Archived' : 'Pending Archival'}
              </span>
            </div>
            <p className="mt-3 text-gray-600">{event.shortDescription}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDateTime(event.dateTime)}
              </div>
              {event.venue && (
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {event.venue}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Upload & Media Management */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upload Link Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              Upload Link
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500 mb-2">Share this link to collect media for the event:</p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={uploadLink}
                  className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(uploadLink);
                    showNotification('Link copied to clipboard!');
                  }}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>

          {/* Add Media Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Media
            </h3>

            {!canAddMedia && event.status !== 'archived' && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">Upload window has expired. Extend the window to add new media.</p>
              </div>
            )}

            {event.status === 'archived' && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">This event has been archived. Media cannot be modified.</p>
              </div>
            )}

            <div className="space-y-4">
              {/* Add Photo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Photo URL</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    value={newPhotoUrl}
                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                    disabled={!canAddMedia}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <button
                    onClick={handleAddPhoto}
                    disabled={!canAddMedia || !newPhotoUrl.trim()}
                    className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Add Photo
                  </button>
                </div>
              </div>

              {/* Add Video */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Video URL</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://youtube.com/watch?v=..."
                    value={newVideoUrl}
                    onChange={(e) => setNewVideoUrl(e.target.value)}
                    disabled={!canAddMedia}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <button
                    onClick={handleAddVideo}
                    disabled={!canAddMedia || !newVideoUrl.trim()}
                    className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Add Video
                  </button>
                </div>
              </div>

              {/* Add Document */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Document URL</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/document.pdf"
                    value={newDocUrl}
                    onChange={(e) => setNewDocUrl(e.target.value)}
                    disabled={!canAddMedia}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <button
                    onClick={handleAddDocument}
                    disabled={!canAddMedia || !newDocUrl.trim()}
                    className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Add Document
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Current Media */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Media</h3>
            
            {/* Photos */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Photos ({event.mediaLinks?.photos?.length || 0})</h4>
              {event.mediaLinks?.photos && event.mediaLinks.photos.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {event.mediaLinks.photos.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      {canAddMedia && (
                        <button
                          onClick={() => handleRemovePhoto(index)}
                          className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">No photos added yet</p>
              )}
            </div>

            {/* Videos */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Videos ({event.mediaLinks?.videos?.length || 0})</h4>
              {event.mediaLinks?.videos && event.mediaLinks.videos.length > 0 ? (
                <div className="space-y-2">
                  {event.mediaLinks.videos.map((url, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <span className="text-lg">🎬</span>
                      <a href={url} target="_blank" rel="noopener noreferrer" className="flex-1 text-sm text-blue-600 hover:underline truncate">
                        {url}
                      </a>
                      {canAddMedia && (
                        <button
                          onClick={() => handleRemoveVideo(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">No videos added yet</p>
              )}
            </div>

            {/* Documents */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Documents ({event.mediaLinks?.documents?.length || 0})</h4>
              {event.mediaLinks?.documents && event.mediaLinks.documents.length > 0 ? (
                <div className="space-y-2">
                  {event.mediaLinks.documents.map((url, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <span className="text-lg">📄</span>
                      <a href={url} target="_blank" rel="noopener noreferrer" className="flex-1 text-sm text-blue-600 hover:underline truncate">
                        {url}
                      </a>
                      {canAddMedia && (
                        <button
                          onClick={() => handleRemoveDocument(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">No documents added yet</p>
              )}
            </div>
          </div>

          {/* Event Group Captured Content */}
          {event.mediaLinks?.eventGroup && (
            <div className="bg-white rounded-xl shadow-sm border border-purple-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded">Event Group</span>
                Content Captured by Event Group
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                This content was uploaded by the Event Group during/after the event.
              </p>
              
              {/* Event Group Photos */}
              {event.mediaLinks.eventGroup.photos && event.mediaLinks.eventGroup.photos.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Photos ({event.mediaLinks.eventGroup.photos.length})
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {event.mediaLinks.eventGroup.photos.map((url, index) => (
                      <div key={index} className="relative">
                        <img
                          src={url}
                          alt={`Event Group Photo ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border-2 border-purple-200"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Event Group Videos */}
              {event.mediaLinks.eventGroup.videos && event.mediaLinks.eventGroup.videos.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Videos ({event.mediaLinks.eventGroup.videos.length})
                  </h4>
                  <div className="space-y-2">
                    {event.mediaLinks.eventGroup.videos.map((url, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg">
                        <span className="text-lg">🎬</span>
                        <a href={url} target="_blank" rel="noopener noreferrer" className="flex-1 text-sm text-purple-600 hover:underline truncate">
                          {url}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Event Group Audio */}
              {event.mediaLinks.eventGroup.audio && event.mediaLinks.eventGroup.audio.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Audio ({event.mediaLinks.eventGroup.audio.length})
                  </h4>
                  <div className="space-y-2">
                    {event.mediaLinks.eventGroup.audio.map((url, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg">
                        <span className="text-lg">🎵</span>
                        <a href={url} target="_blank" rel="noopener noreferrer" className="flex-1 text-sm text-purple-600 hover:underline truncate">
                          {url}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Event Group Text Notes */}
              {event.mediaLinks.eventGroup.textNotes && event.mediaLinks.eventGroup.textNotes.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Notes ({event.mediaLinks.eventGroup.textNotes.length})
                  </h4>
                  <div className="space-y-2">
                    {event.mediaLinks.eventGroup.textNotes.map((note, index) => (
                      <div key={index} className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                        <p className="text-sm text-gray-700">{note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty state for Event Group content */}
              {(!event.mediaLinks.eventGroup.photos?.length && 
                !event.mediaLinks.eventGroup.videos?.length && 
                !event.mediaLinks.eventGroup.audio?.length && 
                !event.mediaLinks.eventGroup.textNotes?.length) && (
                <p className="text-sm text-gray-400">No content captured by Event Group yet.</p>
              )}
            </div>
          )}
        </div>

        {/* Right Column - Upload Window & Archival Actions */}
        <div className="space-y-6">
          {/* Upload Window Controls */}
          <UploadWindowControls
            expiresAt={event.archival?.uploadWindowExpiresAt}
            onSetExpiration={handleSetExpiration}
            disabled={event.status === 'archived'}
          />

          {/* Archival Actions */}
          <ArchivalActions
            event={event}
            onUpdateArchival={handleUpdateArchival}
            onFinalize={handleFinalize}
          />
        </div>
      </div>
    </div>
  );
};

export default ArchiverEventPage;
