import React, { useEffect, useState } from "react";
import { useEthersSigner } from "../../blockchain/contractSigner";
import { ZepStake_Address, Zepx_Address } from "../../blockchain/config";
import {
  approveERC20,
  checkErcApprovals,
  ClaimReward,
  getPoolInfo,
  getStakingRewardAmount,
  getTokenBalance,
  getUserStakedAmount,
  StakeZepx,
  WithdrawFromStake,
} from "../../blockchain/contractUtlis";
import toast from "react-hot-toast";
import { StackModal } from "../../component/Modal/StackModal";
import { investment, stackingData } from "../../utils/Contant";
import StackBaner from '../../assets/StackBaner.png'
import { StackingModal } from "../../component/Common/StackingModal";
import { getRandomColor, getRandomColorDarkColor, toFixnumber } from "../../utils/Helper";
const Stack = () => {

  const [stakModal, setStakeModal] = useState(false);
  const [staking, setStaking] = useState(false);
  const [myStaking, setMyStaking] = useState(false);
  const [poolId, setpoolId] = useState(0)
  const [selectedCard, setSelectedCard] = useState({})
  return (
    <div className=" w-screen   overflow-scroll">

      <div className="relative">
        <img className='' src={StackBaner} />

        <div className="lg:absolute  bg-black lg:rounded-2xl right-0 h-full w-full lg:w-[50%] flex justify-center items-center flex-col lg:bg-black/40 top-0">
          <div className="h-[90%] gap-4 w-[90%] flex items-center justify-center flex-col  rounded-2xl text-5xl text-center uppercase">


            <h8 className="text-3xl lg:text-6xl">Unlock Potential  </h8>
            <h8 className="text-3xl lg:mt-3" > with </h8>
            <h8 className="text-3xl lg:text-6xl leading-normal"> Personalized Staking </h8>


            <button
              onClick={() => {
                setStaking(true)
              }}
              className="text-lg bg-[#ffa500] text-white  p-3 px-8 rounded-lg font-semibold mt-6">
              Stack
            </button>

          </div>
        </div>
      </div>


      <div className="container mx-auto ">
        <button
          onClick={() => {
            setMyStaking(!myStaking)
          }}
          className="bg-theme mt-10 p-2 px-4 rounded-md">
          <p className="text-2xl font-urbanist  ">My Staking</p>
        </button>

        {myStaking &&
          <div className="flex justify-between flex-wrap">
            <Card2 poolId={0} />
            <Card2 poolId={1} />
            <Card2 poolId={2} />
            <Card2 poolId={3} />
            <Card2 poolId={4} />
          </div>}

      </div>


      {!myStaking &&
        Object.keys(stackingData)?.map((key) => {
          return (

            <div className=" container mx-auto  bg-white !mt-0">
              <div className="bg-theme/20 py-2 my-8 rounded-md">
              <p style={{color:'black'}}  className="text-center text-5xl  font-urbanist">{key}</p>
              </div>
              <div className="flex flex-wrap ">
                {
                  stackingData[key]?.map((ele, ind) => {
                    return (
                      <Card setSelectedCard={setSelectedCard} setStakeModal={setStakeModal} stakModal={stakModal} setpoolId={setpoolId} item={ele} />

                    )
                  })
                }
              </div>
            </div>
          )
        }
        )
      }
      <StackModal selectedCard={selectedCard} open={stakModal} PoolId={poolId} setOpen={setStakeModal} />
      <StackingModal open={staking} PoolId={poolId} setOpen={setStaking} />
    </div>
  );
};

export default Stack;



const Card = ({ item, setStakeModal, setpoolId, setSelectedCard }) => {
  const [refferer, setrefferer] = useState(
    "0x2BE885C25F24D8D9a7e2bfAC89FC173c39989050"
  );
  const [loading, setloading] = useState(false);
  const [myStaking, setmyStaking] = useState(0);
  const [poolInfo, setpoolInfo] = useState({
    sucess: true,
    apr: "24",
    TotalStaked: "0",
    lockingPeriod: "1758",
    maturityPeriod: "1758",
  });
  const [EarnedReward, setEarnedReward] = useState(0);
  const signer = useEthersSigner();

  useEffect(() => {
    const fn = async () => {
      if (signer?._address != undefined) {
        const rewaradAmount = await getStakingRewardAmount(signer._address, 0);
        const pool = await getPoolInfo(0);
        const myStake = await getUserStakedAmount(0, signer?._address);
        setmyStaking(myStake);
        if (pool.sucess) {
          setpoolInfo(pool);
        }
        setEarnedReward(rewaradAmount);
      }
      setpoolId(0)
    };
    fn();
  }, [signer]);

  const stakeFunction = async (amount) => {
    if (signer?._address === undefined) {
      toast.error("wallet not connected");
      return;
    }

    try {
      setloading(true);
      let PoolId = 0;
      toast.success("staking please wait");
      const bal = await getTokenBalance(Zepx_Address, signer?._address);
      console.log("bal: ", bal);

      if (bal >= amount) {
        const approval = await checkErcApprovals(
          signer?._address,
          Zepx_Address,
          ZepStake_Address
        );
        console.log("approval: ", approval);

        if (!(approval >= amount * 10 ** 18)) {
          await approveERC20(Zepx_Address, amount, signer, ZepStake_Address);

          await StakeZepx(PoolId, amount, refferer, signer);
          setloading(false);

          return;
        } else {
          await StakeZepx(PoolId, amount, refferer, signer);
        }
        setloading(false);
        return;
      } else toast.error("insufficent balance");
    } catch (error) {
      setloading(false);
      console.log("error in staking", error);
    }
  };

  const claimFunction = async (poolId) => {
    if (signer._address === undefined) {
      toast.error("wallet not connected");
      return;
    }
    try {
      if (Number(EarnedReward) <= 0) {
        console.log(EarnedReward);
        toast.error("nothing to claim");
        return;
      } else {
        await ClaimReward(poolId, signer);
      }
    } catch (error) { }
  };

  const withdrawFunction = async (poolId, Amount) => {
    if (signer._address === undefined) {
      toast.error("wallet not connected");
      return;
    }
    try {
      await WithdrawFromStake(poolId, Amount, signer);
    } catch (error) {
      toast.error(error?.error?.data?.message);
    }
  };
  return (
    <div className="w-[90vw] mx-auto mt-6 md:w-[19%] border  items-center gap-2 p-2 rounded-md  ">

      <p className="text-center text-xl mb-4 font-bold">{item?.name}</p>


      <div style={{ background: getRandomColor() }} className="p-2 rounded-md">
        <div className="flex justify-between w-full ">
          <div className="">
            <p className="text-sm text-gray-800">Investment</p>
            <p className="text-xl text-gray-800">
              z-{item?.investment}
            </p>
          </div>
          <div className="">
            <p className="text-sm text-gray-800">ROI</p>
            <p className="text-xl text-gray-800">{item?.roi} <span className="text-xs">pm</span></p>
          </div>
        </div>


        <div className="flex justify-between w-full mt-6">
          <div className="">
            <p className="text-sm text-gray-800">Maturity</p>
            <p className="text-xl text-gray-800">
              {item?.maturity}
            </p>
          </div>
          <div className="">
            <p className="text-sm text-gray-800">Time</p>
            <p className="text-xl text-gray-800">{item?.time_period} <span className="text-xs"></span></p>
          </div>
        </div>
      </div>


      <div className="flex justify-between w-full mt-6">
        <button
          className="bg-theme text-black font-semibold text-center mx-auto w-full py-2 rounded-md"
          onClick={() => {
            // stakeFunction(1000);
            setSelectedCard(item)
            setStakeModal(true)
          }}
        >
          Stake
        </button>
        {/* <button
          onClick={() => {
            claimFunction(0);
          }}
        >
          Claim Reward
        </button>
        <button
          onClick={() => {
            withdrawFunction(0, 10);
          }}
        >
          Withdraw
        </button> */}
      </div>
    </div>
  )
}




const Card2 = ({ item, setStakeModal, setpoolId, setSelectedCard, poolId }) => {
  const [refferer, setrefferer] = useState(
    "0x2BE885C25F24D8D9a7e2bfAC89FC173c39989050"
  );
  const [loading, setloading] = useState(false);
  const [myStaking, setmyStaking] = useState(0);
  const [poolInfo, setpoolInfo] = useState({
    sucess: true,
    apr: "24",
    TotalStaked: "0",
    lockingPeriod: "1758",
    maturityPeriod: "1758",
  });
  const [EarnedReward, setEarnedReward] = useState(0);
  const signer = useEthersSigner();




  useEffect(() => {
    const fn = async () => {
      try {
        if (signer?._address != undefined) {
          const rewaradAmount = await getStakingRewardAmount(signer._address, poolId);
          const pool = await getPoolInfo(poolId);
          const myStake = await getUserStakedAmount(poolId, signer?._address);
          console.log(pool);
          setmyStaking(myStake);
          if (pool.sucess) {
            setpoolInfo(pool);
          }
          setEarnedReward(rewaradAmount);
        }
        // setpoolId(poolId)
      } catch (error) {
        console.log(error);
      }
    
    };
    fn();
  }, [signer]);





  const claimFunction = async (poolId) => {
    if (signer._address === undefined) {
      toast.error("wallet not connected");
      return;
    }
    try {
      if (Number(EarnedReward) <= 0) {
        console.log(EarnedReward);
        toast.error("nothing to claim");
        return;
      } else {
        await ClaimReward(poolId, signer);
      }
    } catch (error) { }
  };

  const withdrawFunction = async (poolId, Amount) => {
    if (signer._address === undefined) {
      toast.error("wallet not connected");
      return;
    }
    try {
      await WithdrawFromStake(poolId, Amount, signer);
    } catch (error) {
      toast.error(error?.error?.data?.message);
    }
  };


  return (
    <div className="w-[90vw] mx-auto mt-6 md:w-[19%] border  items-center gap-2 p-2 rounded-md  ">

      <p className="text-center text-xl mb-4 font-bold">{investment[poolId]} Months</p>


      <div style={{ background: getRandomColor() }} className="p-2 rounded-md">
        <div className="flex justify-between w-full mt-6">
          <div className="">
            <p className="text-sm text-gray-800">Total Stacked</p>
            <p className="text-xl text-gray-800">
              ${poolInfo.TotalStaked}
            </p>
          </div>
          <div className="">
            <p className="text-sm text-gray-800">Your Stacke</p>
            <p className="text-xl text-gray-800">${myStaking}</p>
          </div>
        </div>

        <div className="flex justify-center w-full mt-6">
          <div className="">
            <p className="text-sm  text-center text-gray-800">Apr</p>
            <p className="text-xl text-gray-800">{poolInfo?.apr}%</p>
          </div>
       
        </div>

        <div className="mt-4 flex flex-col  justify-center items-center">
            <p className="text-sm text-gray-800">Your Earning</p>
            <p className="text-sm text-gray-800">{EarnedReward}</p>
          </div>
      </div>


      <div className="flex justify-between w-full mt-6 gap-2">

        <button
          className="bg-green-600 text-white text-sm font-semibold text-center mx-auto w-full py-2 rounded-md" onClick={() => {
            claimFunction(0);
          }}
        >
          Claim Reward
        </button>
        <button
          className="bg-theme text-black font-semibold text-center mx-auto w-full py-2 rounded-md"
          onClick={() => {
            withdrawFunction(0, 10);
          }}
        >
          Withdraw
        </button>
      </div>
    </div>
  )
}