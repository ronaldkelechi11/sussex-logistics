import { Link } from 'react-router-dom'

const Navbar = () => {
    const SESSION_STORAGE_ADMINISLOGGEDIN = sessionStorage.getItem("sessionstorageadminisloggedin");

    return (
        <div className="flex w-full flex-col">

            {/* top PART */}
            <div className="p-4 flex bg-white flex-row justify-between items-center">
                <Link reloadDocument className="h-[50px] w-[50px] bg-logoImg bg-center bg-no-repeat bg-cover hidden md:flex"></Link>

                <div className="flex flex-row gap-2 md:gap-4 justify-center">
                    <a className='navlink' href="/#home">Home</a>
                    <a className='navlink' href='/#about'>About</a>
                    <Link className='navlink hidden md:flex' to={"/track"}>Track</Link>
                    <a className='navlink' href="/#services">Services</a>
                    <a className='navlink' href="/#contact">Contact</a>
                    <Link className='navlink' to="/admin">{SESSION_STORAGE_ADMINISLOGGEDIN ? "Admin" : "Login"}</Link>
                </div>
            </div>

            {/* Bottom PART */}
            <div className="h-[30%] bg-[#f5f5f5] md:flex justify-between flex-row items-center p-3 text-xl text-[#555555] hidden">

                <div className="flex flex-row gap-4">
                    <div className="font-poppins text-sm">
                        Mon - Fri : 09.00 AM - 06.00 PM
                    </div>
                </div>

                <div className="flex flex-row gap-4">
                    <div className="font-poppins text-sm">
                        billing4sussexlogistics@gmail.com
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Navbar
