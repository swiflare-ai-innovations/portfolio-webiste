import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
    const containerRef = useRef(null);
    const lineRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Growing Life Line Animation
            gsap.fromTo(lineRef.current, 
                { scaleY: 0 },
                { 
                    scaleY: 1, 
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 20%",
                        end: "bottom 80%",
                        scrub: true
                    }
                }
            );

            // 2. Milestone Card Reveals
            gsap.utils.toArray('.milestone-card').forEach((card, i) => {
                const isEven = i % 2 === 0;
                
                gsap.fromTo(card,
                    { 
                        autoAlpha: 0, 
                        x: isEven ? -50 : 50,
                        y: 20 
                    },
                    {
                        autoAlpha: 1,
                        x: 0,
                        y: 0,
                        duration: 1.2,
                        ease: "expo.out",
                        scrollTrigger: {
                            trigger: card, // Changed from 'card' to 'containerRef.current' based on instruction interpretation
                            start: 'top 85%', // Changed quotes
                            toggleActions: 'play none none none'
                        }
                    }
                );
            });

            // 3. Shadow Year Reveals
            gsap.utils.toArray('.shadow-year').forEach((year) => {
                gsap.fromTo(year,
                    { opacity: 0, scale: 0.8 },
                    {
                        opacity: 0.03,
                        scale: 1,
                        duration: 2,
                        scrollTrigger: {
                            trigger: year, // Changed from 'year' to 'containerRef.current' based on instruction interpretation
                            start: 'top 90%', // Changed quotes
                            toggleActions: 'play none none none'
                        }
                    }
                );
            });

            // 4. Marker Dot Animation
            gsap.utils.toArray('.marker-dot').forEach((dot) => {
                gsap.fromTo(dot,
                    { scale: 0, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.6,
                        ease: "back.out(1.7)",
                        scrollTrigger: {
                            trigger: dot,
                            start: "top 70%",
                            toggleActions: "play none none none"
                        }
                    }
                );
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const timelineData = [
        {
            year: '2005',
            period: '2005 - 2012',
            title: 'Foundations of Excellence',
            role: 'Bachelor of Medicine (MBBS)',
            institution: 'Coimbatore Medical College',
            desc: 'Beginning a journey focused on the highest standards of diagnostic precision and patient care.',
            type: 'Academic'
        },
        {
            year: '2012',
            period: '2012 - 2015',
            title: 'Surgical Mastery',
            role: 'Master of Surgery (MS OG)',
            institution: 'Thanjavur Medical College',
            desc: 'Intensive specialization in Obstetrics and Gynaecology, mastering the complex art of surgical intervention.',
            type: 'Technical'
        },
        {
            year: '2015',
            period: '2015 - 2022',
            title: 'Academic Influence',
            role: 'Assistant Professor',
            institution: 'Thiruvarur & Coimbatore Medical College',
            desc: 'Seven years dedicated to shaping the next generation of medical professionals while maintaining clinical practice.',
            type: 'Professional'
        },
        {
            year: '2022',
            period: '2022',
            title: 'Global Validation',
            role: 'MRCOG (UK)',
            institution: 'Royal College of OBG',
            desc: 'Achieving international recognition and validation of clinical expertise through world-renowned standards.',
            type: 'Certification'
        },
        {
            year: '2022',
            period: '2022 - 2024',
            title: 'Reproductive Care',
            role: 'Consultant',
            institution: 'Iswarya Fertility Center',
            desc: 'Focusing on advanced fertility treatments and helping families achieve their dreams through science.',
            type: 'Specialist'
        },
        {
            year: '2023',
            period: '2023',
            title: 'Advanced Training',
            role: 'Fellow in Reproductive Medicine',
            institution: 'Iswarya Fertility Center',
            desc: 'Deepening expertise in the intricate fields of reproductive technology and endocrinology.',
            type: 'Research'
        },
        {
            year: '2024',
            period: '2024 - Present',
            title: 'Leading Precision',
            role: 'Consultant Fertility Specialist',
            institution: 'Dr. Aravind’s IVF',
            desc: 'Continuing the legacy of excellence as a lead specialist in fertility and high-risk obstetrics.',
            type: 'Current'
        }
    ];

    return (
        <section ref={containerRef} id="experience" className="py-16 sm:py-20 md:py-24 lg:py-28 bg-editorial-silk relative overflow-hidden isolate">
            
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.01] pointer-events-none select-none z-0 bg-[url('https://www.transparenttextures.com/patterns/pinstripe-light.png')]"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                
                {/* Section Header */}
                <div className="mb-32 text-center space-y-6">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-editorial-accent/10 border border-editorial-accent/20 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-editorial-accent animate-pulse"></span>
                        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-editorial-subtext">Timeline</span>
                    </div>
                    <h2 className="font-serif text-5xl md:text-6xl text-editorial-text tracking-tighter leading-none">
                        Clinical <br />
                        <span className="text-editorial-accent">Excellence</span>
                    </h2>
                    <p className="font-serif text-xl text-editorial-subtext opacity-60 max-w-xl mx-auto">
                        Two decades of surgical precision and academic leadership, documented in chronological sequence.
                    </p>
                </div>

                {/* Timeline Container */}
                <div className="relative">
                    
                    {/* The Life Line (Central Axis) */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-editorial-accent/10 -translate-x-1/2 hidden md:block">
                        <div 
                            ref={lineRef}
                            className="w-full h-full bg-editorial-accent origin-top"
                            style={{ transform: 'scaleY(0)' }}
                        ></div>
                    </div>

                    {/* Milestones Staggered */}
                    <div className="space-y-16 md:space-y-24">
                        {timelineData.map((item, i) => (
                            <div key={i} className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 items-center">
                                
                                {/* Shadow Year Background */}
                                <div className={`shadow-year absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 ${i % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                                    <span className="font-serif text-[25vw] md:text-[20vw] text-editorial-text leading-none tracking-tighter">
                                        {item.year}
                                    </span>
                                </div>

                                {/* Central Marker Dot */}
                                <div className="marker-dot absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-editorial-silk bg-editorial-accent z-20 shadow-sm hidden md:block"></div>

                                {i % 2 === 0 ? (
                                    <>
                                        <div className="milestone-card relative z-10 w-full md:max-w-lg md:pr-12 justify-self-end text-right">
                                            <div className="p-6 md:p-8 bg-white/60 backdrop-blur-xl border border-editorial-border/40 rounded-2xl md:rounded-3xl hover:border-editorial-accent/30 transition-colors duration-500 group">
                                                <div className="space-y-6">
                                                    <div className="flex items-center gap-4 flex-row-reverse">
                                                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-editorial-accent bg-editorial-accent/5 px-2 py-1">
                                                            {item.period}
                                                        </span>
                                                        <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-editorial-subtext/40">{item.type}</span>
                                                    </div>
                                                    
                                                    <div className="space-y-2">
                                                        <h3 className="font-serif text-3xl md:text-4xl text-editorial-text group-hover:text-editorial-accent transition-colors duration-500">
                                                            {item.title}
                                                        </h3>
                                                        <h4 className="font-serif text-xl text-editorial-subtext leading-tight">
                                                            {item.role}
                                                        </h4>
                                                    </div>

                                                    <p className="text-sm md:text-base text-editorial-subtext/80 font-light leading-relaxed">
                                                        {item.desc}
                                                    </p>

                                                    <div className="flex items-center gap-4 pt-4 border-t border-editorial-border/20 flex-row-reverse">
                                                        <div className="w-8 h-[1px] bg-editorial-accent/30"></div>
                                                        <span className="text-[11px] font-bold tracking-widest uppercase text-editorial-text opacity-60">{item.institution}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden md:block"></div>
                                    </>
                                ) : (
                                    <>
                                        <div className="hidden md:block"></div>
                                        {/* Content Card (Right) */}
                                        <div className="milestone-card relative z-10 w-full md:max-w-lg md:pl-12 justify-self-start text-left">
                                            <div className="p-6 md:p-8 bg-white/60 backdrop-blur-xl border border-editorial-border/40 rounded-2xl md:rounded-3xl hover:border-editorial-accent/30 transition-colors duration-500 group">
                                                <div className="space-y-6">
                                                    <div className="flex items-center gap-4 flex-row">
                                                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-editorial-accent bg-editorial-accent/5 px-2 py-1">
                                                            {item.period}
                                                        </span>
                                                        <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-editorial-subtext/40">{item.type}</span>
                                                    </div>
                                                    
                                                    <div className="space-y-2">
                                                        <h3 className="font-serif text-3xl md:text-4xl text-editorial-text group-hover:text-editorial-accent transition-colors duration-500">
                                                            {item.title}
                                                        </h3>
                                                        <h4 className="font-serif text-xl text-editorial-subtext leading-tight">
                                                            {item.role}
                                                        </h4>
                                                    </div>

                                                    <p className="text-sm md:text-base text-editorial-subtext/80 font-light leading-relaxed">
                                                        {item.desc}
                                                    </p>

                                                    <div className="flex items-center gap-4 pt-4 border-t border-editorial-border/20 flex-row">
                                                        <div className="w-8 h-[1px] bg-editorial-accent/30"></div>
                                                        <span className="text-[11px] font-bold tracking-widest uppercase text-editorial-text opacity-60">{item.institution}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>

                </div>

                {/* Closing Statement - Integrated Conclusion */}
                <div className="mt-28 relative max-w-4xl mx-auto px-6">
                    <div className="relative p-10 md:p-16 bg-editorial-accent/5 rounded-[2rem] border border-editorial-accent/10 overflow-hidden text-center">
                        {/* Decorative Quote Mark */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-editorial-silk rounded-full flex items-center justify-center border border-editorial-accent/10">
                            <span className="font-serif text-5xl text-editorial-accent leading-none mt-4">"</span>
                        </div>

                        <div className="relative z-10 space-y-8">
                            <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-editorial-text leading-tight tracking-tight italic">
                                Continuously redefining the standards of reproductive healthcare through clinical mastery and academic rigor.
                            </p>
                            
                            <div className="flex items-center justify-center gap-4">
                                <div className="h-[1px] w-12 bg-editorial-accent/30"></div>
                                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-editorial-accent">Philosophy</span>
                                <div className="h-[1px] w-12 bg-editorial-accent/30"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
