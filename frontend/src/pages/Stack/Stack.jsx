import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const Stack = () => {
    return (
        <div className='h-screen w-screen   overflow-scroll'>


            <div className='bg-theme/10 pb-10'>

         

            <div className='container mx-auto'>
                <div>
                    <div className='p-10 pb-0  flex justify-between items-center flex-wrap'>
                        <div>
                            <p className='text40  font-semibold'>Stake</p>
                            <p className='mt-2'>Stake your JOE tokens and earn more.</p>
                        </div>

                        <div className='border  border-gray-600 rounded-xl py-1 px-2 gap-4'>
                            <button className='bg-lightTheme px-3 py-1.5 rounded-md font-semibold'>
                                USD
                            </button>

                            <button className='ml-3 font-semibold'>
                                JOE
                            </button>
                        </div>
                    </div>


                    <div className='px-10 pt-6  flex justify-between items-center flex-wrap'>
                        <div>
                            <p className='mt-2'>Total Staked sJOE</p>
                            <p className='text36  font-semibold'>$78,040,003</p>
                        </div>

                        <div className='border  border-gray-600 rounded-xl py-1 px-2 gap-4 mt-4 md:mt-0'>
                            <button className='bg-lightTheme px-3 py-1.5 rounded-md font-semibold'>
                                USD
                            </button>

                            <button className='ml-3 font-semibold'>
                                JOE
                            </button>

                            <button className=' px-3 py-1.5 rounded-md font-semibold'>
                                USD
                            </button>

                            <button className='ml-3 font-semibold'>
                                JOE
                            </button>
                        </div>
                    </div>
                </div>
                <div className='h-60 mt-20'>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            width={500}
                            height={400}
                            data={data}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="uv" stroke="#3AAFA9" fill="#Def2f1" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

       
            </div>
            <div className=' container mx-auto  bg-white !mt-20'>

                <div className='flex flex-wrap '>
                 
                 {
                    [1,1,1,1].map((ele,ind)=>{
                        return(
                            <div className='w-[90vw] mx-auto mt-6 md:w-[45%] border  items-center gap-2 p-5 rounded-md  hover:bg-lightTheme'>

                            <div className='flex justify-between w-full'>
    
                                <div className='flex'>
                                    <img className='h-10 w-10' src='https://traderjoexyz.com/static/media/sJoe.bfecc45e4aaf8e7cad43.webp' />
                                    <p>sJOE</p>
                                </div>
                                <div>
                                    Earn USD Stablecoin
                                </div>
                            </div>
    
    
                            <div className='flex justify-between w-full mt-6'>
    
                                <div className=''>
                                    <p className='text-sm text-gray-800'>Total Stacked</p>
                                    <p className='text-xl text-gray-800'>$3000</p>
    
                                </div>
                                <div className=''>
                                    <p className='text-sm text-gray-800'>Your Stacke</p>
                                    <p className='text-xl text-gray-800'>$3000</p>
    
                                </div>
                            </div>
    
                            <div className='flex justify-between w-full mt-6'>
    
                                <div className=''>
                                    <p className='text-sm text-gray-800'>Apr</p>
                                    <p className='text-xl text-gray-800'>$3000</p>
    
                                </div>
                                <div className=''>
                                    <p className='text-sm text-gray-800'>Deopsite Fee</p>
                                    <p className='text-xl text-gray-800'>$3000</p>
    
                                </div>
                            </div>
    
                        </div>
                        )
                    })
                 }

                    


                </div>
            </div>
        </div>
    );
};

export default Stack;
