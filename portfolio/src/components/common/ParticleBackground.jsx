import { useCallback } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim'; // Use loadSlim for a lighter bundle

function ParticleBackground() {
    const particlesInit = useCallback(async (engine) => {
        // Load the slim version of tsParticles (full version can be used if needed)
        await loadSlim(engine);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                background: {
                    color: {
                        value: '#ffffff',
                    },
                },
                fpsLimit: 60,
                interactivity: {
                    events: {
                        onHover: {
                            enable: true,
                            mode: 'repulse',
                        },
                        onClick: {
                            enable: true,
                            mode: 'push',
                        },
                        resize: {
                            enable: true, // Updated syntax for resize event
                        },
                    },
                    modes: {
                        repulse: {
                            distance: 100,
                            duration: 0.4,
                        },
                        push: {
                            quantity: 4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: '#14b8a6',
                    },
                    links: {
                        color: '#14b8a6',
                        distance: 150,
                        enable: true,
                        opacity: 0.5,
                        width: 1,
                    },
                    collisions: {
                        enable: true,
                    },
                    move: {
                        direction: 'none',
                        enable: true,
                        outModes: {
                            default: 'bounce',
                        },
                        random: false,
                        speed: 2,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: 'circle',
                    },
                    size: {
                        value: { min: 1, max: 5 },
                    },
                },
                detectRetina: true,
            }}
            className="absolute inset-0 z-0"
        />
    );
}

export default ParticleBackground;