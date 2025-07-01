import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/sections/Navbar.jsx';
import Footer from './components/sections/Footer.jsx';
import Home from './pages/Home.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import NotFound from './pages/NotFound.jsx';
import './index.css';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-primary to-white-bg font-inter">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;