import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Professional SVG Icons
const Icons = {
    Health: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
    ),
    DNA: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
            <path d="M4.7 7a1 1 0 011.3-1.3l11.3 11.3a1 1 0 01-1.3 1.3L4.7 7z" />
            <path d="M19.3 7a1 1 0 00-1.3-1.3L6.7 17a1 1 0 001.3 1.3L19.3 7z" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6L19 19M5 19l1.4-1.4M17.6 6.4L19 5" />
        </svg>
    ),
    Cell: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
        </svg>
    ),
    Shield: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
    ),
    Globe: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
    )
};

const Expertise = () => {
    const sectionRef = useRef(null);
    const detailCardRef = useRef(null);
    const isFirstRender = useRef(true);
    const [activeTab, setActiveTab] = useState(0);
    // Safe index: desktop always shows a valid card even when mobile closes all
    const desktopTab = activeTab >= 0 ? activeTab : 0;
    // Refs array for mobile accordion scroll-to
    const accordionRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header Animation
            const headerTl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.expertise-header',
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });

            headerTl.fromTo('.header-tag', 
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }
            )
            .fromTo('.header-title',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' },
                "-=0.6"
            );

            // Staggered Item Reveal
            gsap.fromTo('.expertise-item',
                { opacity: 0, x: -20 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    stagger: 0.08,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.expertise-container',
                        start: 'top 85%',
                    }
                }
            );

            // Detailed Content Reveal
            gsap.fromTo('.expertise-detail-card',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.0,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.expertise-container',
                        start: 'top 80%',
                    }
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Slide-down animation on tab change
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if (detailCardRef.current) {
            // Check if user has scrolled past the top of the content
            const rect = detailCardRef.current.getBoundingClientRect();
            const yOffset = -120; // Accounts for a sticky header/padding

            if (rect.top < Math.abs(yOffset)) {
                if (window.__lenis) {
                    window.__lenis.scrollTo(detailCardRef.current, { offset: yOffset, duration: 0.8 });
                } else {
                    window.scrollTo({ top: window.scrollY + rect.top + yOffset, behavior: 'smooth' });
                }
            }

            gsap.fromTo(detailCardRef.current,
                { opacity: 0, y: -60 },
                { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', clearProps: 'all' }
            );
        }
    }, [activeTab]);

    const domainExpertise = [
        { 
            title: "High Risk Obstetrics", 
            description: [
                "Comprehensive clinical management of pregnancies complicated by maternal medical conditions, fetal challenges, or multi-organ systemic disorders. We utilize cutting-edge maternal-fetal monitoring systems and evidence-based critical care protocols to navigate high-stakes clinical scenarios.",
                "Our practice is characterized by a multidisciplinary approach, integrating advanced hemodynamics, critical care obstetrics, and specialized neonatology coordination. We specialize in the stabilization and delivery of patients with complex hypertensive disorders, gestational metabolic crises, and pre-existing cardiac or renal complications.",
                "Beyond clinical interventions, we focus on the longitudinal physiological optimization of the mother, ensuring that every milestone—from early gestative screening to postpartum recovery—is managed with maximum clinical rigor and surgical preparedness."
            ],
            specialties: [
                "Recurrent Pregnancy Loss Workup", "Severe Pre-eclampsia & PIH Management", "Gestational Diabetes & Metabolic Control", 
                "VBAC (Vaginal Birth After Caesarean)", "Multiple Gestations (Twins/Triplets)", "Pre-term Labor & Emergency Cerclage",
                "Fetal Growth Restriction (IUGR) Monitoring", "Placenta Previa & Accreta Spectrum (PAS)", "Medical Disorders in Pregnancy (Cardiac/Renal)", 
                "Emergency Obstetric Interventions", "Postpartum Hemorrhage (PPH) Protocols", "Critical Care Obstetric Management",
                "Fetal Doppler & Biophysical Profiles", "Early Gestation Risk Stratification", "Obstetric Sepsis Management",
                "Instrumental Deliveries (Vacuum/Forceps)", "Breech & Transverse Version (ECV)", "Intrapartum Fetal Resuscitation"
            ],
            icon: Icons.Health,
            ref: "OB-01"
        },
        { 
            title: "Gynaeoncology", 
            description: [
                "Advanced diagnostic pathways and surgical strategies for the prevention, early detection, and comprehensive management of gynaecological cancers. We emphasize a 'prevention-first' philosophy utilizing high-resolution screening and precision biopsy methodologies.",
                "Our oncological practice covers the entire spectrum of premalignant and malignant conditions of the female reproductive tract. This includes the management of adnexal masses, cervical dysplasia, and endometrial hyperplasias within a strictly regulated clinical framework.",
                "We coordinate closely with pathology and radiology departments to ensure accurate staging and optimal surgical clearance, prioritizing the preservation of quality of life and future fertility wherever clinically viable through nerve-sparing and tissue-saving techniques."
            ],
            specialties: [
                "Cervical & Ovarian Cancer Screening", "Colposcopy & Directed Biopsy", "LEEP/LLETZ (Loop Electrosurgical Excision)", 
                "Malignancy Risk Assessment (RMI-4)", "Post-Oncological Surgical Care Plans", "Preventive HPV Vaccination Literacy", 
                "Endometrial Biopsy & Pipelle Sampling", "Management of Complex Adnexal Masses", "Vulvar & Vaginal Health Screening", 
                "Premalignant Lesion Monitoring (CIN/VIN)", "Hereditary Cancer Risk Counselling (BRCA)", "Post-Menopausal Bleeding Evaluation",
                "Tumor Marker Analysis (CA-125/HE4)", "Pelvic Lymphadenectomy Concepts", "Staging Laparotomy for Malignancy",
                "Hysteroscopic Directed Sampling", "Onco-fertility Advocacy", "Multidisciplinary Tumor Board Prep"
            ],
            icon: Icons.DNA,
            ref: "ON-02" 
        },
        { 
            title: "Reproductive Medicine", 
            description: [
                "Evidence-led management of infertility through integrated diagnostic workups and clinical reproductive technology. We focus on optimizing the physiological environment for successful conception by addressing both hormonal and structural hurdles.",
                "Our approach to fertility is deeply personalized, ranging from metabolic optimization and ovulation induction to advanced assisted reproductive techniques (ART). We utilize refined endocrinology protocols to manage complex cases of recurrent implantation failure and polycystic ovarian syndrome.",
                "Specialized focus is placed on the psychological and metabolic aspects of the fertility journey, ensuring that patients receive inclusive care including psychosexual counselling and long-term endocrine support to maintain reproductive health beyond the conception phase."
            ],
            specialties: [
                "Comprehensive Primary Infertility Workup", "PCOS & PCOD Metabolic Syndromes", "IUI (Intrauterine Insemination)", 
                "Controlled Ovarian Hyperstimulation", "Recurrent Implantation Failure (RIF)", "Endometriosis & Fertility Mapping", 
                "Sexual Health & Psychosexual Counselling", "Hormonal Optimization & HRT", "Tubal Patency Testing (HSG/HyCoSy)", 
                "Male Factor Infertility Initial Screening", "Follicular Monitoring & TVS Tracking", "Luteal Phase Support Management",
                "Recurrent Pregnancy Loss Analysis", "Basal Body Temperature & Cycle Tracking", "Assisted Hatching Consultation",
                "Uterine Receptivity Assessment", "Endocrine Imbalance Corrections", "Donor Program Coordination"
            ],
            icon: Icons.Cell,
            ref: "RM-03" 
        },
        { 
            title: "Laparoscopic and Robotic Arts", 
            description: [
                "Pioneering minimally invasive surgical techniques designed to minimize physical trauma and accelerate clinical recovery. We utilize high-definition 4K visualization and precision instrumentation for the most complex pelvic surgeries.",
                "Our surgical commitment extends to the treatement of benign gynaecological conditions such as large fibroids, complex cysts, and stage IV endometriosis through laparoscopic and hysteroscopic routes, ensuring minimal scarring and superior aesthetic outcomes.",
                "By prioritizing tissue preservation and precision resection, we enable patients to return to their functional lives faster with reduced postoperative pain and lower risk of long-term complications compared to traditional open surgery."
            ],
            specialties: [
                "Laparoscopic Myomectomy (Fibroid Removal)", "Total Laparoscopic Hysterectomy (TLH)", "Diagnostic & Operative Hysteroscopy", 
                "Laparoscopic Ovarian Cystectomy", "Endometriosis Ablation & Excision", "Robotic-Assisted Surgical Protocols",
                "Laparoscopic Salpingectomy for Ectopic", "Adhesiolysis & Pelvic Reconstruction", "Hysteroscopic Septal Resection", 
                "Polypectomy & Submucous Myoma Removal", "Minimally Invasive Fertility Surgery", "Suturing & Knotting Proficiency",
                "Single Incision Laparoscopy (SILS)", "Advanced Energy Source Management", "Post-Surgical Recovery Optimization",
                "Hysteroscopic Cannulation (Tubal)", "Laparoscopic Sacrocolpopexy", "Urogynae Procedures (TOT/TVT)"
            ],
            icon: Icons.Shield,
            ref: "LS-04" 
        },
        { 
            title: "Social Obstetrics", 
            description: [
                "Bridging institutional clinical excellence with community-focused health advocacy and preventive education. We address the unique physiological and psychological needs of women across different life stages through dedicated outreach.",
                "Our public health initiatives focus on adolescent transitions, nutritional fortification, and maternal mental wellbeing, aiming to empower women with medical literacy to navigate their health journeys with confidence in diverse community settings.",
                "We lead comprehensive awareness programs on cervical cancer prevention, breastfeeding support, and geriatric gynaecology, ensuring that women from all socio-economic profiles have access to high-quality medical guidance and preventive screening."
            ],
            specialties: [
                "Adolescent Health & Puberty Management", "Menopause & Geriatric Care Protocols", "Maternal Nutrition & Micronutrition", 
                "Community Health Awareness Campaigns", "Postpartum Mental Health Screening", "Lactation Counselling & Support",
                "Contraception & Family Planning Advocacy", "Preventive Screening Health Literacy", "Perinatal Wellness Workshops", 
                "Adolescent PCOS & Acne Management", "Geriatric Gynaecology Outreach", "Inclusive Healthcare Advocacy",
                "Domestic Violence Awareness & Support", "Antenatal Education & Breast Prep", "Public Health Research Initiatives",
                "Nutritional Anemia Correction Programs", "Bone Health & Osteoporosis Screening", "Emotional Resilience Training"
            ],
            icon: Icons.Health,
            ref: "SO-05" 
        }
    ];

    return (
        <section ref={sectionRef} id="expertise" className="py-24 md:py-32 bg-editorial-silk relative isolate">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                
                {/* Section Header */}
                <div className="expertise-header mb-20">
                    <div className="header-tag inline-flex items-center gap-2 px-3 py-1 bg-editorial-accent/10 border border-editorial-accent/20 rounded-full mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-editorial-accent"></span>
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-editorial-subtext">Scope of Practice</span>
                    </div>
                    <h2 className="header-title font-serif text-5xl md:text-7xl text-editorial-text tracking-tight leading-[1.1] max-w-3xl">
                        Expertise Built on <br />
                        <span className="text-editorial-accent italic">Clinical Rigor.</span>
                    </h2>
                </div>

                {/* === MOBILE / TABLET: Accordion Cards === */}
                <div className="block lg:hidden space-y-4">
                    {domainExpertise.map((item, i) => (
                        <div
                            key={i}
                            ref={el => accordionRefs.current[i] = el}
                            className="expertise-item border border-editorial-border/40 rounded-2xl overflow-hidden bg-white shadow-sm"
                        >
                            {/* Accordion Header */}
                            <button
                                onClick={() => {
                                    const isOpening = activeTab !== i;
                                    setActiveTab(activeTab === i ? -1 : i);
                                    if (isOpening) {
                                        // Wait for accordion to fully expand before scrolling
                                        setTimeout(() => {
                                            const el = accordionRefs.current[i];
                                            if (!el) return;
                                            const offset = -90; // sticky header height
                                            if (window.__lenis) {
                                                window.__lenis.scrollTo(el, {
                                                    offset,
                                                    duration: 1.4,
                                                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                                                });
                                            } else {
                                                const top = el.getBoundingClientRect().top + window.scrollY + offset;
                                                window.scrollTo({ top, behavior: 'smooth' });
                                            }
                                        }, 120);
                                    }
                                }}
                                className="w-full flex items-center justify-between p-5 text-left gap-4 outline-none"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="font-mono text-[9px] tracking-widest uppercase text-editorial-accent shrink-0">{item.ref}</span>
                                    <h3 className="font-serif text-lg text-editorial-text">{item.title}</h3>
                                </div>
                                <svg
                                    width="20" height="20" viewBox="0 0 24 24" fill="none"
                                    className={`shrink-0 text-editorial-accent transition-transform duration-300 ${activeTab === i ? 'rotate-180' : ''}`}
                                >
                                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>

                            {/* Accordion Body */}
                            {activeTab === i && (
                                <div className="px-5 pb-6 space-y-6 border-t border-editorial-border/30">
                                    <div className="pt-4 space-y-3">
                                        {item.description.map((p, j) => (
                                            <p key={j} className="text-sm text-editorial-subtext/80 leading-relaxed font-light">
                                                {p}
                                            </p>
                                        ))}
                                    </div>

                                    <div className="space-y-3">
                                        <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-editorial-accent border-b border-editorial-accent/20 pb-3 inline-block">
                                            Areas of Clinical Focus
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                                            {item.specialties.map((spec, j) => (
                                                <div key={j} className="flex items-start gap-2">
                                                    <span className="w-1 h-1 rounded-full bg-editorial-accent mt-1.5 shrink-0"></span>
                                                    <p className="text-xs text-editorial-subtext/80 leading-tight">{spec}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => window.__lenis?.scrollTo('#appointment')}
                                        className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-editorial-accent hover:text-editorial-text transition-colors"
                                    >
                                        Consult Practitioner
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* === DESKTOP (lg+): Sticky Sidebar + Detail Card === */}
                <div className="expertise-container hidden lg:grid grid-cols-12 gap-12 items-start">
                    
                    {/* Left: Navigation List - STICKY */}
                    <div className="col-span-5 sticky top-32 space-y-2">
                        {domainExpertise.map((item, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveTab(i)}
                                className={`expertise-item group w-full text-left p-6 md:p-8 border-b border-editorial-border/30 transition-all duration-500 relative flex items-center justify-between outline-none ${activeTab === i ? 'bg-white shadow-sm border-editorial-accent/30' : 'hover:bg-white/40'}`}
                            >
                                <div className="flex items-center gap-6">
                                    <span className={`font-mono text-[10px] tracking-widest uppercase transition-colors duration-500 ${activeTab === i ? 'text-editorial-accent' : 'text-editorial-subtext/30'}`}>
                                        {item.ref}
                                    </span>
                                    <h3 className={`font-serif text-2xl transition-all duration-500 ${activeTab === i ? 'text-editorial-text pl-2' : 'text-editorial-subtext/60 group-hover:text-editorial-subtext'}`}>
                                        {item.title}
                                    </h3>
                                </div>
                                <div className={`transition-all duration-500 transform ${activeTab === i ? 'opacity-100 translate-x-0 text-editorial-accent' : 'opacity-0 -translate-x-4'}`}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                {activeTab === i && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-editorial-accent"></div>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Right: Detailed Content Display */}
                    <div className="col-span-7">
                        <div ref={detailCardRef} key={desktopTab} className="expertise-detail-card bg-white p-8 md:p-12 lg:p-14 border border-editorial-border/30 rounded-3xl relative overflow-hidden min-h-[580px] flex flex-col justify-between">
                            
                            {/* Decorative Icon Background */}
                            <div className="absolute -top-12 -right-12 text-editorial-accent/5 transform rotate-12 scale-[3]">
                                {React.createElement(domainExpertise[desktopTab].icon)}
                            </div>

                            <div className="relative z-10 space-y-10">
                                <div className="space-y-6">
                                    <div className="text-editorial-accent bg-editorial-accent/5 w-14 h-14 rounded-2xl flex items-center justify-center">
                                        {React.createElement(domainExpertise[desktopTab].icon)}
                                    </div>
                                    <h4 className="font-serif text-3xl md:text-4xl text-editorial-text leading-tight">
                                        {domainExpertise[desktopTab].title}
                                    </h4>
                                    <div className="space-y-4">
                                        {domainExpertise[desktopTab].description.map((p, i) => (
                                            <p key={i} className="text-sm md:text-base text-editorial-subtext/90 leading-relaxed font-light max-w-2xl">
                                                {p}
                                            </p>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-editorial-accent border-b border-editorial-accent/20 pb-4 inline-block">
                                        Areas of Clinical Focus
                                    </p>
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                                        {domainExpertise[desktopTab].specialties.map((spec, i) => (
                                            <div key={i} className="flex items-start gap-2.5 group/spec">
                                                <span className="w-1 h-1 rounded-full bg-editorial-accent mt-2 group-hover/spec:scale-150 transition-transform flex-shrink-0"></span>
                                                <p className="text-xs md:text-[13px] text-editorial-subtext/80 group-hover/spec:text-editorial-text transition-colors leading-tight">
                                                    {spec}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="relative z-10 pt-10 mt-auto border-t border-editorial-border/30 flex items-center justify-between">
                                <div className="flex gap-4">
                                    <div className="h-10 w-px bg-editorial-border/60"></div>
                                    <div className="space-y-0.5">
                                        <p className="text-[8px] font-bold tracking-widest text-editorial-subtext/40 uppercase">Standard of Care</p>
                                        <p className="text-xs font-medium text-editorial-text italic">Clinical Excellence Guaranteed</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => window.__lenis?.scrollTo('#appointment')}
                                    className="group flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-editorial-accent hover:text-editorial-text transition-colors"
                                >
                                    Consult Practitioner
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transform group-hover:translate-x-1 transition-transform">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Content: Secondary Information */}
                <div className="mt-32 pt-16 border-t border-editorial-border/30 grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
                    <div className="space-y-6 group">
                        <p className="text-[11px] font-bold tracking-[0.4em] uppercase text-editorial-accent">Academic Integration</p>
                        <h4 className="font-serif text-3xl text-editorial-text leading-tight group-hover:text-editorial-accent transition-colors duration-500">Faculty Member at Leading Institutions</h4>
                        <p className="text-lg text-editorial-subtext/70 leading-relaxed">Combining 7+ years of teaching with active clinical duty to mentor the next generation of gynaecological specialists.</p>
                    </div>
                    <div className="space-y-6 group">
                        <p className="text-[11px] font-bold tracking-[0.4em] uppercase text-editorial-accent">Research Impact</p>
                        <h4 className="font-serif text-3xl text-editorial-text leading-tight group-hover:text-editorial-accent transition-colors duration-500">Published Clinical Research</h4>
                        <p className="text-lg text-editorial-subtext/70 leading-relaxed">Contributing to peer-reviewed journals with a focus on maternal safety and innovative surgical protocols.</p>
                    </div>
                    <div className="space-y-6 group">
                        <p className="text-[11px] font-bold tracking-[0.4em] uppercase text-editorial-accent">Global Connectivity</p>
                        <h4 className="font-serif text-3xl text-editorial-text leading-tight group-hover:text-editorial-accent transition-colors duration-500">Multilingual Care</h4>
                        <p className="text-lg text-editorial-subtext/70 leading-relaxed">Bridging cultural gaps through fluency in Tamil, English, Hindi, Telugu, and Bengali for inclusive patient journeys.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Expertise;

