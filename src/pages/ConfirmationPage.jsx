import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Sparkles, AlertCircle, Edit2, LayoutDashboard } from 'lucide-react';
import Button from '../components/ui/Button';

const ConfirmationPage = ({ onBackToProfile, registrationData, profileData, onConfirm, isGoogleUser }) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const { email, college } = registrationData;
  const { displayName, username, selectedAvatar } = profileData;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!acceptedTerms) return;
    onConfirm();
  };

  return (
    <div className="min-h-screen bg-bg-dark text-on-surface font-body flex flex-col items-center justify-center py-12 px-6 select-none">
      
      {/* Back Button (Returns to Step 2) */}
      <button 
        onClick={onBackToProfile}
        className="fixed top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-xs font-semibold text-on-surface-variant hover:text-accent-yellow transition-colors cursor-pointer group z-50 bg-surface-dark/60 border border-white/10 px-4 py-2 rounded-full shadow-lg"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
        <span>Back to Profile Setup</span>
      </button>

      {/* Main Glassmorphic Card */}
      <div className="w-full max-w-md bg-surface-dark border border-white/10 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.65)] hover:shadow-[0_25px_60px_rgba(255,186,9,0.15)] transition-all duration-500 overflow-hidden animate-fade-in">
        <div className="p-8 md:p-10 space-y-8 text-center">
          
          {/* Header */}
          <div className="space-y-2 text-center">
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-on-surface tracking-tight pt-2">
              Confirm Identity
            </h1>
            <p className="text-xs text-on-surface-variant/80 leading-relaxed max-w-xs mx-auto">
              Please verify your credentials. Click "Edit Profile" below if you need to adjust your username or display name.
            </p>
          </div>

          {/* Premium Profile ID Pass Preview */}
          <div className="relative border border-white/10 bg-bg-dark/60 rounded-2xl p-6 text-left space-y-4 overflow-hidden shadow-inner">
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent-yellow/5 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="flex items-center gap-4">
              {selectedAvatar && selectedAvatar.custom ? (
                <img 
                  src={selectedAvatar.url} 
                  alt="Custom Avatar" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-accent-yellow shadow-md"
                />
              ) : (
                <div className={`w-16 h-16 rounded-full bg-gradient-to-tr ${selectedAvatar ? selectedAvatar.grad : 'from-indigo-500 to-purple-500'} flex items-center justify-center text-3xl shadow-md border border-white/10`}>
                  <span>{selectedAvatar ? selectedAvatar.symbol : '👤'}</span>
                </div>
              )}

              <div className="space-y-0.5">
                <p className="text-base font-bold text-on-surface">{displayName || 'Student'}</p>
                <p className="text-xs text-accent-yellow/90 font-mono font-medium">@{username || 'username'}</p>
                {!isGoogleUser && college && (
                  <p className="text-[9px] text-on-surface-variant/50 font-medium italic">{college}</p>
                )}
              </div>
            </div>

            
          </div>

          {/* Form wrapper for Checkbox & Submit Actions */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Agreement Terms */}
            <div className="flex items-start gap-3 text-left">
              <input
                type="checkbox"
                id="terms-checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1 w-4.5 h-4.5 rounded-lg border-white/10 bg-bg-dark text-accent-yellow focus:ring-accent-yellow/20 accent-accent-yellow cursor-pointer"
                required
              />
              <label htmlFor="terms-checkbox" className="text-xs text-on-surface-variant/80 select-none cursor-pointer leading-relaxed">
                I agree to the <a href="#/privacy" target="_blank" rel="noopener noreferrer" className="text-accent-yellow hover:underline font-semibold">Privacy Policy</a> and <a href="#/terms" target="_blank" rel="noopener noreferrer" className="text-accent-yellow hover:underline font-semibold">Terms of Use</a>.
              </label>
            </div>

            {/* Buttons Row */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {/* Edit Details Button */}
              <Button
                type="button"
                onClick={onBackToProfile}
                variant="glass"
                className="flex-1 py-4 text-xs font-bold font-heading tracking-wider uppercase border-white/10 hover:bg-white/5 flex items-center justify-center gap-2"
              >
                <Edit2 size={13} />
                <span>Edit Profile</span>
              </Button>

              {/* Continue to Dashboard Button */}
              <Button
                type="submit"
                variant="primary"
                disabled={!acceptedTerms}
                className="flex-1 py-4 text-xs font-bold font-heading tracking-wider uppercase hover:shadow-[0_0_35px_rgba(255,186,9,0.3)] transition-all flex items-center justify-center gap-2"
              >
                
                <span>Let's Baithak</span>
              </Button>
            </div>

          </form>

        </div>
      </div>

    </div>
  );
};

export default ConfirmationPage;
