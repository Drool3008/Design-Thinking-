/**
 * Archiver Dashboard - Set 1 Workflow
 * 
 * Note: In Set 1 workflow, Archiver can view ended events and manage media galleries.
 */

import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { initialEvents, getEndedEvents } from '../data/events';
import SectionHeading from '../components/SectionHeading';

const DashboardArchiver: React.FC = () => {
  // Get ended events
  const endedEvents = useMemo(() => getEndedEvents(initialEvents), []);

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Archiver Dashboard</h1>
        <p className="mt-2 text-gray-600">Manage past events and media galleries</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Ended Events</p>
              <p className="text-2xl font-bold text-gray-900">{endedEvents.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">With Gallery</p>
              <p className="text-2xl font-bold text-gray-900">
                {endedEvents.filter(e => e.mediaLinks && e.mediaLinks.photos.length > 0).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Pending Gallery</p>
              <p className="text-2xl font-bold text-gray-900">
                {endedEvents.filter(e => !e.mediaLinks || e.mediaLinks.photos.length === 0).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ended Events Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <SectionHeading title="Past Events" subtitle="Manage event archives and galleries" />
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gallery Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {endedEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={event.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=100'}
                        alt={event.title}
                        className="w-12 h-12 rounded-lg object-cover mr-3"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{event.title}</div>
                        <div className="text-sm text-gray-500">{event.club} • {event.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatDateTime(event.dateTime)}
                  </td>
                  <td className="px-6 py-4">
                    {event.mediaLinks && event.mediaLinks.photos.length > 0 ? (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                        {event.mediaLinks.photos.length} photos
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-700">
                        No gallery
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <Link
                        to={`/events/${event.id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View
                      </Link>
                      <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                        Upload Media
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {endedEvents.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No past events</h3>
            <p className="text-gray-500">Past events will appear here for archiving</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardArchiver;
