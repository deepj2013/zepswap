// const { getPredictionData } = require("../services/prediction.services");

let socketLoggedInUser = [];
let ioInstance;

const socketIoConnection = async (io) => {
  ioInstance = io;

  io.on("connection", (socket) => {
    console.log("A user connected.");
    // // const predictionData = getPredictionData();
    // socket.emit("PredictionData", { data: predictionData });

    socket.on("disconnect", () => {
      console.log("A user disconnected.");
    });
  });
};

const getSocketIo = () => {
  return {
    instance:ioInstance
  };
};

const getSocketConnectedUsers = () => {
  return socketLoggedInUser;
};

const emitSocketEvent = (eventName, eventData) => {
  if (ioInstance) {
    // ioInstance.emit(eventName, eventData);
    console.log(`Event ${eventName} emitted with data:`, eventData);
  } else {
    console.error('Socket instance not initialized.');
  }
};

module.exports = {
  socketIoConnection,
  getSocketIo,
  getSocketConnectedUsers,
  emitSocketEvent
};
