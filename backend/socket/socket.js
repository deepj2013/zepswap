let socketLoggedInUser = [];

const socketIoConnection = async (io) => {
  ioInstance = io;

  io.on("connection", (socket) => {
    console.log("A user connected.");

    socket.on("disconnect", () => {
      console.log("A user disconnected.");
    });
  });
};

const getSocketInstance = () => {
    return ioInstance;
  };

  const getSocketConnectedUsers = () => {
    return socketLoggedInUser;
  };

module.exports = {
    socketIoConnection,
    getSocketInstance,
    getSocketConnectedUsers
}