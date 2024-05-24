const { emitSocketEvent } = require("../socket/socket");

let PredictionId = 1;
let upcomingPredictions = [];
let previousPredictions = [];
let PredictionDb = {
  id: 0,
  PredictionUp: {
    TotalAmount: 0,
    TotalParticpatedUsers: 0,
  },
  PredictionDown: {
    TotalAmount: 0,
    TotalParticpatedUsers: 0,
  },
  PredictionHold: {
    TotalAmount: 0,
    TotalParticpatedUsers: 0,
  },
  ParticpatedUsers: [],
  startingTimestamp: 0,
  endingTimestamp: 0,
  TotalParticpatedUser: 0,
  TotalAmount: 0,
  Winner: null,
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const startNewPrediction = async () => {
  try {
    previousPredictions.push({ ...PredictionDb });

    // Keep only the last 5 predictions
    if (previousPredictions.length > 5) {
      previousPredictions.shift();
    }
    // Saving Previous Prediction Data and reseting Prediction Db
    const winner = checkWinner();
    distributePredictionWinnings(winner);
    emitSocketEvent("hi", "hi");
    PredictionId++;
    PredictionDb = resetPredictionDb();
    // Starting New Prediction From Here
    PredictionDb.id = PredictionId;
    PredictionDb.startingTimestamp = Date.now();
    PredictionDb.endingTimestamp = Date.now() + 5 * 60 * 1000;
    PredictionDb.Winner = winner
    PredictionBot(getRandomNumber(1, 40));
    // console.log(PredictionId, PredictionDb);
    generateUpcomingPredictions();
  } catch (error) {
    console.log("error in Prediction", error);
  }
};

const PredictionBot = (userCount) => {
  for (let i = 0; i < userCount; i++) {
    let type;
    const category = getRandomNumber(1, 3);
    const amount = getRandomNumber(1, 1000);
    switch (category) {
      case 1:
        type = "UP";
        PredictionDb.PredictionUp.TotalAmount += amount;
        PredictionDb.PredictionUp.TotalParticpatedUsers += 1;
        break;
      case 2:
        type = "DOWN";
        PredictionDb.PredictionDown.TotalAmount += amount;
        PredictionDb.PredictionDown.TotalParticpatedUsers += 1;
        break;
      case 3:
        type = "HOLD";
        PredictionDb.PredictionHold.TotalAmount += amount;
        PredictionDb.PredictionHold.TotalParticpatedUsers += 1;
        break;
    }
    const user = {
      Address: i,
      amount: amount,
      type: type,
    };
    PredictionDb.ParticpatedUsers.push(user);
    PredictionDb.TotalAmount += amount;
    PredictionDb.TotalParticpatedUser += 1;
    // emitSocketEvent("newPredictionPlaced", {
    //   ...user,
    //   predictionId: PredictionId,
    // });
  }
};

const resetPredictionDb = () => {
  return {
    id: 0,
    PredictionUp: {
      TotalAmount: 0,
      TotalParticpatedUsers: 0,
    },
    PredictionDown: {
      TotalAmount: 0,
      TotalParticpatedUsers: 0,
    },
    PredictionHold: {
      TotalAmount: 0,
      TotalParticpatedUsers: 0,
    },
    ParticpatedUsers: [],
    startingTimestamp: 0,
    endingTimestamp: 0,
    TotalParticpatedUser: 0,
    TotalAmount: 0,
    Winner: null,
  };
};

const generateUpcomingPredictions = () => {
  upcomingPredictions = [];
  for (let i = 1; i <= 2; i++) {
    const upcomingPrediction = resetPredictionDb();
    upcomingPrediction.id = PredictionId + i;
    upcomingPrediction.startingTimestamp = Date.now() + i * 5 * 60 * 1000;
    upcomingPrediction.endingTimestamp =
      upcomingPrediction.startingTimestamp + 5 * 60 * 1000;
    upcomingPredictions.push(upcomingPrediction);
  }
};

const checkWinner = () => {
  let Winner;
  if (
    PredictionDb.PredictionUp.TotalAmount <=
      PredictionDb.PredictionDown.TotalAmount &&
    PredictionDb.PredictionUp.TotalAmount <=
      PredictionDb.PredictionHold.TotalAmount
  ) {
    Winner = "UP";
  } else if (
    PredictionDb.PredictionDown.TotalAmount <=
      PredictionDb.PredictionUp.TotalAmount &&
    PredictionDb.PredictionDown.TotalAmount <=
      PredictionDb.PredictionHold.TotalAmount
  ) {
    Winner = "DOWN";
  } else {
    Winner = "Hold";
  }

  console.log("Winner Is", Winner);
  return Winner;
};

const joinPredictionInternal = (predictionId, amount, address, type) => {
  if (predictionId != PredictionId) {
    return {
      succes: false,
      msg: "inavalid Prediction Id",
    };
  }
  const arePlacedBet = userExists(PredictionDb.ParticpatedUsers, address);
  if (arePlacedBet) {
    return {
      succes: false,
      msg: "User Cannot Place Multiple Bet",
    };
  }

  switch (type) {
    case "UP":
      PredictionDb.PredictionUp.TotalAmount += amount;
      PredictionDb.PredictionUp.TotalParticpatedUsers += 1;
      break;
    case "DOWN":
      PredictionDb.PredictionDown.TotalAmount += amount;
      PredictionDb.PredictionDown.TotalParticpatedUsers += 1;
      break;
    case "HOLD":
      PredictionDb.PredictionHold.TotalAmount += amount;
      PredictionDb.PredictionHold.TotalParticpatedUsers += 1;
      break;
  }
  const user = {
    Address: address,
    amount: amount,
    type: type,
  };
  PredictionDb.ParticpatedUsers.push(user);
  PredictionDb.TotalAmount += amount;
  PredictionDb.TotalParticpatedUser += 1;
  emitSocketEvent("newPredictionPlaced", {
    ...user,
    predictionId: PredictionId,
  });
  return {
    succes: true,
    msg: "Bet Placed Succesfully",
  };
};

const getPredictionDataInternal = () => {
  const data = {
    previousPredictions: previousPredictions,
    currentPrediction: PredictionDb,
    upcomingPredictions: upcomingPredictions,
  };
  return data;
};

const distributePredictionWinnings = (Winner) => {
  try {
    const winnerList = PredictionDb.ParticpatedUsers.filter(
      (participation) => participation.type === Winner
    );
    console.log("winner list", winnerList);
    winnerList.forEach((winner) => {
      console.log(
        `Winner Address: ${String(winner.Address).length}, Amount: ${
          winner.amount
        }, Type: ${winner.type}`
      );
      if (String(winner.Address).length > 4) {
        console.log("this is real user", winner.Address);
      }
    });
  } catch (error) {}
};

const userExists = (participations, userAddress) => {
  return participations.some(
    (participation) => participation.Address === userAddress
  );
};

setInterval(startNewPrediction, 1000);

console.log("perdictiondb", PredictionDb.ParticpatedUsers);

module.exports = {
  joinPredictionInternal,
  getPredictionDataInternal,
};
