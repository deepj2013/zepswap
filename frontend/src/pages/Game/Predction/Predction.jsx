import React from 'react';
import HorizontalScroll from '../../../component/Common/HorizontalScroll';
import { twMerge } from 'tailwind-merge';
import { IoMdArrowRoundDown } from 'react-icons/io';
import { FaAngleDown } from 'react-icons/fa6';

const Predction = () => {
  return (
    <div className='h-screen w-screen bg-theme flex flex-col justify-center overflow-hidden '>

      <div className='px-4 flex justify-between'>
        <div className='flex items-center'>
          <img className='h-30 w-16' src='https://assets.pancakeswap.finance/web/chains/56.png' />
          <div>
            <div className='flex bg-secondry text-white items-center gap-6 p-1 px-4 rounded-2xl'>
              <p className='text20 font-semibold'>BNB Chain</p>

              <div className='flex items-center gap-4 '>
                <p className='text-gray font-normal '>$ 2000</p>

                <FaAngleDown className='text-sm' />
              </div>

            </div>
          </div>
        </div>


        {/* 
        <div className='flex items-center'>
          <img className='h-30 w-16' src='https://assets.pancakeswap.finance/web/chains/56.png'/>
          <div>
            <div className='flex bg-secondry text-white items-center gap-6 p-1 px-4 rounded-2xl'>
              <p className='text20 font-semibold'>BNB Chain</p>

              <div className='flex items-center gap-4 '>
              <p className='text-gray font-normal '>$ 2000</p>

<FaAngleDown className='text-sm'/>
              </div>
             
            </div>
          </div>
        </div> */}

        {/* 
        <div className='flex items-center'>
          <img className='h-30 w-16' src='https://assets.pancakeswap.finance/web/chains/56.png'/>
          <div>
            <div className='flex bg-secondry text-white items-center gap-6 p-1 px-4 rounded-2xl'>
              <p className='text20 font-semibold'>BNB Chain</p>

              <div className='flex items-center gap-4 '>
              <p className='text-gray font-normal '>$ 2000</p>

<FaAngleDown className='text-sm'/>
              </div>
             
            </div>
          </div>
        </div> */}
      </div>


      <div className='flex flex-col justify-center items-center overflow-hidden mt-8' style={{ width: '100%', height: '380px' }}>
        <HorizontalScroll>
          {/* Add your content here */}
          <div className='flex b'>
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                className={twMerge('rounded-2xl', index == 2 && 'bg-gradient-to-r from-purple-400 via-lightTheme-500 to-red-600 p-0.5 overflow-hidden rounded-2xl')}
                key={index} style={{ width: '330px', height: '350px', margin: '10px' }}>
                <div className='h-full w-full flex flex-col justify-center relative rounded-2xl bg-secondry'>
                  <div className='absolute w-full top-0'>
                    <div className='bg-theme/40 p-1 px-2 text16 text-white flex justify-between'>
                      <div className={twMerge('font-normal')}>
                        Expried
                      </div>
                      <p>#23567</p>
                    </div>
                  </div>

              {index==0 &&    <div class="w-24 h-24 absolute top-10 left-1/2 transform -translate-x-1/2">
                    <div class="absolute inset-0 overflow-hidden">
                      <svg class="h-full w-full text-yellow-400" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" />
                      </svg>
                    </div>
                    <div class="absolute inset-0 flex flex-col items-center justify-center rounded">

                      <p className='font-bold text-2xl'>
                      Up
                      </p>

                      <p>
                      1.56x
                      </p>
                    </div>
                  </div>}


                  {index==2 &&    <div class="w-24 h-24 absolute bottom-4 left-1/2 transform -translate-x-1/2">
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
                  </div>}



                  {/* Current Pice */}
                  {index == 0 && <div className={twMerge('border-2 border-theme w-[85%] mx-auto rounded-2xl p-3 mt-5')}>
                    <p className='text-lightTheme'>Last Price</p>


                    <div className='flex justify-between items-center'>
                      <p className='font-semibold text-theme text-xl '>
                        $5000
                      </p>

                      <div className='bg-theme text-white text px-2 p-1 rounded-md flex items-center'>
                        <IoMdArrowRoundDown />
                        $5000
                      </div>

                    </div>



                    <div className='flex justify-between items-center mt-2'>
                      <p className='font-semibold text-theme text-sm '>
                        Locked Price:
                      </p>

                      <div className=' text-white text px-2 p-1 rounded-md flex items-center'>
                        $5000
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


                  {(index == 1 || index==2)&& <div className={twMerge('border-2 border-theme w-[85%] mx-auto rounded-2xl p-3 mt-5 z-30 bg-secondry')}>





                    <div className='flex justify-between items-center'>
                      <p className='font-semibold text-theme text-base '>
                        Price Pool:
                      </p>

                      <div className=' text-white text px-2 p-1 rounded-md flex items-center'>
                        $5000
                      </div>

                    </div>

                    <div className='flex flex-col'>
                      <button className='bg-theme text-white w-full rounded-lg py-1.5 mt-2'>
                        Enter Up
                      </button>


                      <button className='bg-[#A8CD9F] text-white w-full rounded-lg py-1.5 mt-3'>
                        Enter Up
                      </button>

                    </div>

                  </div>}

                </div>
              </div>
            ))}
          </div>

        </HorizontalScroll>
      </div>
    </div>
  );
};

export default Predction;
