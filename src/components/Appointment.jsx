import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Appointment = () => {
    const sectionRef = useRef(null);
    const formRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.appointment-reveal', 
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

            // Subtle background scale
            gsap.to('.appointment-bg-accent', {
                scale: 1.1,
                opacity: 0.1,
                duration: 3,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <section ref={sectionRef} id="appointment" className="relative py-12 md:py-16 lg:py-20 bg-editorial-bg overflow-hidden isolate">
            
            {/* Background Narrative */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none select-none z-0">
                <span className="appointment-bg-accent absolute top-10 right-10 font-serif text-[35vw] text-editorial-accent opacity-[0.03] leading-none">
                    Booking
                </span>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                
                {/* Header Block */}
                <div className="mb-10 md:mb-20 space-y-4 md:space-y-6">
                    <div className="appointment-reveal inline-flex items-center gap-2 px-3 py-1.5 bg-editorial-accent/10 border border-editorial-accent/20 rounded-full mb-2 md:mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-editorial-accent"></span>
                        <span className="text-[11px] md:text-[10px] font-bold tracking-[0.4em] uppercase text-editorial-subtext">Booking</span>
                    </div>
                    <h2 className="appointment-reveal font-serif text-3xl md:text-6xl lg:text-6xl text-editorial-text tracking-tighter leading-[0.85] w-full">
                        Request Your <br />
                        <span className="text-editorial-accent ml-[5%]">Consultation</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    
                    {/* Left: The Protocol (Clinic Info) */}
                    <div className="lg:col-span-4 space-y-12 order-2 lg:order-1">
                        <div className="appointment-reveal space-y-4" style={{ opacity: 0, visibility: 'hidden' }}>
                            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-editorial-accent">The Protocol</p>
                            <h3 className="font-serif text-3xl text-editorial-text leading-tight">Professional Triage & Coordination</h3>
                            <p className="text-editorial-subtext font-light leading-relaxed">
                                Our clinical team will evaluate your request and coordinate a prioritized consultation within 24 hours.
                            </p>
                        </div>

                        <div className="appointment-reveal pt-8 border-t border-editorial-border/60 space-y-8" style={{ opacity: 0, visibility: 'hidden' }}>
                            <div className="space-y-2">
                                <p className="text-xs md:text-[9px] uppercase tracking-widest text-editorial-text">Primary Hospital</p>
                                <p className="font-serif text-xl">MGM Malar Hospital, Adyar</p>
                                <p className="text-xs text-editorial-subtext max-w-[200px]">Old No. 52 New No. 111, 1 st Main Road, Gandhi Nagar, Chennai - 600020</p>
                            </div>
                            
                            <div className="space-y-1">
                                <p className="text-xs md:text-[9px] uppercase tracking-widest text-editorial-text">Direct Contact</p>
                                <a href="tel:+918344795191" className="block font-serif text-2xl text-editorial-text hover:text-editorial-accent transition-colors">
                                    +91 83447 95191
                                </a>
                            </div>
                        </div>

                        <div className="appointment-reveal hidden lg:block" style={{ opacity: 0, visibility: 'hidden' }}>
                           <div className="w-16 h-16 rounded-full border border-editorial-accent/20 flex items-center justify-center p-4">
                               <div className="w-full h-full rounded-full border border-editorial-accent/40 animate-pulse"></div>
                           </div>
                        </div>
                    </div>

                    {/* Right: The Intake Form */}
                    <div className="lg:col-span-8 bg-editorial-silk/90 p-8 md:p-12 border border-editorial-border/60 backdrop-blur-xl rounded-3xl appointment-reveal order-1 lg:order-2" style={{ opacity: 0, visibility: 'hidden' }}>
                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {/* Name Input */}
                                <div className="group relative">
                                    <input 
                                        type="text" 
                                        placeholder="Full Name" 
                                        className="w-full bg-transparent border-b border-editorial-border/80 py-4 font-serif text-xl focus:outline-none focus:border-editorial-accent transition-colors placeholder:text-editorial-subtext"
                                        required
                                    />
                                    <div className="absolute bottom-0 left-0 w-0 h-px bg-editorial-accent transition-all duration-700 group-focus-within:w-full"></div>
                                </div>

                                {/* Contact Input */}
                                <div className="group relative">
                                    <input 
                                        type="tel" 
                                        placeholder="Contact Number" 
                                        className="w-full bg-transparent border-b border-editorial-border/80 py-4 font-serif text-xl focus:outline-none focus:border-editorial-accent transition-colors placeholder:text-editorial-subtext"
                                        required
                                    />
                                    <div className="absolute bottom-0 left-0 w-0 h-px bg-editorial-accent transition-all duration-700 group-focus-within:w-full"></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {/* Service Selection */}
                                <div className="group relative">
                                    <select 
                                        className="w-full bg-transparent border-b border-editorial-border/80 py-4 font-serif text-lg focus:outline-none focus:border-editorial-accent transition-colors appearance-none cursor-pointer"
                                        required
                                    >
                                        <option value="" disabled selected>Reason for Consultation</option>
                                        <option value="high-risk">High Risk Obstetrics</option>
                                        <option value="fertility">Fertility Evaluation</option>
                                        <option value="gynaecology">General Gynaecology</option>
                                        <option value="laparoscopy">Laparoscopic Surgery</option>
                                        <option value="other">Other Inquiry</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none opacity-30 group-focus-within:opacity-100 transition-opacity">
                                        <span className="text-xs">▾</span>
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-0 h-px bg-editorial-accent transition-all duration-700 group-focus-within:w-full"></div>
                                </div>

                                {/* Date Preference */}
                                <div className="group relative">
                                    <input 
                                        type="text" 
                                        placeholder="Preferred Date (Optional)" 
                                        onFocus={(e) => e.target.type = 'date'}
                                        onBlur={(e) => {if(!e.target.value) e.target.type = 'text'}}
                                        className="w-full bg-transparent border-b border-editorial-border/80 py-4 font-serif text-lg focus:outline-none focus:border-editorial-accent transition-colors"
                                    />
                                    <div className="absolute bottom-0 left-0 w-0 h-px bg-editorial-accent transition-all duration-700 group-focus-within:w-full"></div>
                                </div>
                            </div>

                            {/* Message Area */}
                            <div className="group relative pt-4">
                                <textarea 
                                    rows="3" 
                                    placeholder="Brief Medical Insight or Inquiry" 
                                        className="w-full bg-transparent border-b border-editorial-border/80 py-4 font-serif text-lg focus:outline-none focus:border-editorial-accent transition-colors resize-none placeholder:text-editorial-subtext"
                                ></textarea>
                                <div className="absolute bottom-0 left-0 w-0 h-px bg-editorial-accent transition-all duration-700 group-focus-within:w-full"></div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6">
                                <button 
                                    type="submit" 
                                    className="group relative px-12 py-5 bg-editorial-secondary text-white overflow-hidden transition-all duration-500 hover:bg-editorial-accent"
                                >
                                    <div className="relative z-10 flex items-center gap-4">
                                        <span className="text-sm md:text-base font-medium tracking-wide">Request Consultation</span>
                                        <span className="group-hover:translate-x-2 transition-transform duration-500">→</span>
                                    </div>
                                    <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700"></div>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>



            </div>
        </section>
    );
};

export default Appointment;
