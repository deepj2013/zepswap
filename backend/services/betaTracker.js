const Web3 = require("web3");

// Connect to an Ethereum node using WebSocket provider
const web3 = new Web3("wss://polygon-bor.publicnode.com");

// Function to decode a transaction
async function decodeTransaction(txHash) {
  try {
    const tx = await web3.eth.getTransaction(txHash);
    if (tx) {
      console.log("Transaction details:");
      const decodedInput = web3.eth.abi.decodeParameters(
        ["uint256", "address", "uint256"],
        tx.input
      );
      console.log("Decoded input:", decodedInput);
      //   // Add more decoding logic based on the transaction's function signature and ABI
    } else {
      console.log("Transaction not found");
    }
  } catch (error) {
    console.error("Error decoding transaction:", txHash);
  }
}

const betaTracker = async () => {
  console.log("BetaTracker Started");
  const n = await web3.eth.getBlock(51702142, true);
  web3.eth.getBlock(51702142, true).then((block) => {
    if (block && block.transactions) {
      block.transactions.forEach((tx) => {
        console.log("Confirmed transaction in block:", tx);
        // Decode transaction data if needed
        // You might use ABI decoding as previously shown
        // decodeTransaction(tx.hash); // Decode the pending transaction
      });
    }
  });
  console.log("value of n", n?.transactions[1]);
  web3.eth
    .subscribe("newBlockHeaders", (error, result) => {
      if (!error) {
        console.log("Pending transaction:", result.number);
        web3.eth.getBlock(123, true).then((block) => {
          if (block && block.transactions) {
            block.transactions.forEach((tx) => {
              console.log("Confirmed transaction in block:", tx);
              // Decode transaction data if needed
              // You might use ABI decoding as previously shown
              // decodeTransaction(tx.hash); // Decode the pending transaction
            });
          }
        });
        //   decodeTransaction(result); // Decode the pending transaction
      } else {
        console.error("Error:", error);
      }
    })
    .on("error", (err) => {
      console.error("Subscription error:", err);
    });
};

module.exports = {
  betaTracker,
};
