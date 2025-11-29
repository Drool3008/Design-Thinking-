/**
 * Event Group Dashboard - Set 1 Workflow
 * Dashboard for event group members to create and manage their events.
 * 
 * Set 1 Workflow:
 * 1. Create draft events (visible only in dashboard)
 * 2. Publish events (makes them visible on public homepage as "upcoming")
 * 3. Generate registration links for published events
 * 4. Mark events as ended (gallery becomes available)
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { initialEvents, type Event, type EventStatus, generateRegistrationUrl } from '../data/events';
import EventForm from '../components/EventForm';
import SectionHeading from '../components/SectionHeading';

// Current event group ID (in real app, comes from auth context)
const CURRENT_EVENT_GROUP_ID = 'eg-robotics';

const DashboardEventGroup: React.FC = () => {
  // State for events (in real app, this would come from API)
  const [myEvents, setMyEvents] = useState<Event[]>(
    initialEvents.filter((e) => e.eventGroupId === CURRENT_EVENT_GROUP_ID || e.eventGroupId === 'eg-coding')
  );
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'draft' | 'upcoming' | 'ended'>('all');

  // Status badge colors for Set 1 workflow
  const statusColors: Record<EventStatus, string> = {
    draft: 'bg-gray-100 text-gray-700',
    upcoming: 'bg-green-100 text-green-700',
    ended: 'bg-blue-100 text-blue-700',
  };

  const statusLabels: Record<EventStatus, string> = {
    draft: 'Draft',
    upcoming: 'Published',
    ended: 'Ended',
  };

  // Handle save from EventForm
  const handleSaveEvent = (eventData: Partial<Event>) => {
    if (editingEvent) {
      // Update existing event
      setMyEvents((prev) =>
        prev.map((event) =>
          event.id === editingEvent.id
            ? { ...event, ...eventData, lastUpdated: new Date().toISOString().split('T')[0] }
            : event
        )
      );
    } else {
      // Create new event
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
      setMyEvents((prev) => [newEvent, ...prev]);
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
      setMyEvents((prev) => prev.filter((e) => e.id !== eventId));
    }
  };

  // Publish event (draft -> upcoming)
  const handlePublish = (eventId: string) => {
    setMyEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? {
              ...e,
              status: 'upcoming' as EventStatus,
              registrationUrl: generateRegistrationUrl(e.id, e.title),
              lastUpdated: new Date().toISOString().split('T')[0],
            }
          : e
      )
    );
  };

  // Generate new registration link
  const handleGenerateLink = (eventId: string) => {
    const event = myEvents.find((e) => e.id === eventId);
    if (event) {
      const newUrl = generateRegistrationUrl(eventId, event.title);
      setMyEvents((prev) =>
        prev.map((e) =>
          e.id === eventId ? { ...e, registrationUrl: newUrl, lastUpdated: new Date().toISOString().split('T')[0] } : e
        )
      );
      navigator.clipboard.writeText(newUrl);
      alert('Registration link generated and copied to clipboard!');
    }
  };

  // Mark event as ended
  const handleMarkEnded = (eventId: string) => {
    setMyEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? {
              ...e,
              status: 'ended' as EventStatus,
              lastUpdated: new Date().toISOString().split('T')[0],
            }
          : e
      )
    );
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
                      
                      {/* Ended actions */}
                      {event.status === 'ended' && (
                        <Link
                          to={`/events/${event.id}`}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          View Gallery
                        </Link>
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
