
import { useState } from 'react';
import { useFormspark } from '@formspark/use-formspark';

const FORMSPARK_FORM_ID = import.meta.env.VITE_FORMSPARK_FORM_ID;

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [submit, submitting] = useFormspark({
    formId: FORMSPARK_FORM_ID,
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || submitting || !FORMSPARK_FORM_ID) return;

    setSubmitStatus('idle');

    try {
      await submit({ email });
      setSubmitStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    }
  };

  if (!FORMSPARK_FORM_ID) {
    return <div className="text-red-400 text-sm text-center">Form configuration missing</div>;
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form
        className="flex flex-col sm:flex-row gap-3 w-full"
        onSubmit={handleSubmit}
        id="waitlist-form"
      >
        <div className="relative flex-grow">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email for early access"
            required
            maxLength={500}
            className="w-full px-4 py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 text-white placeholder-gray-400 rounded-full focus:ring-2 focus:ring-purple-400 focus:border-purple-400 focus:outline-none text-sm shadow-sm"
            disabled={submitting}
          />
        </div>
        <button
          type="submit"
          disabled={submitting || !email}
          className="px-6 py-3 bg-white text-gray-900 font-medium rounded-full whitespace-nowrap hover:bg-gray-100 transition-all cursor-pointer disabled:opacity-50 group shadow-sm"
        >
          <span className="flex items-center gap-2">
            <span>{submitting ? 'Joining...' : 'Join Now'}</span>
            <i className="ri-arrow-right-line transition-transform group-hover:translate-x-1"></i>
          </span>
        </button>
      </form>

      {submitStatus === 'success' && (
        <div className="mt-4 p-3 bg-green-900/50 border border-green-600/50 rounded-lg text-green-300 text-sm text-center backdrop-blur-sm">
          Successfully joined the waitlist! We'll notify you when we launch.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mt-4 p-3 bg-red-900/50 border border-red-600/50 rounded-lg text-red-300 text-sm text-center backdrop-blur-sm">
          Something went wrong. Please try again.
        </div>
      )}
    </div>
  );
}
