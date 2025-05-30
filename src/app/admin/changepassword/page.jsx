'use client';
import React, { useState } from 'react'
import { FiLock } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Link from 'next/link';
const Page = () => {
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!formData.oldPassword.trim()) {
            newErrors.oldPassword = 'Old password is required';
        }

        if (!formData.newPassword.trim()) {
            newErrors.newPassword = 'New password is required';
        } else if (!passwordRegex.test(formData.newPassword)) {
            newErrors.newPassword = 'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character';
        }

        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = 'Confirm password is required';
        } else if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);

        if (validateForm()) {
            // Submit form logic here
            console.log('Form submitted:', formData);
            // Reset form after submission
            setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
            setErrors({});
            setIsSubmitted(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Real-time validation after first submission
        if (isSubmitted) {
            validateForm();
        }
    };
    return (
        <div className="flex-1 flex-col py-3 pr-3">
            <div className='relative overflow-hidden group p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 mb-6'>

                <div className='absolute -top-16 -right-16 w-32 h-32 bg-blue-200 rounded-full opacity-20'></div>
                <div className='absolute -bottom-8 -left-8 w-24 h-24 bg-indigo-200 rounded-full opacity-20'></div>

                <div className='flex items-center justify-between relative z-10'>
                    <div>
                        <p className='text-sm font-medium text-blue-600 mb-1'>Security Settings</p>
                        <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                            Change Password
                        </h1>
                    </div>


                    <div className='relative p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg animate-float'>
                        <FiLock className='text-3xl text-white transform rotate-45 transition-transform duration-500 group-hover:rotate-12' />


                        <div className='absolute inset-0 rounded-xl opacity-20 animate-pulse bg-gradient-to-br from-white to-transparent'></div>
                    </div>
                </div>


                <div className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-30'></div>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-lg border border-gray-200"
            >
                {/* <h2 className="text-2xl font-semibold text-gray-800 mb-6">Change Password</h2> */}

                <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Old Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="oldPassword"
                            type="password"
                            value={formData.oldPassword}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border ${errors.oldPassword ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg focus:ring-2 focus:ring-blue-500`}
                            placeholder="Enter old password"
                        />
                        {errors.oldPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.oldPassword}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            New Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="newPassword"
                            type="password"
                            value={formData.newPassword}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border ${errors.newPassword ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg focus:ring-2 focus:ring-blue-500`}
                            placeholder="Enter new password"
                        />
                        {errors.newPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg focus:ring-2 focus:ring-blue-500`}
                            placeholder="Confirm new password"
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                        )}
                    </div>

                    <div className="flex gap-4 mt-8">
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.05 }}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                        >
                            Update Password
                        </motion.button>
                        <Link
                            href="/seller/dashboard"
                            type="button"
                            className="px-6 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600"
                            onClick={() => {
                                setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
                                setErrors({});
                            }}
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}

export default Page;