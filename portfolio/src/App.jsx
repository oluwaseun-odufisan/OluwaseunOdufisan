import { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/sections/Navbar.jsx';
import Footer from './components/sections/Footer.jsx';
import './index.css';

// Lazy load pages to reduce initial bundle size
const Home = lazy(() => import('./pages/Home.jsx'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-primary to-white-bg font-inter">
      <Navbar />
      <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;