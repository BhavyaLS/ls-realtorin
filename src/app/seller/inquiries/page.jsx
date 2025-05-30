'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FiPieChart, FiUser, FiLock, FiBell, FiBookmark,
    FiList, FiMessageSquare, FiDollarSign, FiEye, FiMessageCircle
} from "react-icons/fi";
import { BiSolidChat } from "react-icons/bi";
import Link from 'next/link';

const Page = () => {
    const [activeTab, setActiveTab] = useState('inquiries');
    const [inquiries] = useState([
        {
            id: 1,
            name: 'Kristin Watson',
            contact: '8619741011',
            status: 'Responded',
            date: '10/01/25',
            time: '07:10 PM',
            views: 102,
            avatar: 'https://storage.googleapis.com/a1aa/image/mLpsDHB-BzNEZ3wSWnAheKYDp0hkrlVr0r5ISVW7jNI.jpg'
        },
        {
            id: 2,
            name: 'John Doe',
            contact: '555-1234',
            status: 'Pending',
            date: '11/01/25',
            time: '02:30 PM',
            views: 115,
            avatar: 'https://placehold.co/100x100'
        },
        // Add more sample data as needed
    ]);

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Responded': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Visit Scheduled': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-6 py-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    <div className="lg:w-64 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                        <div className="text-center mb-8">
                            <img
                                alt="Profile"
                                className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-blue-100"
                                src="https://storage.googleapis.com/a1aa/image/cnTXOZ1o4seDOuQamENP4ws8coRKPND1W9DDwAK8gSg.jpg"
                            />
                            <h2 className="text-lg font-semibold text-gray-800">Michael Oliver</h2>
                        </div>

                        <nav className="space-y-1">
                            {[
                                { icon: <FiPieChart />, label: 'Dashboard', tab: 'dashboard' },
                                { icon: <FiUser />, label: 'My Profile', tab: 'profile' },
                                { icon: <FiLock />, label: 'Change Password', tab: 'changepassword' },
                                { icon: <FiBell />, label: 'Notifications', tab: 'notifications' },
                                { icon: <FiBookmark />, label: 'Favorites', tab: 'favorites' },
                                { icon: <FiList />, label: 'My Properties', tab: 'myproperty' },
                                { icon: <FiMessageSquare />, label: 'Inquiries', tab: 'inquiries' },
                                { icon: <FiDollarSign />, label: 'Payment', tab: 'payment' },
                            ].map((item) => (
                                <motion.div whileHover={{ x: 5 }} key={item.tab}>
                                    <Link
                                        href={`/seller/${item.tab}`}
                                        className={`flex items-center p-3 rounded-lg text-sm ${activeTab === item.tab
                                            ? 'bg-blue-50 text-blue-800'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                        onClick={() => setActiveTab(item.tab)}
                                    >
                                        <span className="text-lg mr-3">{item.icon}</span>
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                    </div>


                    <div className="flex-1 flex-col">
                        <div className="relative overflow-hidden group p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 mb-6">
                            {/* Decorative background elements */}
                            <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-200 rounded-full opacity-20"></div>
                            <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-indigo-200 rounded-full opacity-20"></div>

                            <div className="flex items-center justify-between relative z-10">
                                <div>
                                    <p className="text-sm font-medium text-blue-600 mb-1">Customer Interactions</p>
                                    <h2 className="text-2xl  font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center">
                                        Inquiries
                                    </h2>
                                </div>

                                {/* Optional: Add a button or action here */}
                                <div className='relative p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg animate-float'>
                                    <BiSolidChat className='text-3xl text-white transform rotate-45 transition-transform duration-500 group-hover:rotate-12' />


                                    <div className='absolute inset-0 rounded-xl opacity-20 animate-pulse bg-gradient-to-br from-white to-transparent'></div>
                                </div>
                            </div>

                            {/* Animated accent line */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-30 animate-pulse-slow"></div>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-6 rounded-lg border border-gray-200"
                        >
                            {/* <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-semibold text-gray-800">Inquiries</h2>
                            </div> */}

                            <div className="overflow-x-auto">
                                <table className="w-auto lg:w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Contact</th>
                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Timestamp</th>
                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Views</th>
                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {inquiries.map((inquiry) => (
                                            <tr key={inquiry.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <img
                                                            src={inquiry.avatar}
                                                            alt={inquiry.name}
                                                            className="w-10 h-10 rounded-full mr-3"
                                                        />
                                                        <span className="font-medium text-gray-900">{inquiry.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900">{inquiry.contact}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(inquiry.status)}`}>
                                                        {inquiry.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm text-gray-600">{inquiry.date}</span>
                                                        <span className="text-xs text-gray-400">{inquiry.time}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900">{inquiry.views}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex space-x-2">
                                                        <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg">
                                                            <FiEye className="w-5 h-5" />
                                                        </button>
                                                        <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg">
                                                            <FiMessageCircle className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Page;