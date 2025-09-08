import React from "react";
import loginAnimation from "../assets/LogIn.json"
import { Outlet } from "react-router";
import Lottie from "lottie-react";
import Navbar from "../pages/Navbar/Navbar";
import Footer from "../pages/Footer/Footer";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto bg-base-200 space-y-20">
        <Navbar></Navbar>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="flex-1">
           <Lottie animationData={loginAnimation} loop={true} className="w-96 h-96"></Lottie>
        </div>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
         <Footer></Footer>
    </div>
  );
};

export default AuthLayout;
