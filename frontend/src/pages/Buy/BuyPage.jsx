import React, { useState } from "react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { imagesConstant } from "../../utils/ImageConstant";
import { useEthersSigner } from "../../blockchain/contractSigner";
import toast from "react-hot-toast";
import {
  approveERC20,
  BuyZepx,
  checkErcApprovals,
  getTokenBalance,
} from "../../blockchain/contractUtlis";
import { Usdt_Address, Zepx_buy } from "../../blockchain/config";

function Buy() {
  const { openConnectModal } = useConnectModal();
  const [ZepxAmount, setZepxAmount] = useState();
  const [UsdtAmount, setUsdtAmount] = useState(1);
  const [price, setprice] = useState(600);
  const [loading, setloading] = useState(false);
  const signer = useEthersSigner();

  const buyButtonHandler = async () => {
    if (signer._address === undefined) {
      openConnectModal();
    } else {
      try {
        setloading(true);
        toast.error("calling buy function");
        const bal = await getTokenBalance(Usdt_Address, signer?._address);
        console.log("bal: ", bal);

        if (bal >= UsdtAmount) {
          const approval = await checkErcApprovals(
            signer?._address,
            Usdt_Address,
            Zepx_buy
          );
          console.log("approval: ", approval);

          if (!(approval >= UsdtAmount * 10 ** 18)) {
            await approveERC20(Usdt_Address, UsdtAmount, signer, Zepx_buy);

            await BuyZepx(UsdtAmount, signer);
            setloading(false);

            return;
          } else {
            await BuyZepx(UsdtAmount, signer);
          }
          setloading(false);
          return;
        }
      } catch (error) {
        setloading(false);
        console.log("error in buying", error);
      }
    }
  };

  const ZepxChangeHandler = (event) => {
    let inputValue = parseFloat(event.target.value);
    if (isNaN(inputValue)) {
      inputValue = 0;
    }
    console.log(inputValue, "inputValue");
    setZepxAmount(inputValue);
    setUsdtAmount(inputValue / price);
  };

  const UsdtChangeHandler = (event) => {
    let inputValue = parseFloat(event.target.value);
    if (isNaN(inputValue)) {
      inputValue = 0;
    }
    setZepxAmount(inputValue * price);
    setUsdtAmount(inputValue);
  };

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
                src={imagesConstant.ZepxLogo}
              />
              ZEPX
            </div>

            <div className="mt-2  flex flex-col  items-end justify-center p-3  bg-secondry text-white rounded-xl h-20">
              <input
                placeholder="00"
                className="bg-transparent  text-right w-full outline-none flex-end "
                value={ZepxAmount}
                onChange={ZepxChangeHandler}
                defaultValue={price}
              />
            </div>

            <div className="flex items-center gap-2 text-white mt-4">
              <img
                className="h-5 w-5 rounded-full"
                src={imagesConstant.UsdtLogo}
              />
              USDT
            </div>

            <div className="mt-2  flex flex-col  items-end justify-center p-3  bg-secondry text-white rounded-xl h-20">
              <input
                placeholder="00"
                className="bg-transparent  text-right w-full outline-none flex-end "
                value={UsdtAmount}
                onChange={UsdtChangeHandler}

              />
            </div>

            <button
              className="bg-theme/80 w-full mt-5 py-2.5 text20 rounded-full hover:bg-theme hover:text-white"
              onClick={buyButtonHandler}
              disabled={loading}
            >
              {signer
                ? loading
                  ? "Please wait..."
                  : "Buy Now"
                : "Connect wallet"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Buy;
