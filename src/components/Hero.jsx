import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/all';
import { ChevronDown, Award, Clock, Shield } from 'lucide-react';

gsap.registerPlugin(CustomEase);

const Hero = () => {
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const bgPatternRef = useRef(null);
    const floatingElementsRef = useRef([]);

    useEffect(() => {
        // Store original overflow
        const originalOverflow = document.body.style.overflow;
        const originalHeight = document.body.style.height;
        
        // Prevent scrolling during animation
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';
        
        // Ensure we're at the absolute top
        window.scrollTo(0, 0);
        
        // Disable scroll restoration
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }

        const ctx = gsap.context(() => {
            // Create custom eases
            CustomEase.create("premium", "0.23, 1, 0.32, 1");
            CustomEase.create("elegant", "0.87, 0, 0.13, 1");

            // Initial states
            gsap.set('.hero-reveal', { opacity: 0, y: 30 });
            gsap.set('.hero-parallax', { opacity: 0 });
            gsap.set(imageRef.current, { 
                scale: 1.1,
                filter: 'brightness(0.8)',
                borderRadius: '60% 40% 30% 70% / 40% 30% 70% 60%'
            });
            
            // Master timeline
            const tl = gsap.timeline({ 
                defaults: { ease: 'elegant' },
                delay: 0.3,
                onComplete: () => {
                    document.body.style.overflow = originalOverflow;
                    document.body.style.height = originalHeight;
                    
                    if ('scrollRestoration' in history) {
                        history.scrollRestoration = 'auto';
                    }
                    
                    gsap.set(imageRef.current, { 
                        clearProps: 'filter,scale',
                        borderRadius: '60% 40% 30% 70% / 40% 30% 70% 60%'
                    });
                }
            });

            // 1. Background pattern animation
            tl.fromTo(bgPatternRef.current,
                { scale: 1.5, opacity: 0, rotation: 10 },
                { scale: 1, opacity: 0.03, rotation: 0, duration: 2.5, ease: "power2.out" }
            )
            // 2. Image reveal with organic morph
            .fromTo(imageRef.current,
                { 
                    scale: 1.3, 
                    opacity: 0,
                    borderRadius: '80% 20% 50% 50% / 30% 50% 50% 70%'
                },
                { 
                    scale: 1, 
                    opacity: 1,
                    borderRadius: '60% 40% 30% 70% / 40% 30% 70% 60%',
                    duration: 2.2,
                    ease: "elastic.out(1, 0.5)"
                },
                '-=2'
            )
            // 3. Floating elements staggered
            .to('.hero-floating', {
                opacity: 1,
                scale: 1,
                stagger: 0.15,
                duration: 1.2,
                ease: "back.out(1.2)"
            }, '-=1')
            // 4. Content reveal
            .to('.hero-reveal', {
                opacity: 1,
                y: 0,
                stagger: 0.1,
                duration: 1.2,
                ease: "power3.out"
            }, '-=0.8')
            // 5. Scroll indicator
            .to('.scroll-indicator', {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out"
            }, '-=0.5');

            // Continuous floating animation for image
            gsap.to(imageRef.current, {
                y: -15,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 3
            });

            // Floating elements continuous animation
            floatingElementsRef.current.forEach((el, i) => {
                if (el) {
                    gsap.to(el, {
                        y: i % 2 === 0 ? -10 : 10,
                        x: i % 3 === 0 ? 10 : -5,
                        rotation: i % 2 === 0 ? 5 : -5,
                        duration: 3 + i,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                        delay: 3 + i * 0.2
                    });
                }
            });

            // Mouse move parallax
            let mouseEnabled = false;
            setTimeout(() => { mouseEnabled = true; }, 3000);

            const handleMouseMove = (e) => {
                if (!mouseEnabled) return;
                
                const { clientX, clientY } = e;
                const { innerWidth, innerHeight } = window;
                const x = (clientX / innerWidth - 0.5) * 2;
                const y = (clientY / innerHeight - 0.5) * 2;

                gsap.to(imageRef.current, {
                    x: x * 15,
                    y: y * 15,
                    rotationY: x * 5,
                    rotationX: -y * 5,
                    duration: 1.2,
                    overwrite: true
                });

                gsap.to('.hero-title-main', {
                    x: x * 20,
                    y: y * 20,
                    duration: 1.5,
                    overwrite: true
                });

                gsap.to('.hero-floating', {
                    x: (i) => -x * (10 + i * 5),
                    y: (i) => -y * (10 + i * 5),
                    duration: 2,
                    overwrite: true,
                    stagger: 0.02
                });
            };

            window.addEventListener('mousemove', handleMouseMove);
            return () => window.removeEventListener('mousemove', handleMouseMove);
        }, containerRef);

        return () => {
            ctx.revert();
            document.body.style.overflow = originalOverflow;
            document.body.style.height = originalHeight;
            if ('scrollRestoration' in history) {
                history.scrollRestoration = 'auto';
            }
        };
    }, []);

    return (
        <section 
            ref={containerRef} 
            id="home" 
            className="relative w-full bg-editorial-silk overflow-hidden flex flex-col items-center justify-center"
            style={{ 
                minHeight: '100vh',
                height: '100vh',
                maxHeight: '100vh',
                position: 'relative',
                marginTop: 0,
                paddingTop: 0
            }}
        >
            {/* 1. Abstract Background Pattern */}
            <div 
                ref={bgPatternRef}
                className="absolute inset-0 pointer-events-none z-0"
                style={{ willChange: 'transform' }}
            >
                <div className="absolute top-0 left-0 w-full h-full">
                    {/* Organic shapes */}
                    <div className="absolute top-[10%] left-[5%] w-72 h-72 rounded-full bg-editorial-accent/5 blur-3xl"></div>
                    <div className="absolute bottom-[20%] right-[5%] w-96 h-96 rounded-full bg-editorial-text/5 blur-3xl"></div>
                    <div className="absolute top-[40%] right-[20%] w-64 h-64 rounded-full bg-editorial-accent/3 blur-3xl"></div>
                </div>
                {/* Grid overlay */}
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }}></div>
            </div>

            {/* 2. Main Content Container - Vertically centered */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-16 py-8 lg:py-0">
                
                {/* Left Content */}
                <div className="w-full lg:w-1/2 text-left order-2 lg:order-1">
                    {/* Badge */}
                    <div className="hero-reveal inline-flex items-center gap-3 px-4 py-2 bg-white/40 backdrop-blur-sm border border-editorial-accent/20 rounded-full mb-4 sm:mb-6">
                        <span className="w-2 h-2 rounded-full bg-editorial-accent animate-pulse"></span>
                        <span className="text-[8px] sm:text-[10px] font-bold tracking-[0.3em] uppercase text-editorial-subtext">
                            Welcoming New Patients
                        </span>
                    </div>

                    {/* Main Title */}
                    <h1 className="hero-title-main font-serif mb-4 sm:mb-6">
                        <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.9] text-editorial-text tracking-tighter">
                            Dr. Kanaga
                        </span>
                        <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.9] text-editorial-accent italic mt-1 sm:mt-2">
                            Lakshmi
                        </span>
                    </h1>

                    {/* Description */}
                    <div className="hero-reveal max-w-xl mb-6 sm:mb-8">
                        <p className="font-serif italic text-sm sm:text-base md:text-lg lg:text-xl text-editorial-subtext/90 leading-relaxed">
                            "Where advanced medical expertise meets compassionate care — 
                            <span className="text-editorial-accent"> 10+ years</span> of excellence in women's health"
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="hero-reveal grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                        <div className="bg-white/40 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-editorial-border/40">
                            <span className="block font-serif text-xl sm:text-2xl font-bold text-editorial-text">10+</span>
                            <span className="text-[7px] sm:text-[8px] font-bold tracking-widest uppercase text-editorial-subtext">Years Experience</span>
                        </div>
                        <div className="bg-white/40 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-editorial-border/40">
                            <span className="block font-serif text-xl sm:text-2xl font-bold text-editorial-text">5k+</span>
                            <span className="text-[7px] sm:text-[8px] font-bold tracking-widest uppercase text-editorial-subtext">Happy Patients</span>
                        </div>
                        <div className="col-span-2 sm:col-span-1 bg-editorial-accent/10 p-3 sm:p-4 rounded-xl border border-editorial-accent/20">
                            <span className="block font-serif text-base sm:text-lg font-bold text-editorial-accent mb-1">MS OG · MRCOG</span>
                            <span className="text-[7px] sm:text-[8px] font-bold tracking-widest uppercase text-editorial-subtext">Credentials</span>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="hero-reveal flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                        <a 
                            href="#appointment"
                            className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-editorial-text text-white text-[10px] sm:text-[11px] font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase transition-all duration-500 hover:bg-editorial-accent overflow-hidden text-center"
                        >
                            <span className="relative z-10">Schedule Consultation</span>
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                        </a>
                        <a 
                            href="#about"
                            className="px-6 sm:px-8 py-3 sm:py-4 border border-editorial-text/20 text-editorial-text text-[10px] sm:text-[11px] font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase hover:bg-editorial-text/5 transition-all duration-300 text-center"
                        >
                            Learn More
                        </a>
                    </div>
                </div>

                {/* Right Content - Visual Centerpiece */}
                <div className="w-full lg:w-1/2 flex justify-center items-center order-1 lg:order-2 relative">
                    {/* Floating Elements */}
                    <div 
                        ref={el => floatingElementsRef.current[0] = el}
                        className="hero-floating absolute -top-2 sm:-top-4 -left-2 sm:-left-4 w-12 sm:w-16 h-12 sm:h-16 bg-editorial-accent/10 rounded-full backdrop-blur-sm border border-editorial-accent/20 flex items-center justify-center z-20"
                    >
                        <Award size={20} className="sm:w-6 sm:h-6 text-editorial-accent" />
                    </div>
                    
                    <div 
                        ref={el => floatingElementsRef.current[1] = el}
                        className="hero-floating absolute -bottom-2 sm:-bottom-4 right-2 sm:right-4 w-14 sm:w-20 h-14 sm:h-20 bg-white/60 backdrop-blur-sm rounded-full border border-editorial-border/40 flex items-center justify-center z-20"
                    >
                        <Shield size={22} className="sm:w-7 sm:h-7 text-editorial-text/60" />
                    </div>
                    
                    <div 
                        ref={el => floatingElementsRef.current[2] = el}
                        className="hero-floating absolute top-1/2 -right-4 sm:-right-8 w-10 sm:w-14 h-10 sm:h-14 bg-editorial-text/5 rounded-full backdrop-blur-sm border border-editorial-text/10 flex items-center justify-center z-20"
                    >
                        <Clock size={16} className="sm:w-5 sm:h-5 text-editorial-text/40" />
                    </div>

                    {/* Main Image with Organic Frame */}
                    <div className="relative w-[65vw] max-w-[260px] sm:max-w-[300px] lg:max-w-none lg:w-[28vw]">
                        {/* Decorative rings */}
                        <div className="absolute -inset-3 sm:-inset-4 lg:-inset-6 border-2 border-editorial-accent/10 rounded-[60%_40%_30%_70%/40%_30%_70%_60%] animate-pulse"></div>
                        <div className="absolute -inset-5 sm:-inset-6 lg:-inset-10 border border-editorial-accent/5 rounded-[50%_50%_40%_60%/60%_40%_50%_50%]"></div>
                        
                        {/* Image Container */}
                        <div 
                            ref={imageRef}
                            className="relative aspect-[3/4] overflow-hidden shadow-2xl"
                            style={{ 
                                borderRadius: '60% 40% 30% 70% / 40% 30% 70% 60%',
                                willChange: 'transform, border-radius'
                            }}
                        >
                            <img 
                                src="https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=1887&auto=format&fit=crop" 
                                alt="Dr. Kanaga Lakshmi" 
                                className="w-full h-full object-cover object-center scale-110 hover:scale-125 transition-transform duration-7000"
                                loading="eager"
                            />
                            
                            {/* Gradient Overlays */}
                            <div className="absolute inset-0 bg-gradient-to-t from-editorial-text/30 via-transparent to-transparent"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-editorial-accent/10 via-transparent to-transparent"></div>
                            
                            {/* Corner Accents */}
                            <div className="absolute top-2 sm:top-4 left-2 sm:left-4 w-6 sm:w-12 h-6 sm:h-12 border-t-2 border-l-2 border-white/30"></div>
                            <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-6 sm:w-12 h-6 sm:h-12 border-b-2 border-r-2 border-white/30"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator - Positioned absolutely at bottom */}
            <div className="scroll-indicator absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 sm:gap-2 opacity-0 translate-y-4 z-20">
                <span className="text-[7px] sm:text-[8px] font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-editorial-subtext">Scroll</span>
                <ChevronDown size={16} className="sm:w-5 sm:h-5 text-editorial-subtext animate-bounce" />
            </div>

            {/* Background Text Layer */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
                <span className="font-serif text-[40vw] font-bold leading-none text-editorial-text opacity-[0.02] whitespace-nowrap">
                    KANAGA
                </span>
            </div>
        </section>
    );
};

export default Hero;