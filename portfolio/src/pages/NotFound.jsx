import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertCircle } from 'lucide-react';
import ParticleBackground from '../components/common/ParticleBackground.jsx';
import Button from '../components/common/Button.jsx';

gsap.registerPlugin(ScrollTrigger);

function NotFound() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const messageRef = useRef(null);
    const buttonRef = useRef(null);

    const handleHomeClick = () => {
        window.location.href = '/';
    };

    useEffect(() => {
        gsap.fromTo(
            titleRef.current,
            { opacity: 0, y: 50, scale: 0.8 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: 'back.out(1.7)',
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

        gsap.fromTo(
            messageRef.current,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                delay: 0.2,
                scrollTrigger: {
                    trigger: messageRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                },
            }
        );

        gsap.fromTo(
            buttonRef.current,
            { opacity: 0, scale: 0.8 },
            {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: 'back.out(1.7)',
                delay: 0.4,
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

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center py-16 bg-gradient-to-b from-gray-900 via-teal-900/30 to-teal-800/20 bg-opacity-90 backdrop-blur-glass"
            aria-label="Page Not Found"
        >
            <ParticleBackground className="absolute inset-0 z-0 opacity-40" />
            <svg
                className="absolute bottom-0 left-0 w-full h-32 text-teal-900"
                viewBox="0 0 1440 120"
                preserveAspectRatio="none"
            >
                <path
                    fill="currentColor"
                    fillOpacity="0.3"
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

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1
                    ref={titleRef}
                    className="text-6xl sm:text-8xl font-poppins font-extrabold text-teal-400 mb-6 animate-float"
                    aria-label="404 Page Not Found"
                >
                    404
                </h1>
                <p
                    ref={messageRef}
                    className="text-xl sm:text-2xl font-inter text-gray-300 mb-8"
                >
                    Oops! The page you're looking for doesn't exist.
                </p>
                <Button
                    ref={buttonRef}
                    text={
                        <span className="flex items-center justify-center space-x-2">
                            <span>Back to Home</span>
                            <AlertCircle className="w-5 h-5" />
                        </span>
                    }
                    to="/"
                    onClick={handleHomeClick}
                    variant="primary"
                    className="glass px-8 py-4 text-lg font-semibold text-gray-900 hover:bg-teal-600 transition-all duration-300 bg-teal-500"
                    aria-label="Return to Home Page with Reload"
                />
            </div>
        </section>
    );
}

export default NotFound;