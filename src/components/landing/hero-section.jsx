'use client';

import { useRef, useEffect } from 'react';

/**
 * Hero section with 3D tilting comparison cards
 */
export default function HeroSection() {
  const tiltRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const tilt = tiltRef.current;
    if (!section || !tilt) return;

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xPct = x / rect.width - 0.5;
      const yPct = y / rect.height - 0.5;

      const rotateY = xPct * 30;
      const rotateX = yPct * -30;

      tilt.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    };

    const handleMouseLeave = () => {
      tilt.style.transform = 'rotateY(0deg) rotateX(0deg)';
    };

    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden z-10" 
      style={{ perspective: '1000px' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left z-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-tech-primary text-xs font-bold tracking-wider mb-6 animate-float">
              <span className="w-2 h-2 rounded-full bg-tech-primary animate-pulse"></span>
              AI-POWERED STUDENT FUEL
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Fix Your Diet.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-tech-primary to-blue-500">
                Hack Your GPA.
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Nutri-Tech analyzes your symptoms (tired? brain fog?) and builds realistic meal plans using affordable Nigerian foods.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="/auth"
                className="bg-gradient-to-r from-tech-primary to-emerald-600 text-navy-900 font-bold text-lg px-8 py-4 rounded-xl hover:scale-105 transition duration-300 shadow-[0_0_30px_rgba(0,255,136,0.3)]"
              >
                Analyze My Diet ⚡
              </a>
            </div>
          </div>

          {/* 3D Floating Comparison Cards */}
          <div className="lg:w-1/2 w-full flex justify-center h-[400px] relative items-center" style={{ perspective: '1000px' }}>
            <div 
              ref={tiltRef}
              className="relative w-full max-w-lg h-full flex items-center justify-center transition-transform duration-100 ease-out"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Bad Card */}
              <div 
                className="absolute w-72 glass bg-navy-900/80 p-5 rounded-2xl border-b-4 border-red-500 shadow-xl transition-all duration-500"
                style={{ transform: 'rotateY(15deg) translateZ(-50px) translateX(-20px)' }}
              >
                <div className="absolute -top-3 -left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded animate-bounce">
                  ⛔ Brain Fog
                </div>
                <h3 className="text-gray-400 text-xs uppercase font-bold tracking-widest mb-1">Current Diet</h3>
                <div className="text-xl font-bold text-white mb-4">The "Indomie" Life 🍜</div>
                
                <div className="space-y-2 text-xs mb-4">
                  <div className="flex justify-between border-b border-white/5 py-1">
                    <span>Breakfast</span> <span className="text-gray-400">Tea & Bread</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 py-1">
                    <span>Lunch</span> <span className="text-gray-400">Indomie + Egg</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-red-500/10 p-2 rounded text-center border border-red-500/20">
                    <div className="text-[10px] text-red-400 font-bold">PROTEIN</div>
                    <div className="text-lg font-bold">15g ❌</div>
                  </div>
                  <div className="bg-red-500/10 p-2 rounded text-center border border-red-500/20">
                    <div className="text-[10px] text-red-400 font-bold">IRON</div>
                    <div className="text-lg font-bold">4mg ❌</div>
                  </div>
                </div>
              </div>

              {/* Good Card */}
              <div 
                className="absolute w-72 glass-active bg-navy-900/90 p-5 rounded-2xl border-b-4 border-tech-primary shadow-2xl z-10 transition-all duration-500"
                style={{ transform: 'rotateY(-15deg) translateZ(50px) translateX(20px)' }}
              >
                <div className="absolute -top-3 -right-3 bg-tech-primary text-navy-900 text-xs font-bold px-2 py-1 rounded animate-bounce" style={{ animationDelay: '0.5s' }}>
                  ⚡ 4.0 GPA Energy
                </div>
                <h3 className="text-tech-primary text-xs uppercase font-bold tracking-widest mb-1">Smart Student Diet</h3>
                <div className="text-xl font-bold text-white mb-4">Balanced Power 🥑</div>
                
                <div className="space-y-2 text-xs mb-4">
                  <div className="flex justify-between border-b border-white/5 py-1">
                    <span>Breakfast</span> <span className="text-gray-400">Eggs & Bread</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 py-1">
                    <span>Lunch</span> <span className="text-gray-400">Rice, Beans & Fish</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-green-500/10 p-2 rounded text-center border border-green-500/20">
                    <div className="text-[10px] text-tech-primary font-bold">PROTEIN</div>
                    <div className="text-lg font-bold text-white">65g ✅</div>
                  </div>
                  <div className="bg-green-500/10 p-2 rounded text-center border border-green-500/20">
                    <div className="text-[10px] text-tech-primary font-bold">IRON</div>
                    <div className="text-lg font-bold text-white">12mg ✅</div>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center text-xs">
                  <span className="text-gray-400">Daily Cost:</span>
                  <span className="text-tech-primary font-bold text-lg">₦1,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
