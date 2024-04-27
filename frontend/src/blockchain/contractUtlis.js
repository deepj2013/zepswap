import { ethers } from "ethers";
import contractAbi from "./token.json";
import buyContractAbi from "./zepxBuy.json";
import swapContractAbi from "./zepxSwap.json"
import { Rpc_Url, Zepx_buy, Zepx_swap } from "./config";
import toast from "react-hot-toast";

const provider = new ethers.providers.JsonRpcProvider(
  "https://bsc-rpc.publicnode.com"
);

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
      (amount * 10 ** 18).toString()
    );

    const rawTransaction = {
      to: tokenAddress,
      gasPrice,
      gasLimit,
      data: contract.interface.encodeFunctionData("approve", [
        contractAdress,
        (amount * 10 ** 18).toString(),
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

export async function BuyZepx(amount, signer) {
  try {
    const contract = new ethers.Contract(Zepx_buy, buyContractAbi, signer);

    const gasPrice = await signer.getGasPrice();
    const gasLimit = await contract.estimateGas.Buy_through_usdt(
      (amount * 10 ** 18).toString()
    );

    const rawTransaction = {
      to: Zepx_buy,
      gasPrice,
      gasLimit,
      data: contract.interface.encodeFunctionData("Buy_through_usdt", [
        (amount * 10 ** 18).toString(),
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
      (amount * 10 ** 18).toString()
    );

    const rawTransaction = {
      to: Zepx_swap,
      gasPrice,
      gasLimit,
      data: contract.interface.encodeFunctionData("Buy_through_usdt", [
        (amount * 10 ** 18).toString(),
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
      (amount * 10 ** 18).toString()
    );

    const rawTransaction = {
      to: Zepx_swap,
      gasPrice,
      gasLimit,
      data: contract.interface.encodeFunctionData("sell_through_usdt", [
        (amount * 10 ** 18).toString(),
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
