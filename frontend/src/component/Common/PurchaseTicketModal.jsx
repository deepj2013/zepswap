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
    Select,
    Option,
} from "@material-tailwind/react";
import { rechargeWalletServices, widthrawWalletServices } from "../../services/Services";
import { calculateROI, errorToast, sucessToast } from "../../utils/Helper";
import { useEthersSigner } from "../../blockchain/contractSigner";
import toast from "react-hot-toast";
import { StakeZepx, approveERC20, checkErcApprovals, getTokenBalance } from "../../blockchain/contractUtlis";
import { ZEPX_IN_ONE_DOLLOR, ZepStake_Address, Zepx_Address } from "../../blockchain/config";
import { ToastContainer } from "react-toastify";
import { LuPlus } from "react-icons/lu";
import { FaMinus, FaPlus } from "react-icons/fa6";

export function PurchaseTicketModal({ open, setOpen }) {

    const [PoolId, setpoolId] = useState(0)
    const handleOpen = () => setOpen((cur) => !cur);
    const [selectedOption, setSelectedOption] = useState("Stake");
    const [amount, setAmount] = useState(ZEPX_IN_ONE_DOLLOR);
    const [loading, setloading] = useState(false);
    const [dollor, setDollor] = useState(86)
    const [refferer, setrefferer] = useState("0x2BE885C25F24D8D9a7e2bfAC89FC173c39989050");
    const signer = useEthersSigner();
    const [income, setIncome] = useState(0)
    const stakeFunction = async () => {
        if (signer?._address === undefined) {
            toast.error("wallet not connected");
            return;
        }

        try {
            setloading(true);

            sucessToast("staking please wait");
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
                setOpen(false)
                return;
            } else errorToast("insufficent balance");
        } catch (error) {
            setloading(false);
            console.log("error in staking", error);
        }
    };

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
        stakeFunction();

    };

    const calculateZepex = (val) => {
        setAmount(val)
        setDollor(val / ZEPX_IN_ONE_DOLLOR)
        let res = calculateROI(PoolId, investment[PoolId], 20, amount)
        setIncome(res)
    }


    const calculateDollor = (val) => {
        setDollor(val)
        setAmount(val * ZEPX_IN_ONE_DOLLOR)
    }



    // Handler functions
    const incrementIncome = () => {
        setIncome(income + 1);
    };

    const decrementIncome = () => {
        setIncome(income - 1);
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




                        <div className="flex">

                            <button
                                className="mx-2 w-[70px] px-4 py-2 border border-green-600 text-green-600 justify-center items-center flex rounded-md"
                                onClick={decrementIncome}
                            >
                                <FaMinus />
                            </button>
                            <div className="border w-[70px] flex justify-center px-6 border-green-700 rounded-md font-bold font-urbanist p-2 text-green-600">
                                <span>{income}</span>
                            </div>
                            <button
                                className="mx-2 px-4 w-[70px] py-2 border border-green-600 text-green-600 justify-center flex items-center rounded-md"
                                onClick={incrementIncome}
                            >
                                <FaPlus />

                            </button>
                        </div>

                        <Typography className="-mb-2" variant="h6">
                            Referred by <span className="text-xs">(optional)</span>
                        </Typography>

                        <div>
                            <p className="font-urbanist text-3xl text-green-600">Total Amount : <span>{10}</span></p>
                        </div>

                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button onClick={continueHandler} variant="gradient" color="green" fullWidth>
                            Continue
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