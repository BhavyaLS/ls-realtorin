'use client'
import React, { useState } from 'react'
import { FiBell, FiX } from 'react-icons/fi'
import { motion } from 'framer-motion';
const Page = () => {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            user: "Anna Kim",
            message: "Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus.",
            time: "03:40 AM",
            avatar: "https://storage.googleapis.com/a1aa/image/sgaCt5YZdIe8fxDAfFYEg3a1UHJA93nQe8mxWxzV2tg.jpg"
        },
        {
            id: 2,
            user: "John Doe",
            message: "Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo.",
            time: "02:15 PM",
            avatar: "https://placehold.co/100x100"
        }
    ]);

    const handleDelete = (id) => {
        setNotifications(notifications.filter(notification => notification.id !== id));
    };
    return (
        <div className="flex-1 flex-col py-3 pr-3">
            <div className="relative overflow-hidden group p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 mb-6">
                {/* Decorative background elements */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-200 rounded-full opacity-20"></div>
                <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-indigo-200 rounded-full opacity-20"></div>

                <div className="flex items-center justify-between relative z-10">
                    <div>
                        <p className="text-sm font-medium text-blue-600 mb-1">Stay Updated</p>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Notifications
                        </h2>
                    </div>

                    {/* Animated "Mark all as read" button */}
                    <button className="flex items-center px-4 py-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-md text-white hover:shadow-lg transform transition-all duration-300 hover:scale-105 group/read-btn">
                        <FiBell className="mr-2 text-lg transform transition-transform duration-300 group-hover/read-btn:-rotate-12" />
                        <span className="text-sm font-medium">Mark all as read</span>

                        {/* Glowing effect */}
                        <div className="absolute inset-0 rounded-lg opacity-0 group-hover/read-btn:opacity-20 transition-opacity duration-300 bg-gradient-to-br from-white to-transparent"></div>
                    </button>
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
                                <h2 className="text-2xl font-semibold text-gray-800">Notifications</h2>
                                <button className="text-blue-600 hover:text-blue-800 text-sm">
                                    Mark all as read
                                </button>
                            </div> */}

                <div className="space-y-4">
                    {notifications.map((notification) => (
                        <motion.div
                            key={notification.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start gap-4">
                                <img
                                    src={notification.avatar}
                                    alt={notification.user}
                                    className="w-12 h-12 rounded-lg object-cover"
                                />
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold text-gray-800">
                                                {notification.user}
                                            </h3>
                                            <p className="text-gray-600 text-sm mt-1">
                                                {notification.message}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(notification.id)}
                                            className="text-gray-400 hover:text-gray-600 p-1 -mt-2 -mr-2"
                                        >
                                            <FiX className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs text-gray-400">
                                            {notification.time}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}

export default Page;