import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/all';
import { ChevronDown, Award, Clock, Shield } from 'lucide-react';
import doctorimg from '../assets/image.png';

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
                filter: 'brightness(0.9)',
                borderRadius: '60% 40% 30% 70% / 40% 30% 70% 60%'
            });
            
            // Master timeline
            const tl = gsap.timeline({ 
                defaults: { ease: 'elegant' },
                delay: 0.2,
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
                { scale: 1, opacity: 0.05, rotation: 0, duration: 1.5, ease: "power2.out" }
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
                    duration: 1.4,
                    ease: "elastic.out(1, 0.7)"
                },
                '-=1.2'
            )
            // 3. Floating elements staggered
            .to('.hero-floating', {
                opacity: 1,
                scale: 1,
                stagger: 0.1,
                duration: 0.8,
                ease: "back.out(1.2)"
            }, '-=0.8')
            // 4. Content reveal
            .to('.hero-reveal', {
                opacity: 1,
                y: 0,
                stagger: 0.08,
                duration: 0.8,
                ease: "power3.out"
            }, '-=0.6')
            // 5. Scroll indicator
            .to('.scroll-indicator', {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out"
            }, '-=0.4');

            // Continuous floating animation for image
            gsap.to(imageRef.current, {
                y: -10,
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
                        y: i % 2 === 0 ? -12 : 12,
                        x: i % 3 === 0 ? 10 : -6,
                        rotation: i % 2 === 0 ? 6 : -6,
                        duration: 3 + i,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                        delay: 3 + i * 0.2
                    });
                }
            });

            // Mouse move parallax (disabled on mobile)
            let mouseEnabled = false;
            setTimeout(() => { mouseEnabled = true; }, 3000);

            const handleMouseMove = (e) => {
                if (!mouseEnabled || window.innerWidth < 1024) return;
                
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
        <section 
            ref={containerRef} 
            id="home" 
            className="relative w-full bg-editorial-bg overflow-hidden flex flex-col justify-center min-h-screen"
        >
            {/* 1. Abstract Background Pattern */}
            <div 
                ref={bgPatternRef}
                className="absolute inset-0 pointer-events-none z-0"
                style={{ willChange: 'transform' }}
            >
                <div className="absolute top-0 left-0 w-full h-full">
                    {/* Organic shapes in slightly darker beige tones */}
                    <div className="absolute top-[10%] left-[5%] w-48 sm:w-72 h-48 sm:h-72 rounded-full bg-editorial-accent/5 blur-3xl"></div>
                    <div className="absolute bottom-[20%] right-[5%] w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-editorial-charcoal/5 blur-3xl"></div>
                    <div className="absolute top-[40%] right-[20%] w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-editorial-accent/3 blur-3xl"></div>
                </div>
                {/* Grid overlay */}
                <div className="absolute inset-0 opacity-[0.03] text-editorial-charcoal" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
                    backgroundSize: '60px 60px'
                }}></div>
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 pt-24 sm:pt-32 pb-12 sm:pb-20">
                
                {/* Left Content */}
                <div className="w-full lg:w-3/5 text-left order-2 lg:order-1">
                    {/* Badge */}
                    <div className="hero-reveal inline-flex items-center gap-3 px-4 py-2 bg-white/60 backdrop-blur-sm border border-editorial-accent/20 rounded-full mb-8">
                        <span className="w-2 h-2 rounded-full bg-editorial-accent animate-pulse"></span>
                        <span className="text-xs md:text-[11px] font-bold tracking-[0.4em] uppercase text-editorial-charcoal">
                            Trusted by 15,000+ Patients
                        </span>
                    </div>

                    {/* Main Title */}
                    <h1 className="hero-title-main font-serif mb-4 md:mb-8 w-full">
                        <span className="block text-2xl sm:text-3xl md:text-5xl lg:text-5xl xl:text-5.5xl leading-tight text-editorial-accent">
                            Dr. K. Kanaga Lakshmi
                        </span>
                        <span className="block text-xl sm:text-2xl mt-4 md:mt-4 text-editorial-charcoal font-normal">
                            Consultant Obstetrician, Gynaecologist & Fertility Specialist
                        </span>
                    </h1>

                    {/* Description */}
                    <div className="hero-reveal max-w-2xl mb-12">
                        <p className="font-serif text-lg md:text-xl text-editorial-charcoal leading-relaxed italic">
                            "Delivering world-class surgical precision and uncompromising compassionate care. A distinguished legacy of over <span className="text-editorial-accent font-bold not-italic">10 years</span> dedicated to elevating women's health."
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="hero-reveal grid grid-cols-2 sm:grid-cols-3 gap-6 mb-12">
                        <div className="bg-white/40 backdrop-blur-sm p-6 rounded-2xl border border-editorial-border/40 hover:border-editorial-accent/30 transition-colors group">
                            <span className="block font-serif text-3xl font-bold text-editorial-charcoal group-hover:text-editorial-accent transition-colors">10+</span>
                            <span className="text-[11px] md:text-[10px] font-bold tracking-widest uppercase text-editorial-subtext mt-1 block">Years Experience</span>
                        </div>
                        <div className="bg-white/40 backdrop-blur-sm p-6 rounded-2xl border border-editorial-border/40 hover:border-editorial-accent/30 transition-colors group">
                            <span className="block font-serif text-3xl font-bold text-editorial-charcoal group-hover:text-editorial-accent transition-colors">15k+</span>
                            <span className="text-[11px] md:text-[10px] font-bold tracking-widest uppercase text-editorial-subtext mt-1 block">Deliveries</span>
                        </div>
                        <div className="col-span-2 sm:col-span-1 bg-editorial-accent/10 p-6 rounded-2xl border border-editorial-accent/20">
                            <span className="block font-serif text-lg font-bold text-editorial-accent leading-tight">MS OG · MRCOG (UK)</span>
                            <span className="text-[11px] md:text-[10px] font-bold tracking-widest uppercase text-editorial-subtext mt-1 block">Clinical Excellence</span>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="hero-reveal flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                        <a 
                            href="#appointment"
                            onClick={(e) => handleNavClick(e, '#appointment')}
                            className="group relative px-10 py-5 bg-editorial-charcoal text-white text-xs md:text-[11px] font-bold tracking-[0.3em] uppercase transition-all duration-500 hover:bg-editorial-accent overflow-hidden text-center rounded-lg"
                        >
                            <span className="relative z-10">Schedule Consultation</span>
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                        </a>
                        <a 
                            href="#about"
                            onClick={(e) => handleNavClick(e, '#about')}
                            className="px-10 py-5 border-2 border-editorial-charcoal/10 text-editorial-charcoal text-xs md:text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-editorial-charcoal hover:text-white transition-all duration-300 text-center rounded-lg"
                        >
                            Explore Profile
                        </a>
                    </div>
                </div>

                {/* Right Content - Visual Centerpiece */}
                <div className="w-full lg:w-2/5 flex justify-center items-center order-1 lg:order-2 relative">
                    {/* Floating elements with subtle colors */}
                    <div 
                        ref={el => floatingElementsRef.current[0] = el}
                        className="hero-floating absolute -top-8 -left-8 w-20 h-20 bg-editorial-accent/10 rounded-full backdrop-blur-sm border border-editorial-accent/20 flex items-center justify-center z-20 shadow-xl"
                    >
                        <Award size={32} className="text-editorial-accent" />
                    </div>
                    
                    <div 
                        ref={el => floatingElementsRef.current[1] = el}
                        className="hero-floating absolute -bottom-10 right-0 w-24 h-24 bg-white/60 backdrop-blur-sm rounded-full border border-editorial-border/40 flex items-center justify-center z-20 shadow-xl"
                    >
                        <Shield size={36} className="text-editorial-charcoal/60" />
                    </div>
                    
                    <div 
                        ref={el => floatingElementsRef.current[2] = el}
                        className="hero-floating absolute top-1/2 -right-12 w-16 h-16 bg-editorial-charcoal/5 rounded-full backdrop-blur-sm border border-editorial-charcoal/10 flex items-center justify-center z-20"
                    >
                        <Clock size={24} className="text-editorial-charcoal/40" />
                    </div>

                    {/* Main Image with Organic Frame */}
                    <div className="relative w-full max-w-md lg:max-w-none">
                        <div className="absolute -inset-8 border-2 border-editorial-accent/10 rounded-[60%_40%_30%_70%/40%_30%_70%_60%] animate-pulse"></div>
                        <div className="absolute -inset-12 border border-editorial-accent/5 rounded-[50%_50%_40%_60%/60%_40%_50%_50%]"></div>
                        
                        <div 
                            ref={imageRef}
                            className="relative aspect-[4/5] overflow-hidden shadow-2xl bg-gradient-to-br from-editorial-accent/25 via-rose-100/40 to-amber-50"
                            style={{ 
                                borderRadius: '60% 40% 30% 70% / 40% 30% 70% 60%',
                                willChange: 'transform, border-radius'
                            }}
                        >
                            <img 
                                src={doctorimg}
                                alt="Dr. Kanaga Lakshmi" 
                                className="w-full h-full object-cover object-center scale-105 hover:scale-115 transition-transform duration-[10s]"
                                loading="eager"
                            />
                            
                            {/* Sophisticated overlays */}
                            <div className="absolute inset-0 bg-gradient-to-t from-editorial-charcoal/40 via-transparent to-transparent"></div>
                            <div className="absolute inset-0 bg-editorial-accent/5 mix-blend-overlay"></div>
                        </div>
                    </div>
                </div>
            </div>

      

            {/* Background Text Layer */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
                <span className="font-serif text-[40vw] font-black leading-none text-editorial-charcoal opacity-[0.02] whitespace-nowrap">
                    EXCELLENCE
                </span>
            </div>
        </section>
    );
};

export default Hero;