import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import ParticleBackground from '../common/ParticleBackground.jsx';
import Button from '../common/Button.jsx';
import ProjectCard from './ProjectCard.jsx';
import projectsData from '../../data/projects.json';

gsap.registerPlugin(ScrollTrigger);

function Projects() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        // Title entrance with glow effect
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
                        textShadow: '0 0 20px rgba(20, 184, 166, 0.7)',
                        duration: 1.5,
                        repeat: -1,
                        yoyo: true,
                        ease: 'power1.inOut',
                    });
                },
            }
        );

        // Button rotating border animation
        gsap.to(buttonRef.current, {
            scale: 1.05,
            boxShadow: '0 0 15px rgba(20, 184, 166, 0.5)',
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
        });
        gsap.to(buttonRef.current, {
            rotate: 360,
            duration: 10,
            repeat: -1,
            ease: 'linear',
            transformOrigin: 'center center',
        });

        // Section background animation
        gsap.fromTo(
            sectionRef.current,
            { backgroundPosition: '50% 100%' },
            {
                backgroundPosition: '50% 0%',
                duration: 20,
                repeat: -1,
                yoyo: true,
                ease: 'linear',
            }
        );

    }, []);

    if (!projectsData.length) {
        return (
            <section
                ref={sectionRef}
                id="projects"
                className="relative py-16 sm:py-24 bg-gradient-to-b from-white-bg via-teal-light/20 to-teal-primary/10 bg-opacity-90 backdrop-blur-glass"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2
                        ref={titleRef}
                        className="text-4xl sm:text-5xl font-poppins font-extrabold text-teal-primary mb-12 animate-float tracking-tight"
                    >
                        My Projects
                    </h2>
                    <p className="text-lg text-gray-accent">No projects available at the moment.</p>
                </div>
            </section>
        );
    }

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="relative py-16 sm:py-24 bg-gradient-to-b from-white-bg via-teal-light/20 to-teal-primary/10 bg-opacity-90 backdrop-blur-glass"
        >
            {/* Particle Background */}
            <ParticleBackground className="absolute inset-0 z-0 opacity-50" />

            {/* Decorative Wave SVG */}
            <svg
                className="absolute bottom-0 left-0 w-full h-24 text-teal-light"
                viewBox="0 0 1440 100"
                preserveAspectRatio="none"
            >
                <path
                    fill="currentColor"
                    d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,48C1248,53,1344,75,1392,85.3L1440,96L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"
                />
            </svg>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2
                    ref={titleRef}
                    className="text-4xl sm:text-5xl font-poppins font-extrabold text-teal-primary text-center mb-12 animate-float tracking-tight"
                    aria-label="My Projects Section"
                >
                    My Projects
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projectsData.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            id={project.id}
                            title={project.title}
                            description={project.description}
                            image={project.image}
                            link={project.link}
                            index={index}
                        />
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Button
                        ref={buttonRef}
                        text="View All Projects"
                        href="/projects"
                        variant="primary"
                        className="relative text-lg font-semibold px-8 py-4 glass hover:bg-teal-dark transition-all duration-300"
                        aria-label="View all projects"
                    />
                </div>
            </div>
        </section>
    );
}

export default Projects;