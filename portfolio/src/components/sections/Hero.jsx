import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger, TextPlugin } from 'gsap/all';
import { Link } from 'react-router-dom';
import ParticleBackground from '../common/ParticleBackground.jsx';
import Button from '../common/Button.jsx';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

function Hero() {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const buttonWrapperRef = useRef(null);

    useEffect(() => {
        // Title fade-in and scale animation
        gsap.fromTo(
            titleRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 1.2, ease: 'power4.out', delay: 0.3 }
        );

        // Typewriter effect for subtitle
        gsap.fromTo(
            subtitleRef.current,
            { text: '' },
            {
                text: 'AI Software Engineer | Building Solutions with Code & Intelligence',
                duration: 2.5,
                ease: 'none',
                delay: 0.8,
            }
        );

        // Button entrance with bounce and glow
        gsap.fromTo(
            buttonWrapperRef.current.children,
            { opacity: 0, y: 30, scale: 0.9 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: 'back.out(1.7)',
                stagger: 0.2,
                delay: 1.2,
                onComplete: () => {
                    gsap.to(buttonWrapperRef.current.children, {
                        boxShadow: '0 0 15px rgba(20, 184, 166, 0.5)',
                        duration: 1,
                        repeat: -1,
                        yoyo: true,
                        ease: 'power1.inOut',
                    });
                },
            }
        );

        // Parallax effect on scroll
        gsap.to(heroRef.current, {
            yPercent: 10,
            ease: 'none',
            scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        });

        // Button hover animation
        const buttons = buttonWrapperRef.current.children;
        Array.from(buttons).forEach((button) => {
            button.addEventListener('mouseenter', () => {
                gsap.to(button, {
                    scale: 1.15,
                    boxShadow: '0 8px 20px rgba(20, 184, 166, 0.6)',
                    duration: 0.4,
                    ease: 'power3.out',
                });
            });
            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    scale: 1,
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    duration: 0.4,
                    ease: 'power3.out',
                });
            });
        });

        return () => {
            Array.from(buttons).forEach((button) => {
                button.removeEventListener('mouseenter', () => { });
                button.removeEventListener('mouseleave', () => { });
            });
        };
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-teal-primary via-teal-light to-white-bg"
        >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-teal-primary/30 to-transparent z-5" />

            {/* Particle Background */}
            <ParticleBackground />

            {/* Content */}
            <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                <h1
                    ref={titleRef}
                    className="text-5xl sm:text-7xl lg:text-8xl font-poppins font-extrabold text-white-bg mb-8 animate-float tracking-tight"
                >
                    Oluwaseun Isaac Odufisan
                </h1>
                <p
                    ref={subtitleRef}
                    className="text-xl sm:text-3xl lg:text-4xl font-inter text-gray-accent mb-10 animate-pulse-slow leading-relaxed"
                >
                    AI Software Engineer | Building Solutions with Code & Intelligence
                </p>
                <div ref={buttonWrapperRef} className="flex flex-col sm:flex-row justify-center gap-6">
                    <Button
                        text="Explore My Work"
                        href="/projects"
                        variant="primary"
                        className="glass text-lg font-semibold px-8 py-4 hover:bg-teal-dark transition-all duration-300"
                        aria-label="Explore Oluwaseun's Projects"
                    />
                    <Button
                        text="Download CV"
                        href="/assets/pdf/cv.pdf"
                        download
                        variant="secondary"
                        className="glass text-lg font-semibold px-8 py-4 hover:bg-gray-600 transition-all duration-300"
                        aria-label="Download Oluwaseun's CV"
                    />
                </div>
            </div>

            {/* Decorative Scroll Indicator */}
            <div className="absolute bottom-0 left-0 right-0 text-center pb-8 z-10">
                <Link
                    to="/#about"
                    className="text-white-bg text-sm font-inter animate-bounce-subtle"
                    aria-label="Scroll to About section"
                >
                    <svg
                        className="w-10 h-10 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </Link>
            </div>
        </section>
    );
}

export default Hero;