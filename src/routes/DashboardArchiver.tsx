/**
 * Archiver Dashboard - Set 2 Workflow
 * 
 * Dashboard for Archivers to manage ended events:
 * - View all ended events
 * - Navigate to per-event archival management
 * - Track archival progress
 */

import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import type { Event } from '../data/events';

const DashboardArchiver: React.FC = () => {
  const { events } = useEvents();
  const [activeTab, setActiveTab] = useState<'pending' | 'archived'>('pending');

  // Get ended and archived events from context
  const endedEvents = useMemo(() => 
    events.filter(e => e.status === 'ended')
      .sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()),
    [events]
  );
  
  const archivedEvents = useMemo(() => 
    events.filter(e => e.status === 'archived')
      .sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()),
    [events]
  );
  
  // Pending = ended but not yet fully archived
  const pendingEvents = useMemo(() => 
    endedEvents.filter(e => e.status !== 'archived'),
    [endedEvents]
  );

  // Stats
  const stats = useMemo(() => ({
    totalEnded: endedEvents.length + archivedEvents.length,
    fullyArchived: archivedEvents.length,
    pendingArchival: pendingEvents.length,
  }), [endedEvents, archivedEvents, pendingEvents]);

  // Format date/time
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Get archival status for display
  const getArchivalStatus = (event: Event): { label: string; color: string } => {
    if (event.status === 'archived') {
      return { label: 'Archived', color: 'bg-green-100 text-green-800' };
    }
    
    if (!event.archival) {
      return { label: 'Not Started', color: 'bg-gray-100 text-gray-800' };
    }

    const { cleaned, validated, summary, finalizedAt } = event.archival;
    
    if (finalizedAt) {
      return { label: 'Finalized', color: 'bg-green-100 text-green-800' };
    }
    if (summary) {
      return { label: 'Summary Ready', color: 'bg-blue-100 text-blue-800' };
    }
    if (validated) {
      return { label: 'Validated', color: 'bg-purple-100 text-purple-800' };
    }
    if (cleaned) {
      return { label: 'Cleaned', color: 'bg-yellow-100 text-yellow-800' };
    }
    
    return { label: 'In Progress', color: 'bg-orange-100 text-orange-800' };
  };

  // Display events based on active tab
  const displayedEvents = activeTab === 'pending' ? pendingEvents : archivedEvents;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Archiver Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage event archival: upload windows, content cleaning, validation, and publishing
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Ended Events</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{stats.totalEnded}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Fully Archived</dt>
                  <dd className="text-2xl font-semibold text-green-600">{stats.fullyArchived}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Pending Archival</dt>
                  <dd className="text-2xl font-semibold text-orange-600">{stats.pendingArchival}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('pending')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'pending'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Pending Archival ({pendingEvents.length})
          </button>
          <button
            onClick={() => setActiveTab('archived')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'archived'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Fully Archived ({archivedEvents.length})
          </button>
        </nav>
      </div>

      {/* Events Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {displayedEvents.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No events</h3>
            <p className="mt-1 text-sm text-gray-500">
              {activeTab === 'pending' 
                ? 'No events pending archival.' 
                : 'No archived events yet.'}
            </p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Club / Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Archival Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayedEvents.map((event) => {
                const archivalStatus = getArchivalStatus(event);
                return (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <img
                            className="h-12 w-12 rounded-lg object-cover"
                            src={event.imageUrl}
                            alt={event.title}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{event.title}</div>
                          <div className="text-sm text-gray-500">{event.venue}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{event.club}</div>
                      <div className="text-sm text-gray-500 capitalize">{event.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDateTime(event.dateTime)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${archivalStatus.color}`}>
                        {archivalStatus.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/dashboard/archiver/${event.id}`}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Manage Archive
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DashboardArchiver;
