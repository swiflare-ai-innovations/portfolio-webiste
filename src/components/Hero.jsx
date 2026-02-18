import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/all';

gsap.registerPlugin(CustomEase);

const Hero = () => {
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const titleRef = useRef(null);
    const bgTextRef = useRef(null);

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
            // Create custom ease
            CustomEase.create("premium", "0.23, 1, 0.32, 1");

            // Initial states - ensure everything starts hidden
            gsap.set('.hero-reveal', { 
                opacity: 0,
                y: 0 // Ensure no y-offset
            });
            
            gsap.set(bgTextRef.current, { 
                opacity: 0, 
                scale: 0.8 
            });
            
            // Set image initial state
            gsap.set(imageRef.current, { 
                clipPath: 'inset(0 100% 0 0)',
                scale: 1.2,
                x: 0,
                y: 0
            });

            // Master timeline
            const tl = gsap.timeline({ 
                defaults: { ease: 'premium' },
                delay: 0.3,
                onComplete: () => {
                    // Re-enable scrolling after animation completes
                    document.body.style.overflow = originalOverflow;
                    document.body.style.height = originalHeight;
                    
                    // Restore scroll restoration
                    if ('scrollRestoration' in history) {
                        history.scrollRestoration = 'auto';
                    }
                    
                    // Clean up GSAP props
                    gsap.set(imageRef.current, { 
                        clearProps: 'clipPath,scale,x,y,rotationX,rotationY' 
                    });
                }
            });

            // Animation sequence
            tl.fromTo(bgTextRef.current, 
                { opacity: 0, scale: 0.9 },
                { opacity: 0.05, scale: 1, duration: 1.5 }
            )
            .fromTo(imageRef.current,
                { clipPath: 'inset(0 100% 0 0)', scale: 1.2 },
                { 
                    clipPath: 'inset(0 0% 0 0)', 
                    scale: 1, 
                    duration: 2.2,
                    ease: "power3.out"
                },
                '-=1.5'
            )
            .to('.hero-reveal', {
                opacity: 1,
                stagger: 0.08,
                duration: 1,
                ease: "power2.out",
                clearProps: 'opacity'
            }, '-=0.8');

            // Mouse move effect (only after animation completes)
            let mouseEnabled = false;
            
            // Enable mouse effects after main animation
            setTimeout(() => {
                mouseEnabled = true;
            }, 3000);

            const handleMouseMove = (e) => {
                if (!mouseEnabled) return;
                
                const { clientX, clientY } = e;
                const { innerWidth, innerHeight } = window;
                
                // Calculate normalized mouse position (-1 to 1)
                const x = (clientX / innerWidth - 0.5) * 2;
                const y = (clientY / innerHeight - 0.5) * 2;
                
                // Apply subtle parallax effects
                gsap.to(imageRef.current, {
                    x: x * 10,
                    y: y * 10,
                    rotationY: x * 3,
                    rotationX: -y * 3,
                    duration: 1.2,
                    overwrite: true,
                    ease: "power2.out"
                });

                gsap.to(bgTextRef.current, {
                    x: -x * 20,
                    y: -y * 20,
                    duration: 2,
                    overwrite: true,
                    ease: "power2.out"
                });

                gsap.to('.hero-title-main', {
                    x: x * 8,
                    y: y * 8,
                    duration: 1.5,
                    overwrite: true,
                    ease: "power2.out"
                });
            };

            window.addEventListener('mousemove', handleMouseMove);
            
            // Cleanup function for this context
            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
            };
        }, containerRef);

        // Cleanup function for useEffect
        return () => {
            ctx.revert();
            
            // Restore body styles
            document.body.style.overflow = originalOverflow;
            document.body.style.height = originalHeight;
            
            // Restore scroll restoration
            if ('scrollRestoration' in history) {
                history.scrollRestoration = 'auto';
            }
            
            // Kill any remaining GSAP animations
            gsap.killTweensOf([imageRef.current, bgTextRef.current, '.hero-title-main', '.hero-reveal']);
        };
    }, []);

    return (
        <section 
            ref={containerRef} 
            id="home" 
            className="relative w-full bg-editorial-silk overflow-hidden flex flex-col items-center pt-40 md:pt-32 pb-8 md:pb-12 "
            style={{ 
                minHeight: '100vh',
                height: '100vh',
                maxHeight: '100vh',
                position: 'relative',
                top: 0,
                left: 0
            }}
        >
            {/* 1. LAYER: BACK - Minimalist Initial Asset */}
            <div 
                ref={bgTextRef} 
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
                style={{ willChange: 'transform, opacity' }}
            >
                <span className="font-serif text-[60vw] leading-none text-editorial-text opacity-[0.03] italic">
                    K
                </span>
            </div>

            {/* 2. LAYER: MID - The Portrait with Floating Frame */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-20 lg:gap-32 h-full">
                
                {/* Left Side: Editorial Content */}
                <div className="w-full md:w-1/2 flex flex-col items-start text-left order-2 md:order-1 mt-4 md:mt-0">
                    <div className="hero-reveal space-y-2 mb-4 md:mb-8">
                        <div className="flex items-center gap-3">
                            <span className="w-8 h-[1px] bg-editorial-accent"></span>
                            <p className="text-[10px] font-bold tracking-[0.4em] uppercase">Obstetrician & Gynaecologist</p>
                        </div>
                        <h1 className="hero-title-main font-serif text-5xl sm:text-6xl md:text-[7rem] leading-[0.9] text-editorial-text tracking-tighter">
                            Dr. Kanaga <br />
                            <span className="italic text-editorial-accent ml-[5%]">Lakshmi</span>
                        </h1>
                    </div>

                    <div className="hero-reveal max-w-sm">
                        <p className="font-serif italic text-base md:text-xl text-editorial-subtext leading-relaxed border-l-2 border-editorial-accent/30 pl-6 py-2">
                            "Specializing in High Risk Obstetrics and Fertility with over 10 years of dedicated clinical experience."
                        </p>
                    </div>

                    <div className="hero-reveal mt-6 md:mt-12 flex items-center gap-8">
                        <a href="#appointment" className="group relative px-8 py-4 bg-editorial-text text-white text-[11px] font-bold tracking-[0.3em] uppercase transition-all duration-300 hover:bg-editorial-accent overflow-hidden">
                            <span className="relative z-10">Book Consultation</span>
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                        </a>
                        <div className="hidden lg:flex flex-col gap-1">
                            <span className="text-[9px] font-bold uppercase tracking-widest">Credentials</span>
                            <span className="text-[10px] text-editorial-subtext font-serif italic">MS OG · MRCOG (UK)</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Visual Centerpiece */}
                <div className="w-full md:w-[45%] flex justify-center order-1 md:order-2 flex-shrink-0">
                    <div className="relative group">
                        {/* Decorative Frames */}
                        <div className="absolute -inset-4 border border-editorial-accent/20 rounded-t-full -z-10 transition-transform duration-700 group-hover:scale-105"></div>
                        <div className="absolute -inset-8 border border-editorial-accent/10 rounded-t-full -z-10 transition-transform duration-1000 group-hover:scale-110"></div>
                        
                        {/* Main Image Container */}
                        <div 
                            ref={imageRef} 
                            className="relative w-[52vw] max-w-[240px] md:max-w-none md:w-[28vw] aspect-[3/4.2] rounded-t-full overflow-hidden bg-editorial-bg"
                            style={{ willChange: 'transform, clip-path' }}
                        >
                            <img 
                                src="https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=1887&auto=format&fit=crop" 
                                alt="Dr. Kanaga Lakshmi" 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="eager"
                            />
                            {/* Cinematic Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-editorial-text/20 via-transparent to-transparent"></div>
                            <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-t-full"></div>
                        </div>

                  
                    </div>
                </div>
            </div>

            {/* 3. LAYER: FRONT - Floating Grid/Texture */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/noise-lines.png')] z-30"></div>
        </section>
    );
};

export default Hero;