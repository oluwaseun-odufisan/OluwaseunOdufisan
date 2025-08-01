import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NavLink } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
    const imageRef = useRef(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [scrollPosition, setScrollPosition] = useState(0);

    const openModal = (project) => {
        setScrollPosition(window.scrollY);
        setSelectedProject(project);
        setCurrentImageIndex(0);
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
                setCurrentImageIndex(0);
                window.scrollTo({ top: scrollPosition, behavior: 'instant' });
            },
        });
    };

    const nextImage = () => {
        if (selectedProject && selectedProject.images && selectedProject.images.length > 0) {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === selectedProject.images.length - 1 ? 0 : prevIndex + 1
            );
            gsap.fromTo(
                imageRef.current,
                { opacity: 0, x: 50 },
                { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }
            );
        }
    };

    const prevImage = () => {
        if (selectedProject && selectedProject.images && selectedProject.images.length > 0) {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === 0 ? selectedProject.images.length - 1 : prevIndex - 1
            );
            gsap.fromTo(
                imageRef.current,
                { opacity: 0, x: -50 },
                { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }
            );
        }
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
                        textShadow: '0 0 20px rgba(255, 255, 255, 0.7)',
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
            boxShadow: '0 0 15px rgba(255, 255, 255, 0.5)',
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
            gsap.killTweensOf([titleRef.current, buttonRef.current, sectionRef.current, modalRef.current, imageRef.current]);
        };
    }, []);

    if (!projectsData.length) {
        return (
            <section
                ref={sectionRef}
                id="projects"
                className="relative py-16 sm:py-24 bg-gradient-to-b from-gray-dark to-gray-medium/20 bg-opacity-90 backdrop-blur-glass"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2
                        ref={titleRef}
                        className="text-4xl sm:text-5xl font-ars-maquette font-extrabold text-white mb-12 animate-float tracking-tight"
                    >
                        My Projects
                    </h2>
                    <p className="text-lg text-white font-ars-maquette">No projects available at the moment.</p>
                </div>
            </section>
        );
    }

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="relative py-16 sm:py-24 bg-gradient-to-b from-gray-dark to-gray-medium/20 bg-opacity-90 backdrop-blur-glass"
        >
            <ParticleBackground className="absolute inset-0 z-0 opacity-50" />
            <svg
                className="absolute bottom-0 left-0 w-full h-24 text-gray-dark"
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
                    className="text-4xl sm:text-5xl font-ars-maquette font-extrabold text-green-500 text-center mb-12 animate-float tracking-tight"
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
                            images={project.images}
                            link={project.link}
                            liveDemo={project.liveDemo}
                            index={index}
                            onViewProject={() => openModal(project)}
                        />
                    ))}
                </div>
                <div className="text-center mt-12">
                    <NavLink
                        to="/projects"
                        ref={buttonRef}
                        className={({ isActive }) =>
                            `relative text-lg font-semibold px-8 py-4 glass bg-gray-medium text-white hover:bg-white hover:text-black transition-all duration-300 ${isActive ? 'text-white font-bold border-b-2 border-white' : ''}`
                        }
                        aria-label="View all projects"
                    >
                        View All Projects
                    </NavLink>
                </div>
            </div>
            {isModalOpen && selectedProject && (
                <div
                    className="fixed inset-0 bg-black/70 flex sm:items-start items-center justify-center z-50 p-4 sm:p-6 overflow-y-auto modal-container"
                    role="dialog"
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                    aria-modal="true"
                    onClick={closeModal}
                >
                    <div
                        ref={modalRef}
                        className="relative bg-gray-700/90 backdrop-blur-xl rounded-2xl p-6 sm:p-8 max-w-4xl w-full sm:mt-20 mt-0 mx-2 sm:mx-0 max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-600/30"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white rounded-full p-2 transition-colors duration-200"
                            aria-label="Close project details"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h3 id="modal-title" className="text-2xl sm:text-3xl font-ars-maquette font-semibold text-white mb-6">
                            {selectedProject.title}
                        </h3>
                        <div className="relative w-full h-[20rem] sm:h-[28rem] mb-8 flex items-center justify-center bg-gray-800/50 rounded-xl shadow-md overflow-hidden">
                            {selectedProject.images && selectedProject.images.length > 0 ? (
                                <>
                                    <img
                                        ref={imageRef}
                                        src={selectedProject.images[currentImageIndex] || '/assets/images/placeholder.jpg'}
                                        alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                                        className="max-w-full max-h-full object-contain transition-transform duration-300"
                                    />
                                    {selectedProject.images.length > 1 && (
                                        <>
                                            <div className="absolute inset-y-0 left-0 flex items-center">
                                                <button
                                                    onClick={prevImage}
                                                    className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-r-full focus:outline-none focus:ring-2 focus:ring-white transition-colors duration-200"
                                                    aria-label="Previous image"
                                                >
                                                    <ChevronLeft className="w-6 h-6" />
                                                </button>
                                            </div>
                                            <div className="absolute inset-y-0 right-0 flex items-center">
                                                <button
                                                    onClick={nextImage}
                                                    className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-l-full focus:outline-none focus:ring-2 focus:ring-white transition-colors duration-200"
                                                    aria-label="Next image"
                                                >
                                                    <ChevronRight className="w-6 h-6" />
                                                </button>
                                            </div>
                                            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                                                {selectedProject.images.map((_, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => {
                                                            setCurrentImageIndex(index);
                                                            gsap.fromTo(
                                                                imageRef.current,
                                                                { opacity: 0, scale: 0.98 },
                                                                { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' }
                                                            );
                                                        }}
                                                        className={`w-3 h-3 rounded-full ${index === currentImageIndex
                                                            ? 'bg-white'
                                                            : 'bg-gray-600/50 hover:bg-gray-600'
                                                            } transition-all duration-200`}
                                                        aria-label={`Go to image ${index + 1}`}
                                                    />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </>
                            ) : (
                                <img
                                    src="/assets/images/placeholder.jpg"
                                    alt="No images available"
                                    className="max-w-full max-h-full object-contain"
                                />
                            )}
                        </div>
                        <p
                            id="modal-description"
                            className="text-base sm:text-lg font-ars-maquette text-white mb-8 leading-relaxed"
                        >
                            {selectedProject.description}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                text="Visit GitHub"
                                href={selectedProject.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="primary"
                                className="text-base sm:text-lg font-semibold px-6 py-2 bg-gray-medium text-white hover:bg-white hover:text-black transition-all duration-300 rounded-lg"
                                aria-label={`Visit ${selectedProject.title} on GitHub`}
                            />
                            {selectedProject.liveDemo && (
                                <Button
                                    text="Live Demo"
                                    href={selectedProject.liveDemo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variant="secondary"
                                    className="text-base sm:text-lg font-semibold px-6 py-2 bg-gray-medium text-white hover:bg-white hover:text-black transition-all duration-300 rounded-lg"
                                    aria-label={`Visit live demo of ${selectedProject.title}`}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Projects;