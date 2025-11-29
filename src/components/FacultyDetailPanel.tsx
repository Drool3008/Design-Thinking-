/**
 * FacultyDetailPanel Component
 * Set 4: Click-to-open persistent panel showing faculty details.
 * 
 * Features:
 * - Opens on click (not hover) for better UX
 * - Stays open until manually closed
 * - Side panel/modal style with faculty details
 * - Displays name, department, lab, interests, links
 * - Option to generate Outlook meeting draft
 */

import React from 'react';
import type { Faculty } from '../data/faculty';

interface FacultyDetailPanelProps {
  faculty: Faculty | null;
  eventTitle?: string;
  isOpen: boolean;
  onClose: () => void;
  onRequestMeeting?: (faculty: Faculty) => void;
}

const FacultyDetailPanel: React.FC<FacultyDetailPanelProps> = ({
  faculty,
  eventTitle,
  isOpen,
  onClose,
  onRequestMeeting,
}) => {
  if (!isOpen || !faculty) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Side Panel */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 overflow-y-auto animate-in slide-in-from-right duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
          aria-label="Close panel"
        >
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8">
          <div className="flex flex-col items-center text-center">
            {faculty.photoUrl ? (
              <img 
                src={faculty.photoUrl} 
                alt={faculty.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg mb-4"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center border-4 border-white shadow-lg mb-4">
                <span className="text-3xl font-bold text-white">
                  {faculty.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            )}
            <h2 className="text-xl font-bold text-white">{faculty.name}</h2>
            <p className="text-indigo-100 mt-1">{faculty.designation}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Department & Lab */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Department</p>
                <p className="text-gray-900 font-medium">{faculty.department}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Lab / Research Group</p>
                <p className="text-gray-900 font-medium">{faculty.lab}</p>
              </div>
            </div>
          </div>

          {/* Research Interests */}
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Research Interests</p>
            <div className="flex flex-wrap gap-2">
              {faculty.interests.map((interest, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 text-sm rounded-full border border-indigo-100"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Links Section */}
          <div className="space-y-3">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Connect</p>
            
            {faculty.email && (
              <a 
                href={`mailto:${faculty.email}`}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
              >
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:shadow">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <p className="text-xs text-gray-500">{faculty.email}</p>
                </div>
              </a>
            )}

            {faculty.linkedinUrl && (
              <a 
                href={faculty.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors group"
              >
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:shadow">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">LinkedIn Profile</p>
                  <p className="text-xs text-gray-500">View professional profile</p>
                </div>
              </a>
            )}

            {faculty.homepageUrl && (
              <a 
                href={faculty.homepageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors group"
              >
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:shadow">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Personal Homepage</p>
                  <p className="text-xs text-gray-500">View academic webpage</p>
                </div>
              </a>
            )}
          </div>

          {/* Request Meeting Button */}
          {onRequestMeeting && (
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={() => onRequestMeeting(faculty)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Generate Outlook Meeting Draft
              </button>
              <p className="text-xs text-gray-500 text-center mt-2">
                {eventTitle 
                  ? `Discuss "${eventTitle}" with ${faculty.name.split(' ')[0]}`
                  : 'Opens a pre-filled meeting request template'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FacultyDetailPanel;
