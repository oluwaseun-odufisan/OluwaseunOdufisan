import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger, CustomEase } from 'gsap/all';
import { SiReact, SiTailwindcss, SiJavascript, SiNodedotjs, SiMongodb, SiPython, SiTensorflow } from 'react-icons/si';
import skillsData from '../../data/skills.json';

gsap.registerPlugin(ScrollTrigger, CustomEase);

function Skills() {
    const [activeCategory, setActiveCategory] = useState('all');
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const filterRef = useRef(null);
    const cardsRef = useRef([]);
    const timeline = useRef(gsap.timeline());
    const [hoveredSkill, setHoveredSkill] = useState(null);

    const iconMap = {
        React: <SiReact className="w-6 h-6 text-white skill-icon" />,
        'Tailwind CSS': <SiTailwindcss className="w-6 h-6 text-white skill-icon" />,
        'JavaScript (ES6+)': <SiJavascript className="w-6 h-6 text-white skill-icon" />,
        'Node.js': <SiNodedotjs className="w-6 h-6 text-white skill-icon" />,
        MongoDB: <SiMongodb className="w-6 h-6 text-white skill-icon" />,
        Python: <SiPython className="w-6 h-6 text-white skill-icon" />,
        TensorFlow: <SiTensorflow className="w-6 h-6 text-white skill-icon" />,
    };

    const handleCategoryChange = useCallback(
        (category) => {
            timeline.current.clear();
            timeline.current.to(cardsRef.current.filter((el) => el), {
                opacity: 0,
                scale: 0.8,
                rotationX: 90,
                duration: 0.3,
                stagger: 0.05,
                ease: 'power2.in',
                onComplete: () => {
                    setActiveCategory(category);
                    cardsRef.current = cardsRef.current.filter((el) => el);
                    timeline.current.to(cardsRef.current, {
                        opacity: 1,
                        scale: 1,
                        rotationX: 0,
                        duration: 0.6,
                        stagger: 0.05,
                        ease: 'power4.out',
                    });
                },
            });
        },
        []
    );

    useEffect(() => {
        CustomEase.create('holographic', 'M0,0 C0.2,0.8 0.4,1 1,1');

        if (titleRef.current) {
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: 50, filter: 'blur(5px)' },
                {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 0.7,
                    ease: 'holographic',
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: 'top 90%',
                        toggleActions: 'play none none reverse',
                    },
                    onComplete: () => {
                        gsap.to(titleRef.current, {
                            textShadow: '0 0 12px rgba(255, 255, 255, 0.6)',
                            duration: 1.5,
                            repeat: -1,
                            yoyo: true,
                            ease: 'sine.inOut',
                        });
                    },
                }
            );

            titleRef.current.addEventListener('mouseenter', () => {
                gsap.to(titleRef.current, {
                    textShadow: '0 0 15px rgba(255, 255, 255, 0.8), 0 0 25px rgba(255, 255, 255, 0.4)',
                    duration: 0.3,
                    ease: 'power2.out',
                });
            });
            titleRef.current.addEventListener('mouseleave', () => {
                gsap.to(titleRef.current, {
                    textShadow: '0 0 12px rgba(255, 255, 255, 0.6)',
                    duration: 0.3,
                    ease: 'power2.out',
                });
            });
        }

        if (filterRef.current) {
            gsap.fromTo(
                filterRef.current.children,
                { opacity: 0, y: 20, filter: 'blur(3px)' },
                {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 0.3,
                    stagger: 0.1,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: filterRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }

        return () => {
            gsap.killTweensOf([titleRef.current, filterRef.current?.children]);
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.trigger === titleRef.current || trigger.trigger === filterRef.current) {
                    trigger.kill();
                }
            });
            if (titleRef.current) {
                titleRef.current.removeEventListener('mouseenter', () => {});
                titleRef.current.removeEventListener('mouseleave', () => {});
            }
        };
    }, []);

    useEffect(() => {
        cardsRef.current.forEach((card, index) => {
            if (card) {
                gsap.fromTo(
                    card,
                    { opacity: 0, rotationX: 90, scale: 0.8, y: -20 },
                    {
                        opacity: 1,
                        rotationX: 0,
                        scale: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power4.out',
                        delay: index * 0.1,
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                        onComplete: () => {
                            card.querySelectorAll('.progress-bar').forEach((bar, barIndex) => {
                                gsap.fromTo(
                                    bar,
                                    { width: 0 },
                                    {
                                        width: `${skillsData[Object.keys(skillsData)[index]]?.[barIndex]?.proficiency}%`,
                                        duration: 0.5,
                                        ease: 'power3.out',
                                        onStart: () => {
                                            const trail = document.createElement('span');
                                            trail.className = 'particle-trail';
                                            bar.appendChild(trail);
                                            gsap.fromTo(
                                                trail,
                                                { opacity: 0.8, scale: 0.5, x: 0 },
                                                {
                                                    opacity: 0,
                                                    scale: 1,
                                                    x: `${skillsData[Object.keys(skillsData)[index]]?.[barIndex]?.proficiency}%`,
                                                    duration: 0.5,
                                                    ease: 'power2.out',
                                                    onComplete: () => trail.remove(),
                                                }
                                            );
                                        },
                                    }
                                );
                            });
                        },
                    }
                );

                const handleMouseEnter = (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
                    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
                    gsap.to(card, {
                        rotateX: y * 10,
                        rotateY: x * 10,
                        scale: 1.05,
                        border: '2px solid rgba(255, 255, 255, 0.8)',
                        boxShadow: '0 0 15px rgba(255, 255, 255, 0.6)',
                        duration: 0.4,
                        ease: 'power2.out',
                    });
                    gsap.to(card.querySelectorAll('.skill-icon'), {
                        scale: 1.3,
                        duration: 0.6,
                        ease: 'power3.out',
                    });
                    gsap.to(card.querySelector('.card-overlay'), {
                        opacity: 0.4,
                        duration: 0.4,
                        ease: 'power2.out',
                    });
                };

                const handleMouseLeave = () => {
                    gsap.to(card, {
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        border: 'none',
                        boxShadow: '0 4px 6px rgba(255, 255, 255, 0.05)',
                        duration: 0.4,
                        ease: 'power2.out',
                    });
                    gsap.to(card.querySelectorAll('.skill-icon'), {
                        scale: 1,
                        duration: 0.6,
                        ease: 'power3.out',
                    });
                    gsap.to(card.querySelector('.card-overlay'), {
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
                className="relative py-16 sm:py-24 bg-gradient-to-b from-black to-gray-dark/50 bg-opacity-90 font-ars-maquette"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2
                        ref={titleRef}
                        className="text-4xl sm:text-5xl font-extrabold text-white mb-12 tracking-tight relative"
                    >
                        My Expertise
                        <span className="scanline" />
                    </h2>
                    <p className="text-lg text-white">No skills data available at the moment.</p>
                </div>
            </section>
        );
    }

    const categories = ['all', ...Object.keys(skillsData)];

    return (
        <section
            ref={sectionRef}
            id="skills"
            className="relative py-16 sm:py-24 bg-gradient-to-b from-black to-gray-dark/50 bg-opacity-90 overflow-hidden font-ars-maquette"
            aria-label="Skills and Expertise"
        >
            <style>
                {`
                    .scanline {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 2px;
                        background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.8), transparent);
                        animation: scanline 2s linear infinite;
                    }
                    .underline {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 0;
                        height: 2px;
                        background: white;
                        transition: width 0.3s ease;
                    }
                    .particle-trail {
                        position: absolute;
                        width: 6px;
                        height: 6px;
                        background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 10%, transparent 70%);
                        border-radius: 50%;
                        pointer-events: none;
                    }
                    .grid-overlay {
                        position: absolute;
                        inset: 0;
                        background: repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(255, 255, 255, 0.1) 21px), 
                                    repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255, 255, 255, 0.1) 21px);
                        opacity: 0.2;
                        animation: grid-pulse 5s ease-in-out infinite;
                    }
                    @keyframes scanline {
                        0% { transform: translateY(0); opacity: 0.5; }
                        50% { transform: translateY(100%); opacity: 0.8; }
                        100% { transform: translateY(0); opacity: 0.5; }
                    }
                    @keyframes grid-pulse {
                        0% { opacity: 0.2; }
                        50% { opacity: 0.3; }
                        100% { opacity: 0.2; }
                    }
                `}
            </style>
            <div className="grid-overlay" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <h2
                    ref={titleRef}
                    className="text-4xl sm:text-5xl font-extrabold text-white text-center mb-12 tracking-tight relative"
                    aria-label="My Expertise Section"
                >
                    My Expertise
                    <span className="scanline" />
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
                                        boxShadow: '0 0 12px rgba(255, 255, 255, 0.7)',
                                        duration: 0.3,
                                        ease: 'power2.out',
                                    });
                                    gsap.to(filterRef.current.children[index].querySelector('.underline'), {
                                        width: '100%',
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
                                    gsap.to(filterRef.current.children[index].querySelector('.underline'), {
                                        width: '0',
                                        duration: 0.3,
                                        ease: 'power2.out',
                                    });
                                }
                            }}
                            className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-300 relative focus:outline-none focus:ring-2 focus:ring-white ${
                                activeCategory === category
                                    ? 'bg-white text-black shadow-lg shadow-white/30'
                                    : 'bg-gray-700 text-white hover:bg-gray-600 hover:text-white'
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
                            <span className="underline" />
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
                                className="relative glass p-6 rounded-xl bg-gray-900/80 backdrop-blur-md hover:bg-gray-800/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
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
                                <h3 className="text-xl font-semibold text-white capitalize mb-4">
                                    {category.replace(/([A-Z])/g, ' $1').trim()}
                                </h3>
                                <ul className="space-y-4">
                                    {skills.map((skill, skillIndex) => (
                                        <li
                                            key={skillIndex}
                                            className="flex items-center justify-between text-white text-base relative group"
                                            onMouseEnter={() => {
                                                setHoveredSkill(`${category}-${skillIndex}`);
                                                const tooltip = document.getElementById(`tooltip-${category}-${skillIndex}`);
                                                gsap.fromTo(
                                                    tooltip,
                                                    { y: 5, opacity: 0 },
                                                    { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
                                                );
                                            }}
                                            onMouseLeave={() => {
                                                setHoveredSkill(null);
                                                const tooltip = document.getElementById(`tooltip-${category}-${skillIndex}`);
                                                gsap.to(tooltip, { opacity: 0, duration: 0.3, ease: 'power2.out' });
                                            }}
                                        >
                                            <div className="flex items-center space-x-3">
                                                {iconMap[skill.name] && (
                                                    <span className="skill-icon text-white">{iconMap[skill.name]}</span>
                                                )}
                                                <span>{skill.name}</span>
                                            </div>
                                            <div className="w-1/3 bg-gray-600 rounded-full h-2">
                                                <div
                                                    className="progress-bar bg-white h-2 rounded-full transition-all duration-500 ease-out"
                                                    style={{ width: `${skill.proficiency}%` }}
                                                />
                                            </div>
                                            <div
                                                className={`absolute left-0 bottom-full mb-2 p-2 bg-gray-700 text-white text-sm rounded-lg shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:delay-150 pointer-events-none z-30 max-w-xs border border-white/20 box-shadow-[0_0_8px_rgba(255,255,255,0.6)] ${
                                                    hoveredSkill === `${category}-${skillIndex}` ? 'opacity-100' : ''
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
                                <div className="card-overlay absolute inset-0 bg-white/10 rounded-xl pointer-events-none transition-opacity duration-300" />
                            </div>
                        ))}
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                    <span className="text-white text-sm mb-2"></span>
                    <svg
                        className="w-6 h-6 text-white animate-bounce"
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