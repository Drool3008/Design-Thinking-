/**
 * Event Group Dashboard - Set 1 + Set 3 Workflow
 * Dashboard for event group members to create and manage their events.
 * 
 * Set 1 Workflow:
 * 1. Create draft events (visible only in dashboard)
 * 2. Publish events (makes them visible on public homepage as "upcoming")
 * 3. Generate registration links for published events
 * 4. Mark events as ended (gallery becomes available)
 * 
 * Set 3 Additions:
 * - Capture event content (photos, videos, audio, text notes)
 * - Mark faculty attendance
 */

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { type Event, type EventStatus, type EventGroupMedia, type FacultyAttendance, generateRegistrationUrl } from '../data/events';
import EventForm from '../components/EventForm';
import SectionHeading from '../components/SectionHeading';
import EventGroupContentCapture from '../components/EventGroupContentCapture';
import FacultyAttendanceManager from '../components/FacultyAttendanceManager';

// Current event group ID (in real app, comes from auth context)
const CURRENT_EVENT_GROUP_ID = 'eg-robotics';

const DashboardEventGroup: React.FC = () => {
  // Use shared event context instead of local state
  const { 
    events, 
    addEvent, 
    updateEvent, 
    deleteEvent, 
    publishEvent, 
    endEvent,
    updateEventMedia,
    updateFacultyAttendance 
  } = useEvents();
  
  // Filter events for this event group
  const myEvents = useMemo(() => 
    events.filter((e) => e.eventGroupId === CURRENT_EVENT_GROUP_ID || e.eventGroupId === 'eg-coding'),
    [events]
  );
  
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'draft' | 'upcoming' | 'ended'>('all');
  // Set 3: Event management modal state
  const [managingEvent, setManagingEvent] = useState<Event | null>(null);
  const [manageTab, setManageTab] = useState<'content' | 'attendance'>('content');

  // Status badge colors for Set 1 + Set 2 workflow
  const statusColors: Record<EventStatus, string> = {
    draft: 'bg-gray-100 text-gray-700',
    upcoming: 'bg-green-100 text-green-700',
    ended: 'bg-blue-100 text-blue-700',
    archived: 'bg-purple-100 text-purple-700',
  };

  const statusLabels: Record<EventStatus, string> = {
    draft: 'Draft',
    upcoming: 'Published',
    ended: 'Ended',
    archived: 'Archived',
  };

  // Set 3: Handle content capture updates
  const handleMediaChange = (eventId: string, media: EventGroupMedia) => {
    updateEventMedia(eventId, media);
    // Update managingEvent as well for UI sync
    if (managingEvent && managingEvent.id === eventId) {
      setManagingEvent(prev => prev ? {
        ...prev,
        mediaLinks: {
          ...prev.mediaLinks,
          photos: prev.mediaLinks?.photos || [],
          videos: prev.mediaLinks?.videos || [],
          eventGroup: media,
        },
      } : null);
    }
  };

  // Set 3: Handle faculty attendance updates
  const handleAttendanceChange = (eventId: string, attendance: FacultyAttendance) => {
    updateFacultyAttendance(eventId, attendance);
    // Update managingEvent as well for UI sync
    if (managingEvent && managingEvent.id === eventId) {
      setManagingEvent(prev => prev ? { ...prev, facultyAttendance: attendance } : null);
    }
  };

  // Handle save from EventForm
  const handleSaveEvent = (eventData: Partial<Event>) => {
    if (editingEvent) {
      // Update existing event using context
      updateEvent(editingEvent.id, eventData);
    } else {
      // Create new event using context
      const newEvent: Event = {
        id: Date.now().toString(),
        title: eventData.title || '',
        club: eventData.club || '',
        dateTime: eventData.dateTime || new Date().toISOString(),
        type: eventData.type || '',
        shortDescription: eventData.shortDescription || '',
        fullDescription: eventData.fullDescription,
        status: eventData.status || 'draft',
        eventGroupId: CURRENT_EVENT_GROUP_ID,
        venue: eventData.venue,
        imageUrl: eventData.imageUrl,
        lastUpdated: new Date().toISOString().split('T')[0],
      };
      addEvent(newEvent);
    }

    setShowForm(false);
    setEditingEvent(null);
  };

  // Handle edit event
  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  // Handle delete event
  const handleDelete = (eventId: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      deleteEvent(eventId);
    }
  };

  // Publish event (draft -> upcoming) using context
  const handlePublish = (eventId: string) => {
    publishEvent(eventId);
  };

  // Generate new registration link
  const handleGenerateLink = (eventId: string) => {
    const event = myEvents.find((e) => e.id === eventId);
    if (event) {
      const newUrl = generateRegistrationUrl(eventId, event.title);
      updateEvent(eventId, { registrationUrl: newUrl });
      navigator.clipboard.writeText(newUrl);
      alert('Registration link generated and copied to clipboard!');
    }
  };

  // Mark event as ended using context
  const handleMarkEnded = (eventId: string) => {
    endEvent(eventId);
  };

  // Copy registration link to clipboard
  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    alert('Registration link copied to clipboard!');
  };

  // Format datetime for display
  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Filter events by tab
  const filteredEvents = myEvents.filter((event) => {
    if (activeTab === 'all') return true;
    return event.status === activeTab;
  });

  // Get counts for tabs
  const counts = {
    all: myEvents.length,
    draft: myEvents.filter((e) => e.status === 'draft').length,
    upcoming: myEvents.filter((e) => e.status === 'upcoming').length,
    ended: myEvents.filter((e) => e.status === 'ended').length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Event Group Dashboard</h1>
        <p className="mt-2 text-gray-600">Create, publish, and manage your club's events</p>
      </div>

      {/* Create Event Button */}
      <div className="mb-6">
        <button
          onClick={() => {
            setShowForm(true);
            setEditingEvent(null);
          }}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create New Event
        </button>
      </div>

      {/* Create/Edit Event Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingEvent ? 'Edit Event' : 'Create New Event'}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingEvent(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <EventForm
                event={editingEvent || undefined}
                eventGroupId={CURRENT_EVENT_GROUP_ID}
                onSave={handleSaveEvent}
                onCancel={() => {
                  setShowForm(false);
                  setEditingEvent(null);
                }}
                mode={editingEvent ? 'edit' : 'create'}
              />
            </div>
          </div>
        </div>
      )}

      {/* Set 3: Event Management Modal (Content Capture & Faculty Attendance) */}
      {managingEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white p-6 border-b border-gray-200 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Manage Event</h2>
                  <p className="text-sm text-gray-500">{managingEvent.title}</p>
                </div>
                <button
                  onClick={() => setManagingEvent(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Tabs */}
              <div className="flex mt-4 border-b border-gray-200 -mb-6">
                <button
                  onClick={() => setManageTab('content')}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    manageTab === 'content'
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Captured Content
                </button>
                <button
                  onClick={() => setManageTab('attendance')}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    manageTab === 'attendance'
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Faculty Attendance
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {manageTab === 'content' && (
                <EventGroupContentCapture
                  media={managingEvent.mediaLinks?.eventGroup || {
                    photos: [],
                    videos: [],
                    audio: [],
                    textNotes: [],
                  }}
                  onMediaChange={(media) => handleMediaChange(managingEvent.id, media)}
                />
              )}

              {manageTab === 'attendance' && (
                <FacultyAttendanceManager
                  attendance={managingEvent.facultyAttendance || {}}
                  onAttendanceChange={(attendance) => handleAttendanceChange(managingEvent.id, attendance)}
                />
              )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setManagingEvent(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6 w-fit">
        {(['all', 'draft', 'upcoming', 'ended'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} ({counts[tab]})
          </button>
        ))}
      </div>

      {/* My Events Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <SectionHeading title="My Events" subtitle="Manage your event submissions" />
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registration Link
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={event.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=100'}
                        alt={event.title}
                        className="w-12 h-12 rounded-lg object-cover mr-3"
                      />
                      <div>
                        <Link to={`/events/${event.id}`} className="font-medium text-gray-900 hover:text-blue-600">
                          {event.title}
                        </Link>
                        <div className="text-sm text-gray-500">{event.club} • {event.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[event.status]}`}>
                      {statusLabels[event.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatDateTime(event.dateTime)}
                  </td>
                  <td className="px-6 py-4">
                    {event.registrationUrl ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500 truncate max-w-[150px]" title={event.registrationUrl}>
                          {event.registrationUrl.substring(0, 30)}...
                        </span>
                        <button
                          onClick={() => handleCopyLink(event.registrationUrl!)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Copy link"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {/* Draft actions */}
                      {event.status === 'draft' && (
                        <>
                          <button
                            onClick={() => handleEdit(event)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(event.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => handlePublish(event.id)}
                            className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                          >
                            Publish
                          </button>
                        </>
                      )}
                      
                      {/* Upcoming actions */}
                      {event.status === 'upcoming' && (
                        <>
                          <button
                            onClick={() => handleGenerateLink(event.id)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            New Link
                          </button>
                          <button
                            onClick={() => handleMarkEnded(event.id)}
                            className="px-3 py-1 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors"
                          >
                            Mark Ended
                          </button>
                        </>
                      )}
                      
                      {/* Ended actions - Set 3: Added Manage Event button */}
                      {event.status === 'ended' && (
                        <>
                          <button
                            onClick={() => {
                              setManagingEvent(event);
                              setManageTab('content');
                            }}
                            className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors"
                          >
                            Manage Event
                          </button>
                          <Link
                            to={`/events/${event.id}`}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            View Gallery
                          </Link>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {activeTab === 'all' ? 'No events yet' : `No ${activeTab} events`}
            </h3>
            <p className="text-gray-500">
              {activeTab === 'all' || activeTab === 'draft' ? 'Create your first event to get started' : ''}
            </p>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-2xl font-bold text-gray-700">{counts.draft}</div>
          <div className="text-gray-500">Draft Events</div>
          <p className="text-xs text-gray-400 mt-2">Visible only to you</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-2xl font-bold text-green-600">{counts.upcoming}</div>
          <div className="text-gray-500">Published Events</div>
          <p className="text-xs text-gray-400 mt-2">Visible on public homepage</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-2xl font-bold text-blue-600">{counts.ended}</div>
          <div className="text-gray-500">Ended Events</div>
          <p className="text-xs text-gray-400 mt-2">Gallery available</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardEventGroup;
