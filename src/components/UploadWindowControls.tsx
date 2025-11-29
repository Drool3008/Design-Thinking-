/**
 * Upload Window Controls Component - Set 2
 * 
 * Controls for setting upload expiration date/time and showing countdown/expired state.
 */

import React, { useState, useEffect } from 'react';

interface UploadWindowControlsProps {
  expiresAt?: string;  // ISO timestamp
  onSetExpiration: (expiresAt: string) => void;
  disabled?: boolean;
}

const UploadWindowControls: React.FC<UploadWindowControlsProps> = ({
  expiresAt,
  onSetExpiration,
  disabled = false,
}) => {
  const [isExpired, setIsExpired] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [newExpirationDate, setNewExpirationDate] = useState('');
  const [newExpirationTime, setNewExpirationTime] = useState('23:59');

  // Check expiration and calculate countdown
  useEffect(() => {
    if (!expiresAt) {
      setIsExpired(false);
      setTimeRemaining('');
      return;
    }

    const checkExpiration = () => {
      const now = new Date();
      const expDate = new Date(expiresAt);
      
      if (now >= expDate) {
        setIsExpired(true);
        setTimeRemaining('');
      } else {
        setIsExpired(false);
        
        // Calculate time remaining
        const diff = expDate.getTime() - now.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        if (days > 0) {
          setTimeRemaining(`${days}d ${hours}h ${minutes}m remaining`);
        } else if (hours > 0) {
          setTimeRemaining(`${hours}h ${minutes}m remaining`);
        } else {
          setTimeRemaining(`${minutes}m remaining`);
        }
      }
    };

    checkExpiration();
    const interval = setInterval(checkExpiration, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [expiresAt]);

  const handleSetExpiration = () => {
    if (newExpirationDate) {
      const dateTime = `${newExpirationDate}T${newExpirationTime}:00`;
      onSetExpiration(dateTime);
    }
  };

  const formatExpirationDate = (isoString: string) => {
    const date = new Date(isoString);
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Upload Window
      </h3>

      {/* Current Status */}
      {expiresAt ? (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Window Status:</span>
            {isExpired ? (
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-red-100 text-red-700">
                Expired
              </span>
            ) : (
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-700">
                Active
              </span>
            )}
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Expires:</span>
              <span className="font-medium text-gray-900">{formatExpirationDate(expiresAt)}</span>
            </div>
            {timeRemaining && (
              <div className="mt-2 text-center">
                <span className="text-lg font-semibold text-amber-600">{timeRemaining}</span>
              </div>
            )}
          </div>

          {isExpired && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-sm font-medium">Upload window has expired.</span>
              </div>
              <p className="mt-1 text-xs text-red-600">
                No new media can be added. Extend the window to allow uploads.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-center gap-2 text-amber-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium">No upload window set</span>
          </div>
          <p className="mt-1 text-xs text-amber-600">
            Set an expiration date to control when media uploads are allowed.
          </p>
        </div>
      )}

      {/* Set/Extend Expiration */}
      {!disabled && (
        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            {expiresAt ? 'Extend Upload Window' : 'Set Upload Window'}
          </h4>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1">Date</label>
              <input
                type="date"
                value={newExpirationDate}
                onChange={(e) => setNewExpirationDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-full sm:w-32">
              <label className="block text-xs text-gray-500 mb-1">Time</label>
              <input
                type="time"
                value={newExpirationTime}
                onChange={(e) => setNewExpirationTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleSetExpiration}
                disabled={!newExpirationDate}
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {expiresAt ? 'Extend' : 'Set'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadWindowControls;
