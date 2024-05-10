const Web3 = require("web3");
const { betaTracker } = require("./betaTracker");

const ethContarctArray = [
  "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
]; // Usdt , Usdc
const bscContractArray = []; //
const bscTestnetContractArray = []; //
const polygonContractArray = []; //

const transactionMonitorSystem = async () => {
  try {
   await betaTracker()
    // await ethWebsocketInstance();
    // await polygonWebsocketInstance();
    // await bscTestnetWebsocketInstance();
    // await bscWebsocketInstance();
    console.log("transactionMonitor system is activated");
  } catch (error) {
    console.log("transactionMonitor system is stopped");
  }
};

const ethWebsocketInstance = async () => {
  try {
    const web3 = new Web3("wss://ethereum.publicnode.com/");
    const subscription = web3.eth.subscribe(
      "logs",
      {
        address: ethContarctArray,
      },
      async (error, result) => {
        if (error) {
          console.error(error);
          return;
        }
        console.log(`Event emitted from contract: ${result.address}`);
        console.log(`Event emitted contract data`, result);
        console.log(result.transactionHash);
        const data = result.data;
        const decodedData = web3.eth.abi.decodeLog(
          [
            {
              indexed: true,
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              name: "to",
              type: "address",
            },
            {
              indexed: false,
              name: "value",
              type: "uint256",
            },
          ],
          data,
          result.topics.slice(1)
        );
        console.log(decodedData);
        console.log(
          `Transfer from ${decodedData.from} to ${decodedData.to}: ${
            decodedData.value / 10 ** 18
          }`
        );
      }
    );

    subscription.on("connected", () => {
      console.log("trasaction service connected to websocket");
    });

    subscription.on("error", (error) => {
      console.error("Error:", error);
    });
  } catch (error) {
    console.log("Error:", error);
  }
};

const polygonWebsocketInstance = async () => {
    try {
        const web3 = new Web3("wss://ethereum.publicnode.com/");
        const subscription = web3.eth.subscribe(
          "logs",
          {
            address: polygonContractArray,
          },
          async (error, result) => {
            if (error) {
              console.error(error);
              return;
            }
            console.log(`Event emitted from contract: ${result.address}`);
            console.log(`Event emitted contract data`, result);
            console.log(result.transactionHash);
            const data = result.data;
            const decodedData = web3.eth.abi.decodeLog(
              [
                {
                  indexed: true,
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  name: "to",
                  type: "address",
                },
                {
                  indexed: false,
                  name: "value",
                  type: "uint256",
                },
              ],
              data,
              result.topics.slice(1)
            );
            console.log(decodedData);
            console.log(
              `Transfer from ${decodedData.from} to ${decodedData.to}: ${
                decodedData.value / 10 ** 18
              }`
            );
          }
        );
    
        subscription.on("connected", () => {
          console.log("trasaction service connected to websocket");
        });
    
        subscription.on("error", (error) => {
          console.error("Error:", error);
        });
      } catch (error) {
        console.log("Error:", error);
      }
};

const bscWebsocketInstance = async () => {
    try {
        const web3 = new Web3("wss://ethereum.publicnode.com/");
        const subscription = web3.eth.subscribe(
          "logs",
          {
            address: bscContractArray,
          },
          async (error, result) => {
            if (error) {
              console.error(error);
              return;
            }
            console.log(`Event emitted from contract: ${result.address}`);
            console.log(`Event emitted contract data`, result);
            console.log(result.transactionHash);
            const data = result.data;
            const decodedData = web3.eth.abi.decodeLog(
              [
                {
                  indexed: true,
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  name: "to",
                  type: "address",
                },
                {
                  indexed: false,
                  name: "value",
                  type: "uint256",
                },
              ],
              data,
              result.topics.slice(1)
            );
            console.log(decodedData);
            console.log(
              `Transfer from ${decodedData.from} to ${decodedData.to}: ${
                decodedData.value / 10 ** 18
              }`
            );
          }
        );
    
        subscription.on("connected", () => {
          console.log("trasaction service connected to websocket");
        });
    
        subscription.on("error", (error) => {
          console.error("Error:", error);
        });
      } catch (error) {
        console.log("Error:", error);
      }
};

const bscTestnetWebsocketInstance = async () => {
    try {
        const web3 = new Web3("wss://ethereum.publicnode.com/");
        const subscription = web3.eth.subscribe(
          "logs",
          {
            address: bscTestnetContractArray,
          },
          async (error, result) => {
            if (error) {
              console.error(error);
              return;
            }
            console.log(`Event emitted from contract: ${result.address}`);
            console.log(`Event emitted contract data`, result);
            console.log(`Event emitted`)
            console.log(result.transactionHash);
            const data = result.data;
            const decodedData = web3.eth.abi.decodeLog(
              [
                {
                  indexed: true,
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  name: "to",
                  type: "address",
                },
                {
                  indexed: false,
                  name: "value",
                  type: "uint256",
                },
              ],
              data,
              result.topics.slice(1)
            );
            console.log(decodedData);
            console.log(
              `Transfer from ${decodedData.from} to ${decodedData.to}: ${
                decodedData.value / 10 ** 18
              }`
            );
          }
        );
    
        subscription.on("connected", () => {
          console.log("trasaction service connected to websocket");
        });
    
        subscription.on("error", (error) => {
          console.error("Error:", error);
        });
      } catch (error) {
        console.log("Error:", error);
      }
};

module.exports = {
  transactionMonitorSystem,
};
