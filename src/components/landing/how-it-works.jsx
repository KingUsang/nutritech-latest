/**
 * How It Works section showing the 3-step process
 */
export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-navy-800/30 relative z-10 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Personal <span className="text-tech-primary">Nutrition Engine</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We don't just guess. We analyze your student life to find the fuel you're missing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-tech-primary/30 to-transparent -translate-y-1/2 z-0"></div>

          {/* Step 1 */}
          <div className="relative z-10 group">
            <div className="w-24 h-24 mx-auto glass rounded-2xl flex items-center justify-center text-4xl mb-6 border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.2)] group-hover:scale-110 transition duration-500 bg-navy-900">
              👤
            </div>
            <h3 className="font-bold text-xl mb-2">1. Your Profile</h3>
            <p className="text-sm text-gray-400 px-6">
              Tell us your budget, schedule, and symptoms (e.g., "I'm always tired").
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative z-10">
            <div className="w-32 h-32 mx-auto glass-active rounded-full flex items-center justify-center relative mb-6 bg-navy-900 animate-pulse-slow shadow-[0_0_40px_rgba(0,255,136,0.2)]">
              <div className="absolute inset-0 border border-tech-primary/30 rounded-full animate-spin-slow border-t-transparent"></div>
              <div 
                className="absolute inset-2 border border-blue-500/30 rounded-full animate-spin-slow border-b-transparent" 
                style={{ animationDirection: 'reverse' }}
              ></div>
              <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-tech-primary to-blue-400">
                AI
              </span>
            </div>
            <h3 className="font-bold text-xl mb-2">2. Smart Analysis</h3>
            <p className="text-sm text-gray-400 px-6 leading-relaxed">
              We link "Tiredness" to "Iron Deficiency" and "Brain Fog" to "Low Protein".
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative z-10 group">
            <div className="w-24 h-24 mx-auto glass rounded-2xl flex items-center justify-center text-4xl mb-6 border border-tech-primary/30 shadow-[0_0_20px_rgba(0,255,136,0.2)] group-hover:scale-110 transition duration-500 bg-navy-900">
              📱
            </div>
            <h3 className="font-bold text-xl mb-2">3. The Plan</h3>
            <p className="text-sm text-gray-400 px-6">
              Get a tailored 7-day plan using campus-friendly foods like Moin-Moin and Ugwu.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
