import React from 'react'
import { NavLink } from 'react-router'
import Logo from "../../assets/BRUR_Logo.png"

const Navbar = () => {
   const links = <>
        <li><NavLink className={({isActive})=> isActive ? "bg-indigo-600 text-white" : " "} to="/">Home</NavLink></li>
        <li><NavLink className={({isActive})=> isActive ? "bg-indigo-600 text-white" : " "} to="/about">About</NavLink></li>
   </>
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                           {
                            links
                           }
                        </ul>
                    </div>
                    <div className='flex items-center justify-center gap-1'>
                       <NavLink><img className='w-12 h-14' src={Logo} alt="LOGO NOT FOUND" /></NavLink>
                        <div>
                        <p className="text-sm md:text-lg lg:text-xl font-bold">Begum Rokeya University,Rangpur</p>
                        <p className="text-sm md:text-lg lg:text-xl font-bold">বেগম রোকেয়া বিশ্ববিদ্যালয়, রংপুর</p>
                        </div>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-sm md:text-lg font-semibold">
                        {
                            links
                        }
                    </ul>
                </div>
                <div className="navbar-end gap-3">
                   <NavLink to="logIn" className="btn btn-primary btn-outline text-sm md:text-lg">LogIn</NavLink>
                   <NavLink to="logOut" className="btn btn-primary btn-outline text-sm md:text-lg">LogOut</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar