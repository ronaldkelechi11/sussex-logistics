import { useState } from 'react';
import { MenuHamburger, MenuHotdog } from "@iconsans/react/linear"
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false)

    function toggleNav() {
        setIsOpen(!isOpen)
    }

    return (
        <div className="flex w-full flex-col">

            {/* Desktop View */}
            <div className="hidden md:flex flex-row gap-5 text-primary justify-between items-center py-1">
                <NavLink
                    reloadDocument
                    className="text-white text-3xl md:text-5xl font-kanit">
                    <div className="flex flex-row gap-2 items-center">
                        <img src='../../public/assets/images/logo.JPG' alt="Sussex Logistics Logo" className="md:h-16 md:w-16 h-14 w-14" />
                    </div>
                </NavLink>

                <NavLinks />
            </div>


            {/* Mobile Buttons */}
            <div
                className="md:hidden p-2 transition-all cursor-pointer text-white flex justify-between items-center"
                onClick={toggleNav}>
                <NavLink
                    reloadDocument
                    className="text-white text-3xl md:text-5xl font-kanit">
                    <div className="flex flex-row gap-2 items-center">
                        <img src='../../public/assets/images/logo.JPG' alt="Sussex Logistics Logo" className="md:h-16 md:w-16 h-14 w-14" />
                    </div>
                </NavLink>

                {
                    isOpen ?
                        <MenuHotdog className="h-10 w-10 text-black" /> :
                        <MenuHamburger className="h-10 w-10 text-black" />
                }
            </div>


            {isOpen &&
                <>
                    <div className="text-primary basis-full md:hidden">
                        <NavLinks />
                    </div>
                </>
            }


            {/* Bottom PART */}
            <div className="h-[30%] bg-[#f5f5f5] md:flex justify-between flex-row items-center p-3 text-xl text-[#555555] hidden">

                <div className="flex flex-row gap-4">
                    <p className="font-poppins text-sm">
                        Mon - Fri : 09.00 AM - 06.00 PM
                    </p>
                </div>

                <div className="flex flex-row gap-4">
                    <p className="font-poppins text-sm">billing4sussexlogistics@gmail.com</p>
                </div>
            </div>

        </div>
    )
}


function NavLinks() {

    return (
        <div className='flex flex-col justify-center md:flex-row gap-4 items-center mt-3 p-2'>
            <a className='navlink' href="/#home">Home</a>
            <a className='navlink' href='/#about'>About</a>
            <Link className='navlink hidden md:flex' to={"/track"}>Track</Link>
            <a className='navlink' href="/#services">Services</a>
            <a className='navlink' href="/#contact">Contact</a>
            <Link className='navlink' to="/admin">Portal</Link>
        </div >
    )
}

export default Navbar
