import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Quote } from 'lucide-react';

const Testimonials = () => {
    const sectionRef = useRef(null);

    const testimonials = [
        {
            text: "Dr. Kanaga Lakshmi is exceptional. Her calm clinical judgement and compassionate care made a world of difference during my high-risk pregnancy. We are forever grateful to her for the safe delivery of our healthy baby.",
            author: "Priya S.",
            location: "Chennai",
            role: "Maternal Care Patient"
        },
        {
            text: "Expertise combined with genuine empathy. After several failed attempts elsewhere, her fertility treatment was success for us. The diagnostic precision and personalized protocol she follows is remarkable.",
            author: "Anitha R.",
            location: "Coimbatore",
            role: "Fertility Treatment"
        },
        {
            text: "She is a skilled surgeon with a very patient-centered approach. My laparoscopic recovery was incredibly fast. I highly recommend her for any complex gynaecological procedures.",
            author: "Meenakshi K.",
            location: "Adyar",
            role: "Surgical Patient"
        }
    ];

    // For infinite loop, we triple the items
    const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];
    const [activeIndex, setActiveIndex] = useState(testimonials.length);
    const [isAnimating, setIsAnimating] = useState(false);
    
    // Drag state
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(1);

    // Update items per view based on window size
    useEffect(() => {
        const updateItems = () => {
            if (window.innerWidth >= 1024) setItemsPerView(3);
            else if (window.innerWidth >= 768) setItemsPerView(2);
            else setItemsPerView(1);
        };
        updateItems();
        window.addEventListener('resize', updateItems);
        return () => window.removeEventListener('resize', updateItems);
    }, []);

    const handleTransitionEnd = () => {
        setIsAnimating(false);
        if (activeIndex >= testimonials.length * 2) {
            setActiveIndex(activeIndex - testimonials.length);
        } else if (activeIndex < testimonials.length) {
            setActiveIndex(activeIndex + testimonials.length);
        }
    };

    // Auto-play
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isAnimating && !isDragging) {
                nextSlide();
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [activeIndex, isAnimating, isDragging]);

    const nextSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setActiveIndex(prev => prev + 1);
    };

    const prevSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setActiveIndex(prev => prev - 1);
    };

    // Drag / Touch Handlers
    const onStart = (e) => {
        if (isAnimating) return;
        setIsDragging(true);
        setStartX(e.type === 'touchstart' ? e.touches[0].clientX : e.clientX);
        setDragOffset(0);
    };

    const onMove = (e) => {
        if (!isDragging) return;
        const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const diff = currentX - startX;
        setDragOffset(diff);
    };

    const onEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);
        
        const threshold = 50; 
        if (dragOffset < -threshold) nextSlide();
        else if (dragOffset > threshold) prevSlide();
        setDragOffset(0);
    };

    return (
        <section ref={sectionRef} id="testimonials" className="py-12 md:py-20 bg-editorial-bg relative overflow-hidden isolate">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
                
                {/* Section Header */}
                <div className="testimonial-reveal mb-12 md:mb-16 w-full">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-editorial-accent/10 border border-editorial-accent/20 rounded-full mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-editorial-accent animate-pulse"></span>
                        <span className="text-xs font-bold tracking-[0.3em] uppercase text-editorial-subtext">Patient Voices</span>
                    </div>
                    <h2 className="font-serif text-3xl md:text-5xl text-editorial-text tracking-tighter leading-tight w-full">
                        Stories of <span className="text-editorial-accent italic">Care</span>
                    </h2>
                </div>

                {/* Carousel Card Container */}
                <div className="testimonial-reveal relative max-w-6xl mx-auto">
                    
                    {/* Testimonial Slider Workspace */}
                    <div 
                        className="overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y"
                        onMouseDown={onStart}
                        onMouseMove={onMove}
                        onMouseUp={onEnd}
                        onMouseLeave={onEnd}
                        onTouchStart={onStart}
                        onTouchMove={onMove}
                        onTouchEnd={onEnd}
                    >
                        <div 
                            className={`flex ${isAnimating || !isDragging ? 'transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]' : ''} gap-6`}
                            onTransitionEnd={handleTransitionEnd}
                            style={{ 
                                transform: `translateX(calc(-${activeIndex * (100 / itemsPerView)}% - ${activeIndex * (24 / itemsPerView)}px + ${dragOffset}px))`,
                            }}
                        >
                            {duplicatedTestimonials.map((item, i) => (
                                <div 
                                    key={i} 
                                    className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex-shrink-0 select-none pb-4"
                                >
                                    <div className="h-full bg-white/70 backdrop-blur-xl border border-editorial-border/30 p-6 md:p-8 rounded-2xl transition-all duration-500 flex flex-col group relative shadow-sm text-left hover:border-editorial-accent/40">
                                        <div className="text-editorial-accent mb-4 opacity-40 group-hover:opacity-100 transition-opacity">
                                            <Quote size={20} strokeWidth={1.5} />
                                        </div>
                                        
                                        <div className="flex-grow mb-6 pointer-events-none">
                                            <p className="font-serif text-base md:text-lg text-editorial-text leading-relaxed italic break-words">
                                                "{item.text}"
                                            </p>
                                        </div>

                                        <div className="pt-5 border-t border-editorial-border/20 mt-auto pointer-events-none">
                                            <p className="text-sm font-serif text-editorial-text font-bold uppercase tracking-tight mb-1">{item.author}</p>
                                            <div className="flex flex-col gap-0.5">
                                                <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-editorial-accent">
                                                    {item.role}
                                                </p>
                                                <p className="text-[10px] uppercase tracking-widest text-editorial-subtext font-medium">
                                                    {item.location}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center md:justify-between items-center mt-10 md:mt-12 gap-6">
                        <div className="flex gap-4">
                            <button 
                                onClick={prevSlide}
                                className="w-10 h-10 rounded-full border border-editorial-border/30 flex items-center justify-center text-editorial-text hover:bg-editorial-accent hover:text-white transition-all duration-500 outline-none"
                                aria-label="Previous Slide"
                            >
                                <span className="text-lg">←</span>
                            </button>
                            <button 
                                onClick={nextSlide}
                                className="w-10 h-10 rounded-full border border-editorial-border/30 flex items-center justify-center text-editorial-text hover:bg-editorial-accent hover:text-white transition-all duration-500 outline-none"
                                aria-label="Next Slide"
                            >
                                <span className="text-lg">→</span>
                            </button>
                        </div>

                        {/* Pagination Indicators - Fixed to original length */}
                        <div className="flex gap-2">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => !isAnimating && setActiveIndex(i + testimonials.length)}
                                    className={`transition-all duration-500 rounded-full h-1 ${ (activeIndex % testimonials.length) === i ? 'w-8 bg-editorial-accent' : 'w-2 bg-editorial-border/30'}`}
                                    aria-label={`Go to slide ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Background Decor */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none select-none z-0 overflow-hidden">
                    <span className="absolute top-0 left-0 font-serif text-[40vw] text-editorial-accent opacity-[0.02] leading-none -translate-x-1/4 -translate-y-1/4">
                        Voice
                    </span>
                    <span className="absolute bottom-0 right-0 font-serif text-[40vw] text-editorial-accent opacity-[0.02] leading-none translate-x-1/4 translate-y-1/4">
                        Care
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
