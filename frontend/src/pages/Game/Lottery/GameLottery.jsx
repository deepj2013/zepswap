import React, { useEffect, useState } from 'react'
import ticket from '../../../assets/ticket.png'
import { getLotteryListServices, participateLotteryServices } from '../../../services/Services'
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useEthersSigner } from '../../../blockchain/contractSigner';
import MemeCoinTable from '../../../component/Home/MemeCoinTable';
import moment from 'moment';
import Countdown from 'react-countdown'
import { FaHandPointDown } from "react-icons/fa";

function GameLottery() {

  const [lotteries, setLotteries] = useState([])
  const signer = useEthersSigner();
  const { openConnectModal } = useConnectModal();

  const getLoteryDetails = async () => {
    try {
      let response = await getLotteryListServices()
      // console.log(response?.data?.lotteries);
      setLotteries(response?.data?.lotteries)
    } catch (error) {
      console.log(error);
    }
  }

  const participateLottery = async (ele) => {
    console.log(ele);
    let obj = {
      "lotteryId": ele?.LotteryId,
      "ticketNumbers": [],
      "TicketAmount": ele?.TicketPrice
    }
    try {
      let response = await participateLotteryServices(obj)
    } catch (error) {
      console.log(error);
    }
  }


  const loginHandler = async () => {
    try {

      if (signer?._address === undefined) {
        openConnectModal()
        return
      }

      let obj = {
        "address": signer._address
      }
      let response = await loginServices(obj)
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

  useEffect(() => {
    getLoteryDetails()
  }, [])

  const targetDate = new Date('June 31, 2024 23:59:00').getTime();


  const getEndTime = (item) => {
    const targetDate = new Date(item).getTime();

    return targetDate
  }

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    console.log(hours, minutes, seconds, completed);
    if (completed) {
      <p>aadad</p>
    } else {
      // Render a countdown
      return (
        <div className='bg-secondry relative justify-between p-2 rounded-lg mt-10 flex flex-wrap'>

          <div className='bg-theme w-[50px] lg:w-[80px] flex justify-center items-center 2xll:w-[90px] 3xxl:w-[100px] rounded-md py-2'>
            <p className=' text-white font-semibold'>{days}<span className=' text-xs lg:text-base'> days</span>
            </p>
          </div>


          <div className='bg-theme w-[50px] lg:w-[80px] flex justify-center items-center 2xll:w-[90px] 3xxl:w-[100px] rounded-md py-2'>
            <p className=' text-white font-semibold'>{hours}<span className=' text-xs lg:text-base'> hr</span>
            </p>
          </div>

          <div className='bg-theme w-[50px] lg:w-[80px] flex justify-center items-center 2xll:w-[90px] 3xxl:w-[100px] rounded-md py-2'>
            <p className=' text-white font-semibold'>{minutes}<span className=' text-xs lg:text-base'> min</span>
            </p>
          </div>

          <div className='bg-theme w-[50px] lg:w-[80px] flex justify-center items-center 2xll:w-[90px] 3xxl:w-[100px] rounded-md py-2'>
            <p className=' text-white font-semibold'>{seconds}<span className=' text-xs lg:text-base'> sec</span>
            </p>
          </div>

          <div className='absolute -bottom-6 w-full flex justify-center items-center'>
          <FaHandPointDown className='text-2xl text-secondry animate-jump animate-infinite animate-duration-1000 animate-delay-100' />

          </div>
        </div>
      )
    }
  };

  return (
    <div className=' w-screen'>


      <div className='mx-auto  flex flex-col items-center justify-center py-20 gap-2 bg-theme/40 '>
        <p className='text40 font-semibold '>The ZepSwap Lottery</p>

        <div className='text40 font-semibold text-white '>
          $50333
        </div>
        <p className='text20  font-bold'>In Price</p>

        <div className='h-24 w-[250px] relative animate-wiggle animate-infinite '>
          <img className='animate-bounce w-full h-auto  ' src={ticket} />
          <div className='h-full w-full flex justify-center items-center absolute  top-0 '>
            <button className='bg-theme p-3 px-10 ml-5 rounded-xl text-white mt-5'>
              Buy Ticket
            </button>
          </div>
        </div>
      </div>


      <div className='w-screen flex flex-col items-center justify-center py-10 '>
        <p className='text40 font-semibold '>
          Get your tickets now!

        </p>



        {/* <p className='text32 font-medium mt-4 text-yellow-700'>
          7
          h
          15
          m
          <span className='text-black ml-2 text18'>until the draw</span>
        </p> */}


        <div className='flex mt-10 flex-wrap items-center justify-center py-10 w-full bg-theme/40 '>
          {
            lotteries?.map((ele, ind) => {
              return (

                <div className=' w-[90vw] relative mx-auto md:w-[27rem]'>
                  <Countdown
                    date={getEndTime(ele?.closingTime)}
                    renderer={renderer}
                  />
                  <div className=' overflow-hidden  relative text-white rounded-xl  bg-secondry p-4 mt-8  '>


                    <div className='flex w-full left-0 px-4 bg-theme py-2 justify-between font-medium  absolute top-0'>
                      <p>Next Draw </p>

                      <p>#{ele?.LotteryId} | Draw: {moment(ele?.closingTime).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    </div>

                    <div className='flex  gap-8 font-medium mt-10'>
                      <p>Next Draw </p>

                      <p className='text40'>~${ele?.TicketPrice}</p>
                    </div>


                    <div className='flex  gap-8 font-medium mt-10'>
                      <p>Next Draw </p>

                      <button

                        onClick={() => {
                          if (signer?._address === undefined) {
                            loginHandler()
                            return
                          }
                          else {
                            participateLottery(ele)
                          }
                        }}
                        className='bg-theme p-3 px-10  rounded-xl text-white animate-jump animate-infinite animate-duration-1000 animate-delay-1000 '>
                        Buy Ticket
                      </button>
                    </div>


                    <div className='flex justify-center items-center  gap-8 font-medium mt-10 border-t pt-4 border-theme'>

                      <p>Details</p>
                    </div>

                  </div>
                </div>
              )
            })
          }
        </div>



        {
          <div className='w-full mt-20'>
            <MemeCoinTable />
          </div>
        }

      </div>

    </div>
  )
}

export default GameLottery