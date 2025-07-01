/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            // Custom Colors for Teal-Green and White Theme
            colors: {
                'teal-primary': '#14b8a6',
                'teal-dark': '#0d9488',
                'teal-light': '#5eead4',
                'white-bg': '#ffffff',
                'gray-accent': '#4b5563',
            },
            // Custom Fonts
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
                poppins: ['Poppins', 'sans-serif'],
            },
            // Custom Animations for Mind-Blowing Effects
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'spin-slow': 'spin 10s linear infinite',
                'bounce-subtle': 'bounce 2s ease-in-out infinite',
                'fade-in': 'fadeIn 1.5s ease-out',
                'scale-up': 'scaleUp 0.8s ease-out',
                'wiggle': 'wiggle 1s ease-in-out infinite',
            },
            // Keyframes for Custom Animations
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-15px)' },
                },
                pulse: {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0.6 },
                },
                spin: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
                bounce: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                fadeIn: {
                    '0%': { opacity: 0, transform: 'translateY(20px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                },
                scaleUp: {
                    '0%': { transform: 'scale(0.9)' },
                    '100%': { transform: 'scale(1)' },
                },
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-3deg)' },
                    '50%': { transform: 'rotate(3deg)' },
                },
            },
            // Custom Box Shadow for Glassmorphism
            boxShadow: {
                'glass': '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
            },
            // Custom Backdrop Blur for Glassmorphism
            backdropBlur: {
                'glass': '10px',
            },
        },
    },
    plugins: [],
};