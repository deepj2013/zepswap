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
import { errorToast, sucessToast } from "../../utils/Helper";
import { useEthersSigner } from "../../blockchain/contractSigner";
import toast from "react-hot-toast";
import { StakeZepx, checkErcApprovals, getTokenBalance } from "../../blockchain/contractUtlis";
import { Zepx_Address } from "../../blockchain/config";

export function StackingModal({ open, setOpen }) {

    const [poolId, setpoolId] = useState(0)
    const handleOpen = () => setOpen((cur) => !cur);
    const [selectedOption, setSelectedOption] = useState("Stake");
    const [amount, setAmount] = useState(0);
    const [loading, setloading] = useState(false);
    const [refferer, setrefferer] = useState("0x2BE885C25F24D8D9a7e2bfAC89FC173c39989050");
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
                setOpen(false)
                return;
            } else toast.error("insufficent balance");
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


                        <div className="w-full">
                            <Select onChange={(val) => setpoolId(val)} label="Select Period">
                                <Option value="0">6 Months</Option>
                                <Option value="1">12 Months</Option>
                                <Option value="2">16 Months</Option>
                                <Option value="3">30 Months</Option>
                                <Option value="4">60 Months</Option>

                            </Select>
                        </div>

                        <Typography className="-mb-2" variant="h6">
                            Amount
                        </Typography>
                        <Input onChange={(val) => {
                            setAmount(val.target.value)
                        }} type="number" containerProps={{
                            className: 'outline-none',
                        }} label="Enter Amount" size="lg" />


<Typography className="-mb-2" variant="h6">
                            Referred by <span className="text-xs">(optional)</span>
                        </Typography>
                        <Input onChange={(val) => {
                            setrefferer(val.target.value)
                        }} type="text" containerProps={{
                            className: 'outline-none',
                        }} label="Enter Wallet Address" size="lg" />

                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button onClick={continueHandler} variant="gradient" color="blue" fullWidth>
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