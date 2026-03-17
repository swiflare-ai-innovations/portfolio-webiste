import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header animation
            gsap.fromTo('.header-reveal',
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    }
                }
            );

            // Cards stagger animation
            gsap.fromTo('.milestone-card',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: '.cards-container',
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );

            // Footer animation
            gsap.fromTo('.footer-reveal',
                { opacity: 0, scale: 0.98 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: '.cards-container',
                        start: 'top 60%',
                        toggleActions: 'play none none none'
                    }
                }
            );
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
            period: '2022 - 2025',
            title: 'Reproductive Excellence',
            role: 'Consultant & Fellow in Repro. Medicine',
            institution: 'Reputed Center | Iswarya Fertility Center',
            desc: 'Focusing on assisted reproductive technology and endocrinology to help families achieve their dreams through science.',
            type: 'Specialist'
        },
        {
            year: '2024',
            period: '2024 - Present',
            title: 'Clinical Leadership',
            role: 'Consultant Obstetrician & Fertility Specialist',
            institution: 'MGM Malar Hospital, Adyar',
            desc: 'Delivering world-class healthcare, leading complex gynaecological surgeries and high-risk obstetrics.',
            type: 'Current'
        }
    ];

    return (
        <section ref={containerRef} id="experience" className="py-12 md:py-16 lg:py-20 bg-editorial-bg relative overflow-hidden isolate flex items-center justify-center">
            
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.01] pointer-events-none select-none z-0 bg-[url('https://www.transparenttextures.com/patterns/pinstripe-light.png')]"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full flex flex-col justify-center h-full gap-4 lg:gap-12">
                
                {/* Section Header */}
                <div className="text-center space-y-4 pt-4 lg:pt-0">
                    <div className="header-reveal inline-flex items-center gap-2 px-3 py-1.5 bg-editorial-accent/10 border border-editorial-accent/20 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-editorial-accent animate-pulse"></span>
                        <span className="text-[11px] md:text-[10px] font-bold tracking-[0.3em] uppercase text-editorial-subtext">Timeline</span>
                    </div>
                    <h2 className="header-reveal font-serif text-3xl md:text-5xl lg:text-6xl text-editorial-text tracking-tighter leading-none w-full">
                        Clinical <span className="text-editorial-accent">Excellence</span>
                    </h2>
                    <p className="header-reveal font-serif text-lg lg:text-xl text-editorial-text leading-relaxed max-w-xl mx-auto">
                        Two decades of surgical precision and academic leadership, documented in chronological sequence.
                    </p>
                </div>

                {/* Grid Container */}
                <div className="cards-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10 w-full">
                    {timelineData.map((item, i) => (
                        <div key={i} className="milestone-card relative p-8 bg-white/60 backdrop-blur-xl border border-editorial-border/40 rounded-2xl hover:border-editorial-accent/30 hover:bg-white/90 transition-all duration-500 flex flex-col justify-between group overflow-hidden shadow-sm hover:shadow-md">
                            {/* Decorative Year Number Background */}
                            <span className="absolute -bottom-4 -right-1 font-serif text-7xl lg:text-8xl text-editorial-text opacity-[0.03] group-hover:opacity-[0.05] group-hover:scale-110 transition-all duration-700 pointer-events-none select-none z-0">
                                {item.year}
                            </span>

                            <div className="relative z-10 flex-grow">
                                <div className="flex items-center justify-between gap-2 mb-4">
                                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-editorial-accent bg-editorial-accent/5 px-2 py-1">
                                        {item.period}
                                    </span>
                                </div>
                                
                                <h3 className="font-serif text-xl lg:text-2xl text-editorial-text group-hover:text-editorial-accent transition-colors duration-500 leading-tight mb-1">
                                    {item.title}
                                </h3>
                                <h4 className="font-serif text-base lg:text-lg text-editorial-text font-medium leading-tight mb-3">
                                    {item.role}
                                </h4>

                                <p className="text-sm lg:text-base text-editorial-text font-normal leading-relaxed break-words">
                                    {item.desc}
                                </p>
                            </div>

                            <div className="pt-4 mt-4 border-t border-editorial-border/30 relative z-10 flex-grow-0 flex flex-col items-start gap-2">
                                <span className="text-[11px] md:text-[10px] font-bold tracking-widest uppercase text-editorial-text opacity-100 break-words w-full">
                                    {item.institution}
                                </span>
                                <span className="text-[10px] md:text-[9px] font-bold tracking-[0.2em] uppercase text-editorial-subtext shrink-0">
                                    {item.type}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Integrated Conclusion */}
                <div className="footer-reveal relative w-full pb-10 lg:pb-0">
                    <div className="relative p-6 lg:p-8 bg-editorial-accent/5 rounded-2xl border border-editorial-accent/10 overflow-hidden text-center max-w-4xl mx-auto">
                        <p className="relative z-10 font-serif text-lg lg:text-2xl text-editorial-text leading-tight tracking-tight italic">
                            "Continuously redefining the standards of reproductive healthcare through clinical mastery and academic rigor."
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Experience;
