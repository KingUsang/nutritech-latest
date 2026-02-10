'use client';

import { useRef, useEffect, useState } from 'react';

const testimonials = [
  {
    initial: 'T',
    name: 'Tolu A.',
    school: 'Computer Science, UI',
    gradient: 'from-orange-400 to-red-500',
    quote: "I was eating indomie every night and failing my coding labs. Nutri-Tech's plan to add eggs and cheap vegetables changed my energy levels completely.",
    before: 'Sleepy 😴',
    after: 'Focus Mode ⚡',
    beforeLabel: 'BEFORE',
    afterLabel: 'AFTER',
    borderColor: 'orange',
  },
  {
    initial: 'C',
    name: 'Chidinma O.',
    school: 'Law, UNILAG',
    gradient: 'from-green-400 to-emerald-600',
    quote: 'I thought healthy eating was expensive. This app showed me how to use "Ugwu" and Fish to boost iron for cheap. No more afternoon headaches.',
    before: 'Low ❌',
    after: 'Optimal ✅',
    beforeLabel: 'IRON',
    afterLabel: 'IRON',
    borderColor: 'green',
  },
  {
    initial: 'Y',
    name: 'Yusuf B.',
    school: 'Engineering, ABU',
    gradient: 'from-blue-400 to-cyan-600',
    quote: 'The shopping list feature is a lifesaver. I spend 15 mins in the market and get everything for the week. ₦1,000/day is actually possible.',
    before: '₦15k',
    after: '₦7k',
    beforeLabel: 'WEEKLY COST',
    afterLabel: 'ACTUAL SPEND',
    strikethrough: true,
    borderColor: 'orange',
  },
  {
    initial: 'B',
    name: 'Bolanle S.',
    school: 'Mass Comm, OAU',
    gradient: 'from-purple-400 to-pink-600',
    quote: "My skin is clearing up and I haven't fallen sick during exams once. It's crazy how much diet actually matters.",
    before: 'Frequent Flu',
    after: 'Strong 💪',
    beforeLabel: 'HEALTH',
    afterLabel: 'HEALTH',
    borderColor: 'green',
  },
];

/**
 * Testimonials section with auto-scrolling cards
 */
export default function TestimonialsSection() {
  const trackRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const interval = setInterval(() => {
      if (!isHovering) {
        const maxScroll = track.scrollWidth - track.clientWidth;
        if (track.scrollLeft >= maxScroll - 50) {
          track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          const cardWidth = track.querySelector('.testimonial-card')?.offsetWidth || 400;
          track.scrollBy({ left: cardWidth + 40, behavior: 'smooth' });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <section id="reviews" className="py-24 relative overflow-hidden bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 mb-12 flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold mb-2">Student Stories</h2>
          <p className="text-gray-400">Real results from the pilot at UI & UNILAG.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Swipe to explore</span>
          <span className="animate-bounce">→</span>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-16 px-4 md:px-[30vw] gap-6 md:gap-10 cursor-grab active:cursor-grabbing items-center h-[500px]"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onTouchStart={() => setIsHovering(true)}
        onTouchEnd={() => setTimeout(() => setIsHovering(false), 2000)}
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="snap-center shrink-0 w-[85vw] md:w-[400px] testimonial-card"
          >
            <div className={`glass h-full p-8 rounded-3xl border-b-4 ${
              testimonial.borderColor === 'green' ? 'border-tech-primary' : 'border-orange-500'
            } relative group flex flex-col justify-between`}>
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center font-bold text-lg ${
                    testimonial.gradient.includes('green') ? 'text-navy-900' : ''
                  }`}>
                    {testimonial.initial}
                  </div>
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-xs text-gray-400">{testimonial.school}</div>
                  </div>
                </div>
                <p className="text-lg text-gray-300 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-white/5 flex gap-4">
                <div className="text-center">
                  <div className="text-xs text-gray-500">{testimonial.beforeLabel}</div>
                  <div className={`text-red-400 font-bold ${testimonial.strikethrough ? 'line-through' : ''}`}>
                    {testimonial.before}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500">{testimonial.afterLabel}</div>
                  <div className="text-tech-primary font-bold">{testimonial.after}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
