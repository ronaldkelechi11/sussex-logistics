import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import RateEstimator from '../components/RateEstimator';
import Services from '../components/Services';
import FAQ from '../components/FAQ';
import About from '../components/About';
import Achievements from '../components/Achievements';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const LandingPage = () => {
    return (
        <div className="w-full min-h-screen bg-slate-50 font-sans text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
            <Navbar />
            <Hero />
            <Services />
            <RateEstimator />
            <About />
            <Achievements />
            <FAQ />
            <Testimonials />
            <Contact />
            <Footer />
        </div>
    );
};

export default LandingPage;
