let currentLotteryId = 1;
let PredictionDb = {
  id: 0,
  PredictionUp: {
    TotalAmount: 0,
    TotalParticpatedUsers: 0,
    ParticpatedUsers: [],
  },
  PredictionDown: {
    TotalAmount: 0,
    TotalParticpatedUsers: 0,
    ParticpatedUsers: [],
  },
  PredictionHold: {
    TotalAmount: 0,
    TotalParticpatedUsers: 0,
    ParticpatedUsers: [],
  },
  startingTimestamp: 0,
  endingTimestamp: 0,
  TotalParticpatedUser: 0,
  TotalAmount: 0,
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const startNewPrediction = async () => {
  try {
    // Saving Previous Prediction Data and reseting Prediction Db
    checkWinner();
    currentLotteryId++;
    PredictionDb = resetPredictionDb();
    // Starting New Prediction From Here
    PredictionDb.id = currentLotteryId;
    PredictionDb.startingTimestamp = Date.now();
    PredictionDb.endingTimestamp = Date.now() + 5 * 60 * 1000;
    PredictionBot(getRandomNumber(1, 100));
    // console.log(currentLotteryId, PredictionDb);
  } catch (error) {
    console.log("error in Prediction");
  }
};

const PredictionBot = (userCount) => {
  for (let i = 0; i < userCount; i++) {
    const user = {
      Address: getRandomNumber(1, 100000),
      amount: getRandomNumber(1, 1000),
    };
    const category = getRandomNumber(1, 3);
    switch (category) {
      case 1:
        PredictionDb.PredictionUp.ParticpatedUsers.push(user);
        PredictionDb.PredictionUp.TotalAmount += user.amount;
        PredictionDb.PredictionUp.TotalParticpatedUsers += 1;
        break;
      case 2:
        PredictionDb.PredictionDown.ParticpatedUsers.push(user);
        PredictionDb.PredictionDown.TotalAmount += user.amount;
        PredictionDb.PredictionDown.TotalParticpatedUsers += 1;
        break;
      case 3:
        PredictionDb.PredictionHold.ParticpatedUsers.push(user);
        PredictionDb.PredictionHold.TotalAmount += user.amount;
        PredictionDb.PredictionHold.TotalParticpatedUsers += 1;
        break;
    }
    PredictionDb.TotalAmount += user.amount;
    PredictionDb.TotalParticpatedUser += 1;
  }
};

const resetPredictionDb = () => {
  return {
    id: 0,
    PredictionUp: {
      TotalAmount: 0,
      TotalParticpatedUsers: 0,
      ParticpatedUsers: [],
    },
    PredictionDown: {
      TotalAmount: 0,
      TotalParticpatedUsers: 0,
      ParticpatedUsers: [],
    },
    PredictionHold: {
      TotalAmount: 0,
      TotalParticpatedUsers: 0,
      ParticpatedUsers: [],
    },
    TotalParticpatedUser: 0,
    TotalAmount: 0,
  };
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

setInterval(startNewPrediction, 1000);

console.log("perdictiondb", PredictionDb.PredictionDown.ParticpatedUsers);
