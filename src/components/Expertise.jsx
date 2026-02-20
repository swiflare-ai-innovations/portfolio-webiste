import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Professional SVG Icons
const Icons = {
    Health: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
    ),
    DNA: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M4.7 7a1 1 0 011.3-1.3l11.3 11.3a1 1 0 01-1.3 1.3L4.7 7z" />
            <path d="M19.3 7a1 1 0 00-1.3-1.3L6.7 17a1 1 0 001.3 1.3L19.3 7z" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6L19 19M5 19l1.4-1.4M17.6 6.4L19 5" />
        </svg>
    ),
    Cell: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
        </svg>
    ),
    Shield: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
    ),
    Globe: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
    )
};

const Expertise = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Reveal Background Elements
            gsap.fromTo('.floating-bg-element',
                { opacity: 0, scale: 0.9, y: 50 },
                {
                    opacity: 0.02,
                    scale: 1,
                    y: 0,
                    duration: 2,
                    stagger: 0.4,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 90%',
                    }
                }
            );

            // 2. Header Animation
            const headerTl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.expertise-header',
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });

            headerTl.fromTo('.header-tag', 
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
            )
            .fromTo('.header-title',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out' },
                "-=0.8"
            )
            .fromTo('.header-quote',
                { opacity: 0, x: 20 },
                { opacity: 1, x: 0, duration: 1.2, ease: 'expo.out' },
                "-=0.9"
            );

            // 3. Staggered Card Reveal
            gsap.fromTo('.expertise-card',
                { 
                    autoAlpha: 0, 
                    y: 40,
                },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.expertise-grid-container',
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );

            // 4. Language Ribbon Animation
            gsap.fromTo('.language-item',
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.1,
                    duration: 1.2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.language-ribbon',
                        start: 'top 95%',
                    }
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const domainExpertise = [
        { 
            title: "High Risk Obstetrics", 
            details: "Specialized care for complex maternal-fetal medical conditions and high-risk pregnancy protocols.",
            icon: Icons.Health,
            ref: "OB-01"
        },
        { 
            title: "Gynaeoncology & Breast Diseases", 
            details: "Advanced diagnostic pathways and surgical management for gynaecological malignancies and breast conditions.",
            icon: Icons.DNA,
            ref: "ON-02" 
        },
        { 
            title: "Reproductive Medicine", 
            details: "Assisted reproductive technologies, IVF, and comprehensive endocrinology management for fertility.",
            icon: Icons.Cell,
            ref: "RM-03" 
        },
        { 
            title: "Hysteroscopic & Laparoscopic Surgery", 
            details: "Minimally invasive surgical techniques for diagnosis and treatment of gynaecological conditions.",
            icon: Icons.Shield,
            ref: "LS-04" 
        },
        { 
            title: "Social Obstetrics", 
            details: "Community service, awareness campaigns, and public health initiatives for maternal and women's health.",
            icon: Icons.Health,
            ref: "SO-05" 
        }
    ];

    const academicPillars = [
        { label: "Faculty", value: "Assistant Professor (7+ Years)", sub: "Academic Leadership" },
        { label: "Research", value: "International Publications", sub: "Clinical Investigation" },
        { label: "Innovation", value: "Protocol Development", sub: "Standard of Care" }
    ];

    const languages = [
        { name: "Tamil", native: "தமிழ்" },
        { name: "English", native: "English" },
        { name: "Hindi", native: "हिन्दी" },
        { name: "Telugu", native: "తెలుగు" },
        { name: "Bengali", native: "বাংলা" }
    ];

    return (
        <section ref={sectionRef} id="expertise" className="py-16 sm:py-20 md:py-24 lg:py-28 bg-editorial-silk relative overflow-hidden isolate">
            
            {/* Minimalist Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
                <div className="floating-bg-element absolute top-[15%] -right-12 font-serif text-[20vw] leading-none text-editorial-text opacity-[0.01]">
                    Clinical
                </div>
                <div className="floating-bg-element absolute bottom-[15%] -left-12 font-serif text-[20vw] leading-none text-editorial-accent opacity-[0.01]">
                    Scholar
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                
                {/* Section Header - More Refined */}
                <div className="expertise-header mb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
                    <div className="space-y-6">
                        <div className="header-tag inline-flex items-center gap-2 px-3 py-1 bg-editorial-accent/10 border border-editorial-accent/20 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-editorial-accent"></span>
                            <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-editorial-subtext">Expertise</span>
                        </div>
                        <h2 className="header-title font-serif text-5xl md:text-6xl text-editorial-text tracking-tight leading-[1.1]">
                            Precision in <br />
                            <span className="text-editorial-accent">Clinical Practice</span>
                        </h2>
                    </div>
                    <div className="header-quote border-l border-editorial-accent/30 pl-8">
                        <p className="font-serif text-xl text-editorial-subtext/80 leading-relaxed max-w-md">
                            "Bridging complex clinical challenges with evidence-based academic research to redefine standard of care."
                        </p>
                    </div>
                </div>

                {/* Main Content Grid - Stabilized */}
                <div className="expertise-grid-container grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left Column: Domains - Sharp Borders, No Jumps */}
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {domainExpertise.map((item, i) => (
                            <div key={i} className="expertise-card group relative p-8 bg-white border border-editorial-border/40 rounded-2xl hover:border-editorial-accent/40 transition-all duration-500 hover:shadow-sm" style={{ opacity: 0, visibility: 'hidden' }}>
                                <div className="h-full flex flex-col justify-between space-y-8">
                                    <div className="flex justify-between items-start">
                                        <div className="text-editorial-accent group-hover:scale-110 transition-transform duration-500">
                                            <item.icon />
                                        </div>
                                        <span className="font-mono text-[9px] tracking-widest text-editorial-subtext/30 uppercase">{item.ref}</span>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <h3 className="font-serif text-2xl text-editorial-text transition-colors duration-500 group-hover:text-editorial-accent">
                                            {item.title}
                                        </h3>
                                        {/* Fixed description reveal - No layout shift */}
                                        <p className="text-sm text-editorial-subtext leading-relaxed font-light opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                                            {item.details}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Column: Academic & Stats - Professional Treatment */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="expertise-card p-8 bg-editorial-text text-white rounded-2xl relative overflow-hidden" style={{ opacity: 0, visibility: 'hidden' }}>
                            <div className="relative z-10 space-y-10">
                                <div className="space-y-1">
                                    <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-editorial-accent">The Academic Core</p>
                                    <h3 className="font-serif text-3xl">Scholarship</h3>
                                </div>

                                <div className="space-y-6">
                                    {academicPillars.map((pillar, i) => (
                                        <div key={i} className="space-y-0.5 group/pillar">
                                            <p className="text-[8px] font-bold tracking-widest text-editorial-accent/50 uppercase group-hover/pillar:text-editorial-accent transition-colors">{pillar.label}</p>
                                            <p className="text-lg font-light leading-tight">{pillar.value}</p>
                                            <p className="text-[10px] text-white/30">{pillar.sub}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="expertise-card p-6 border border-editorial-border/40 rounded-2xl bg-white/50 backdrop-blur-sm group" style={{ opacity: 0, visibility: 'hidden' }}>
                            <div className="flex items-center gap-4">
                                <div className="text-editorial-accent bg-editorial-accent/5 p-3 rounded-xl">
                                    <Icons.Globe />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-[9px] font-bold tracking-widest uppercase text-editorial-subtext">Global Trust</p>
                                    <p className="text-xs font-light text-editorial-subtext/70">Universal communication excellence.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Language Ribbon - Clean Typography */}
                <div className="language-ribbon mt-24 pt-12 border-t border-editorial-border/30">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="space-y-1 text-center lg:text-left">
                            <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-editorial-accent">Connectivity</p>
                            <h4 className="font-serif text-2xl text-editorial-text">Linguistic Versatility</h4>
                        </div>
                        
                        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6">
                            {languages.map((lang, i) => (
                                <div key={i} className="language-item text-center">
                                    <p className="text-[7px] font-bold tracking-[0.2em] text-editorial-accent/40 uppercase mb-1">
                                        {lang.name}
                                    </p>
                                    <span className="font-serif text-3xl text-editorial-text/70 hover:text-editorial-accent transition-colors cursor-default">
                                        {lang.native}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Expertise;
