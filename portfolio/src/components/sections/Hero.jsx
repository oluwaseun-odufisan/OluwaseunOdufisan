import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger, TextPlugin } from 'gsap/all';
import { NavLink } from 'react-router-dom';
import ParticleBackground from '../common/ParticleBackground.jsx';
import Button from '../common/Button.jsx';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

function Hero() {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const buttonWrapperRef = useRef(null);
    const letterRefs = useRef([]);
    const arrowRef = useRef(null);

    useEffect(() => {
        const name = "Oluwaseun Isaac Odufisan";
        const letters = name.split('');

        letterRefs.current.forEach((letter, index) => {
            const randomX = (Math.random() - 0.5) * 1000;
            const randomY = (Math.random() - 0.5) * 800;
            const randomAngle = (Math.random() - 0.5) * 360;
            const delay = index * 0.05;

            gsap.fromTo(
                letter,
                {
                    x: randomX,
                    y: randomY,
                    rotation: randomAngle,
                    opacity: 0,
                    scale: 0.2,
                },
                {
                    x: 0,
                    y: 0,
                    rotation: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    ease: 'power4.out',
                    delay: delay,
                    onStart: () => {
                        gsap.to(letter, {
                            boxShadow: '0 0 20px rgba(255, 255, 255, 0.8)',
                            duration: 0.3,
                            ease: 'power2.out',
                            onComplete: () => {
                                gsap.to(letter, { boxShadow: 'none', duration: 0.3 });
                            },
                        });
                    },
                }
            );
        });

        gsap.to(titleRef.current, {
            boxShadow: '0 0 15px rgba(255, 255, 255, 0.5)',
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            delay: letters.length * 0.05 + 0.5,
        });

        gsap.fromTo(
            subtitleRef.current,
            { text: '', opacity: 0 },
            {
                text: 'Software Engineer | Building Solutions with Code & Intelligence',
                opacity: 1,
                duration: 2.5,
                ease: 'none',
                delay: letters.length * 0.05 + 0.8,
                onUpdate: function () {
                    subtitleRef.current.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.6)';
                },
                onComplete: () => {
                    gsap.to(subtitleRef.current, {
                        textShadow: '0 0 5px rgba(255, 255, 255, 0.3)',
                        duration: 1,
                        repeat: -1,
                        yoyo: true,
                        ease: 'power1.inOut',
                    });
                },
            }
        );

        gsap.fromTo(
            buttonWrapperRef.current.children,
            { opacity: 0, y: 50, scale: 0.8 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: 'back.out(2)',
                stagger: 0.3,
                delay: letters.length * 0.05 + 1.2,
                onComplete: () => {
                    gsap.to(buttonWrapperRef.current.children, {
                        boxShadow: '0 0 20px rgba(255, 255, 255, 0.6)',
                        duration: 1.2,
                        repeat: -1,
                        yoyo: true,
                        ease: 'power1.inOut',
                    });
                },
            }
        );

        gsap.to(heroRef.current, {
            yPercent: 15,
            ease: 'none',
            scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        });

        gsap.fromTo(
            arrowRef.current,
            { y: -10, opacity: 0.7 },
            {
                y: 10,
                opacity: 1,
                duration: 1,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
                delay: letters.length * 0.05 + 1.5,
            }
        );

        gsap.to(arrowRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        });

        const buttons = buttonWrapperRef.current.children;
        Array.from(buttons).forEach((button) => {
            button.addEventListener('mouseenter', () => {
                gsap.to(button, {
                    scale: 1.2,
                    boxShadow: '0 10px 25px rgba(255, 255, 255, 0.7)',
                    duration: 0.4,
                    ease: 'power3.out',
                });
            });
            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    scale: 1,
                    boxShadow: '0 4px 6px rgba(255, 255, 255, 0.1)',
                    duration: 0.4,
                    ease: 'power3.out',
                });
            });
        });

        gsap.to('.particle-canvas', {
            opacity: 0.8,
            scale: 1.1,
            duration: 5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
        });

        return () => {
            Array.from(buttons).forEach((button) => {
                button.removeEventListener('mouseenter', () => {});
                button.removeEventListener('mouseleave', () => {});
            });
        };
    }, []);

    return (
        <section
            id="hero"
            ref={heroRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black font-ars-maquette"
        >
            <div className="absolute inset-0 z-0">
                <style>
                    {`
                        .cosmic-vortex {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            overflow: hidden;
                            pointer-events: none;
                        }

                        .vortex-core {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            width: 500px;
                            height: 500px;
                            transform: translate(-50%, -50%);
                            background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 10%, transparent 70%);
                            animation: vortex-pulse 6s ease-in-out infinite;
                        }

                        .vortex-core::before,
                        .vortex-core::after {
                            content: '';
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            border: 3px solid rgba(255, 255, 255, 0.4);
                            border-radius: 50%;
                            animation: vortex-spin 8s linear infinite;
                            box-shadow: 0 0 20px rgba(255, 255, 255, 0.6), inset 0 0 15px rgba(255, 255, 255, 0.4);
                        }

                        .vortex-core::after {
                            animation: vortex-spin-reverse 10s linear infinite;
                            border: 2px dashed rgba(255, 255, 255, 0.2);
                            transform: scale(1.2);
                        }

                        .vortex-particle {
                            position: absolute;
                            width: 10px;
                            height: 10px;
                            background: rgba(255, 255, 255, 0.8);
                            border-radius: 50%;
                            box-shadow: 0 0 15px rgba(255, 255, 255, 1);
                            animation: particle-orbit 12s ease-in-out infinite;
                        }

                        .vortex-particle:nth-child(2) {
                            top: 20%;
                            left: 80%;
                            animation: particle-orbit-reverse 9s ease-in-out infinite;
                            animation-delay: -2s;
                            width: 8px;
                            height: 8px;
                        }

                        .vortex-particle:nth-child(3) {
                            top: 70%;
                            left: 30%;
                            animation: particle-orbit 15s ease-in-out infinite;
                            animation-delay: -4s;
                            width: 12px;
                            height: 12px;
                        }

                        @keyframes vortex-pulse {
                            0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.3; }
                            50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.6; }
                            100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.3; }
                        }

                        @keyframes vortex-spin {
                            0% { transform: rotate(0deg) scale(1); }
                            100% { transform: rotate(360deg) scale(1.5); }
                        }

                        @keyframes vortex-spin-reverse {
                            0% { transform: rotate(360deg) scale(1.2); }
                            100% { transform: rotate(0deg) scale(0.8); }
                        }

                        @keyframes particle-orbit {
                            0% { transform: translate(-50%, -50%) rotate(0deg) translateX(150px) rotate(0deg); opacity: 0.8; }
                            50% { opacity: 1; }
                            100% { transform: translate(-50%, -50%) rotate(360deg) translateX(150px) rotate(-360deg); opacity: 0.8; }
                        }

                        @keyframes particle-orbit-reverse {
                            0% { transform: translate(-50%, -50%) rotate(360deg) translateX(200px) rotate(-360deg); opacity: 0.8; }
                            50% { opacity: 1; }
                            100% { transform: translate(-50%, -50%) rotate(0deg) translateX(200px) rotate(0deg); opacity: 0.8; }
                        }

                        .energy-wave {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            width: 600px;
                            height: 600px;
                            transform: translate(-50%, -50%);
                            animation: wave-expand 7s ease-in-out infinite;
                            pointer-events: none;
                        }

                        @keyframes wave-expand {
                            0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.2; }
                            50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.5; }
                            100% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.2; }
                        }

                        .scroll-arrow {
                            position: absolute;
                            bottom: 80px;
                            left: 50%;
                            transform: translateX(-50%);
                            width: 40px;
                            height: 60px;
                            z-index: 10;
                            pointer-events: none;
                        }

                        .scroll-arrow svg {
                            fill: none;
                            stroke: rgba(255, 255, 255, 0.9);
                            stroke-width: 3;
                            filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.7));
                        }

                        .scroll-arrow::before {
                            content: '';
                            position: absolute;
                            top: -10px;
                            left: 50%;
                            transform: translateX(-50%);
                            width: 50px;
                            height: 50px;
                            background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 10%, transparent 70%);
                            animation: arrow-pulse 2s ease-in-out infinite;
                        }

                        @keyframes arrow-pulse {
                            0% { transform: translateX(-50%) scale(0.8); opacity: 0.3; }
                            50% { transform: translateX(-50%) scale(1.2); opacity: 0.6; }
                            100% { transform: translateX(-50%) scale(0.8); opacity: 0.3; }
                        }
                    `}
                </style>
                <div className="cosmic-vortex">
                    <div className="vortex-core"></div>
                    <div className="vortex-particle"></div>
                    <div className="vortex-particle"></div>
                    <div className="vortex-particle"></div>
                    <svg className="energy-wave" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
                        <path
                            d="M100,10 A90,90 0 0,1 190,100 A90,90 0 0,1 100,190 A90,90 0 0,1 10,100 A90,90 0 0,1 100,10"
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.4)"
                            strokeWidth="2"
                            strokeDasharray="10,5"
                        />
                    </svg>
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-gray-medium/20 to-transparent z-5" />

            <ParticleBackground className="particle-canvas" />

            <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-9xl mx-auto">
                <h1
                    ref={titleRef}
                    className="text-5xl sm:text-7xl lg:text-8xl font-extrabold text-white mb-8 tracking-tight font-ars-maquette"
                >
                    {'Oluwaseun Isaac Odufisan'.split('').map((char, index) => (
                        <span
                            key={index}
                            ref={(el) => (letterRefs.current[index] = el)}
                            className="inline-block"
                            style={{ position: 'relative' }}
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    ))}
                </h1>
                <p
                    ref={subtitleRef}
                    className="text-xl sm:text-3xl lg:text-4xl text-white mb-10 leading-relaxed font-ars-maquette"
                >
                    Software Engineer | Building Solutions with Code & Intelligence
                </p>
                <div ref={buttonWrapperRef} className="flex flex-col sm:flex-row justify-center gap-6">
                    <NavLink
                        to="/projects"
                        className={({ isActive }) =>
                            `glass text-lg font-semibold px-8 py-4 bg-gray-200 text-black transition-all duration-300 ${isActive ? 'border-b-2 border-white' : ''}`
                        }
                        aria-label="Navigate to Projects"
                    >
                        Explore My Work
                    </NavLink>
                    <Button
                        text="Download CV"
                        href="/assets/pdf/Oluwaseun-Odufisan-cv.pdf"
                        download
                        variant="secondary"
                        className="glass text-lg font-semibold px-8 py-4 bg-gray-700 text-white hover:bg-gray-600 transition-all duration-300"
                        aria-label="Download Oluwaseun's CV"
                    />
                </div>
            </div>

            <div ref={arrowRef} className="scroll-arrow">
                <svg viewBox="0 0 24 24">
                    <path d="M12 2 L12 18 M5 11 L12 18 L19 11" />
                </svg>
            </div>
        </section>
    );
}

export default Hero;