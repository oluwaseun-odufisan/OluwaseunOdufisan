import { useEffect, useRef, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import AchievementCard from './AchievementCard.jsx';
import achievementsData from '../../data/achievements.json';

gsap.registerPlugin(ScrollTrigger);

const ParticleBackground = memo(() => import('../common/ParticleBackground.jsx').then((mod) => mod.default));

function Achievements() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const timelineRef = useRef(null);
    const markersRef = useRef([]);

    useEffect(() => {
        gsap.fromTo(
            titleRef.current,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: 'top 100%',
                    toggleActions: 'play none none none',
                    invalidateOnRefresh: true,
                },
            }
        );

        gsap.fromTo(
            timelineRef.current,
            { height: '0%' },
            {
                height: '100%',
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: timelineRef.current,
                    start: 'top 100%',
                    end: 'bottom bottom',
                    scrub: 0.5,
                    invalidateOnRefresh: true,
                },
            }
        );

        markersRef.current.forEach((marker, index) => {
            if (marker) {
                gsap.fromTo(
                    marker,
                    { opacity: 0, scale: 0.8 },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.3,
                        ease: 'power3.out',
                        delay: index * 0.1,
                        scrollTrigger: {
                            trigger: marker,
                            start: 'top 100%',
                            toggleActions: 'play none none none',
                            invalidateOnRefresh: true,
                        },
                    }
                );
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    if (!achievementsData.length) {
        return (
            <section
                ref={sectionRef}
                id="achievements"
                className="relative py-12 bg-gradient-to-b from-black to-gray-dark/20 font-ars-maquette"
            >
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <h2
                        ref={titleRef}
                        className="text-3xl font-extrabold text-white mb-8 tracking-tight"
                    >
                        My Achievements
                    </h2>
                    <p className="text-base text-gray-accent">No achievements available at the moment.</p>
                </div>
            </section>
        );
    }

    return (
        <section
            ref={sectionRef}
            id="achievements"
            className="relative py-12 bg-gradient-to-b from-black to-gray-dark/20 font-ars-maquette"
            aria-label="Achievements Timeline"
        >
            <div className="relative z-10 max-w-5xl mx-auto px-4">
                <h2
                    ref={titleRef}
                    className="text-3xl font-extrabold text-green-500 text-center mb-12 tracking-tight"
                    aria-label="My Achievements Section"
                >
                    My Achievements
                </h2>

                <div className="relative">
                    <div
                        ref={timelineRef}
                        className="absolute left-1/2 transform -translate-x-1/2 w-1.5 bg-white rounded-full"
                        style={{ height: '100%' }}
                    />

                    {achievementsData.map((achievement, index) => (
                        <div
                            key={achievement.id}
                            className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                        >
                            <div
                                ref={(el) => (markersRef.current[index] = el)}
                                className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-light rounded-full z-10"
                                aria-label={`Timeline marker for ${achievement.title}`}
                            />
                            <AchievementCard
                                id={achievement.id}
                                title={achievement.title}
                                description={achievement.description}
                                date={achievement.date}
                                icon={achievement.icon}
                                link={achievement.link}
                                index={index}
                                markerRef={markersRef.current[index]}
                            />
                        </div>
                    ))}
                </div>

                <div className="text-center mt-8">
                    <Link
                        to="/#contact"
                        className="text-white text-sm hover:text-gray-accent transition-colors"
                        aria-label="Scroll to Contact section"
                    >
                        <svg
                            className="w-10 h-10 mx-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default memo(Achievements);