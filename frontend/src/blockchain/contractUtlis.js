import { ethers } from "ethers";
import contractAbi from "./token.json";
import buyContractAbi from "./zepxBuy.json";
import swapContractAbi from "./zepxSwap.json";
import stakeContractAbi from "./zepStake.json";
import { Rpc_Url, ZepStake_Address, Zepx_buy, Zepx_swap } from "./config";
import toast from "react-hot-toast";

const provider = new ethers.providers.JsonRpcProvider(
  "https://bsc-rpc.publicnode.com"
);

export async function getCurrentBlockTimestamp() {
  const block = await provider.getBlock("latest");
console.log("blocktimestamp",block.timestamp)
  return block?.timestamp;
}

getCurrentBlockTimestamp()

export async function getTokenBalance(TokenAdress, adress) {
  console.log("checking balance...", TokenAdress, adress);
  try {
    const contract = new ethers.Contract(TokenAdress, contractAbi, provider);
    const decimal = await contract.balanceOf(adress);
    console.log("va", decimal);
    return Number(decimal.toString());
  } catch (error) {
    console.log("Error checking balance:", error);
    return 0;
  }
}

export async function approveERC20(
  tokenAddress,
  amount,
  signer,
  contractAdress
) {
  try {
    const contract = new ethers.Contract(tokenAddress, contractAbi, signer);

    const gasPrice = await signer.getGasPrice();
    const gasLimit = await contract.estimateGas.approve(
      contractAdress,
      (amount * 10 ** 18).toLocaleString("fullwide", {
        useGrouping: false,
      })
    );

    const rawTransaction = {
      to: tokenAddress,
      gasPrice,
      gasLimit,
      data: contract.interface.encodeFunctionData("approve", [
        contractAdress,
        (amount * 10 ** 18).toLocaleString("fullwide", {
          useGrouping: false,
        }),
      ]),
      nonce: await signer.getTransactionCount(),
    };

    const transactionResponse = await signer.sendTransaction(rawTransaction);
    const receipt = await transactionResponse.wait();

    return receipt;
  } catch (error) {
    console.log("Error approving ERC20 tokens:", error);
    throw error;
  }
}

export async function checkErcApprovals(
  userAddress,
  tokenAddress,
  contractAdress
) {
  console.log("t1", userAddress, tokenAddress, contractAdress);
  try {
    const contract = new ethers.Contract(tokenAddress, contractAbi, provider);
    const approvalAmount = await contract.allowance(
      userAddress,
      contractAdress
    );

    return approvalAmount.toString();
  } catch (error) {
    console.log("t1", userAddress, tokenAddress, contractAdress);
    console.log("Error checking approval amount:", error);
    throw error;
  }
}

export async function getPoolInfo(poolId) {
  try {
    const contract = new ethers.Contract(
      ZepStake_Address,
      stakeContractAbi,
      provider
    );
    const poolInfo = await contract.pools(poolId);

    return {
      sucess: true,
      apr: new Intl.NumberFormat("en-US", { maximumFractionDigits: 20 }).format(
        poolInfo[2]
      ),
      TotalStaked: new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 20,
      }).format(poolInfo[3]/10**18),
      lockingPeriod: new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 20,
      }).format(poolInfo[6]),
      maturityPeriod: new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 20,
      }).format(poolInfo[7]),
    };
  } catch (error) {
    console.log("Error Pool:", error);
    return {
      sucess: false,
    };
  }
}

getPoolInfo(0);

export async function BuyZepx(amount, signer) {
  try {
    const contract = new ethers.Contract(Zepx_buy, buyContractAbi, signer);

    const gasPrice = await signer.getGasPrice();
    const gasLimit = await contract.estimateGas.Buy_through_usdt(
      (amount * 10 ** 18).toLocaleString("fullwide", {
        useGrouping: false,
      })
    );

    const rawTransaction = {
      to: Zepx_buy,
      gasPrice,
      gasLimit,
      data: contract.interface.encodeFunctionData("Buy_through_usdt", [
        (amount * 10 ** 18).toLocaleString("fullwide", {
          useGrouping: false,
        }),
      ]),
      nonce: await signer.getTransactionCount(),
    };

    const transactionResponse = await signer.sendTransaction(rawTransaction);
    const receipt = await transactionResponse.wait();
    toast.success("Zepx Bought succesfully");
    return receipt;
  } catch (error) {
    console.log("Error buying Zepx:", error);
    throw error;
  }
}

export async function buyThroughUsdt(amount, signer) {
  try {
    const contract = new ethers.Contract(Zepx_swap, swapContractAbi, signer);

    const gasPrice = await signer.getGasPrice();
    const gasLimit = await contract.estimateGas.Buy_through_usdt(
      (amount * 10 ** 18).toLocaleString("fullwide", {
        useGrouping: false,
      })
    );

    const rawTransaction = {
      to: Zepx_swap,
      gasPrice,
      gasLimit,
      data: contract.interface.encodeFunctionData("Buy_through_usdt", [
        (amount * 10 ** 18).toLocaleString("fullwide", {
          useGrouping: false,
        }),
      ]),
      nonce: await signer.getTransactionCount(),
    };

    const transactionResponse = await signer.sendTransaction(rawTransaction);
    const receipt = await transactionResponse.wait();
    toast.success("Zepx Bought succesfully");
    return receipt;
  } catch (error) {
    console.log("Error buying Zepx:", error);
    throw error;
  }
}

export async function sellThroughUsdt(amount, signer) {
  try {
    const contract = new ethers.Contract(Zepx_swap, swapContractAbi, signer);

    const gasPrice = await signer.getGasPrice();
    const gasLimit = await contract.estimateGas.sell_through_usdt(
      (amount * 10 ** 18).toLocaleString("fullwide", {
        useGrouping: false,
      })
    );

    const rawTransaction = {
      to: Zepx_swap,
      gasPrice,
      gasLimit,
      data: contract.interface.encodeFunctionData("sell_through_usdt", [
        (amount * 10 ** 18).toLocaleString("fullwide", {
          useGrouping: false,
        }),
      ]),
      nonce: await signer.getTransactionCount(),
    };

    const transactionResponse = await signer.sendTransaction(rawTransaction);
    const receipt = await transactionResponse.wait();
    toast.success("Zepx Sold succesfully");
    return receipt;
  } catch (error) {
    console.log("Error Selling Zepx:", error);
    throw error;
  }
}

export async function StakeZepx(poolId, amount, referer, signer) {
  try {
    console.log("signer", signer);
    const contract = new ethers.Contract(
      ZepStake_Address,
      stakeContractAbi,
      signer
    );

    const gasPrice = await signer.getGasPrice();
    const gasLimit = await contract.estimateGas.stake(
      poolId,
      (amount * 10 ** 18).toLocaleString("fullwide", {
        useGrouping: false,
      }),
      referer
    );

    const rawTransaction = {
      to: ZepStake_Address,
      gasPrice,
      gasLimit,
      data: contract.interface.encodeFunctionData("stake", [
        poolId,
        (amount * 10 ** 18).toLocaleString("fullwide", {
          useGrouping: false,
        }),
        referer,
      ]),
      nonce: await signer.getTransactionCount(),
    };

    const transactionResponse = await signer.sendTransaction(rawTransaction);
    const receipt = await transactionResponse.wait();
    toast.success("Zepx Staked succesfully");
    return receipt;
  } catch (error) {
    console.log("Error Staking Zepx:", error);
    throw error;
  }
}
export async function WithdrawFromStake(poolId,amount, signer) {
  try {
    console.log("signer", signer);
    const contract = new ethers.Contract(
      ZepStake_Address,
      stakeContractAbi,
      signer
    );

    const gasPrice = await signer.getGasPrice();
    const gasLimit = await contract.estimateGas.withdraw(
      poolId,
      (amount * 10 ** 18).toLocaleString("fullwide", {
        useGrouping: false,
      })
    );

    const rawTransaction = {
      to: ZepStake_Address,
      gasPrice,
      gasLimit,
      data: contract.interface.encodeFunctionData("withdraw", [
        poolId,
        (amount * 10 ** 18).toLocaleString("fullwide", {
          useGrouping: false,
        })
      ]),
      nonce: await signer.getTransactionCount(),
    };

    const transactionResponse = await signer.sendTransaction(rawTransaction);
    const receipt = await transactionResponse.wait();
    toast.success("Zepx withdraw succesfully");
    return receipt;
  } catch (error) {
    console.log("Error Staking Zepx:", error.error.data.message);
    throw error;
  }
}

export async function ClaimReward(poolId, signer) {
  try {
    const contract = new ethers.Contract(
      ZepStake_Address,
      stakeContractAbi,
      signer
    );

    const gasPrice = await signer.getGasPrice();
    const gasLimit = await contract.estimateGas.claimRewards(poolId);

    const rawTransaction = {
      to: ZepStake_Address,
      gasPrice,
      gasLimit,
      data: contract.interface.encodeFunctionData("claimRewards", [poolId]),
      nonce: await signer.getTransactionCount(),
    };

    const transactionResponse = await signer.sendTransaction(rawTransaction);
    const receipt = await transactionResponse.wait();
    toast.success("Zepx Staked succesfully");
    return receipt;
  } catch (error) {
    console.log("Error Staking Zepx:", error);
    throw error;
  }
}

export async function getStakingRewardAmount(userAddress, poolId) {
  try {
    const contract = new ethers.Contract(
      ZepStake_Address,
      stakeContractAbi,
      provider
    );
    const rewardAmount = await contract.claimableReward(poolId, userAddress);

    return new Intl.NumberFormat("en-US", { maximumFractionDigits: 20 }).format(
      rewardAmount / 10 ** 18
    );
  } catch (error) {
    console.log("Error checking approval amount:", error);
    return 0;
  }
}

export async function getWithdrawableAmount(userAddress, poolId) {
  try {
    const contract = new ethers.Contract(
      ZepStake_Address,
      stakeContractAbi,
      provider
    );
    const rewardAmount = await contract.TotalWithdrawableAmount(
      poolId,
      userAddress
    );

    return new Intl.NumberFormat("en-US", { maximumFractionDigits: 20 }).format(
      rewardAmount / 10 ** 18
    );
  } catch (error) {
    console.log("Error checking approval amount:", error);
    return 0;
  }
}

export async function getUserStakedAmount(poolId, userAddress) {
  try {
    const contract = new ethers.Contract(
      ZepStake_Address,
      stakeContractAbi,
      provider
    );
    const totalStaked = await contract.TotalStaked(poolId, userAddress);

    return new Intl.NumberFormat("en-US", { maximumFractionDigits: 20 }).format(
      totalStaked / 10 ** 18
    );
  } catch (error) {
    console.log("Error checking approval amount:", error);
    return 0;
  }
}
