const dotenv = require("dotenv").config();
const express = require("express");
const Port = 3097;
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const logger = require("morgan");
const app = express();
const server = http.createServer(app);
const socketIO = require("socket.io");
const { socketIoConnection } = require("./socket/socket");
const databaseConnection = require("./database/db");
const logErrors = require("./utils/errorLogger");
const lotteryRouter = require('./routes/lottery.Routes')
const predictionRouter = require('./routes/prediction.Routes')
const userRouter = require('./routes/user.Routes')

const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const router = express.Router();

app.set("socketIo", io);
app.use(
  cors({
    origin: "*",
  })
);


const { default: helmet } = require("helmet");
const { transactionMonitorSystem } = require("./services/transactionMonitor");
const { StartPrediction } = require("./services/prediction.services");



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", router);
app.use("/lottery", lotteryRouter);
app.use("/user", userRouter);
app.use("/prediction", predictionRouter);

// Add the error log middleware to the app
app.use(logErrors);

// routes using here
app.use(cors({
  origin: 'https://zepswap.com/', // Replace with your frontend domain if different
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization'
}));
app.use(helmet());
app.use(logger("common"));

databaseConnection(() => {
  server.listen(Port, () => {
    console.log(`server is running in port ${Port}`);
    socketIoConnection(io);
    StartPrediction();
    // transactionMonitorSystem();
  });
});

app.get("/testapi", async (req, res) => {
  res.send("ok");
});
