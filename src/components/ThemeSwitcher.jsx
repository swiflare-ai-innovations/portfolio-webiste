import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { Palette, Check } from 'lucide-react';

const themes = [
    { id: 'beige', name: 'Editorial Beige', bg: '#FDFBF7', accent: '#C5A059' },
    { id: 'blue', name: 'Pristine Blue', bg: '#FFFFFF', accent: '#2563EB' },
    { id: 'sage', name: 'Modern Sage', bg: '#F2F4F2', accent: '#4A675D' }
];

const ThemeSwitcher = () => {
    const [currentTheme, setCurrentTheme] = useState('beige');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('doctor-portfolio-theme') || 'beige';
        setCurrentTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);

        gsap.fromTo('.theme-switcher-btn', 
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1, delay: 2, ease: 'back.out(1.7)' }
        );
    }, []);

    const toggleTheme = (themeId) => {
        setCurrentTheme(themeId);
        document.documentElement.setAttribute('data-theme', themeId);
        localStorage.setItem('doctor-portfolio-theme', themeId);
        setIsOpen(false);
    };

    return (
        <div className="fixed bottom-8 right-8 z-[150] flex flex-col items-end gap-4">
            {/* Theme Options */}
            <div className={`flex flex-col gap-3 transition-all duration-500 transform ${
                isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-90 pointer-events-none'
            }`}>
                {themes.map((theme) => (
                    <button
                        key={theme.id}
                        onClick={() => toggleTheme(theme.id)}
                        className="group flex items-center gap-3 bg-white/90 backdrop-blur-md p-2 pr-4 rounded-full shadow-lg border border-editorial-border/30 hover:border-editorial-accent transition-all duration-300"
                    >
                        <div 
                            className="w-10 h-10 rounded-full border border-editorial-border/30 flex items-center justify-center transition-all duration-500 shadow-sm relative overflow-hidden group-hover:scale-110"
                            style={{ 
                                background: `linear-gradient(135deg, ${theme.bg} 50%, ${theme.accent} 50%)`
                            }}
                        >
                            {currentTheme === theme.id && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[2px]">
                                    <Check size={16} className="text-white drop-shadow-md" strokeWidth={4} />
                                </div>
                            )}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-editorial-charcoal">{theme.name}</span>
                    </button>
                ))}
            </div>

            {/* Main Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="theme-switcher-btn w-14 h-14 bg-editorial-charcoal text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-editorial-accent transition-all duration-500 overflow-hidden relative group"
                aria-label="Change Theme"
            >
                <div className={`absolute inset-0 bg-editorial-accent transition-transform duration-500 transform ${isOpen ? 'scale-100' : 'scale-0'}`}></div>
                <Palette size={24} className={`relative z-10 transition-transform duration-500 ${isOpen ? 'rotate-90' : 'rotate-0'}`} />
            </button>
        </div>
    );
};

export default ThemeSwitcher;
