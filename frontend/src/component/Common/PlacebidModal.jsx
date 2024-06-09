import React, { useState } from "react";
import {
    Button,
    Dialog,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
} from "@material-tailwind/react";
import { placeBidServices, rechargeWalletServices, widthrawWalletServices } from "../../services/Services";
import { errorToast, sucessToast } from "../../utils/Helper";
import { ZEPX_IN_ONE_DOLLOR } from "../../blockchain/config";

export function PlacebidModal({ open, setPlacebid ,bidDetails}) {
    const handleOpen = () => setPlacebid((cur) => !cur);
    const [selectedOption, setSelectedOption] = useState('withdraw');
    const [amount, setAmount] = useState(ZEPX_IN_ONE_DOLLOR);
    const [dollor,setDollor]=useState(1)



    


    const placeBidHandler = async () => {
        let payLoad = {
            "predictionId":bidDetails?.id,
            "amount":amount,
            "predictionType":bidDetails?.predictionType
        }
        try {
            let response = await placeBidServices(payLoad)
            errorToast('Witdthraw Successfully')

            handleOpen()
        } catch (error) {
            console.log(error);
        }
    }


    const calculateZepex=(val)=>{
        setAmount(val)
        setDollor(val/ZEPX_IN_ONE_DOLLOR)
        // let res= calculateROI(PoolId,investment[PoolId],20,amount)
        // setIncome(res)
    }


    const calculateDollor=(val)=>{
        setDollor(val)
        setAmount(val*ZEPX_IN_ONE_DOLLOR)
    }
    return (
        <>
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue-gray">
                            Zepex
                        </Typography>
                        <Typography

                            className="mb-3 font-normal"
                            variant="paragraph"
                            color="gray"
                        >
                            {/* Enter your email and password to Sign In. */}
                        </Typography>



                        <div className="flex flex-row-reverse justify-between">

<div>
    <Typography className="-mb-2" variant="h6">
        USDT
    </Typography>
    <Input
        value={dollor}
        onChange={(val) => {
            calculateDollor(val.target.value)
            // setAmount(val.target.value);
            
        }}
        type="text"
        className="!w-[120px]"
        containerProps={{
            className: "outline-none mt-5 !min-w-[120px]",

        }}
        label="Enter Amount"
        size="lg"
    />
</div>

<div>

    <Typography className="-mb-2" variant="h6">
        ZEPX
    </Typography>
    <Input
        value={amount}
        onChange={(val) => {
            calculateZepex(val.target.value)
        }}
        type="text"
        containerProps={{
            className: "outline-none mt-5 !min-w-[120px]",
        }}
        className="!w-[120px]"
        label="Enter Amount"
        size="lg"
    />
</div>
</div>
       

                      

                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button onClick={placeBidHandler} variant="gradient" color="blue" fullWidth>
                            Are you sure you want to place bid
                        </Button>

                        <Button variant="gradient" className="mt-3 bg-theme" onClick={handleOpen} fullWidth>
                            Cancel
                        </Button>

                    </CardFooter>
                </Card>
            </Dialog>
        </>
    );
}