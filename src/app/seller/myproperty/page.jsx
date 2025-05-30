'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FiPieChart, FiUser, FiLock, FiBell, FiBookmark,
    FiList, FiMessageSquare, FiDollarSign, FiPlus
} from "react-icons/fi";
import Link from 'next/link';
import { Rating } from '@mui/material';
import { TiPencil } from "react-icons/ti";
import { IoTrashOutline } from "react-icons/io5";

const Page = () => {
    const [activeTab, setActiveTab] = useState('myproperty');
    const [properties, setProperties] = useState([
        { id: 1, name: 'Luxury Villa House', date: '10/01/2025', status: 'active', views: 102, reviews: 6 },
        { id: 2, name: 'Modern Apartment', date: '09/01/2025', status: 'inactive', views: 45, reviews: 4 },
        { id: 3, name: 'Beach House', date: '08/01/2025', status: 'pending', views: 78, reviews: 5 }
    ]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'inactive': return 'bg-red-100 text-red-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const handleDelete = (id) => {
        setProperties(properties.filter(prop => prop.id !== id));
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
                    <div className="flex-1 flex-col">
                        <div className="relative overflow-hidden group p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 mb-6">
                            {/* Decorative background elements */}
                            <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-200 rounded-full opacity-20"></div>
                            <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-indigo-200 rounded-full opacity-20"></div>

                            <div className="flex items-center justify-between relative z-10">
                                <div>
                                    <p className="text-sm font-medium text-blue-600 mb-1">Manage Your Listings</p>
                                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                        My Properties
                                    </h2>
                                </div>

                                {/* Animated "Add New Property" button */}
                                <Link
                                    href="/seller/myproperty/addproperty"
                                    className="flex items-center px-6 py-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg text-white hover:shadow-xl transform transition-all duration-300 hover:scale-105 group/add-btn"
                                >
                                    <FiPlus className="mr-2 text-lg transform transition-transform duration-300 group-hover/add-btn:rotate-90" />
                                    <span className="text-sm font-medium">Add New Property</span>

                                    {/* Glowing effect */}
                                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover/add-btn:opacity-20 transition-opacity duration-300 bg-gradient-to-br from-white to-transparent"></div>
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
                            {/* <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-semibold text-gray-800">My Properties</h2>
                                <Link 
                                    to="/seller/myproperty/addproperty"
                                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    <FiPlus className="mr-2" /> Add New Property
                                </Link>
                            </div> */}

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Property</th>
                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Date Added</th>
                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Views</th>
                                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {properties.map((property) => (
                                            <tr key={property.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <img
                                                            src="https://placehold.co/100x100"
                                                            alt={property.name}
                                                            className="w-16 h-16 rounded-lg object-cover mr-4"
                                                        />
                                                        <div>
                                                            <div className="font-medium text-gray-900">{property.name}</div>
                                                            <div className="text-sm text-gray-500">Est St, 77 - Central Park South, NYC</div>
                                                            <div className="flex items-center mt-1">
                                                                <Rating
                                                                    value={property.reviews}
                                                                    readOnly
                                                                    size="small"
                                                                    className="text-yellow-500"
                                                                />
                                                                <span className="ml-2 text-sm text-gray-500">
                                                                    ({property.reviews} reviews)
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">{property.date}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(property.status)}`}>
                                                        {property.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">{property.views}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex space-x-2">
                                                        <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg">
                                                            <TiPencil className="text-lg" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(property.id)}
                                                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                                                        >
                                                            <IoTrashOutline className="text-lg" />
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