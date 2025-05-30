// 'use client'
// import React, { useState } from 'react';
// import { IoIosArrowDown } from "react-icons/io";
// import Link from 'next/link';
// import Image from 'next/image'
// import { FaBars } from "react-icons/fa";
// const Header = () => {
//     const [menuOpen, setMenuOpen] = useState(false);

//     return (
//         <header className="bg-white shadow">
//             <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//                 <Link href="/" className="flex items-center gap-3">
//                     <Image alt="Logo" width={140} height={130} className="h-10" src="/logo.png" />
//                     {/* <span className="font-cambria text-[#2D2D2D] font-normal text-[34px] leading-[39.86px] tracking-normal">
//                         Real Estate
//                     </span> */}
//                 </Link>

//                 {/* Navigation */}
//                 <nav className="hidden lg:flex items-center gap-6">
//                     <Link  className="font-inter text-black font-semibold text-[16px] leading-[21.79px] tracking-wide hover:text-red-600" href="/aboutus">About Us</Link>
//                     {/* <Link className="font-inter font-semibold text-[16px] leading-[21.79px] tracking-wide hover:text-red-600" href="#">For Buyers</Link>
//                     <Link className="font-inter font-semibold text-[16px] leading-[21.79px] tracking-wide hover:text-red-600" href="#">For Tenants</Link>
//                     <Link className="font-inter font-semibold text-[16px] leading-[21.79px] tracking-wide hover:text-red-600" href="#">For Owners</Link>
//                     <Link className="font-inter font-semibold text-[16px] leading-[21.79px] tracking-wide hover:text-red-600" href="#">For Dealers / Builders</Link> */}
//                     <Link className="font-inter text-black font-semibold text-[16px] leading-[21.79px] tracking-wide hover:text-red-600" href="/propertylisting">Property Listings</Link>

//                     <Link className="font-inter text-black font-semibold text-[16px] leading-[21.79px] tracking-wide hover:text-red-600" href="/contactus">Contact Us</Link>
//                     <Link className="font-inter text-black font-semibold text-[16px] leading-[21.79px] tracking-wide hover:text-red-600 flex items-center" href="/signin">Login
//                         <IoIosArrowDown className='text-[16px] -mt-0.5' />
//                     </Link>
//                 </nav>


//                 <button
//                     className="lg:hidden flex items-center text-[20px] text-gray-700"
//                     onClick={() => setMenuOpen(!menuOpen)}
//                 >
//                     {menuOpen ? <FaBars className='rotate-90' /> : <FaBars />}
//                 </button>
//             </div>

//             {/* Mobile Menu */}
//             {menuOpen && (
//                 <div className="lg:hidden flex flex-col items-center py-4 bg-white shadow-md">
//                     <Link className="font-inter font-semibold text-[16px] py-2" href="#">About Us</Link>
//                     <Link className="font-inter font-medium text-[16px] py-2" href="#">For Buyers</Link>
//                     <Link className="font-inter font-medium text-[16px] py-2" href="#">For Tenants</Link>
//                     <Link className="font-inter font-medium text-[16px] py-2" href="#">For Owners</Link>
//                     <Link className="font-inter font-medium text-[16px] py-2" href="#">For Dealers / Builders</Link>
//                     <Link className="font-inter font-medium text-[16px] py-2" href="/contactus">Contact Us</Link>
//                     <Link className="font-inter font-medium text-[16px] py-2 flex items-center gap-1" href="/ssignin">
//                         Login
//                         <IoIosArrowDown className='text-[16px] -mt-0.5' />
//                     </Link>
//                 </div>
//             )}
//         </header>
//     );
// };

// export default Header;

'use client';
import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            alt="Logo"
            width={150}
            height={130}
            className="h-10 w-auto"
            src="/logo.png"
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          <Link
            className="font-inter text-gray-800 font-semibold text-[16px] leading-[21.79px] tracking-wide hover:text-red-600 transition-colors duration-200"
            href="/aboutus"
          >
            About Us
          </Link>
          <Link
            className="font-inter text-gray-800 font-semibold text-[16px] leading-[21.79px] tracking-wide hover:text-red-600 transition-colors duration-200"
            href="/propertylisting"
          >
            Property Listings
          </Link>
          <Link
            className="font-inter text-gray-800 font-semibold text-[16px] leading-[21.79px] tracking-wide hover:text-red-600 transition-colors duration-200"
            href="/contactus"
          >
            Contact Us
          </Link>
          {/* Login Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-inter text-gray-800 font-semibold text-[16px] leading-[21.79px] tracking-wide hover:text-red-600 flex items-center transition-colors duration-200"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Login
              <IoIosArrowDown className={`text-[16px] ml-1 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </motion.button>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full mt-2 w-32 bg-white shadow-lg rounded-lg border border-gray-100 z-50"
              >
                <Link
                  href="/signin"
                  className="block px-4 py-2 text-gray-800 font-inter font-semibold text-[14px] hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                  onClick={() => setDropdownOpen(false)}
                >
                  As Buyer
                </Link>
                <Link
                  href="/seller/signin"
                  className="block px-4 py-2 text-gray-800 font-inter font-semibold text-[14px] hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                  onClick={() => setDropdownOpen(false)}
                >
                  As Seller
                </Link>
              </motion.div>
            )}
          </div>
          {/* List Property Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/seller/myproperty/addproperty"
              className="flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 rounded-lg shadow-md text-white font-semibold text-sm hover:shadow-lg transition-shadow duration-300 group"
            >
              <FiPlus className="mr-2 text-lg transform transition-transform duration-300 group-hover:rotate-90" />
              List Property
            </Link>
          </motion.div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden flex items-center text-[20px] text-gray-700 hover:text-red-600 transition-colors duration-200"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars className={menuOpen ? 'rotate-90' : ''} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="lg:hidden flex flex-col items-center py-4 bg-white shadow-md border-t border-gray-100"
        >
          <Link
            className="font-inter text-gray-800 font-semibold text-[16px] py-2 hover:text-red-600 transition-colors duration-200"
            href="/aboutus"
            onClick={() => setMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            className="font-inter text-gray-800 font-semibold text-[16px] py-2 hover:text-red-600 transition-colors duration-200"
            href="/propertylisting"
            onClick={() => setMenuOpen(false)}
          >
            Property Listings
          </Link>
          <Link
            className="font-inter text-gray-800 font-semibold text-[16px] py-2 hover:text-red-600 transition-colors duration-200"
            href="/contactus"
            onClick={() => setMenuOpen(false)}
          >
            Contact Us
          </Link>
          {/* Mobile Login Dropdown */}
          <div className="w-full text-center" ref={dropdownRef}>
            <button
              className="font-inter text-gray-800 font-semibold text-[16px] py-2 flex items-center gap-1 justify-center hover:text-red-600 transition-colors duration-200 w-full"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Login
              <IoIosArrowDown className={`text-[16px] transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full bg-white shadow-lg rounded-lg border border-gray-100 mt-1"
              >
                <Link
                  href="/signin"
                  className="block px-4 py-2 text-gray-800 font-inter font-semibold text-[14px] hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                  onClick={() => {
                    setDropdownOpen(false);
                    setMenuOpen(false);
                  }}
                >
                  As Buyer
                </Link>
                <Link
                  href="/seller/signin"
                  className="block px-4 py-2 text-gray-800 font-inter font-semibold text-[14px] hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                  onClick={() => {
                    setDropdownOpen(false);
                    setMenuOpen(false);
                  }}
                >
                  As Seller
                </Link>
              </motion.div>
            )}
          </div>
          <Link
            className="font-inter text-white font-semibold text-[16px] py-2 px-4 bg-gradient-to-r from-red-500 to-red-700 rounded-lg mt-2 hover:shadow-lg transition-shadow duration-200"
            href="/admin/property/addproperty"
            onClick={() => setMenuOpen(false)}
          >
            List Property
          </Link>
        </motion.div>
      )}
    </header>
  );
};

export default Header;