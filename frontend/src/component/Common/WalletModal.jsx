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
import {
  approveERC20,
  checkErcApprovals,
  getTokenBalance,
  paymentFunction,
} from "../../blockchain/contractUtlis";
import {
  Payment_Protocol_Contract,
  Zepx_Address,
} from "../../blockchain/config";
import { useEthersSigner } from "../../blockchain/contractSigner";
import { paymentZepx } from "../../utils/Contant";
import toast from "react-hot-toast";

export function DialogWithForm({ open, setOpen, userBalance }) {
  const handleOpen = () => setOpen((cur) => !cur);
  const [selectedOption, setSelectedOption] = useState("withdraw");
  const [amount, setAmount] = useState(0);
  const signer = useEthersSigner();

  const widthrawHandler = async () => {
    let payLoad = {
      amount: amount,
    };
    try {
      let response = await widthrawWalletServices(payLoad);
      errorToast("Witdthraw Successfully");

      handleOpen();
    } catch (error) {
      console.log(error);
    }
  };

  const depositeHandler = async () => {
    if (signer?._address === undefined) {
      toast.error("wallet not connected");
      return;
    }

    try {
      let payLoad = {
        amount: amount,
      };

      const bal = await getTokenBalance(Zepx_Address, signer?._address);
      console.log("bal: ", bal, amount);

      if (amount <= bal) {
        const approval = await checkErcApprovals(
          signer?._address,
          Zepx_Address,
          Payment_Protocol_Contract
        );
        console.log("approval: ", approval);

        if (!(approval >= amount * 10 ** 18)) {
          await approveERC20(
            Zepx_Address,
            amount,
            signer,
            Payment_Protocol_Contract
          );

          await paymentFunction(signer?._address, amount, signer);

          let response = await rechargeWalletServices(payLoad);
          sucessToast("Deposite Successfully");
          handleOpen();

          return;
        } else {
          await paymentFunction( amount, signer);
          let response = await rechargeWalletServices(payLoad);
          sucessToast("Deposite Successfully");
          handleOpen();
        }

        return;
      } else {
        toast.error("insufficent balance");
        handleOpen();
      }
    } catch (error) {
      console.log("error in Depositing", error);
    }
  };

  const continueHandler = async () => {
    if (selectedOption == "withdraw") {
      widthrawHandler();
    } else {
      depositeHandler();
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
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Zepex
            </Typography>
            <Typography
              variant="h4"
              className="mb-3 font-urbanist font-semibold "
              color="gray"
            >
              Game Coins :{" "}
              <span className="font-bold text-black">
                {userBalance?.balance} zep
              </span>
              {/* Enter your email and password to Sign In. */}
            </Typography>

            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-blue-600"
                  name="transactionType"
                  value="withdraw"
                  checked={selectedOption === "withdraw"}
                  onChange={() => setSelectedOption("withdraw")}
                />
                <span className="ml-2">Withdraw</span>
              </label>

              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-blue-600"
                  name="transactionType"
                  value="deposit"
                  checked={selectedOption === "deposit"}
                  onChange={() => setSelectedOption("deposit")}
                />
                <span className="ml-2">Deposit</span>
              </label>
            </div>

            <Typography className="-mb-2" variant="h6">
              Amount
            </Typography>
            <Input
              onChange={(val) => {
                console.log("value",val.target.value)
                setAmount(val.target.value);
              }}
              type="number"
              containerProps={{
                className: "outline-none",
              }}
              label="Enter Amount"
              size="lg"
            />
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
