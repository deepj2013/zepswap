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
import { stackingData } from "../../utils/Contant";

const Stack = () => {

  const [stakModal,setStakeModal]=useState(false);
  const [poolId, setpoolId] = useState(0)

  return (
    <div className="h-screen w-screen   overflow-scroll">



      {
        Object.keys(stackingData)?.map((key) => {
          return (

            <div className=" container mx-auto  bg-white !mt-20">
              <p className="text-center text60">{key}</p>
              <div className="flex flex-wrap ">
                {
                  stackingData[key]?.map((ele, ind) => {
                    return (
                      <Card setStakeModal={setStakeModal} stakModal={stakModal} setpoolId={setpoolId}  item={ele} />

                    )
                  })
                }
              </div>
            </div>
          )
        }
        )
      }
      <StackModal open={stakModal} PoolId={poolId} />
    </div>
  );
};

export default Stack;



const Card = ({ item,setStakeModal, setpoolId }) => {
  const [refferer, setrefferer] = useState(
    "0x0000000000000000000000000000000000000000"
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
    <div className="w-[90vw] mx-auto mt-6 md:w-[19%] border  items-center gap-2 p-5 rounded-md  hover:bg-lightTheme">

      <p className="text-center text-xl mb-4 font-bold">{item?.name}</p>
 

      <div className="flex justify-between w-full mt-6">
        <div className="">
          <p className="text-sm text-gray-800">Investment</p>
          <p className="text-xl text-gray-800">
            {item?.investment}
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

      <div className="flex justify-between w-full mt-6">
        <div className="">
          <p className="text-sm text-gray-800">Apr</p>
          <p className="text-xl text-gray-800">{poolInfo?.apr}%</p>
        </div>
        <div className="">
          <p className="text-sm text-gray-800">Your Earning</p>
          <p className="text-xl text-gray-800">{EarnedReward}</p>
        </div>
      </div>
      <div className="flex justify-between w-full mt-6">
        <button
          onClick={() => {
            // stakeFunction(1000);
            setStakeModal(true)
          }}
        >
          Stake
        </button>
        <button
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
        </button>
      </div>
    </div>
  )
}