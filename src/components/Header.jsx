import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { Menu, X, ArrowRight } from 'lucide-react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const headerRef = useRef(null);
    const menuLinksRef = useRef([]);

    // Smooth scroll handler
    const handleNavClick = useCallback((e, href) => {
        e.preventDefault();
        const targetId = href.replace('#', '');
        const target = document.getElementById(targetId);
        if (!target) return;

        setIsMenuOpen(false);

        // Try to use the global Lenis instance
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
    }, []);

    // Prevent scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isMenuOpen]);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.5 } });
            
            tl.fromTo('.nav-container', 
                { y: -100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, clearProps: "all" }
            )
            .fromTo('.nav-logo', 
                { x: -20, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8, clearProps: "all" }, 
                '-=0.8'
            )
            .fromTo('.nav-link', 
                { y: -10, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, clearProps: "all" }, 
                '-=0.6'
            )
            .fromTo('.nav-cta', 
                { y: 20, opacity: 0.01 },
                { y: 0, opacity: 1, duration: 1, clearProps: "all" }, 
                '-=0.8'
            );
            
        }, headerRef);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            ctx.revert();
            document.body.style.overflow = '';
        };
    }, []);

    // Staggered menu animation
    useEffect(() => {
        if (isMenuOpen) {
            gsap.fromTo('.mobile-link', 
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out', delay: 0.3 }
            );
        }
    }, [isMenuOpen]);

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Timeline', href: '#experience' },
        { name: 'Expertise', href: '#expertise' },
        { name: 'Testimonials', href: '#testimonials' },
        { name: 'Contact', href: '#contact' }
    ];

    return (
        <header ref={headerRef} className="fixed top-0 left-0 right-0 z-[100]">
            <nav 
                className={`nav-container w-full transition-all duration-500 ease-in-out ${
                    scrolled 
                        ? 'bg-editorial-bg/95 backdrop-blur-md shadow-sm border-b border-editorial-border/20 py-3' 
                        : 'bg-transparent py-4 lg:py-8'
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 flex justify-between items-center">
                    
                    {/* Logo */}
                    <a
                        href="#home"
                        onClick={(e) => handleNavClick(e, '#home')}
                        className="nav-logo flex items-center group shrink-0"
                    >
                        <div className="flex flex-col">
                            <span className={`font-serif text-sm sm:text-base md:text-xl font-bold tracking-tight leading-none text-editorial-heading whitespace-nowrap`}>
                                Dr. K. Kanaga Lakshmi
                            </span>

                        </div>
                    </a>

                    {/* Desktop Navigation */}
                    <ul className="hidden lg:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <li key={link.name} className="nav-link relative group">
                                <a
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className="text-[14px] font-semibold tracking-widest text-editorial-subtext hover:text-editorial-charcoal transition-colors py-2"
                                >
                                    {link.name}
                                </a>
                                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-editorial-accent transition-all duration-300 group-hover:w-full"></span>
                            </li>
                        ))}
                    </ul>

                    {/* Right Side: Desktop CTA & Mobile Toggle */}
                    <div className="flex items-center gap-6 sm:gap-8">
                        {/* Desktop-only Appointment CTA */}
                        <div className="hidden lg:flex items-center">
                            <a
                                href="#appointment"
                                onClick={(e) => handleNavClick(e, '#appointment')}
                                className="px-6 py-2.5 bg-editorial-secondary text-white text-xs md:text-sm font-medium tracking-wide hover:bg-editorial-accent transition-all duration-500 rounded-full border border-editorial-secondary/30 hover:shadow-lg active:scale-95"
                            >
                                Book Appointment
                            </a>
                        </div>

                        {/* Mobile Toggle (Hidden on Desktop) */}
                        <div className="lg:hidden flex items-center">
                            <button 
                                onClick={() => setIsMenuOpen(true)}
                                className="p-1.5 text-editorial-charcoal hover:text-editorial-accent transition-all duration-300 flex items-center gap-2 group"
                                aria-label="Open menu"
                            >
                                <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:block text-editorial-subtext">Menu</span>
                                <div className="w-10 h-10 rounded-full border border-editorial-border/20 flex items-center justify-center group-hover:bg-editorial-accent group-hover:text-white transition-all duration-500">
                                    <Menu size={20} strokeWidth={1.5} />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Sidebar Navigation Panel */}
            <div 
                className={`fixed inset-0 z-[120] pointer-events-none ${isMenuOpen ? 'pointer-events-auto' : ''}`}
            >
                {/* Backdrop */}
                <div 
                    className={`absolute inset-0 bg-editorial-charcoal/40 backdrop-blur-sm transition-opacity duration-700 ease-out ${
                        isMenuOpen ? 'opacity-100' : 'opacity-0'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                ></div>

                {/* Vertical Panel */}
                <div 
                    className={`absolute top-0 right-0 h-screen w-full sm:max-w-[480px] bg-editorial-bg shadow-[-20px_0_60px_rgba(0,0,0,0.1)] transition-transform duration-700 ease-[cubic-bezier(0.8,0,0.2,1)] ${
                        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                    {/* Header Area - Matched with Main Header Logo */}
                    <div
                        className="flex justify-between items-center p-8 sm:p-12 border-b border-editorial-border/10"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <div className="flex flex-col">
                            <span className="font-serif text-base sm:text-lg font-bold tracking-tight text-editorial-charcoal leading-none">Dr. K. Kanaga Lakshmi</span>
                            <span className="text-[10px] uppercase tracking-widest text-editorial-accent mt-1 font-bold">Obstetrician and Gynaecologist</span>
                        </div>
                        <button 
                            onClick={() => setIsMenuOpen(false)}
                            className="w-12 h-12 rounded-full border border-editorial-border/20 flex items-center justify-center text-editorial-charcoal hover:bg-editorial-accent hover:text-white transition-all duration-500 group"
                            aria-label="Close menu"
                        >
                            <X size={20} strokeWidth={1.5} className="group-hover:rotate-90 transition-transform duration-500" />
                        </button>
                    </div>

                    {/* Navigation Content */}
                    <div className="flex flex-col h-[calc(100vh-140px)] justify-between p-8 sm:p-12">
                        {/* Main Links */}
                        <nav className="space-y-6 sm:space-y-8 mt-4">
                            {navLinks.map((link, i) => (
                                <div key={link.name} className="overflow-hidden group">
                                    <a 
                                        href={link.href}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        className="mobile-link block group flex items-baseline gap-6"
                                    >
                                        <span className="text-xs font-sans font-bold tracking-[0.3em] text-editorial-accent transition-colors duration-300">0{i + 1}</span>
                                        <span className="font-serif text-5xl sm:text-6xl font-medium text-editorial-charcoal group-hover:text-editorial-accent transition-all duration-500 transform group-hover:translate-x-2 inline-block">
                                            {link.name}
                                        </span>
                                    </a>
                                </div>
                            ))}
                        </nav>

                        {/* Sidebar Footer */}
                        <div className="pt-10 border-t border-editorial-border/10">
                            <div className="mobile-link">
                                <a
                                    href="#appointment"
                                    onClick={(e) => handleNavClick(e, '#appointment')}
                                    className="flex items-center justify-between group bg-editorial-secondary text-white p-6 rounded-2xl hover:bg-editorial-accent transition-all duration-500 shadow-xl"
                                >
                                    <span className="text-sm font-medium tracking-wide flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-editorial-accent"></div>
                                        Request Consultation
                                    </span>
                                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
