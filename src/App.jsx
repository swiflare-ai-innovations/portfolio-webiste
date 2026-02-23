import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Expertise from './components/Expertise';
import Contact from './components/Contact';
import Header from './components/Header';
import Appointment from './components/Appointment';
import ThemeSwitcher from './components/ThemeSwitcher';

const App = () => {
  useEffect(() => {
    // Prevent browser from restoring previous scroll position on load
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Force scroll to top before Lenis initializes
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    // Expose globally so Header and other components can call lenis.scrollTo()
    window.__lenis = lenis;

    // Ensure Lenis starts at top
    lenis.scrollTo(0, { immediate: true });

    lenis.on('scroll', ScrollTrigger.update);

    // Master refresh strategy: Load event + Staggered delay
    const handleLoad = () => {
        window.scrollTo(0, 0);
        lenis.scrollTo(0, { immediate: true });
        ScrollTrigger.refresh();
    };
    window.addEventListener('load', handleLoad);

    // Refresh 2: Fail-safe delay for final layout settlement (fonts/dynamic elements)
    const refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 3000);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      window.removeEventListener('load', handleLoad);
      clearTimeout(refreshTimeout);
    };
  }, []);

  return (
    <div className="font-sans text-editorial-text bg-editorial-silk min-h-screen">
        <Header />
        <main>
            <Hero />
            <About />
            <Experience />
            <Expertise />
            <Appointment />
            <Contact />
        </main>
        {/* <ThemeSwitcher /> */}
    </div>
  );
}

export default App;
