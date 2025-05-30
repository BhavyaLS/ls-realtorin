'use client'
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Link from 'next/link'; 
import { IoShareSocialOutline } from "react-icons/io5";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoBedOutline } from "react-icons/io5";
import { LuBath } from "react-icons/lu";
import { LuSofa } from "react-icons/lu";
import { TfiArrowsCorner } from "react-icons/tfi";
import { FaLocationDot } from "react-icons/fa6";
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import debounce from 'lodash/debounce';
import Loader from '../(components)/loader';
import Cookies from 'js-cookie';

const Page = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
    // const [favorites, setFavorites] = useState(JSON.parse(Cookies.get('favorites')) || []);

    const [favorites, setFavorites] = useState(() => {
  const favoritesCookie = Cookies.get('favorites');
  try {
    return favoritesCookie ? JSON.parse(favoritesCookie) : [];
  } catch (e) {
    console.warn('Error parsing favorites cookie:', e);
    return [];
  }
});

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [transactionType, setTransactionType] = useState('');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [bhk, setBhk] = useState('');
  const [size, setSize] = useState('');
  const [sort, setSort] = useState('');

  const propertiesPerPage = 10;

  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const defaultCenter = {
    lat: 19.0760, // Mumbai coordinates
    lng: 72.8777
  };

  // Sample markers for testing
  const sampleMarkers = [
    { position: { lat: 19.0760, lng: 72.8777 }, title: 'Sample Property 1' },
    { position: { lat: 19.0660, lng: 72.8677 }, title: 'Sample Property 2' }
  ];

  // Dropdown options
  const dropdowns = {
    list_under: { '': 'All', Buy: 'Buy', Rent: 'Rent', Lease: 'Lease' },
    property_type: { '': 'All', flat: 'Flat', pg: 'PG', plot: 'Plot', office: 'Office', shop: 'Shop' },
    flat_property_type_category: { '': 'All', '1BHK': '1BHK', '2BHK': '2BHK', '3BHK': '3BHK', '1RK': '1RK' },
    budgetOptions: ['', '5000', '10000', '20000', '50000', '100000'],
    sizeOptions: ['', '500 sq.ft', '1000 sq.ft', '2000 sq.ft', '3000 sq.ft']
  };

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      if (location) queryParams.append('location', location);
      if (budget) queryParams.append('budget', budget);
      if (propertyType) queryParams.append('property_type', propertyType);
      if (bhk) queryParams.append('bhk', bhk);
      if (size) queryParams.append('size', size.replace(' sq.ft', ''));
      if (transactionType) queryParams.append('list_under', transactionType);
      if (sort) {
        queryParams.append('sort_by', 'price');
        queryParams.append('order', sort === 'price_asc' ? 'asc' : 'desc');
      }
      queryParams.append('page', currentPage);

      const url = `https://prop.logicspice.com/prop-backend-script/api/preperties/propertyListing?${queryParams.toString()}`;
      const response = await axios.get(url);
      const data = response.data;

      console.log('API URL:', url);
      console.log('API Response:', data);

      if (data.success) {
        const fetchedProperties = data.data.properties || [];
        setProperties(fetchedProperties);
        setFilteredProperties(fetchedProperties);
        const total = data.data.total || fetchedProperties.length;
        setTotalPages(Math.max(Math.ceil(total / propertiesPerPage), 1));
      } else {
        setError(data.message || 'Failed to fetch properties');
        setProperties([]);
        setFilteredProperties([]);
      }
    } catch (err) {
      console.error('API Error:', err);
      setError('Failed to fetch properties. Please try again.');
      setProperties([]);
      setFilteredProperties([]);
    } finally {
      setLoading(false);
    }
  }, [transactionType, location, budget, propertyType, bhk, size, sort, currentPage]);

  // Client-side filtering and sorting
  useEffect(() => {
    let filtered = [...properties];
    if (location) {
      filtered = filtered.filter(prop => prop.location?.toLowerCase().includes(location.toLowerCase()));
    }
    if (budget) {
      filtered = filtered.filter(prop => parseFloat(prop.price) <= parseFloat(budget));
    }
    if (propertyType) {
      filtered = filtered.filter(prop => prop.property_type === propertyType);
    }
    if (bhk) {
      filtered = filtered.filter(prop => prop.flat_property_type_category === bhk);
    }
    if (size) {
      const sizeNum = parseInt(size.replace(' sq.ft', ''));
      filtered = filtered.filter(prop => parseInt(prop[`${prop.property_type}_super_area`] || 0) <= sizeNum);
    }
    if (transactionType) {
      filtered = filtered.filter(prop => prop.list_under === transactionType);
    }

    // Client-side sorting
    if (sort === 'price_asc') {
      filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sort === 'price_desc') {
      filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    setFilteredProperties(filtered);
    setTotalPages(Math.max(Math.ceil(filtered.length / propertiesPerPage), 1));
  }, [properties, transactionType, location, budget, propertyType, bhk, size, sort]);

  const debouncedFetch = useCallback(debounce(fetchProperties, 500), [fetchProperties]);

  useEffect(() => {
    debouncedFetch();
    return () => debouncedFetch.cancel();
  }, [debouncedFetch]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id];
      // localStorage.setItem('favorites', JSON.stringify(newFavorites));
      Cookies.set("favorites", JSON.stringify(newFavorites))
      return newFavorites;
    });
  };

  const handleFilterChange = (setter) => (e) => {
    setter(e.target.value);
    setCurrentPage(1);
  };

  // Safely parse amenities
  const parseAmenities = (amenities) => {
    if (!amenities) return [];
    if (Array.isArray(amenities)) return amenities;
    try {
      return JSON.parse(amenities);
    } catch (e) {
      console.warn('Invalid amenities format:', amenities);
      return [amenities];
    }
  };

  const markers = filteredProperties
    .filter(prop => prop.latitude && prop.longitude)
    .map(prop => ({
      position: { lat: parseFloat(prop.latitude), lng: parseFloat(prop.longitude) },
      title: prop.title
    }))
    .concat(sampleMarkers);

  const startIndex = (currentPage - 1) * propertiesPerPage;
  const paginatedProperties = filteredProperties.slice(startIndex, startIndex + propertiesPerPage);

  return (
    <div className='bg-white'>
      {loading ? (<Loader />) : (
      <div className="container  mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          <div className="lg:col-span-2 w-full flex flex-col sm:flex-row gap-2 border-2 border-gray-300 rounded-xl">
            <select
              className="w-full sm:w-1/3 bg-white text-black p-2 rounded-xl focus:outline-none font-medium"
              value={transactionType}
              onChange={handleFilterChange(setTransactionType)}
            >
              {Object.entries(dropdowns.list_under).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
            <div className="hidden sm:block py-2">
              <hr className="border-r-2 border-gray-400 h-full" />
            </div>
            <input
              className="p-2 focus:outline-none text-black w-full rounded-xl"
              placeholder="Location"
              type="text"
              value={location}
              onChange={handleFilterChange(setLocation)}
            />
          </div>
          <select
            className="border-2 border-gray-300 rounded-xl p-2 bg-white text-black focus:outline-none"
            value={budget}
            onChange={handleFilterChange(setBudget)}
          >
            {dropdowns.budgetOptions.map((opt) => (
              <option key={opt || 'all'} value={opt}>{opt || 'All Budgets'}</option>
            ))}
          </select>
          <select
            className="border-2 border-gray-300 bg-white text-black rounded-xl p-2 focus:outline-none"
            value={propertyType}
            onChange={handleFilterChange(setPropertyType)}
          >
            {Object.entries(dropdowns.property_type).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
          <select
            className="border-2 border-gray-300 rounded-xl p-2 bg-white text-black focus:outline-none"
            value={bhk}
            onChange={handleFilterChange(setBhk)}
          >
            {Object.entries(dropdowns.flat_property_type_category).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
          <select
            className="border-2 border-gray-300 rounded-xl p-2 bg-white text-black focus:outline-none"
            value={size}
            onChange={handleFilterChange(setSize)}
          >
            {dropdowns.sizeOptions.map((opt) => (
              <option key={opt || 'all'} value={opt}>{opt || 'All Sizes'}</option>
            ))}
          </select>
          <button
            className="bg-[#0073E1] hover:bg-blue-500 text-white rounded-xl font-roboto font-medium text-lg py-2 px-4"
            onClick={() => setCurrentPage(1)}
          >
            Search
          </button>
        </div>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center my-4 gap-4">
          <div className="flex gap-1.5 items-center">
            <p className="font-roboto font-medium text-lg text-black sm:text-xl">
              {filteredProperties.length} results
            </p>
            <div className="hidden sm:block py-1.5">
              <hr className="border-r border-black h-full" />
            </div>
            <p className="font-roboto font-medium text-black text-lg sm:text-xl">
              Properties in {location || 'All Locations'}
            </p>
          </div>
          <div className="w-full sm:w-auto min-w-[150px]">
            <select
              className="border border-gray-300 rounded-lg text-black bg-white p-2 w-full focus:outline-none"
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">Sort by</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Properties and Map */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-2/3 space-y-4">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <p className="text-red-500 text-center">{error}</p>
            ) : paginatedProperties.length === 0 ? (
              <p className="text-center text-black">No properties found. Try adjusting your filters.</p>
            ) : (
              paginatedProperties.map((property) => (
                <Link
                  href={`/propertydetails/${property.id}`}
                  key={property.id}
                  className="bg-white rounded-xl shadow-md p-4 border border-gray-200 hover:border-blue-400 flex flex-col sm:flex-row gap-4 transition ease-in-out duration-300 hover:scale-[1.02]"
                >
                  <div className="relative w-full sm:w-1/3">
                    <img
                      alt={property.title}
                      className="w-full h-48 sm:h-full object-cover rounded-lg"
                      src={property.first_image || 'https://via.placeholder.com/150'}
                    />
                  </div>
                  <div className="w-full sm:w-2/3">
                    <div className="flex justify-between items-center py-2 pr-2">
                      <h2 className="text-lg sm:text-xl text-black font-bold">{property.title}</h2>
                      <div className="flex items-center gap-4">
                        <IoShareSocialOutline className="text-xl" />
                        {favorites.includes(property.id) ? (
                          <FaHeart
                            className="text-xl text-[#0073E1]"
                            onClick={(e) => {
                              e.preventDefault();
                              toggleFavorite(property.id);
                            }}
                          />
                        ) : (
                          <FaRegHeart
                            className="text-xl"
                            onClick={(e) => {
                              e.preventDefault();
                              toggleFavorite(property.id);
                            }}
                          />
                        )}
                      </div>
                    </div>
                    <div className="text-gray-600 mb-2.5 text-sm sm:text-base">{property.description}</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2.5">
                      <div className="flex items-center text-black space-x-1">
                        <FaLocationDot />
                        <span className="text-sm">{property.location}</span>
                      </div>
                      {parseAmenities(property.amenities).length > 0 && (
                        <div className="flex items-center text-black space-x-1">
                          <LuSofa />
                          <span className="text-sm">{parseAmenities(property.amenities)[0]}</span>
                        </div>
                      )}
                      {(property.property_type === 'office' || property.property_type === 'shop') && (
                        <div className="flex items-center text-black space-x-1">
                          <TfiArrowsCorner className="text-lg p-0.5 rounded border border-black" />
                          <span className="text-sm">{property[`${property.property_type}_super_area`] || 'N/A'}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 pr-2 gap-2">
                      <p className="text-blue-600 text-lg font-bold">$ {property.price}</p>
                      <button className="bg-[#ECECEC] rounded px-4 py-2 flex items-center gap-2.5">
                        <img className="h-6 w-6 rounded-full" src="https://placehold.co/80x80" alt="" />
                        <p className="text-black font-medium text-sm">Contact Seller</p>
                      </button>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>

          <div className="w-full lg:w-1/3 h-[400px] rounded-xl shadow-lg overflow-hidden mt-4 lg:mt-0 flex items-center justify-center">
            {/* <LoadScript googleMapsApiKey="AIzaSyBqdy82sEIazQCEM3lajeKBYcYOzbJbt08">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={13}
              center={markers.length > 0 ? markers[0].position : defaultCenter}
            >
              {markers.map((marker, index) => (
                <Marker key={index} position={marker.position} title={marker.title} />
              ))}
            </GoogleMap>
          </LoadScript> */}
            <p className='text-center text-xl font-bold text-gray-700 '>Map Here!</p>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 sm:gap-3 mt-6 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`border border-gray-300 rounded text-black px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base ${currentPage === page ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
      )}
    </div>
  );
};

export default Page;