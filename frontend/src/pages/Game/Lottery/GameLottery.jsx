import React from 'react'
import ticket from '../../../assets/ticket.png'
function GameLottery() {

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



        <p className='text32 font-medium mt-4 text-yellow-700'>
          7
          h
          15
          m
          <span className='text-black ml-2 text18'>until the draw</span>
        </p>


        <div className=' w-[90vw] relative mx-auto md:w-[550px] overflow-hidden text-white rounded-xl  bg-secondry p-4 mt-6  '>
          <div className='flex w-full left-0 px-4 bg-theme py-2 justify-between font-medium  absolute top-0'>
            <p>Next Draw </p>

            <p>#1244 | Draw: Apr 25, 2024, 5:30 AM</p>
          </div>

          <div className='flex  gap-8 font-medium mt-10'>
            <p>Next Draw </p>

            <p className='text40'>~$51,835</p>
          </div>


          <div className='flex  gap-8 font-medium mt-10'>
            <p>Next Draw </p>

            <button className='bg-theme p-3 px-10  rounded-xl text-white animate-jump animate-infinite animate-duration-1000 animate-delay-1000 '>
              Buy Ticket
            </button>
          </div>


          <div className='flex justify-center items-center  gap-8 font-medium mt-10 border-t pt-4 border-theme'>

            <p>Details</p>
          </div>

        </div>


      
      </div>

    </div>
  )
}

export default GameLottery