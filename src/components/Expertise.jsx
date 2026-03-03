import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Professional SVG Icons
const Icons = {
    Health: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
    ),
    DNA: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
            <path d="M4.7 7a1 1 0 011.3-1.3l11.3 11.3a1 1 0 01-1.3 1.3L4.7 7z" />
            <path d="M19.3 7a1 1 0 00-1.3-1.3L6.7 17a1 1 0 001.3 1.3L19.3 7z" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6L19 19M5 19l1.4-1.4M17.6 6.4L19 5" />
        </svg>
    ),
    Cell: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
        </svg>
    ),
    Shield: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
    ),
    Globe: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
    )
};

const Expertise = () => {
    const sectionRef = useRef(null);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header Animation
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
            );

            // Staggered Item Reveal
            gsap.fromTo('.expertise-item',
                { opacity: 0, x: -30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.expertise-container',
                        start: 'top 80%',
                    }
                }
            );

            // Detailed Content Reveal
            gsap.fromTo('.expertise-detail-card',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: 'expo.out',
                    scrollTrigger: {
                        trigger: '.expertise-container',
                        start: 'top 75%',
                    }
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const domainExpertise = [
        { 
            title: "High Risk Obstetrics", 
            description: "Providing elite care for complex maternal-fetal medical conditions. Our protocol-driven approach manages pregnancies complicated by pre-existing conditions or sudden onset challenges, ensuring the safety of both mother and child through every critical milestone.",
            specialties: ["Maternal-Fetal Monitoring", "Pre-eclampsia Management", "Multiple Gestations Specialist", "Gestational Diabetes Care"],
            icon: Icons.Health,
            ref: "OB-01"
        },
        { 
            title: "Gynaeoncology", 
            description: "Advanced diagnostic pathways and surgical management for gynaecological malignancies. We focus on early detection and comprehensive longitudinal care, integrating the latest clinical research with compassionate patient advocacy.",
            specialties: ["Ovarian Cancer Screening", "Cervical Health Advocacy", "Endometrial Care", "Post-Surgical Protocols"],
            icon: Icons.DNA,
            ref: "ON-02" 
        },
        { 
            title: "Reproductive Medicine", 
            description: "Innovative management of fertility through assisted reproductive technologies. Our endocrinology-led approach addresses hormonal imbalances and reproductive hurdles with evidence-based solutions tailored to individual patient journeys.",
            specialties: ["Infertility Diagnostics", "Hormonal Optimization", "ART Support Services", "Endocrine Management"],
            icon: Icons.Cell,
            ref: "RM-03" 
        },
        { 
            title: "Minimal Invasive Surgery", 
            description: "Pioneering laparoscopic and hysteroscopic techniques that prioritize rapid recovery. By utilizing precision instruments and refined surgical methodologies, we minimize patient downtime while maximizing diagnostic and therapeutic accuracy.",
            specialties: ["Diagnostic Laparoscopy", "Hysteroscopic Interventions", "Robotic-Assisted Concepts", "Safe Surgical Recovery"],
            icon: Icons.Shield,
            ref: "LS-04" 
        },
        { 
            title: "Social Obstetrics", 
            description: "Bridging the gap between clinical excellence and community health. Dedicated to public health initiatives and awareness campaigns that improve maternal health outcomes across diverse socio-economic populations through education and outreach.",
            specialties: ["Community Health Literacy", "Maternal Wellness Programs", "Public Health Research", "Advocacy & Education"],
            icon: Icons.Health,
            ref: "SO-05" 
        }
    ];

    return (
        <section ref={sectionRef} id="expertise" className="py-24 md:py-32 bg-editorial-silk relative isolate">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                
                {/* Section Header */}
                <div className="expertise-header mb-20">
                    <div className="header-tag inline-flex items-center gap-2 px-3 py-1 bg-editorial-accent/10 border border-editorial-accent/20 rounded-full mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-editorial-accent"></span>
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-editorial-subtext">Scope of Practice</span>
                    </div>
                    <h2 className="header-title font-serif text-5xl md:text-7xl text-editorial-text tracking-tight leading-[1.1] max-w-3xl">
                        Expertise Built on <br />
                        <span className="text-editorial-accent italic">Clinical Rigor.</span>
                    </h2>
                </div>

                <div className="expertise-container grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    
                    {/* Left: Navigation List - Now STICKY on LG+ screens */}
                    <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-32 space-y-4">
                        {domainExpertise.map((item, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveTab(i)}
                                className={`expertise-item group w-full text-left p-6 md:p-8 lg:p-10 border-b border-editorial-border/30 transition-all duration-500 relative flex items-center justify-between outline-none ${activeTab === i ? 'bg-white shadow-md border-editorial-accent/30' : 'hover:bg-white/20'}`}
                            >
                                <div className="flex items-center gap-6 lg:gap-8">
                                    <span className={`font-mono text-xs lg:text-sm tracking-widest uppercase transition-colors duration-500 ${activeTab === i ? 'text-editorial-accent' : 'text-editorial-subtext/20'}`}>
                                        {item.ref}
                                    </span>
                                    <h3 className={`font-serif text-2xl md:text-3xl lg:text-4xl transition-all duration-500 ${activeTab === i ? 'text-editorial-text scale-105 origin-left' : 'text-editorial-subtext/40 group-hover:text-editorial-subtext'}`}>
                                        {item.title}
                                    </h3>
                                </div>
                                <div className={`transition-all duration-500 transform ${activeTab === i ? 'opacity-100 translate-x-0 text-editorial-accent' : 'opacity-0 -translate-x-4'}`}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                {activeTab === i && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-editorial-accent transition-all duration-500"></div>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Right: Detailed Content Display */}
                    <div className="lg:col-span-7 xl:col-span-8">
                        <div key={activeTab} className="expertise-detail-card bg-white p-8 md:p-12 lg:p-20 border border-editorial-border/30 rounded-[2.5rem] relative overflow-hidden min-h-[750px] flex flex-col justify-between shadow-2xl shadow-editorial-accent/5 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                            
                            {/* Decorative Icon Background */}
                            <div className="absolute -top-12 -right-12 text-editorial-accent/5 transform rotate-12 scale-[3]">
                                {React.createElement(domainExpertise[activeTab].icon)}
                            </div>

                            <div className="relative z-10 space-y-12">
                                <div className="space-y-6">
                                    <div className="text-editorial-accent bg-editorial-accent/5 w-16 h-16 rounded-2xl flex items-center justify-center">
                                        {React.createElement(domainExpertise[activeTab].icon)}
                                    </div>
                                    <h4 className="font-serif text-4xl md:text-5xl text-editorial-text leading-tight">
                                        {domainExpertise[activeTab].title}
                                    </h4>
                                    <p className="text-xl md:text-2xl text-editorial-subtext leading-relaxed font-light max-w-2xl">
                                        {domainExpertise[activeTab].description}
                                    </p>
                                </div>

                                <div className="space-y-8">
                                    <p className="text-[11px] font-bold tracking-[0.4em] uppercase text-editorial-accent border-b border-editorial-accent/20 pb-4 inline-block">
                                        Areas of Focus
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                        {domainExpertise[activeTab].specialties.map((spec, i) => (
                                            <div key={i} className="flex items-start gap-4 group/spec">
                                                <span className="w-2 h-2 rounded-full bg-editorial-accent mt-2.5 group-hover/spec:scale-150 transition-transform"></span>
                                                <p className="text-lg text-editorial-subtext/80 group-hover/spec:text-editorial-text transition-colors">
                                                    {spec}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="relative z-10 pt-16 mt-16 border-t border-editorial-border/30 flex items-center justify-between">
                                <div className="flex gap-6">
                                    <div className="h-12 w-px bg-editorial-border/60"></div>
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-bold tracking-widest text-editorial-subtext/40 uppercase">Standard of Care</p>
                                        <p className="text-sm font-medium text-editorial-text italic">Clinical Excellence Guaranteed</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => window.__lenis?.scrollTo('#appointment')}
                                    className="group flex items-center gap-3 text-[11px] font-bold tracking-[0.3em] uppercase text-editorial-accent hover:text-editorial-text transition-colors"
                                >
                                    Consult Practitioner
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="transform group-hover:translate-x-2 transition-transform">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Content: Secondary Information */}
                <div className="mt-32 pt-16 border-t border-editorial-border/30 grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
                    <div className="space-y-6 group">
                        <p className="text-[11px] font-bold tracking-[0.4em] uppercase text-editorial-accent">Academic Integration</p>
                        <h4 className="font-serif text-3xl text-editorial-text leading-tight group-hover:text-editorial-accent transition-colors duration-500">Faculty Member at Leading Institutions</h4>
                        <p className="text-lg text-editorial-subtext/70 leading-relaxed">Combining 7+ years of teaching with active clinical duty to mentor the next generation of gynaecological specialists.</p>
                    </div>
                    <div className="space-y-6 group">
                        <p className="text-[11px] font-bold tracking-[0.4em] uppercase text-editorial-accent">Research Impact</p>
                        <h4 className="font-serif text-3xl text-editorial-text leading-tight group-hover:text-editorial-accent transition-colors duration-500">Published Clinical Research</h4>
                        <p className="text-lg text-editorial-subtext/70 leading-relaxed">Contributing to peer-reviewed journals with a focus on maternal safety and innovative surgical protocols.</p>
                    </div>
                    <div className="space-y-6 group">
                        <p className="text-[11px] font-bold tracking-[0.4em] uppercase text-editorial-accent">Global Connectivity</p>
                        <h4 className="font-serif text-3xl text-editorial-text leading-tight group-hover:text-editorial-accent transition-colors duration-500">Multilingual Care</h4>
                        <p className="text-lg text-editorial-subtext/70 leading-relaxed">Bridging cultural gaps through fluency in Tamil, English, Hindi, Telugu, and Bengali for inclusive patient journeys.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Expertise;

