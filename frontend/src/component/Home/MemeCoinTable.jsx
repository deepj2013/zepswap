import React from 'react'
import { FaArrowRight } from 'react-icons/fa6'
import { dummyData } from '../../utils/Contant'

function MemeCoinTable() {
   
    return (
        <div>
            <section >
                <div class="px-4 mx-auto w-full lg:w-[80%] 2xll:w-[70%] ">
                    <div className='bg-theme/20 relative h-28 rounded-t-2xl '>
                        <img className='absolute w-40 -top-10 left-4' src="https://traderjoexyz.com/static/media/meme_farms_illustration.90966f097caaf5d948ee.png" />
                        <div className='ml-48 h-full  flex flex-col justify-center gap-2 '>
                            <p className='text26 font-semibold'>Meme Coin Rush</p>
                            <p className='text-gray font-normal '>Stake to earn points, the more you stake the more points you accrue.</p>


                            <button className="bg-white gap-2 text20 p-2.5  rounded-full px-8  justify-center absolute flex items-center right-3">
                                Visit Frams <FaArrowRight color='text-white' />
                            </button>
                        </div>

                    </div>
                    <div class="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">

                        <div class="overflow-x-auto">
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="p-4">
                                            <div class="flex items-center">
                                            <th scope="col" class="px-4 py-3">#</th>

                                            </div>
                                        </th>
                                        <th scope="col" class="px-4 py-3">Token</th>
                                        <th scope="col" class="px-4 py-3">TOTAL STAKED</th>
                                        <th scope="col" class="px-4 py-3">TOTAL STAKED (USD)</th>
                                       
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                    dummyData.map((ele, ind) => {
                                            return (
                                                <tr class="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                                                    <td class="w-4 px-4 py-3">
                                                        <div class="flex items-center">
                                                        <span class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">{ind+1}</span>
                                                        </div>
                                                    </td>
                                                    <th scope="row" class="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        <img src={ele?.img} alt="iMac Front Image" class="w-auto h-8 mr-3" />
                                                        {ele.Token}
                                                    </th>
                                                    <td class="px-4 py-2">
                                                        <span class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">{ele?.Stalked}</span>
                                                    </td>
                                                    <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        <div class="flex items-center">
                                                        {ele?.USD}
                                                        </div>
                                                    </td>
                                                  
                                          
                                                </tr>
                                            )
                                        })
                                    }


                                </tbody>
                            </table>
                        </div>
                        <nav class="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0" aria-label="Table navigation">
                            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                                Showing
                                <span class="font-semibold text-gray-900 dark:text-white">1-10</span>
                                of
                                <span class="font-semibold text-gray-900 dark:text-white">1000</span>
                            </span>
                            <ul class="inline-flex items-stretch -space-x-px">
                                <li>
                                    <a href="#" class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <span class="sr-only">Previous</span>
                                        <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                                </li>
                                <li>
                                    <a href="#" class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                                </li>
                                <li>
                                    <a href="#" aria-current="page" class="z-10 flex items-center justify-center px-3 py-2 text-sm leading-tight border text-primary-600 bg-primary-50 border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                                </li>
                                <li>
                                    <a href="#" class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
                                </li>
                                <li>
                                    <a href="#" class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
                                </li>
                                <li>
                                    <a href="#" class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <span class="sr-only">Next</span>
                                        <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default MemeCoinTable