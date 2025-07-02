import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Button from '../components/common/Button.jsx';

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ title, description, technologies = [], images = [], liveDemo, category, index, onViewProject }) {
    const cardRef = useRef(null);
    const imageRef = useRef(null);

    const handleHoverEnter = useCallback(() => {
        gsap.to(cardRef.current, {
            scale: 1.04,
            y: -12,
            boxShadow: '0 15px 30px rgba(20, 184, 166, 0.4), 0 0 20px rgba(20, 184, 166, 0.3)',
            duration: 0.4,
            ease: 'power3.out',
        });
        gsap.to(imageRef.current, {
            scale: 1.08,
            filter: 'brightness(1.15) contrast(1.05)',
            duration: 0.4,
            ease: 'power3.out',
        });
    }, []);

    const handleHoverLeave = useCallback(() => {
        gsap.to(cardRef.current, {
            scale: 1,
            y: 0,
            boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
            duration: 0.4,
            ease: 'power3.out',
        });
        gsap.to(imageRef.current, {
            scale: 1,
            filter: 'brightness(1) contrast(1)',
            duration: 0.4,
            ease: 'power3.out',
        });
    }, []);

    useEffect(() => {
        gsap.fromTo(
            cardRef.current,
            { opacity: 0, y: 40, scale: 0.92 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
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

        return () => {
            card.removeEventListener('mouseenter', handleHoverEnter);
            card.removeEventListener('mouseleave', handleHoverLeave);
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.trigger === cardRef.current) {
                    trigger.kill();
                }
            });
        };
    }, [handleHoverEnter, handleHoverLeave, index]);

    return (
        <div
            ref={cardRef}
            className="relative bg-white/95 backdrop-blur-lg rounded-2xl p-6 transition-all duration-300 shadow-lg hover:shadow-xl"
            role="article"
            aria-label={`Project: ${title}`}
        >
            <div className="relative w-full h-52 sm:h-60 mb-5 overflow-hidden rounded-lg">
                <LazyLoadImage
                    src={images[0] || '/assets/images/placeholder.jpg'}
                    alt={title}
                    effect="blur"
                    className="w-full h-full object-cover transition-transform duration-300"
                    placeholderSrc="/assets/images/placeholder.jpg"
                    ref={imageRef}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <h3 className="text-xl sm:text-2xl font-poppins font-semibold text-gray-800 mb-3">
                {title}
            </h3>
            <p className="text-base font-inter text-gray-600 mb-4 line-clamp-2">
                {description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
                {technologies.length > 0 ? (
                    technologies.map((tech, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-teal-100/90 text-teal-700 rounded-full text-sm font-medium shadow-sm"
                        >
                            {tech}
                        </span>
                    ))
                ) : (
                    <span className="px-3 py-1 bg-gray-100/90 text-gray-500 rounded-full text-sm font-medium shadow-sm">
                        No technologies listed
                    </span>
                )}
            </div>
            <p className="text-sm font-inter text-gray-500 mb-4">Category: {category}</p>
            <div className="flex flex-col sm:flex-row gap-3">
                <Button
                    text="View Project"
                    onClick={onViewProject}
                    variant="primary"
                    className="flex-1 text-base font-semibold bg-teal-600 text-white hover:bg-teal-700 transition-all duration-300 rounded-lg"
                    aria-label={`View details of ${title}`}
                />
                {liveDemo && (
                    <Button
                        text="Live Demo"
                        href={liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="secondary"
                        className="flex-1 text-base font-semibold bg-gray-100 text-teal-600 hover:bg-teal-100 transition-all duration-300 rounded-lg"
                        aria-label={`View live demo of ${title}`}
                    />
                )}
            </div>
        </div>
    );
}

export default ProjectCard;