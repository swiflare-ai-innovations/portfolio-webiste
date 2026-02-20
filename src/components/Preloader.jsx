import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Preloader = ({ onComplete }) => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const lineRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: onComplete
        });

        tl.fromTo(textRef.current, 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" }
        )
        .fromTo(lineRef.current,
            { scaleX: 0 },
            { scaleX: 1, duration: 1, ease: "power2.inOut" },
            "-=0.5"
        )
        .to(textRef.current, {
            y: -20,
            opacity: 0,
            duration: 0.8,
            delay: 0.5,
            ease: "power3.in"
        })
        .to(containerRef.current, {
            clipPath: 'inset(0 0 100% 0)',
            duration: 1.2,
            ease: "expo.inOut"
        });

        return () => {
            tl.kill();
        };
    }, [onComplete]);

    return (
        <div ref={containerRef} className="fixed inset-0 bg-editorial-text z-[10000] flex flex-col items-center justify-center text-editorial-bg overflow-hidden px-6">
            <div ref={textRef} className="text-center">
                <p className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6 text-editorial-accent">Clinical Excellence</p>
                <h1 className="text-3xl md:text-5xl font-serif mb-6">
                    Dr. Kanaga Lakshmi
                </h1>
                <div ref={lineRef} className="h-px w-24 bg-clinical-accent mx-auto origin-center"></div>
            </div>
        </div>
    );
};

export default Preloader;
