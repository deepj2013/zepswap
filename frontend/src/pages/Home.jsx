import React from "react";
import Card from "../component/Home/Card";
import MemeCoinTable from "../component/Home/MemeCoinTable";
import PopularTable from "../component/Home/PopularTable";
import PopularSlider from "../component/Home/PopularSlider";
import Logo from '../assets/Logo.png';
import lottery from '../assets/icon/lottery.png';
import predction from '../assets/icon/predction.png';
import Stack from '../assets/icon/Stack.png';
import swap from '../assets/icon/swap.png';

function Home() {

  const data = [
    {
      tittle: 'Swap',
      desc: 'Swap tokens with low fees',
      image: swap,
      link: '/Swap'
    },
    {
      tittle: 'Stake',
      desc: 'Get more ROI',
      image: Stack,
      link: '/Stack'
    },
    {
      tittle: 'Lottery',
      desc: 'Dream Big , Win Bigger',
      image: lottery,
      link: '/GameLottery'
    },
    {
      tittle: 'Predction',
      desc: 'Guess and Win',
      image: predction,
      link: '/Predction'
    },
  ]



  return (
    <div className="">
      <div className="bg-theme w-screen h-[70vh] relative">
        <div className="mx-auto  flex flex-col items-center h-full justify-center z-50">
          <p className="text-black font-semibold text20">
            WELCOME TO THE PARTY
          </p>
          <p className="text60 mt- text-center text-secondry font-semibold ">

            The most reliable
          </p>

          <p className="text60 mt-3 text-center text-white font-semibold ">
            Swaping Website
          </p>

          <img className="h-28  mt-6 w-28" src={Logo} />
        </div>
        <img className="absolute bottom-0 hidden lg:flex" src="https://partyswap.io/app-sub/static/media/home-hero-bonnie.b0376a1a.svg" />
        <img className="absolute right-0 bottom-0" src="https://partyswap.io/app-sub/static/media/home-hero-trent.60dcda17.svg" />

      </div>
      <div className="container  mx-auto py-20">
        <p className="text60 font-semibold text-center">One-stop decentralized trading</p>

        <div className="flex flex-wrap justify-between mt-20">

          {
            data.map((ele, ind) => {
              return (
                <Card
                  tittle={ele.tittle}
                  desc={ele.desc}
                  image={ele.image}
                  link={ele.link}
                  key={ind}
                />
              )
            })
          }

        </div>
      </div>

      <MemeCoinTable />
      <div className="mt-2x0"></div>
      <PopularTable />

      <PopularSlider />
    </div>
  );
}

export default Home;
