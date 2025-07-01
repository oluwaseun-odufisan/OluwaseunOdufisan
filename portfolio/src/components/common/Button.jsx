import { useRef, useEffect, forwardRef } from 'react';
import { gsap } from 'gsap';

// Use forwardRef to allow the parent component to pass a ref
const Button = forwardRef(({ text = 'Button', href, to, variant = 'primary', className = '', ...props }, ref) => {
    const buttonRef = useRef(null);
    const targetRef = ref || buttonRef;

    useEffect(() => {
        const button = targetRef.current;
        if (!button) return;

        const hoverAnimation = gsap.to(button, {
            scale: 1.1,
            duration: 0.3,
            ease: 'power2.out',
            paused: true,
            onComplete: () => gsap.to(button, { scale: 1, duration: 0.3 }),
        });

        const handleMouseEnter = (e) => {
            const rect = button.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'absolute bg-white bg-opacity-30 rounded-full pointer-events-none';
            ripple.style.zIndex = '-1';
            const diameter = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${diameter}px`;
            ripple.style.left = `${e.clientX - rect.left - diameter / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - diameter / 2}px`;
            ripple.style.transform = 'scale(0)';
            button.appendChild(ripple);

            gsap.to(ripple, {
                scale: 2,
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out',
                onComplete: () => ripple.remove(),
            });

            hoverAnimation.play();
        };

        const handleMouseLeave = () => {
            hoverAnimation.reverse();
        };

        button.addEventListener('mouseenter', handleMouseEnter);
        button.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            button.removeEventListener('mouseenter', handleMouseEnter);
            button.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [targetRef]);

    console.log('Button text prop:', text);

    // Use Link for internal routing if 'to' is provided, otherwise use 'a' for external links
    const Component = to ? 'Link' : 'a';
    const componentProps = to ? { to } : { href };

    return (
        <Component
            {...componentProps}
            ref={targetRef}
            className={`relative inline-block px-6 py-3 rounded-lg font-semibold transition-all duration-300 overflow-hidden ${variant === 'primary'
                    ? 'bg-teal-500 hover:bg-teal-600 text-white animate-pulse-slow'
                    : 'bg-gray-500 hover:bg-gray-600 text-white'
                } ${className}`}
            {...props}
        >
            {typeof text === 'string' ? text : text || 'Button'}
        </Component>
    );
});

export default Button;