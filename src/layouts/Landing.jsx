import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Achievements from '../components/Achievements';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const Landing = () => {
    return (
        <div className="w-full">
            <Navbar />
            <Hero />
            <Services />
            <About />
            <Achievements />
            <Testimonials />
            <Footer />
        </div>
    );
};

export default Landing;