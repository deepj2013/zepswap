import React from "react";
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";

function Buy() {
  const { openConnectModal } = useConnectModal();
  const buyButtonHandler = () => {
    openConnectModal();
  }
  return (
    <div className="bg-secondry h-screen w-screen py-20">
      <div className="container mx-auto">
        <div className="bg-theme/40 mx-auto w-full  md:w-[50%] lg:w-[30%] p-5 rounded-3xl">
          <p className="text-white text28">Buy</p>
          <p className="text-lightTheme">Buy Zepx Instantly</p>

          <div className="border-b mt-10 mb-5"></div>

          <div>
            <div className="flex items-center gap-2 text-white mt-4">
              <img
                className="h-5 w-5 rounded-full"
                src={
                  "https://assets.coingecko.com/coins/images/13415/thumb/anrkey.jpg?1696513176"
                }
              />
              ZEPX
            </div>

            <div className="mt-2  flex flex-col  items-end justify-center p-3  bg-secondry text-white rounded-xl h-20">
              <input
                placeholder="00"
                className="bg-transparent  text-right w-full outline-none flex-end "
              />
              <p>1212</p>
            </div>

            <div className="flex items-center gap-2 text-white mt-4">
              <img
                className="h-5 w-5 rounded-full"
                src={
                  "https://assets.coingecko.com/coins/images/13415/thumb/anrkey.jpg?1696513176"
                }
              />
              USDT
            </div>

            <div className="mt-2  flex flex-col  items-end justify-center p-3  bg-secondry text-white rounded-xl h-20">
              <input
                placeholder="00"
                className="bg-transparent  text-right w-full outline-none flex-end "
              />
              <p>1212</p>
            </div>

            <button
              className="bg-theme/80 w-full mt-5 py-2.5 text20 rounded-full hover:bg-theme hover:text-white"
              onClick={buyButtonHandler}
            >
              Connect wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Buy;
