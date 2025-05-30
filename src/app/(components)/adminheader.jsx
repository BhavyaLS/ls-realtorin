'use client'
import React, { useState } from 'react'
import { FiBell, FiBookmark, FiDollarSign, FiList, FiLock, FiMessageSquare, FiPieChart, FiUser } from 'react-icons/fi'
import Link from 'next/link';
import { FaCalendar } from "react-icons/fa";
import { motion } from 'framer-motion'
import Image from 'next/image';
const AdminHeader = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [activeTab, setActiveTab] = useState('');
    return (
        <div className="lg:min-w-64 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <Link href="/admin" className="flex items-center justify-center gap-3">
                <Image alt="Logo" className="h-9" src="/logo.png" width={100} height={36} />
                {/* <span className="font-cambria text-[#2D2D2D] font-normal text-[28px] leading-[39.86px] tracking-normal">
                    Real Estate
                </span> */}
            </Link>
            <div className="flex items-center justify-around gap-2 my-4 p-2 border border-gray-400 rounded-xl">
                <Image
                    alt="Profile"
                    className="w-16 h-16 rounded-full border-2 border-blue-100"
                    src="https://storage.googleapis.com/a1aa/image/cnTXOZ1o4seDOuQamENP4ws8coRKPND1W9DDwAK8gSg.jpg"
                    width={64}
                    height={64}
                />
                <div className='flex flex-col gap-1'>
                    <h2 className="text-lg font-semibold text-gray-800">Hello! Admin</h2>
                    <p className="text-sm text-gray-500 flex items-center"><FaCalendar className='mr-1'/>: {currentTime.toLocaleDateString()}</p>
                </div>
            </div>

            <nav className="space-y-1">
                {[
                    { icon: <FiPieChart />, label: 'Dashboard', tab: 'dashboard' },
                    { icon: <FiUser />, label: 'My Profile', tab: 'profile' },
                    { icon: <FiLock />, label: 'Change Password', tab: 'changepassword' },
                    { icon: <FiBell />, label: 'Notifications', tab: 'notifications' },
                    { icon: <FiBookmark />, label: 'Favorites', tab: 'favorites' },
                    { icon: <FiList />, label: 'Properties', tab: 'property' },
                    { icon: <FiMessageSquare />, label: 'Inquiries', tab: 'inquiries' },
                    { icon: <FiDollarSign />, label: 'Payment', tab: 'payment' },
                ].map((item) => (
                    <motion.div whileHover={{ x: 5 }} key={item.tab}>
                        <Link
                            href={`/admin/${item.tab}`}
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
    )
}

export default AdminHeader;