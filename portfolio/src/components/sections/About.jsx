import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger, TextPlugin, CustomEase } from 'gsap/all';
import Button from '../common/Button.jsx';
import { SiReact, SiTailwindcss, SiJavascript, SiNodedotjs, SiMongodb, SiPython, SiTensorflow } from 'react-icons/si';
import skillsData from '../../data/skills.json';

gsap.registerPlugin(ScrollTrigger, TextPlugin, CustomEase);

function About() {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const imageRef = useRef(null);
    const titleRef = useRef(null);
    const paragraphRefs = useRef([]);
    const skillRefs = useRef([]);
    const circuitRef = useRef(null);
    const [hoveredSkill, setHoveredSkill] = useState(null);

    const iconMap = {
        React: <SiReact className="w-8 h-8 text-white skill-icon" />,
        'Tailwind CSS': <SiTailwindcss className="w-8 h-8 text-white skill-icon" />,
        'JavaScript (ES6+)': <SiJavascript className="w-8 h-8 text-white skill-icon" />,
        'Node.js': <SiNodedotjs className="w-8 h-8 text-white skill-icon" />,
        MongoDB: <SiMongodb className="w-8 h-8 text-white skill-icon" />,
        Python: <SiPython className="w-8 h-8 text-white skill-icon" />,
        TensorFlow: <SiTensorflow className="w-8 h-8 text-white skill-icon" />,
    };

    const featuredSkills = [
        ...skillsData.Frontend?.slice(0, 3) || [],
        ...skillsData.Backend?.slice(0, 2) || [],
        ...skillsData.Other?.slice(0, 2) || [],
    ].map(skill => skill.name || skill);

    useEffect(() => {
        CustomEase.create('arcane', 'M0,0 C0.25,0.75 0.5,1 1,1');

        gsap.fromTo(
            titleRef.current,
            { opacity: 0, y: 80, scale: 0.9 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.8,
                ease: 'arcane',
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                },
                onComplete: () => {
                    gsap.to(titleRef.current, {
                        textShadow: '0 0 25px rgba(255, 255, 255, 0.9), 0 0 50px rgba(255, 255, 255, 0.5), 0 0 75px rgba(255, 255, 255, 0.3)',
                        duration: 2.5,
                        repeat: -1,
                        yoyo: true,
                        ease: 'sine.inOut',
                    });
                },
            }
        );

        paragraphRefs.current.forEach((p, index) => {
            if (p) {
                gsap.fromTo(
                    p,
                    { text: '', opacity: 0, filter: 'blur(6px)' },
                    {
                        text: p.dataset.text,
                        opacity: 1,
                        filter: 'blur(0px)',
                        duration: 1.2,
                        ease: 'power3.out',
                        delay: index * 0.2,
                        scrollTrigger: {
                            trigger: p,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        },
                        onUpdate: () => {
                            if (Math.random() > 0.85) {
                                const sparkle = document.createElement('span');
                                sparkle.className = 'sparkle';
                                p.appendChild(sparkle);
                                gsap.fromTo(
                                    sparkle,
                                    { scale: 0, opacity: 0.8, x: Math.random() * p.offsetWidth, y: Math.random() * p.offsetHeight },
                                    {
                                        scale: 1.5,
                                        opacity: 0,
                                        duration: 0.3,
                                        ease: 'power2.out',
                                        onComplete: () => sparkle.remove(),
                                    }
                                );
                            }
                            p.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.7)';
                        },
                        onComplete: () => {
                            gsap.to(p, {
                                textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                                duration: 1.5,
                                repeat: -1,
                                yoyo: true,
                                ease: 'sine.inOut',
                            });
                        },
                    }
                );
            }
        });

        gsap.fromTo(
            imageRef.current,
            { opacity: 0, scale: 0.9, filter: 'brightness(0.6)' },
            {
                opacity: 1,
                scale: 1,
                filter: 'brightness(1)',
                duration: 2,
                ease: 'arcane',
                scrollTrigger: {
                    trigger: imageRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
                onComplete: () => {
                    gsap.to(imageRef.current.querySelector('.image-overlay'), {
                        opacity: 0.3,
                        duration: 2.5,
                        repeat: -1,
                        yoyo: true,
                        ease: 'sine.inOut',
                    });
                },
            }
        );

        skillRefs.current.forEach((skill, index) => {
            if (skill) {
                gsap.fromTo(
                    skill,
                    { opacity: 0, scale: 0.4, y: 50 },
                    {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 1,
                        ease: 'back.out(1.8)',
                        delay: index * 0.2,
                        scrollTrigger: {
                            trigger: skill,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );

                const handleMouseEnter = () => {
                    setHoveredSkill(index);
                    gsap.to(skill, {
                        scale: 1.2,
                        boxShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.4)',
                        duration: 0.5,
                        ease: 'power3.out',
                    });
                    gsap.to(skill.querySelector('.skill-icon'), {
                        scale: 1.3,
                        duration: 0.7,
                        ease: 'power3.out',
                    });
                    const aura = document.createElement('span');
                    aura.className = 'skill-aura';
                    skill.appendChild(aura);
                    gsap.fromTo(
                        aura,
                        { scale: 0, opacity: 0.5 },
                        {
                            scale: 2.5,
                            opacity: 0,
                            duration: 0.8,
                            ease: 'power2.out',
                            onComplete: () => aura.remove(),
                        }
                    );
                };

                const handleMouseLeave = () => {
                    setHoveredSkill(null);
                    gsap.to(skill, {
                        scale: 1,
                        boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
                        duration: 0.5,
                        ease: 'power3.out',
                    });
                    gsap.to(skill.querySelector('.skill-icon'), {
                        scale: 1,
                        duration: 0.7,
                        ease: 'power3.out',
                    });
                };

                skill.addEventListener('mouseenter', handleMouseEnter);
                skill.addEventListener('mouseleave', handleMouseLeave);
                skill._handlers = { mouseenter: handleMouseEnter, mouseleave: handleMouseLeave };
            }
        });

        gsap.to(circuitRef.current.querySelectorAll('.circuit-path'), {
            strokeDashoffset: 0,
            duration: 6,
            ease: 'none',
            repeat: -1,
            scrollTrigger: {
                trigger: circuitRef.current,
                start: 'top 90%',
            },
        });

        gsap.to(circuitRef.current.querySelectorAll('.data-stream'), {
            x: '100vw',
            opacity: 0,
            duration: 4,
            ease: 'none',
            repeat: -1,
            stagger: 0.5,
            scrollTrigger: {
                trigger: circuitRef.current,
                start: 'top 90%',
            },
        });

        return () => {
            gsap.killTweensOf([titleRef.current, paragraphRefs.current, imageRef.current, skillRefs.current, circuitRef.current]);
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

            skillRefs.current.forEach((skill) => {
                if (skill && skill._handlers) {
                    skill.removeEventListener('mouseenter', skill._handlers.mouseenter);
                    skill.removeEventListener('mouseleave', skill._handlers.mouseleave);
                }
            });
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative py-24 sm:py-40 bg-gradient-to-b from-black to-gray-800/20 backdrop-blur-glass overflow-hidden font-ars-maquette"
            aria-label="About Oluwaseun Isaac Odufisan"
        >
            <div className="absolute inset-0 z-0">
                <style>
                    {`
                        .enchanted-bg {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            opacity: 0.3;
                            pointer-events: none;
                        }

                        .circuit-path {
                            stroke: #CCCCCC;
                            stroke-width: 3;
                            stroke-dasharray: 25;
                            stroke-dashoffset: 1000;
                            fill: none;
                        }

                        .circuit-node {
                            fill: #FFFFFF;
                            animation: pulse-node 2.5s ease-in-out infinite;
                        }

                        .data-stream {
                            position: absolute;
                            width: 12px;
                            height: 12px;
                            background: radial-gradient(circle, #FFFFFF 20%, transparent 70%);
                            border-radius: 50%;
                            box-shadow: 0 0 15px rgba(255, 255, 255, 0.7);
                        }

                        .sparkle {
                            position: absolute;
                            width: 8px;
                            height: 8px;
                            background: radial-gradient(circle, #FFFFFF 10%, transparent 70%);
                            border-radius: 50%;
                            pointer-events: none;
                        }

                        .skill-aura {
                            position: absolute;
                            inset: 0;
                            background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 10%, transparent 70%);
                            border-radius: inherit;
                            pointer-events: none;
                        }

                        @keyframes pulse-node {
                            0% { transform: scale(1); opacity: 0.9; }
                            50% { transform: scale(1.5); opacity: 1; }
                            100% { transform: scale(1); opacity: 0.9; }
                        }

                        @keyframes stream-flow {
                            0% { transform: translate(0, 0); opacity: 0.9; }
                            50% { opacity: 0.7; }
                            100% { transform: translate(100vw, 0); opacity: 0; }
                        }
                    `}
                </style>
                <svg ref={circuitRef} className="enchanted-bg" viewBox="0 0 1440 800" preserveAspectRatio="none">
                    <path
                        className="circuit-path"
                        d="M100,150 H350 V350 H650 V550 H950 V350 H1150 V150 H1350 M200,250 V450 H450 M850,250 V450 H1050"
                    />
                    <path
                        className="circuit-path"
                        d="M150,200 H400 V400 H700 V600 H1000 V400 H1200"
                    />
                    <circle className="circuit-node" cx="350" cy="350" r="6" />
                    <circle className="circuit-node" cx="650" cy="550" r="6" />
                    <circle className="circuit-node" cx="950" cy="350" r="6" />
                    <circle className="circuit-node" cx="1150" cy="150" r="6" />
                    <div className="data-stream" style={{ top: '15%', left: '5%' }} />
                    <div className="data-stream" style={{ top: '25%', left: '75%' }} />
                    <div className="data-stream" style={{ top: '65%', left: '35%' }} />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div ref={contentRef} className="space-y-12">
                        <h2
                            ref={titleRef}
                            className="text-5xl sm:text-6xl font-extrabold text-green-500 tracking-tight"
                        >
                            About Me
                        </h2>
                        <div className="space-y-10">
                            <p
                                ref={(el) => (paragraphRefs.current[0] = el)}
                                data-text="I'm Oluwaseun Isaac Odufisan, a software engineer and creative technologist dedicated to building user-focused solutions that make a difference. With expertise spanning frontend, backend, full-stack development, and AI-driven applications, I thrive on turning ideas into visually stunning digital experiences. With a mastery of modern technologies like React, Next.js, Node.js, Python, and advanced AI frameworks, I specialize in building intuitive user interfaces, efficient backend architectures, and intelligent systems that drive impact."
                                className="text-2xl sm:text-2xl text-white leading-relaxed relative"
                            />
                            <p
                                ref={(el) => (paragraphRefs.current[1] = el)}
                                data-text="Beyond coding, I’m dedicated to staying at the forefront of industry trends, constantly exploring new tools and methodologies with the goal of creating meaningful, lasting impact through technology. Let’s build something extraordinary together."
                                className="text-2xl sm:text-2xl text-white leading-relaxed relative"
                            />
                        </div>
                        <div className="flex flex-wrap gap-5" role="list" aria-label="Featured skills">
                            {featuredSkills.map((skill, index) => (
                                <button
                                    key={index}
                                    ref={(el) => (skillRefs.current[index] = el)}
                                    className={`flex items-center space-x-4 px-6 py-3 rounded-full bg-gray-600/40 text-white text-lg font-semibold hover:bg-gray-500/50 transition-all duration-300 relative overflow-hidden ${hoveredSkill === index ? 'scale-110 shadow-xl shadow-white/40' : ''}`}
                                    role="listitem"
                                    aria-label={`Skill: ${skill}`}
                                    onClick={() => {
                                        gsap.to(skillRefs.current[index], {
                                            scale: 1.2,
                                            duration: 0.3,
                                            ease: 'power2.out',
                                            yoyo: true,
                                            repeat: 1,
                                        });
                                    }}
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            skillRefs.current[index].click();
                                        }
                                    }}
                                >
                                    <span className="skill-icon">{iconMap[skill]}</span>
                                    <span>{skill}</span>
                                    <span className="skill-aura" />
                                </button>
                            ))}
                        </div>
                        <Button
                            text="Download CV"
                            href="/assets/pdf/Oluwaseun-Odufisan-cv.pdf"
                            download
                            variant="primary"
                            className="glass px-10 py-5 text-2xl font-semibold text-white bg-gray-300 hover:bg-white transition-all duration-300 shadow-xl hover:shadow-white/60 relative overflow-hidden"
                            aria-label="Download Oluwaseun's CV"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent to-white/30 animate-pulse" />
                        </Button>
                    </div>

                    <div ref={imageRef} className="relative max-w-md mx-auto">
                        <img
                            src="/assets/images/profile.JPEG"
                            alt="Oluwaseun Isaac Odufisan, AI Software Engineer"
                            className="w-full rounded-3xl shadow-glass"
                            loading="lazy"
                        />
                        <div className="image-overlay absolute inset-0 bg-white/30 rounded-3xl glass transition-opacity duration-300" />
                        <svg
                            className="absolute inset-0 w-full h-full pointer-events-none"
                            style={{ filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.6))' }}
                        >
                            <rect
                                x="4"
                                y="4"
                                width="calc(100% - 8px)"
                                height="calc(100% - 8px)"
                                fill="none"
                                stroke="#CCCCCC"
                                strokeWidth="4"
                                strokeDasharray="40 20"
                                strokeDashoffset="0"
                            >
                                <animate
                                    attributeName="stroke-dashoffset"
                                    values="0;80"
                                    dur="4s"
                                    repeatCount="indefinite"
                                />
                            </rect>
                            <path
                                d="M15,15 Hcalc(100% - 15) Vcalc(100% - 15) H15 Z"
                                fill="none"
                                stroke="#CCCCCC"
                                strokeWidth="3"
                                strokeDasharray="20 10"
                            >
                                <animate
                                    attributeName="stroke-dashoffset"
                                    values="0;60"
                                    dur="3s"
                                    repeatCount="indefinite"
                                />
                            </path>
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;