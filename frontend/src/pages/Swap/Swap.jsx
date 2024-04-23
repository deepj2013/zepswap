import { Textarea } from '@material-tailwind/react'
import React, { useState } from 'react'
import { IoCaretDown } from 'react-icons/io5'
import { IoMdArrowRoundDown } from "react-icons/io";
import { TfiExchangeVertical } from "react-icons/tfi";
import { twMerge } from 'tailwind-merge';
import { FaRegCopy, FaRegCopyright } from 'react-icons/fa6';
import { SlPencil } from "react-icons/sl";

function Swap() {

    const [isHover,setIsHover]=useState(false)
    return (
        <div className='bg-secondry h-screen w-screen py-20'>
            <div className='container mx-auto'>
                <div className='bg-theme/40 mx-auto w-full  md:w-[50%] lg:w-[30%] p-5 rounded-3xl'>
                    <p className='text-white text28'>Swap</p>
                    <p className='text-lightTheme'>Trade tokens in an instant</p>

                    <div className='border-b mt-10 mb-5'>

                    </div>


                    <div>
                        <div className='flex items-center gap-2 text-white mt-4'>
                            <img className='h-5 w-5 rounded-full' src={'https://assets.coingecko.com/coins/images/13415/thumb/anrkey.jpg?1696513176'}/>
                            BNB
                            <IoCaretDown className='text-sm text-white'/>
                        </div>
                        
                        <div className='mt-2  flex flex-col  items-end justify-center p-3  bg-secondry text-white rounded-xl h-20'>
                            <input placeholder='00'     className='bg-transparent  text-right w-full outline-none flex-end ' />
                            <p>1212</p>
                        </div>


                        <div
                        onMouseEnter={()=>setIsHover(true)}
                        onMouseLeave={()=>setIsHover(!true)}
                        className={twMerge(`mx-auto  cursor-pointer mt-4  flex justify-center py-3 h-10 w-10 rounded-full bg-secondry`, isHover&&'bg-theme')}>
                            {!isHover?<IoMdArrowRoundDown className='text-theme text-xl'/>:
                            <TfiExchangeVertical  className='text-secondry text-xl' />}
                        </div>


                        <div className='flex items-center gap-2 text-white mt-4'>
                            <img className='h-5 w-5 rounded-full' src={'https://assets.coingecko.com/coins/images/13415/thumb/anrkey.jpg?1696513176'}/>
                            BNB
                            <IoCaretDown className='text-sm text-white'/>
                            <FaRegCopy/>
                        </div>
                        
                        <div className='mt-2  flex flex-col  items-end justify-center p-3  bg-secondry text-white rounded-xl h-20'>
                            <input placeholder='00'     className='bg-transparent  text-right w-full outline-none flex-end ' />
                            <p>1212</p>
                        </div>


                        <div className='mt-5 flex justify-between'>
                            <p className='flex text-theme items-center gap-2 '>Slippage Tolerance <SlPencil/></p>
                            <p className='text-theme font-bold'>0.5%</p>
                        </div>

                        <button className='bg-theme/80 w-full mt-5 py-2.5 text20 rounded-full hover:bg-theme hover:text-white'>
                            Connect wallet
                        </button>

                    </div>
                </div>


            </div>
        </div>
    )
}

export default Swap