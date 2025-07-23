import { useCallback } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

function ParticleBackground() {
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                background: {
                    color: {
                        value: '#000000',
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
                            enable: true,
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
                        value: '#FFFFFF',
                    },
                    links: {
                        color: '#FFFFFF',
                        distance: 150,
                        enable: true,
                        opacity: 0.3,
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
                        speed: 1.5,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 60,
                    },
                    opacity: {
                        value: 0.4,
                    },
                    shape: {
                        type: 'circle',
                    },
                    size: {
                        value: { min: 1, max: 4 },
                    },
                },
                detectRetina: true,
            }}
            className="absolute inset-0 z-0"
        />
    );
}

export default ParticleBackground;