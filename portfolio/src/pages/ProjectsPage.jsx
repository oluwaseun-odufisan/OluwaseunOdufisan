import { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Filter, ArrowLeft } from 'lucide-react';
import ProjectCard from '../components/sections/ProjectCard.jsx';
import ParticleBackground from '../components/common/ParticleBackground.jsx';
import Button from '../components/common/Button.jsx';

gsap.registerPlugin(ScrollTrigger);

function ProjectsPage() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const filterRef = useRef(null);
    const cardRefs = useRef([]);
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Sample project data (replace with your actual projects)
    const projects = [
        {
            id: 1,
            title: 'E-Commerce Platform',
            description: 'A full-stack e-commerce platform with payment integration and user authentication.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            image: '/assets/images/ecommerce.jpg',
            github: 'https://github.com/oluwaseun-odufisan/ecommerce',
            liveDemo: 'https://ecommerce-demo.vercel.app',
            category: 'Web Development',
        },
        {
            id: 2,
            title: 'Task Manager App',
            description: 'A mobile app for task management with real-time sync and reminders.',
            technologies: ['React Native', 'Firebase', 'TypeScript'],
            image: '/assets/images/taskmanager.jpg',
            github: 'https://github.com/oluwaseun-odufisan/task-manager',
            liveDemo: 'https://taskmanager-demo.vercel.app',
            category: 'Mobile Apps',
        },
        {
            id: 3,
            title: 'AI Image Generator',
            description: 'An AI-powered tool for generating images from text prompts.',
            technologies: ['Python', 'TensorFlow', 'React', 'AWS'],
            image: '/assets/images/aiimage.jpg',
            github: 'https://github.com/oluwaseun-odufisan/ai-image-generator',
            liveDemo: 'https://aiimage-demo.vercel.app',
            category: 'AI',
        },
        {
            id: 4,
            title: 'Portfolio Website',
            description: 'This very portfolio, showcasing modern web design and animations.',
            technologies: ['React', 'Tailwind CSS', 'GSAP'],
            image: '/assets/images/portfolio.jpg',
            github: 'https://github.com/oluwaseun-odufisan/portfolio',
            liveDemo: 'https://oluwaseun-portfolio.vercel.app',
            category: 'Web Development',
        },
    ];

    // Unique categories for filtering
    const categories = ['All', ...new Set(projects.map((project) => project.category))];

    // Filtered projects based on selected category
    const filteredProjects = useMemo(() => {
        if (selectedCategory === 'All') return projects;
        return projects.filter((project) => project.category === selectedCategory);
    }, [selectedCategory]);

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
                        textShadow: '0 0 25px rgba(20, 184, 166, 0.8), 0 0 10px rgba(20, 184, 166, 0.5)',
                        duration: 1.5,
                        repeat: -1,
                        yoyo: true,
                        ease: 'power1.inOut',
                    });
                },
            }
        );

        // Filter buttons entrance
        gsap.fromTo(
            filterRef.current.children,
            { opacity: 0, x: -20 },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
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

        // Filter transition animation
        gsap.fromTo(
            cardRefs.current,
            { opacity: 1 },
            {
                opacity: 0,
                duration: 0.3,
                ease: 'power2.out',
                onComplete: () => {
                    gsap.fromTo(
                        cardRefs.current,
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
            },
            selectedCategory // Trigger animation on category change
        );

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, [selectedCategory]);

    const handleFilterClick = (category) => {
        setSelectedCategory(category);
    };

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="relative min-h-screen py-16 sm:py-24 bg-gradient-to-b from-white-bg via-teal-light/30 to-teal-primary/20 bg-opacity-90 backdrop-blur-glass"
            aria-label="Projects Section"
        >
            {/* Particle Background */}
            <ParticleBackground className="absolute inset-0 z-0 opacity-40" />

            {/* Wave SVG */}
            <svg
                className="absolute bottom-0 left-0 w-full h-32 text-teal-light"
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

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1
                    ref={titleRef}
                    className="text-4xl sm:text-5xl font-poppins font-extrabold text-teal-primary text-center mb-12 animate-float tracking-tight"
                    aria-label="My Projects"
                >
                    My Projects
                </h1>

                {/* Filter Bar */}
                <div
                    ref={filterRef}
                    className="flex flex-wrap justify-center gap-4 mb-12"
                    role="tablist"
                    aria-label="Project Category Filters"
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => handleFilterClick(category)}
                            className={`glass px-4 py-2 rounded-full font-inter text-lg transition-all duration-300 ${selectedCategory === category
                                    ? 'bg-teal-primary text-white shadow-glass'
                                    : 'text-gray-accent hover:bg-teal-dark hover:text-white'
                                }`}
                            role="tab"
                            aria-selected={selectedCategory === category}
                            aria-label={`Filter by ${category}`}
                        >
                            <span className="flex items-center space-x-2">
                                <Filter className="w-5 h-5" />
                                <span>{category}</span>
                            </span>
                        </button>
                    ))}
                </div>

                {/* Project Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                    image={project.image}
                                    github={project.github}
                                    liveDemo={project.liveDemo}
                                />
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-accent col-span-full">
                            No projects found for this category.
                        </p>
                    )}
                </div>

                {/* Back to Home Button */}
                <div className="text-center mt-12">
                    <Button
                        text={
                            <span className="flex items-center justify-center space-x-2">
                                <ArrowLeft className="w-5 h-5" />
                                <span>Back to Home</span>
                            </span>
                        }
                        to="/"
                        variant="primary"
                        className="glass px-8 py-4 text-lg font-semibold text-teal-primary hover:bg-teal-dark hover:text-white transition-all duration-300"
                        aria-label="Return to Home Page"
                    />
                </div>

                {/* Scroll Indicator */}
                <div className="text-center mt-12">
                    <Link
                        to="/#contact"
                        className="text-teal-primary text-sm font-inter animate-bounce-subtle"
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

export default ProjectsPage;