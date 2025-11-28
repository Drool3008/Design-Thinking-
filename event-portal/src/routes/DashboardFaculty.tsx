/**
 * Faculty Dashboard
 * Dashboard for faculty members to approve/reject events requiring faculty authorization.
 * 
 * Design: Simple, uncluttered layout for faculty clarity
 * 
 * Features:
 * - List of events requiring faculty approval
 * - Approve, Reject, Request Clarification actions
 * - Section for upcoming approved events
 */

import React, { useState, useMemo } from 'react';
import { events, type Event, type EventStatus } from '../data/events';

const DashboardFaculty: React.FC = () => {
  // State for events (in real app, this would come from API)
  const [eventsList, setEventsList] = useState<Event[]>(events);
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'reject' | 'clarify'>('approve');
  const [notes, setNotes] = useState('');

  // Events requiring faculty approval (Pending Approval status)
  const pendingApproval = useMemo(() => {
    return eventsList.filter((e) => e.status === 'Pending Approval' && !e.isArchived);
  }, [eventsList]);

  // Upcoming approved events associated with faculty
  const upcomingApproved = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return eventsList.filter(
      (e) => e.status === 'Approved' && e.date >= today && !e.isArchived
    ).slice(0, 5);
  }, [eventsList]);

  // Handle actions
  const handleAction = (event: Event, action: 'approve' | 'reject' | 'clarify') => {
    setSelectedEvent(event);
    setActionType(action);
    setShowActionModal(true);
  };

  // Confirm action
  const confirmAction = () => {
    if (!selectedEvent) return;

    let newStatus: EventStatus = selectedEvent.status;
    if (actionType === 'approve') {
      newStatus = 'Approved';
    } else if (actionType === 'reject') {
      newStatus = 'Rejected';
    }
    // For 'clarify', we keep the status as Pending Approval but would send a message

    setEventsList((prev) =>
      prev.map((e) =>
        e.id === selectedEvent.id
          ? { ...e, status: newStatus, lastUpdated: new Date().toISOString().split('T')[0] }
          : e
      )
    );

    setShowActionModal(false);
    setSelectedEvent(null);
    setNotes('');
  };

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Format time for display
  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header - Clean and simple for faculty */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Faculty Dashboard</h1>
        <p className="mt-2 text-gray-600">Review and approve events requiring faculty authorization</p>
      </div>

      {/* Summary Stats - Simple and clear */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="text-3xl font-bold text-yellow-700">{pendingApproval.length}</div>
          <div className="text-yellow-600 mt-1">Pending Your Approval</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="text-3xl font-bold text-green-700">{upcomingApproved.length}</div>
          <div className="text-green-600 mt-1">Upcoming Approved Events</div>
        </div>
      </div>

      {/* Events Requiring Approval */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
          Events Requiring Your Approval
        </h2>

        {pendingApproval.length > 0 ? (
          <div className="space-y-4">
            {pendingApproval.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  {/* Event Info */}
                  <div className="flex-1 mb-4 md:mb-0">
                    <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(event.date)} at {formatTime(event.time)}
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {event.department}
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.venue}
                      </div>
                    </div>
                    <p className="mt-3 text-gray-600 text-sm line-clamp-2">{event.description}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      <span className="font-medium">Organizer:</span> {event.organiserGroup}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col space-y-2 md:ml-6">
                    <button
                      onClick={() => handleAction(event, 'approve')}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(event, 'reject')}
                      className="px-6 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleAction(event, 'clarify')}
                      className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                      Request Clarification
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
            <svg className="w-12 h-12 mx-auto text-green-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-green-800">All Caught Up!</h3>
            <p className="text-green-600 mt-1">No events pending your approval at this time.</p>
          </div>
        )}
      </section>

      {/* Upcoming Approved Events */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          Upcoming Approved Events I Am Associated With
        </h2>

        {upcomingApproved.length > 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Venue
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {upcomingApproved.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{event.title}</div>
                      <div className="text-sm text-gray-500">{event.organiserGroup}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(event.date)} • {formatTime(event.time)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {event.venue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
            <p className="text-gray-500">No upcoming approved events at this time.</p>
          </div>
        )}
      </section>

      {/* Action Modal */}
      {showActionModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {actionType === 'approve' && 'Approve Event'}
                {actionType === 'reject' && 'Reject Event'}
                {actionType === 'clarify' && 'Request Clarification'}
              </h2>
            </div>

            <div className="p-6">
              <p className="text-gray-700 mb-4">
                <span className="font-medium">Event:</span> {selectedEvent.title}
              </p>

              {actionType !== 'approve' && (
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={
                    actionType === 'reject'
                      ? 'Reason for rejection (optional)...'
                      : 'What clarification do you need?...'
                  }
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
                />
              )}

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowActionModal(false);
                    setSelectedEvent(null);
                    setNotes('');
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmAction}
                  className={`px-4 py-2 rounded-lg text-white transition-colors ${
                    actionType === 'approve'
                      ? 'bg-green-600 hover:bg-green-700'
                      : actionType === 'reject'
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {actionType === 'approve' && 'Confirm Approval'}
                  {actionType === 'reject' && 'Confirm Rejection'}
                  {actionType === 'clarify' && 'Send Request'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardFaculty;
