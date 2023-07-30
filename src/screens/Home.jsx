import About from '../components/About'
import Contact from '../components/Contact'
import Landing from '../components/Landing'
import Navbar from '../components/Navbar'
import Services from '../components/Services'
import Track from '../components/Track'
import '../styles/home.css'

const Home = () => {
    return (
        <div className="home">
            <Navbar />
            <Landing />
            <About />
            <Track />
            <Services />
            <Contact />
        </div>
    )
}

export default Home
