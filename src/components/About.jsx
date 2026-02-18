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
          start: 'top 85%', // Earlier start for continue flow
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-28 bg-editorial-silk overflow-hidden flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
        
        {/* Left: Mission & Essence */}
        <div className="space-y-12">
          <div className="about-reveal inline-flex items-center gap-2 px-3 py-1 bg-editorial-accent/10 border border-editorial-accent/20 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-editorial-accent"></span>
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-editorial-subtext">About</span>
          </div>
          
          <h2 className="about-reveal font-serif text-5xl md:text-7xl leading-[1.1] text-editorial-text tracking-tight">
            Dedicated to <br /><span className="italic text-editorial-accent">Women's Health</span>
          </h2>
          
          <div className="about-reveal space-y-8 max-w-xl">
            <p className="font-serif italic text-2xl md:text-3xl text-editorial-subtext/90 leading-relaxed">
              "Dedicated obstetrician, gynaecologist and fertility specialist with 10 years of post PG experience aiming to extend my love to serve the community with my knowledge and skills."
            </p>
            
            <div className="h-px w-24 bg-editorial-accent/40"></div>
            
            <p className="text-editorial-subtext text-lg leading-relaxed font-light">
              Dr. Kanaga Lakshmi operates at the intersection of advanced research and compassionate care, specializing in Fertility, High Risk Obstetrics, and Reproductive Medicine.
            </p>
          </div>
        </div>

        {/* Right: Expertise Pillbox */}
        <div className="grid grid-cols-2 gap-4">
          <div className="about-reveal bg-white/60 p-10 border border-editorial-border/40 backdrop-blur-xl space-y-4 rounded-2xl">
            <span className="text-[9px] font-bold tracking-widest text-editorial-accent uppercase">Specialization</span>
            <p className="font-serif text-xl italic text-editorial-text">Fertility Specialist</p>
          </div>
          <div className="about-reveal bg-editorial-text p-10 space-y-4 translate-y-8 rounded-2xl">
            <span className="text-[9px] font-bold tracking-widest text-editorial-accent/60 uppercase">Focus Area</span>
            <p className="font-serif text-xl italic text-white/90">High Risk Obstetrics</p>
          </div>
          <div className="about-reveal bg-editorial-accent/10 border border-editorial-accent/20 p-10 space-y-4 -translate-y-8 rounded-2xl">
            <span className="text-[9px] font-bold tracking-widest text-editorial-accent uppercase">Advanced Surgery</span>
            <p className="font-serif text-xl italic text-editorial-text leading-tight">Hysteroscopic & Laparoscopic</p>
          </div>
          <div className="about-reveal bg-white/60 p-10 border border-editorial-border/40 backdrop-blur-xl space-y-4 rounded-2xl">
            <span className="text-[9px] font-bold tracking-widest text-editorial-accent uppercase">Academic Focus</span>
            <p className="font-serif text-xl italic text-editorial-text">Teaching & Research</p>
          </div>
        </div>
      </div>
      
      {/* Decorative Text Seal */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-[0.02] pointer-events-none -rotate-90 select-none">
        <span className="text-[15rem] font-serif italic text-editorial-text">Experience</span>
      </div>
    </section>
  );
};

export default About;
