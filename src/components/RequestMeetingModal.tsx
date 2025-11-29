/**
 * RequestMeetingModal Component
 * Set 3: Mock Outlook meeting request draft creation.
 * 
 * Features:
 * - Pre-filled subject with event title
 * - Pre-filled body mentioning the event and requesting discussion
 * - Editable fields before "sending" (mock)
 * - Clean modal UI with Outlook-inspired styling
 */

import React, { useState, useEffect } from 'react';
import type { Faculty } from '../data/faculty';

interface RequestMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientFaculty: Faculty;
  senderFaculty: Faculty;
  eventTitle: string;
}

const RequestMeetingModal: React.FC<RequestMeetingModalProps> = ({
  isOpen,
  onClose,
  recipientFaculty,
  senderFaculty,
  eventTitle,
}) => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isSent, setIsSent] = useState(false);

  // Initialize email content when modal opens
  useEffect(() => {
    if (isOpen) {
      setSubject(`Discussion Request Regarding ${eventTitle}`);
      setBody(`Hello ${recipientFaculty.name},

I missed the "${eventTitle}" event, but I noticed you attended. I would appreciate a short discussion about your insights on the event.

Let me know your preferred time.

Regards,
${senderFaculty.name}
${senderFaculty.department}`);
      setIsSent(false);
    }
  }, [isOpen, recipientFaculty, senderFaculty, eventTitle]);

  const handleSendDraft = () => {
    // Mock sending - in real app would integrate with Outlook API
    setIsSent(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl transform transition-all">
          {/* Header - Outlook-inspired */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-xl">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.5 4.5H1.5c-.8 0-1.5.7-1.5 1.5v12c0 .8.7 1.5 1.5 1.5h21c.8 0 1.5-.7 1.5-1.5V6c0-.8-.7-1.5-1.5-1.5zm-1.1 2.3l-8.9 5.7c-.3.2-.7.2-1 0l-8.9-5.7c-.3-.2-.3-.6 0-.8l.3-.2 9.1 5.9 9.1-5.9.3.2c.3.2.3.6 0 .8z"/>
              </svg>
              <h2 className="text-lg font-semibold text-white">New Meeting Request</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Success State */}
          {isSent ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Draft Created!</h3>
              <p className="text-gray-600">
                Your meeting request draft has been created in Outlook.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                (This is a mock - no actual email was sent)
              </p>
            </div>
          ) : (
            <>
              {/* Email Form */}
              <div className="p-6 space-y-4">
                {/* From */}
                <div className="flex items-center gap-3">
                  <label className="w-16 text-sm font-medium text-gray-500">From:</label>
                  <div className="flex items-center gap-2 flex-1">
                    {senderFaculty.photoUrl && (
                      <img 
                        src={senderFaculty.photoUrl} 
                        alt={senderFaculty.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    )}
                    <span className="text-sm text-gray-700">{senderFaculty.name}</span>
                    <span className="text-sm text-gray-400">&lt;{senderFaculty.email}&gt;</span>
                  </div>
                </div>

                {/* To */}
                <div className="flex items-center gap-3">
                  <label className="w-16 text-sm font-medium text-gray-500">To:</label>
                  <div className="flex items-center gap-2 flex-1 bg-gray-50 px-3 py-2 rounded-lg">
                    {recipientFaculty.photoUrl && (
                      <img 
                        src={recipientFaculty.photoUrl} 
                        alt={recipientFaculty.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    )}
                    <span className="text-sm text-gray-700">{recipientFaculty.name}</span>
                    <span className="text-sm text-gray-400">&lt;{recipientFaculty.email}&gt;</span>
                  </div>
                </div>

                {/* Subject */}
                <div className="flex items-center gap-3">
                  <label className="w-16 text-sm font-medium text-gray-500">Subject:</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Body */}
                <div className="mt-4">
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={10}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Compose your message..."
                  />
                </div>

                {/* Meeting Options (Mock) */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Meeting Options
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <label className="text-gray-500 text-xs">Suggested Duration</label>
                      <select className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
                        <option>30 minutes</option>
                        <option>45 minutes</option>
                        <option>1 hour</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-gray-500 text-xs">Meeting Type</label>
                      <select className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
                        <option>In-person</option>
                        <option>Microsoft Teams</option>
                        <option>Phone Call</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                <p className="text-xs text-gray-500">
                  This will create a draft in your Outlook (Mock)
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Discard
                  </button>
                  <button
                    onClick={handleSendDraft}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Generate Outlook Draft (Mock)
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestMeetingModal;
