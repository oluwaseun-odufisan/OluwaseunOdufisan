import Hero from '../components/sections/Hero.jsx';
import About from '../components/sections/About.jsx';
import Skills from '../components/sections/Skills.jsx';
import Projects from '../components/sections/Projects.jsx';
import Achievements from '../components/sections/Achievements.jsx';

import Contact from '../components/sections/Contact.jsx';

function Home() {
    return (
        <main id="main-content" className="pt-20">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Achievements />
            <Contact />
        </main>
    );
}

export default Home;

//all good