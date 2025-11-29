/**
 * Landing Page (Home)
 * Public landing page for viewers to browse events.
 * Set 1 workflow: Shows upcoming and ended events (not drafts).
 * Filters: Club, Date, Type of event.
 * Design inspired by BookMyShow.
 */

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { initialEvents, filterEvents, getUpcomingEvents, getEndedEvents, clubs, eventTypes } from '../data/events';
import EventCard from '../components/EventCard';
import SectionHeading from '../components/SectionHeading';
import FilterBar from '../components/FilterBar';

const LandingPage: React.FC = () => {
  // Filter state - Set 1 workflow: Club, Date, Type
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClub, setSelectedClub] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  // Get upcoming and ended events (not drafts)
  const upcomingEvents = useMemo(() => getUpcomingEvents(initialEvents), []);
  const endedEvents = useMemo(() => getEndedEvents(initialEvents), []);

  // Filter events based on search and filters
  const filteredEvents = useMemo(() => {
    return filterEvents(initialEvents, {
      club: selectedClub,
      type: selectedType,
      dateFrom: selectedDate,
      searchQuery: searchQuery,
    });
  }, [searchQuery, selectedClub, selectedType, selectedDate]);

  // Group upcoming events by type for horizontal sections
  const eventsByType = useMemo(() => {
    const grouped: Record<string, typeof upcomingEvents> = {};
    upcomingEvents.forEach((event) => {
      if (!grouped[event.type]) {
        grouped[event.type] = [];
      }
      grouped[event.type].push(event);
    });
    return grouped;
  }, [upcomingEvents]);

  // Check if any filter is active
  const hasActiveFilters = searchQuery || selectedClub || selectedType || selectedDate;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Discover Campus Events
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Your one-stop portal for all college events. Find workshops, seminars, 
              cultural fests, and more happening across campus.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="#events"
                className="px-8 py-3 bg-white text-blue-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Explore Events
              </a>
              <Link
                to="/login"
                className="px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-400 transition-colors border border-blue-400"
              >
                Login to Dashboard
              </Link>
            </div>
          </div>
        </div>

        {/* Wave decoration */}
        <div className="relative h-16">
          <svg
            className="absolute bottom-0 w-full h-16"
            viewBox="0 0 1440 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 64H1440V32C1440 32 1320 0 1080 0C840 0 720 64 480 64C240 64 120 0 0 32V64Z"
              fill="#f9fafb"
            />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <div id="events" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Bar - Set 1: Club, Date, Type */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedClub={selectedClub}
          onClubChange={setSelectedClub}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />

        {/* Show filtered results if any filter is active */}
        {hasActiveFilters ? (
          <section className="mb-12">
            <SectionHeading
              title="Search Results"
              subtitle={`${filteredEvents.length} events found`}
            />
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </section>
        ) : (
          <>
            {/* Upcoming Events Section */}
            <section className="mb-12">
              <SectionHeading
                title="Upcoming Events"
                subtitle="Events happening soon"
              />
              {upcomingEvents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {upcomingEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                  <p className="text-gray-500">No upcoming events at the moment</p>
                </div>
              )}
            </section>

            {/* Type-based horizontal scroll sections */}
            {eventTypes
              .filter((type) => eventsByType[type]?.length > 0)
              .slice(0, 3) // Show only first 3 types to keep page manageable
              .map((type) => (
                <section key={type} className="mb-12">
                  <SectionHeading
                    title={type}
                    subtitle={`${eventsByType[type].length} events`}
                  />
                  <div className="relative">
                    <div className="flex overflow-x-auto scrollbar-hide space-x-4 pb-4 -mx-4 px-4">
                      {eventsByType[type].map((event) => (
                        <div key={event.id} className="flex-shrink-0 w-72">
                          <EventCard event={event} />
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              ))}

            {/* Past Events Section - with Gallery indicator */}
            {endedEvents.length > 0 && (
              <section className="mb-12">
                <SectionHeading
                  title="Past Events"
                  subtitle="Check out what happened"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {endedEvents.slice(0, 4).map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>

      {/* Quick Stats Section */}
      <section className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">{initialEvents.filter(e => e.status !== 'draft').length}+</div>
              <div className="text-gray-600 mt-1">Total Events</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">{upcomingEvents.length}</div>
              <div className="text-gray-600 mt-1">Upcoming</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">{clubs.length}</div>
              <div className="text-gray-600 mt-1">Clubs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">{eventTypes.length}</div>
              <div className="text-gray-600 mt-1">Event Types</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
