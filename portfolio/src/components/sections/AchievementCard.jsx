import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Star, Code, Trophy } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function AchievementCard({ id, title, description, date, icon, link, index, markerRef }) {
    const cardRef = useRef(null);
    const overlayRef = useRef(null);
    const iconRef = useRef(null);
    const borderRef = useRef(null);
    const textRef = useRef(null);
    const tooltipRef = useRef(null);

    const iconMap = {
        Award: <Award className="w-8 h-8 text-white achievement-icon" />,
        Star: <Star className="w-8 h-8 text-white achievement-icon" />,
        Code: <Code className="w-8 h-8 text-white achievement-icon" />,
        Trophy: <Trophy className="w-8 h-8 text-white achievement-icon" />,
    };

    const handleHoverEnter = useCallback(() => {
        gsap.to(cardRef.current, {
            scale: 1.05,
            rotateX: index % 2 === 0 ? 5 : -5,
            rotateY: index % 2 === 0 ? 5 : -5,
            boxShadow: '0 15px 30px rgba(255, 255, 255, 0.1)',
            duration: 0.4,
            ease: 'power3.out',
        });
        gsap.to(overlayRef.current, {
            opacity: 0.3,
            duration: 0.4,
            ease: 'power3.out',
        });
        gsap.to(iconRef.current, {
            rotate: 15,
            scale: 1.2,
            duration: 0.4,
            ease: 'power3.out',
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.7)',
        });
        gsap.to(borderRef.current, {
            strokeDashoffset: 0,
            duration: 0.6,
            ease: 'power2.out',
        });
        gsap.to(textRef.current.children, {
            color: '#FFFFFF',
            textShadow: '0 0 5px rgba(0, 0, 0, 0.8)',
            duration: 0.4,
            ease: 'power3.out',
        });
        gsap.to(tooltipRef.current, {
            opacity: 1,
            y: -10,
            visibility: 'visible',
            duration: 0.3,
            ease: 'power3.out',
        });
        if (markerRef?.current) {
            gsap.to(markerRef.current, {
                scale: 1.5,
                backgroundColor: '#FFFFFF',
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.7)',
                duration: 0.4,
                ease: 'power3.out',
            });
        }
    }, [index, markerRef]);

    const handleHoverLeave = useCallback(() => {
        gsap.to(cardRef.current, {
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            boxShadow: '0 4px 6px rgba(255, 255, 255, 0.05)',
            duration: 0.4,
            ease: 'power3.out',
        });
        gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.4,
            ease: 'power3.out',
        });
        gsap.to(iconRef.current, {
            rotate: 0,
            scale: 1,
            duration: 0.4,
            ease: 'power3.out',
            boxShadow: 'none',
        });
        gsap.to(borderRef.current, {
            strokeDashoffset: 120,
            duration: 0.6,
            ease: 'power2.out',
        });
        gsap.to(textRef.current.children, {
            color: '#FFFFFF',
            textShadow: 'none',
            duration: 0.4,
            ease: 'power3.out',
        });
        gsap.to(tooltipRef.current, {
            opacity: 0,
            y: 0,
            visibility: 'hidden',
            duration: 0.3,
            ease: 'power3.out',
        });
        if (markerRef?.current) {
            gsap.to(markerRef.current, {
                scale: 1,
                backgroundColor: '#4A4A4A',
                boxShadow: 'none',
                duration: 0.4,
                ease: 'power3.out',
            });
        }
    }, [markerRef]);

    useEffect(() => {
        gsap.fromTo(
            cardRef.current,
            { opacity: 0, x: index % 2 === 0 ? -100 : 100, rotationY: index % 2 === 0 ? -90 : 90 },
            {
                opacity: 1,
                x: 0,
                rotationY: 0,
                duration: 0.8,
                ease: 'back.out(1.7)',
                delay: index * 0.2,
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: 'top 85%',
                    toggleActions: 'play reverses none reverse',
                },
            }
        );

        const card = cardRef.current;
        if (card) {
            card.addEventListener('mouseenter', handleHoverEnter);
            card.addEventListener('mouseleave', handleHoverLeave);
        }

        return () => {
            if (card) {
                card.removeEventListener('mouseenter', handleHoverEnter);
                card.removeEventListener('mouseleave', handleHoverLeave);
            }
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.trigger === cardRef.current) trigger.kill();
            });
        };
    }, [handleHoverEnter, handleHoverLeave, index]);

    return (
        <div
            ref={cardRef}
            className={`glass p-6 rounded-xl w-full max-w-md transition-all duration-300 relative bg-gray-700/80 backdrop-blur-md ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'}`}
            role="listitem"
            aria-label={`Achievement: ${title}`}
            tabIndex={0}
            onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && link) {
                    window.open(link, '_blank', 'noopener,noreferrer');
                }
            }}
        >
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                ref={borderRef}
            >
                <rect
                    x="2"
                    y="2"
                    width="calc(100% - 4px)"
                    height="calc(100% - 4px)"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeDasharray="30 90"
                    strokeDashoffset="120"
                />
            </svg>

            <div
                ref={tooltipRef}
                className="absolute -top-full left-0 w-full max-w-md bg-gray-600/80 backdrop-blur-md p-4 rounded-lg shadow-xl text-white font-ars-maquette text-sm opacity-0 invisible z-20"
            >
                {description}
            </div>

            <div className="flex items-start space-x-4">
                {icon && (
                    <div ref={iconRef} className="flex-shrink-0">
                        {iconMap[icon] || <Award className="w-8 h-8 text-white achievement-icon" />}
                    </div>
                )}
                <div ref={textRef}>
                    <h3 className="text-xl font-semibold text-white mb-2 animate-fade-in">
                        {title}
                    </h3>
                    <p className="text-base text-white mb-2 line-clamp-3">
                        {description}
                    </p>
                    <p className="text-sm text-white mb-3 animate-fade-in">
                        {date}
                    </p>
                    {link && (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white font-ars-maquette text-sm hover:underline animate-pulse-slow"
                            aria-label={`View details for ${title}`}
                        >
                            Learn More
                        </a>
                    )}
                </div>
            </div>
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-gradient-to-b from-white/20 to-gray-light/10 opacity-0 transition-opacity duration-300"
            />
        </div>
    );
}

export default AchievementCard;