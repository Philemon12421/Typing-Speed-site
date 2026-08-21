import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, User, MessageSquare, Building, MapPin, Clock, X, AlertCircle } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Feedback');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    // Simulate reliable form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset fields after a delay
      setTimeout(() => {
        setName('');
        setEmail('');
        setMessage('');
      }, 1000);
    }, 600);
  };

  return (
    <div 
      id="contact-us-modal"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200 font-sans animate-in zoom-in-95 duration-200 text-slate-800">
        
        {/* Header with Close */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/10 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">Contact Typerca Team</h2>
              <p className="text-xs text-slate-500 font-medium">We respond to inquiries, suggestions, and bug reports within 24–48 hours</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center flex flex-col items-center gap-4 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Message Received!</h3>
            <p className="text-sm text-slate-600 max-w-md leading-relaxed">
              Thank you for reaching out to Typerca. Your inquiry has been logged, and our engineering team at Drenchack Tech Company will review it promptly.
            </p>
            <button
              type="button"
              onClick={() => {
                setIsSuccess(false);
                onClose();
              }}
              className="mt-2 px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md shadow-indigo-200 transition-all"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Contact Information Column */}
            <div className="md:col-span-2 space-y-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <h4 className="font-extrabold text-slate-900 text-sm">Official Entity Details</h4>
              
              <div className="space-y-3 text-slate-600">
                <div className="flex items-start gap-2.5">
                  <Building className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-800">Drenchack Tech Company</strong>
                    <span>Software & Web Benchmarks</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <User className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-800">Founder & Engineer</strong>
                    <span>Philemon Osei Kusi</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-800">Direct Email</strong>
                    <a href="mailto:philemonkusi292@gmail.com" className="text-indigo-600 hover:underline font-mono text-[11px]">
                      philemonkusi292@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-800">Response Window</strong>
                    <span>Mon – Sat (08:00 – 18:00 UTC)</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-[11px] text-indigo-900 font-medium leading-relaxed">
                💬 Open to feedback, typing speed feature suggestions, and educational institution licensing inquiries.
              </div>
            </div>

            {/* Contact Form Column */}
            <form onSubmit={handleSubmit} className="md:col-span-3 space-y-3.5">
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Johnson"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Topic / Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                >
                  <option value="General Feedback">General Feedback</option>
                  <option value="Feature Suggestion">Feature Suggestion</option>
                  <option value="Bug Report">Bug Report</option>
                  <option value="AdSense & Partnership Inquiry">AdSense & Business Partnership</option>
                  <option value="Typing Certificate Question">Typing Certificate Question</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can we help you improve your touch typing speed experience?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-md shadow-indigo-200 flex items-center gap-1.5 transition-all disabled:opacity-50 active:scale-95"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
