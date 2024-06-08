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
import {
    rechargeWalletServices,
    widthrawWalletServices,
} from "../../services/Services";
import { errorToast, sucessToast } from "../../utils/Helper";
import { useEthersSigner } from "../../blockchain/contractSigner";
import {
    approveERC20,
    checkErcApprovals,
    getTokenBalance,
    StakeZepx,
} from "../../blockchain/contractUtlis";
import toast, { Toaster } from "react-hot-toast";
import { ZEPX_IN_ONE_DOLLOR, ZepStake_Address, Zepx_Address } from "../../blockchain/config";
import { ToastContainer } from "react-toastify";

export function StackModal({ open, setOpen, selectedCard }) {
    const handleOpen = () => setOpen((cur) => !cur);
    let PoolId = selectedCard?.poolId
    console.log(PoolId);
    const [selectedOption, setSelectedOption] = useState("Stake");
    const [amount, setAmount] = useState(selectedCard?.investment * ZEPX_IN_ONE_DOLLOR);
    const [loading, setloading] = useState(false);
    const [refferer, setrefferer] = useState(
        "0x0000000000000000000000000000000000000000"
    );
    const signer = useEthersSigner();

    const stakeFunction = async () => {
        if (signer?._address === undefined) {
            toast.error("wallet not connected");
            return;
        }

        try {
            setloading(true);

            toast.success("staking please wait");
            const bal = await getTokenBalance(Zepx_Address, signer?._address);
            console.log("bal: ", bal);

            if (bal >= amount) {
                const approval = await checkErcApprovals(
                    signer?._address,
                    Zepx_Address,
                    ZepStake_Address
                );
                console.log("approval: ", approval);

                if (!(approval >= amount * 10 ** 18)) {
                    await approveERC20(Zepx_Address, amount, signer, ZepStake_Address);

                    await StakeZepx(PoolId, amount, refferer, signer);
                    setloading(false);

                    return;
                } else {
                    await StakeZepx(PoolId, amount, refferer, signer);
                }
                setloading(false);
                return;
            } else toast.error("insufficent balance");
        } catch (error) {
            setloading(false);
            console.log("error in staking", error);
        }
    };


    console.log(selectedCard);

    const withdrawFunction = async () => {
        if (signer._address === undefined) {
            toast.error("wallet not connected");
            return;
        }
        try {
            await WithdrawFromStake(PoolId, amount, signer);
        } catch (error) {
            toast.error(error?.error?.data?.message);
        }
    };



    const continueHandler = async () => {
        if (selectedOption == "Stake") {
            stakeFunction();
        } else {
            withdrawFunction();
        }
    };
    return (
        <>
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <ToastContainer />
                <Toaster position="right-top" />

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

                        {/* <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-blue-600"
                  name="transactionType"
                  value="Stake"
                  checked={selectedOption === "Stake"}
                  onChange={() => setSelectedOption("Stake")}
                />
                <span className="ml-2">Stake</span>
              </label>

              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-blue-600"
                  name="transactionType"
                  value="Withdraw"
                  checked={selectedOption === "Withdraw"}
                  onChange={() => setSelectedOption("Withdraw")}
                />
                <span className="ml-2">Withdraw</span>
              </label>
            </div> */}

                        <div className="flex justify-between">

                            <div>
                                <Typography className="-mb-2" variant="h6">
                                    USDT
                                </Typography>
                                <Input
                                    disabled
                                    value={`$ ${selectedCard?.investment}`}
                                    contentEditable={false}
                                    onChange={(val) => {
                                        setAmount(val.target.value);
                                    }}
                                    type="text"
                                    className="w-[100px]"
                                    containerProps={{
                                        className: "outline-none mt-2 min-w-[100px]",

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
                                    disabled
                                    value={`${selectedCard?.investment * ZEPX_IN_ONE_DOLLOR}`}
                                    contentEditable={false}
                                    onChange={(val) => {
                                        setAmount(val.target.value);
                                    }}
                                    type="text"
                                    containerProps={{
                                        className: "outline-none mt-2 min-w-[100px]",
                                    }}
                                    className="w-[100px]"
                                    label="Enter Amount"
                                    size="lg"
                                />
                            </div>
                        </div>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button
                            onClick={continueHandler}
                            variant="gradient"
                            color="blue"
                            fullWidth
                        >
                            Continue
                        </Button>

                        <Button
                            variant="gradient"
                            className="mt-3 bg-theme"
                            onClick={handleOpen}
                            fullWidth
                        >
                            Cancel
                        </Button>
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    );
}
