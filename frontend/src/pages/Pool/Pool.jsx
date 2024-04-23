import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { poolData } from '../../utils/Contant';

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

const Pool = () => {
    return (

        <div className='h-screen w-screen overflow-scroll '>

            <div className='bg-lightTheme py-10'>



                <div className='container mx-auto'>
                    <div>
                        <div className='p-10 pb-0  flex justify-between items-center flex-wrap'>
                            <div>
                                <p className='text40  font-semibold'>Pool</p>
                                <p className='mt-2'>Provide liquidity and earn fees.</p>
                            </div>

                            <div className='border  border-gray-600 rounded-xl py-1 px-2 gap-4'>
                                <button className='bg-theme px-3 py-1.5 rounded-md font-semibold'>
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
                                <button className='bg-theme px-3 py-1.5 rounded-md font-semibold'>
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

                </div>
                <div className='flex container mx-auto !mt-20'>
                    <div className='  w-[50%] h-80'>
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
                                <Area type="monotone" dataKey="uv" stroke="#3AAFA9" fill="#3AAFA9" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className=' w-[50%] h-80'>
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
                                <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

                        

            <div className='container mx-auto'>

            <div className='bg-theme  w-full border p-3 my-2 flex justify-between'>
                                <div className='w-[200px] flex items-center gap-3'>
                                    <img className='h-6' src='https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/logos/0x912CE59144191C1204E64559FE8253a0e49E6548/logo.png'/>
                                    POOL NAME	
                                </div>


                                <div>
                                VOLUME (24H)
                                </div>

                                <div>
                                LIQUIDITY
                                </div>

                                <div>
                                +2% DEPTH
                                </div>

                                <div>
                                -2% DEPTH
                                </div>
                                
                                <div>
                                FEES (24H)
                                </div>
                            </div>
                {
                    poolData.map((ele,ind)=>{
                        return(
                            <div className='bg-white shadow w-full border p-3 my-2 flex justify-between'>
                                <div className='w-[200px] flex items-center gap-3'>
                                    <img className='h-6' src='https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/logos/0x912CE59144191C1204E64559FE8253a0e49E6548/logo.png'/>
                                AVAX/USDC
                                <p className='bg-lightTheme p-1 px-4 rounded-full '>{ind+2}%</p>
                                </div>


                                <div>
                                    ${Number(ele?.volumeAVAX).toFixed(2)}
                                </div>

                                <div>
                                    ${Number(ele?.volumeUSD).toFixed(2)}
                                </div>

                                <div>
                                    ${Number(ele?.untrackedVolume).toFixed(2)}
                                </div>

                                <div>
                                    ${Number(ele?.liquidityAVAX).toFixed(2)}
                                </div>
                                
                                <div>
                                    ${Number(ele?.txCount).toFixed(2)}
                                </div>
                            </div>
                        )
                    })
                }
                
            </div>
        </div>
    );
};

export default Pool;
