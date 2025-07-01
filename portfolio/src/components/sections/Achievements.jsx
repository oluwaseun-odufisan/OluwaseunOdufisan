import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import ParticleBackground from '../common/ParticleBackground.jsx';
import AchievementCard from './AchievementCard.jsx';
import achievementsData from '../../data/achievements.json';

gsap.registerPlugin(ScrollTrigger);

function Achievements() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const timelineRef = useRef(null);
    const markersRef = useRef([]); // Initialize as empty array

    useEffect(() => {
        // Title entrance with pulsating aura
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
                        textShadow: '0 0 25px rgba(20, 184, 166, 0.8), 0 0 10px rgba(20, 184, 166, 0.5)',
                        duration: 1.5,
                        repeat: -1,
                        yoyo: true,
                        ease: 'power1.inOut',
                    });
                },
            }
        );

        // Timeline spine gradient flow animation
        gsap.fromTo(
            timelineRef.current,
            { background: 'linear-gradient(to bottom, #14b8a6, #0d9488)' },
            {
                background: 'linear-gradient(to bottom, #5eead4, #14b8a6, #0d9488)',
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: 'linear',
            }
        );
        gsap.fromTo(
            timelineRef.current,
            { height: '0%' },
            {
                height: '100%',
                duration: 1.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: timelineRef.current,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    scrub: true,
                },
            }
        );

        // Marker entrance animations
        markersRef.current.forEach((marker, index) => {
            if (marker) {
                gsap.fromTo(
                    marker,
                    { opacity: 0, scale: 0 },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        ease: 'back.out(2)',
                        delay: index * 0.2 + 0.3,
                        scrollTrigger: {
                            trigger: marker,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            }
        });

        return () => {
            // Clean up all GSAP animations and ScrollTriggers
            gsap.killTweensOf([titleRef.current, timelineRef.current, markersRef.current]);
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    if (!achievementsData.length) {
        return (
            <section
                ref={sectionRef}
                id="achievements"
                className="relative py-16 sm:py-24 bg-gradient-to-b from-white to-teal-100/30"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2
                        ref={titleRef}
                        className="text-4xl sm:text-5xl font-poppins font-extrabold text-teal-500 mb-12 tracking-tight"
                    >
                        My Achievements
                    </h2>
                    <p className="text-lg text-gray-600">No achievements available at the moment.</p>
                </div>
            </section>
        );
    }

    return (
        <section
            ref={sectionRef}
            id="achievements"
            className="relative py-16 sm:py-24 bg-gradient-to-b from-white to-teal-100/30"
            aria-label="Achievements Timeline"
        >
            {/* Particle Background */}
            <ParticleBackground className="absolute inset-0 z-0 opacity-40" />

            {/* Enhanced Wave SVG */}
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

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2
                    ref={titleRef}
                    className="text-4xl sm:text-5xl font-poppins font-extrabold text-teal-500 text-center mb-16 tracking-tight"
                    aria-label="My Achievements Section"
                >
                    My Achievements
                </h2>

                {/* Timeline Container */}
                <div className="relative">
                    {/* Timeline Spine */}
                    <div
                        ref={timelineRef}
                        className="absolute left-1/2 transform -translate-x-1/2 w-2 bg-gradient-to-b from-teal-500 to-teal-600 rounded-full"
                        style={{ height: '100%' }}
                    />

                    {/* Timeline Items */}
                    {achievementsData.map((achievement, index) => {
                        const markerRef = useRef(null); // Local ref for each marker
                        return (
                            <div
                                key={achievement.id}
                                className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                            >
                                {/* Timeline Marker */}
                                <div
                                    ref={markerRef}
                                    className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-teal-100 rounded-full z-10 cursor-pointer"
                                    tabIndex={0}
                                    aria-label={`Timeline marker for ${achievement.title}`}
                                    onFocus={() => {
                                        if (markerRef.current) {
                                            gsap.to(markerRef.current, {
                                                scale: 1.5,
                                                backgroundColor: '#14b8a6',
                                                boxShadow: '0 0 10px rgba(20, 184, 166, 0.7)',
                                                duration: 0.4,
                                                ease: 'power3.out',
                                            });
                                        }
                                    }}
                                    onBlur={() => {
                                        if (markerRef.current) {
                                            gsap.to(markerRef.current, {
                                                scale: 1,
                                                backgroundColor: '#5eead4',
                                                boxShadow: 'none',
                                                duration: 0.4,
                                                ease: 'power3.out',
                                            });
                                        }
                                    }}
                                />

                                {/* Achievement Card */}
                                <AchievementCard
                                    id={achievement.id}
                                    title={achievement.title}
                                    description={achievement.description}
                                    date={achievement.date}
                                    icon={achievement.icon}
                                    link={achievement.link}
                                    index={index}
                                    markerRef={markerRef} // Pass local ref
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Scroll Indicator */}
                <div className="text-center mt-12">
                    <Link
                        to="/#contact"
                        className="text-teal-500 text-sm font-inter animate-bounce-subtle"
                        aria-label="Scroll to Contact section"
                    >
                        <svg
                            className="w-12 h-12 mx-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                            <animate
                                attributeName="opacity"
                                values="1;0.6;1"
                                dur="1.5s"
                                repeatCount="indefinite"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Achievements;