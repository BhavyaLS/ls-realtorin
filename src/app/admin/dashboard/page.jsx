'use client';
import { BarChart } from '@mui/x-charts'
import React, { useEffect, useState } from 'react'
import { FaBath } from 'react-icons/fa'
import { FiBox, FiClock, FiEye, FiHome, FiInbox, FiList, FiMapPin, FiPieChart } from 'react-icons/fi'
import { IoBedOutline } from 'react-icons/io5'
import { MdHomeWork } from 'react-icons/md'
import { motion } from 'framer-motion'
const Page = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    return (
        <div className="flex-1 flex-col py-3 pr-3 bg-white">
            <div className='relative overflow-hidden group p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 mb-6'>

                <div className='absolute -top-16 -right-16 w-32 h-32 bg-blue-200 rounded-full opacity-20'></div>
                <div className='absolute -bottom-8 -left-8 w-24 h-24 bg-indigo-200 rounded-full opacity-20'></div>

                <div className='flex items-center justify-between relative z-10'>
                    <div>
                        <p className='text-sm font-medium text-blue-600 mb-1'>Welcome to your</p>
                        <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                            Dashboard
                        </h1>
                    </div>


                    <div className='relative p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg animate-float'>
                        <MdHomeWork className='text-4xl text-white transform rotate-45 transition-transform duration-500 group-hover:rotate-12' />


                        <div className='absolute inset-0 rounded-xl opacity-20 animate-pulse bg-gradient-to-br from-white to-transparent'></div>
                    </div>
                </div>


                <div className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-30'></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                {[
                    { icon: <FiHome className="text-2xl" />, title: 'Properties', value: 10, bg: 'bg-blue-100', text: 'text-blue-800' },
                    { icon: <FiEye className="text-2xl" />, title: 'Total Views', value: 100, bg: 'bg-green-100', text: 'text-green-800' },
                    { icon: <FiInbox className="text-2xl" />, title: 'Inquiries', value: 40, bg: 'bg-purple-100', text: 'text-purple-800' },
                ].map((stat, idx) => (
                    <motion.div whileHover={{ y: 5 }} key={idx} className={`${stat.bg} p-6 rounded-lg border border-gray-200`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">{stat.title}</p>
                                <p className={`text-3xl font-semibold ${stat.text}`}>{stat.value}</p>
                            </div>
                            <span className={`p-3 rounded-lg ${stat.text} bg-white`}>
                                {stat.icon}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>


            <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                        <FiPieChart className="mr-2 text-blue-800" />
                        Performance Analytics
                    </h3>
                    <div className="text-sm text-gray-500">
                        <FiClock className="inline mr-1" />
                        {currentTime.toLocaleTimeString()}
                    </div>
                </div>
                <BarChart
                    xAxis={[{
                        scaleType: 'band',
                        data: ['Property A', 'Property B', 'Property C'],
                        tickLabelStyle: { fill: '#4B5563' }
                    }]}
                    series={[
                        { data: [4, 3, 5], label: 'Views', color: '#3B82F6' },
                        { data: [1, 6, 3], label: 'Enquiries', color: '#10B981' }
                    ]}
                    height={300}
                    sx={{
                        '.MuiChartsAxis-line': { stroke: '#E5E7EB' },
                        '.MuiChartsAxis-tick': { stroke: '#E5E7EB' },
                    }}
                />
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <FiList className="mr-2 text-blue-800" />
                    My Properties
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[1, 2, 3].map((item) => (
                        <motion.div
                            key={item}
                            whileHover={{ y: -5, scale: 1.01 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, type: 'tween' }}
                            className="relative border border-gray-100 rounded-2xl overflow-hidden bg-white group transition-all shadow-lg hover:shadow-xl"
                        >
                            <div className="relative overflow-hidden">
                                <motion.img
                                    whileHover={{ scale: 1.1 }}
                                    src="https://storage.googleapis.com/a1aa/image/6MQ8dZfrmox3SSiucUGj5dGaWZR-Ffrogq_jcBHsPOI.jpg"
                                    alt="Property"
                                    className="w-full h-52 object-cover transform transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />

                                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 rounded-2xl">
                                        <div className="flex items-center text-white">
                                            <FiMapPin className="mr-2 text-base" />
                                            <span className="font-medium text-sm">Greenview, JC</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-xl font-bold text-gray-900 bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                                        Modern Luxury Villa
                                    </h3>
                                    <p className="text-lg font-bold text-gray-900 mb-2">
                                        <span className='text-green-700'>$</span>150,000
                                    </p>

                                </div>

                                <div className="grid grid-cols-2 gap-2.5 text-gray-600">
                                    <div className="flex items-center justify-between px-4 2xl:px-8 py-2 bg-gray-100 rounded-lg">
                                        <FiHome className="w-6 h-6 text-blue-600 mr-2" />
                                        <div className='flex flex-col items-center'>
                                            <p className="text-sm">Type</p>
                                            <p className="font-semibold">Villa</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between px-4 2xl:px-8 py-2 bg-gray-100 rounded-lg">
                                        <IoBedOutline className="w-6 h-6 text-blue-600 mr-2" />
                                        <div className='flex flex-col items-center'>
                                            <p className="text-sm">Beds</p>
                                            <p className="font-semibold">3</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between px-4 2xl:px-8 py-2 bg-gray-100 rounded-lg">
                                        <FiBox className="w-6 h-6 text-purple-600 mr-2" />
                                        <div className='flex flex-col items-center'>
                                            <p className="text-sm flex items-center">Area </p>
                                            <p className="font-semibold">2235</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between px-4 2xl:px-8 py-2 bg-gray-100 rounded-lg">
                                        <FaBath className="w-5 h-5 text-purple-600 mr-2" />
                                        <div className='flex flex-col items-center'>
                                            <p className="text-sm">Baths</p>
                                            <p className="font-semibold">2</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Page;