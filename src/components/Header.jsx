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
        // Lenis attaches itself to window.__lenis in App.jsx
        const lenis = window.__lenis;
        if (lenis) {
            lenis.scrollTo(target, {
                offset: -80, // account for fixed header height
                duration: 1.4,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
        } else {
            // Native smooth scroll fallback
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
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
                <div className={`mx-auto px-6 md:px-12 transition-all duration-500 ${scrolled ? 'bg-editorial-bg/80 backdrop-blur-md shadow-sm rounded-full max-w-6xl px-10 py-4 grid grid-cols-3 items-center' : 'max-w-7xl flex justify-between items-center'}`}>
                    
                    {/* Col 1: Logo (left) */}
                    <a
                        href="#home"
                        onClick={(e) => handleNavClick(e, '#home')}
                        className="nav-logo font-serif text-xl md:text-2xl font-medium tracking-tight text-editorial-text"
                    >
                        Dr. Kanaga Lakshmi
                    </a>
                    
                    {/* Col 2: Nav Links (center) */}
                    <ul className="hidden lg:flex items-center justify-center gap-10">
                        {navLinks.map((link) => (
                            <li key={link.name} className="nav-link">
                                <a
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className="text-[10px] font-bold tracking-[0.3em] uppercase text-editorial-text hover:text-editorial-accent transition-colors"
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Col 3: CTA + Mobile Menu (right) */}
                    <div className="flex items-center justify-end gap-4">
                        <a
                            href="#appointment"
                            onClick={(e) => handleNavClick(e, '#appointment')}
                            className="nav-cta hidden md:block px-6 py-2 bg-editorial-text text-editorial-bg text-sm font-medium rounded-full hover:bg-editorial-accent transition-colors"
                        >
                            Book Appointment
                        </a>
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden text-editorial-text"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-editorial-bg z-[60] flex flex-col pt-32 px-6 transition-transform duration-700 cubic-bezier(0.7, 0, 0.3, 1) ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="absolute top-8 right-8 text-editorial-text"
                >
                    <X size={32} />
                </button>
                <div className="flex flex-col gap-8 items-center">
                    {navLinks.map((link) => (
                        <a 
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="text-4xl font-serif italic text-editorial-text hover:text-editorial-accent transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>
        </header>
    );
};

export default Header;
