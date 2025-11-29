/**
 * Faculty Dashboard - Set 1 + Set 3 Workflow
 * 
 * Faculty can view:
 * - Upcoming events
 * - Ended events (with galleries)
 * - Archived events (with galleries and faculty attendance visible)
 */

import React, { useMemo } from 'react';
import { useEvents } from '../context/EventContext';
import EventCard from '../components/EventCard';
import SectionHeading from '../components/SectionHeading';

const DashboardFaculty: React.FC = () => {
  // Use shared event context
  const { events } = useEvents();
  
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Faculty Dashboard</h1>
        <p className="mt-2 text-gray-600">View upcoming, past, and archived events</p>
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
    </div>
  );
};

export default DashboardFaculty;
