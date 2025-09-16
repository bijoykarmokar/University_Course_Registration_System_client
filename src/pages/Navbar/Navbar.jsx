import React from "react";
import { NavLink } from "react-router"; 
import Logo from "../../assets/BRUR_Logo.png";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import ThemeToggle from "../../components/ThemeToggle";

const Navbar = () => {
  const { user, logOut } = useAuth();


  const links = 
    
          <>
          <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/studentsForm">Students</NavLink></li>
            <li><NavLink to="/coursesForm">Courses</NavLink></li>
            <li><NavLink to="/registrations">Registrations</NavLink></li>
            <li><NavLink to="/advisorsForm">Advisors</NavLink></li>
            <li><NavLink to="/departments">Departments</NavLink></li>
            {/* <li><NavLink to="/timetables">TimeTables</NavLink></li>
            <li><NavLink to="/grades">Grades</NavLink></li>
            <li><NavLink to="/users">Users</NavLink></li> */}
            {
              user && <>
              <li><NavLink to="/dashboard">Dashboard</NavLink></li>
              </>
            }
          </>


  const handleLogOut = () => {
    logOut()
      .then(() => toast.success("LogOut successfully."))
      .catch(() => toast.error("Something went wrong!"));
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          > 
            {links}
          </ul>
        </div>

        {/* Logo */}
        <div className="flex items-center justify-center gap-1">
          <NavLink to="/">
            <img className="w-12 h-14" src={Logo} alt="LOGO NOT FOUND" />
          </NavLink>
          <div>
            <p className="text-sm md:text-lg lg:text-xl font-bold">
              Begum Rokeya University, Rangpur
            </p>
            <p className="text-sm md:text-lg lg:text-xl font-bold">
              বেগম রোকেয়া বিশ্ববিদ্যালয়, রংপুর
            </p>
          </div>
        </div>
      </div>

      {/* Navbar Center (Desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-sm md:text-lg font-semibold">
          {links}
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end gap-3">
        <ThemeToggle />
        {user && user.email ? (
          <button
            onClick={handleLogOut}
            className="btn btn-primary btn-outline text-sm md:text-lg"
          >
            LogOut
          </button>
        ) : (
          <>
            <NavLink
              to="/login"
              className="btn btn-primary btn-outline text-sm md:text-lg"
            >
              LogIn
            </NavLink>
            <NavLink
              to="/signup"
              className="btn btn-primary btn-outline text-sm md:text-lg"
            >
              SignUp
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
