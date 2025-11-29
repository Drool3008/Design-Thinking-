/**
 * EventContext - Shared Event State Management
 * 
 * This context provides global event state that persists across all components.
 * When Event Group publishes an event, it reflects on the Landing Page and other dashboards.
 * 
 * Note: In a real app, this would be replaced with API calls and server-side state.
 */

import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { initialEvents as mockEvents, type Event, type EventStatus, type EventGroupMedia, type FacultyAttendance, type ArchivalInfo } from '../data/events';

interface EventContextType {
  events: Event[];
  // Event Group actions
  addEvent: (event: Event) => void;
  updateEvent: (eventId: string, updates: Partial<Event>) => void;
  deleteEvent: (eventId: string) => void;
  publishEvent: (eventId: string) => void;
  endEvent: (eventId: string) => void;
  // Set 3: Content and attendance
  updateEventMedia: (eventId: string, media: EventGroupMedia) => void;
  updateFacultyAttendance: (eventId: string, attendance: FacultyAttendance) => void;
  // Archiver actions
  updateArchivalInfo: (eventId: string, archival: Partial<ArchivalInfo>) => void;
  archiveEvent: (eventId: string) => void;
  // Getters
  getEventById: (eventId: string) => Event | undefined;
  getEventsByStatus: (status: EventStatus) => Event[];
  getEventsByEventGroup: (eventGroupId: string) => Event[];
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>(mockEvents);

  // Add a new event
  const addEvent = useCallback((event: Event) => {
    setEvents(prev => [...prev, event]);
  }, []);

  // Update an existing event
  const updateEvent = useCallback((eventId: string, updates: Partial<Event>) => {
    setEvents(prev => prev.map(e => 
      e.id === eventId 
        ? { ...e, ...updates, lastUpdated: new Date().toISOString().split('T')[0] }
        : e
    ));
  }, []);

  // Delete an event
  const deleteEvent = useCallback((eventId: string) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
  }, []);

  // Publish a draft event (draft -> upcoming)
  const publishEvent = useCallback((eventId: string) => {
    setEvents(prev => prev.map(e => 
      e.id === eventId && e.status === 'draft'
        ? { 
            ...e, 
            status: 'upcoming' as EventStatus,
            registrationUrl: `https://events.college.edu/register/${eventId}`,
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        : e
    ));
  }, []);

  // End an event (upcoming -> ended)
  const endEvent = useCallback((eventId: string) => {
    // Calculate upload window expiration (7 days from now)
    const uploadWindowExpiry = new Date();
    uploadWindowExpiry.setDate(uploadWindowExpiry.getDate() + 7);
    
    setEvents(prev => prev.map(e => 
      e.id === eventId && e.status === 'upcoming'
        ? { 
            ...e, 
            status: 'ended' as EventStatus,
            archival: {
              uploadWindowExpiresAt: uploadWindowExpiry.toISOString(),
              isUploadWindowExpired: false,
              cleaned: false,
              validated: false,
            },
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        : e
    ));
  }, []);

  // Update event media (Set 3)
  const updateEventMedia = useCallback((eventId: string, media: EventGroupMedia) => {
    setEvents(prev => prev.map(e => 
      e.id === eventId
        ? { 
            ...e, 
            mediaLinks: {
              ...e.mediaLinks,
              photos: e.mediaLinks?.photos || [],
              videos: e.mediaLinks?.videos || [],
              eventGroup: media,
            },
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        : e
    ));
  }, []);

  // Update faculty attendance (Set 3)
  const updateFacultyAttendance = useCallback((eventId: string, attendance: FacultyAttendance) => {
    setEvents(prev => prev.map(e => 
      e.id === eventId
        ? { 
            ...e, 
            facultyAttendance: attendance,
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        : e
    ));
  }, []);

  // Update archival info (Set 2)
  const updateArchivalInfo = useCallback((eventId: string, archival: Partial<ArchivalInfo>) => {
    setEvents(prev => prev.map(e => 
      e.id === eventId
        ? { 
            ...e, 
            archival: { ...e.archival, ...archival },
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        : e
    ));
  }, []);

  // Archive an event (ended -> archived)
  const archiveEvent = useCallback((eventId: string) => {
    setEvents(prev => prev.map(e => 
      e.id === eventId && e.status === 'ended'
        ? { 
            ...e, 
            status: 'archived' as EventStatus,
            archival: {
              ...e.archival,
              finalizedAt: new Date().toISOString(),
            },
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        : e
    ));
  }, []);

  // Get event by ID
  const getEventById = useCallback((eventId: string) => {
    return events.find(e => e.id === eventId);
  }, [events]);

  // Get events by status
  const getEventsByStatus = useCallback((status: EventStatus) => {
    return events
      .filter(e => e.status === status)
      .sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());
  }, [events]);

  // Get events by event group
  const getEventsByEventGroup = useCallback((eventGroupId: string) => {
    return events.filter(e => e.eventGroupId === eventGroupId);
  }, [events]);

  const value: EventContextType = {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    publishEvent,
    endEvent,
    updateEventMedia,
    updateFacultyAttendance,
    updateArchivalInfo,
    archiveEvent,
    getEventById,
    getEventsByStatus,
    getEventsByEventGroup,
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = (): EventContextType => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};

export default EventContext;
