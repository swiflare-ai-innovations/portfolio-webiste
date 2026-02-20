import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-reveal', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className="relative py-16 sm:py-20 md:py-28 bg-editorial-silk overflow-hidden flex items-center justify-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-32 items-start lg:items-center">
        
        {/* Left: Mission & Essence */}
        <div className="space-y-6 sm:space-y-8 md:space-y-12 order-1">
          <div className="about-reveal inline-flex items-center gap-2 px-3 py-1 bg-editorial-accent/10 border border-editorial-accent/20 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-editorial-accent"></span>
            <span className="text-[8px] sm:text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-editorial-subtext">
              About
            </span>
          </div>
          
          <h2 className="about-reveal font-serif text-4xl sm:text-5xl md:text-6xl lg:text-6xl leading-[1.1] text-editorial-text tracking-tight">
            Dedicated to <br className="hidden sm:block" /><span className="text-editorial-accent">Women's Health</span>
          </h2>
          
          <div className="about-reveal space-y-4 sm:space-y-6 md:space-y-8 max-w-xl">
            <p className="font-serif text-xl sm:text-2xl md:text-2xl text-editorial-subtext/90 leading-relaxed">
              "Dedicated obstetrician, gynaecologist and fertility specialist with 10 years of post PG experience aiming to extend my love to serve the community with my knowledge and skills."
            </p>
            
            <div className="h-px w-16 sm:w-20 md:w-24 bg-editorial-accent/40"></div>
            
            <p className="text-editorial-subtext text-base sm:text-lg leading-relaxed font-light">
              Dr. Kanaga Lakshmi operates at the intersection of advanced research and compassionate care, specializing in Fertility, High Risk Obstetrics, and Reproductive Medicine.
            </p>
          </div>
        </div>

        {/* Right: Expertise Pillbox */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 order-2 mt-4 sm:mt-6 lg:mt-0">
          {/* Card 1 */}
          <div className="about-reveal bg-white/60 p-4 sm:p-6 md:p-8 lg:p-10 border border-editorial-border/40 backdrop-blur-xl space-y-2 sm:space-y-3 md:space-y-4 rounded-xl sm:rounded-2xl">
            <span className="text-[8px] sm:text-[9px] font-bold tracking-widest text-editorial-accent uppercase block">
              Specialization
            </span>
            <p className="font-serif text-base sm:text-lg md:text-xl text-editorial-text leading-tight">
              Fertility Specialist
            </p>
          </div>
          
          {/* Card 2 - with translate on desktop only */}
          <div className="about-reveal bg-editorial-accent p-4 sm:p-6 md:p-8 lg:p-10 space-y-2 sm:space-y-3 md:space-y-4 lg:translate-y-8 rounded-xl sm:rounded-2xl shadow-lg border border-editorial-accent/20">
            <span className="text-[8px] sm:text-[9px] font-bold tracking-widest text-white/60 uppercase block">
              Focus Area
            </span>
            <p className="font-serif text-base sm:text-lg md:text-xl text-white leading-tight">
              High Risk Obstetrics
            </p>
          </div>
          
          {/* Card 3 - with negative translate on desktop only */}
          <div className="about-reveal bg-editorial-accent/10 border border-editorial-accent/20 backdrop-blur-xl p-4 sm:p-6 md:p-8 lg:p-10 space-y-2 sm:space-y-3 md:space-y-4 lg:-translate-y-8 rounded-xl sm:rounded-2xl">
            <span className="text-[8px] sm:text-[9px] font-bold tracking-widest text-editorial-accent uppercase block">
              Advanced Surgery
            </span>
            <p className="font-serif text-base sm:text-lg md:text-xl text-editorial-text leading-tight">
              Hysteroscopic & Laparoscopic
            </p>
          </div>
          
          {/* Card 4 */}
          <div className="about-reveal bg-white/60 p-4 sm:p-6 md:p-8 lg:p-10 border border-editorial-border/40 backdrop-blur-xl space-y-2 sm:space-y-3 md:space-y-4 rounded-xl sm:rounded-2xl">
            <span className="text-[8px] sm:text-[9px] font-bold tracking-widest text-editorial-accent uppercase block">
              Academic Focus
            </span>
            <p className="font-serif text-base sm:text-lg md:text-xl text-editorial-text leading-tight">
              Teaching & Research
            </p>
          </div>
        </div>
      </div>
      
      {/* Decorative Text Seal - hidden on mobile */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-[0.02] pointer-events-none -rotate-90 select-none hidden lg:block">
        <span className="text-[10rem] xl:text-[15rem] font-serif text-editorial-text">Experience</span>
      </div>
    </section>
  );
};

export default About;