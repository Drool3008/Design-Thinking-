/**
 * Event Detail Page
 * Full event information page with registration link (upcoming) or gallery (ended/archived).
 * Updated for Set 2 workflow - now shows archival summary for archived events.
 * Updated for Set 3 workflow - faculty-only visibility of attendees with flashcards and meeting requests.
 */

import React, { useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import type { EventStatus } from '../data/events';
import { useAuth } from '../context/AuthContext';
import { getFacultyById, facultyMembers } from '../data/faculty';
import type { Faculty } from '../data/faculty';
import EventCard from '../components/EventCard';
import EventGallery from '../components/EventGallery';
import SectionHeading from '../components/SectionHeading';
import FacultyDetailPanel from '../components/FacultyDetailPanel';
import RequestMeetingModal from '../components/RequestMeetingModal';

const EventDetailPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { role } = useAuth();
  const { events, getEventById } = useEvents();

  // State for faculty meeting request modal
  const [meetingModalOpen, setMeetingModalOpen] = useState(false);
  const [selectedFacultyForMeeting, setSelectedFacultyForMeeting] = useState<Faculty | null>(null);
  
  // State for click-to-open faculty detail panel (Set 4)
  const [selectedFacultyForPanel, setSelectedFacultyForPanel] = useState<Faculty | null>(null);

  // Get event by ID from context
  const event = useMemo(() => {
    if (!eventId) return null;
    return getEventById(eventId);
  }, [eventId, getEventById]);

  // Get related events (same club or type) from context
  const relatedEvents = useMemo(() => {
    if (!event) return [];
    return events
      .filter(e => e.status === 'upcoming')
      .filter((e) => e.id !== event.id && (e.club === event.club || e.type === event.type))
      .slice(0, 4);
  }, [event, events]);

  // Format datetime for display
  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    const dateFormatted = date.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const timeFormatted = date.toLocaleTimeString('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    return { date: dateFormatted, time: timeFormatted };
  };

  // Status badge colors for Set 1 + Set 2 workflow
  const statusColors: Record<EventStatus, string> = {
    draft: 'bg-gray-100 text-gray-600',
    upcoming: 'bg-green-100 text-green-700',
    ended: 'bg-amber-100 text-amber-700',
    archived: 'bg-blue-100 text-blue-700',
  };

  const statusLabels: Record<EventStatus, string> = {
    draft: 'Draft',
    upcoming: 'Upcoming',
    ended: 'Event Ended',
    archived: 'Archived',
  };

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <svg className="w-20 h-20 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h2>
          <p className="text-gray-600 mb-8">The event you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const { date, time } = formatDateTime(event.dateTime);
  const imageUrl = event.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>
      </div>

      {/* Event Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="md:flex">
            {/* Event Image */}
            <div className="md:w-2/5">
              <img
                src={imageUrl}
                alt={event.title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>

            {/* Event Info */}
            <div className="md:w-3/5 p-6 md:p-8">
              {/* Status and Type Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[event.status]}`}>
                  {statusLabels[event.status]}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {event.type}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h1>
              
              {/* Club */}
              <p className="text-lg text-blue-600 font-medium mb-4">{event.club}</p>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {event.fullDescription || event.shortDescription}
              </p>

              {/* Event Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <div className="font-medium text-gray-900">{date}</div>
                    <div className="text-gray-500">{time}</div>
                  </div>
                </div>

                {event.venue && (
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <div className="font-medium text-gray-900">{event.venue}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Registration Button for upcoming events */}
              {event.status === 'upcoming' && event.registrationUrl && (
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Register Now
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              )}

              {/* Message for ended events without registration */}
              {event.status === 'ended' && (
                <div className="inline-flex items-center px-4 py-2 bg-amber-100 text-amber-700 rounded-lg">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  This event has ended
                </div>
              )}

              {/* Message for archived events */}
              {event.status === 'archived' && (
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  Event Archived
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Archival Summary for archived events */}
        {event.status === 'archived' && event.archival?.summary && (
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Event Summary</h3>
                <p className="text-gray-700 leading-relaxed">{event.archival.summary}</p>
                {event.archival.finalizedAt && (
                  <p className="text-sm text-gray-500 mt-3">
                    Archived on {new Date(event.archival.finalizedAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Event Gallery for ended and archived events */}
        {(event.status === 'ended' || event.status === 'archived') && event.mediaLinks && (
          <EventGallery mediaLinks={event.mediaLinks} eventTitle={event.title} />
        )}

        {/* Faculty Attendees Section - Only visible to faculty */}
        {role === 'faculty' && (event.status === 'ended' || event.status === 'archived') && event.facultyAttendance && (
          <div className="mt-8 bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Faculty Attendees</h3>
                <p className="text-sm text-gray-500">
                  {Object.values(event.facultyAttendance).filter(Boolean).length} faculty members attended
                </p>
              </div>
            </div>

            {/* Faculty Attendees - Clickable List (Set 4 - Click to Open) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Object.entries(event.facultyAttendance)
                .filter(([, attended]) => attended)
                .map(([facultyId]) => {
                  const faculty = getFacultyById(facultyId);
                  if (!faculty) return null;
                  return (
                    <button
                      key={faculty.id}
                      onClick={() => setSelectedFacultyForPanel(faculty)}
                      className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-purple-50 rounded-xl transition-all duration-200 text-left group border border-transparent hover:border-purple-200"
                    >
                      <img
                        src={faculty.photoUrl}
                        alt={faculty.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm group-hover:border-purple-200 transition-colors"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate group-hover:text-purple-700 transition-colors">
                          {faculty.name}
                        </h4>
                        <p className="text-sm text-gray-500 truncate">{faculty.designation}</p>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  );
                })}
            </div>

            {Object.values(event.facultyAttendance).filter(Boolean).length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No faculty attendance recorded for this event.
              </div>
            )}
          </div>
        )}

        {/* Request Meeting Modal */}
        {selectedFacultyForMeeting && (
          <RequestMeetingModal
            isOpen={meetingModalOpen}
            onClose={() => {
              setMeetingModalOpen(false);
              setSelectedFacultyForMeeting(null);
            }}
            recipientFaculty={selectedFacultyForMeeting}
            senderFaculty={
              // In a real app, this would come from the logged-in faculty's profile
              // Using first faculty member as mock current user
              facultyMembers[0]
            }
            eventTitle={event.title}
          />
        )}

        {/* Faculty Detail Panel - Click to Open (Set 4) */}
        <FacultyDetailPanel
          faculty={selectedFacultyForPanel}
          eventTitle={event.title}
          isOpen={selectedFacultyForPanel !== null}
          onClose={() => setSelectedFacultyForPanel(null)}
          onRequestMeeting={(faculty) => {
            setSelectedFacultyForMeeting(faculty);
            setMeetingModalOpen(true);
          }}
        />
      </div>

      {/* Related Events Section */}
      {relatedEvents.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <SectionHeading
            title="Related Events"
            subtitle="You might also be interested in"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedEvents.map((relatedEvent) => (
              <EventCard key={relatedEvent.id} event={relatedEvent} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetailPage;
