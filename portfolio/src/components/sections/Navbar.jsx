import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger, ScrollToPlugin, CustomEase } from 'gsap/all';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import Button from '../common/Button.jsx';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, CustomEase);

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const navbarRef = useRef(null);
    const logoRef = useRef(null);
    const navLinksRef = useRef([]);
    const socialLinksRef = useRef([]);
    const mobileSocialLinksRef = useRef([]);
    const buttonRef = useRef(null);
    const progressRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const hoverTimeout = useRef({});

    const toggleMenu = useCallback(() => {
        setIsOpen((prev) => {
            console.log('Toggling menu, new isOpen:', !prev); // Debug state change
            return !prev;
        });
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

    // Main animations for navbar, logo, nav links, social links, and button
    useEffect(() => {
        CustomEase.create('holographic', 'M0,0 C0.2,0.8 0.4,1 1,1');

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

        // Navbar animation
        gsap.fromTo(
            navbarRef.current,
            { y: '-100%', opacity: 0 },
            {
                y: '0%',
                opacity: 1,
                duration: 0.6,
                ease: 'holographic',
                onComplete: () => {
                    gsap.to(navbarRef.current, {
                        boxShadow: '0 4px 20px rgba(255, 255, 255, 0.2)',
                        scrollTrigger: {
                            trigger: document.body,
                            start: 'top top',
                            end: '+=100',
                            scrub: 0.5,
                        },
                    });
                },
            }
        );

        // Logo animation
        if (logoRef.current) {
            gsap.fromTo(
                logoRef.current,
                { opacity: 0, y: -20, filter: 'blur(3px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, ease: 'power3.out' }
            );
            logoRef.current.addEventListener('mouseenter', () => {
                gsap.to(logoRef.current, {
                    textShadow: '0 0 10px rgba(255, 255, 255, 0.7)',
                    scale: 1.05,
                    duration: 0.3,
                    ease: 'power3.out',
                });
            });
            logoRef.current.addEventListener('mouseleave', () => {
                gsap.to(logoRef.current, {
                    textShadow: 'none',
                    scale: 1,
                    duration: 0.3,
                    ease: 'power3.out',
                });
            });
        }

        // Nav links animation
        navLinksRef.current.forEach((link, index) => {
            if (link) {
                gsap.fromTo(
                    link,
                    { opacity: 0, y: -10 },
                    { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', delay: index * 0.1 }
                );
                link.addEventListener('mouseenter', () => {
                    gsap.to(link, {
                        textShadow: '0 0 8px rgba(255, 255, 255, 0.5)',
                        duration: 0.3,
                        ease: 'power3.out',
                    });
                    gsap.to(link.querySelector('.underline'), {
                        width: '100%',
                        duration: 0.3,
                        ease: 'power3.out',
                    });
                });
                link.addEventListener('mouseleave', () => {
                    gsap.to(link, {
                        textShadow: 'none',
                        duration: 0.3,
                        ease: 'power3.out',
                    });
                    gsap.to(link.querySelector('.underline'), {
                        width: '0',
                        duration: 0.3,
                        ease: 'power3.out',
                    });
                });
            }
        });

        // Desktop social links animation
        socialLinksRef.current.forEach((link, index) => {
            if (link) {
                gsap.fromTo(
                    link,
                    { opacity: 0, scale: 0.9 },
                    { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out', delay: 0.4 + index * 0.1 }
                );
                link.addEventListener('mouseenter', () => {
                    clearTimeout(hoverTimeout.current[index]);
                    hoverTimeout.current[index] = setTimeout(() => {
                        gsap.to(link, {
                            rotateY: 180,
                            boxShadow: '0 0 10px rgba(255, 255, 255, 0.6)',
                            transformPerspective: 400,
                            transformOrigin: 'center center',
                            duration: 0.9,
                            ease: 'power3.out',
                        });
                    }, 100);
                });
                link.addEventListener('mouseleave', () => {
                    clearTimeout(hoverTimeout.current[index]);
                    hoverTimeout.current[index] = setTimeout(() => {
                        gsap.to(link, {
                            rotateY: 0,
                            boxShadow: 'none',
                            transformPerspective: 400,
                            transformOrigin: 'center center',
                            duration: 0.9,
                            ease: 'power3.out',
                        });
                    }, 100);
                });
            }
        });

        // Button animation
        if (buttonRef.current) {
            gsap.fromTo(
                buttonRef.current,
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out', delay: 0.6 }
            );
            buttonRef.current.addEventListener('mouseenter', () => {
                gsap.to(buttonRef.current, {
                    border: '2px solid white',
                    boxShadow: '0 0 12px rgba(255, 255, 255, 0.7)',
                    duration: 0.3,
                    ease: 'power3.out',
                });
            });
            buttonRef.current.addEventListener('mouseleave', () => {
                gsap.to(buttonRef.current, {
                    border: 'none',
                    boxShadow: 'none',
                    duration: 0.3,
                    ease: 'power3.out',
                });
            });
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

        // Progress bar animation
        gsap.to(progressRef.current, {
            width: '100%',
            background: 'linear-gradient(to right, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4))',
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.5,
            },
            onComplete: () => {
                gsap.to(progressRef.current, {
                    opacity: 0.8,
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                });
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            if (logoRef.current) {
                logoRef.current.removeEventListener('mouseenter', () => {});
                logoRef.current.removeEventListener('mouseleave', () => {});
            }
            navLinksRef.current.forEach((link) => {
                if (link) {
                    link.removeEventListener('mouseenter', () => {});
                    link.removeEventListener('mouseleave', () => {});
                }
            });
            socialLinksRef.current.forEach((link) => {
                if (link) {
                    link.removeEventListener('mouseenter', () => {});
                    link.removeEventListener('mouseleave', () => {});
                    clearTimeout(hoverTimeout.current[socialLinksRef.current.indexOf(link)]);
                }
            });
            if (buttonRef.current) {
                buttonRef.current.removeEventListener('mouseenter', () => {});
                buttonRef.current.removeEventListener('mouseleave', () => {});
                buttonRef.current.removeEventListener('click', () => {});
            }
        };
    }, [location, handleSectionNav, handleHomeClick]);

    // Mobile menu animation
    useEffect(() => {
        if (!mobileMenuRef.current) {
            console.log('mobileMenuRef is null'); // Debug ref
            return;
        }

        console.log('Mobile menu useEffect, isOpen:', isOpen); // Debug state
        if (isOpen) {
            gsap.set(mobileMenuRef.current, { display: 'block', visibility: 'visible', x: '100%' });
            gsap.to(mobileMenuRef.current, {
                x: '0%',
                duration: 0.4,
                ease: 'power3.out',
            });
            Array.from(mobileMenuRef.current.querySelectorAll('a, button')).forEach((el, index) => {
                gsap.fromTo(
                    el,
                    { opacity: 0, y: 10 },
                    { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', delay: index * 0.1 }
                );
            });
            document.body.style.overflow = 'hidden';
        } else {
            gsap.to(mobileMenuRef.current, {
                x: '100%',
                duration: 0.4,
                ease: 'power3.in',
                onComplete: () => {
                    gsap.set(mobileMenuRef.current, { display: 'none', visibility: 'hidden' });
                    document.body.style.overflow = 'auto';
                },
            });
        }

        return () => {
            gsap.killTweensOf([mobileMenuRef.current, mobileMenuRef.current?.querySelectorAll('a, button')]);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    // Mobile social links animation
    useEffect(() => {
        mobileSocialLinksRef.current.forEach((link, index) => {
            if (link) {
                link.addEventListener('mouseenter', () => {
                    clearTimeout(hoverTimeout.current[`mobile-${index}`]);
                    hoverTimeout.current[`mobile-${index}`] = setTimeout(() => {
                        gsap.to(link, {
                            rotateY: 180,
                            boxShadow: '0 0 10px rgba(255, 255, 255, 0.6)',
                            transformPerspective: 400,
                            transformOrigin: 'center center',
                            duration: 0.3,
                            ease: 'power3.out',
                        });
                    }, 100);
                });
                link.addEventListener('mouseleave', () => {
                    clearTimeout(hoverTimeout.current[`mobile-${index}`]);
                    hoverTimeout.current[`mobile-${index}`] = setTimeout(() => {
                        gsap.to(link, {
                            rotateY: 0,
                            boxShadow: 'none',
                            transformPerspective: 400,
                            transformOrigin: 'center center',
                            duration: 0.3,
                            ease: 'power3.out',
                        });
                    }, 100);
                });
            }
        });

        return () => {
            mobileSocialLinksRef.current.forEach((link, index) => {
                if (link) {
                    link.removeEventListener('mouseenter', () => {});
                    link.removeEventListener('mouseleave', () => {});
                    clearTimeout(hoverTimeout.current[`mobile-${index}`]);
                }
            });
        };
    }, []);

    return (
        <nav
            ref={navbarRef}
            className="fixed top-0 left-0 w-full bg-black bg-opacity-95 backdrop-blur-glass z-[100] font-ars-maquette"
            role="navigation"
            aria-label="Main Navigation"
        >
            <style>
                {`
                    .backdrop-blur-glass {
                        backdrop-filter: blur(8px);
                        -webkit-backdrop-filter: blur(8px);
                    }
                    .grid-overlay {
                        position: absolute;
                        inset: 0;
                        background: repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(255, 255, 255, 0.1) 21px), 
                                    repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255, 255, 255, 0.1) 21px);
                        opacity: 0.2;
                        animation: grid-pulse 5s ease-in-out infinite;
                    }
                    .underline {
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 0;
                        height: 2px;
                        background: white;
                        transition: width 0.3s ease;
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
                    .social-icon {
                        transform-style: preserve-3d;
                        backface-visibility: hidden;
                    }
                    @keyframes grid-pulse {
                        0% { opacity: 0.2; }
                        50% { opacity: 0.3; }
                        100% { opacity: 0.2; }
                    }
                    .mobile-menu {
                        transform: translateX(100%);
                    }
                `}
            </style>
            <div className="grid-overlay" />
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
                        className="text-3xl font-extrabold text-white hover:text-gray-accent transition-colors"
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
                                `text-white text-lg hover:text-gray-accent transition-colors relative ${isActive && !location.hash ? 'text-gray-accent font-bold border-b-2 border-white text-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : ''}`
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
                                `text-white text-lg hover:text-gray-accent transition-colors relative ${isActive ? 'text-gray-accent font-bold border-b-2 border-white text-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : ''}`
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
                            className={`text-white text-lg hover:text-gray-accent transition-colors relative ${location.pathname === '/' && location.hash === '#achievements' ? 'text-gray-accent font-bold border-b-2 border-white text-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : ''}`}
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
                            className={`text-white text-lg hover:text-gray-accent transition-colors relative ${location.pathname === '/' && location.hash === '#contact' ? 'text-gray-accent font-bold border-b-2 border-white text-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : ''}`}
                            aria-label="Scroll to Contact section"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
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
                                className="social-icon"
                                aria-label="GitHub Profile"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        window.open('https://github.com/oluwaseun-odufisan', '_blank', 'noopener,noreferrer');
                                    }
                                }}
                            >
                                <Github className="w-6 h-6 text-white hover:text-gray-accent transition-colors" />
                            </a>
                            <a
                                href="https://linkedin.com/in/oluwaseun-odufisan"
                                target="_blank"
                                rel="noopener noreferrer"
                                ref={(el) => (socialLinksRef.current[1] = el)}
                                className="social-icon"
                                aria-label="LinkedIn Profile"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        window.open('https://linkedin.com/in/oluwaseun-odufisan', '_blank', 'noopener,noreferrer');
                                    }
                                }}
                            >
                                <Linkedin className="w-6 h-6 text-white hover:text-gray-accent transition-colors" />
                            </a>
                        </div>
                        <Button
                            ref={buttonRef}
                            text="Download CV"
                            href="/assets/pdf/Oluwaseun-Odufisan-cv.pdf"
                            download
                            variant="secondary"
                            className="glass text-lg font-semibold px-8 py-4 bg-gray-200 text-black hover:bg-white transition-all duration-300 relative overflow-hidden"
                            aria-label="Download Oluwaseun's CV"
                        />
                    </div>
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-white hover:text-gray-accent focus:outline-none focus:ring-2 focus:ring-white rounded"
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
                        className="md:hidden mobile-menu bg-black bg-opacity-95 backdrop-blur-glass border-t border-gray-700 absolute w-full top-20 left-0 z-[100]"
                    >
                        <div className="px-4 pt-4 pb-6 space-y-3">
                            <NavLink
                                to="/"
                                onClick={handleHomeClick}
                                className={({ isActive }) =>
                                    `block px-4 py-2 text-white text-lg hover:text-gray-accent hover:bg-gray-800 hover:bg-opacity-20 rounded-md relative ${isActive && !location.hash ? 'text-gray-accent font-bold' : ''}`
                                }
                                aria-label="Navigate to Home"
                                aria-current={location.pathname === '/' && !location.hash ? 'page' : undefined}
                            >
                                Home
                                <span className="underline" />
                            </NavLink>
                            <NavLink
                                to="/projects"
                                onClick={toggleMenu}
                                className={({ isActive }) =>
                                    `block px-4 py-2 text-white text-lg hover:text-gray-accent hover:bg-gray-800 hover:bg-opacity-20 rounded-md relative ${isActive ? 'text-gray-accent font-bold' : ''}`
                                }
                                aria-label="Navigate to Projects"
                                aria-current={location.pathname === '/projects' ? 'page' : undefined}
                            >
                                Projects
                                <span className="underline" />
                            </NavLink>
                            <button
                                onClick={() => handleSectionNav('achievements')}
                                className={`block px-4 py-2 text-white text-lg hover:text-gray-accent hover:bg-gray-800 hover:bg-opacity-20 rounded-md relative ${location.pathname === '/' && location.hash === '#achievements' ? 'text-gray-accent font-bold' : ''}`}
                                aria-label="Scroll to Achievements section"
                            >
                                Achievements
                                <span className="underline" />
                            </button>
                            <button
                                onClick={() => handleSectionNav('contact')}
                                className={`block px-4 py-2 text-white text-lg hover:text-gray-accent hover:bg-gray-800 hover:bg-opacity-20 rounded-md relative ${location.pathname === '/' && location.hash === '#contact' ? 'text-gray-accent font-bold' : ''}`}
                                aria-label="Scroll to Contact section"
                            >
                                Contact
                                <span className="underline" />
                            </button>
                            <div className="px-4 py-2 flex space-x-4">
                                <a
                                    href="https://github.com/oluwaseun-odufisan"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    ref={(el) => (mobileSocialLinksRef.current[0] = el)}
                                    className="social-icon"
                                    aria-label="GitHub Profile"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            window.open('https://github.com/oluwaseun-odufisan', '_blank', 'noopener,noreferrer');
                                        }
                                    }}
                                >
                                    <Github className="w-6 h-6 text-white hover:text-gray-accent" />
                                </a>
                                <a
                                    href="https://linkedin.com/in/oluwaseun-odufisan"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    ref={(el) => (mobileSocialLinksRef.current[1] = el)}
                                    className="social-icon"
                                    aria-label="LinkedIn Profile"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            window.open('https://linkedin.com/in/oluwaseun-odufisan', '_blank', 'noopener,noreferrer');
                                        }
                                    }}
                                >
                                    <Linkedin className="w-6 h-6 text-white hover:text-gray-accent" />
                                </a>
                            </div>
                            <div className="px-4 py-2">
                                <Button
                                    text="Download CV"
                                    href="/assets/pdf/Oluwaseun-Odufisan-cv.pdf"
                                    download
                                    variant="primary"
                                    className="w-full glass px-6 py-3 text-lg font-semibold text-black bg-gray-200 hover:bg-white transition-all duration-300 relative overflow-hidden"
                                    aria-label="Download Oluwaseun's CV"
                                    onClick={() => {
                                        const particle = document.createElement('span');
                                        particle.className = 'particle-burst';
                                        const button = document.querySelector('.mobile-menu .glass');
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