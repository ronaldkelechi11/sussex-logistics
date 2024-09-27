import About from '../components/About'
import Contact from '../components/Contact'
import Landing from '../components/Landing'
import Navbar from '../components/Navbar'
import Services from '../components/Services'

const Home = () => {
    return (
        <div className='flex flex-col'>
            <Navbar />
            <Landing />
            <About />
            {/* <Track /> */}
            <Services />
            <Contact />
        </div>
    )
}

export default Home
