'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiPieChart, FiUser, FiLock, FiBell, FiBookmark,
  FiList, FiMessageSquare, FiDollarSign, FiSave
} from "react-icons/fi";
import Link from 'next/link';

const Page = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [formData, setFormData] = useState({
        name: 'Michael Oliver',
        email: 'michael.oliver@gmail.com',
        phone: '(213) 515-1234',
        businessName: 'Real Estate',
        businessRole: 'Broker',
        country: 'United States of America',
        cityState: 'California, USA',
        postalCode: 'ERT 62574',
        reraId: 'AS564178969'
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
        if (!formData.businessRole.trim()) newErrors.businessRole = 'Business role is required';
        if (!formData.country.trim()) newErrors.country = 'Country is required';
        if (!formData.cityState.trim()) newErrors.cityState = 'City/State is required';
        if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
        if (!formData.reraId.trim()) newErrors.reraId = 'Rera ID is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Submit logic
            console.log('Form submitted:', formData);
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
                                        className={`flex items-center p-3 rounded-lg text-sm ${
                                            activeTab === item.tab 
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
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-6 rounded-lg border border-gray-200"
                        >
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Profile</h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Personal Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                                        Personal Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Full Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-2 border text-black rounded-lg focus:ring-2 focus:outline-none ${
                                                    errors.name ? 'border-red-500 focus:ring-red-500' 
                                                    : 'border-gray-300 focus:ring-blue-500'
                                                }`}
                                            />
                                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-2 text-black border rounded-lg focus:ring-2 focus:outline-none ${
                                                    errors.email ? 'border-red-500 focus:ring-red-500' 
                                                    : 'border-gray-300 focus:ring-blue-500'
                                                }`}
                                            />
                                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Phone <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-2 border text-black rounded-lg focus:ring-2 focus:outline-none ${
                                                    errors.phone ? 'border-red-500 focus:ring-red-500' 
                                                    : 'border-gray-300 focus:ring-blue-500'
                                                }`}
                                            />
                                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Business Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                                        Business Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Business Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                name="businessName"
                                                value={formData.businessName}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-2 text-black border rounded-lg focus:ring-2 focus:outline-none ${
                                                    errors.businessName ? 'border-red-500 focus:ring-red-500' 
                                                    : 'border-gray-300 focus:ring-blue-500'
                                                }`}
                                            />
                                            {errors.businessName && <p className="text-red-500 text-sm mt-1">{errors.businessName}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Business Role <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                name="businessRole"
                                                value={formData.businessRole}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-2 text-black border rounded-lg focus:ring-2 focus:outline-none ${
                                                    errors.businessRole ? 'border-red-500 focus:ring-red-500' 
                                                    : 'border-gray-300 focus:ring-blue-500'
                                                }`}
                                            />
                                            {errors.businessRole && <p className="text-red-500 text-sm mt-1">{errors.businessRole}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Address Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                                        Address Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Country <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                name="country"
                                                value={formData.country}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-2 border rounded-lg text-black focus:ring-2 focus:outline-none ${
                                                    errors.country ? 'border-red-500 focus:ring-red-500' 
                                                    : 'border-gray-300 focus:ring-blue-500'
                                                }`}
                                            />
                                            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                City/State <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                name="cityState"
                                                value={formData.cityState}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-2 border text-black rounded-lg focus:ring-2 focus:outline-none ${
                                                    errors.cityState ? 'border-red-500 focus:ring-red-500' 
                                                    : 'border-gray-300 focus:ring-blue-500'
                                                }`}
                                            />
                                            {errors.cityState && <p className="text-red-500 text-sm mt-1">{errors.cityState}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Postal Code <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                name="postalCode"
                                                value={formData.postalCode}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-2 border text-black rounded-lg focus:ring-2 focus:outline-none ${
                                                    errors.postalCode ? 'border-red-500 focus:ring-red-500' 
                                                    : 'border-gray-300 focus:ring-blue-500'
                                                }`}
                                            />
                                            {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Rera ID <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                name="reraId"
                                                value={formData.reraId}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-2 border text-black rounded-lg focus:ring-2 focus:outline-none ${
                                                    errors.reraId ? 'border-red-500 focus:ring-red-500' 
                                                    : 'border-gray-300 focus:ring-blue-500'
                                                }`}
                                            />
                                            {errors.reraId && <p className="text-red-500 text-sm mt-1">{errors.reraId}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Form Actions */}
                                <div className="flex gap-4 mt-8">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        type="submit"
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                                    >
                                        <FiSave className="inline mr-2" /> Save Changes
                                    </motion.button>
                                    <Link
                                        href="/seller/profile"
                                        className="px-6 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600"
                                    >
                                        Cancel
                                    </Link>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page;