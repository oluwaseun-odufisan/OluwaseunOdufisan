import { useEffect, useRef, useState, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger, ScrollToPlugin } from 'gsap/all';
import { Filter, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectCard from './ProjectCard.jsx';
import ParticleBackground from '../components/common/ParticleBackground.jsx';
import Button from '../components/common/Button.jsx';
import projectsData from './data/projects.json';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function ProjectsPage() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const filterRef = useRef(null);
    const modalRef = useRef(null);
    const imageRef = useRef(null);
    const cardRefs = useRef([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedProject, setSelectedProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();

    // Unique categories for filtering
    const categories = ['All', ...new Set(projectsData.map((project) => project.category))];

    // Filtered projects based on selected category
    const filteredProjects = useMemo(() => {
        if (selectedCategory === 'All') return projectsData;
        return projectsData.filter((project) => project.category === selectedCategory);
    }, [selectedCategory]);

    const handleHomeClick = () => {
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                gsap.to(window, {
                    scrollTo: { y: 0, offsetY: 80 },
                    duration: 0.8,
                    ease: 'power3.out',
                });
            }, 100);
        } else {
            gsap.to(window, {
                scrollTo: { y: 0, offsetY: 80 },
                duration: 0.8,
                ease: 'power3.out',
            });
        }
    };

    const openModal = (project) => {
        setSelectedProject(project);
        setCurrentImageIndex(0); // Reset to first image
        setIsModalOpen(true);
        window.scrollTo({ top: 0, behavior: 'instant' });
        gsap.fromTo(
            modalRef.current,
            { opacity: 0, scale: 0.95, y: 100 },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.5,
                ease: 'power3.out',
            }
        );
    };

    const closeModal = () => {
        gsap.to(modalRef.current, {
            opacity: 0,
            scale: 0.95,
            y: 100,
            duration: 0.4,
            ease: 'power3.in',
            onComplete: () => {
                setIsModalOpen(false);
                setSelectedProject(null);
                setCurrentImageIndex(0);
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
        // Title entrance with enhanced glow effect
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
                        textShadow: '0 0 25px rgba(20, 184, 166, 0.9), 0 0 15px rgba(20, 184, 166, 0.6)',
                        duration: 1.8,
                        repeat: -1,
                        yoyo: true,
                        ease: 'power1.inOut',
                    });
                },
            }
        );

        // Filter buttons entrance with scale effect
        gsap.fromTo(
            filterRef.current.children,
            { opacity: 0, scale: 0.8, y: 20 },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.7,
                ease: 'power3.out',
                stagger: 0.1,
                scrollTrigger: {
                    trigger: filterRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                },
            }
        );

        // Project cards entrance
        cardRefs.current.forEach((card, index) => {
            if (card) {
                gsap.fromTo(
                    card,
                    { opacity: 0, y: 50, scale: 0.9 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: 'back.out(1.7)',
                        delay: index * 0.1,
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            gsap.killTweensOf([titleRef.current, filterRef.current?.children, cardRefs.current, modalRef.current, imageRef.current]);
        };
    }, [selectedCategory]);

    const handleFilterClick = (category) => {
        setSelectedCategory(category);
        gsap.to(cardRefs.current, {
            opacity: 0,
            y: 20,
            duration: 0.3,
            ease: 'power2.out',
            stagger: 0.05,
            onComplete: () => {
                gsap.fromTo(
                    cardRefs.current.filter((el) => el),
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: 'power2.in',
                        stagger: 0.1,
                    }
                );
            },
        });
    };

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="relative min-h-[calc(100vh-5rem)] pt-20 pb-16 sm:pb-24 bg-gradient-to-br from-teal-50 via-white to-teal-100/20 bg-opacity-95 backdrop-blur-xl"
            aria-label="Projects Section"
        >
            <ParticleBackground className="absolute inset-0 z-0 opacity-20" />
            <svg
                className="absolute bottom-0 left-0 w-full h-32 text-teal-200"
                viewBox="0 0 1440 100"
                preserveAspectRatio="none"
            >
                <path
                    fill="currentColor"
                    fillOpacity="0.3"
                    d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,48C1248,53,1344,75,1392,85.3L1440,96L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"
                >
                    <animate
                        attributeName="d"
                        values="
                            M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,48C1248,53,1344,75,1392,85.3L1440,96L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z;
                            M0,74L48,68.7C96,63,192,53,288,58C384,63,480,85,576,90C672,95,768,85,864,74C960,63,1056,53,1152,58C1248,63,1344,85,1392,95.3L1440,106L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z;
                            M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,48C1248,53,1344,75,1392,85.3L1440,96L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"
                        dur="10s"
                        repeatCount="indefinite"
                    />
                </path>
            </svg>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1
                    ref={titleRef}
                    className="text-4xl sm:text-5xl md:text-6xl font-poppins font-extrabold text-teal-600 text-center mb-10 tracking-tight"
                    aria-label="My Projects"
                >
                    Explore My Work
                </h1>
                <div
                    ref={filterRef}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                    role="tablist"
                    aria-label="Project Category Filters"
                >
                    {categories.map((category, index) => (
                        <button
                            key={category}
                            onClick={() => handleFilterClick(category)}
                            onMouseEnter={() => {
                                gsap.to(filterRef.current.children[index], {
                                    scale: 1.1,
                                    boxShadow: '0 6px 16px rgba(20, 184, 166, 0.4)',
                                    duration: 0.3,
                                    ease: 'power2.out',
                                });
                            }}
                            onMouseLeave={() => {
                                gsap.to(filterRef.current.children[index], {
                                    scale: 1,
                                    boxShadow: 'none',
                                    duration: 0.3,
                                    ease: 'power2.out',
                                });
                            }}
                            className={`glass px-6 py-3 rounded-full font-inter text-base sm:text-lg font-medium transition-all duration-300 backdrop-blur-lg border border-teal-200/50 ${selectedCategory === category
                                    ? 'bg-teal-600 text-white shadow-xl shadow-teal-600/40'
                                    : 'text-teal-700 bg-white/70 hover:bg-teal-50 hover:text-teal-800'
                                }`}
                            role="tab"
                            aria-selected={selectedCategory === category}
                            aria-label={`Filter by ${category}`}
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleFilterClick(category);
                                }
                            }}
                        >
                            <span className="flex items-center space-x-2">
                                <Filter className="w-5 h-5" />
                                <span>{category}</span>
                            </span>
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project, index) => (
                            <div
                                key={project.id}
                                ref={(el) => (cardRefs.current[index] = el)}
                                className="transform transition-all duration-300"
                            >
                                <ProjectCard
                                    title={project.title}
                                    description={project.description}
                                    technologies={project.technologies}
                                    images={project.images}
                                    link={project.link}
                                    liveDemo={project.liveDemo}
                                    category={project.category}
                                    index={index}
                                    onViewProject={() => openModal(project)}
                                />
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600 col-span-full text-lg font-inter">
                            No projects found for this category.
                        </p>
                    )}
                </div>
                <div className="text-center mt-12">
                    <Button
                        text={
                            <span className="flex items-center justify-center space-x-2">
                                <ArrowLeft className="w-5 h-5" />
                                <span>Back to Home</span>
                            </span>
                        }
                        onClick={handleHomeClick}
                        variant="primary"
                        className="glass px-8 py-4 text-lg font-semibold text-teal-600 hover:bg-teal-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-teal-600/30"
                        aria-label="Return to Home Page"
                    />
                </div>
                <div className="text-center mt-8">
                    <Link
                        to="/#contact"
                        className="text-teal-600 text-sm font-inter animate-pulse"
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
                                strokeWidth="2"
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                            <animate
                                attributeName="opacity"
                                values="1;0.5;1"
                                dur="1.2s"
                                repeatCount="indefinite"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
            {isModalOpen && selectedProject && (
                <div
                    className="fixed inset-0 bg-black/80 flex items-start justify-center z-50 p-4 sm:p-6 overflow-y-auto"
                    role="dialog"
                    aria-labelledby="modal-title"
                    aria-modal="true"
                    onClick={closeModal}
                >
                    <div
                        ref={modalRef}
                        className="relative bg-white/95 backdrop-blur-xl rounded-2xl p-8 max-w-4xl w-full mt-16 sm:mt-20 max-h-[90vh] overflow-y-auto shadow-2xl border border-teal-200/30"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-800 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-full p-2 transition-colors duration-200"
                            aria-label="Close project details"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h3 id="modal-title" className="text-3xl sm:text-4xl font-poppins font-bold text-teal-600 mb-6">
                            {selectedProject.title}
                        </h3>
                        <div className="relative w-full h-[28rem] sm:h-[32rem] mb-8 overflow-hidden rounded-xl shadow-md">
                            {selectedProject.images && selectedProject.images.length > 0 ? (
                                <>
                                    <img
                                        ref={imageRef}
                                        src={selectedProject.images[currentImageIndex] || '/assets/images/placeholder.jpg'}
                                        alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-300"
                                    />
                                    {selectedProject.images.length > 1 && (
                                        <div className="absolute inset-y-0 left-0 flex items-center">
                                            <button
                                                onClick={prevImage}
                                                className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-r-full focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-200"
                                                aria-label="Previous image"
                                            >
                                                <ChevronLeft className="w-6 h-6" />
                                            </button>
                                        </div>
                                    )}
                                    {selectedProject.images.length > 1 && (
                                        <div className="absolute inset-y-0 right-0 flex items-center">
                                            <button
                                                onClick={nextImage}
                                                className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-l-full focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-200"
                                                aria-label="Next image"
                                            >
                                                <ChevronRight className="w-6 h-6" />
                                            </button>
                                        </div>
                                    )}
                                    {selectedProject.images.length > 1 && (
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
                                                            ? 'bg-teal-600'
                                                            : 'bg-gray-400/50 hover:bg-gray-400'
                                                        } transition-all duration-200`}
                                                    aria-label={`Go to image ${index + 1}`}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <img
                                    src="/assets/images/placeholder.jpg"
                                    alt="No images available"
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                        <p className="text-lg sm:text-xl font-inter text-gray-700 mb-8 leading-relaxed">
                            {selectedProject.description}
                        </p>
                        <div className="flex flex-wrap gap-3 mb-8">
                            {selectedProject.technologies && selectedProject.technologies.length > 0 ? (
                                selectedProject.technologies.map((tech, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-1.5 bg-teal-100/90 text-teal-700 rounded-full text-sm sm:text-base font-medium shadow-sm"
                                    >
                                        {tech}
                                    </span>
                                ))
                            ) : (
                                <span className="px-4 py-1.5 bg-gray-100/90 text-gray-500 rounded-full text-sm sm:text-base font-medium shadow-sm">
                                    No technologies listed
                                </span>
                            )}
                        </div>
                        <p className="text-base sm:text-lg font-inter text-gray-500 mb-8">Category: {selectedProject.category}</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                text="Visit GitHub"
                                href={selectedProject.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="primary"
                                className="text-lg sm:text-xl font-semibold px-8 py-3 bg-teal-600 text-white hover:bg-teal-700 transition-all duration-300 rounded-lg"
                                aria-label={`Visit ${selectedProject.title} on GitHub`}
                            />
                            {selectedProject.liveDemo && (
                                <Button
                                    text="Live Demo"
                                    href={selectedProject.liveDemo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variant="secondary"
                                    className="text-lg sm:text-xl font-semibold px-8 py-3 bg-gray-100 text-teal-600 hover:bg-teal-100 transition-all duration-300 rounded-lg"
                                    aria-label={`View live demo of ${selectedProject.title}`}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default ProjectsPage;