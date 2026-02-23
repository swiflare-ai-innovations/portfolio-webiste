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
          y: 40,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: elem,
            start: 'top 95%', // generous start to ensure they show up
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
      className="relative py-16 sm:py-20 md:py-28 bg-editorial-silk overflow-hidden flex items-center justify-center"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
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

            {/* Expertise Pillbox Grid (Moved to Left Side) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8">
              {/* Card 1 */}
              <div className="about-reveal bg-white p-5 border border-editorial-border/40 space-y-2 rounded-2xl shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <span className="text-[8px] font-bold tracking-[0.2em] text-editorial-subtext/50 uppercase block">01 / Specialization</span>
                <p className="font-serif text-base text-editorial-text leading-tight">Fertility Expert</p>
              </div>
              
              {/* Card 2 */}
              <div className="about-reveal bg-editorial-accent p-5 space-y-2 rounded-2xl shadow-lg border border-editorial-accent/20">
                <span className="text-[8px] font-bold tracking-[0.2em] text-white/50 uppercase block">02 / Focus Area</span>
                <p className="font-serif text-base text-white leading-tight">High Risk Obstetrics</p>
              </div>
              
              {/* Card 3 */}
              <div className="about-reveal bg-editorial-accent/10 border border-editorial-accent/20 backdrop-blur-xl p-5 space-y-2 rounded-2xl">
                <span className="text-[8px] font-bold tracking-[0.2em] text-editorial-accent/60 uppercase block">03 / Advanced Surgery</span>
                <p className="font-serif text-base text-editorial-text leading-tight">Laparoscopic Arts</p>
              </div>
              
              {/* Card 4 */}
              <div className="about-reveal bg-white p-5 border border-editorial-border/40 space-y-2 rounded-2xl shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <span className="text-[8px] font-bold tracking-[0.2em] text-editorial-subtext/50 uppercase block">04 / Academic Focus</span>
                <p className="font-serif text-base text-editorial-text leading-tight">Teaching & Research</p>
              </div>
            </div>
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
              
              <div className="p-8 bg-editorial-accent/5 border border-editorial-accent/20 rounded-2xl italic font-serif text-center mt-12 mb-4">
                "Her clinical excellence has been recognised at the highest levels, including an Appreciation Award from the Honourable Chief Minister, a Best Doctor Award at Thiruvarur Medical College and recognition during the Gaja cyclone."
              </div>

            </div>
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