import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Button from '../common/Button.jsx';

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ id, title, description, images = [], link, index, onViewProject }) {
    const cardRef = useRef(null);
    const imageRef = useRef(null);
    const overlayRef = useRef(null);
    const borderRef = useRef(null);

    const handleHoverEnter = useCallback(() => {
        gsap.to(cardRef.current, {
            scale: 1.08,
            y: -5,
            boxShadow: '0 15px 30px rgba(20, 184, 166, 0.5), 0 0 20px rgba(20, 184, 166, 0.3)',
            duration: 0.4,
            ease: 'power3.out',
        });
        gsap.to(imageRef.current, {
            scale: 1.1,
            filter: 'brightness(1.2)',
            duration: 0.4,
            ease: 'power3.out',
        });
        gsap.to(overlayRef.current, {
            opacity: 0.85,
            duration: 0.4,
            ease: 'power3.out',
        });
        gsap.to(borderRef.current, {
            strokeDashoffset: 0,
            duration: 0.6,
            ease: 'power2.out',
        });
    }, []);

    const handleHoverLeave = useCallback(() => {
        gsap.to(cardRef.current, {
            scale: 1,
            y: 0,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            duration: 0.4,
            ease: 'power3.out',
        });
        gsap.to(imageRef.current, {
            scale: 1,
            filter: 'brightness(1)',
            duration: 0.4,
            ease: 'power3.out',
        });
        gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.4,
            ease: 'power3.out',
        });
        gsap.to(borderRef.current, {
            strokeDashoffset: 100,
            duration: 0.6,
            ease: 'power2.out',
        });
    }, []);

    const handleMouseMove = useCallback((e) => {
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(imageRef.current, {
            x: x * 0.03,
            y: y * 0.03,
            duration: 0.3,
            ease: 'power2.out',
        });
    }, []);

    useEffect(() => {
        gsap.fromTo(
            cardRef.current,
            { opacity: 0, rotationY: 90, y: 50 },
            {
                opacity: 1,
                rotationY: 0,
                y: 0,
                duration: 0.8,
                ease: 'back.out(1.7)',
                delay: index * 0.15,
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                },
            }
        );

        const card = cardRef.current;
        card.addEventListener('mouseenter', handleHoverEnter);
        card.addEventListener('mouseleave', handleHoverLeave);
        card.addEventListener('mousemove', handleMouseMove);

        return () => {
            card.removeEventListener('mouseenter', handleHoverEnter);
            card.removeEventListener('mouseleave', handleHoverLeave);
            card.removeEventListener('mousemove', handleMouseMove);
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.trigger === cardRef.current) {
                    trigger.kill();
                }
            });
        };
    }, [handleHoverEnter, handleHoverLeave, handleMouseMove, index]);

    return (
        <div
            ref={cardRef}
            className="relative glass p-6 rounded-xl overflow-hidden transition-all duration-300 group"
            role="article"
            aria-label={`Project: ${title}`}
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onViewProject();
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
                    stroke="#14b8a6"
                    strokeWidth="3"
                    strokeDasharray="25 75"
                    strokeDashoffset="100"
                />
            </svg>
            <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
                <LazyLoadImage
                    src={images[0] || '/assets/images/placeholder.jpg'}
                    alt={title}
                    effect="blur"
                    className="project-image w-full h-full object-cover transition-transform duration-300"
                    placeholderSrc="/assets/images/placeholder.jpg"
                    ref={imageRef}
                />
                <div
                    ref={overlayRef}
                    className="absolute inset-0 bg-gradient-to-tr from-teal-primary/70 to-teal-dark/30 opacity-0 transition-opacity duration-300"
                />
            </div>
            <h3 className="text-xl font-poppins font-semibold text-gray-accent mb-3 animate-fade-in">
                {title}
            </h3>
            <p className="text-base font-inter text-gray-accent mb-4 line-clamp-3">
                {description}
            </p>
            <div className="flex space-x-4">
                <Button
                    text="View Project"
                    onClick={onViewProject}
                    variant="primary"
                    className="flex-1 text-lg font-semibold hover:bg-teal-dark animate-pulse-slow"
                    aria-label={`View details of ${title}`}
                />
                <Button
                    text="Live Demo"
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    className="flex-1 text-lg font-semibold hover:bg-teal-600"
                    aria-label={`Visit ${title} on GitHub`}
                />
            </div>
        </div>
    );
}

export default ProjectCard;