import React, { useState } from "react";
import { CiCircleMinus, CiSearch } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa6";
import { GoPlusCircle } from "react-icons/go";

export const PopularSlider = (props) => {
  const [initialState, setInitialState] = useState({
    selectDateIndex: 0,
    selectedSlot: null,
    activeDot: 1,
  });

  const [link, setLink] = useState()
  const [vedioModal, setVedioModal] = useState(false)
  const { selectDateIndex, selectedSlot, activeDot } = initialState;

  const updateStateHandler = (name, value) => {
    setInitialState((pre) => ({ ...pre, [name]: value }));
  };

  const slideLeft = () => {
    let dot = activeDot == 1 ? 2 : 1;
    updateStateHandler("activeDot", dot);
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 400;
  };

  const slideRight = () => {
    let dot = activeDot == 1 ? 2 : 1;
    updateStateHandler("activeDot", dot);
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 400;
  };

  const FaqVedios = [
    {
      url: "https://cdn.joepegs.com/collections/avalanche/0xf3593c6380ca76dc25c15d908951c28b239784da/logo-1711387187.jpg",
      title: "How to use EnglishYaari App? How EnglishYaari works?",
      name: 'Megha Nayak',
      sessionTaken: '1700'

    },
    {
      url: "https://img.joepegs.com/cdn-cgi/image/width=800,height=800/https://ipfs.io/ipfs/QmQgy4siXwLUshUBDtTMEL2aucUCZvVuBbneZ5fbLYNqK6/2894.png",
      title: "How to Book a Trial Session on EnglishYaari App?",
      name: 'Shruti Sharma',
      sessionTaken: '1500'

    },
    {
      url: "https://cdn.joepegs.com/mintpeg/avatar/0xf7db73e8939b589fe5a7140f1c4a358fd2c29520_eb0248ba-c960-4837-8eba-85bd41978387.jpeg",
      title: "How to Subscribe a Plan on EnglishYaari App?",
      name: 'Amal Mohan',
      sessionTaken: '1250'

    },

    {
      url: "https://cdn.joepegs.com/collections/0xb814fde395d75d311a4a9ce4c7b25cd9b1afbeb6/logo-1670613454.png",
      title: "How to Join your upcoming Session on EnglishYaari App? ",
      name: 'Sarika Poplani',
      sessionTaken: '1100'

    },

    {
      url: "https://cdn.joepegs.com/mintpeg/avatar/0x6427d56b32ffa07a62d2495e203932becc7d233f_ce1628b2-25c5-4f9a-98c8-414ed53cc219.png",
      title: "How to use EnglishYaari App? How EnglishYaari works?",
      name: 'Megha Nayak',
      sessionTaken: '1700'

    },
    {
      url: "https://cdn.joepegs.com/mintpeg/avatar/0x533d95fa7d5ced8f09e38aa359e406a3809bc0e0_c636a2d5-11a9-4be5-a97b-df9f963f0d1a.png",
      title: "How to Book a Trial Session on EnglishYaari App?",
      name: 'Shruti Sharma',
      sessionTaken: '1500'

    },
    {
      url: "https://cdn.joepegs.com/collections/avalanche/0x6edb9c74f1f495ffacceb207a5f947961698bff8/logo-1712588174.jpg",
      title: "How to Subscribe a Plan on EnglishYaari App?",
      name: 'Amal Mohan',
      sessionTaken: '1250'

    },

    {
      url: "https://cdn.joepegs.com/mintpeg/avatar/0x689650fee4c8f9d11ce434695151a4a1f2c42a37_22828bfa-99ef-4b30-ad4e-e24a0f477659.jpeg",
      title: "How to Join your upcoming Session on EnglishYaari App? ",
      name: 'Sarika Poplani',
      sessionTaken: '1100'

    },
  ];
  return (
    <div class=" mx-auto max-w-screen-2xl border relative mt-20 ">

      <button
        onClick={slideLeft}
        className=" absolute -left-4 top-72 z-50 bg-[#EEECF8] border h-12 w-12 flex items-center justify-center  rounded-full"
      >
        <svg
          width="22"
          height="21"
          viewBox="0 0 22 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.78748 10.943L6.78742 10.9429C6.67097 10.8263 6.60557 10.6683 6.60557 10.5035C6.60557 10.3387 6.67097 10.1807 6.78742 10.0641L6.78748 10.064L13.3501 3.50137L13.3501 3.50132L13.3534 3.4982C13.4713 3.38836 13.6272 3.32856 13.7883 3.3314C13.9494 3.33424 14.1031 3.3995 14.217 3.51343C14.331 3.62736 14.3962 3.78107 14.3991 3.94217C14.4019 4.10326 14.3421 4.25917 14.2323 4.37705L14.2323 4.37711L14.2291 4.38034L8.10674 10.5035L14.2291 16.6267L14.2292 16.6266L14.2323 16.63C14.3421 16.7478 14.4019 16.9037 14.3991 17.0648C14.3962 17.2259 14.331 17.3796 14.217 17.4936C14.1031 17.6075 13.9494 17.6728 13.7883 17.6756C13.6272 17.6784 13.4713 17.6187 13.3534 17.5088L13.3534 17.5089L13.3501 17.5056L6.78748 10.943Z"
            fill="#000"
            stroke="#000"
            stroke-width="0.259265"
          />
        </svg>
      </button>




      <button
        onClick={slideRight}
        className="mx-2 border flex absolute top-72 z-50 -right-8 bg-[#EEECF8] h-12 w-12  items-center justify-center  rounded-full"
      >
        <svg
          width="22"
          height="21"
          viewBox="0 0 22 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.2125 10.943L15.2126 10.9429C15.329 10.8263 15.3944 10.6683 15.3944 10.5035C15.3944 10.3387 15.329 10.1807 15.2126 10.0641L15.2125 10.064L8.64987 3.50137L8.64993 3.50132L8.64658 3.4982C8.52871 3.38836 8.37279 3.32856 8.2117 3.3314C8.0506 3.33424 7.8969 3.3995 7.78297 3.51343C7.66904 3.62736 7.60378 3.78107 7.60093 3.94217C7.59809 4.10326 7.65789 4.25917 7.76773 4.37705L7.76767 4.37711L7.7709 4.38034L13.8933 10.5035L7.7709 16.6267L7.77084 16.6266L7.76773 16.63C7.65789 16.7478 7.59809 16.9037 7.60093 17.0648C7.60378 17.2259 7.66904 17.3796 7.78297 17.4936C7.8969 17.6075 8.0506 17.6728 8.2117 17.6756C8.37279 17.6784 8.5287 17.6187 8.64658 17.5088L8.64664 17.5089L8.64987 17.5056L15.2125 10.943Z"
            fill="#000"
            stroke="#000"
            stroke-width="0.259265"
          />
        </svg>
      </button>

      <div className='bg-theme/20 relative h-28 rounded-t-2xl '>
        <img className='absolute w-40 -top-10 left-4' src="https://traderjoexyz.com/static/media/joepeg_illustration_2x.6e36c0bde65b2b4bbe09.webp" />
        <div className='ml-48 h-full  flex flex-col justify-center gap-2 '>
          <p className='text26 font-semibold'>Popular on Joepegs</p>
          <p className='text-gray font-normal '>Stake to earn points, the more you stake the more points you accrue.</p>


          <button className="bg-white gap-2 text20 p-2.5  rounded-full px-8  justify-center absolute flex items-center right-3">
            Visit Frams <FaArrowRight color='text-white' />
          </button>
        </div>

      </div>

      {
        //#region Introductory Video
        <div className="overflow-hidden">



          <div
            id="slider"
            className="flex relative bg-white p-4 w-full overflow-scroll scroll rounded-xl  whitespace-nowrap scroll-smooth"
          >


            <div className=" bg-white mx-auto pb-4 gap-x-3  rounded-3xl  flex w-full justify-around lg:justify-between  ">
              {FaqVedios.map((ele, ind) => (
                <div key={ind} className="min-w-[21rem] p-3  ">
                  <img className="w-full h-[170px] object-cover rounded-2xl" src={ele.url} />

                  <div className="mt-5 flex gap-2 ">
                    <img className="w-[60px] h-[60px] object-cover rounded-2xl" src={ele.url} />
                    <div className=" justify-center gap-2">
                      <p className="text20 font-semibold">{'Kimbros'}</p>
                      <p className="text-gray font-normal">{'4555iitem'}</p>
                    </div>
                  </div>


                  <div className="flex justify-between">

                  <div className="mt-5 flex gap-2 ">
                    <div className=" justify-center gap-2">
                      <p className="text20 font-medium">{'Kimbros'}</p>
                      <p className="text-gray font-normal">{'4555iitem'}</p>
                    </div>
                  </div>



                  <div className="mt-5 flex gap-2 ">
                    <div className=" justify-center gap-2">
                      <p className="text20 font-medium">{'Kimbros'}</p>
                      <p className="text-gray font-normal">{'4555iitem'}</p>
                    </div>
                  </div>
                    </div>
                </div>
              ))}
            </div>


          </div>





        </div>
        //#endregion
      }

    </div>
  );
};


export default PopularSlider;