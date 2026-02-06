
import { useState } from 'react';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || isSubmitting) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formData = new URLSearchParams();
      formData.append('email', email);

      const response = await fetch('https://readdy.ai/api/form/d3dp66hdmjgov1a310ag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setEmail('');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form 
        data-readdy-form="true" 
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
            disabled={isSubmitting}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting || !email}
          className="px-6 py-3 bg-white text-gray-900 font-medium rounded-full whitespace-nowrap hover:bg-gray-100 transition-all cursor-pointer disabled:opacity-50 group shadow-sm"
        >
          <span className="flex items-center gap-2">
            <span>{isSubmitting ? 'Joining...' : 'Join Now'}</span>
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