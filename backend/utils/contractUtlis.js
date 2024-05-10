const ethers = require("ethers");

// Initialize an Ethereum provider
const provider = new ethers.providers.JsonRpcProvider(
  "https://bsc-testnet-rpc.publicnode.com"
);

const getOnBlockData = async (txHash) => {
  try {
    const transaction = await provider.getTransaction(txHash);

    // console.log("tx", transaction);
    if (transaction) {
      let inputData;
      let decodedData;

      // Decode input data using the function signature
      if (transaction.data !== "0x") {
        inputData = ethers.utils.hexDataSlice(transaction.data, 4); // Remove function signature prefix
        decodedData = ethers.utils.defaultAbiCoder.decode(
          ["string", "string", "address", "address", "uint256"],
          inputData
        );
        // decodedData[4] = Number(decodedData[4]); // Convert to string or handle as BigNumber as needed
        // decodedData.push(transaction.from);
      } else {
        console.log("No input data found in the transaction");
        const data = {
          sucess: false,
          data: null,
        };
        return data;
      }

      console.log("Input data:", decodedData);
      const data = {
        sucess: true,
        data: decodedData,
        from:transaction.from
      };
      return data;
    } else {
      console.log("Transaction not found");
      const data = {
        sucess: false,
        data: null,
      };
      return data;
    }
  } catch (error) {
    console.error("Error retrieving transaction data:", error);
  }
  const data = {
    sucess: false,
    data: null,
  };
  return data;
};

module.exports = {
  getOnBlockData,
};
