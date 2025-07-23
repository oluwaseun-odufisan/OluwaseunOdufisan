import { useEffect, useRef, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger, TextPlugin, CustomEase } from 'gsap/all';
import { Mail, Github, Linkedin, Twitter, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { send, init } from 'emailjs-com';
import Button from '../common/Button.jsx';

init('zqeyLD5PgXJVZ9Qu5');
gsap.registerPlugin(ScrollTrigger, TextPlugin, CustomEase);

function Contact() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const formRef = useRef(null);
    const inputRefs = useRef([]);
    const socialRefs = useRef([]);
    const popupRef = useRef(null);
    const connectRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        subject: 'New Contact Form Submission'
    });
    const [status, setStatus] = useState(null);
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
        const button = formRef.current.querySelector('button');
        const particle = document.createElement('span');
        particle.className = 'particle-burst';
        button.appendChild(particle);
        gsap.fromTo(
            particle,
            { scale: 0, opacity: 0.8, x: '50%', y: '50%' },
            {
                scale: 2,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out',
                onComplete: () => particle.remove(),
            }
        );

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
            { opacity: 0, y: 20, scale: 0.9 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.4,
                ease: 'power3.out',
                onComplete: () => {
                    if (status !== 'sending') {
                        gsap.to(popupRef.current.querySelector('svg'), {
                            scale: 1.2,
                            duration: 0.3,
                            ease: 'back.out(1.7)',
                            yoyo: true,
                            repeat: 1,
                        });
                        setTimeout(() => {
                            gsap.to(popupRef.current, {
                                opacity: 0,
                                y: 20,
                                scale: 0.9,
                                duration: 0.4,
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
            rotationY: 180,
            border: '2px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 0 12px rgba(255, 255, 255, 0.6)',
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
            rotationY: 0,
            border: 'none',
            boxShadow: '0 4px 6px rgba(255, 255, 255, 0.05)',
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
            border: '2px solid white',
            boxShadow: '0 0 12px rgba(255, 255, 255, 0.6)',
            duration: 0.4,
            ease: 'power3.out',
        });
    }, []);

    const handleInputBlur = useCallback((input) => {
        gsap.to(input, {
            border: '1px solid #4A4A4A',
            boxShadow: 'none',
            duration: 0.4,
            ease: 'power3.out',
        });
    }, []);

    useEffect(() => {
        CustomEase.create('holographic', 'M0,0 C0.2,0.8 0.4,1 1,1');

        gsap.fromTo(
            titleRef.current,
            { opacity: 0, y: 50, filter: 'blur(5px)' },
            {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 0.7,
                ease: 'holographic',
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse',
                },
                onComplete: () => {
                    gsap.to(titleRef.current, {
                        textShadow: '0 0 15px rgba(255, 255, 255, 0.7), 0 0 25px rgba(255, 255, 255, 0.4)',
                        duration: 1.5,
                        repeat: -1,
                        yoyo: true,
                        ease: 'sine.inOut',
                    });
                },
            }
        );

        inputRefs.current.forEach((input, index) => {
            if (input) {
                const placeholderText = input.placeholder;
                gsap.fromTo(
                    input,
                    { opacity: 0, y: 20, attr: { placeholder: '' } },
                    {
                        opacity: 1,
                        y: 0,
                        attr: { placeholder: placeholderText },
                        duration: 0.8,
                        ease: 'power4.out',
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

        socialRefs.current.forEach((social, index) => {
            if (social) {
                gsap.fromTo(
                    social,
                    { opacity: 0, scale: 0.5, rotationY: -90 },
                    {
                        opacity: 1,
                        scale: 1,
                        rotationY: 0,
                        duration: 0.6,
                        ease: 'power4.out',
                        delay: index * 0.2 + 0.6,
                        scrollTrigger: {
                            trigger: connectRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );

                social.addEventListener('mouseenter', () => handleSocialHoverEnter(social));
                social.addEventListener('mouseleave', () => handleSocialHoverLeave(social));
            }
        });

        if (connectRef.current) {
            gsap.to(connectRef.current.querySelector('.connect-overlay'), {
                opacity: 0.3,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            });
        }

        return () => {
            inputRefs.current.forEach((input) => {
                if (input) {
                    input.removeEventListener('focus', () => {});
                    input.removeEventListener('blur', () => {});
                }
            });
            socialRefs.current.forEach((social) => {
                if (social) {
                    social.removeEventListener('mouseenter', () => {});
                    social.removeEventListener('mouseleave', () => {});
                }
            });
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            gsap.killTweensOf([titleRef.current, inputRefs.current, socialRefs.current, connectRef.current?.querySelector('.connect-overlay')]);
        };
    }, [handleInputFocus, handleInputBlur, handleSocialHoverEnter, handleSocialHoverLeave]);

    const socialLinks = [
        { icon: <Linkedin className="social-icon w-6 h-6 text-white" />, href: 'https://linkedin.com/in/oluwaseun-odufisan', label: 'LinkedIn' },
        { icon: <Github className="social-icon w-6 h-6 text-white" />, href: 'https://github.com/oluwaseun-odufisan', label: 'GitHub' },
        { icon: <Twitter className="social-icon w-6 h-6 text-white" />, href: 'https://x.com/oluwaseun_od', label: 'Twitter/X' },
    ];

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="relative py-16 sm:py-24 bg-gradient-to-b from-gray-dark to-gray-medium/20 bg-opacity-90 backdrop-blur-glass font-ars-maquette"
            aria-label="Contact Section"
        >
            <style>
                {`
                    .grid-overlay {
                        position: absolute;
                        inset: 0;
                        background: repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(255, 255, 255, 0.1) 21px), 
                                    repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(255, 255, 255, 0.1) 21px);
                        opacity: 0.2;
                        animation: grid-pulse 5s ease-in-out infinite;
                    }
                    .particle-burst {
                        position: absolute;
                        width: 12px;
                        height: 12px;
                        background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 10%, transparent 70%);
                        border-radius: 50%;
                        pointer-events: none;
                        transform: translate(-50%, -50%);
                    }
                    .connect-overlay {
                        position: absolute;
                        inset: 0;
                        background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
                        border-radius: inherit;
                        pointer-events: none;
                    }
                    @keyframes grid-pulse {
                        0% { opacity: 0.2; }
                        50% { opacity: 0.3; }
                        100% { opacity: 0.2; }
                    }
                `}
            </style>
            <div className="grid-overlay" />
            <svg
                className="absolute bottom-0 left-0 w-full h-32 text-gray-dark"
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

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2
                    ref={titleRef}
                    className="text-4xl sm:text-5xl font-extrabold text-white text-center mb-12 tracking-tight"
                    aria-label="Get in Touch"
                >
                    Get in Touch
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div
                        ref={formRef}
                        className="glass p-8 rounded-xl shadow-glass relative bg-gray-700/80 backdrop-blur-md"
                        role="form"
                        aria-label="Contact Form"
                    >
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label
                                    htmlFor="name"
                                    className="block text-sm text-white mb-2"
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
                                    className="w-full p-3 rounded-lg bg-gray-medium/50 border border-gray-light focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300 text-white"
                                    placeholder="Your Name"
                                    aria-required="true"
                                />
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="email"
                                    className="block text-sm text-white mb-2"
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
                                    className="w-full p-3 rounded-lg bg-gray-medium/50 border border-gray-light focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300 text-white"
                                    placeholder="Your Email"
                                    aria-required="true"
                                />
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="message"
                                    className="block text-sm text-white mb-2"
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
                                    className="w-full p-3 rounded-lg bg-gray-medium/50 border border-gray-light focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300 text-white"
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
                                className="w-full text-lg font-semibold px-8 py-4 glass hover:bg-white transition-all duration-300 bg-gray-medium text-white hover:text-black relative overflow-hidden"
                                aria-label="Submit Contact Form"
                                disabled={status === 'sending'}
                                onMouseEnter={(e) => {
                                    gsap.to(e.currentTarget, {
                                        scale: 1.05,
                                        boxShadow: '0 0 15px rgba(255, 255, 255, 0.7)',
                                        duration: 0.3,
                                        ease: 'power2.out',
                                    });
                                }}
                                onMouseLeave={(e) => {
                                    gsap.to(e.currentTarget, {
                                        scale: 1,
                                        boxShadow: 'none',
                                        duration: 0.3,
                                        ease: 'power2.out',
                                    });
                                }}
                            />
                        </form>
                        {status && (
                            <div
                                ref={popupRef}
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 glass p-6 rounded-xl shadow-lg flex items-center space-x-2 z-50 bg-gray-medium/90 backdrop-blur-md border border-white/20"
                                style={{ boxShadow: '0 0 10px rgba(255, 255, 255, 0.7)' }}
                                role="alert"
                                aria-live="polite"
                            >
                                {status === 'sending' && (
                                    <>
                                        <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        <p className="text-white font-ars-maquette">Sending...</p>
                                    </>
                                )}
                                {status === 'success' && (
                                    <>
                                        <CheckCircle className="w-6 h-6 text-white" />
                                        <p className="text-white font-ars-maquette">Message sent successfully!</p>
                                    </>
                                )}
                                {(status === 'error' || status === 'invalid') && (
                                    <>
                                        <AlertCircle className="w-6 h-6 text-red-400" />
                                        <p className="text-red-400 font-ars-maquette">{errorMessage}</p>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    <div
                        ref={connectRef}
                        className="glass p-8 rounded-xl shadow-glass flex flex-col items-center justify-center bg-gray-700/80 backdrop-blur-md relative"
                    >
                        <h3 className="text-xl font-semibold text-white mb-6">
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
                                    className="glass w-12 h-12 rounded-full flex items-center justify-center shadow-glass transition-all duration-300 bg-gray-medium/50 text-white"
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
                        <div className="connect-overlay absolute inset-0 rounded-xl" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;