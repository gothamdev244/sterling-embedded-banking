import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Check, Loader2, AlertCircle, ChevronRight, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const ActionButton = ({ 
  label, 
  onClick, 
  variant = 'default',
  icon: Icon,
  requiresConfirmation = false,
  confirmationMessage = 'Are you sure you want to perform this action?',
  disabled = false,
  className = '',
  size = 'default',
  showSuccessMessage = true,
  successMessage = 'Action completed successfully'
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleClick = async () => {
    if (requiresConfirmation && !showConfirmation) {
      setShowConfirmation(true);
      return;
    }

    setIsLoading(true);
    setIsError(false);
    setFeedbackMessage('');
    
    try {
      const result = await onClick();
      setIsSuccess(true);
      setShowConfirmation(false);
      
      if (showSuccessMessage) {
        setFeedbackMessage(successMessage);
      }
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setFeedbackMessage('');
      }, 3000);
    } catch (error) {
      setIsError(true);
      setFeedbackMessage(error.message || 'Action failed. Please try again.');
      console.error('Action failed:', error);
      
      // Reset error state after 4 seconds
      setTimeout(() => {
        setIsError(false);
        setFeedbackMessage('');
      }, 4000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  if (showConfirmation) {
    return (
      <div className="relative animate-in slide-in-from-top-2 duration-200">
        <div className="flex flex-col gap-3 p-4 bg-amber-50 border-2 border-amber-200 rounded-lg shadow-sm">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-amber-900">Confirmation Required</p>
              <p className="text-sm text-amber-700 mt-1">{confirmationMessage}</p>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
              className="min-w-[80px]"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={handleClick}
              disabled={isLoading}
              className="min-w-[100px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Confirm
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const getButtonVariant = () => {
    if (isSuccess) return 'default';
    if (isError) return 'destructive';
    return variant;
  };

  const getButtonClassName = () => {
    let classes = className;
    if (isSuccess) classes += ' bg-green-600 hover:bg-green-700 text-white border-green-600';
    if (isError) classes += ' animate-shake';
    if (isLoading) classes += ' cursor-wait';
    return classes;
  };

  return (
    <div className="relative">
      <Button
        variant={getButtonVariant()}
        size={size}
        onClick={handleClick}
        disabled={disabled || isLoading}
        className={`transition-all duration-200 ${getButtonClassName()}`}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            <span className="animate-pulse">Processing...</span>
          </>
        ) : isSuccess ? (
          <>
            <CheckCircle className="h-4 w-4 mr-2 animate-in zoom-in-50 duration-200" />
            <span>Success</span>
          </>
        ) : isError ? (
          <>
            <XCircle className="h-4 w-4 mr-2" />
            <span>Retry</span>
          </>
        ) : (
          <>
            {Icon && <Icon className="h-4 w-4 mr-2" />}
            <span>{label}</span>
            {!disabled && <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />}
          </>
        )}
      </Button>
      
      {/* Feedback Message Tooltip */}
      {feedbackMessage && (
        <div className={`absolute top-full mt-2 left-0 right-0 z-10 animate-in fade-in slide-in-from-top-1 duration-200`}>
          <div className={`px-3 py-2 rounded-md text-xs font-medium shadow-lg ${
            isSuccess ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
          }`}>
            <div className="flex items-center gap-1">
              {isSuccess ? (
                <CheckCircle className="h-3 w-3" />
              ) : (
                <AlertCircle className="h-3 w-3" />
              )}
              <span>{feedbackMessage}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionButton;
