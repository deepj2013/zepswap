import React, { useEffect } from "react";
import { imagesConstant } from "../utils/ImageConstant";
import { NavLink, Route, Routes } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import { FaArrowRight } from "react-icons/fa6";
function Navbar() {
  useEffect(() => {
    Aos.init({
      duration: 0,
      delay: 0, // Animation duration (in milliseconds)
      //   once: , // Whether animation should happen only once
    });
  }, []);

  const route = [
    {
      name: "Home",
      icon: "",
    },
  ];

  return (
    <nav className="backdrop-blur-sm pl:ml-20 w-screen  bg-background  fixed top-0  lg:pl-20 z-40  start-0  ">
      <div className="container flex flex-wrap items-center justify-between  mx-auto  pt-5 pb-2">
        <a
          href="#"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >

          <p className=" text-xl font-semibold text-white">Black Rock</p>
          {/* <img
            className="h-14"
            src={imagesConstant.Logo}
            alt="whtext-white Rock Logo"
          /> */}

          
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="text-white bg-thtext-theme bg-theme px-6 py-2 rounded-sm flex items-center gap-5"
          >
            Sign Up
            <FaArrowRight/>
          </button>
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:-0 ">
            <li>
              <p className="block py-2 px-3 text-white  rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">
                <NavLink
                  to={"/"}
                  className={({ isActive }) => {
                    return isActive
                      ? "text-theme border-b-2 border-theme border-thtext-theme pb-3 px-5 "
                      : "text-white";
                  }}
                >
                  Home
                </NavLink>
              </p>
            </li>

            <li>
              <p className="block py-2 px-3 text-white bg-theme rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">
                <NavLink
                  to={"/about"}
                  className={({ isActive }) => {
                    return isActive
                      ? "text-theme border-b-2 border-theme border-thtext-theme pb-3 px-5 "
                      : "text-white";
                  }}
                >
                  About Us
                </NavLink>
              </p>
            </li>

            <li>
              <p className="block py-2 px-3 text-white bg-theme rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">
                <NavLink
                  to={"/product"}
                  className={({ isActive }) => {
                    return isActive
                      ? "text-theme border-b-2 border-theme border-thtext-theme pb-3 px-5 "
                      : "text-white";
                  }}
                >
                  Products
                </NavLink>
              </p>
            </li>


            <li>
              <p className="block py-2 px-3 text-white bg-theme rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">
                <NavLink
                  to={"/services"}
                  className={({ isActive }) => {
                    return isActive
                      ? "text-theme border-b-2 border-theme border-thtext-theme pb-3 px-5 "
                      : "text-white";
                  }}
                >
                  Services
                </NavLink>
              </p>
            </li>

            <li>
              <p className="block py-2 px-3 text-white bg-theme rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">
                <NavLink
                  to={"/contact"}
                  className={({ isActive }) => {
                    return isActive
                      ? "text-theme border-b-2 border-theme border-thtext-theme pb-3 px-5 "
                      : "text-white";
                  }}
                >
                  Contact us
                </NavLink>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;




