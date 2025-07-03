import { useEffect, useRef, useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
        const footer = footerRef.current;
        const nav = navRef.current;
        const social = socialRef.current;
        const button = buttonRef.current;
        const backToTop = backToTopRef.current;

        gsap.fromTo(
            footer,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: footer,
                    start: 'top 100%',
                    end: 'bottom bottom',
                    toggleActions: 'play none none none',
                    invalidateOnRefresh: true, // Ensures trigger recalculates on navigation
                },
            }
        );

        if (nav) {
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
        }

        if (social) {
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
        }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <footer
            ref={footerRef}
            className="relative bg-gradient-to-t from-teal-primary/20 via-teal-light/30 to-white-bg bg-opacity-90 backdrop-blur-glass py-12"
            aria-label="Footer"
        >
            <ParticleBackground />
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-poppins font-semibold text-teal-primary mb-4">Explore</h3>
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
                        <h3 className="text-xl font-poppins font-semibold text-teal-primary mb-4">Connect</h3>
                        <div ref={socialRef} className="flex justify-center space-x-6" aria-label="Social Media Links">
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
                        <h3 className="text-xl font-poppins font-semibold text-teal-primary mb-4 px-9">Get in Touch</h3>
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