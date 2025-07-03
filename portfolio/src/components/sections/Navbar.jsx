import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger, ScrollToPlugin } from 'gsap/all';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import Button from '../common/Button.jsx';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
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
                        gsap.to(window, { scrollTo: { y: element, offsetY: 80 }, duration: 0.8, ease: 'power3.out' });
                    }
                }, 100);
            } else {
                const element = document.getElementById(sectionId);
                if (element) {
                    gsap.to(window, { scrollTo: { y: element, offsetY: 80 }, duration: 0.8, ease: 'power3.out' });
                }
            }
            if (isOpen) toggleMenu();
        },
        [location.pathname, navigate, isOpen, toggleMenu]
    );

    const handleHomeClick = useCallback(() => {
        if (location.pathname !== '/') {
            navigate('/');
        } else {
            gsap.to(window, { scrollTo: { y: 0, offsetY: 80 }, duration: 0.8, ease: 'power3.out' });
        }
        if (isOpen) toggleMenu();
    }, [isOpen, toggleMenu, location.pathname, navigate]);

    useEffect(() => {
        // Handle hash navigation
        const hash = location.hash.replace('#', '');
        if (location.pathname === '/' && hash) {
            setTimeout(() => {
                const element = document.getElementById(hash);


                if (element) {
                    gsap.to(window, { scrollTo: { y: element, offsetY: 80 }, duration: 0.8, ease: 'power3.out' });
                }
            }, 100);
        }

        // Scroll to top on non-home pages
        if (location.pathname !== '/' && !location.hash) {
            gsap.to(window, { scrollTo: { y: 0, offsetY: 80 }, duration: 0.8, ease: 'power3.out' });
        }

        // Simplified animations
        gsap.set(navbarRef.current, { height: '5rem', backgroundColor: 'rgba(255, 255, 255, 0.95)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' });

        gsap.fromTo(
            logoRef.current,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
        );

        navLinksRef.current.forEach((link, index) => {
            if (link) {
                gsap.fromTo(
                    link,
                    { opacity: 0, y: -10 },
                    { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', delay: index * 0.1 }
                );
            }
        });

        socialLinksRef.current.forEach((link, index) => {
            if (link) {
                gsap.fromTo(
                    link,
                    { opacity: 0, scale: 0.9 },
                    { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out', delay: 0.4 + index * 0.1 }
                );
            }
        });

        if (buttonRef.current) {
            gsap.fromTo(
                buttonRef.current,
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out', delay: 0.6 }
            );
        }

        gsap.to(progressRef.current, {
            width: '100%',
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.5,
            },
        });

        // Mobile menu animation
        if (isOpen) {
            gsap.fromTo('.mobile-menu', { x: '100%' }, { x: '0%', duration: 0.4, ease: 'power3.out' });
        } else {
            gsap.to('.mobile-menu', { x: '100%', duration: 0.4, ease: 'power3.in' });
        }

        document.body.style.overflow = isOpen ? 'hidden' : 'auto';

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, location, handleSectionNav]);

    return (
        <nav
            ref={navbarRef}
            className="fixed top-0 left-0 w-full bg-white-bg bg-opacity-80 backdrop-blur-glass shadow-glass z-[100]"
            aria-label="Main Navigation"
        >
            <div className="absolute bottom-0 left-0 h-1 bg-teal-primary" ref={progressRef} style={{ width: '0%' }} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <a
                        href="#main-content"
                        className="sr-only focus:not-sr-only focus:absolute focus:bg-teal-500 focus:text-white p-2 rounded"
                        aria-label="Skip to main content"
                    >
                        Skip to content
                    </a>
                    <Link
                        to="/"
                        ref={logoRef}
                        className="text-3xl font-poppins font-extrabold text-teal-500 hover:text-teal-600 transition-colors"
                        aria-label="Oluwaseun's Portfolio Home"
                    >
                        Oluwaseun Odufisan
                    </Link>
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
                            href="/assets/pdf/Oluwaseun-Odufisan-cv.pdf"
                            download
                            variant="secondary"
                            className="glass text-lg font-semibold px-8 py-4 bg-teal-500 text-white-bg transition-all duration-300"
                            aria-label="Download Oluwaseun's CV"
                        />
                    </div>
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
                {isOpen && (
                    <div className="md:hidden mobile-menu bg-teal-50 bg-opacity-95 backdrop-blur-glass border-t border-teal-200 absolute w-full top-20 left-0 z-50">
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