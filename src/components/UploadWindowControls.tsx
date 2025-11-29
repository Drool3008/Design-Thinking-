/**
 * Upload Window Controls Component - Set 2 + Set 4
 * 
 * Controls for setting upload expiration date/time and showing countdown/expired state.
 * Set 4 additions: Default 7-day button, "Close Now" functionality, enhanced countdown.
 */

import React, { useState, useEffect } from 'react';

interface UploadWindowControlsProps {
  expiresAt?: string;  // ISO timestamp
  onSetExpiration: (expiresAt: string) => void;
  onCloseNow?: () => void;  // Set 4: Immediate close functionality
  disabled?: boolean;
}

const UploadWindowControls: React.FC<UploadWindowControlsProps> = ({
  expiresAt,
  onSetExpiration,
  onCloseNow,
  disabled = false,
}) => {
  const [isExpired, setIsExpired] = useState(false);
  const [detailedTimeRemaining, setDetailedTimeRemaining] = useState<{ days: number; hours: number; minutes: number } | null>(null);
  const [newExpirationDate, setNewExpirationDate] = useState('');
  const [newExpirationTime, setNewExpirationTime] = useState('23:59');
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);

  // Check expiration and calculate countdown
  useEffect(() => {
    if (!expiresAt) {
      setIsExpired(false);
      setDetailedTimeRemaining(null);
      return;
    }

    const checkExpiration = () => {
      const now = new Date();
      const expDate = new Date(expiresAt);
      
      if (now >= expDate) {
        setIsExpired(true);
        setDetailedTimeRemaining(null);
      } else {
        setIsExpired(false);
        
        // Calculate time remaining
        const diff = expDate.getTime() - now.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        setDetailedTimeRemaining({ days, hours, minutes });
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

  // Set 4: Default 7-day window
  const handleSetDefault7Days = () => {
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
    sevenDaysFromNow.setHours(23, 59, 59, 0);
    onSetExpiration(sevenDaysFromNow.toISOString());
  };

  // Set 4: Close window immediately
  const handleCloseNow = () => {
    if (onCloseNow) {
      onCloseNow();
    } else {
      // Set expiration to now (immediately expires)
      onSetExpiration(new Date().toISOString());
    }
    setShowCloseConfirm(false);
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
                Closed
              </span>
            ) : (
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-700">
                Active
              </span>
            )}
          </div>
          
          {/* Set 4: Enhanced Countdown Display */}
          {!isExpired && detailedTimeRemaining && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200 mb-3">
              <div className="text-center mb-2">
                <span className="text-xs font-medium text-amber-600 uppercase tracking-wider">Time Remaining</span>
              </div>
              <div className="flex justify-center items-center gap-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-700">{detailedTimeRemaining.days}</div>
                  <div className="text-xs text-amber-600">Days</div>
                </div>
                <div className="text-2xl text-amber-400 font-light">:</div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-700">{detailedTimeRemaining.hours}</div>
                  <div className="text-xs text-amber-600">Hours</div>
                </div>
                <div className="text-2xl text-amber-400 font-light">:</div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-700">{detailedTimeRemaining.minutes}</div>
                  <div className="text-xs text-amber-600">Minutes</div>
                </div>
              </div>
            </div>
          )}
          
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">{isExpired ? 'Closed on:' : 'Closes on:'}</span>
              <span className="font-medium text-gray-900">{formatExpirationDate(expiresAt)}</span>
            </div>
          </div>

          {/* Set 4: Close Now Button with Confirmation */}
          {!isExpired && !disabled && (
            <div className="mt-3">
              {showCloseConfirm ? (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700 mb-3">
                    Are you sure you want to close the upload window now? No more media can be added after this.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCloseNow}
                      className="flex-1 px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Yes, Close Now
                    </button>
                    <button
                      onClick={() => setShowCloseConfirm(false)}
                      className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowCloseConfirm(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-lg border border-red-200 hover:bg-red-100 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Close Window Now
                </button>
              )}
            </div>
          )}

          {isExpired && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-sm font-medium">Upload window is closed.</span>
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
          
          {/* Set 4: Quick Actions - Default 7 Days */}
          {!expiresAt && (
            <div className="mb-4">
              <button
                onClick={handleSetDefault7Days}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-sm hover:shadow-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Open for 7 Days (Default)
              </button>
              <p className="text-xs text-gray-500 text-center mt-2">
                Recommended default window period
              </p>
            </div>
          )}
          
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-400 uppercase">or custom date</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          
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
