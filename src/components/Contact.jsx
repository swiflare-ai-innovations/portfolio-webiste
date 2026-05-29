import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Massive background text parallax
            gsap.fromTo('.footer-bg-text', 
                {
                    opacity: 0,
                    x: 100
                },
                {
                    opacity: 0.03, // Match target opacity
                    x: -200,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    },
                    immediateRender: false
                }
            );

            // Contact elements reveal
            gsap.fromTo('.contact-reveal', 
                {
                    autoAlpha: 0,
                    y: 30
                },
                {
                    autoAlpha: 1,
                    y: 0,
                    stagger: 0.08,
                    duration: 1.0,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 90%',
                    },
                    immediateRender: false
                }
            );

            // Map box drawing animation
            gsap.fromTo('.map-line', 
                {
                    scaleX: 0
                },
                {
                    scaleX: 1,
                    duration: 1.5,
                    stagger: 0.2,
                    ease: "expo.inOut",
                    scrollTrigger: {
                        trigger: '.contact-grid',
                        start: 'top 65%',
                    },
                    immediateRender: false
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleNavClick = (e, href) => {
        e.preventDefault();
        const targetId = href.replace('#', '');
        const target = document.getElementById(targetId);
        if (!target) return;

        const lenis = window.__lenis;
        if (lenis) {
            lenis.scrollTo(target, {
                offset: -80,
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
        } else {
            const headerHeight = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    return (
        <section ref={sectionRef} id="contact" className="relative bg-editorial-bg pt-10 md:pt-12 lg:pt-14 overflow-hidden flex flex-col justify-between">
            
            {/* The Cinematic Signature Background */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none select-none z-0" style={{ opacity: 0, visibility: 'hidden' }}>
                <h2 className="footer-bg-text font-serif text-[28vw] leading-[0.7] whitespace-nowrap text-editorial-text tracking-tighter">
                    DR. KANAGA LAKSHMI • DR. KANAGA LAKSHMI
                </h2>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
                
                {/* Grand Finale Header */}
                <div className="contact-reveal mb-10 md:mb-16 space-y-2 md:space-y-3" style={{ opacity: 0, visibility: 'hidden' }}>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-editorial-accent/10 border border-editorial-accent/20 rounded-full mb-2 md:mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-editorial-accent"></span>
                        <span className="text-[11px] md:text-[10px] font-bold tracking-[0.3em] uppercase text-editorial-subtext">Contact</span>
                    </div>
                    <h2 className="font-serif text-3xl md:text-6xl text-editorial-text tracking-tighter leading-[0.85] w-full">
                        Surgical Mastery <br />
                        <span className="text-editorial-accent ml-[5%]">Human Care</span>
                    </h2>
                </div>

                <div className="contact-grid grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start mb-10 md:mb-14">
                    
                    {/* The Command Center Box */}
                    <div className="contact-reveal lg:col-span-7 bg-editorial-silk text-editorial-text p-8 md:p-12 relative overflow-hidden group shadow-2xl border border-editorial-border/60" style={{ opacity: 0, visibility: 'hidden' }}>
                        <div className="relative z-10 space-y-10">
                            <div className="space-y-4">
                                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-editorial-subtext">Command Center</span>
                                <h3 className="font-serif text-4xl md:text-5xl">Secure your <br />consultation</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <a href="tel:+918825821977" className="block space-y-3 group/link">
                                    <p className="text-xs md:text-[9px] font-bold uppercase tracking-widest text-editorial-subtext">Direct Connection</p>
                                    <p className="font-serif text-xl md:text-2xl transition-transform duration-500 group-hover/link:translate-x-2">
                                        +91 88258 21977
                                    </p>
                                    <div className="h-px w-0 group-hover/link:w-full bg-editorial-accent transition-all duration-700"></div>
                                </a>
                                <a href="mailto:kanaga25jan@gmail.com" className="block space-y-3 group/link">
                                    <p className="text-xs md:text-[9px] font-bold uppercase tracking-widest text-editorial-subtext">Editorial Channel</p>
                                    <p className="font-serif text-xl md:text-2xl transition-transform duration-500 group-hover/link:translate-x-2 break-words">
                                        kanaga25jan@gmail.com
                                    </p>
                                    <div className="h-px w-0 group-hover/link:w-full bg-editorial-accent transition-all duration-700"></div>
                                </a>
                            </div>

                            <div className="pt-8 border-t border-editorial-border/40 flex justify-between items-center">
                                <div className="space-y-1">
                                    <p className="text-[9px] uppercase tracking-widest text-editorial-subtext">Medical Registration</p>
                                    <p className="text-xs font-mono">TN-MED_BOARD-CERT_2026</p>
                                </div>
                                <div className="w-16 h-16 rounded-full border border-editorial-border/60 flex items-center justify-center group-hover:border-editorial-accent transition-all duration-700">
                                    <span className="text-2xl">→</span>
                                </div>
                            </div>
                        </div>

                        {/* Texture Layer */}
                        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/noise-lines.png')]"></div>
                        <div className="absolute top-0 right-0 p-8 text-[60px] text-editorial-border font-serif pointer-events-none select-none">K.</div>
                    </div>

                    {/* The Precision Map Hybrid */}
                    <div className="lg:col-span-5 space-y-8 lg:pt-8">
                        <div className="contact-reveal relative p-8 md:p-10 border border-editorial-border/60 bg-editorial-silk/90 backdrop-blur-xl group overflow-hidden rounded-3xl shadow-sm" style={{ opacity: 0, visibility: 'hidden' }}>
                            <div className="absolute top-0 right-0 p-4 flex gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-editorial-text animate-pulse"></div>
                                <div className="map-line w-8 h-px bg-editorial-border origin-right"></div>
                            </div>
                            
                            <div className="space-y-6 relative z-10">
                                <div className="space-y-4">
                                    <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Primary Center</span>
                                    <h4 className="font-serif text-3xl leading-tight">Adyar, Chennai</h4>
                                </div>
                                
                                <div className="space-y-6">
                                    <address className="not-italic font-serif text-xl text-editorial-subtext leading-relaxed border-l-2 border-editorial-accent/30 pl-8">
                                        <span className="block text-editorial-text font-medium text-sm mb-2 uppercase tracking-wider">Consultation Clinic</span>
                                        9, Teachers Colony,<br />
                                        Venkata Rathnam Nagar Extension,<br />
                                        Venkata Rathinam Nagar, Adyar,<br />
                                          Chennai, Tamil Nadu 600020
                                    </address>
                                   
                                </div>

                                <div className="pt-5 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full border border-editorial-border flex items-center justify-center">
                                        <span className="text-[8px] font-bold">MAP</span>
                                    </div>
                                    <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-editorial-subtext">Coordinates Verified</p>
                                </div>
                            </div>

                            {/* Decorative Grid Lines */}
                            <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-editorial-border/40 translate-x-[-10px] translate-y-[10px] group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700"></div>
                        </div>

                    </div>

                </div>
            </div>

            {/* The True Footer Signature */}
            <div className="relative z-10 w-full border-t border-editorial-border/30 bg-editorial-silk py-8 px-6 backdrop-blur-md">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col items-center md:items-start gap-3">
                        <p className="font-serif text-2xl text-editorial-text tracking-tight">Dr. Kanaga Lakshmi</p>
                        <p className="text-[8px] font-bold tracking-[0.6em] uppercase text-editorial-subtext">Consultant Fertility Specialist</p>
                    </div>

                    <ul className="flex flex-wrap justify-center gap-x-12 gap-y-4">
                        {[
                            { name: 'Home', href: '#home' },
                            { name: 'About', href: '#about' },
                            { name: 'Timeline', href: '#experience' },
                            { name: 'Expertise', href: '#expertise' },
                            { name: 'Testimonials', href: '#testimonials' },
                            { name: 'Contact', href: '#contact' }
                        ].map((link) => (
                            <li key={link.name}>
                                <a 
                                    href={link.href} 
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className="text-[11px] md:text-[9px] font-bold tracking-[0.3em] uppercase text-editorial-text transition-all duration-500"
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="text-center md:text-right">
                        <p className="text-[11px] md:text-[8px] font-bold tracking-[0.3em] uppercase text-editorial-subtext">© 2026 Professional Portfolio</p>
                        <p className="text-[11px] md:text-[8px] font-bold tracking-[0.3em] uppercase text-editorial-subtext">All Rights Reserved</p>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Contact;
