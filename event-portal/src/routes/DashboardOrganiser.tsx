/**
 * Organiser Dashboard
 * Dashboard for organisers to review and approve/reject events for scheduling.
 * 
 * Features:
 * - List of events pending organiser actions
 * - Filter by status
 * - Approve/Request Changes actions
 */

import React, { useState, useMemo } from 'react';
import { events, type Event, type EventStatus } from '../data/events';
import SectionHeading from '../components/SectionHeading';

const DashboardOrganiser: React.FC = () => {
  // State for events (in real app, this would come from API)
  const [eventsList, setEventsList] = useState<Event[]>(events);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'changes'>('approve');
  const [changeNotes, setChangeNotes] = useState('');

  // Filter events for organiser review
  const pendingEvents = useMemo(() => {
    return eventsList.filter((e) => {
      // Only show events that need organiser attention
      const isRelevant = e.status === 'Pending Approval' || e.status === 'Approved' || e.status === 'Rejected';
      const matchesFilter = !statusFilter || e.status === statusFilter;
      return isRelevant && matchesFilter && !e.isArchived;
    });
  }, [eventsList, statusFilter]);

  // Status badge colors
  const statusColors: Record<EventStatus, string> = {
    'Draft': 'bg-gray-100 text-gray-700',
    'Pending Approval': 'bg-yellow-100 text-yellow-700',
    'Approved': 'bg-green-100 text-green-700',
    'Rejected': 'bg-red-100 text-red-700',
    'Completed': 'bg-blue-100 text-blue-700',
  };

  // Handle approve action
  const handleApprove = (event: Event) => {
    setSelectedEvent(event);
    setActionType('approve');
    setShowActionModal(true);
  };

  // Handle request changes action
  const handleRequestChanges = (event: Event) => {
    setSelectedEvent(event);
    setActionType('changes');
    setShowActionModal(true);
  };

  // Confirm action
  const confirmAction = () => {
    if (!selectedEvent) return;

    if (actionType === 'approve') {
      setEventsList((prev) =>
        prev.map((e) =>
          e.id === selectedEvent.id
            ? { ...e, status: 'Approved' as EventStatus, lastUpdated: new Date().toISOString().split('T')[0] }
            : e
        )
      );
    } else {
      setEventsList((prev) =>
        prev.map((e) =>
          e.id === selectedEvent.id
            ? { ...e, status: 'Rejected' as EventStatus, lastUpdated: new Date().toISOString().split('T')[0] }
            : e
        )
      );
    }

    setShowActionModal(false);
    setSelectedEvent(null);
    setChangeNotes('');
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

  // Stats
  const stats = {
    pending: eventsList.filter((e) => e.status === 'Pending Approval').length,
    approved: eventsList.filter((e) => e.status === 'Approved' && !e.isArchived).length,
    rejected: eventsList.filter((e) => e.status === 'Rejected').length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Organiser Dashboard</h1>
        <p className="mt-2 text-gray-600">Review and approve events for scheduling</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Approved</p>
              <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Rejected</p>
              <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Filter by Status:</span>
          <div className="flex space-x-2">
            {['', 'Pending Approval', 'Approved', 'Rejected'].map((status) => (
              <button
                key={status || 'all'}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status || 'All'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <SectionHeading title="Events Pending Organiser Actions" />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Organizer Group
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Requested Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-10 h-10 rounded-lg object-cover mr-3"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{event.title}</div>
                        <div className="text-sm text-gray-500">{event.category} • {event.venue}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {event.organiserGroup}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatDate(event.date)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[event.status]}`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {event.status === 'Pending Approval' ? (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleApprove(event)}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleRequestChanges(event)}
                          className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium hover:bg-yellow-200 transition-colors"
                        >
                          Request Changes
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">
                        {event.status === 'Approved' ? 'Scheduled' : 'Returned'}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {pendingEvents.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events to review</h3>
            <p className="text-gray-500">All caught up! Check back later for new submissions.</p>
          </div>
        )}
      </div>

      {/* Action Modal */}
      {showActionModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {actionType === 'approve' ? 'Approve Event' : 'Request Changes'}
              </h2>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <p className="text-gray-700">
                  {actionType === 'approve'
                    ? `Are you sure you want to approve "${selectedEvent.title}" for scheduling?`
                    : `Please provide feedback for "${selectedEvent.title}":`}
                </p>
              </div>

              {actionType === 'changes' && (
                <textarea
                  value={changeNotes}
                  onChange={(e) => setChangeNotes(e.target.value)}
                  placeholder="Enter your feedback or required changes..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
                />
              )}

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowActionModal(false);
                    setSelectedEvent(null);
                    setChangeNotes('');
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
                      : 'bg-yellow-600 hover:bg-yellow-700'
                  }`}
                >
                  {actionType === 'approve' ? 'Approve' : 'Send Feedback'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardOrganiser;
