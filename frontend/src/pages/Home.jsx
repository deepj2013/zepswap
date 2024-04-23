import React from "react";
import Card from "../component/Home/Card";
import MemeCoinTable from "../component/Home/MemeCoinTable";
import PopularTable from "../component/Home/PopularTable";
import PopularSlider from "../component/Home/PopularSlider";


function Home() {

  const data = [
    {
      tittle: 'Trade',
      desc: 'Swap tokens with low fees',
      image: 'https://traderjoexyz.com/static/media/trade_2x.048e477a3ff27d4ea77e.webp'
    },
    {
      tittle: 'Poll',
      desc: 'Swap tokens with low fees',
      image: 'https://traderjoexyz.com/static/media/pool_2x.f6a82d52ecbfa395257e.webp'
    },
    {
      tittle: 'Stake',
      desc: 'Swap tokens with low fees',
      image: 'https://traderjoexyz.com/static/media/stake_2x.fdda42678ccbb1695331.webp'
    },
    {
      tittle: 'Nft',
      desc: 'Swap tokens with low fees',
      image: 'https://traderjoexyz.com/static/media/nft_2x.a31a1f7035dad469312e.webp'
    },
  ]


  
  return (
    <div className="">
      <div className="bg-theme w-screen h-[70vh] relative">
        <div className="mx-auto  flex flex-col items-center h-full justify-center z-50">
          <p className="text-yellow-600 font-semibold text20">
            WELCOME TO THE PARTY
          </p>
          <p className="text60 mt- text-center text-secondry font-semibold ">

            The most reliable
          </p>

          <p className="text60 mt-3 text-center text-white font-semibold ">
            ZepSwap  yet
          </p>

          <button className="bg-yellowShade text20 p-2.5 mt-7 rounded-full px-8">
              Unlock Wallet
          </button>
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
                  key={ind}
                />
              )
            })
          }

        </div>
      </div>
      
      <MemeCoinTable/>
          <div className="mt-2x0"></div>
      <PopularTable/>

      <PopularSlider/>
    </div>
  );
}

export default Home;
