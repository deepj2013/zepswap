import React, { useEffect, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { CustomWalletBtn } from "../blockchain/connectBtn";
import { CiWallet } from "react-icons/ci";

import Logo from '../assets/Logo.png'
import { getBalanceServices, loginServices } from "../services/Services";
import { useEthersSigner } from "../blockchain/contractSigner";
import { DialogWithForm } from "./Common/WalletModal";
import { errorToast } from "../utils/Helper";
import { useConnectModal } from "@rainbow-me/rainbowkit";
function NavBar2() {
  const [hover, setHover] = useState(false);
  const [userBalance, setUserBalance] = useState({})
  const signer = useEthersSigner();
  const [open, setOpen] = React.useState(false);
  const { openConnectModal } = useConnectModal();



  const loginHandler = async () => {
    if (signer?._address === undefined) {
      openConnectModal()
      errorToast('Connect Wallet')
      return
    }
    try {
      let obj = {
        "address": signer?._address
      }
      let response = await loginServices(obj)
      console.log(response.data);
      if (response?.data?.success) {
        localStorage.setItem("token", response?.data?.jwt)
        getUserBalance(response?.data?.jwt)
      }
      else {
        console.log('ero');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getUserBalance = async (token) => {
    try {
      let response = await getBalanceServices(token)
      if (response?.data?.success) {
        setUserBalance(response?.data)
        setOpen(true)
      }
    } catch (error) {
      console.log(error);
    }
  }





  return (
    <nav class="bg-secondry dark:bg-gray-900 sticky w-full z-20 top-0 start-0  dark:border-gray-600">
      <div class=" container flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse bg-gradient-to-r from-rose-100 to-teal-100">
          <img className="h-20 bg-white absolute w-20 top-0" src={Logo} />
        </a>
        <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">


          <button onClick={() => {
            if (signer?._address === undefined) {
              loginHandler()
            }
            else {
              loginHandler()
              // setOpen(true)
            }
          }} data-tooltip-target="tooltip-default" type="button" class="text-white mx-4"> <CiWallet className="text-3xl text-white" /></button>

          <div id="tooltip-default" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-black transition-opacity duration-300 bg-white rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            {Object.keys(userBalance).length > 0 ? `${userBalance?.balance} zep` : 'Connect Wallet'}
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>


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
      <DialogWithForm open={open} setOpen={setOpen} userBalance={userBalance} />

    </nav>
  );
}

export default NavBar2;
