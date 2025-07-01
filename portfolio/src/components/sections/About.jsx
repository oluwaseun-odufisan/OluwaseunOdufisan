import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../common/Button.jsx';
import { SiReact, SiTailwindcss, SiJavascript, SiNodedotjs, SiMongodb, SiPython, SiTensorflow } from 'react-icons/si';
import skillsData from '../../data/skills.json';

gsap.registerPlugin(ScrollTrigger);

function About() {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const imageRef = useRef(null);
    const titleRef = useRef(null);
    const paragraphRefs = useRef([]);
    const skillRefs = useRef([]);
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

    // Select a subset of skills for display
    const featuredSkills = [
        ...skillsData.Frontend?.slice(0, 3) || [],
        ...skillsData.Backend?.slice(0, 2) || [],
        ...skillsData.Other?.slice(0, 2) || [],
    ].map(skill => skill.name || skill);

    useEffect(() => {
        // Title animation with glowing effect
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
                        textShadow: '0 0 15px rgba(20, 184, 166, 0.7)',
                        duration: 1.5,
                        repeat: -1,
                        yoyo: true,
                        ease: 'power1.inOut',
                    });
                },
            }
        );

        // Paragraph animations (staggered entry)
        paragraphRefs.current.forEach((p, index) => {
            if (p) {
                gsap.fromTo(
                    p,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                        delay: index * 0.2,
                        scrollTrigger: {
                            trigger: p,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            }
        });

        // Image 3D entrance with particle burst effect
        gsap.fromTo(
            imageRef.current,
            { opacity: 0, scale: 0.8, rotateX: -15, rotateY: 15 },
            {
                opacity: 1,
                scale: 1,
                rotateX: 0,
                rotateY: 0,
                duration: 1.2,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: imageRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            }
        );

        // Skill tags animation
        skillRefs.current.forEach((skill, index) => {
            if (skill) {
                gsap.fromTo(
                    skill,
                    { opacity: 0, scale: 0.5, rotate: 45 },
                    {
                        opacity: 1,
                        scale: 1,
                        rotate: 0,
                        duration: 0.6,
                        ease: 'back.out(2)',
                        delay: index * 0.1,
                        scrollTrigger: {
                            trigger: skill,
                            start: 'top 90%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );

                const handleMouseEnter = () => {
                    setHoveredSkill(index);
                    gsap.to(skill, {
                        scale: 1.2,
                        boxShadow: '0 0 15px rgba(20, 184, 166, 0.7)',
                        duration: 0.3,
                        ease: 'power2.out',
                    });
                    gsap.to(skill.querySelector('.skill-icon'), {
                        rotate: 360,
                        scale: 1.3,
                        duration: 0.5,
                        ease: 'power3.out',
                    });
                };

                const handleMouseLeave = () => {
                    setHoveredSkill(null);
                    gsap.to(skill, {
                        scale: 1,
                        boxShadow: 'none',
                        duration: 0.3,
                        ease: 'power2.out',
                    });
                    gsap.to(skill.querySelector('.skill-icon'), {
                        rotate: 0,
                        scale: 1,
                        duration: 0.5,
                        ease: 'power3.out',
                    });
                };

                skill.addEventListener('mouseenter', handleMouseEnter);
                skill.addEventListener('mouseleave', handleMouseLeave);

                skill._handlers = { mouseenter: handleMouseEnter, mouseleave: handleMouseLeave };
            }
        });

        // Image hover effect
        const image = imageRef.current;
        if (image) {
            const handleImageMouseEnter = () => {
                gsap.to(image, {
                    scale: 1.05,
                    rotateX: 5,
                    rotateY: 5,
                    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
                    duration: 0.4,
                    ease: 'power2.out',
                });
                gsap.to(image.querySelector('.image-overlay'), {
                    opacity: 0.3,
                    duration: 0.4,
                    ease: 'power2.out',
                });
            };

            const handleImageMouseLeave = () => {
                gsap.to(image, {
                    scale: 1,
                    rotateX: 0,
                    rotateY: 0,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    duration: 0.4,
                    ease: 'power2.out',
                });
                gsap.to(image.querySelector('.image-overlay'), {
                    opacity: 0.2,
                    duration: 0.4,
                    ease: 'power2.out',
                });
            };

            image.addEventListener('mouseenter', handleImageMouseEnter);
            image.addEventListener('mouseleave', handleImageMouseLeave);

            image._handlers = { mouseenter: handleImageMouseEnter, mouseleave: handleImageMouseLeave };
        }

        return () => {
            // Clean up GSAP animations and ScrollTriggers
            gsap.killTweensOf([titleRef.current, paragraphRefs.current, imageRef.current, skillRefs.current]);
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

            // Clean up event listeners
            skillRefs.current.forEach((skill) => {
                if (skill && skill._handlers) {
                    skill.removeEventListener('mouseenter', skill._handlers.mouseenter);
                    skill.removeEventListener('mouseleave', skill._handlers.mouseleave);
                }
            });
            if (image && image._handlers) {
                image.removeEventListener('mouseenter', image._handlers.mouseenter);
                image.removeEventListener('mouseleave', image._handlers.mouseleave);
            }
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative py-16 sm:py-24 bg-gradient-to-b from-white to-teal-100/30 backdrop-blur-glass overflow-hidden"
            aria-label="About Oluwaseun Isaac Odufisan"
        >
            {/* Background Wave Effect */}
            <svg
                className="absolute bottom-0 left-0 w-full h-32 text-teal-100"
                viewBox="0 0 1440 120"
                preserveAspectRatio="none"
            >
                <path
                    fill="currentColor"
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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div ref={contentRef} className="space-y-8">
                        <h2
                            ref={titleRef}
                            className="text-4xl sm:text-5xl font-poppins font-extrabold text-teal-500 tracking-tight"
                        >
                            About Me
                        </h2>
                        <div className="space-y-6">
                            <p
                                ref={(el) => (paragraphRefs.current[0] = el)}
                                className="text-lg sm:text-xl font-inter text-gray-600 leading-relaxed"
                                aria-describedby="about-description-1"
                            >
                                I'm Oluwaseun Isaac Odufisan, an AI Software Engineer passionate about crafting innovative solutions that fuse cutting-edge technology with real-world impact. My expertise spans <strong>frontend</strong> (React, Tailwind CSS), <strong>backend</strong> (Node.js, MongoDB), and <strong>machine learning</strong> (TensorFlow, NLP), enabling me to build scalable, user-centric applications.
                            </p>
                            <p
                                ref={(el) => (paragraphRefs.current[1] = el)}
                                className="text-lg sm:text-xl font-inter text-gray-600 leading-relaxed"
                                aria-describedby="about-description-2"
                            >
                                From spearheading the NEG AI Banking Platform to developing AI-powered tools like the Chatbot Tutor, I thrive on tackling complex challenges. As CDS President for ICT, I’ve empowered communities through digital literacy, and my contributions to open-source projects like TensorFlow reflect my commitment to advancing technology globally.
                            </p>
                        </div>
                        {/* Skill Tags */}
                        <div className="flex flex-wrap gap-3" role="list" aria-label="Featured skills">
                            {featuredSkills.map((skill, index) => (
                                <button
                                    key={index}
                                    ref={(el) => (skillRefs.current[index] = el)}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-full bg-teal-500/10 text-gray-600 font-inter text-sm font-semibold hover:bg-teal-500/20 transition-all duration-300 ${
                                        hoveredSkill === index ? 'scale-110 shadow-lg shadow-teal-500/30' : ''
                                    }`}
                                    role="listitem"
                                    aria-label={`Skill: ${skill}`}
                                    onClick={() => {
                                        gsap.to(skillRefs.current[index], {
                                            scale: 1.2,
                                            duration: 0.2,
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
                                </button>
                            ))}
                        </div>
                        <Button
                            text="Download CV"
                            href="/assets/pdf/cv.pdf"
                            download
                            variant="primary"
                            className="glass px-6 py-3 text-lg font-semibold text-white bg-teal-500 hover:bg-teal-600 transition-all duration-300 shadow-lg hover:shadow-teal-500/50"
                            aria-label="Download Oluwaseun's CV"
                        />
                    </div>

                    {/* Profile Image */}
                    <div ref={imageRef} className="relative max-w-md mx-auto">
                        <img
                            src="/assets/images/profile.jpg"
                            alt="Oluwaseun Isaac Odufisan, AI Software Engineer"
                            className="w-full rounded-xl shadow-glass"
                            loading="lazy"
                        />
                        <div className="image-overlay absolute inset-0 bg-teal-500/20 rounded-xl glass transition-opacity duration-300" />
                        <svg
                            className="absolute inset-0 w-full h-full pointer-events-none"
                            style={{ filter: 'drop-shadow(0 0 10px rgba(20, 184, 166, 0.5))' }}
                        >
                            <rect
                                x="2"
                                y="2"
                                width="calc(100% - 4px)"
                                height="calc(100% - 4px)"
                                fill="none"
                                stroke="#14b8a6"
                                strokeWidth="2"
                                strokeDasharray="20 20"
                                strokeDashoffset="0"
                            >
                                <animate
                                    attributeName="stroke-dashoffset"
                                    values="0;40"
                                    dur="2s"
                                    repeatCount="indefinite"
                                />
                            </rect>
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;