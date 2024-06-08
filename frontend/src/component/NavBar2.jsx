import React, { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { CustomWalletBtn } from "../blockchain/connectBtn";
import Logo from '../assets/logo.png'
function NavBar2() {
  const [hover, setHover] = useState(false);
  return (
    <nav class="bg-secondry dark:bg-gray-900 sticky w-full z-20 top-0 start-0  dark:border-gray-600">
      <div class=" container flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse bg-gradient-to-r from-rose-100 to-teal-100">
         <img className="h-20 bg-white absolute w-20 top-0" src={Logo}/>
        </a>
        <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <CustomWalletBtn />
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  ">
            <li>
              <a
                href="/"
                class="block py-2 px-3 text-white "
                aria-current="page"
              >
                Trade
              </a>
            </li>
            <li>
              <a
                href="/Swap"
                class="block py-2 px-3 text-white "
                aria-current="page"
              >
                Swap
              </a>
            </li>
            <li>
              <a
                href="/buy"
                class="block py-2 px-3 text-white "
                aria-current="page"
              >
                Buy
              </a>
            </li>
            <li>
              <a
                href="/Stack"
                class="block py-2 px-3 text-white "
                aria-current="page"
              >
                Stake
              </a>
            </li>


            <li>
              <a
                href="/GameLottery"
                class="block py-2 px-3 text-white "
                aria-current="page"
              >
                Lottery
              </a>
            </li>



            <li>
              <a
                href="/Predction"
                class="block py-2 px-3 text-white "
                aria-current="page"
              >
                Predction
              </a>
            </li>
        
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar2;
