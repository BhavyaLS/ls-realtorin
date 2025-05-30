'use client'
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { Box, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { IoBedOutline } from "react-icons/io5";
import { LuBath } from "react-icons/lu";
import { LuSofa } from "react-icons/lu";
import { TfiArrowsCorner } from "react-icons/tfi";
import { RiHome6Line } from "react-icons/ri";
import { PiTrain } from "react-icons/pi";
import { SiGooglestreetview } from "react-icons/si";
import { GiPoliceOfficerHead } from "react-icons/gi";
import { PiParkDuotone } from "react-icons/pi";
import { BiDislike, BiLike } from "react-icons/bi";
import { LiaArrowsAltSolid, LiaBedSolid } from 'react-icons/lia';
import { AiOutlineHome } from 'react-icons/ai';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { GiCompass } from "react-icons/gi";
import { TbFridge } from "react-icons/tb";
import Loader from '@/app/(components)/loader';

const Page = () => {
    const params = useParams();
    const id = params?.id;
    const [property, setProperty] = useState(null);
    const [propertyImages, setPropertyImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [value, setValue] = useState(4);

    // Define common and type-specific fields
    const commonFields = [
        'title', 'price', 'description', 'location', 'list_under', 'status', 'amenities',
        'user_id', 'created_at', 'updated_at', 'latitude', 'longitude'
    ];
    const typeSpecificFields = {
        office: [
            'office_security_deposit', 'office_monthly_maintenance', 'office_brokerage', 'office_pantry',
            'office_seats', 'office_cabins', 'office_washrooms', 'office_furnishing_type', 'office_parking',
            'office_super_area', 'office_carpet_area', 'office_floor', 'office_total_floors',
            'office_lock_in_period', 'office_facing', 'office_age_of_construction', 'office_transaction_type'
        ],
        shop: [
            'shop_monthly_maintenance', 'shop_brokerage', 'shop_super_area', 'shop_carpet_area',
            'shop_overlooking', 'shop_lock_in_period', 'shop_furnishing_type', 'shop_parking',
            'shop_washrooms', 'shop_pantry', 'shop_age_of_construction', 'shop_transaction_type'
        ],
        flat: [
            'flat_developer_name', 'flat_project_name', 'flat_transaction_type', 'flat_ownership_type',
            'flat_property_type_category', 'flat_furnished_status', 'flat_rooms', 'flat_balconies',
            'flat_bathrooms', 'flat_super_area', 'flat_carpet_area', 'flat_floor', 'flat_total_floors',
            'flat_parking', 'flat_facing', 'flat_booking_amount', 'flat_deposit_amount', 'flat_brokerage',
            'flat_monthly_maintenance', 'flat_preference', 'flat_additional_rooms', 'flat_age_of_construction',
            'flat_available_from'
        ],
        pg: [
            'pg_price_range_from', 'pg_price_range_to', 'pg_security_deposit', 'pg_brokerage',
            'pg_sharing_count', 'pg_preference', 'pg_available_from', 'pg_age_of_construction', 'pg_house_rules'
        ],
        plot: [
            'plot_project_name', 'plot_area', 'plot_dimensions', 'plot_construction_done', 'plot_status',
            'plot_boundary_wall', 'plot_ownership_type', 'plot_overlooking', 'plot_transaction_type',
            'plot_floors_allowed', 'plot_booking_amount', 'plot_brokerage'
        ]
    };

    // Field labels for display
    const fieldLabels = {
        title: 'Title',
        price: 'Price',
        description: 'Description',
        location: 'Location',
        list_under: 'Transaction Type',
        status: 'Status',
        office_super_area: 'Super Area',
        office_carpet_area: 'Carpet Area',
        office_furnishing_type: 'Furnishing',
        office_parking: 'Parking',
        office_pantry: 'Pantry',
        office_monthly_maintenance: 'Monthly Maintenance',
        office_brokerage: 'Brokerage',
        office_lock_in_period: 'Lock-in Period',
        office_age_of_construction: 'Age of Construction',
        office_transaction_type: 'Transaction Type',
        shop_super_area: 'Super Area',
        shop_carpet_area: 'Carpet Area',
        shop_furnishing_type: 'Furnishing',
        shop_parking: 'Parking',
        shop_pantry: 'Pantry',
        shop_overlooking: 'Overlooking',
        shop_monthly_maintenance: 'Monthly Maintenance',
        shop_brokerage: 'Brokerage',
        shop_lock_in_period: 'Lock-in Period',
        shop_age_of_construction: 'Age of Construction',
        shop_transaction_type: 'Transaction Type',
        flat_super_area: 'Super Area',
        flat_carpet_area: 'Carpet Area',
        flat_furnished_status: 'Furnishing',
        flat_parking: 'Parking',
        flat_rooms: 'Bedrooms',
        flat_bathrooms: 'Bathrooms',
        flat_facing: 'Facing',
        flat_monthly_maintenance: 'Monthly Maintenance',
        flat_brokerage: 'Brokerage',
        flat_property_type_category: 'BHK Type',
        flat_age_of_construction: 'Age of Construction',
        flat_transaction_type: 'Transaction Type',
        pg_price_range_from: 'Price Range From',
        pg_price_range_to: 'Price Range To',
        pg_security_deposit: 'Security Deposit',
        pg_brokerage: 'Brokerage',
        pg_sharing_count: 'Sharing Count',
        pg_preference: 'Preference',
        pg_age_of_construction: 'Age of Construction',
        plot_area: 'Area',
        plot_overlooking: 'Overlooking',
        plot_ownership_type: 'Ownership Type',
        plot_transaction_type: 'Transaction Type',
        plot_brokerage: 'Brokerage'
    };

    useEffect(() => {
        const fetchProperty = async () => {
            console.log('Loading started:', loading);
            setLoading(true);
            setError(null);
            try {
                const start = Date.now();
                const response = await axios.get(`https://prop.logicspice.com/prop-backend-script/api/preperties/propertyDetail/${id || 15}`);
                console.log('API response:', response.data);
                const data = response.data;
                if (data.success && data.data && data.data.property) {
                    setProperty(data.data.property);
                    setPropertyImages(data.data.property_images?.map(img => img.file_path) || []);
                } else {
                    setError(data.message || 'Invalid API response');
                }
                // Ensure minimum loading time of 1 second
                const elapsed = Date.now() - start;
                if (elapsed < 1000) {
                    await new Promise(resolve => setTimeout(resolve, 1000 - elapsed));
                }
            } catch (err) {
                console.error('API error:', err);
                setError('Failed to fetch property details');
            } finally {
                console.log('Loading ended:', loading);
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id]);

    console.log('Rendering, loading:', loading);

    // Avoid accessing property before it's set
    const amenities = property ? JSON.parse(property.amenities || '[]') : [];
    const placeholderImage = 'https://placehold.co/800x400';

    // Get relevant fields for the property type
    const relevantFields = property ? [...commonFields, ...(typeSpecificFields[property.property_type] || [])] : [];
    const displayFields = relevantFields
        .filter(field => property && property[field] != null && field !== 'amenities' && field !== 'user_id' && field !== 'created_at' && field !== 'updated_at' && field !== 'latitude' && field !== 'longitude')
        .map(field => ({
            key: field,
            label: fieldLabels[field] || field.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
            value: typeof property[field] === 'boolean' ? (property[field] ? 'Yes' : 'No') : property[field]
        }));

    return (
        <>
            {loading ? (
                <Loader />
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : !property ? (
                <p className="text-center">No property found</p>
            ) : (
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="text-sm text-gray-500 mb-4">
                        <Link href="/search" className="hover:underline">Search</Link> &gt;
                        <span>{property.title}</span>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                        <div>
                            <h1 className="text-2xl font-bold text-black">{property.title}</h1>
                            <p className="text-gray-500">Marketed by User {property.user_id}</p>
                            <p className="text-gray-500">{property.location}</p>
                        </div>
                        <div className="text-left md:text-right mt-4 md:mt-0">
                            <p className="text-3xl font-bold text-blue-600">$ {property.price}</p>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2">Contact Seller</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        {propertyImages.length === 0 ? (
                            <div className="md:col-span-3">
                                <img src={placeholderImage} alt="No images available" className="w-full h-[400px] object-cover rounded" />
                            </div>
                        ) : propertyImages.length === 1 ? (
                            <div className="md:col-span-3">
                                <img src={propertyImages[0]} alt={property.title} className="w-full h-[400px] object-cover rounded" />
                            </div>
                        ) : (
                            <>
                                <div className="md:col-span-2">
                                    <img src={propertyImages[0] || placeholderImage} alt={property.title} className="w-full h-[400px] object-cover rounded" />
                                </div>
                                <div className="grid grid-rows-2 gap-4">
                                    {propertyImages[1] && (
                                        <img src={propertyImages[1]} alt="Additional view" className="w-full h-[196px] object-cover rounded" />
                                    )}
                                    {propertyImages[2] ? (
                                        <div className="relative">
                                            <img src={propertyImages[2]} alt="More views" className="w-full h-[196px] object-cover rounded" />
                                            {propertyImages.length > 3 && (
                                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
                                                    <p className="text-white text-lg">+ {propertyImages.length - 3} more</p>
                                                </div>
                                            )}
                                        </div>
                                    ) : propertyImages[1] ? (
                                        <div className="relative">
                                            <img src={propertyImages[1]} alt="Additional view" className="w-full h-[196px] object-cover rounded" />
                                        </div>
                                    ) : null}
                                </div>
                            </>
                        )}
                    </div>

                    <div className="flex flex-col text-black md:flex-row justify-between items-start md:items-center bg-gray-200 p-4 rounded-lg mb-4">
                        <div className="flex flex-wrap items-center gap-4">
                            {property[`${property.property_type}_super_area`] && (
                                <div className="flex items-center gap-2">
                                    <TfiArrowsCorner className="text-xl p-0.5 rounded border border-black" />
                                    <p>{property[`${property.property_type}_super_area`]}</p>
                                </div>
                            )}
                            {property[`${property.property_type}_furnishing_type`] && (
                                <div className="flex items-center gap-2">
                                    <TbFridge />
                                    <p>{property[`${property.property_type}_furnishing_type`]}</p>
                                </div>
                            )}
                            {property[`${property.property_type}_overlooking`] && (
                                <div className="flex items-center gap-2">
                                    <GiCompass />
                                    <p>Overlooking - {property[`${property.property_type}_overlooking`]}</p>
                                </div>
                            )}
                            {property[`${property.property_type}_pantry`] && (
                                <div className="flex items-center gap-2">
                                    <LuSofa />
                                    <p>{property[`${property.property_type}_pantry`] ? 'Pantry Available' : 'No Pantry'}</p>
                                </div>
                            )}
                            {property[`${property.property_type}_age_of_construction`] && (
                                <div className="flex items-center gap-2">
                                    <RiHome6Line />
                                    <p>Age: {property[`${property.property_type}_age_of_construction`]} years</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white p-4 border-b">
                        <h2 className="text-lg font-bold mb-2 text-black">Why should you consider this property?</h2>
                        <div className="flex flex-wrap gap-2">
                            {amenities.map((amenity, index) => (
                                <span key={index} className="bg-gray-200 text-gray-700 px-4 py-1.5 rounded-full">{amenity}</span>
                            ))}
                            {property[`${property.property_type}_overlooking`] && (
                                <span className="bg-gray-200 text-gray-700 px-4 py-1.5 rounded-full">{property[`${property.property_type}_overlooking`]}</span>
                            )}
                        </div>
                    </div>

                    <div className="bg-white p-4 border-b">
                        <h2 className="text-lg font-bold mb-2">Property Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {displayFields.map(field => (
                                <p key={field.key} className="text-gray-600">
                                    {field.label}: <span className="text-black font-medium">{field.value}</span>
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-4 border-b">
                        <h2 className="text-lg font-bold mb-2 text-black">About Property</h2>
                        <p className="text-gray-500">Address: {property.location}</p>
                        <p className="text-gray-500">Description: {property.description}</p>
                    </div>

                    <div className="bg-white p-4 border-b">
                        <h2 className="text-lg font-bold mb-2 text-black">Features</h2>
                        <div className="flex flex-wrap gap-2">
                            {amenities.map((amenity, index) => (
                                <span key={index} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full">{amenity}</span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white">
                        <div className="bg-white p-4">
                            <h2 className="text-xl font-semibold mb-4 text-black">Review and Ratings</h2>
                            <div className="flex flex-col md:flex-row border rounded-lg p-8 gap-3">
                                <div className="md:w-1/3 mb-4 md:mb-0 flex flex-col items-center">
                                    <div className="text-4xl font-bold text-black">
                                        4.0 <span className="text-lg text-gray-500">/5</span>
                                    </div>
                                    <Box sx={{ '& > legend': { mt: 2 } }}>
                                        <Rating name="read-only" value={value} readOnly emptyIcon={<StarIcon style={{ opacity: 0.90, color: "gray" }} fontSize="inherit" />} />
                                    </Box>
                                    <div className="text-gray-500 text-center mb-4">Average Rating<br />(5 Total Reviews)</div>
                                    <div className="gap-1 flex flex-col items-center w-full px-4">
                                        <div className="flex items-center w-full gap-2">
                                            <div className="w-4/5 bg-gray-200 rounded-full h-2.5">
                                                <div className="bg-gray-300 h-2.5 rounded-full"></div>
                                            </div>
                                            <div className="text-gray-500">5★</div>
                                        </div>
                                        <div className="flex items-center w-full gap-2">
                                            <div className="w-4/5 bg-gray-200 rounded-full h-2.5">
                                                <div className="bg-blue-500 h-2.5 rounded-full w-3/4"></div>
                                            </div>
                                            <div className="text-gray-500">4★</div>
                                        </div>
                                        <div className="flex items-center w-full gap-2">
                                            <div className="w-4/5 bg-gray-200 rounded-full h-2.5">
                                                <div className="bg-blue-500 h-2.5 rounded-full w-1/2"></div>
                                            </div>
                                            <div className="text-gray-500">3★</div>
                                        </div>
                                        <div className="flex items-center w-full gap-2">
                                            <div className="w-4/5 bg-gray-200 rounded-full h-2.5">
                                                <div className="bg-gray-300 h-2.5 rounded-full"></div>
                                            </div>
                                            <div className="text-gray-500">2★</div>
                                        </div>
                                        <div className="flex items-center w-full gap-2">
                                            <div className="w-4/5 bg-gray-200 rounded-full h-2.5">
                                                <div className="bg-gray-300 h-2.5 rounded-full"></div>
                                            </div>
                                            <div className="text-gray-500">1★</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-r-2 my-4"></div>
                                <div className="md:w-2/3 md:pl-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                        <div className="bg-gray-100 p-4 rounded-lg text-center flex flex-col items-center gap-1">
                                            <PiTrain className="bg-white text-gray-600 text-5xl rounded-full p-1.5" />
                                            <div className="text-lg font-semibold">4.0/5</div>
                                            <div className="text-gray-500">Connectivity</div>
                                        </div>
                                        <div className="bg-gray-100 p-4 rounded-lg text-center flex flex-col items-center gap-1">
                                            <SiGooglestreetview className="bg-white text-gray-600 text-5xl rounded-full p-1.5" />
                                            <div className="text-lg font-semibold">4.6/5</div>
                                            <div className="text-gray-500">Neighbourhood</div>
                                        </div>
                                        <div className="bg-gray-100 p-4 rounded-lg text-center flex flex-col items-center gap-1">
                                            <GiPoliceOfficerHead className="bg-white text-gray-600 text-5xl rounded-full p-1.5" />
                                            <div className="text-lg font-semibold">4.3/5</div>
                                            <div className="text-gray-500">Safety</div>
                                        </div>
                                        <div className="bg-gray-100 p-4 rounded-lg text-center flex flex-col items-center gap-1">
                                            <PiParkDuotone className="bg-white text-gray-600 text-5xl rounded-full p-1.5" />
                                            <div className="text-lg font-semibold">4.3/5</div>
                                            <div className="text-gray-500">Livability</div>
                                        </div>
                                    </div>
                                    <div className="text-lg font-semibold mb-2">Popular Mentions</div>
                                    <div className="flex items-center mb-4">
                                        <div className="w-2/3 bg-gray-200 h-2.5">
                                            <div className="bg-green-500 h-2.5 opacity-50"></div>
                                        </div>
                                        <div className="ml-2 text-sm text-green-500 font-semibold">100% Positive Mentions</div>
                                    </div>
                                    <div className="flex space-x-4">
                                        <div className="flex items-center gap-1.5 text-lg text-gray-500">
                                            <BiLike />
                                            Likes
                                        </div>
                                        <div className="flex items-center gap-1.5 text-lg text-gray-500">
                                            <BiDislike />
                                            Dislikes
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 bg-white py-6 px-4 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-md border">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex flex-col items-start">
                                    <div className="bg-green-500 text-white px-2 py-1 rounded-lg flex items-center justify-center mb-2">4.0 ★</div>
                                    <div className="flex items-center gap-2.5">
                                        <p className="text-2xl py-2 px-3 rounded-full bg-blue-200">M</p>
                                        <div>
                                            <h3 className="text-lg font-semibold">Milestone Realty</h3>
                                            <p className="text-gray-500 text-sm">Agent</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm">10/01/2025</p>
                            </div>
                            <h4 className="text-lg font-semibold mb-2">Nice Project.</h4>
                            <p className="text-gray-700 text-sm">The project has an option view with amenities good security cctv cameras building on main road cosmopolitan society pet allowed higher floor Big gym Big pool.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md border">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex flex-col items-start">
                                    <div className="bg-yellow-500 text-white px-2 py-1 rounded-lg flex items-center justify-center mb-2">3.7 ★</div>
                                    <div className="flex items-center gap-2.5">
                                        <p className="text-2xl py-2 px-3 rounded-full bg-blue-200">A</p>
                                        <div>
                                            <h3 className="text-lg font-semibold">Allauddin</h3>
                                            <p className="text-gray-500 text-sm">Agent</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm">10/01/2025</p>
                            </div>
                            <h4 className="text-lg font-semibold mb-2">Nice Project.</h4>
                            <p className="text-gray-700 text-sm">The project has an option view with amenities good security cctv cameras building on main road cosmopolitan society pet allowed higher floor Big gym Big pool.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md border">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex flex-col items-start">
                                    <div className="bg-green-500 text-white px-2 py-1 rounded-lg flex items-center justify-center mb-2">4.0 ★</div>
                                    <div className="flex items-center gap-2.5">
                                        <p className="text-2xl py-2 px-3 rounded-full bg-blue-200">M</p>
                                        <div>
                                            <h3 className="text-lg font-semibold">Milestone Realty</h3>
                                            <p className="text-gray-500 text-sm">Agent</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm">10/01/2025</p>
                            </div>
                            <h4 className="text-lg font-semibold mb-2">Nice Project.</h4>
                            <p className="text-gray-700 text-sm">The project has an option view with amenities good security cctv cameras building on main road cosmopolitan society pet allowed higher floor Big gym Big pool.</p>
                        </div>
                        <div className="mt-6 flex items-center justify-center w-full col-span-full">
                            <a href="#" className="text-blue-600 font-semibold">Show all 17 Reviews</a>
                            <button className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg">Write a review</button>
                        </div>
                    </div>

                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-4">Recent Properties</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-white p-3 rounded-xl shadow-md overflow-hidden border-2 hover:border-[#0073E1]">
                                <div className="relative">
                                    <img alt={property.title} className="w-full h-48 rounded-xl object-cover" src={propertyImages[0] || 'https://placehold.co/600x400'} />
                                    <div className="absolute right-3 bottom-0 flex gap-1 items-center text-white mb-2">
                                        <FaMapMarkerAlt />
                                        {property.location}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h2 className="text-xl font-bold mb-2">{property.title}</h2>
                                    <p className="text-blue-500 text-lg font-semibold mb-2">$ {property.price}</p>
                                    <p className="text-gray-600 mb-2">{property.description}</p>
                                    <div className="flex gap-1 items-center text-gray-600 mb-1">
                                        <AiOutlineHome />
                                        {property.property_type.charAt(0).toUpperCase() + property.property_type.slice(1)}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1 text-gray-600">
                                            <LiaArrowsAltSolid className="rotate-45" />
                                            {property[`${property.property_type}_super_area`] || 'N/A'}
                                        </div>
                                        <div className="flex items-center gap-1 text-gray-600">
                                            <LiaBedSolid />
                                            {property.flat_property_type_category || 'N/A'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Page;