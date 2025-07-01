import { useEffect, useRef, useState } from 'react';
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
    const modalRef = useRef(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
        gsap.fromTo(
            modalRef.current,
            { opacity: 0, scale: 0.8 },
            {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                ease: 'power3.out',
            }
        );
    };

    const closeModal = () => {
        gsap.to(modalRef.current, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            ease: 'power3.in',
            onComplete: () => {
                setIsModalOpen(false);
                setSelectedProject(null);
            },
        });
    };

    useEffect(() => {
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

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.trigger === titleRef.current || trigger.trigger === sectionRef.current) {
                    trigger.kill();
                }
            });
            gsap.killTweensOf([titleRef.current, buttonRef.current, sectionRef.current]);
        };
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
            <ParticleBackground className="absolute inset-0 z-0 opacity-50" />
            <svg
                className="absolute bottom-0 left-0 w-full h-24 text-teal-light"
                viewBox="0 0 1440 100"
                preserveAspectRatio="none"
            >
                <path
                    fill="currentColor"
                    d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,48C1248,53,1344,75,1392,85.3L1440,96L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100 BL192,100,96,100,48,100L0,100Z"
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-2">
                    {projectsData.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            id={project.id}
                            title={project.title}
                            description={project.description}
                            image={project.image}
                            link={project.link}
                            index={index}
                            onViewProject={() => openModal(project)}
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
            {isModalOpen && selectedProject && (
                <div
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                    role="dialog"
                    aria-labelledby="modal-title"
                    aria-modal="true"
                    onClick={closeModal}
                >
                    <div
                        ref={modalRef}
                        className="relative bg-white/90 backdrop-blur-md rounded-xl p-8 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto glass"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-800 hover:text-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            aria-label="Close project details"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h3 id="modal-title" className="text-2xl font-poppins font-semibold text-teal-primary mb-4">
                            {selectedProject.title}
                        </h3>
                        <img
                            src={selectedProject.image}
                            alt={selectedProject.title}
                            className="w-full h-96 object-cover rounded-lg mb-4"
                        />
                        <p className="text-base font-inter text-gray-accent mb-6">
                            {selectedProject.description}
                        </p>
                        <div className="flex justify-center">
                            <Button
                                text="Visit GitHub"
                                href={selectedProject.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="primary"
                                className="text-lg font-semibold px-6 py-3 hover:bg-teal-dark"
                                aria-label={`Visit ${selectedProject.title} on GitHub`}
                            />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Projects;