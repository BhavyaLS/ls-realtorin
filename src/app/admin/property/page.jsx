'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    FiPieChart, FiUser, FiLock, FiBell, FiBookmark,
    FiList, FiMessageSquare, FiDollarSign, FiPlus, FiEye
} from "react-icons/fi";
import { ImCross } from "react-icons/im";
import Link from 'next/link';
import { Rating } from '@mui/material';
import { TiPencil } from "react-icons/ti";
import { IoTrashOutline } from "react-icons/io5";
import axios from 'axios';
import Cookies from 'js-cookie';

// Property Details Modal Component
const PropertyDetailsModal = ({ property, onClose }) => {
    if (!property) return null;

    const commonFields = [
        { label: 'Property Type', value: property.property_type || 'N/A' },
        { label: 'Title', value: property.title || 'N/A' },
        { label: 'Price', value: property.price ? `$${property.price}` : 'N/A' },
        { label: 'Location', value: property.location || 'N/A' },
        { label: 'Status', value: property.status || 'N/A' },
        { label: 'Description', value: property.description || 'N/A' },
    ];

    const renderTypeSpecificFields = () => {
        switch (property.property_type?.toLowerCase()) {
            case 'flat':
                return (
                    <div className="space-y-2 text-black grid grid-cols-2 gap-2">
                        <p><strong>Developer Name:</strong> {property.flat_developer_name || 'N/A'}</p>
                        <p><strong>Project Name:</strong> {property.flat_project_name || 'N/A'}</p>
                        <p><strong>Transaction Type:</strong> {property.flat_transaction_type || 'N/A'}</p>
                        <p><strong>Ownership Type:</strong> {property.flat_ownership_type || 'N/A'}</p>
                        <p><strong>Furnished Status:</strong> {property.flat_furnished_status || 'N/A'}</p>
                        <p><strong>Rooms:</strong> {property.flat_rooms || 'N/A'}</p>
                        <p><strong>Balconies:</strong> {property.flat_balconies || 'N/A'}</p>
                        <p><strong>Bathrooms:</strong> {property.flat_bathrooms || 'N/A'}</p>
                        <p><strong>Super Area:</strong> {property.flat_super_area || 'N/A'}</p>
                        <p><strong>Carpet Area:</strong> {property.flat_carpet_area || 'N/A'}</p>
                        <p><strong>Floor:</strong> {property.flat_floor || 'N/A'}</p>
                        <p><strong>Total Floors:</strong> {property.flat_total_floors || 'N/A'}</p>
                        <p><strong>Parking:</strong> {property.flat_parking || 'N/A'}</p>
                    </div>
                );
            case 'pg':
                return (
                    <div className="space-y-2 text-black grid grid-cols-2 gap-2">
                        <p><strong>Price Range From:</strong> {property.pg_price_range_from || 'N/A'}</p>
                        <p><strong>Price Range To:</strong> {property.pg_price_range_to || 'N/A'}</p>
                        <p><strong>Security Deposit:</strong> {property.pg_security_deposit || 'N/A'}</p>
                        <p><strong>Brokerage:</strong> {property.pg_brokerage || 'N/A'}</p>
                        <p><strong>Sharing Count:</strong> {property.pg_sharing_count || 'N/A'}</p>
                        <p><strong>Preference:</strong> {property.pg_preference || 'N/A'}</p>
                        <p><strong>Available From:</strong> {property.pg_available_from || 'N/A'}</p>
                        <p><strong>Age of Construction:</strong> {property.pg_age_of_construction || 'N/A'}</p>
                        <p><strong>House Rules:</strong> {property.pg_house_rules || 'N/A'}</p>
                    </div>
                );
            case 'plot':
                return (
                    <div className="space-y-2 text-black grid grid-cols-2 gap-2">
                        <p><strong>Project Name:</strong> {property.plot_project_name || 'N/A'}</p>
                        <p><strong>Plot Area:</strong> {property.plot_area || 'N/A'}</p>
                        <p><strong>Dimensions:</strong> {property.plot_dimensions || 'N/A'}</p>
                        <p><strong>Construction Done:</strong> {property.plot_construction_done || 'N/A'}</p>
                        <p><strong>Status:</strong> {property.plot_status || 'N/A'}</p>
                        <p><strong>Boundary Wall:</strong> {property.plot_boundary_wall || 'N/A'}</p>
                        <p><strong>Ownership Type:</strong> {property.plot_ownership_type || 'N/A'}</p>
                        <p><strong>Overlooking:</strong> {property.plot_overlooking || 'N/A'}</p>
                        <p><strong>Transaction Type:</strong> {property.plot_transaction_type || 'N/A'}</p>
                        <p><strong>Floors Allowed:</strong> {property.plot_floors_allowed || 'N/A'}</p>
                        <p><strong>Booking Amount:</strong> {property.plot_booking_amount || 'N/A'}</p>
                        <p><strong>Brokerage:</strong> {property.plot_brokerage || 'N/A'}</p>
                    </div>
                );
            case 'office':
                return (
                    <div className="space-y-2 text-black grid grid-cols-2 gap-2">
                        <p><strong>Security Deposit:</strong> {property.office_security_deposit || 'N/A'}</p>
                        <p><strong>Monthly Maintenance:</strong> {property.office_monthly_maintenance || 'N/A'}</p>
                        <p><strong>Brokerage:</strong> {property.office_brokerage || 'N/A'}</p>
                        <p><strong>Pantry:</strong> {property.office_pantry ? 'Yes' : 'No'}</p>
                        <p><strong>Seats:</strong> {property.office_seats || 'N/A'}</p>
                        <p><strong>Cabins:</strong> {property.office_cabins || 'N/A'}</p>
                        <p><strong>Washrooms:</strong> {property.office_washrooms || 'N/A'}</p>
                        <p><strong>Furnishing Type:</strong> {property.office_furnishing_type || 'N/A'}</p>
                        <p><strong>Parking:</strong> {property.office_parking || 'N/A'}</p>
                        <p><strong>Super Area:</strong> {property.office_super_area || 'N/A'}</p>
                        <p><strong>Carpet Area:</strong> {property.office_carpet_area || 'N/A'}</p>
                        <p><strong>Floor:</strong> {property.office_floor || 'N/A'}</p>
                        <p><strong>Total Floors:</strong> {property.office_total_floors || 'N/A'}</p>
                        <p><strong>Lock-In Period:</strong> {property.office_lock_in_period || 'N/A'}</p>
                        <p><strong>Facing:</strong> {property.office_facing || 'N/A'}</p>
                        <p><strong>Age of Construction:</strong> {property.office_age_of_construction || 'N/A'}</p>
                        <p><strong>Transaction Type:</strong> {property.office_transaction_type || 'N/A'}</p>
                    </div>
                );
            case 'shop':
                return (
                    <div className="space-y-2 text-black grid grid-cols-2 gap-2">
                        <p><strong>Monthly Maintenance:</strong> {property.shop_monthly_maintenance || 'N/A'}</p>
                        <p><strong>Brokerage:</strong> {property.shop_brokerage || 'N/A'}</p>
                        <p><strong>Super Area:</strong> {property.shop_super_area || 'N/A'}</p>
                        <p><strong>Carpet Area:</strong> {property.shop_carpet_area || 'N/A'}</p>
                        <p><strong>Overlooking:</strong> {property.shop_overlooking || 'N/A'}</p>
                        <p><strong>Lock-In Period:</strong> {property.shop_lock_in_period || 'N/A'}</p>
                        <p><strong>Furnishing Type:</strong> {property.shop_furnishing_type || 'N/A'}</p>
                        <p><strong>Parking:</strong> {property.shop_parking || 'N/A'}</p>
                        <p><strong>Washrooms:</strong> {property.shop_washrooms || 'N/A'}</p>
                    </div>
                );
            default:
                return <p className="text-gray-500">No specific details available for this property type.</p>;
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Property Details</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <ImCross className="text-lg" />
                    </button>
                </div>
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Common Details</h3>
                    <div className='grid grid-cols-2 gap-2'>
                        {commonFields.map((field, index) => (
                            <p key={index} className="mb-2 text-black"><strong>{field.label}:</strong> {field.value}</p>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Type-Specific Details</h3>

                        {renderTypeSpecificFields()}
                </div>
            </div>
        </div>
    );
};

const Page = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const getPropertyData = async (page = 1) => {
        try {
            setLoading(true);
            const response = await axios.get(`https://prop.logicspice.com/prop-backend-script/api/admin/preperties?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('admin_token')}`,
                },
            });
            if (response.data.success) {
                setProperties(response.data.data.properties);
                setTotalPages(response.data.data.last_page || 1);
            } else {
                setError('Failed to fetch properties');
            }
        } catch (error) {
            console.error('Error fetching properties:', error);
            setError('Failed to fetch properties');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPropertyData(currentPage);
    }, [currentPage]);

    const getStatusColor = (status) => {
        const lowerStatus = status.toLowerCase();
        switch (lowerStatus) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'inactive': return 'bg-red-100 text-red-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const handleDelete = (id) => {
        setProperties(properties.filter(prop => prop.id !== id));
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen w-full">
            <div className="container w-full mx-auto py-3">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex flex-col w-full">
                        <div className="relative overflow-hidden group p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 mb-6">
                            <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-200 rounded-full opacity-20"></div>
                            <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-indigo-200 rounded-full opacity-20"></div>
                            <div className="flex items-center justify-between relative z-10">
                                <div>
                                    <p className="text-sm font-medium text-blue-600 mb-1">Manage Your Listings</p>
                                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                        Properties
                                    </h2>
                                </div>
                                <Link
                                    href="/admin/property/addproperty"
                                    className="flex items-center px-6 py-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg text-white hover:shadow-xl transform transition-all duration-300 hover:scale-105 group/add-btn"
                                >
                                    <FiPlus className="mr-2 text-lg transform transition-transform duration-300 group-hover/add-btn:rotate-90" />
                                    <span className="text-sm font-medium">Add New Property</span>
                                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover/add-btn:opacity-20 transition-opacity duration-300 bg-gradient-to-br from-white to-transparent"></div>
                                </Link>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-30 animate-pulse-slow"></div>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-6 rounded-lg border border-gray-200"
                        >
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
                                        {properties.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="text-center py-4 text-gray-500">No properties found</td>
                                            </tr>
                                        ) : (
                                            properties.map((property) => (
                                                <tr key={property.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center">
                                                            <img
                                                                src={property.first_image || 'https://placehold.co/100x100'}
                                                                alt={property.title}
                                                                className="w-16 h-16 rounded-lg object-cover mr-4"
                                                            />
                                                            <div>
                                                                <div className="font-medium text-gray-900">{property.title}</div>
                                                                <div className="text-sm text-gray-500">{property.location}</div>
                                                                <div className="flex items-center mt-1">
                                                                    <Rating
                                                                        value={0}
                                                                        readOnly
                                                                        size="small"
                                                                        className="text-yellow-500"
                                                                    />
                                                                    <span className="ml-2 text-sm text-gray-500">(0 reviews)</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">
                                                        {new Date(property.created_at).toLocaleDateString('en-US', {
                                                            month: '2-digit',
                                                            day: '2-digit',
                                                            year: 'numeric'
                                                        })}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(property.status)}`}>
                                                            {property.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">0</td>
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
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedProperty(property);
                                                                    setIsModalOpen(true);
                                                                }}
                                                                className="p-2 text-green-600 hover:bg-green-100 rounded-lg"
                                                            >
                                                                <FiEye className="text-lg" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex justify-center mt-4 space-x-2">
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                                >
                                    Previous
                                </button>
                                <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <PropertyDetailsModal
                    property={selectedProperty}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedProperty(null);
                    }}
                />
            )}
        </div>
    );
};

export default Page;