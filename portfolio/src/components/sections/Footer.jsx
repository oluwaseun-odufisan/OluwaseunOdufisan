import { useEffect, useRef, useMemo, useCallback } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger, ScrollToPlugin } from 'gsap/all';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import ParticleBackground from '../common/ParticleBackground.jsx';
import Button from '../common/Button.jsx';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function Footer() {
    const footerRef = useRef(null);
    const navRef = useRef(null);
    const socialRef = useRef(null);
    const buttonRef = useRef(null);
    const backToTopRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const navLinks = useMemo(
        () => [
            { to: '/#hero', label: 'Home', sectionId: 'hero' },
            { to: '/#projects', label: 'Projects', sectionId: 'projects' },
            { to: '/#achievements', label: 'Achievements', sectionId: 'achievements' },
            { to: '/#contact', label: 'Contact', sectionId: 'contact' },
        ],
        []
    );

    const socialLinks = useMemo(
        () => [
            {
                href: 'https://github.com/oluwaseun-odufisan',
                icon: <Github className="w-6 h-6" />,
                label: 'GitHub Profile',
            },
            {
                href: 'https://linkedin.com/in/oluwaseun-odufisan',
                icon: <Linkedin className="w-6 h-6" />,
                label: 'LinkedIn Profile',
            },
            {
                href: 'mailto:oluwaseun@example.com',
                icon: <Mail className="w-6 h-6" />,
                label: 'Email Oluwaseun',
            },
        ],
        []
    );

    const handleSectionNav = useCallback(
        (sectionId) => {
            if (location.pathname !== '/') {
                navigate('/');
                setTimeout(() => {
                    const element = document.getElementById(sectionId);
                    if (element) {
                        gsap.to(window, {
                            scrollTo: { y: element, offsetY: 0 },
                            duration: 0.8,
                            ease: 'power3.out',
                        });
                    }
                }, 100);
            } else {
                const element = document.getElementById(sectionId);
                if (element) {
                    gsap.to(window, {
                        scrollTo: { y: element, offsetY: 0 },
                        duration: 0.8,
                        ease: 'power3.out',
                    });
                }
            }
        },
        [location.pathname, navigate]
    );

    useEffect(() => {
        gsap.fromTo(
            footerRef.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse',
                },
            }
        );

        if (navRef.current) {
            gsap.fromTo(
                navRef.current.children,
                { opacity: 0, x: -20 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: navRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            const navLinks = navRef.current.querySelectorAll('button');
            navLinks.forEach((link) => {
                const handleMouseEnter = () => {
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
                const handleMouseLeave = () => {
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
                link.addEventListener('mouseenter', handleMouseEnter);
                link.addEventListener('mouseleave', handleMouseLeave);
                link._handlers = { mouseenter: handleMouseEnter, mouseleave: handleMouseLeave };
            });
        }

        if (socialRef.current) {
            const socialLinks = socialRef.current.querySelectorAll('a');
            gsap.fromTo(
                socialLinks,
                { opacity: 0, scale: 0.8 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: 'back.out(1.7)',
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: socialRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            socialLinks.forEach((link) => {
                const handleMouseEnter = () => {
                    gsap.to(link, {
                        scale: 1.2,
                        color: '#14b8a6',
                        duration: 0.3,
                        ease: 'power2.out',
                    });
                };
                const handleMouseLeave = () => {
                    gsap.to(link, {
                        scale: 1,
                        color: '#4b5563',
                        duration: 0.3,
                        ease: 'power2.out',
                    });
                };
                link.addEventListener('mouseenter', handleMouseEnter);
                link.addEventListener('mouseleave', handleMouseLeave);
                link._handlers = { mouseenter: handleMouseEnter, mouseleave: handleMouseLeave };
            });
        }

        if (buttonRef.current) {
            gsap.fromTo(
                buttonRef.current,
                { opacity: 0, scale: 0.8 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: buttonRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
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
        }

        if (backToTopRef.current) {
            gsap.fromTo(
                backToTopRef.current,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: backToTopRef.current,
                        start: 'top 90%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
            gsap.to(backToTopRef.current, {
                y: -10,
                duration: 1,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
            });
        }

        return () => {
            if (navRef.current) {
                const navLinks = navRef.current.querySelectorAll('button');
                navLinks.forEach((link) => {
                    if (link._handlers) {
                        link.removeEventListener('mouseenter', link._handlers.mouseenter);
                        link.removeEventListener('mouseleave', link._handlers.mouseleave);
                    }
                });
            }
            if (socialRef.current) {
                const socialLinks = socialRef.current.querySelectorAll('a');
                socialLinks.forEach((link) => {
                    if (link._handlers) {
                        link.removeEventListener('mouseenter', link._handlers.mouseenter);
                        link.removeEventListener('mouseleave', link._handlers.mouseleave);
                    }
                });
            }
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, [handleSectionNav]);

    return (
        <footer
            ref={footerRef}
            className="relative bg-gradient-to-t from-teal-primary/20 via-teal-light/30 to-white-bg bg-opacity-90 backdrop-blur-glass py-50"
            aria-label="Footer"
        >
            <ParticleBackground className="absolute inset-0 z-0 opacity-40" />

            <svg
                className="absolute top-0 left-0 w-full h-32 text-teal-light"
                viewBox="0 0 1440 120"
                preserveAspectRatio="none"
            >
                <path
                    fill="currentColor"
                    d="M0,80L48,74.7C96,69,192,59,288,64C384,69,480,89,576,96C672,101,768,89,864,80C960,69,1056,59,1152,64C1248,69,1344,89,1392,101.3L1440,112L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                >
                    <animate
                        attributeName="d"
                        values="
              M0,80L48,74.7C96,69,192,59,288,64C384,69,480,89,576,96C672,101,768,89,864,80C960,69,1056,59,1152,64C1248,69,1344,89,1392,101.3L1440,112L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z;
              M0,90L48,84.7C96,79,192,69,288,74C384,79,480,99,576,106C672,111,768,99,864,90C960,79,1056,69,1152,74C1248,79,1344,99,1392,111.3L1440,122L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z;
              M0,80L48,74.7C96,69,192,59,288,64C384,69,480,89,576,96C672,101,768,89,864,80C960,69,1056,59,1152,64C1248,69,1344,89,1392,101.3L1440,112L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                        dur="10s"
                        repeatCount="indefinite"
                    />
                </path>
            </svg>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-poppins font-semibold text-teal-primary mb-4">
                            Explore
                        </h3>
                        <nav
                            ref={navRef}
                            className="flex flex-col space-y-2 items-center md:items-start"
                            aria-label="Footer Navigation"
                        >
                            {navLinks.map((link, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSectionNav(link.sectionId)}
                                    className={`text-gray-accent font-inter text-lg hover:text-teal-primary transition-colors w-full text-center md:text-left ${location.pathname === '/' && location.hash === `#${link.sectionId}` ? 'text-teal-primary font-bold' : ''}`}
                                    aria-label={`Scroll to ${link.label} section`}
                                >
                                    {link.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="text-center">
                        <h3 className="text-xl font-poppins font-semibold text-teal-primary mb-4">
                            Connect
                        </h3>
                        <div
                            ref={socialRef}
                            className="flex justify-center space-x-6"
                            aria-label="Social Media Links"
                        >
                            {socialLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-accent hover:text-teal-primary transition-colors"
                                    aria-label={link.label}
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="text-center md:text-right">
                        <h3 className="text-xl font-poppins font-semibold text-teal-primary mb-4 px-9">
                            Get in Touch
                        </h3>
                        <Button
                            ref={buttonRef}
                            text={
                                <span className="flex items-center justify-center space-x-2">
                                    <Mail className="w-5 h-5" />
                                    <span>Contact Me</span>
                                </span>
                            }
                            onClick={() => handleSectionNav('contact')}
                            variant="primary"
                            className="glass px-8 py-4 text-lg font-semibold text-teal-primary hover:bg-teal-dark hover:text-white transition-all duration-300"
                            aria-label="Navigate to Contact Section"
                        />
                    </div>
                </div>

                <div className="text-center mt-12">
                    <p className="text-gray-accent font-inter text-sm">
                        © {new Date().getFullYear()} Oluwaseun Odufisan. All rights reserved.
                    </p>
                </div>

                <div className="text-center mt-8">
                    <button
                        ref={backToTopRef}
                        onClick={() => handleSectionNav('hero')}
                        className="text-teal-primary text-sm font-inter"
                        aria-label="Scroll to Hero Section"
                    >
                        <ArrowUp className="w-8 h-8 mx-auto" />
                    </button>
                </div>
            </div>
        </footer>
    );
}

export default Footer;