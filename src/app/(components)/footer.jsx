// 'use client'
// import React, { useState } from 'react';
// import { MdKeyboardArrowRight } from "react-icons/md";
// import { FaPlus } from "react-icons/fa";
// import { FaFacebookF } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";
// import { FaInstagram } from "react-icons/fa";
// import { FaYoutube } from "react-icons/fa";
// import Image from 'next/image'
// import Link from 'next/link'

// const Footer = () => {
//     const [showCompany, setShowCompany] = useState(false);
//     const [showCategory, setShowCategory] = useState(false);

//     return (
//         <div className="bg-gray-900 text-gray-300">
//             <footer className="py-10">
//                 <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row justify-between items-start md:items-center">
//                     <Link href="/" className="flex items-center gap-3">
//                         <Image alt="Logo" width={140} height={130} className="h-10" src="/logo.png" />
//                         {/* <span className="font-cambria text-white font-normal text-[34px] leading-[39.86px] tracking-normal">Real Estate</span> */}
//                     </Link>

                    
//                     <div className="mt-6 lg:mt-0 grid grid-cols-1 lg:grid-cols-3 w-full lg:w-3/4">
//                         <div className="mb-6 md:mb-0">
//                             <h3 className="hidden lg:flex text-lg font-semibold mb-4">
//                                 Company
//                             </h3>
//                             <button
//                                 className="lg:hidden text-white w-full"
//                                 onClick={() => setShowCompany(!showCompany)}
//                             >
//                                 <h3 className="text-lg font-semibold mb-4 flex items-center justify-between w-full">
//                                     Company

//                                     {showCompany ? <FaPlus className='rotate-45'/> :<FaPlus />}

//                                 </h3>
//                             </button>
//                             <ul className={`${showCompany ? 'block' : 'hidden'} lg:block`}>
//                                 <li className="mb-2">
//                                     <Link className="hover:text-white flex items-center gap-1.5" href="/aboutus">
//                                         <MdKeyboardArrowRight />About Us
//                                     </Link>
//                                 </li>
//                                 <li className="mb-2">
//                                     <a className="hover:text-white flex items-center gap-1.5" href="#">
//                                         <MdKeyboardArrowRight />For Partners
//                                     </a>
//                                 </li>
//                                 <li className="mb-2">
//                                     <a className="hover:text-white flex items-center gap-1.5" href="#">
//                                         <MdKeyboardArrowRight />Terms
//                                     </a>
//                                 </li>
//                                 <li className="mb-2">
//                                     <a className="hover:text-white flex items-center gap-1.5" href="#">
//                                         <MdKeyboardArrowRight />Privacy Policy
//                                     </a>
//                                 </li>
//                                 <li className="mb-2">
//                                     <a className="hover:text-white flex items-center gap-1.5" href="#">
//                                         <MdKeyboardArrowRight />Careers
//                                     </a>
//                                 </li>
//                                 <li className="mb-2">
//                                     <Link className="hover:text-white flex items-center gap-1.5" href="/contactus">
//                                         <MdKeyboardArrowRight />Contact Us
//                                     </Link>
//                                 </li>
//                             </ul>
//                         </div>

                        
//                         <div className="mb-6 md:mb-0">
//                             <h3 className="text-lg font-semibold mb-4 hidden lg:flex">
//                                 Lists by Category
//                             </h3>
//                             <button
//                                 className="lg:hidden text-white w-full"
//                                 onClick={() => setShowCategory(!showCategory)}
//                             >
//                                 <h3 className="text-lg font-semibold mb-4 flex items-center justify-between w-full">
//                                     Lists by Category

//                                    {showCategory ? <FaPlus className='rotate-45'/> : <FaPlus />}

//                                 </h3>
//                             </button>
//                             <ul className={`${showCategory ? 'block' : 'hidden'} lg:block`}>
//                                 <li className="mb-2">
//                                     <a className="hover:text-white flex items-center gap-1.5" href="#">
//                                         <MdKeyboardArrowRight />Apartments
//                                     </a>
//                                 </li>
//                                 <li className="mb-2">
//                                     <a className="hover:text-white flex items-center gap-1.5" href="#">
//                                         <MdKeyboardArrowRight />Houses
//                                     </a>
//                                 </li>
//                                 <li className="mb-2">
//                                     <a className="hover:text-white flex items-center gap-1.5" href="#">
//                                         <MdKeyboardArrowRight />Villas
//                                     </a>
//                                 </li>
//                                 <li className="mb-2">
//                                     <a className="hover:text-white flex items-center gap-1.5" href="#">
//                                         <MdKeyboardArrowRight />Offices
//                                     </a>
//                                 </li>
//                                 <li className="mb-2">
//                                     <a className="hover:text-white flex items-center gap-1.5" href="#">
//                                         <MdKeyboardArrowRight />Flats
//                                     </a>
//                                 </li>
//                                 <li className="mb-2">
//                                     <a className="hover:text-white flex items-center gap-1.5" href="#">
//                                         <MdKeyboardArrowRight />Land
//                                     </a>
//                                 </li>
//                             </ul>
//                         </div>

                        
//                         <div>
//                             <h3 className="text-lg font-semibold mb-4">
//                                 Contact Us
//                             </h3>
//                             <p className="mb-2">
//                                 Toll Free - 1800 00 00000
//                             </p>
//                             <p className="mb-2">
//                                 9:30 AM href 6:30 PM (Mon-Sun)
//                             </p>
//                             <p className="mb-4">
//                                 feedback@realestate.com
//                             </p>

//                             <h3 className="text-lg font-semibold mb-4">
//                                 Connect with us
//                             </h3>
//                             <div className="flex space-x-4">
//                                 <a className="hover:text-white" href="https://facebook.com" target='_blank'>
//                                     <FaFacebookF />
//                                 </a>
//                                 <a className="hover:text-white" href="https://x.com" target='_blank'>
//                                     <FaXTwitter />
//                                 </a>
//                                 <a className="hover:text-white" href="https://instagram.com" target='_blank'>
//                                     <FaInstagram />
//                                 </a>
//                                 <a className="hover:text-white" href="https://youtube.com" target='_blank'>
//                                     <FaYoutube className='text-lg'/>
//                                 </a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </footer>
//         </div>
//     );
// }

// export default Footer;


'use client';
import React, { useState } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';
import { FaFacebookF, FaXTwitter, FaInstagram, FaYoutube } from 'react-icons/fa6';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Footer = () => {
  const [showCompany, setShowCompany] = useState(false);
  const [showCategory, setShowCategory] = useState(false);

  return (
    <div className="bg-gray-900 text-gray-300">
      <footer className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row justify-between items-start">
          <Link href="/" className="flex items-center gap-3">
            <Image
              alt="Logo"
              width={340}
              height={330}
              className="h-20 grayscale w-auto"
              src="/logo.png"
            />
          </Link>

          <div className="mt-6 lg:mt-0 grid grid-cols-1 lg:grid-cols-3 gap-8 w-full lg:w-3/4">
            {/* Company Section */}
            <div className="mb-6 md:mb-0">
              <h3 className="hidden lg:flex text-lg font-semibold text-white mb-4">
                Company
              </h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="lg:hidden text-white w-full"
                onClick={() => setShowCompany(!showCompany)}
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center justify-between w-full">
                  Company
                  <FaPlus
                    className={`text-red-600 transition-transform duration-200 ${
                      showCompany ? 'rotate-45' : ''
                    }`}
                  />
                </h3>
              </motion.button>
              <ul className={`${showCompany ? 'block' : 'hidden'} lg:block space-y-2`}>
                {[
                  { label: 'About Us', href: '/aboutus' },
                  { label: 'For Partners', href: '#' },
                  { label: 'Terms', href: '#' },
                  { label: 'Privacy Policy', href: '#' },
                  { label: 'Careers', href: '#' },
                  { label: 'Contact Us', href: '/contactus' },
                ].map((item, idx) => (
                  <li key={idx}>
                    <motion.div whileHover={{ x: 5 }}>
                      <Link
                        className="flex items-center gap-1.5 text-gray-300 hover:text-red-600 transition-colors duration-200"
                        href={item.href}
                      >
                        <MdKeyboardArrowRight className="text-red-600" />
                        {item.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Lists by Category Section */}
            <div className="mb-6 md:mb-0">
              <h3 className="hidden lg:flex text-lg font-semibold text-white mb-4">
                Lists by Category
              </h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="lg:hidden text-white w-full"
                onClick={() => setShowCategory(!showCategory)}
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center justify-between w-full">
                  Lists by Category
                  <FaPlus
                    className={`text-red-600 transition-transform duration-200 ${
                      showCategory ? 'rotate-45' : ''
                    }`}
                  />
                </h3>
              </motion.button>
              <ul className={`${showCategory ? 'block' : 'hidden'} lg:block space-y-2`}>
                {['Apartments', 'Houses', 'Villas', 'Offices', 'Flats', 'Land'].map(
                  (category, idx) => (
                    <li key={idx}>
                      <motion.div whileHover={{ x: 5 }}>
                        <Link
                          className="flex items-center gap-1.5 text-gray-300 hover:text-red-600 transition-colors duration-200"
                          href="#"
                        >
                          <MdKeyboardArrowRight className="text-red-600" />
                          {category}
                        </Link>
                      </motion.div>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Contact Us Section */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
              <p className="mb-2 text-gray-300">Toll Free - 1800 00 00000</p>
              <p className="mb-2 text-gray-300">9:30 AM to 6:30 PM (Mon-Sun)</p>
              <p className="mb-4 text-gray-300">feedback@realestate.com</p>

              <h3 className="text-lg font-semibold text-white mb-4">
                Connect with Us
              </h3>
              <div className="flex space-x-4">
                {[
                  { icon: <FaFacebookF />, href: 'https://facebook.com' },
                  { icon: <FaXTwitter />, href: 'https://x.com' },
                  { icon: <FaInstagram />, href: 'https://instagram.com' },
                  { icon: <FaYoutube className="text-lg" />, href: 'https://youtube.com' },
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    whileHover={{ scale: 1.2, color: '#DC2626' }}
                    className="text-gray-300 hover:text-red-600 transition-colors duration-200"
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;