import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SiReact, SiTailwindcss, SiJavascript, SiNodedotjs, SiMongodb, SiPython, SiTensorflow } from 'react-icons/si';
import skillsData from '../../data/skills.json';

gsap.registerPlugin(ScrollTrigger);

function Skills() {
    const [activeCategory, setActiveCategory] = useState('all');
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const filterRef = useRef(null);
    const cardsRef = useRef([]);
    const timeline = useRef(gsap.timeline());
    const [hoveredSkill, setHoveredSkill] = useState(null);

    const iconMap = {
        React: <SiReact className="w-6 h-6 text-teal-500" />,
        'Tailwind CSS': <SiTailwindcss className="w-6 h-6 text-teal-500" />,
        'JavaScript (ES6+)': <SiJavascript className="w-6 h-6 text-teal-500" />,
        'Node.js': <SiNodedotjs className="w-6 h-6 text-teal-500" />,
        MongoDB: <SiMongodb className="w-6 h-6 text-teal-500" />,
        Python: <SiPython className="w-6 h-6 text-teal-500" />,
        TensorFlow: <SiTensorflow className="w-6 h-6 text-teal-500" />,
    };

    const handleCategoryChange = useCallback(
        (category) => {
            timeline.current.clear();
            timeline.current.to(cardsRef.current.filter((el) => el), {
                opacity: 0,
                scale: 0.8,
                rotationY: 90,
                duration: 0.3,
                stagger: 0.05,
                ease: 'power2.in',
                onComplete: () => {
                    setActiveCategory(category);
                    cardsRef.current = cardsRef.current.filter((el) => el); // Clean stale refs
                    timeline.current.to(cardsRef.current, {
                        opacity: 1,
                        scale: 1,
                        rotationY: 0,
                        duration: 0.5,
                        stagger: 0.05,
                        ease: 'back.out(1.7)',
                    });
                },
            });
        },
        []
    );

    useEffect(() => {
        // Title animation
        if (titleRef.current) {
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: 50, scale: 0.9 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: 'top 90%',
                        toggleActions: 'play none none reverse',
                    },
                    onComplete: () => {
                        gsap.to(titleRef.current, {
                            textShadow: '0 0 10px rgba(20, 184, 166, 0.5)',
                            duration: 1.5,
                            repeat: -1,
                            yoyo: true,
                            ease: 'power1.inOut',
                        });
                    },
                }
            );
        }

        // Filter buttons animation
        if (filterRef.current) {
            gsap.fromTo(
                filterRef.current.children,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: filterRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }

        // Clean up
        return () => {
            gsap.killTweensOf([titleRef.current, filterRef.current?.children]);
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.trigger === titleRef.current || trigger.trigger === filterRef.current) {
                    trigger.kill();
                }
            });
        };
    }, []);

    useEffect(() => {
        // Card animations
        cardsRef.current.forEach((card, index) => {
            if (card) {
                gsap.fromTo(
                    card,
                    { opacity: 0, rotationY: 90, scale: 0.8 },
                    {
                        opacity: 1,
                        rotationY: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: 'back.out(1.7)',
                        delay: index * 0.1,
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );

                const handleMouseEnter = () => {
                    gsap.to(card, {
                        scale: 1.05,
                        rotateX: 5,
                        rotateY: 5,
                        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1), 0 0 10px rgba(20, 184, 166, 0.4)',
                        duration: 0.4,
                        ease: 'power2.out',
                    });
                    gsap.to(card.querySelectorAll('.skill-icon'), {
                        rotate: 360,
                        scale: 1.2,
                        duration: 0.6,
                        ease: 'power3.out',
                    });
                    gsap.to(card.querySelector('.card-overlay'), {
                        opacity: 0.2,
                        duration: 0.4,
                        ease: 'power2.out',
                    });
                    gsap.to(card.querySelector('.particle-overlay'), {
                        opacity: 0.3,
                        duration: 0.4,
                        ease: 'power2.out',
                    });
                };

                const handleMouseLeave = () => {
                    gsap.to(card, {
                        scale: 1,
                        rotateX: 0,
                        rotateY: 0,
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                        duration: 0.4,
                        ease: 'power2.out',
                    });
                    gsap.to(card.querySelectorAll('.skill-icon'), {
                        rotate: 0,
                        scale: 1,
                        duration: 0.6,
                        ease: 'power3.out',
                    });
                    gsap.to(card.querySelector('.card-overlay'), {
                        opacity: 0,
                        duration: 0.4,
                        ease: 'power2.out',
                    });
                    gsap.to(card.querySelector('.particle-overlay'), {
                        opacity: 0,
                        duration: 0.4,
                        ease: 'power2.out',
                    });
                };

                card.addEventListener('mouseenter', handleMouseEnter);
                card.addEventListener('mouseleave', handleMouseLeave);

                card._handlers = { mouseenter: handleMouseEnter, mouseleave: handleMouseLeave };
            }
        });

        return () => {
            gsap.killTweensOf([filterRef.current?.children, cardsRef.current]);
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.trigger === filterRef.current || cardsRef.current.includes(trigger.trigger)) {
                    trigger.kill();
                }
            });
            cardsRef.current.forEach((card) => {
                if (card && card._handlers) {
                    card.removeEventListener('mouseenter', card._handlers.mouseenter);
                    card.removeEventListener('mouseleave', card._handlers.mouseleave);
                }
            });
        };
    }, [activeCategory]);

    if (!Object.entries(skillsData).length) {
        return (
            <section
                ref={sectionRef}
                id="skills"
                className="relative py-16 sm:py-24 bg-gradient-to-b from-white-bg to-teal-50 bg-opacity-90"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2
                        ref={titleRef}
                        className="text-4xl sm:text-5xl font-poppins font-extrabold text-teal-500 mb-12 tracking-tight animate-float"
                    >
                        My Expertise
                    </h2>
                    <p className="text-lg text-gray-800">No skills data available at the moment.</p>
                </div>
            </section>
        );
    }

    const categories = ['all', ...Object.keys(skillsData)];

    return (
        <section
            ref={sectionRef}
            id="skills"
            className="relative py-16 sm:py-24 bg-gradient-to-b from-white-bg to-teal-50 bg-opacity-90 overflow-hidden"
            aria-label="Skills and Expertise"
        >
            {/* Animated Wave Background */}
            <svg
                className="absolute bottom-0 left-0 w-full h-32 text-teal-200"
                viewBox="0 0 1440 120"
                preserveAspectRatio="none"
            >
                <path
                    fill="currentColor"
                    fillOpacity="0.3"
                    d="M0,80L48,74.7C96,69,192,59,288,64C384,69,480,89,576,96C672,101,768,89,864,80C960,69,1056,59,1152,64C1248,69,1344,89,1392,101.3L1440,112L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
                >
                    <animate
                        attributeName="d"
                        values="
                            M0,80L48,74.7C96,69,192,59,288,64C384,69,480,89,576,96C672,101,768,89,864,80C960,69,1056,59,1152,64C1248,69,1344,89,1392,101.3L1440,112L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z;
                            M0,90L48,84.7C96,79,192,69,288,74C384,79,480,99,576,106C672,111,768,99,864,90C960,79,1056,69,1152,74C1248,79,1344,99,1392,111.3L1440,122L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z;
                            M0,80L48,74.7C96,69,192,59,288,64C384,69,480,89,576,96C672,101,768,89,864,80C960,69,1056,59,1152,64C1248,69,1344,89,1392,101.3L1440,112L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
                        dur="10s"
                        repeatCount="indefinite"
                    />
                </path>
            </svg>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <h2
                    ref={titleRef}
                    className="text-4xl sm:text-5xl font-poppins font-extrabold text-teal-500 text-center mb-12 tracking-tight animate-float"
                >
                    My Expertise
                </h2>
                <div
                    ref={filterRef}
                    className="flex flex-wrap justify-center gap-4 mb-12"
                    role="tablist"
                    aria-label="Skill category filter"
                >
                    {categories.map((category, index) => (
                        <button
                            key={category}
                            onClick={() => handleCategoryChange(category)}
                            onMouseEnter={() => {
                                if (filterRef.current) {
                                    gsap.to(filterRef.current.children[index], {
                                        scale: 1.1,
                                        boxShadow: '0 0 10px rgba(20, 184, 166, 0.4)',
                                        duration: 0.3,
                                        ease: 'power2.out',
                                    });
                                }
                            }}
                            onMouseLeave={() => {
                                if (filterRef.current) {
                                    gsap.to(filterRef.current.children[index], {
                                        scale: 1,
                                        boxShadow: 'none',
                                        duration: 0.3,
                                        ease: 'power2.out',
                                    });
                                }
                            }}
                            className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-300 relative focus:outline-none focus:ring-2 focus:ring-teal-500 animate-fade-in ${activeCategory === category
                                    ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/40'
                                    : 'bg-gray-50 text-gray-800 hover:bg-teal-50 hover:text-teal-500'
                                }`}
                            role="tab"
                            aria-selected={activeCategory === category}
                            aria-label={`Show ${category === 'all' ? 'all skills' : category.replace(/([A-Z])/g, ' $1').trim() + ' skills'}`}
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleCategoryChange(category);
                                }
                            }}
                        >
                            {category === 'all' ? 'All' : category.replace(/([A-Z])/g, ' $1').trim()}
                            <div className="absolute inset-0 bg-teal-500/10 rounded-lg opacity-0 transition-opacity duration-300 button-overlay" />
                        </button>
                    ))}
                </div>
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    role="region"
                    aria-live="polite"
                    aria-label="Filtered skills list"
                >
                    {Object.entries(skillsData)
                        .filter(([category]) => activeCategory === 'all' || category === activeCategory)
                        .map(([category, skills], index) => (
                            <div
                                key={category}
                                ref={(el) => (cardsRef.current[index] = el)}
                                className="relative glass p-6 rounded-xl bg-white/80 backdrop-blur-md hover:bg-teal-50/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 animate-wiggle"
                                role="tabpanel"
                                aria-label={`Skills in ${category.replace(/([A-Z])/g, ' $1').trim()}`}
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        cardsRef.current[index].focus();
                                    }
                                }}
                            >
                                <h3 className="text-xl font-poppins font-semibold text-gray-800 capitalize mb-4 animate-fade-in">
                                    {category.replace(/([A-Z])/g, ' $1').trim()}
                                </h3>
                                <ul className="space-y-4">
                                    {skills.map((skill, skillIndex) => (
                                        <li
                                            key={skillIndex}
                                            className="flex items-center justify-between text-gray-800 font-inter text-base relative group animate-fade-in"
                                            onMouseEnter={() => setHoveredSkill(`${category}-${skillIndex}`)}
                                            onMouseLeave={() => setHoveredSkill(null)}
                                        >
                                            <div className="flex items-center space-x-3">
                                                {iconMap[skill.name] && (
                                                    <span className="skill-icon text-teal-500">{iconMap[skill.name]}</span>
                                                )}
                                                <span>{skill.name}</span>
                                            </div>
                                            <div className="w-1/3 bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="progress-bar bg-teal-500 h-2 rounded-full transition-all duration-500 ease-out"
                                                    style={{ width: `${skill.proficiency}%` }}
                                                />
                                            </div>
                                            <div
                                                className={`absolute left-0 bottom-full mb-2 p-2 bg-teal-600 text-white text-sm rounded-lg shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:delay-150 pointer-events-none z-30 max-w-xs ${hoveredSkill === `${category}-${skillIndex}` ? 'opacity-100' : ''
                                                    }`}
                                                role="tooltip"
                                                id={`tooltip-${category}-${skillIndex}`}
                                                aria-hidden={hoveredSkill !== `${category}-${skillIndex}`}
                                            >
                                                {skill.description || `Proficient in ${skill.name} (${skill.proficiency}%)`}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="card-overlay absolute inset-0 bg-teal-500/10 rounded-xl pointer-events-none transition-opacity duration-300" />
                                <div
                                    className="particle-overlay absolute inset-0 rounded-xl pointer-events-none opacity-0"
                                    style={{
                                        background: 'radial-gradient(circle, rgba(20, 184, 166, 0.3) 0%, transparent 70%)',
                                    }}
                                />
                            </div>
                        ))}
                </div>
                {/* Scroll Indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-fade-in">
                    <span className="text-gray-800 text-sm mb-2">Scroll</span>
                    <svg
                        className="w-6 h-6 text-teal-500 animate-bounce"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>
        </section>
    );
}

export default Skills;