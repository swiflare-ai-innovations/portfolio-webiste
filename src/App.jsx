import React, { useEffect } from 'react';
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
import Testimonials from './components/Testimonials';
import { themes } from './themes';

const App = () => {
  useEffect(() => {
    // Apply theme colors from themes.js (specifically b10 - Bright Violet Neon Violet)
    const theme = themes.find((t) => t.id === 'b10') || themes[0];
    const root = document.documentElement;
    
    Object.entries(theme.colors).forEach(([key, value]) => {
      if (key === 'button') {
        root.style.setProperty('--color-secondary', value);
      } else {
        root.style.setProperty(`--color-${key}`, value);
      }
    });
    
    root.setAttribute('data-theme', theme.id);
    localStorage.setItem('doctor-portfolio-theme', theme.id);

    // Initial setup
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });
    window.__lenis = lenis;
    lenis.scrollTo(0, { immediate: true });
    lenis.on('scroll', ScrollTrigger.update);

    const handleLoad = () => {
        window.scrollTo(0, 0);
        lenis.scrollTo(0, { immediate: true });
        ScrollTrigger.refresh();
    };
    window.addEventListener('load', handleLoad);

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
            <Testimonials />
            <Appointment />
            <Contact />
        </main>
    </div>
  );
}

export default App;
