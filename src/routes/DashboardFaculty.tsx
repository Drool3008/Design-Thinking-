/**
 * Faculty Dashboard - Set 1 + Set 3 + Set 6 Workflow
 * 
 * Faculty can view:
 * - Upcoming events
 * - Ended events (with galleries)
 * - Archived events (with galleries and faculty attendance visible)
 * - Download Event Book (combined newsletter compendium)
 */

import React, { useMemo, useState } from 'react';
import { useEvents } from '../context/EventContext';
import EventCard from '../components/EventCard';
import SectionHeading from '../components/SectionHeading';
import FacultyEventBookGenerator from '../components/FacultyEventBookGenerator';

const DashboardFaculty: React.FC = () => {
  // Use shared event context
  const { events } = useEvents();
  
  // Set 6: Event Book modal state
  const [showBookGenerator, setShowBookGenerator] = useState(false);
  
  // Get events by status from context
  const upcomingEvents = useMemo(() => 
    events.filter(e => e.status === 'upcoming')
      .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()),
    [events]
  );
  
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Faculty Dashboard</h1>
          <p className="mt-2 text-gray-600">View upcoming, past, and archived events</p>
        </div>
        {/* Set 6: Download Event Book Button */}
        <button
          onClick={() => setShowBookGenerator(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg font-semibold hover:from-teal-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Download Event Book
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="text-3xl font-bold text-green-700">{upcomingEvents.length}</div>
          <div className="text-green-600 mt-1">Upcoming Events</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <div className="text-3xl font-bold text-amber-700">{endedEvents.length}</div>
          <div className="text-amber-600 mt-1">Ended Events</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
          <div className="text-3xl font-bold text-purple-700">{archivedEvents.length}</div>
          <div className="text-purple-600 mt-1">Archived Events</div>
        </div>
      </div>

      {/* Upcoming Events */}
      <section className="mb-12">
        <SectionHeading title="Upcoming Events" subtitle="Events happening soon" />
        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500">No upcoming events</p>
          </div>
        )}
      </section>

      {/* Ended Events */}
      <section className="mb-12">
        <SectionHeading title="Ended Events" subtitle="Recent events awaiting archival" />
        {endedEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {endedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500">No ended events</p>
          </div>
        )}
      </section>

      {/* Archived Events */}
      <section>
        <SectionHeading 
          title="Archived Events" 
          subtitle="Past events with complete galleries - click to view faculty attendance" 
        />
        {archivedEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {archivedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500">No archived events yet</p>
          </div>
        )}
      </section>
      
      {/* Set 6: Event Book Generator Modal */}
      <FacultyEventBookGenerator
        isOpen={showBookGenerator}
        onClose={() => setShowBookGenerator(false)}
      />
    </div>
  );
};

export default DashboardFaculty;
