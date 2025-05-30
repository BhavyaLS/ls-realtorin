'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FiPieChart, FiUser, FiLock, FiBell, FiBookmark,
    FiList, FiMessageSquare, FiDollarSign, FiDownload, FiRefreshCw
} from "react-icons/fi";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import Link from 'next/link';

const Page = () => {
    const [activeTab, setActiveTab] = useState('payment');
    const [paymentHistory] = useState([
        {
            id: 1,
            transactionId: '#52365897233',
            plan: 'Advanced Plan',
            status: 'Active',
            expiry: '2025-04-01'
        },
        {
            id: 2,
            transactionId: '#52365897234',
            plan: 'Premium Plan',
            status: 'Expired',
            expiry: '2025-03-15'
        },
        {
            id: 3,
            transactionId: '#52365897235',
            plan: 'Advanced Plan',
            status: 'Active',
            expiry: '2025-05-01'
        },
        {
            id: 4,
            transactionId: '#52365897236',
            plan: 'Advanced Plan',
            status: 'Pending',
            expiry: '2025-04-15'
        }
    ]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return 'text-green-600';
            case 'Expired': return 'text-red-600';
            case 'Pending': return 'text-yellow-600';
            default: return 'text-gray-600';
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

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="relative overflow-hidden group p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 mb-6">
                            {/* Decorative background elements */}
                            <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-200 rounded-full opacity-20"></div>
                            <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-indigo-200 rounded-full opacity-20"></div>

                            <div className="flex items-center justify-between relative z-10">
                                <div>
                                    <p className="text-sm font-medium text-blue-600 mb-1">Financial Overview</p>
                                    <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-800 bg-clip-text text-transparent flex items-center">
                                        Payment History
                                    </h2>
                                </div>

                                {/* Optional: Add a button or action here */}
                                <div className='relative p-4 bg-gradient-to-br from-blue-500 to-indigo-700 rounded-xl shadow-lg animate-float'>
                                    <FaMoneyCheckDollar className='text-3xl text-white transform rotate-45 transition-transform duration-500 group-hover:rotate-12' />

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
                                <h2 className="text-2xl font-semibold text-gray-800">Payment History</h2>
                            </div> */}

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Transaction ID</th>
                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Subscription Plan Details</th>
                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Renew Subscription</th>
                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {paymentHistory.map((payment) => (
                                            <tr key={payment.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                                                    {payment.transactionId}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-gray-900">{payment.plan}</span>
                                                        <span className="text-sm text-gray-500">Expires {payment.expiry}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`text-sm font-medium ${getStatusColor(payment.status)}`}>
                                                        {payment.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 flex items-center">
                                                        <FiRefreshCw className="mr-2" />
                                                        Renew Plan
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button className="text-gray-600 hover:text-blue-600 flex items-center">
                                                        <FiDownload className="mr-2" />
                                                        Download Invoice
                                                    </button>
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