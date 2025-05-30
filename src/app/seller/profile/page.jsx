'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FiPieChart, FiUser, FiLock, FiBell, FiBookmark,
    FiList, FiMessageSquare, FiDollarSign, FiEdit
} from "react-icons/fi";
import Link from 'next/link';

const Page = () => {
    const [activeTab, setActiveTab] = useState('profile');

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
                    <div className="flex-1 flex-col">
                        <div className="relative overflow-hidden group p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 mb-6">
                            {/* Decorative background elements */}
                            <div className="absolute -top-12 -right-12 w-28 h-28 bg-blue-200 rounded-full opacity-20"></div>
                            <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-indigo-200 rounded-full opacity-20"></div>

                            <div className="flex items-center justify-between relative z-10">
                                <div>
                                    <p className="text-sm font-medium text-blue-600 mb-1">Account Overview</p>
                                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                        My Profile
                                    </h2>
                                </div>

                                {/* Animated edit button */}
                                <Link
                                    href="/seller/profile/editprofile/1"
                                    className="flex items-center px-6 py-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 group/edit-btn"
                                >
                                    <FiEdit className="mr-2 text-lg transform transition-transform duration-300 group-hover/edit-btn:-rotate-12" />
                                    <span className="font-medium text-white">Edit Profile</span>

                                    {/* Glowing effect */}
                                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover/edit-btn:opacity-20 transition-opacity duration-300 bg-gradient-to-br from-white to-transparent"></div>
                                </Link>
                            </div>

                            {/* Animated accent line */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-30 animate-pulse-slow"></div>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-6 rounded-lg border border-gray-200"
                        >


                            <div className="space-y-6">
                                {/* Personal Information */}
                                <div className="pb-4 border-b border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-gray-600">Full Name</label>
                                            <p className="text-gray-800">Michael Oliver</p>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">Email</label>
                                            <p className="text-gray-800">michael.oliver@gmail.com</p>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">Phone</label>
                                            <p className="text-gray-800">(213) 515-1234</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Business Information */}
                                <div className="pb-4 border-b border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Business Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-gray-600">Business Name</label>
                                            <p className="text-gray-800">Real Estate</p>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">Business Role</label>
                                            <p className="text-gray-800">Broker</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Address */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Address</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-gray-600">Country</label>
                                            <p className="text-gray-800">United States of America</p>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">City/State</label>
                                            <p className="text-gray-800">California, USA</p>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">Postal Code</label>
                                            <p className="text-gray-800">ERT 62574</p>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">License Number</label>
                                            <p className="text-gray-800">AS564178969</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page;