import React, { useEffect, useRef, useState } from 'react';
import HorizontalScroll from '../../../component/Common/HorizontalScroll';
import { twMerge } from 'tailwind-merge';
import { IoMdArrowRoundDown } from 'react-icons/io';
import { FaAngleDown } from 'react-icons/fa6';
import { useEthersSigner } from '../../../blockchain/contractSigner';
import { currentPredctionServices, getBalanceServices, loginServices, } from '../../../services/Services';
import { DialogWithForm } from '../../../component/Common/WalletModal';
import { Button } from '@material-tailwind/react';
import { PlacebidModal } from '../../../component/Common/PlacebidModal';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import predction from '../../../assets/predction.png'


const Predction = () => {

  const signer = useEthersSigner();
  const [userBalance, setUserBalance] = useState({})
  const [currentPredctionList, setCurrentPredctionList] = useState([])
  const [open, setOpen] = React.useState(false);
  const [placebid, setPlacebid] = useState(false);
  const [bidDetails, setBidDetails] = useState({})
  const [bidId, setCurrentBidId] = useState(null)
  const { openConnectModal } = useConnectModal();



  const loginHandler = async () => {


    try {
      let obj = {
        "address": signer._address
      }



      let response = await loginServices(obj)

      console.log(response);
      if (response?.data?.success) {
        localStorage.setItem("token", response?.data?.jwt)
        getUserBalance(response?.data?.jwt)
      }
      else {
        console.log('ero');
      }
    } catch (error) {
      console.log(error);
    }
  }



  const getUserBalance = async (token) => {
    try {
      let response = await getBalanceServices(token)
      if (response?.data?.success) {
        setUserBalance(response?.data)
      }
    } catch (error) {
      console.log(error);
    }
  }


  const currentPredictionList = async () => {
    try {
      let response = await currentPredctionServices();
      setCurrentBidId(response?.data?.currentPrediction?.id)
      mergePredictions(response?.data)
      // Pass the temp array to the function
    } catch (error) {
      console.log(error);
    }
  };

  function mergePredictions(data) {
    const previousPredictions = (data.previousPredictions || []).map(prediction => ({ ...prediction, active: 1 }));
    const currentPrediction = data.currentPrediction ? [{ ...data.currentPrediction, active: 2 }] : [];
    const upcomingPredictions = (data.upcomingPredictions || []).map(prediction => ({ ...prediction, active: 3 }));

    // Combine all predictions into one array
    const allPredictions = [...previousPredictions, ...currentPrediction, ...upcomingPredictions];

    setCurrentPredctionList(allPredictions); // Pass the combined array to the function
  }


  const bidType = {
    1: 'Expired',
    2: 'Live',
    3: 'Uppcomming'
  }


  useEffect(() => {
    if (signer?._address) {
      loginHandler()
    }
  }, [signer?._address])



  useEffect(() => {
    currentPredictionList()
  }, [])


  const scrollViewRef = useRef(null);
  const selectedRef = useRef(null);

  const scrollTo = () => {
    try {
      if (selectedRef.current) {
        setTimeout(() => {
          selectedRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            left: 100
          });
        }, 300); // Delay to ensure any modal or dropdown fully opens before scrolling
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollTo();
  }, [currentPredctionList]);

  return (
    <div className=' w-screen bg-theme flex flex-col justify-center overflow-hidden '>




      <div className='px-4 flex justify-between'>
        <div className='flex items-center  w-full justify-between'>
        <img className='h-[300px] object-contain mt-10' src={predction} />

          <button
            onClick={() => {
              if (signer?._address === undefined) {
                openConnectModal()
              }
              else {
                setOpen(true)
              }
            }}
            className='bg-secondry  w-[200px] text-white    rounded-lg py-2 mt-3'>
            Walltet $ {userBalance?.balance}
          </button>
        </div>

      </div>


      <div ref={scrollViewRef} className='flex overflow-scroll mt-10 '>
        {currentPredctionList?.map((ele, index) => (
          <div
            ref={bidId == ele?.id ? selectedRef : null}

            className={twMerge('rounded-2xl', bidId == ele?.id && 'bg-gradient-to-r from-purple-400 via-lightTheme-500 to-red-600 p-0.5 overflow-hidden rounded-2xl')}
            key={index} style={{ minWidth: '330px', height: '350px', margin: '10px' }}>
            <div className='h-full w-full flex flex-col justify-center relative rounded-2xl bg-secondry'>
              <div className='absolute w-full top-0'>
                <div className='bg-theme/40 p-1 px-2 text16 text-white flex justify-between'>
                  <div className={twMerge('font-normal')}>
                    {bidType[ele?.active]}

                  </div>
                  <p>{ele?.id}</p>
                </div>
              </div>

              {ele?.active == 1 && <div class="w-24 h-24 absolute top-10 left-1/2 transform -translate-x-1/2">
                <div class="absolute inset-0 overflow-hidden">
                  <svg class="h-full w-full text-yellow-400" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" />
                  </svg>
                </div>
                <div class="absolute inset-0 flex flex-col items-center justify-center rounded">

                  <p className='font-bold text-2xl'>
                    {ele?.Winner}
                  </p>

                  <p>
                    Winner
                  </p>
                </div>
              </div>}

              {/* 
                {index == 2 && <div class="w-24 h-24 absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div class="absolute inset-0 overflow-hidden">
                    <svg class="h-full w-full text-yellow-400" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" />
                    </svg>
                  </div>
                  <div class="absolute inset-0 flex items-center justify-center rounded flex-col">

                    <p className='font-bold text-2xl'>
                      Down
                    </p>

                    <p>
                      1.56x
                    </p>
                  </div>
                </div>} */}



              {/* Current Pice */}
              {ele?.active == 1 && <div className={twMerge('border-2 border-theme w-[85%] mx-auto rounded-2xl p-3 mt-5')}>
                <p className='text-lightTheme'>Total Price</p>


                <div className='flex justify-between items-center'>
                  <p className='font-semibold text-theme text-xl '>
                    ${ele?.TotalAmount}
                  </p>

                  <div className='bg-theme text-white text px-2 p-1 rounded-md flex items-center'>
                    <IoMdArrowRoundDown />
                    $5000
                  </div>

                </div>



                <div className='flex justify-between items-center mt-2'>
                  <p className='font-semibold text-theme text-sm '>
                    Total Participent:
                  </p>

                  <div className=' text-white text px-2 p-1 rounded-md flex items-center'>
                    {ele?.TotalParticpatedUser}
                  </div>

                </div>



                <div className='flex justify-between items-center '>
                  <p className='font-semibold text-theme text-sm '>
                    Price Pool:
                  </p>

                  <div className=' text-white text px-2 p-1 rounded-md flex items-center'>
                    $5000 BNB
                  </div>

                </div>
              </div>}

              {/* Next */}


              {ele?.active == 2 && <div className={twMerge('border-2 border-theme w-[85%] mx-auto rounded-2xl p-3 mt-5 z-30 bg-secondry')}>





                <div className='flex justify-between items-center'>
                  <p className='font-semibold text-theme text-base '>
                    Price Pool:
                  </p>

                  <div className=' text-white text px-2 p-1 rounded-md flex items-center'>
                    $5000
                  </div>

                </div>

                <div className='flex flex-col'>
                  <button
                    onClick={() => {
                      if (signer?._address === undefined) {
                        openConnectModal()
                      }
                      else {
                        setPlacebid(true)
                        setBidDetails({ ...ele, predictionType: 'UP' })
                      }

                    }}
                    className='bg-theme text-white w-full rounded-lg py-1.5 mt-2'>
                    Enter Up
                  </button>




                  <button
                    onClick={() => {
                      if (signer?._address === undefined) {
                        openConnectModal()
                      }
                      else {
                        setPlacebid(true)
                        setBidDetails({ ...ele, predictionType: 'DOWN' })
                      }

                    }}
                    className='bg-[#A8CD9F] text-white w-full rounded-lg py-1.5 mt-3'>
                    Enter Hold
                  </button>


                  <button
                    onClick={() => {
                      if (signer?._address === undefined) {
                        openConnectModal()
                      }
                      else {
                        setPlacebid(true)
                        setBidDetails({ ...ele, predictionType: 'DOWN' })
                      }

                    }}
                    className='bg-[#A8CD9F] text-white w-full rounded-lg py-1.5 mt-3'>
                    Enter Down
                  </button>

                </div>

              </div>}

            </div>
          </div>
        ))}
      </div>


      <div className='flex  justify-center bg-red-400 items-center  mt-8 overflow-scroll' ref={scrollViewRef} >

      </div>
      <DialogWithForm open={open} setOpen={setOpen} />
      <PlacebidModal bidDetails={bidDetails} open={placebid} setPlacebid={setPlacebid} />
    </div>
  );
};

export default Predction;
