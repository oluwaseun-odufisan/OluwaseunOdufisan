import { useEffect, useRef, useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger, ScrollToPlugin, CustomEase } from 'gsap/all';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import Button from '../common/Button.jsx';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, CustomEase);

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
                        gsap.to(window, { scrollTo: { y: element, offsetY: 0 }, duration: 0.8, ease: 'power3.out' });
                    }
                }, 100);
            } else {
                const element = document.getElementById(sectionId);
                if (element) {
                    gsap.to(window, { scrollTo: { y: element, offsetY: 0 }, duration: 0.8, ease: 'power3.out' });
                }
            }
        },
        [location.pathname, navigate]
    );

    useEffect(() => {
        CustomEase.create('holographic', 'M0,0 C0.2,0.8 0.4,1 1,1');

        const footer = footerRef.current;
        const nav = navRef.current;
        const social = socialRef.current;
        const button = buttonRef.current;
        const backToTop = backToTopRef.current;

        gsap.fromTo(
            footer,
            { opacity: 0, y: 20, filter: 'blur(3px)' },
            {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 0.5,
                ease: 'holographic',
                scrollTrigger: {
                    trigger: footer,
                    start: 'top 100%',
                    end: 'bottom bottom',
                    toggleActions: 'play none none none',
                    invalidateOnRefresh: true,
                },
            }
        );

        if (nav && nav.children) {
            gsap.fromTo(
                nav.children,
                { opacity: 0, x: -10 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.4,
                    ease: 'power3.out',
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: nav,
                        start: 'top 100%',
                        toggleActions: 'play none none none',
                        invalidateOnRefresh: true,
                    },
                }
            );

            Array.from(nav.children).forEach((link) => {
                link.addEventListener('mouseenter', () => {
                    gsap.to(link, {
                        textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
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
            });
        }

        if (social && social.children) {
            gsap.fromTo(
                social.children,
                { opacity: 0, scale: 0.9 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.4,
                    ease: 'power3.out',
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: social,
                        start: 'top 100%',
                        toggleActions: 'play none none none',
                        invalidateOnRefresh: true,
                    },
                }
            );

            Array.from(social.children).forEach((link) => {
                link.addEventListener('mouseenter', () => {
                    gsap.to(link, {
                        scale: 1.1,
                        rotate: 15,
                        boxShadow: '0 0 10px rgba(255, 255, 255, 0.6)',
                        duration: 0.3,
                        ease: 'power3.out',
                    });
                });
                link.addEventListener('mouseleave', () => {
                    gsap.to(link, {
                        scale: 1,
                        rotate: 0,
                        boxShadow: 'none',
                        duration: 0.3,
                        ease: 'power3.out',
                    });
                });
            });
        }

        if (button) {
            gsap.fromTo(
                button,
                { opacity: 0, scale: 0.9 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.4,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: button,
                        start: 'top 100%',
                        toggleActions: 'play none none none',
                        invalidateOnRefresh: true,
                    },
                }
            );

            button.addEventListener('mouseenter', () => {
                gsap.to(button, {
                    border: '2px solid white',
                    boxShadow: '0 0 12px rgba(255, 255, 255, 0.7)',
                    duration: 0.3,
                    ease: 'power3.out',
                });
            });
            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    border: 'none',
                    boxShadow: 'none',
                    duration: 0.3,
                    ease: 'power3.out',
                });
            });

            button.addEventListener('click', () => {
                const particle = document.createElement('span');
                particle.className = 'particle-burst';
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
            });
        }

        if (backToTop) {
            gsap.fromTo(
                backToTop,
                { opacity: 0, y: 10 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: backToTop,
                        start: 'top 100%',
                        toggleActions: 'play none none none',
                        invalidateOnRefresh: true,
                    },
                }
            );

            backToTop.addEventListener('mouseenter', () => {
                gsap.to(backToTop, {
                    scale: 1.2,
                    textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                    duration: 0.3,
                    ease: 'back.out(1.7)',
                });
            });
            backToTop.addEventListener('mouseleave', () => {
                gsap.to(backToTop, {
                    scale: 1,
                    textShadow: 'none',
                    duration: 0.3,
                    ease: 'power3.out',
                });
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            if (nav && nav.children) {
                Array.from(nav.children).forEach((link) => {
                    link.removeEventListener('mouseenter', () => {});
                    link.removeEventListener('mouseleave', () => {});
                });
            }
            if (social && social.children) {
                Array.from(social.children).forEach((link) => {
                    link.removeEventListener('mouseenter', () => {});
                    link.removeEventListener('mouseleave', () => {});
                });
            }
            if (button) {
                button.removeEventListener('mouseenter', () => {});
                button.removeEventListener('mouseleave', () => {});
                button.removeEventListener('click', () => {});
            }
            if (backToTop) {
                backToTop.removeEventListener('mouseenter', () => {});
                backToTop.removeEventListener('mouseleave', () => {});
            }
        };
    }, []);

    return (
        <footer
            ref={footerRef}
            className="relative bg-gradient-to-t from-gray-dark/20 via-gray-medium/30 to-gray-950 bg-opacity-90 backdrop-blur-glass py-16"
            aria-label="Footer"
        >
            <style>
                {`
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
                    @keyframes grid-pulse {
                        0% { opacity: 0.2; }
                        50% { opacity: 0.3; }
                        100% { opacity: 0.2; }
                    }
                `}
            </style>
            <div className="grid-overlay" />
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-ars-maquette font-semibold text-white mb-4">Explore</h3>
                        <nav
                            ref={navRef}
                            className="flex flex-col space-y-2 items-center md:items-start"
                            aria-label="Footer Navigation"
                        >
                            {navLinks.map((link, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSectionNav(link.sectionId)}
                                    className={`text-white font-ars-maquette text-lg hover:text-gray-300 transition-colors w-full text-center md:text-left relative ${location.pathname === '/' && location.hash === `#${link.sectionId}` ? 'text-white font-bold' : ''}`}
                                    aria-label={`Scroll to ${link.label} section`}
                                >
                                    {link.label}
                                    <span className="underline" />
                                </button>
                            ))}
                        </nav>
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-ars-maquette font-semibold text-white mb-4">Connect</h3>
                        <div ref={socialRef} className="flex justify-center space-x-6" aria-label="Social Media Links">
                            {socialLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white hover:text-gray-300 transition-colors"
                                    aria-label={link.label}
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="text-center md:text-right">
                        <h3 className="text-xl font-ars-maquette font-semibold text-white mb-4 px-9">Get in Touch</h3>
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
                            className="glass px-8 py-4 text-lg font-semibold text-white hover:bg-white hover:text-black bg-gray-medium transition-all duration-300 relative overflow-hidden"
                            aria-label="Navigate to Contact Section"
                        />
                    </div>
                </div>
                <div className="text-center mt-12">
                    <p className="text-white font-ars-maquette text-sm">
                        © {new Date().getFullYear()} Oluwaseun Odufisan. All rights reserved.
                    </p>
                </div>
                <div className="text-center mt-8">
                    <button
                        ref={backToTopRef}
                        onClick={() => handleSectionNav('hero')}
                        className="text-white text-sm font-ars-maquette"
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