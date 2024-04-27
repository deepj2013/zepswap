import { ethers } from "ethers";
import contractAbi from "./token.json";
import { Rpc_Url } from "./config";

const provider = new ethers.providers.JsonRpcProvider(Rpc_Url);

export async function getTokenBalance(TokenAdress, adress) {
  try {
    const contract = new ethers.Contract(TokenAdress, contractAbi, provider);
    const decimal = await contract.balanceOf(adress);
    return Number(decimal.toString());
  } catch (error) {
    console.log("Error checking approval amount:", error);
    return 0;
  }
}

export async function approveERC20(tokenAddress, amount, signer) {
  try {
    const contract = new ethers.Contract(tokenAddress, contractAbi, signer);

    const gasPrice = await signer.getGasPrice();
    const gasLimit = await contract.estimateGas.approve(
      "0x258BC36635b315537543f35F649c2e5F8CaBbDf5",
      (amount * 10 ** 18).toString()
    );

    const rawTransaction = {
      to: tokenAddress,
      gasPrice,
      gasLimit,
      data: contract.interface.encodeFunctionData("approve", [
        "0x258BC36635b315537543f35F649c2e5F8CaBbDf5",
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

export async function checkErcApprovals(userAddress, tokenAddress) {
  try {
    const contract = new ethers.Contract(tokenAddress, contractAbi, provider);
    const approvalAmount = await contract.allowance(
      userAddress,
      "0x258BC36635b315537543f35F649c2e5F8CaBbDf5"
    );

    return approvalAmount.toString();
  } catch (error) {
    console.log("Error checking approval amount:", error);
    throw error;
  }
}

export async function BuyZepx(amount, signer) {
  try {

  } catch (error) {
    
  }
}

export async function buyThroughUsdt(amount, signer) {
  try {
  } catch (error) {}
}

export async function sellThroughUsdt(amount, signer) {
  try {
  } catch (error) {}
}
