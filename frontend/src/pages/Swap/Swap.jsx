import React, { useState } from "react";
import { IoCaretDown } from "react-icons/io5";
import { IoMdArrowRoundDown } from "react-icons/io";
import { TfiExchangeVertical } from "react-icons/tfi";
import { twMerge } from "tailwind-merge";
import { FaRegCopy } from "react-icons/fa6";
import { SlPencil } from "react-icons/sl";
import { approveERC20, buyThroughUsdt, checkErcApprovals, getTokenBalance, sellThroughUsdt } from "../../blockchain/contractUtlis";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useEthersSigner } from "../../blockchain/contractSigner";
import toast from "react-hot-toast";
import { imagesConstant } from "../../utils/ImageConstant";
import { Usdt_Address, Zepx_Address, Zepx_swap } from "../../blockchain/config";

function Swap() {
  const { openConnectModal } = useConnectModal();
  const [isHover, setIsHover] = useState(false);
  const [loading, setloading] = useState(false);
  const [img1, setimg1] = useState(imagesConstant.ZepxLogo);
  const [img2, setimg2] = useState(imagesConstant.UsdtLogo);
  const [token1, settoken1] = useState("ZEPX");
  const [token2, settoken2] = useState("USDT");
  const [BuyingPrice, setBuyingPrice] = useState(600);
  const [SellingPrice, setSellingPrice] = useState(900);
  const [Token1Amount, setToken1Amount] = useState(900);
  const [Token2Amount, setToken2Amount] = useState(1);
  const signer = useEthersSigner();

  const reverseFunction = () => {
    if (token1 === "ZEPX") {
      settoken1("USDT");
      settoken2("ZEPX");
      setimg1(imagesConstant.UsdtLogo);
      setimg2(imagesConstant.ZepxLogo);
      setToken1Amount(Token2Amount);
      setToken2Amount(Token2Amount * BuyingPrice);
    } else {
      settoken1("ZEPX");
      settoken2("USDT");
      setimg1(imagesConstant.ZepxLogo);
      setimg2(imagesConstant.UsdtLogo);
      setToken1Amount(Token1Amount * SellingPrice);
      setToken2Amount(Token1Amount);
    }
  };

  const value1Handler = (event) => {
    let inputValue = parseFloat(event.target.value);
    if (isNaN(inputValue)) {
      inputValue = 0;
    }
    console.log(inputValue, "inputValue");
    setToken1Amount(inputValue);

    if (token1 === "ZEPX") {
      setToken2Amount(inputValue / SellingPrice);
    } else {
      setToken2Amount(inputValue * BuyingPrice);
    }
  };

  const value2handler = (event) => {
    let inputValue = parseFloat(event.target.value);
    if (isNaN(inputValue)) {
      inputValue = 0;
    }

    if (token1 === "ZEPX") {
      setToken1Amount(inputValue * SellingPrice);
    } else {
      setToken1Amount(inputValue / BuyingPrice);
    }
    setToken2Amount(inputValue);
  };

  

  const buyZepx = async () => {
    try {
      setloading(true);
      toast.success("Swapping");
      const bal = await getTokenBalance(Usdt_Address, signer?._address);
      console.log("bal: ", bal);

      if (bal >= Token1Amount) {
        const approval = await checkErcApprovals(
          signer?._address,
          Usdt_Address,
          Zepx_swap
        );
        console.log("approval: ", approval);

        if (!(approval >= token1 * 10 ** 18)) {
          await approveERC20(Usdt_Address, Token1Amount, signer, Zepx_swap);

          await buyThroughUsdt(Token1Amount, signer);
          setloading(false);

          return;
        } else {
          await buyThroughUsdt(Token1Amount, signer);
        }
        setloading(false);
        return;
      }
    } catch (error) {
      setloading(false);
      console.log("error in buying", error);
    }
  };

  const SellZepx = async (amount) => {
    try {
      setloading(true);
      toast.success("Swapping");
      const bal = await getTokenBalance(Zepx_Address, signer?._address);
      console.log("bal: ", bal);

      if (bal >= amount) {
        const approval = await checkErcApprovals(
          signer?._address,
          Zepx_Address,
          Zepx_swap
        );
        console.log("approval: ", approval);

        if (!(approval >= amount * 10 ** 18)) {
          await approveERC20(Zepx_Address, Token1Amount, signer, Zepx_swap);

          await sellThroughUsdt(Token1Amount, signer);
          setloading(false);

          return;
        } else {
          await sellThroughUsdt(Token1Amount, signer);
        }
        setloading(false);
        return;
      }
    } catch (error) {
      setloading(false);
      console.log("error in buying", error);
    }
  };

  const SwapHandler = async () => {
    if (signer._address === undefined) {
      openConnectModal();
    } else {
      if (token1 === "ZEPX") {
        SellZepx(Token1Amount);
      } else {
        buyZepx();
      }
    }
  };

  return (
    <div className="bg-secondry h-screen w-screen py-20">
      <div className="container mx-auto">
        <div className="bg-theme/40 mx-auto w-full  md:w-[50%] lg:w-[30%] p-5 rounded-3xl">
          <p className="text-white text28">Swap</p>
          <p className="text-lightTheme">Trade tokens in an instant</p>

          <div className="border-b mt-10 mb-5"></div>

          <div>
            <div className="flex items-center gap-2 text-white mt-4">
              <img className="h-5 w-5 rounded-full" src={img1} />
              {token1}
              <IoCaretDown className="text-sm text-white" />
            </div>

            <div className="mt-2  flex flex-col  items-end justify-center p-3  bg-secondry text-white rounded-xl h-20">
              <input
                placeholder="00"
                className="bg-transparent  text-right w-full outline-none flex-end "
                value={Token1Amount}
                onChange={value1Handler}
              />
            </div>

            <div
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(!true)}
              className={twMerge(
                `mx-auto  cursor-pointer mt-4  flex justify-center py-3 h-10 w-10 rounded-full bg-secondry`,
                isHover && "bg-theme"
              )}
              onClick={reverseFunction}
            >
              {!isHover ? (
                <IoMdArrowRoundDown className="text-theme text-xl" />
              ) : (
                <TfiExchangeVertical className="text-secondry text-xl" />
              )}
            </div>

            <div className="flex items-center gap-2 text-white mt-4">
              <img className="h-5 w-5 rounded-full" src={img2} />
              {token2}
              <IoCaretDown className="text-sm text-white" />
              <FaRegCopy />
            </div>

            <div className="mt-2  flex flex-col  items-end justify-center p-3  bg-secondry text-white rounded-xl h-20">
              <input
                placeholder="00"
                className="bg-transparent  text-right w-full outline-none flex-end "
                value={Token2Amount}
                onChange={value2handler}
              />
            </div>

            <div className="mt-5 flex justify-between">
              <p className="flex text-theme items-center gap-2 ">
                Slippage Tolerance <SlPencil />
              </p>
              <p className="text-theme font-bold">0.5%</p>
            </div>

            <button
              className="bg-theme/80 w-full mt-5 py-2.5 text20 rounded-full hover:bg-theme hover:text-white"
              onClick={SwapHandler}
              disabled={loading}
            >
              {signer
                ? loading
                  ? "Please wait..."
                  : "Swap Now"
                : "Connect wallet"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Swap;
