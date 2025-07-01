import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger, ScrollToPlugin } from 'gsap/all';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import Button from '../common/Button.jsx';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function Navbar() {
    const [isOpen, setIsOpen] = useState(false); // Mobile menu state
    const navbarRef = useRef(null);
    const logoRef = useRef(null);
    const navLinksRef = useRef([]);
    const socialLinksRef = useRef([]);
    const buttonRef = useRef(null);
    const progressRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleMenu = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const handleSectionNav = useCallback(
        (sectionId) => {
            if (location.pathname !== '/') {
                navigate('/');
                setTimeout(() => {
                    const element = document.getElementById(sectionId);
                    if (element) {
                        gsap.to(window, {
                            scrollTo: { y: element, offsetY: 80 },
                            duration: 0.8,
                            ease: 'power3.out',
                        });
                    }
                }, 100);
            } else {
                const element = document.getElementById(sectionId);
                if (element) {
                    gsap.to(window, {
                        scrollTo: { y: element, offsetY: 80 },
                        duration: 0.8,
                        ease: 'power3.out',
                    });
                }
            }
            if (isOpen) toggleMenu();
        },
        [location.pathname, navigate, isOpen, toggleMenu]
    );

    const handleHomeClick = useCallback(() => {
        // Force a full page reload to refresh the page and start from the top
        window.location.assign('/');
        if (isOpen) toggleMenu();
    }, [isOpen, toggleMenu]);

    useEffect(() => {
        // Handle hash navigation on homepage
        const hash = location.hash.replace('#', '');
        if (location.pathname === '/' && hash) {
            setTimeout(() => {
                const element = document.getElementById(hash);
                if (element) {
                    gsap.to(window, {
                        scrollTo: { y: element, offsetY: 80 },
                        duration: 0.8,
                        ease: 'power3.out',
                    });
                }
            }, 100);
        }

        // Scroll to top on page navigation (non-home pages)
        if (location.pathname !== '/' && !location.hash) {
            gsap.to(window, {
                scrollTo: { y: 0, offsetY: 80 },
                duration: 0.8,
                ease: 'power3.out',
            });
        }

        // Set static navbar styles
        gsap.set(navbarRef.current, {
            height: '5rem',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        });

        // Logo entrance with pulsating glow
        gsap.fromTo(
            logoRef.current,
            { opacity: 0, y: -50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                delay: 0.3,
                onComplete: () => {
                    gsap.to(logoRef.current, {
                        textShadow: '0 0 15px rgba(20, 184, 166, 0.7)',
                        duration: 1.5,
                        repeat: -1,
                        yoyo: true,
                        ease: 'power1.inOut',
                    });
                },
            }
        );

        // Staggered animation for nav links
        navLinksRef.current.forEach((link, index) => {
            if (link) {
                gsap.fromTo(
                    link,
                    { opacity: 0, y: -20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power3.out',
                        delay: 0.5 + index * 0.1,
                    }
                );

                const handleNavMouseEnter = () => {
                    gsap.to(link, {
                        scale: 1.1,
                        color: '#14b8a6',
                        rotateX: 5,
                        rotateY: 5,
                        duration: 0.3,
                        ease: 'power2.out',
                        borderBottom: '2px solid #14b8a6',
                    });
                };

                const handleNavMouseLeave = () => {
                    gsap.to(link, {
                        scale: 1,
                        color: '#4b5563',
                        rotateX: 0,
                        rotateY: 0,
                        duration: 0.3,
                        ease: 'power2.out',
                        borderBottom: 'none',
                    });
                };

                link.addEventListener('mouseenter', handleNavMouseEnter);
                link.addEventListener('mouseleave', handleNavMouseLeave);

                link._handlers = { mouseenter: handleNavMouseEnter, mouseleave: handleNavMouseLeave };
            }
        });

        // Social links hover animation
        socialLinksRef.current.forEach((link, index) => {
            if (link) {
                gsap.fromTo(
                    link,
                    { opacity: 0, scale: 0.8 },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.6,
                        ease: 'power3.out',
                        delay: 0.9 + index * 0.1,
                    }
                );

                const handleSocialMouseEnter = () => {
                    gsap.to(link, {
                        scale: 1.2,
                        color: '#14b8a6',
                        duration: 0.3,
                        ease: 'power2.out',
                    });
                };

                const handleSocialMouseLeave = () => {
                    gsap.to(link, {
                        scale: 1,
                        color: '#4b5563',
                        duration: 0.3,
                        ease: 'power2.out',
                    });
                };

                link.addEventListener('mouseenter', handleSocialMouseEnter);
                link.addEventListener('mouseleave', handleSocialMouseLeave);

                link._handlers = { mouseenter: handleSocialMouseEnter, mouseleave: handleSocialMouseLeave };
            }
        });

        // Button hover animation
        if (buttonRef.current) {
            gsap.fromTo(
                buttonRef.current,
                { opacity: 0, scale: 0.8 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    ease: 'power3.out',
                    delay: 0.8,
                }
            );

            const handleButtonMouseEnter = () => {
                gsap.to(buttonRef.current, {
                    scale: 1.05,
                    boxShadow: '0 0 15px rgba(20, 184, 166, 0.7)',
                    duration: 0.3,
                    ease: 'power2.out',
                });
            };

            const handleButtonMouseLeave = () => {
                gsap.to(buttonRef.current, {
                    scale: 1,
                    boxShadow: 'none',
                    duration: 0.3,
                    ease: 'power2.out',
                });
            };

            buttonRef.current.addEventListener('mouseenter', handleButtonMouseEnter);
            buttonRef.current.addEventListener('mouseleave', handleButtonMouseLeave);

            buttonRef.current._handlers = { mouseenter: handleButtonMouseEnter, mouseleave: handleButtonMouseLeave };
        }

        // Scroll progress bar with gradient
        gsap.to(progressRef.current, {
            width: '100%',
            background: 'linear-gradient(to right, #14b8a6, #0d9488)',
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: true,
            },
        });

        // Mobile menu animation
        if (isOpen) {
            gsap.fromTo(
                '.mobile-menu',
                { x: '100%', opacity: 0 },
                { x: '0%', opacity: 1, duration: 0.5, ease: 'power3.out' }
            );
        }

        return () => {
            navLinksRef.current.forEach((link) => {
                if (link && link._handlers) {
                    link.removeEventListener('mouseenter', link._handlers.mouseenter);
                    link.removeEventListener('mouseleave', link._handlers.mouseleave);
                }
            });

            socialLinksRef.current.forEach((link) => {
                if (link && link._handlers) {
                    link.removeEventListener('mouseenter', link._handlers.mouseenter);
                    link.removeEventListener('mouseleave', link._handlers.mouseleave);
                }
            });

            if (buttonRef.current && buttonRef.current._handlers) {
                buttonRef.current.removeEventListener('mouseenter', buttonRef.current._handlers.mouseenter);
                buttonRef.current.removeEventListener('mouseleave', buttonRef.current._handlers.mouseleave);
            }

            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, [isOpen, location, handleSectionNav, toggleMenu]);

    return (
        <nav
            ref={navbarRef}
            className="fixed top-0 left-0 w-full bg-white-bg bg-opacity-80 backdrop-blur-glass shadow-glass z-[100] transition-colors duration-300"
            aria-label="Main Navigation"
        >
            <div
                className="absolute bottom-0 left-0 h-1 bg-teal-primary"
                ref={progressRef}
                style={{ width: '0%' }}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Skip to Content */}
                    <a
                        href="#main-content"
                        className="sr-only focus:not-sr-only focus:absolute focus:bg-teal-500 focus:text-white p-2 rounded"
                        aria-label="Skip to main content"
                    >
                        Skip to content
                    </a>

                    {/* Logo */}
                    <Link
                        to="/"
                        ref={logoRef}
                        className="text-3xl font-poppins font-extrabold text-teal-500 hover:text-teal-600 transition-colors"
                        aria-label="Oluwaseun's Portfolio Home"
                    >
                        Oluwaseun Odufisan
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <NavLink
                            to="/"
                            ref={(el) => (navLinksRef.current[0] = el)}
                            onClick={handleHomeClick}
                            className={({ isActive }) =>
                                `text-gray-600 font-inter text-lg hover:text-teal-500 transition-colors ${isActive && !location.hash ? 'text-teal-500 font-bold border-b-2 border-teal-500' : ''}`
                            }
                            aria-label="Navigate to Home"
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/projects"
                            ref={(el) => (navLinksRef.current[1] = el)}
                            className={({ isActive }) =>
                                `text-gray-600 font-inter text-lg hover:text-teal-500 transition-colors ${isActive ? 'text-teal-500 font-bold border-b-2 border-teal-500' : ''}`
                            }
                            aria-label="Navigate to Projects"
                        >
                            Projects
                        </NavLink>
                        <button
                            onClick={() => handleSectionNav('achievements')}
                            ref={(el) => (navLinksRef.current[2] = el)}
                            className={`text-gray-600 font-inter text-lg hover:text-teal-500 transition-colors ${location.pathname === '/' && location.hash === '#achievements' ? 'text-teal-500 font-bold border-b-2 border-teal-500' : ''}`}
                            aria-label="Scroll to Achievements section"
                        >
                            Achievements
                        </button>
                        <button
                            onClick={() => handleSectionNav('contact')}
                            ref={(el) => (navLinksRef.current[3] = el)}
                            className={`text-gray-600 font-inter text-lg hover:text-teal-500 transition-colors ${location.pathname === '/' && location.hash === '#contact' ? 'text-teal-500 font-bold border-b-2 border-teal-500' : ''}`}
                            aria-label="Scroll to Contact section"
                        >
                            Contact
                        </button>
                        <div className="flex space-x-4">
                            <a
                                href="https://github.com/oluwaseun-odufisan"
                                target="_blank"
                                rel="noopener noreferrer"
                                ref={(el) => (socialLinksRef.current[0] = el)}
                                aria-label="GitHub Profile"
                            >
                                <Github className="w-6 h-6 text-gray-600 hover:text-teal-500 transition-colors" />
                            </a>
                            <a
                                href="https://linkedin.com/in/oluwaseun-odufisan"
                                target="_blank"
                                rel="noopener noreferrer"
                                ref={(el) => (socialLinksRef.current[1] = el)}
                                aria-label="LinkedIn Profile"
                            >
                                <Linkedin className="w-6 h-6 text-gray-600 hover:text-teal-500 transition-colors" />
                            </a>
                        </div>
                        <Button
                            ref={buttonRef}
                            text="Download CV"
                            href="/assets/documents/cv.pdf"
                            download
                            variant="primary"
                            className="glass px-6 py-3 text-lg font-semibold text-white bg-teal-500 hover:bg-teal-600 transition-all duration-300"
                            aria-label="Download Oluwaseun's CV"
                        />
                    </div>

                    {/* Hamburger Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-600 hover:text-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded"
                            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                            aria-expanded={isOpen}
                        >
                            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden mobile-menu bg-white-bg bg-opacity-90 backdrop-blur-glass border-t border-teal-200">
                        <div className="px-4 pt-4 pb-6 space-y-3">
                            <NavLink
                                to="/"
                                onClick={handleHomeClick}
                                className={({ isActive }) =>
                                    `block px-4 py-2 text-gray-600 font-inter text-lg hover:text-teal-500 hover:bg-teal-100 hover:bg-opacity-20 rounded-md ${isActive && !location.hash ? 'text-teal-500 font-bold' : ''}`
                                }
                                aria-label="Navigate to Home"
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/projects"
                                onClick={toggleMenu}
                                className={({ isActive }) =>
                                    `block px-4 py-2 text-gray-600 font-inter text-lg hover:text-teal-500 hover:bg-teal-100 hover:bg-opacity-20 rounded-md ${isActive ? 'text-teal-500 font-bold' : ''}`
                                }
                                aria-label="Navigate to Projects"
                            >
                                Projects
                            </NavLink>
                            <button
                                onClick={() => handleSectionNav('achievements')}
                                className={`block px-4 py-2 text-gray-600 font-inter text-lg hover:text-teal-500 hover:bg-teal-100 hover:bg-opacity-20 rounded-md ${location.pathname === '/' && location.hash === '#achievements' ? 'text-teal-500 font-bold' : ''}`}
                                aria-label="Scroll to Achievements section"
                            >
                                Achievements
                            </button>
                            <button
                                onClick={() => handleSectionNav('contact')}
                                className={`block px-4 py-2 text-gray-600 font-inter text-lg hover:text-teal-500 hover:bg-teal-100 hover:bg-opacity-20 rounded-md ${location.pathname === '/' && location.hash === '#contact' ? 'text-teal-500 font-bold' : ''}`}
                                aria-label="Scroll to Contact section"
                            >
                                Contact
                            </button>
                            <div className="px-4 py-2 flex space-x-4">
                                <a
                                    href="https://github.com/oluwaseun-odufisan"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub Profile"
                                >
                                    <Github className="w-6 h-6 text-gray-600 hover:text-teal-500" />
                                </a>
                                <a
                                    href="https://linkedin.com/in/oluwaseun-odufisan"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn Profile"
                                >
                                    <Linkedin className="w-6 h-6 text-gray-600 hover:text-teal-500" />
                                </a>
                            </div>
                            <div className="px-4 py-2">
                                <Button
                                    text="Download CV"
                                    href="/assets/documents/cv.pdf"
                                    download
                                    variant="primary"
                                    className="w-full glass px-6 py-3 text-lg font-semibold text-white bg-teal-500 hover:bg-teal-600 transition-all duration-300"
                                    aria-label="Download Oluwaseun's CV"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;