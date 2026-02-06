
import { useState, useEffect } from 'react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target date to 30 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mb-8">
      <h2 className="text-lg font-medium text-gray-300 mb-4 text-center">
        Launch countdown
      </h2>
      <div className="flex justify-center gap-4 mb-6">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Minutes', value: timeLeft.minutes },
          { label: 'Seconds', value: timeLeft.seconds }
        ].map((item, index) => (
          <div key={index} className="text-center">
            <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-600/30 rounded-lg p-3 min-w-[60px] shadow-sm">
              <div className="text-2xl font-bold text-white">
                {item.value.toString().padStart(2, '0')}
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-1 uppercase tracking-wide">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}