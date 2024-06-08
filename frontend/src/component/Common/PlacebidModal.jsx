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

export function PlacebidModal({ open, setPlacebid ,bidDetails}) {
    const handleOpen = () => setPlacebid((cur) => !cur);
    const [selectedOption, setSelectedOption] = useState('withdraw');
    const [amount, setAmount] = useState(0);


    console.log(bidDetails);

    const placeBidHandler = async () => {
        let payLoad = {
            "predictionId":bidDetails?.id,
            "amount":bidDetails?.TotalAmount,
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