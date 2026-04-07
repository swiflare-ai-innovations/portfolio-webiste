import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { Palette, Check } from 'lucide-react';

import { themes } from '../themes';

const ThemeSwitcher = ({ currentTheme, onThemeChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        gsap.fromTo('.theme-switcher-btn', 
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1, delay: 2, ease: 'back.out(1.7)' }
        );
    }, []);

    const toggleTheme = (themeId) => {
        onThemeChange(themeId);
        setIsOpen(false);
    };

    return (
        <div className="fixed bottom-8 right-8 z-[150] flex flex-col items-end gap-4">
            {/* Theme Options */}
            <div className={`flex flex-col gap-2 transition-all duration-500 transform origin-bottom-right ${
                isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-90 pointer-events-none'
            }`}>
                <div className="flex flex-col gap-2 max-h-[65vh] overflow-y-auto pr-2 scrollbar-hide custom-scrollbar">
                    {themes.map((theme) => (
                        <button
                            key={theme.id}
                            onClick={() => toggleTheme(theme.id)}
                            className={`group flex items-center gap-3 bg-editorial-silk/95 backdrop-blur-md p-1.5 pr-4 rounded-full shadow-lg border transition-all duration-300 w-max self-end ${
                                currentTheme === theme.id ? 'border-editorial-accent' : 'border-editorial-border/30 hover:border-editorial-accent/50'
                            }`}
                        >
                            <div 
                                className="w-8 h-8 rounded-full border border-editorial-border/30 flex items-center justify-center transition-all duration-500 shadow-sm relative overflow-hidden group-hover:scale-110"
                                style={{ 
                                    background: `linear-gradient(135deg, ${theme.colors.bg} 50%, ${theme.colors.accent} 50%)`
                                }}
                            >
                                {currentTheme === theme.id && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[2px]">
                                        <Check size={12} className="text-white drop-shadow-md" strokeWidth={4} />
                                    </div>
                                )}
                            </div>
                            <span className="text-[9px] font-medium tracking-wide text-editorial-charcoal">{theme.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="theme-switcher-btn w-14 h-14 bg-editorial-secondary text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-editorial-accent transition-all duration-500 overflow-hidden relative group"
                aria-label="Change Theme"
            >
                <div className={`absolute inset-0 bg-editorial-accent transition-transform duration-500 transform ${isOpen ? 'scale-100' : 'scale-0'}`}></div>
                <Palette size={24} className={`relative z-10 transition-transform duration-500 ${isOpen ? 'rotate-90' : 'rotate-0'}`} />
            </button>
        </div>
    );
};

export default ThemeSwitcher;
