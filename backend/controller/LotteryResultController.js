const LotteryResult = require("../database/schema/LotteryResult.js");
const LotterySchema = require("../database/schema/lottery.Schema"); // Assuming this model is already defined

const prizeDistribution = {
  1: {
    Jackpot: 1000,
    Levels: [
      { Amount: 500, Count: 2 },
      { Amount: 250, Count: 4 },
      { Amount: 125, Count: 8 },
      { Amount: 62.5, Count: 16 },
      { Amount: 31.25, Count: 32 },
      { Amount: 15.625, Count: 64 },
      { Amount: 7.8125, Count: 128 },
      { Amount: 3.90625, Count: 256 },
      { Amount: 1.953125, Count: 512 },
    ],
  },
  2: {
    Jackpot: 10000,
    Levels: [
        { Amount: 5000, Count: 2 }, 
        { Amount: 2500, Count: 4 }, 
        { Amount: 1250, Count: 8 }, 
        { Amount: 625, Count: 16 }, 
        { Amount: 312.5, Count: 32 }, 
        { Amount: 156.25, Count: 64 }, 
        { Amount: 78.125, Count: 128 }, 
        { Amount: 39.0625, Count: 256 }, 
        { Amount: 19.53125, Count: 512 },
        { Amount: 9.765625, Count: 1024 },
        { Amount: 4.8828125, Count: 2048 },
        { Amount: 2.44140625, Count: 4096 },
        { Amount: 1.220703125, Count: 8192 },
    ],
  },
  3: {
    Jackpot: 100000,
    Levels: [
        { Amount: 50000, Count: 2 }, 
        { Amount: 25000, Count: 4 }, 
        { Amount: 12500, Count: 8 }, 
        { Amount: 6250, Count: 16 }, 
        { Amount: 3125, Count: 32 }, 
        { Amount: 1562.5, Count: 64 }, 
        { Amount: 781.25, Count: 128 }, 
        { Amount: 390.625, Count: 256 }, 
        { Amount: 195.3125, Count: 512 },
        { Amount: 97.65625, Count: 1024 },
        { Amount: 48.828125, Count: 2048 },
        { Amount: 24.4140625, Count: 4096 },
        { Amount: 12.20703125, Count: 8192 },
        { Amount: 6.103515625, Count: 16384 },
        { Amount: 3.0517578125, Count: 32768 }
    ],
  },
};

const getRemainingAmount = (totalTickets, perTicketAmount, deductionPercentage) => {
  const totalAmount = totalTickets * perTicketAmount;
  const remainingAmount = totalAmount - (totalAmount * deductionPercentage / 100);
  return remainingAmount;
};

const generateLotteryResults = async (lotteryId, date, perTicketAmount, deductionPercentage) => {
  const tickets = await LotterySchema.find({ LotteryId: lotteryId, createdAt: { $gte: new Date(date.setHours(0, 0, 0, 0)), $lt: new Date(date.setHours(23, 59, 59, 999)) } });
  const totalTickets = tickets.length;
  const remainingAmount = getRemainingAmount(totalTickets, perTicketAmount, deductionPercentage);

  const distribution = prizeDistribution[lotteryId];
  const results = {
    LotteryId: lotteryId,
    DrawDate: new Date(),
    Jackpot: distribution.Jackpot,
    Levels: []
  };

  let currentAmount = remainingAmount;

  for (let i = 0; i < distribution.Levels.length && currentAmount > 0; i++) {
    const level = distribution.Levels[i];
    const winnersCount = Math.min(level.Count, totalTickets);
    const levelResult = {
      Level: i + 1,
      LotteryNumbers: []
    };

    for (let j = 0; j < winnersCount; j++) {
      const winnerIndex = Math.floor(Math.random() * tickets.length);
      const winner = tickets.splice(winnerIndex, 1)[0];
      levelResult.LotteryNumbers.push(winner.TicketId);
    }

    results.Levels.push(levelResult);
    currentAmount -= level.Amount * winnersCount;
  }

  const lotteryResult = new LotteryResult(results);
  await lotteryResult.save();
};

const saveDailyResults = async (req, res) => {
  try {
    const today = new Date();
    await generateLotteryResults(1, today, 25, 17);
    res.status(200).send('Daily results generated and saved.');
  } catch (error) {
    res.status(500).send('Error generating daily results: ' + error.message);
  }
};

const saveWeeklyResults = async (req, res) => {
  try {
    const today = new Date();
    const weekStartDate = new Date(today.setDate(today.getDate() - today.getDay()));
    await generateLotteryResults(2, weekStartDate, 50, 14);
    res.status(200).send('Weekly results generated and saved.');
  } catch (error) {
    res.status(500).send('Error generating weekly results: ' + error.message);
  }
};

const saveMonthlyResults = async (req, res) => {
  try {
    const today = new Date();
    const monthStartDate = new Date(today.getFullYear(), today.getMonth(), 1);
    await generateLotteryResults(3, monthStartDate, 100, 21);
    res.status(200).send('Monthly results generated and saved.');
  } catch (error) {
    res.status(500).send('Error generating monthly results: ' + error.message);
  }
};

module.exports = {
  saveDailyResults,
  saveWeeklyResults,
  saveMonthlyResults
};
