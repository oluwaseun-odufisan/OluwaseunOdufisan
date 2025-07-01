import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Button from '../common/Button.jsx';

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ id, title, description, image, link, index }) {
    const cardRef = useRef(null);
    const imageRef = useRef(null);
    const overlayRef = useRef(null);
    const borderRef = useRef(null);

    const handleHoverEnter = useCallback(() => {
        gsap.to(cardRef.current, {
            scale: 1.05,
            rotateX: 8,
            rotateY: 8,
            boxShadow: '0 15px 30px rgba(0, 0, 0, 0.25)',
            duration: 0.4,
            ease: 'power3.out',
        });
        gsap.to(imageRef.current, {
            scale: 1.15,
            rotate: 2,
            duration: 0.4,
            ease: 'power3.out',
        });
        gsap.to(overlayRef.current, {
            opacity: 0.8,
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
            rotateX: 0,
            rotateY: 0,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            duration: 0.4,
            ease: 'power3.out',
        });
        gsap.to(imageRef.current, {
            scale: 1,
            rotate: 0,
            duration: 0.4,
            ease: 'power3.out',
        });
        gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.4,
            ease: 'power3.out',
        });
        gsap.to(borderRef.current, {
            strokeDashoffset: 120,
            duration: 0.6,
            ease: 'power2.out',
        });
    }, []);

    const handleMouseMove = useCallback((e) => {
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(imageRef.current, {
            x: x * 0.05,
            y: y * 0.05,
            duration: 0.3,
            ease: 'power2.out',
        });
    }, []);

    useEffect(() => {
        // Entrance animation with 3D flip
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

        // Event listeners
        const card = cardRef.current;
        card.addEventListener('mouseenter', handleHoverEnter);
        card.addEventListener('mouseleave', handleHoverLeave);
        card.addEventListener('mousemove', handleMouseMove);

        return () => {
            card.removeEventListener('mouseenter', handleHoverEnter);
            card.removeEventListener('mouseleave', handleHoverLeave);
            card.removeEventListener('mousemove', handleMouseMove);
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
                    window.open(link, '_blank', 'noopener,noreferrer');
                }
            }}
        >
            {/* Animated Border SVG */}
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
                    strokeWidth="2"
                    strokeDasharray="30 90"
                    strokeDashoffset="120"
                />
            </svg>

            {/* Project Image */}
            <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
                <LazyLoadImage
                    src={image}
                    alt={title}
                    effect="blur"
                    className="project-image w-full h-full object-cover transition-transform duration-300"
                    placeholderSrc="/assets/images/placeholder.jpg"
                    ref={imageRef}
                />
                <div
                    ref={overlayRef}
                    className="absolute inset-0 bg-gradient-to-b from-teal-primary/70 to-teal-dark/30 opacity-0 transition-opacity duration-300"
                />
            </div>

            {/* Project Content */}
            <h3 className="text-xl font-poppins font-semibold text-gray-accent mb-3 animate-fade-in">
                {title}
            </h3>
            <p className="text-base font-inter text-gray-accent mb-4 line-clamp-3">
                {description}
            </p>
            <Button
                text="View Project"
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                className="w-full text-lg font-semibold hover:bg-teal-dark animate-pulse-slow"
                aria-label={`View ${title} on GitHub`}
            />
        </div>
    );
}

export default ProjectCard;