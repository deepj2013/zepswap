import React, { useEffect, useState } from 'react'
import ticket from '../../../assets/ticket.png'
import { getLotteryListServices, loginServices, myLotteryHistory, participateLotteryServices } from '../../../services/Services'
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useEthersSigner } from '../../../blockchain/contractSigner';
import MemeCoinTable from '../../../component/Home/MemeCoinTable';
import moment from 'moment';
import Countdown from 'react-countdown'
import { FaHandPointDown } from "react-icons/fa";
import jackpot from '../../../assets/jackpot.png'
import FlipCountdown from '@rumess/react-flip-countdown';
import toast from 'react-hot-toast';
import { PurchaseTicketModal } from '../../../component/Common/PurchaseTicketModal';
import { ZEPX_IN_ONE_DOLLOR } from '../../../blockchain/config';
import { errorToast } from '../../../utils/Helper';

function GameLottery() {

  const [lotteries, setLotteries] = useState([])
  const signer = useEthersSigner();
  const { openConnectModal } = useConnectModal();
  const [myTicket, setMyTicket] = useState([])
  const [purchaseTicketModal, setPurchaseTicketModal] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [ticketCount, setTicketCount] = useState(1)
  const [loading, setLoading] = useState(false)
  const type = {
    1: '1K',
    2: '10K',
    3: '100K'
  }

  const ticketType = {
    1: 'Daily',
    2: 'Weekly',
    3: 'Monthly',
  }
  const getLoteryDetails = async () => {
    try {
      let response = await getLotteryListServices()
      // console.log(response?.data?.lotteries);
      setLotteries(response?.data?.lotteries)

    } catch (error) {
      console.log(error);
    }
  }


  const participateLottery = async () => {
    let obj = {
      "lotteryId": selectedCard?.LotteryId,
      "ticketNumbers": [],
      "TicketAmount": ticketCount
    }
    try {
      setLoading(true)
      let response = await participateLotteryServices(obj)
      setPurchaseTicketModal(false)
      setLoading(false)
      toast.success('Congratulations! Your lottery ticket purchase was successful. Good luck!')
    } catch (error) {
      setLoading(false)
      setPurchaseTicketModal(false)
      alert(error.response.data.msg)
      // console.log(error.response.data.msg);
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

  // const targetDate = new Date('June 8, 2024 9:15:00').getTime();


  // Initial target date
  const initialTargetDate = Date.now();

  // Function to calculate the next day's target time of 9:15 AM
  function getNextDayTarget(date) {
    // Create a new date object for the next day at 9:15 AM
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate());
    nextDay.setHours(23, 59, 0, 0); // Set time to 9:15:00 AM

    return nextDay;
  }

  // Usage
  const nextDayTargetDate = getNextDayTarget(initialTargetDate);

  var lastDayOfMonth = moment().endOf('month').format('YYYY-MM-DD HH:mm:ss');
  // var todayNoon = moment().hour(12).minute(0).second(0).format('YYYY-MM-DD HH:mm:ss');
  // var nextDayNoon = moment().add(1, 'day').hour(12).minute(0).second(0).format('YYYY-MM-DD HH:mm:ss');
  var nextDayTwelveOhOneAM = moment().add(1, 'day').startOf('day').hour(0).minute(1).second(0).format('YYYY-MM-DD HH:mm:ss');


  // Assuming moment.js is already included in your project
  var currentWeekSunday = moment().day(7).hour(23).minute(59).second(59).format('YYYY-MM-DD HH:mm:ss');


  const timmer = {
    1: nextDayTwelveOhOneAM,
    2: currentWeekSunday,
    3: lastDayOfMonth
  }



  // endAt={'2022-12-12 01:26:58'}

  const getEndTime = (item) => {
    const targetDate = new Date(item).getTime();

    return targetDate
  }


  const getMyLotteryList = async (id) => {

    if (signer?._address === undefined) {
      // openConnectModal()
      return
    }

    let obj = {
      WalletAdress: signer?._address
    }
    try {
      let response = await myLotteryHistory(obj)
      let temp = response?.data?.tickets
      setMyTicket(temp)
    } catch (error) {
      setMyTicket([])
      console.log(error.response.data.status);
      if (error?.response?.data?.status === 401) {
        // localStorage.clear()
      }
    }
  }



  const getHistory = () => {
    // let temp = lotteries.map((ele) => getMyLotteryList(ele?.LotteryId))
    getMyLotteryList()
  }


  useEffect(() => {

    getHistory()

    return () => {
      setMyTicket([])
    }
  }, [lotteries])


  console.log(lotteries);


  // Assuming moment.js is already included in your project


  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      <p>aadad</p>
    } else {
      // Render a countdown
      return (
        <div className='bg-white relative justify-between p-2 rounded-lg  flex flex-wrap'>

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


  const lotteryStatus = (timeString) => {
    // Parse the given time string into a Date object
    const targetTime = new Date(timeString).getTime();
    
    // Compare the parsed time with the current time
    return targetTime > Date.now();
  };

  return (
    <div className=' w-screen bg-theme/40'>


      <div className='mx-auto   flex flex-col items-center object-contain w-full relative justify-center gap-2 bg-theme/40 '>

        <img className='mt-' src={jackpot} />


        {/* <div className='h-24 w-[250px] absolute  animate-wiggle animate-infinite '>
          <img className='animate-bounce w-full h-auto  ' src={ticket} />
          <div className='h-full w-full flex justify-center items-center absolute  top-0 '>
            <button className='bg-theme p-3 px-10 ml-5 rounded-xl text-white mt-5'>
              Buy Ticket
            </button>
          </div>
        </div> */}
      </div>


      <div className='w-screen flex flex-col items-center justify-center py-10 '>

        <p class='text6 text60 font-urbanist font-semibold'>Get your tickets now!</p>


        <div className='animate-ping animate-infinite'>
          <p className='text40 font-semibold '>


          </p>
        </div>


        {/* <p className='text32 font-medium mt-4 text-yellow-700'>
          7
          h
          15
          m
          <span className='text-black ml-2 text18'>until the draw</span>
        </p> */}


        <div className='flex mt-10 flex-wrap items-center justify-center py-10 w-full bg-[#edc531] '>

          <>

          </>
          {
            lotteries?.map((ele, ind) => {
              return (

                <div className=' w-[90vw] relative mx-auto md:w-[27rem]'>


                  <div class="ticketContainer">

                    <div class="ticket">

                      <FlipCountdown

                        hideYear
                        hideMonth
                        // hideDay
                        theme='dark' // Options (Default: dark): dark, light.

                        size='small' // Options (Default: medium): large, medium, small, extra-small.
                        endAt={timmer[ele?.LotteryId]} // Date/Time
                      />
                      {/* <Countdown
                        date={nextDayTargetDate}
                        renderer={renderer}
                      /> */}
                      <div class="ticketRip">
                        <div class="circleLeft"></div>
                        <div class="ripLine"></div>
                        <div class="circleRight"></div>
                      </div>


                      <div class="ticketTitle text-center ">{ticketType[ele?.LotteryId]}</div>
                      {/* <hr> */}

                      <div class="ticketRip">
                        <div class="circleLeft"></div>
                        <div class="ripLine"></div>
                        <div class="circleRight"></div>
                      </div>
                      <div class="ticketDetail  relative">
                        <div>ZEPEX:&ensp;{ele?.TicketPrice} zep</div>
                        <div>USDT:&ensp; ${ele?.TicketPrice/ZEPX_IN_ONE_DOLLOR}</div>

                        {/* <div>Lottery type:&nbsp; {ele?.LotteryId}</div> */}

                        <p class="neon2 text60 mt-3">
                          <span id="n">J</span>
                          <span id="e">a</span>
                          <span id="o">c</span>
                          <span id="n2">k</span>
                          <span id="n3">p</span>
                          <span id="n4">o</span>
                          <span id="n5">t</span>


                        </p>
                        <div className='text-center   text40'><span className='bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 text-transparent bg-clip-text text60'>{type[ele?.LotteryId]} </span>  </div>


                        <button
                          onClick={() => {
                            if (signer?._address === undefined) {
                              loginHandler()
                              return
                            }
                            else {

                              setPurchaseTicketModal(true)
                              setSelectedCard(ele)
                              // participateLottery(ele)
                            }
                          }}
                          className='absolute top-0 right-10 bg-theme p-2 px-6 rounded'>
                          Buy
                        </button>
                      </div>
                      <div class="ticketRip">
                        <div class="circleLeft"></div>
                        <div class="ripLine"></div>
                        <div class="circleRight"></div>
                      </div>
                      <div class="ticketSubDetail">
                        <div class="code">Next Drawn Date</div>
                        <div class="date">{timmer[ele?.LotteryId]}</div>
                      </div>
                    </div>
                    <div class="ticketShadow"></div>
                  </div>


                  {/* <div className=' overflow-hidden  relative text-white rounded-xl  bg-secondry p-4 mt-8  '>


                    <div className='flex w-full left-0 px-4 bg-theme py-2 justify-between font-medium  absolute top-0'>
                      <p>Next Draw </p>

                      <p>#{ele?.LotteryId} | Draw: {moment(ele?.closingTime).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    </div>


                    <p className='bg-gradient-to-tr text40 from-purple-500 via-orange-500 to-yellow-500 text-transparent bg-clip-text'>Jackpot</p>


                    <div className='flex  gap-8 font-medium mt-10 items-center'>
                      <p>Price</p>

                      <p className='text40'>${ele?.TicketPrice}</p>
                    </div>


                    <div className='flex  gap-8 font-medium mt-10'>

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

                  </div> */}
                </div>
              )
            })
          }
        </div>


        <div className='items-center container mx-auto '>
          <p className='text40 font-semibold my-10 '>
            My Ticket

          </p>



          <div className='flex  flex-wrap gap-10'>
            {
              myTicket?.map((ele) => {
                return (
                  <div class="coupon">
                    <div class="left">
                      <div>Win Your Dreams</div>
                    </div>
                    <div class="center">
                      <div>
                        <h2>Status</h2>
                      {!lotteryStatus(timmer[ele?.LotteryId]) ?  <p className='text-red-600 font-urbanist font-semibold'>Beller Luck <br/> next time</p> : <p className='text-gray-600 mt-2 font-urbanist font-semibold'>Wait for<br/>  next draw</p>}
                        <small>Created at {timmer[ele?.LotteryId]}</small>
                      </div>
                    </div>

                    <div class="right">
                      <div>{ele?.TicketId}</div>
                    </div>

                  </div>
                )
              })
            }
          </div>

        </div>




        {false &&
          <div className='w-full mt-20'>
            <MemeCoinTable />
          </div>
        }

        <PurchaseTicketModal loading={loading} participateLottery={participateLottery} ticketCount={ticketCount} setSelectedCard={setSelectedCard} selectedCard={selectedCard} setTicketCount={setTicketCount} open={purchaseTicketModal} setOpen={setPurchaseTicketModal} />

      </div>

    </div>
  )
}

export default GameLottery