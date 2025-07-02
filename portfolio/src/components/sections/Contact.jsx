import { useEffect, useRef, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Github, Linkedin, Twitter, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { send, init } from 'emailjs-com';
import ParticleBackground from '../common/ParticleBackground.jsx';
import Button from '../common/Button.jsx';

// Initialize EmailJS with the public key
init('zqeyLD5PgXJVZ9Qu5');

gsap.registerPlugin(ScrollTrigger);

function Contact() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const formRef = useRef(null);
    const inputRefs = useRef([]);
    const socialRefs = useRef([]);
    const popupRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        subject: 'New Contact Form Submission'
    });
    const [status, setStatus] = useState(null); // null, 'sending', 'success', 'error', 'invalid'
    const [errorMessage, setErrorMessage] = useState('');

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        // Validation
        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            setStatus('invalid');
            setErrorMessage('Please fill in all fields');
            showPopup();
            return;
        }

        if (!validateEmail(formData.email)) {
            setStatus('invalid');
            setErrorMessage('Please enter a valid email address');
            showPopup();
            return;
        }

        setStatus('sending');
        showPopup();

        send(
            'service_s1kna01',
            'template_1adviki',
            formData,
            'zqeyLD5PgXJVZ9Qu5'
        )
            .then((response) => {
                setStatus('success');
                setFormData({ name: '', email: '', message: '', subject: 'New Contact Form Submission' });
                showPopup();
            })
            .catch((error) => {
                setStatus('error');
                setErrorMessage('Failed to send message. Please try again.');
                showPopup();
            });
    }, [formData]);

    const showPopup = () => {
        gsap.fromTo(
            popupRef.current,
            { opacity: 0, scale: 0.8 },
            {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: 'power3.out',
                onComplete: () => {
                    if (status !== 'sending') {
                        setTimeout(() => {
                            gsap.to(popupRef.current, {
                                opacity: 0,
                                scale: 0.8,
                                duration: 0.3,
                                ease: 'power3.in',
                                onComplete: () => {
                                    setStatus(null);
                                    setErrorMessage('');
                                }
                            });
                        }, 3000);
                    }
                }
            }
        );
    };

    const handleSocialHoverEnter = useCallback((social) => {
        gsap.to(social, {
            scale: 1.2,
            rotate: 360,
            boxShadow: '0 0 15px rgba(20, 184, 166, 0.7)',
            duration: 0.4,
            ease: 'power3.out',
        });
        gsap.to(social.querySelector('.social-icon'), {
            scale: 1.1,
            duration: 0.4,
            ease: 'power3.out',
        });
    }, []);

    const handleSocialHoverLeave = useCallback((social) => {
        gsap.to(social, {
            scale: 1,
            rotate: 0,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            duration: 0.4,
            ease: 'power3.out',
        });
        gsap.to(social.querySelector('.social-icon'), {
            scale: 1,
            duration: 0.4,
            ease: 'power3.out',
        });
    }, []);

    const handleInputFocus = useCallback((input) => {
        gsap.to(input, {
            borderColor: '#14b8a6',
            boxShadow: '0 0 10px rgba(20, 184, 166, 0.5)',
            duration: 0.3,
            ease: 'power3.out',
        });
    }, []);

    const handleInputBlur = useCallback((input) => {
        gsap.to(input, {
            borderColor: '#e5e7eb',
            boxShadow: 'none',
            duration: 0.3,
            ease: 'power3.out',
        });
    }, []);

    useEffect(() => {
        // Title entrance with glow effect
        gsap.fromTo(
            titleRef.current,
            { opacity: 0, y: 50, scale: 0.9 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: 'power4.out',
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

        // Form fields staggered entrance
        inputRefs.current.forEach((input, index) => {
            if (input) {
                gsap.fromTo(
                    input,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'back.out(1.7)',
                        delay: index * 0.2,
                        scrollTrigger: {
                            trigger: formRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );

                input.addEventListener('focus', () => handleInputFocus(input));
                input.addEventListener('blur', () => handleInputBlur(input));
            }
        });

        // Social links staggered entrance
        socialRefs.current.forEach((social, index) => {
            if (social) {
                gsap.fromTo(
                    social,
                    { opacity: 0, scale: 0.5, rotate: -90 },
                    {
                        opacity: 1,
                        scale: 1,
                        rotate: 0,
                        duration: 0.8,
                        ease: 'back.out(1.7)',
                        delay: index * 0.2 + 0.6,
                        scrollTrigger: {
                            trigger: formRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );

                social.addEventListener('mouseenter', () => handleSocialHoverEnter(social));
                social.addEventListener('mouseleave', () => handleSocialHoverLeave(social));
            }
        });

        return () => {
            inputRefs.current.forEach((input) => {
                if (input) {
                    input.removeEventListener('focus', () => { });
                    input.removeEventListener('blur', () => { });
                }
            });
            socialRefs.current.forEach((social) => {
                if (social) {
                    social.removeEventListener('mouseenter', () => { });
                    social.removeEventListener('mouseleave', () => { });
                }
            });
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, [handleInputFocus, handleInputBlur, handleSocialHoverEnter, handleSocialHoverLeave]);

    const socialLinks = [
        { icon: <Linkedin className="social-icon w-6 h-6" />, href: 'https://linkedin.com/in/oluwaseun-odufisan', label: 'LinkedIn' },
        { icon: <Github className="social-icon w-6 h-6" />, href: 'https://github.com/oluwaseun-odufisan', label: 'GitHub' },
        { icon: <Twitter className="social-icon w-6 h-6" />, href: 'https://x.com/oluwaseun_od', label: 'Twitter/X' },
    ];

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="relative py-16 sm:py-24 bg-gradient-to-b from-white via-teal-light/30 to-teal-primary/20 bg-opacity-90 backdrop-blur-glass"
            aria-label="Contact Section"
        >
            <ParticleBackground className="absolute inset-0 z-0 opacity-40" />
            <svg
                className="absolute bottom-0 left-0 w-full h-32 text-teal-light"
                viewBox="0 0 1440 120"
                preserveAspectRatio="none"
            >
                <path
                    fill="currentColor"
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

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2
                    ref={titleRef}
                    className="text-4xl sm:text-5xl font-poppins font-extrabold text-teal-primary text-center mb-12 animate-float tracking-tight"
                    aria-label="Get in Touch"
                >
                    Get in Touch
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div
                        ref={formRef}
                        className="glass p-6 rounded-xl shadow-glass relative"
                        role="form"
                        aria-label="Contact Form"
                    >
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-inter text-gray-accent mb-2"
                                >
                                    Name
                                </label>
                                <input
                                    ref={(el) => (inputRefs.current[0] = el)}
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-3 rounded-lg bg-white bg-opacity-10 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-primary transition-all duration-300"
                                    placeholder="Your Name"
                                    aria-required="true"
                                />
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-inter text-gray-accent mb-2"
                                >
                                    Email
                                </label>
                                <input
                                    ref={(el) => (inputRefs.current[1] = el)}
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-3 rounded-lg bg-white bg-opacity-10 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-primary transition-all duration-300"
                                    placeholder="Your Email"
                                    aria-required="true"
                                />
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-inter text-gray-accent mb-2"
                                >
                                    Message
                                </label>
                                <textarea
                                    ref={(el) => (inputRefs.current[2] = el)}
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    rows="5"
                                    className="w-full p-3 rounded-lg bg-white bg-opacity-10 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-primary transition-all duration-300"
                                    placeholder="Your Message"
                                    aria-required="true"
                                />
                            </div>
                            <Button
                                type="submit"
                                text={
                                    <span className="flex items-center justify-center space-x-2">
                                        <span>{status === 'sending' ? 'Sending...' : 'Send Message'}</span>
                                        <Send className="w-5 h-5" />
                                    </span>
                                }
                                variant="primary"
                                className="w-full text-lg font-semibold px-8 py-4 glass hover:bg-teal-dark transition-all duration-300"
                                aria-label="Submit Contact Form"
                                disabled={status === 'sending'}
                            />
                        </form>
                        {status && (
                            <div
                                ref={popupRef}
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 glass p-6 rounded-xl shadow-lg flex items-center space-x-2 z-50 bg-opacity-90 backdrop-blur-md"
                                role="alert"
                                aria-live="polite"
                            >
                                {status === 'sending' && (
                                    <>
                                        <svg className="animate-spin h-6 w-6 text-teal-primary" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        <p className="text-teal-primary font-inter">Sending...</p>
                                    </>
                                )}
                                {status === 'success' && (
                                    <>
                                        <CheckCircle className="w-6 h-6 text-teal-primary animate-bounce-subtle" />
                                        <p className="text-teal-primary font-inter">Message sent successfully!</p>
                                    </>
                                )}
                                {(status === 'error' || status === 'invalid') && (
                                    <>
                                        <AlertCircle className="w-6 h-6 text-red-500 animate-bounce-subtle" />
                                        <p className="text-red-500 font-inter">{errorMessage}</p>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="glass p-6 rounded-xl shadow-glass flex flex-col items-center justify-center">
                        <h3 className="text-xl font-poppins font-semibold text-gray-accent mb-6">
                            Connect with Me
                        </h3>
                        <div className="flex space-x-6">
                            {socialLinks.map((link, index) => (
                                <a
                                    key={index}
                                    ref={(el) => (socialRefs.current[index] = el)}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glass w-12 h-12 rounded-full flex items-center justify-center shadow-glass transition-all duration-300"
                                    aria-label={`Visit my ${link.label} profile`}
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            window.open(link.href, '_blank', 'noopener,noreferrer');
                                        }
                                    }}
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;