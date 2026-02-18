import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const headerRef = useRef(null);

    // Smooth scroll handler — uses Lenis if available, falls back to native
    const handleNavClick = useCallback((e, href) => {
        e.preventDefault();
        const targetId = href.replace('#', '');
        const target = document.getElementById(targetId);
        if (!target) return;

        setIsMenuOpen(false);

        // Try to use the global Lenis instance via the RAF ticker
        const lenis = window.__lenis;
        if (lenis) {
            lenis.scrollTo(target, {
                offset: -80,
                duration: 1.4,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
        } else {
            const headerHeight = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.5 } });
            
            tl.from('.nav-logo', { y: -50, opacity: 0 })
              .from('.nav-link', { y: -20, opacity: 0, stagger: 0.1 }, '-=1')
              .from('.nav-cta', { scale: 0.8, opacity: 0 }, '-=1.2');
        }, headerRef);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            ctx.revert();
        };
    }, []);

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Experience', href: '#experience' },
        { name: 'Expertise', href: '#expertise' },
        { name: 'Contact', href: '#contact' }
    ];

    return (
        <header ref={headerRef} className="relative z-[100]">
            {/* Main Navigation */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled ? 'py-2 sm:py-4' : 'py-4 sm:py-8'
            }`}>
                <div className={`mx-auto transition-all duration-500 ${
                    scrolled 
                        ? 'bg-editorial-bg/80 backdrop-blur-md shadow-sm rounded-full max-w-6xl px-4 sm:px-10 py-3 sm:py-4 flex justify-between items-center' 
                        : 'max-w-7xl px-4 sm:px-6 md:px-12 flex justify-between items-center'
                }`}>
                    
                    {/* Logo - Left */}
                    <a
                        href="#home"
                        onClick={(e) => handleNavClick(e, '#home')}
                        className="nav-logo font-serif text-base sm:text-xl md:text-2xl font-medium tracking-tight text-editorial-text truncate max-w-[180px] sm:max-w-none"
                    >
                        Dr. Kanaga Lakshmi
                    </a>
                    
                    {/* Nav Links - Center (hidden on mobile) */}
                    <ul className="hidden lg:flex items-center justify-center gap-8 xl:gap-10">
                        {navLinks.map((link) => (
                            <li key={link.name} className="nav-link">
                                <a
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className="text-[10px] font-bold tracking-[0.3em] uppercase text-editorial-text hover:text-editorial-accent transition-colors whitespace-nowrap"
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Right Side - CTA + Mobile Menu */}
                    <div className="flex items-center justify-end gap-2 sm:gap-4">
                        {/* Desktop CTA */}
                        <a
                            href="#appointment"
                            onClick={(e) => handleNavClick(e, '#appointment')}
                            className="nav-cta hidden md:block px-4 xl:px-6 py-1.5 xl:py-2 bg-editorial-text text-editorial-bg text-xs xl:text-sm font-medium rounded-full hover:bg-editorial-accent transition-colors whitespace-nowrap"
                        >
                            Book Appointment
                        </a>
                        
                    
                        
                        {/* Hamburger Menu Button */}
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden text-editorial-text p-2 -mr-2"
                            aria-label="Toggle menu"
                        >
                            <Menu size={scrolled ? 22 : 24} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-editorial-bg/95 backdrop-blur-md z-[60] flex flex-col pt-32 px-6 transition-transform duration-700 ease-in-out ${
                isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
                <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="absolute top-6 right-6 sm:top-8 sm:right-8 text-editorial-text p-2"
                    aria-label="Close menu"
                >
                    <X size={32} />
                </button>
                
                <div className="flex flex-col gap-6 sm:gap-8 items-center">
                    {navLinks.map((link) => (
                        <a 
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="text-3xl sm:text-4xl font-serif italic text-editorial-text hover:text-editorial-accent transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                    
                    {/* Mobile Menu Appointment Button */}
                    <a
                        href="#appointment"
                        onClick={(e) => handleNavClick(e, '#appointment')}
                        className="mt-8 px-8 py-4 bg-editorial-text text-editorial-bg text-sm font-medium rounded-full hover:bg-editorial-accent transition-colors"
                    >
                        Book Appointment
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;