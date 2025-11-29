/**
 * Faculty Dashboard - Set 1 Workflow
 * 
 * Note: In Set 1 workflow, Faculty role is simplified.
 * Faculty can view all published events and ended events with galleries.
 */

import React, { useMemo } from 'react';
import { initialEvents, getUpcomingEvents, getEndedEvents } from '../data/events';
import EventCard from '../components/EventCard';
import SectionHeading from '../components/SectionHeading';

const DashboardFaculty: React.FC = () => {
  // Get events
  const upcomingEvents = useMemo(() => getUpcomingEvents(initialEvents), []);
  const endedEvents = useMemo(() => getEndedEvents(initialEvents), []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Faculty Dashboard</h1>
        <p className="mt-2 text-gray-600">View upcoming and past events</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="text-3xl font-bold text-green-700">{upcomingEvents.length}</div>
          <div className="text-green-600 mt-1">Upcoming Events</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="text-3xl font-bold text-blue-700">{endedEvents.length}</div>
          <div className="text-blue-600 mt-1">Past Events</div>
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

      {/* Past Events with Gallery */}
      <section>
        <SectionHeading title="Past Events" subtitle="Events with available galleries" />
        {endedEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {endedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500">No past events</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default DashboardFaculty;
