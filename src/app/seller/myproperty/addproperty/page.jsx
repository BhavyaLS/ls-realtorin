'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FiPieChart, FiUser, FiLock, FiBell, FiBookmark,
  FiList, FiMessageSquare, FiDollarSign, FiPlus,
  FiHome, FiMapPin, FiCheckSquare, FiUpload
} from 'react-icons/fi';
import { ImCross } from "react-icons/im";
import axios from 'axios';
import BaseApi from '@/app/(api)/BaseAPI';
import Cookies from 'js-cookie';
// Property Type Configuration
const propertyTypes = [
  { value: 'flat', label: 'Flat/House/Villa' },
  { value: 'pg', label: 'Paying Guest (PG)' },
  { value: 'plot', label: 'Plot' },
  { value: 'office', label: 'Office Space' },
  { value: 'shop', label: 'Shop/Showroom' },
];

// Amenities Configuration
const amenitiesConfig = {
  flat: {
    'Basic Amenities': [
      'Power Backup', 'Water Supply', 'Security', 'Lift', 'Car Parking',
      'Maintenance Staff', 'Intercom Facility', 'Piped Gas'
    ],
    'Lifestyle Amenities': [
      'Clubhouse', 'Gymnasium', 'Swimming Pool', 'Banquet Hall',
      'Children’s Play Area', 'Garden/Lawn', 'Indoor Games',
      'Wi-Fi Connectivity', 'RO Water System', 'CCTV Surveillance'
    ],
    'Advanced Amenities': [
      'Central RO Water System', 'Reserved Parking', 'Visitor Parking',
      'Gated Community', 'Jogging Track', 'Rainwater Harvesting',
      'Fire Safety Systems', 'Multipurpose Court', 'Creche/Day Care'
    ]
  },
  pg: {
    'Essential Amenities': [
      'Fully Furnished Rooms', 'Nutritious Daily Meals', 'Laundry Facilities',
      'Regular Housekeeping', 'High-Speed Wi-Fi'
    ],
    'Luxury and Premium Amenities': [
      'Air Conditioning', 'Attached Bathrooms', '24/7 Security',
      'Power Backup', 'Gym and Fitness Facilities', 'TV and Entertainment'
    ],
    'Wellness and Lifestyle Amenities': [
      'Indoor Games', 'Rooftop Garden', 'Home Theater'
    ]
  },
  plot: {
    'Infrastructure': [
      'Electricity Supply', 'Water Supply', 'Sewage & Drainage',
      'Road Access', 'Gated Community', 'Street Lighting'
    ],
    'Community': [
      'Parks and Open Spaces', 'Jogging Tracks', 'Clubhouse',
      'Children’s Play Area', 'Fitness Centers', 'Swimming Pool'
    ]
  },
  office: {
    'Workplace': [
      'Adjustable Desks', 'Good Ventilation', 'Fully Equipped Kitchen',
      'In-House Cafeteria', 'Private Offices', 'High-Speed Internet'
    ],
    'Safety': [
      '24/7 Security', 'Emergency Exit', 'First Aid Kits',
      'Fire Safety Systems', 'CCTV Surveillance'
    ]
  },
  shop: {
    'Facilities': [
      'Air Conditioning', 'Accessible Restrooms', 'Comfortable Seating',
      'High Speed Wi-Fi', 'Music System', 'Fitting Rooms'
    ],
    'Accessibility': [
      'Handicap Accessible', 'Elevator', 'Staff Lounge',
      'Security System', 'Fire Safety Equipment'
    ]
  }
};

const Page = () => {
  const [activeTab, setActiveTab] = useState('myproperty');
  const [formData, setFormData] = useState({
    propertyType: '',
    list_under: '',
    title: '',
    price: '',
    description: '',
    status: '',
    location: '',
    amenities: [],
    files: [],
    flat: {
      developerName: '',
      projectName: '',
      transactionType: '',
      ownershipType: '',
      propertyTypeCategory: '',
      furnishedStatus: '',
      rooms: '',
      balconies: '',
      bathrooms: '',
      superArea: '',
      carpetArea: '',
      floor: '',
      totalFloors: '',
      parking: '',
      facing: '',
      bookingAmount: '',
      depositAmount: '',
      brokerage: '',
      monthlyMaintenance: '',
      preference: '',
      additionalRooms: '',
      ageOfConstruction: '',
      availableFrom: '',
    },
    pg: {
      priceRangeFrom: '',
      priceRangeTo: '',
      securityDeposit: '',
      brokerage: '',
      sharingCount: '',
      preference: '',
      availableFrom: '',
      ageOfConstruction: '',
      houseRules: {
        curfew: '',
        visitors: '',
        smoking: '',
        noticePeriod: '',
      },
    },
    plot: {
      projectName: '',
      plotArea: '',
      dimensions: '',
      constructionDone: '',
      status: '',
      boundaryWall: '',
      ownershipType: '',
      overlooking: '',
      transactionType: '',
      floorsAllowed: '',
      bookingAmount: '',
      brokerage: '',
    },
    office: {
      securityDeposit: '',
      monthlyMaintenance: '',
      brokerage: '',
      pantry: false,
      seats: '',
      cabins: '',
      washrooms: '',
      furnishingType: '',
      parking: '',
      superArea: '',
      carpetArea: '',
      floor: '',
      totalFloors: '',
      lockInPeriod: '',
      facing: '',
      ageOfConstruction: '',
      transactionType: '',
    },
    shop: {
      monthlyMaintenance: '',
      brokerage: '',
      superArea: '',
      carpetArea: '',
      overlooking: '',
      lockInPeriod: '',
      furnishingType: '',
      parking: '',
      washrooms: '',
      pantry: false,
      ageOfConstruction: '',
      transactionType: '',
    },
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const parts = name.split('.');
    setFormData((prev) => {
      let newState = { ...prev };
      let target = newState;
      parts.forEach((part, index) => {
        if (index < parts.length - 1) {
          target[part] = { ...target[part] };
          target = target[part];
        } else {
          target[part] = value;
        }
      });
      return newState;
    });
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const amenities = checked
        ? [...prev.amenities, value]
        : prev.amenities.filter((amenity) => amenity !== value);
      return { ...prev, amenities };
    });
    setErrors((prev) => ({ ...prev, amenities: '' }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, ...files],
    }));
    setErrors((prev) => ({ ...prev, files: '' }));
  };

  const handleFileRemove = (index) => {
    setFormData((prev) => {
      const updatedFiles = prev.files.filter((_, i) => i !== index);
      return { ...prev, files: updatedFiles };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.propertyType) newErrors.propertyType = 'Property type is required';
    if (!formData.list_under) newErrors.list_under = 'List under is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.status) newErrors.status = 'Property status is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (formData.files.length === 0) newErrors.files = 'At least one image/video is required';
    if (formData.amenities.length === 0) newErrors.amenities = 'At least one amenity is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formDataObj = new FormData();

    // Append common fields
    formDataObj.append('property_type', formData.propertyType);
    formDataObj.append('list_under', formData.list_under);
    formDataObj.append('title', formData.title);
    formDataObj.append('price', formData.price);
    formDataObj.append('description', formData.description);
    formDataObj.append('status', formData.status);
    formDataObj.append('location', formData.location);
    formData.amenities.forEach(amenity => {
      formDataObj.append('amenities[]', amenity);
    });
    // formDataObj.append('amenities', JSON.stringify(formData.amenities));

    // Append property-specific fields
    const propertyType = formData.propertyType;
    const specificFields = formData[propertyType];
    if (specificFields) {
      Object.entries(specificFields).forEach(([key, value]) => {
        const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
        const apiKey = `${propertyType}_${snakeKey}`;
        // Handle nested objects (e.g., pg.houseRules)
        if (typeof value === 'object' && value !== null) {
          Object.entries(value).forEach(([nestedKey, nestedValue]) => {
            const nestedSnakeKey = nestedKey.replace(/([A-Z])/g, '_$1').toLowerCase();
            formDataObj.append(`${apiKey}_${nestedSnakeKey}`, nestedValue);
          });
        } else {
          formDataObj.append(apiKey, value);
        }
      });
    }

    // Append media files
    formData.files.forEach((file) => {
      formDataObj.append('media_files', file);
    });

    try {
      const response = await axios.post(`${BaseApi}/preperties/addProperty`, formDataObj, {
        headers: {
          Authorization: `Bearer ${Cookies.get('seller_token')}`,
        }
      });
      const data = await response.json();
      if (data.success) {
        console.log('Property added successfully:', data);
        // Redirect or show success message
      } else {
        console.error('Error adding property:', data.message);
        // Show error message
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const renderPropertySpecificFields = () => {
    switch (formData.propertyType) {
      case 'flat':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Developer Name</label>
              <input
                name="flat.developerName"
                value={formData.flat.developerName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
              <input
                name="flat.projectName"
                value={formData.flat.projectName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Type</label>
              <select
                name="flat.transactionType"
                value={formData.flat.transactionType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              >
                <option value="">Select Type</option>
                <option value="New">New</option>
                <option value="Resale">Resale</option>
                <option value="Rent">Rent</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ownership Type</label>
              <select
                name="flat.ownershipType"
                value={formData.flat.ownershipType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              >
                <option value="">Select Ownership</option>
                <option value="Freehold">Freehold</option>
                <option value="Leasehold">Leasehold</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Type Category</label>
              <select
                name="flat.propertyTypeCategory"
                value={formData.flat.propertyTypeCategory}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              >
                <option value="">Select Category</option>
                <option value="1RK">1RK</option>
                <option value="1BHK">1BHK</option>
                <option value="2BHK">2BHK</option>
                <option value="3BHK">3BHK</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Furnished Status</label>
              <select
                name="flat.furnishedStatus"
                value={formData.flat.furnishedStatus}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              >
                <option value="">Select Status</option>
                <option value="Fully-Furnished">Fully-Furnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
                <option value="Unfurnished">Unfurnished</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">No. of Rooms</label>
              <input
                type="number"
                name="flat.rooms"
                value={formData.flat.rooms}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">No. of Balconies</label>
              <input
                type="number"
                name="flat.balconies"
                value={formData.flat.balconies}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">No. of Bathrooms</label>
              <input
                type="number"
                name="flat.bathrooms"
                value={formData.flat.bathrooms}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Super Area</label>
              <input
                name="flat.superArea"
                value={formData.flat.superArea}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Carpet Area</label>
              <input
                name="flat.carpetArea"
                value={formData.flat.carpetArea}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Floor</label>
              <input
                type="number"
                name="flat.floor"
                value={formData.flat.floor}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Floors</label>
              <input
                type="number"
                name="flat.totalFloors"
                value={formData.flat.totalFloors}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Parking</label>
              <input
                type="number"
                name="flat.parking"
                value={formData.flat.parking}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Facing</label>
              <select
                name="flat.facing"
                value={formData.flat.facing}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              >
                <option value="">Select Facing</option>
                <option value="East">East</option>
                <option value="West">West</option>
                <option value="North">North</option>
                <option value="South">South</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Booking Amount</label>
              <input
                name="flat.bookingAmount"
                value={formData.flat.bookingAmount}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Deposit Amount</label>
              <input
                name="flat.depositAmount"
                value={formData.flat.depositAmount}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brokerage</label>
              <input
                name="flat.brokerage"
                value={formData.flat.brokerage}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Maintenance</label>
              <input
                name="flat.monthlyMaintenance"
                value={formData.flat.monthlyMaintenance}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preference</label>
              <select
                name="flat.preference"
                value={formData.flat.preference}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              >
                <option value="">Select Preference</option>
                <option value="Bachelor's">Bachelor's</option>
                <option value="Family">Family</option>
                <option value="Any">Any</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Rooms</label>
              <input
                name="flat.additionalRooms"
                value={formData.flat.additionalRooms}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
                placeholder="e.g., Study, Servant Room"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Available From</label>
              <input
                type="date"
                name="flat.availableFrom"
                value={formData.flat.availableFrom}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
          </div>
        );
      case 'pg':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range From</label>
              <input
                type="number"
                name="pg.priceRangeFrom"
                value={formData.pg.priceRangeFrom}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range To</label>
              <input
                type="number"
                name="pg.priceRangeTo"
                value={formData.pg.priceRangeTo}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Security Deposit</label>
              <input
                type="number"
                name="pg.securityDeposit"
                value={formData.pg.securityDeposit}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brokerage</label>
              <input
                type="number"
                name="pg.brokerage"
                value={formData.pg.brokerage}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sharing Count</label>
              <input
                type="number"
                name="pg.sharingCount"
                value={formData.pg.sharingCount}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preference</label>
              <select
                name="pg.preference"
                value={formData.pg.preference}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              >
                <option value="">Select Preference</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Working Professionals">Working Professionals</option>
                <option value="Any">Any</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Available From</label>
              <input
                type="date"
                name="pg.availableFrom"
                value={formData.pg.availableFrom}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age of Construction</label>
              <input
                type="number"
                name="pg.ageOfConstruction"
                value={formData.pg.ageOfConstruction}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div className="col-span-full">
              <h3 className="text-lg font-medium text-gray-800 mb-2">House Rules</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Curfew Timings</label>
                  <input
                    name="pg.houseRules.curfew"
                    value={formData.pg.houseRules.curfew}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Visitors</label>
                  <input
                    name="pg.houseRules.visitors"
                    value={formData.pg.houseRules.visitors}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Smoking</label>
                  <input
                    name="pg.houseRules.smoking"
                    value={formData.pg.houseRules.smoking}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notice Period</label>
                  <input
                    name="pg.houseRules.noticePeriod"
                    value={formData.pg.houseRules.noticePeriod}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 'plot':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
              <input
                name="plot.projectName"
                value={formData.plot.projectName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Plot Area</label>
              <input
                name="plot.plotArea"
                value={formData.plot.plotArea}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dimensions</label>
              <input
                name="plot.dimensions"
                value={formData.plot.dimensions}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Construction Done</label>
              <input
                name="plot.constructionDone"
                value={formData.plot.constructionDone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <input
                name="plot.status"
                value={formData.plot.status}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Boundary Wall</label>
              <input
                name="plot.boundaryWall"
                value={formData.plot.boundaryWall}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ownership Type</label>
              <select
                name="plot.ownershipType"
                value={formData.plot.ownershipType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              >
                <option value="">Select Ownership</option>
                <option value="Freehold">Freehold</option>
                <option value="Leasehold">Leasehold</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Overlooking</label>
              <input
                name="plot.overlooking"
                value={formData.plot.overlooking}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Type</label>
              <select
                name="plot.transactionType"
                value={formData.plot.transactionType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              >
                <option value="">Select Type</option>
                <option value="New">New</option>
                <option value="Resale">Resale</option>
                <option value="Rent">Rent</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Floors Allowed</label>
              <input
                name="plot.floorsAllowed"
                value={formData.plot.floorsAllowed}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Booking Amount</label>
              <input
                name="plot.bookingAmount"
                value={formData.plot.bookingAmount}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brokerage</label>
              <input
                name="plot.brokerage"
                value={formData.plot.brokerage}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
          </div>
        );
      case 'office':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Security Deposit</label>
              <input
                name="office.securityDeposit"
                value={formData.office.securityDeposit}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Maintenance</label>
              <input
                name="office.monthlyMaintenance"
                value={formData.office.monthlyMaintenance}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brokerage</label>
              <input
                name="office.brokerage"
                value={formData.office.brokerage}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pantry</label>
              <input
                type="checkbox"
                name="office.pantry"
                checked={formData.office.pantry}
                onChange={(e) => handleInputChange({ target: { name: 'office.pantry', value: e.target.checked } })}
                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Seats</label>
              <input
                name="office.seats"
                value={formData.office.seats}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cabins</label>
              <input
                name="office.cabins"
                value={formData.office.cabins}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Washrooms</label>
              <input
                name="office.washrooms"
                value={formData.office.washrooms}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Furnishing Type</label>
              <select
                name="office.furnishingType"
                value={formData.office.furnishingType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              >
                <option value="">Select Type</option>
                <option value="Fully-Furnished">Fully-Furnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
                <option value="Unfurnished">Unfurnished</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Parking</label>
              <input
                name="office.parking"
                value={formData.office.parking}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Super Area</label>
              <input
                name="office.superArea"
                value={formData.office.superArea}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Carpet Area</label>
              <input
                name="office.carpetArea"
                value={formData.office.carpetArea}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Floor</label>
              <input
                name="office.floor"
                value={formData.office.floor}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Floors</label>
              <input
                name="office.totalFloors"
                value={formData.office.totalFloors}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lock-In Period</label>
              <input
                name="office.lockInPeriod"
                value={formData.office.lockInPeriod}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Facing</label>
              <select
                name="office.facing"
                value={formData.office.facing}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              >
                <option value="">Select Facing</option>
                <option value="East">East</option>
                <option value="West">West</option>
                <option value="North">North</option>
                <option value="South">South</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age of Construction</label>
              <input
                type="number"
                name="office.ageOfConstruction"
                value={formData.office.ageOfConstruction}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Type</label>
              <select
                name="office.transactionType"
                value={formData.office.transactionType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              >
                <option value="">Select Type</option>
                <option value="New">New</option>
                <option value="Resale">Resale</option>
                <option value="Rent">Rent</option>
              </select>
            </div>
          </div>
        );
      case 'shop':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Maintenance</label>
              <input
                name="shop.monthlyMaintenance"
                value={formData.shop.monthlyMaintenance}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brokerage</label>
              <input
                name="shop.brokerage"
                value={formData.shop.brokerage}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Super Area</label>
              <input
                name="shop.superArea"
                value={formData.shop.superArea}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Carpet Area</label>
              <input
                name="shop.carpetArea"
                value={formData.shop.carpetArea}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Overlooking</label>
              <input
                name="shop.overlooking"
                value={formData.shop.overlooking}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lock-In Period(In Years)</label>
              <input
                name="shop.lockInPeriod"
                value={formData.shop.lockInPeriod}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Furnishing Type</label>
              <select
                name="shop.furnishingType"
                value={formData.shop.furnishingType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              >
                <option value="">Select Type</option>
                <option value="Fully-Furnished">Fully-Furnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
                <option value="Unfurnished">Unfurnished</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Parking</label>
              <input
                name="shop.parking"
                value={formData.shop.parking}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Washrooms</label>
              <input
                name="shop.washrooms"
                value={formData.shop.washrooms}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pantry</label>
              <input
                type="checkbox"
                name="shop.pantry"
                checked={formData.shop.pantry}
                onChange={(e) => handleInputChange({ target: { name: 'shop.pantry', value: e.target.checked } })}
                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age of Construction</label>
              <input
                type="number"
                name="shop.ageOfConstruction"
                value={formData.shop.ageOfConstruction}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Type</label>
              <select
                name="shop.transactionType"
                value={formData.shop.transactionType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
              >
                <option value="">Select Type</option>
                <option value="New">New</option>
                <option value="Resale">Resale</option>
                <option value="Rent">Rent</option>
              </select>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderAmenities = () => {
    if (!formData.propertyType || !amenitiesConfig[formData.propertyType]) return null;
    return Object.entries(amenitiesConfig[formData.propertyType]).map(([category, amenities]) => (
      <div key={category} className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">{category}</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {amenities.map((amenity) => (
            <label key={amenity} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={amenity}
                checked={formData.amenities.includes(amenity)}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">{amenity}</span>
            </label>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-lg border border-gray-200"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Property</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Property Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${errors.propertyType ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-blue-500'
                        }`}
                    >
                      <option value="">Select property type</option>
                      {propertyTypes.map((type) => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                    {errors.propertyType && <p className="text-red-500 text-sm mt-1">{errors.propertyType}</p>}
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${errors.title ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-blue-500'
                        }`}
                      placeholder="Luxury Villa House"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">List Under<span className="text-red-500">*</span></label>
                    <select
                      name="list_under"
                      value={formData.list_under}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${errors.list_under ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-blue-500'
                        }`}
                    >
                      <option value="">Select Type</option>
                      <option value="Buy">Buy</option>
                      <option value="Rent">Rent</option>
                      <option value="Lease">Lease</option>
                    </select>
                    {errors.list_under && <p className="text-red-500 text-sm mt-1">{errors.list_under}</p>}

                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${errors.price ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-blue-500'
                        }`}
                      placeholder="USD"
                    />
                    {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${errors.status ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-blue-500'
                        }`}
                    >
                      <option value="">Select status</option>
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                    </select>
                    {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
                  </div>

                  {/* Description */}
                  <div className="col-span-full">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 h-32 ${errors.description ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-blue-500'
                        }`}
                      placeholder="Describe your property"
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                  </div>

                  {/* Location */}
                  <div className="col-span-full">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center">
                      <FiMapPin className="text-gray-400 mr-2" />
                      <input
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${errors.location ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-blue-500'
                          }`}
                        placeholder="Enter property address"
                      />
                    </div>
                    {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                  </div>

                  {/* Property Specific Fields */}
                  {formData.propertyType && (
                    <div className="col-span-full">
                      {renderPropertySpecificFields()}
                    </div>
                  )}

                  {/* Amenities */}
                  <div className="col-span-full">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amenities <span className="text-red-500">*</span>
                    </label>
                    {renderAmenities()}
                    {errors.amenities && <p className="text-red-500 text-sm mt-1">{errors.amenities}</p>}
                  </div>

                  {/* File Upload */}
                  <div className="col-span-full">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Media <span className="text-red-500">*</span>
                    </label>
                    <div className={`border-2 border-dashed rounded-lg p-8 text-center ${errors.files ? 'border-red-500' : 'border-gray-300'
                      }`}>
                      <label className="cursor-pointer">
                        <FiUpload className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                        <p className="text-gray-600">
                          Drag & drop files or <span className="text-blue-600">browse</span>
                        </p>
                        <input
                          type="file"
                          className="hidden"
                          multiple
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                    {errors.files && <p className="text-red-500 text-sm mt-1">{errors.files}</p>}
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      {formData.files.map((file, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index}`}
                            className="h-32 w-full object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => handleFileRemove(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                          >
                            <ImCross className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
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
                    Submit Property
                  </motion.button>
                  <Link
                    href="/seller/myproperty"
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
  );
};

export default Page;