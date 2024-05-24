const { joinPredictionInternal, getPredictionDataInternal } = require("../services/prediction.services");
const { catchAsync, responseObject, httpStatus } = require("../utils/helper");

const JoinPrediction = catchAsync(async (req, res) => {
    const { predictionId , amount , predictionType } = req.body;
    
    joinPredictionInternal()
});

const getPredictionData = catchAsync(async(req,res)=>{
    const data = getPredictionDataInternal()
    const response = responseObject(true, false, {
        ...data,
        msg: "prediction data",
      });
      return res.status(httpStatus.OK).json(response);
})

module.exports = {
    JoinPrediction,
    getPredictionData
};
