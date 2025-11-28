/**
 * Archiver Dashboard
 * Dashboard for archivers to manage past events and documentation.
 * 
 * Features:
 * - List of past events with filters
 * - Mark as Archived action
 * - Upload Photos/Documents (dummy)
 * - Archived Events section
 */

import React, { useState, useMemo } from 'react';
import { events, type Event, departments, categories } from '../data/events';
import SectionHeading from '../components/SectionHeading';

const DashboardArchiver: React.FC = () => {
  // State for events (in real app, this would come from API)
  const [eventsList, setEventsList] = useState<Event[]>(events);
  
  // Filters
  const [yearFilter, setYearFilter] = useState<string>('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  
  // Modal state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Get unique academic years from events
  const academicYears = useMemo(() => {
    const years = new Set<string>();
    eventsList.forEach((e) => {
      const year = new Date(e.date).getFullYear();
      years.add(`${year - 1}-${year}`);
      years.add(`${year}-${year + 1}`);
    });
    return Array.from(years).sort().reverse();
  }, [eventsList]);

  // Past events (completed or past date)
  const pastEvents = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return eventsList.filter((e) => {
      const isPast = e.date < today || e.status === 'Completed';
      const matchesYear = !yearFilter || e.date.startsWith(yearFilter.split('-')[1]);
      const matchesDept = !departmentFilter || e.department === departmentFilter;
      const matchesCat = !categoryFilter || e.category === categoryFilter;
      return isPast && !e.isArchived && matchesYear && matchesDept && matchesCat;
    });
  }, [eventsList, yearFilter, departmentFilter, categoryFilter]);

  // Archived events
  const archivedEvents = useMemo(() => {
    return eventsList.filter((e) => e.isArchived);
  }, [eventsList]);

  // Mark as archived
  const handleArchive = (eventId: string) => {
    setEventsList((prev) =>
      prev.map((e) =>
        e.id === eventId ? { ...e, isArchived: true, lastUpdated: new Date().toISOString().split('T')[0] } : e
      )
    );
  };

  // Open upload modal
  const handleUpload = (event: Event) => {
    setSelectedEvent(event);
    setShowUploadModal(true);
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
    pastEvents: pastEvents.length,
    archived: archivedEvents.length,
    pendingArchive: pastEvents.length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Archiver Dashboard</h1>
        <p className="mt-2 text-gray-600">Manage past events and documentation</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Past Events</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pastEvents}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Pending Archive</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingArchive}</p>
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
              <p className="text-sm text-gray-500">Archived</p>
              <p className="text-2xl font-bold text-gray-900">{stats.archived}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Past Events Section */}
      <section className="mb-12">
        <SectionHeading title="Past Events" subtitle="Events that need to be archived" />

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Years</option>
              {academicYears.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {(yearFilter || departmentFilter || categoryFilter) && (
              <button
                onClick={() => {
                  setYearFilter('');
                  setDepartmentFilter('');
                  setCategoryFilter('');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Past Events Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pastEvents.map((event) => (
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
                          <div className="text-sm text-gray-500">{event.organiserGroup}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {event.department}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {event.category}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(event.date)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleArchive(event.id)}
                          className="px-3 py-1 bg-amber-100 text-amber-700 rounded-lg text-sm font-medium hover:bg-amber-200 transition-colors"
                        >
                          Archive
                        </button>
                        <button
                          onClick={() => handleUpload(event)}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                        >
                          Upload
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pastEvents.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No past events to archive</h3>
              <p className="text-gray-500">All past events have been archived.</p>
            </div>
          )}
        </div>
      </section>

      {/* Archived Events Section */}
      <section>
        <SectionHeading title="Archived Events" subtitle="Events that have been archived" />

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {archivedEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={event.imageUrl}
                          alt={event.title}
                          className="w-10 h-10 rounded-lg object-cover mr-3 grayscale"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{event.title}</div>
                          <div className="text-sm text-gray-500">{event.organiserGroup}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {event.department}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(event.date)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                        📁 Archived
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {archivedEvents.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No archived events yet</h3>
              <p className="text-gray-500">Archive past events to see them here.</p>
            </div>
          )}
        </div>
      </section>

      {/* Upload Modal */}
      {showUploadModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Upload Documents</h2>
                <button
                  onClick={() => {
                    setShowUploadModal(false);
                    setSelectedEvent(null);
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
              <p className="text-gray-700 mb-4">
                Upload photos and documents for <span className="font-medium">{selectedEvent.title}</span>
              </p>

              {/* Upload Photos */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Photos</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 cursor-pointer transition-colors">
                  <svg className="w-10 h-10 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm text-gray-500">Click to upload photos</p>
                  <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
                </div>
              </div>

              {/* Upload Documents */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Documents</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 cursor-pointer transition-colors">
                  <svg className="w-10 h-10 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-sm text-gray-500">Click to upload documents</p>
                  <p className="text-xs text-gray-400">PDF, DOC, DOCX up to 20MB</p>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowUploadModal(false);
                    setSelectedEvent(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Dummy upload action
                    alert('Files uploaded successfully! (Demo)');
                    setShowUploadModal(false);
                    setSelectedEvent(null);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Upload Files
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardArchiver;
