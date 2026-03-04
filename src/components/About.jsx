import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each element when it enters the viewport
      gsap.utils.toArray('.about-reveal').forEach((elem) => {
        gsap.from(elem, {
          y: 30,
          opacity: 0,
          duration: 1.0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: elem,
            start: 'top 92%',
            toggleActions: 'play none none none'
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className="relative py-16 sm:py-20 md:py-28 bg-editorial-bg overflow-hidden flex items-center justify-center"
    >
      {/* Continuity Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03] text-editorial-charcoal pointer-events-none z-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '60px 60px'
      }}></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Sticky Title & Quote */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-8 lg:space-y-12 order-1">
            <div className="about-reveal inline-flex items-center gap-3 px-4 py-1.5 bg-editorial-accent/10 border border-editorial-accent/20 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-editorial-accent animate-pulse"></span>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-editorial-subtext">
                Behind the Practice
              </span>
            </div>
            
            <h2 className="about-reveal font-serif text-5xl sm:text-6xl md:text-7xl leading-[1.05] text-editorial-text tracking-tighter">
              Pioneering <br className="hidden lg:block"/>
              <span className="text-editorial-accent">Excellence</span> <br className="hidden lg:block"/>
              in Women's Health
            </h2>

            <div className="about-reveal max-w-md hidden lg:block">
              <p className="font-serif text-2xl text-editorial-subtext/90 leading-relaxed italic border-l-2 border-editorial-accent/40 pl-6">
                "A foremost Consultant Obstetrician, Gynaecologist, and Fertility Specialist at MGM Malar Hospital, dedicated to elevating the standard of community healthcare."
              </p>
            </div>

            {/* Expertise Pillbox Grid removed */}
          </div>

          {/* Right Column: Long Content & Expertise Cards */}
          <div className="lg:col-span-7 space-y-16 order-2 relative z-10 w-full lg:pt-8">
            
            {/* Mobile Quote */}
            <div className="about-reveal lg:hidden">
              <p className="font-serif text-xl sm:text-2xl text-editorial-subtext/90 leading-relaxed italic border-l-2 border-editorial-accent/40 pl-6">
                "A foremost Consultant Obstetrician, Gynaecologist, and Fertility Specialist at MGM Malar Hospital, dedicated to elevating the standard of community healthcare."
              </p>
            </div>

            {/* Main Long-form Text */}
            <div className="about-reveal text-editorial-subtext text-lg md:text-xl leading-[1.8] font-light space-y-8 opacity-90">
              <p className="first-letter:text-6xl first-letter:font-serif first-letter:text-editorial-accent first-letter:mr-3 first-letter:float-left">
                Dr. Kanaga Lakshmi Kapilraj MBBS MS (OG) MRCOG is an accomplished Obstetrician, Gynaecologist, Fertility Specialist and Laparoscopic Surgeon dedicated to advancing women's health through compassionate care, surgical excellence and evidence based practice. With a strong academic foundation and advanced fellowship training in fertility and assisted reproductive technology, she has guided thousands of women through their reproductive journeys from adolescence and fertility challenges to pregnancy, childbirth, menopause and beyond.
              </p>
              
              <div className="h-px w-24 bg-editorial-accent/30 my-8"></div>

              <p>
                She has performed nearly <strong className="font-normal text-editorial-text border-b border-editorial-accent/30 pb-0.5">15,000 deliveries</strong>, including a high proportion of high risk cases, vaginal births after caesarean (VBAC), successful deliveries following external cephalic version for breech and a remarkable range of assisted deliveries. Her calm clinical judgement, patient centred counselling and commitment to safe obstetric care have made her a trusted physician among families across generations.
              </p>

              <p>
                A skilled surgeon, she has carried out more than <strong>500 gynaecological procedures</strong>, including vaginal hysterectomy, non descent vaginal hysterectomy, laparoscopic assisted vaginal hysterectomy (LAVH) and a wide range of operative laparoscopy and hysteroscopy procedures. Her surgical approach is meticulous and minimally invasive, aimed at ensuring faster recovery, reduced pain and better long term outcomes for her patients.
              </p>

              <p>
                With specialised training in fertility, Dr. Kanaga has performed more than <strong>1,000 fertility procedures</strong>. She is deeply experienced in fertility evaluation, counselling, sexual health concerns, as well as recurrent pregnancy loss, PCOD or PCOS management, endometriosis, and recurrent implantation failure.
              </p>
              
            </div>
          </div>
        </div>

        {/* Full-width Recognition Block */}
        <div className="about-reveal mt-16 sm:mt-24">
          <div className="p-8 md:p-12 bg-editorial-accent/5 border border-editorial-accent/20 rounded-3xl italic font-serif text-center relative overflow-hidden group hover:bg-editorial-accent/10 transition-colors duration-700">
            {/* Decorative quotation mark */}
            <span className="absolute top-4 left-8 text-6xl text-editorial-accent/20 font-serif leading-none select-none">"</span>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-editorial-text leading-relaxed max-w-5xl mx-auto">
              Her clinical excellence has been recognised at the highest levels, including an Appreciation Award from the Honourable Chief Minister, a Best Doctor Award at Thiruvarur Medical College and recognition during the Gaja cyclone.
            </p>

            <span className="absolute bottom-4 right-8 text-6xl text-editorial-accent/20 font-serif leading-none select-none rotate-180">"</span>
          </div>
        </div>
      </div>
      
      {/* Decorative Text Seal */}
      <div className="absolute top-[20%] right-[-10%] opacity-[0.02] pointer-events-none rotate-90 select-none hidden 2xl:block">
        <span className="text-[15rem] font-serif text-editorial-text">Legacy</span>
      </div>
    </section>
  );
};

export default About;