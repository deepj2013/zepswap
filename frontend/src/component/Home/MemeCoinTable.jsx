import React, { useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa6'
import { LOGO, dummyData } from '../../utils/Contant'
import { getCoinsList, getCurrentPrice } from '../../services/Services'
import { ALLCOINS } from '../../utils/Coins'
import { getRandomColor } from '../../utils/Helper'
import { ThreeDots } from 'react-loader-spinner'



const ALL_COINS = ALLCOINS;
const ITEMS_PER_PAGE = 50;
function MemeCoinTable() {

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(ALL_COINS.length / ITEMS_PER_PAGE);
    const [coinsList, setCoinsList] = useState([]);
    const handlePrevPage = () => {
      setCurrentPage((prevPage) => Math.max(prevPage, 1));
    };
  
    const handleNextPage = () => {
      setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

  
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentCoins = ALL_COINS.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div>

<div className='bg-theme/20 relative h-28 rounded-t-2xl container mx-auto '>
                        <img className='absolute w-20 top-6 left-4' src={LOGO} />
                        <div className='ml-32 h-full  flex flex-col justify-center gap-2 '>
                            <p className='text26 font-semibold'>Coins List</p>
                            {/* <p className='text-gray font-normal '>Stake to earn points, the more you stake the more points you accrue.</p> */}


                        </div>

                    </div>
            <section >
           

                <div className='container mx-auto overflow-scroll'>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3  text-start">#</th>
            <th scope="col" className="px-4 py-3  text-start">Token</th>
            <th scope="col" className="px-4 py-3  text-start">Symbol</th>
            <th scope="col" className="px-4 py-3  text-start">Name</th>
            <th scope="col" className="px-4 py-3  text-start">Chain</th>
            <th scope="col" className="px-4 py-3  text-start">Chains</th>
            <th scope="col" className=" py-3  text-start">LIve Price</th>

          </tr>
        </thead>
        <tbody>
          {currentCoins.map((ele, ind) => {
            if (ele?.symbol !== "-") {
              return (
              <Crad ele={ele} ind={ind} startIndex={startIndex}/>
              );
            }
            return null;
          })}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          Previous
        </button>
        <span className="text-gray-800 dark:text-gray-200">Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          Next
        </button>
      </div>
    </div>
            </section>
        </div>
    )
}

export default MemeCoinTable



const Crad=({ele,startIndex,ind})=>{


    const [livePice,setLivePrice]=useState(0)
    const [loading,setLoading]=useState(false)
    const getLivePrice=async(symbol)=>{
        try {
            setLoading(true)
            let response = await getCurrentPrice(symbol)
            let temp=Object.values(response.data)
            console.log(temp[0]?.USD);
            setLivePrice(temp[0]?.USD)
            setLoading(false)

        } catch (error) {
            setLoading(false)

            console.log(error);
        }
    }
    return(
        <tr key={ind} className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
        <td className="w-4 px-4 py-3">
          <div className="flex items-center">
            <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
              {startIndex + ind + 1}
            </span>
          </div>
        </td>
        <th scope="row" className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <img src={ele?.logo} alt="Token Logo" className="w-auto h-8 mr-3" />
          {ele.Token}
        </th>
        <td className="px-4 py-2">
          <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
            {ele?.symbol}
          </span>
        </td>
        <td className="px-4 py-2">
          <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
            {ele?.name}
          </span>
        </td>
        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
            {ele?.chain}
          </span>
        </td>
        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <div className="w-[300px] flex-wrap flex gap-3">
            {ele?.chains?.map((chain, index) => (
              <span key={index} style={{ background: getRandomColor() }} className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                {chain}
              </span>
            ))}
          </div>
        </td>

        <td>
        {!loading &&  <button
          onClick={()=>{
            getLivePrice(ele?.symbol)
          }}
           className='text-sm font-semibold text-gray-600 got font-urbanist border min-w-[120px] rounded-lg py-2 bg-theme'>
             {livePice==0?'Live Price':`$ ${livePice}`}
          </button>}

          <ThreeDots
  visible={loading}
  height="30"
  width="30"
  color="green"
  radius="9"
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
        </td>
      </tr>
    )
}