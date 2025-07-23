/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,jsx,ts,tsx,css}',
    ],
    theme: {
        extend: {
            colors: {
                'black': '#000000',
                'gray-dark': '#1A1A1A',
                'gray-medium': '#333333',
                'gray-light': '#4A4A4A',
                'white': '#FFFFFF',
                'gray-accent': '#D1D1D1',
            },
            fontFamily: {
                'ars-maquette': ['Ars Maquette', 'sans-serif'],
            },
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'spin-slow': 'spin 10s linear infinite',
                'bounce-subtle': 'bounce 2s ease-in-out infinite',
                'fade-in': 'fadeIn 1.5s ease-out',
                'scale-up': 'scaleUp 0.8s ease-out',
                'wiggle': 'wiggle 1s ease-in-out infinite',
            },
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
            boxShadow: {
                'glass': '0 4px 6px rgba(255, 255, 255, 0.1), 0 1px 3px rgba(255, 255, 255, 0.08)',
            },
            backdropBlur: {
                'glass': '8px',
            },
        },
    },
    plugins: [],
};