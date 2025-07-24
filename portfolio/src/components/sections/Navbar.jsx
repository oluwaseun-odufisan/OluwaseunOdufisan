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
    const mobileMenuRef = useRef(null);
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

    // Handle scroll locking for mobile menu
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    // Handle animations
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

        // Navbar setup
        gsap.set(navbarRef.current, { height: '5rem', backgroundColor: 'rgba(0, 0, 0, 0.95)', boxShadow: '0 4px 12px rgba(255, 255, 255, 0.15)' });

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
                link.addEventListener('mouseenter', () => {
                    gsap.to(link.querySelector('.underline'), {
                        width: '100%',
                        duration: 0.3,
                        ease: 'power3.out',
                    });
                });
                link.addEventListener('mouseleave', () => {
                    gsap.to(link.querySelector('.underline'), {
                        width: '0',
                        duration: 0.3,
                        ease: 'power3.out',
                    });
                });
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
            buttonRef.current.addEventListener('click', () => {
                const particle = document.createElement('span');
                particle.className = 'particle-burst';
                buttonRef.current.appendChild(particle);
                gsap.fromTo(
                    particle,
                    { scale: 0, opacity: 0.8, x: '50%', y: '50%' },
                    {
                        scale: 2,
                        opacity: 0,
                        duration: 0.5,
                        ease: 'power2.out',
                        onComplete: () => particle.remove(),
                    }
                );
            });
        }

        gsap.to(progressRef.current, {
            width: '100%',
            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.9), rgba(160, 174, 192, 0.7))',
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.5,
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            if (buttonRef.current) {
                buttonRef.current.removeEventListener('click', () => {});
            }
            navLinksRef.current.forEach((link) => {
                if (link) {
                    link.removeEventListener('mouseenter', () => {});
                    link.removeEventListener('mouseleave', () => {});
                }
            });
        };
    }, [location, handleSectionNav]);

    // Mobile menu animation
    useEffect(() => {
        if (!mobileMenuRef.current) return;

        if (isOpen) {
            gsap.set(mobileMenuRef.current, { display: 'block', visibility: 'visible' });
            gsap.fromTo(
                mobileMenuRef.current,
                { x: '100%' },
                { x: '0%', duration: 0.4, ease: 'power3.out' }
            );
        } else {
            gsap.to(mobileMenuRef.current, {
                x: '100%',
                duration: 0.4,
                ease: 'power3.in',
                onComplete: () => {
                    gsap.set(mobileMenuRef.current, { display: 'none', visibility: 'hidden' });
                },
            });
        }

        return () => {
            gsap.killTweensOf(mobileMenuRef.current);
        };
    }, [isOpen]);

    return (
        <nav
            ref={navbarRef}
            className="fixed top-0 left-0 w-full bg-black bg-opacity-95 backdrop-blur-glass z-[100]"
            aria-label="Main Navigation"
        >
            <style>
                {`
                    .backdrop-blur-glass {
                        backdrop-filter: blur(8px);
                        -webkit-backdrop-filter: blur(8px);
                    }
                    .particle-burst {
                        position: absolute;
                        width: 12px;
                        height: 12px;
                        background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 10%, transparent 70%);
                        border-radius: 50%;
                        pointer-events: none;
                        transform: translate(-50%, -50%);
                    }
                    .underline {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 0;
                        height: 2px;
                        background: linear-gradient(90deg, #FFFFFF, #A0AEC0);
                        transition: width 0.3s ease;
                    }
                `}
            </style>
            <div className="absolute bottom-0 left-0 h-1" ref={progressRef} style={{ width: '0%' }} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <a
                        href="#main-content"
                        className="sr-only focus:not-sr-only focus:absolute focus:bg-white focus:text-black p-2 rounded"
                        aria-label="Skip to main content"
                    >
                        Skip to content
                    </a>
                    <Link
                        to="/"
                        ref={logoRef}
                        className="text-3xl font-sans font-extrabold text-white hover:text-gray-300 transition-colors"
                        aria-label="Oluwaseun's Portfolio Home"
                        onClick={handleHomeClick}
                    >
                        Oluwaseun Odufisan
                    </Link>
                    <div className="hidden md:flex space-x-8 items-center">
                        <NavLink
                            to="/"
                            ref={(el) => (navLinksRef.current[0] = el)}
                            onClick={handleHomeClick}
                            className={({ isActive }) =>
                                `text-white font-sans text-lg hover:text-gray-300 transition-colors relative ${isActive && !location.hash ? 'text-white font-bold border-b-2 border-white' : ''}`
                            }
                            aria-label="Navigate to Home"
                            aria-current={location.pathname === '/' && !location.hash ? 'page' : undefined}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleHomeClick();
                                }
                            }}
                        >
                            Home
                            <span className="underline" />
                        </NavLink>
                        <NavLink
                            to="/projects"
                            ref={(el) => (navLinksRef.current[1] = el)}
                            className={({ isActive }) =>
                                `text-white font-sans text-lg hover:text-gray-300 transition-colors relative ${isActive ? 'text-white font-bold border-b-2 border-white' : ''}`
                            }
                            aria-label="Navigate to Projects"
                            aria-current={location.pathname === '/projects' ? 'page' : undefined}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    navigate('/projects');
                                    if (isOpen) toggleMenu();
                                }
                            }}
                        >
                            Projects
                            <span className="underline" />
                        </NavLink>
                        <button
                            onClick={() => handleSectionNav('achievements')}
                            ref={(el) => (navLinksRef.current[2] = el)}
                            className={`text-white font-sans text-lg hover:text-gray-300 transition-colors relative ${location.pathname === '/' && location.hash === '#achievements' ? 'text-white font-bold border-b-2 border-white' : ''}`}
                            aria-label="Scroll to Achievements section"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleSectionNav('achievements');
                                }
                            }}
                        >
                            Achievements
                            <span className="underline" />
                        </button>
                        <button
                            onClick={() => handleSectionNav('contact')}
                            ref={(el) => (navLinksRef.current[3] = el)}
                            className={`text-white font-sans text-lg hover:text-gray-300 transition-colors relative ${location.pathname === '/' && location.hash === '#contact' ? 'text-white font-bold border-b-2 border-white' : ''}`}
                            aria-label="Scroll to Contact section"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                   _xml_body0x00000011
                                    handleSectionNav('contact');
                                }
                            }}
                        >
                            Contact
                            <span className="underline" />
                        </button>
                        <div className="flex space-x-4">
                            <a
                                href="https://github.com/oluwaseun-odufisan"
                                target="_blank"
                                rel="noopener noreferrer"
                                ref={(el) => (socialLinksRef.current[0] = el)}
                                aria-label="GitHub Profile"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        window.open('https://github.com/oluwaseun-odufisan', '_blank', 'noopener,noreferrer');
                                    }
                                }}
                            >
                                <Github className="w-6 h-6 text-white hover:text-gray-300 transition-colors" />
                            </a>
                            <a
                                href="https://linkedin.com/in/oluwaseun-odufisan"
                                target="_blank"
                                rel="noopener noreferrer"
                                ref={(el) => (socialLinksRef.current[1] = el)}
                                aria-label="LinkedIn Profile"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        window.open('https://linkedin.com/in/oluwaseun-odufisan', '_blank', 'noopener,noreferrer');
                                    }
                                }}
                            >
                                <Linkedin className="w-6 h-6 text-white hover:text-gray-300 transition-colors" />
                            </a>
                        </div>
                        <Button
                            ref={buttonRef}
                            text="Download CV"
                            href="/assets/pdf/Oluwaseun-Odufisan-cv.pdf"
                            download
                            variant="primary"
                            className="text-lg font-semibold px-6 py-3 rounded-lg"
                            aria-label="Download Oluwaseun's CV"
                        />
                    </div>
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white rounded"
                            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                            aria-expanded={isOpen}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    toggleMenu();
                                }
                            }}
                        >
                            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                        </button>
                    </div>
                </div>
                {isOpen && (
                    <div
                        ref={mobileMenuRef}
                        className="md:hidden mobile-menu bg-black bg-opacity-95 backdrop-blur-glass border-t border-gray-800 absolute w-full top-20 left-0 z-50"
                    >
                        <div className="px-4 pt-4 pb-6 space-y-3">
                            <NavLink
                                to="/"
                                onClick={handleHomeClick}
                                className={({ isActive }) =>
                                    `block px-4 py-2 text-white font-sans text-lg hover:text-gray-300 hover:bg-gray-800 hover:bg-opacity-20 rounded-md ${isActive && !location.hash ? 'text-white font-bold' : ''}`
                                }
                                aria-label="Navigate to Home"
                                aria-current={location.pathname === '/' && !location.hash ? 'page' : undefined}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/projects"
                                onClick={toggleMenu}
                                className={({ isActive }) =>
                                    `block px-4 py-2 text-white font-sans text-lg hover:text-gray-300 hover:bg-gray-800 hover:bg-opacity-20 rounded-md ${isActive ? 'text-white font-bold' : ''}`
                                }
                                aria-label="Navigate to Projects"
                                aria-current={location.pathname === '/projects' ? 'page' : undefined}
                            >
                                Projects
                            </NavLink>
                            <button
                                onClick={() => handleSectionNav('achievements')}
                                className={`block px-4 py-2 text-white font-sans text-lg hover:text-gray-300 hover:bg-gray-800 hover:bg-opacity-20 rounded-md ${location.pathname === '/' && location.hash === '#achievements' ? 'text-white font-bold' : ''}`}
                                aria-label="Scroll to Achievements section"
                            >
                                Achievements
                            </button>
                            <button
                                onClick={() => handleSectionNav('contact')}
                                className={`block px-4 py-2 text-white font-sans text-lg hover:text-gray-300 hover:bg-gray-800 hover:bg-opacity-20 rounded-md ${location.pathname === '/' && location.hash === '#contact' ? 'text-white font-bold' : ''}`}
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
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            window.open('https://github.com/oluwaseun-odufisan', '_blank', 'noopener,noreferrer');
                                        }
                                    }}
                                >
                                    <Github className="w-6 h-6 text-white hover:text-gray-300" />
                                </a>
                                <a
                                    href="https://linkedin.com/in/oluwaseun-odufisan"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn Profile"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            window.open('https://linkedin.com/in/oluwaseun-odufisan', '_blank', 'noopener,noreferrer');
                                        }
                                    }}
                                >
                                    <Linkedin className="w-6 h-6 text-white hover:text-gray-300" />
                                </a>
                            </div>
                            <div className="px-4 py-2">
                                <Button
                                    text="Download CV"
                                    href="/assets/pdf/Oluwaseun-Odufisan-cv.pdf"
                                    download
                                    variant="primary"
                                    className="w-full text-lg font-semibold px-6 py-3 rounded-lg download-cv-button"
                                    aria-label="Download Oluwaseun's CV"
                                    onClick={() => {
                                        const particle = document.createElement('span');
                                        particle.className = 'particle-burst';
                                        const button = document.querySelector('.mobile-menu .download-cv-button');
                                        if (button) {
                                            button.appendChild(particle);
                                            gsap.fromTo(
                                                particle,
                                                { scale: 0, opacity: 0.8, x: '50%', y: '50%' },
                                                {
                                                    scale: 2,
                                                    opacity: 0,
                                                    duration: 0.5,
                                                    ease: 'power2.out',
                                                    onComplete: () => particle.remove(),
                                                }
                                            );
                                        }
                                    }}
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