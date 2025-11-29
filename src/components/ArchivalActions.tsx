/**
 * Archival Actions Component - Set 2
 * 
 * Component with Clean Content, Validate, Generate Summary, and Finalize buttons
 * with mock AI flows for the archiver workflow.
 */

import React, { useState } from 'react';
import type { Event, ArchivalInfo } from '../data/events';

interface ArchivalActionsProps {
  event: Event;
  onUpdateArchival: (archival: ArchivalInfo) => void;
  onFinalize: () => void;
}

type ArchivalStep = 'upload' | 'cleaning' | 'cleaned' | 'validating' | 'validated' | 'generating' | 'generated' | 'finalizing' | 'finalized';

const ArchivalActions: React.FC<ArchivalActionsProps> = ({
  event,
  onUpdateArchival,
  onFinalize,
}) => {
  const [currentStep, setCurrentStep] = useState<ArchivalStep>(() => {
    // Determine initial step based on archival state
    if (event.status === 'archived') return 'finalized';
    if (event.archival?.summary) return 'generated';
    if (event.archival?.validated) return 'validated';
    if (event.archival?.cleaned) return 'cleaned';
    return 'upload';
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMessage, setProcessingMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCleanContent = async () => {
    setIsProcessing(true);
    setCurrentStep('cleaning');
    setProcessingMessage('Cleaning content… please wait');
    
    // Simulate AI processing (2-3 seconds)
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    setProcessingMessage('');
    setIsProcessing(false);
    setCurrentStep('cleaned');
    
    onUpdateArchival({
      ...event.archival,
      cleaned: true,
    });
    
    showNotification('Cleanup complete. Please review the content.');
  };

  const handleValidateContent = async () => {
    setIsProcessing(true);
    setCurrentStep('validating');
    setProcessingMessage('Validating content…');
    
    // Simulate validation (1-2 seconds)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setProcessingMessage('');
    setIsProcessing(false);
    setCurrentStep('validated');
    
    onUpdateArchival({
      ...event.archival,
      cleaned: true,
      validated: true,
    });
    
    showNotification('Content validated successfully.');
  };

  const handleGenerateSummary = async () => {
    setIsProcessing(true);
    setCurrentStep('generating');
    setProcessingMessage('Generating AI summary… please wait');
    
    // Simulate AI summary generation (3 seconds)
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate mock summary
    const mediaCount = (event.mediaLinks?.photos?.length || 0) + (event.mediaLinks?.videos?.length || 0);
    const summary = `${event.title} was a successful ${event.type.toLowerCase()} organized by ${event.club}. The event took place at ${event.venue || 'the campus'} and featured various engaging activities. A total of ${mediaCount} media items were captured during the event. Participants had an enriching experience with valuable takeaways and memorable moments. The event showcased the vibrant culture and spirit of our college community.`;
    
    setProcessingMessage('');
    setIsProcessing(false);
    setCurrentStep('generated');
    
    onUpdateArchival({
      ...event.archival,
      cleaned: true,
      validated: true,
      summary: summary,
    });
    
    showNotification('Summary generated successfully.');
  };

  const handleFinalizeArchive = async () => {
    setIsProcessing(true);
    setCurrentStep('finalizing');
    setProcessingMessage('Finalizing and publishing archive…');
    
    // Simulate finalization (2 seconds)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setProcessingMessage('');
    setIsProcessing(false);
    setCurrentStep('finalized');
    
    onFinalize();
    
    showNotification('Event successfully archived and published.');
  };

  // Check if steps are completed
  const isCleaned = event.archival?.cleaned || currentStep === 'cleaned' || ['validated', 'generated', 'finalized'].includes(currentStep);
  const isValidated = event.archival?.validated || currentStep === 'validated' || ['generated', 'finalized'].includes(currentStep);
  const hasGeneratedSummary = !!event.archival?.summary || currentStep === 'generated' || currentStep === 'finalized';
  const isFinalized = event.status === 'archived' || currentStep === 'finalized';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">{toastMessage}</span>
          </div>
        </div>
      )}

      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
        Archival Workflow
      </h3>

      {/* Processing Overlay */}
      {isProcessing && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent"></div>
            <span className="text-blue-700 font-medium">{processingMessage}</span>
          </div>
        </div>
      )}

      {/* Workflow Steps */}
      <div className="space-y-4">
        {/* Step 1: Clean Content */}
        <div className={`p-4 rounded-lg border ${isCleaned ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isCleaned ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                {isCleaned ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-sm font-bold">1</span>
                )}
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Clean Content (AI)</h4>
                <p className="text-sm text-gray-500">Remove inappropriate or duplicate content</p>
              </div>
            </div>
            {!isCleaned && !isProcessing && (
              <button
                onClick={handleCleanContent}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clean Content
              </button>
            )}
            {isCleaned && (
              <span className="text-green-600 text-sm font-medium">Completed</span>
            )}
          </div>
        </div>

        {/* Step 2: Validate Content */}
        <div className={`p-4 rounded-lg border ${isValidated ? 'bg-green-50 border-green-200' : isCleaned ? 'bg-gray-50 border-gray-200' : 'bg-gray-100 border-gray-200 opacity-50'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isValidated ? 'bg-green-500 text-white' : isCleaned ? 'bg-gray-300 text-gray-600' : 'bg-gray-200 text-gray-400'}`}>
                {isValidated ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-sm font-bold">2</span>
                )}
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Validate Content</h4>
                <p className="text-sm text-gray-500">Review and approve cleaned content</p>
              </div>
            </div>
            {isCleaned && !isValidated && !isProcessing && (
              <button
                onClick={handleValidateContent}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Validate Content
              </button>
            )}
            {isValidated && (
              <span className="text-green-600 text-sm font-medium">Completed</span>
            )}
          </div>
        </div>

        {/* Step 3: Generate Summary */}
        <div className={`p-4 rounded-lg border ${hasGeneratedSummary ? 'bg-green-50 border-green-200' : isValidated ? 'bg-gray-50 border-gray-200' : 'bg-gray-100 border-gray-200 opacity-50'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${hasGeneratedSummary ? 'bg-green-500 text-white' : isValidated ? 'bg-gray-300 text-gray-600' : 'bg-gray-200 text-gray-400'}`}>
                {hasGeneratedSummary ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-sm font-bold">3</span>
                )}
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Generate Summary (AI)</h4>
                <p className="text-sm text-gray-500">Create an AI-powered event summary</p>
              </div>
            </div>
            {isValidated && !hasGeneratedSummary && !isProcessing && (
              <button
                onClick={handleGenerateSummary}
                className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
              >
                Generate Summary (AI)
              </button>
            )}
            {hasGeneratedSummary && (
              <span className="text-green-600 text-sm font-medium">Completed</span>
            )}
          </div>
          
          {/* Show generated summary */}
          {event.archival?.summary && (
            <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
              <h5 className="text-xs font-medium text-gray-500 uppercase mb-2">Generated Summary</h5>
              <p className="text-sm text-gray-700">{event.archival.summary}</p>
            </div>
          )}
        </div>

        {/* Step 4: Finalize & Publish */}
        <div className={`p-4 rounded-lg border ${isFinalized ? 'bg-green-50 border-green-200' : hasGeneratedSummary ? 'bg-gray-50 border-gray-200' : 'bg-gray-100 border-gray-200 opacity-50'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isFinalized ? 'bg-green-500 text-white' : hasGeneratedSummary ? 'bg-gray-300 text-gray-600' : 'bg-gray-200 text-gray-400'}`}>
                {isFinalized ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-sm font-bold">4</span>
                )}
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Finalize & Publish Archive</h4>
                <p className="text-sm text-gray-500">Make archive publicly visible</p>
              </div>
            </div>
            {hasGeneratedSummary && !isFinalized && !isProcessing && (
              <button
                onClick={handleFinalizeArchive}
                className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                Finalize & Publish
              </button>
            )}
            {isFinalized && (
              <span className="text-green-600 text-sm font-medium">Archived</span>
            )}
          </div>
        </div>
      </div>

      {/* Final Status Banner */}
      {isFinalized && (
        <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-green-800">Event Successfully Archived</h4>
              <p className="text-sm text-green-700">This event is now publicly visible in the archived events section.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArchivalActions;
