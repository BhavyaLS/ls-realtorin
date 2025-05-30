// "use client";

// import { useState } from "react";
// import React from 'react'
// import { Box, Rating } from '@mui/material';
// import StarIcon from '@mui/icons-material/Star';
// import { LuCircleCheckBig } from "react-icons/lu";
// import { BsArrowRight } from "react-icons/bs";
// import { IoCallOutline } from "react-icons/io5";
// import { FaMapMarkerAlt } from "react-icons/fa";
// import { AiOutlineHome } from "react-icons/ai";
// import { LiaArrowsAltSolid, LiaBedSolid } from "react-icons/lia";
// import { IoLocationOutline } from "react-icons/io5";
// import Link from 'next/link';
// import Image from "next/image";
// const Page = () => {
//   const [value, setValue] = useState(2);
//   const [activeButton, setActiveButton] = useState('Buy');
//   return (
//     <div className="bg-gray-100">
//       {/* <section className="relative px-4 sm:px-6 lg:px-8 h-[450px] bg-cover bg-center flex justify-center">
//                 <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-60" style={{ backgroundImage: 'url(/Home/banner.png)' }}></div>

//                 <div className="absolute top-12 !opacity-100 flex flex-col justify-center items-center text-center text-white">
//                     <div className="flex w-2/3 space-x-4 mb-4">
//                         <button
//                             className={`relative font-roboto font-semibold text-base leading-8 tracking-normal px-4 py-1 rounded-lg ${activeButton === 'Buy' ? 'bg-[#0073E1] text-white' : 'bg-[#FFFFFF] text-black'}`}
//                             onClick={() => setActiveButton('Buy')}
//                         >
//                             Buy
//                             {activeButton === 'Buy' && (
//                                 <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[10px] border-t-[#0073E1] border-transparent"></span>
//                             )}
//                         </button>

//                         <button
//                             className={`relative font-roboto font-semibold text-base leading-8 tracking-normal px-4 py-1 rounded-lg ${activeButton === 'Rent' ? 'bg-[#0073E1] text-white' : 'bg-[#FFFFFF] text-black'}`}
//                             onClick={() => setActiveButton('Rent')}
//                         >
//                             Rent
//                             {activeButton === 'Rent' && (
//                                 <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[10px] border-t-[#0073E1] border-transparent"></span>
//                             )}
//                         </button>

//                         <button
//                             className={`relative font-roboto font-semibold text-base leading-8 tracking-normal px-4 py-1 rounded-lg ${activeButton === 'PG' ? 'bg-[#0073E1] text-white' : 'bg-[#FFFFFF] text-black'}`}
//                             onClick={() => setActiveButton('PG')}
//                         >
//                             PG
//                             {activeButton === 'PG' && (
//                                 <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[10px] border-t-[#0073E1] border-transparent"></span>
//                             )}
//                         </button>
//                     </div>

//                     <div className="bg-white border-[10px] border-gray-300 border-opacity-25 p-4 rounded-3xl shadow-lg w-2/3">
//                         <div className="flex space-x-4 mb-4 ">
//                             <div className="w-1/2">
//                                 <p className="font-roboto text-start font-medium text-base leading-[30px] text-black ml-1">Property Type</p>
//                                 <select className="px-4 py-2 bg-white h-[40px] w-full text-black border rounded-xl">
//                                     <option>Please Select</option>
//                                     <option>All Residential</option>
//                                 </select>
//                             </div>
//                             <div className="w-2/3">
//                                 <p className="font-roboto text-start font-medium text-base leading-[30px] text-black ml-1">Location</p>
//                                 <input className="px-4 py-2 border h-[40px] w-full placeholder:text-black text-black rounded-xl" placeholder="Enter City, Locality, Project" type="text" />
//                             </div>
//                             <div className="w-1/2">
//                                 <p className="font-roboto text-start font-medium text-base leading-[30px] text-black ml-1">Your Budget</p>
//                                 <select className="px-4 py-2 w-full bg-white text-black border rounded-xl">
//                                     <option>Please Select</option>
//                                     <option>Max. Price</option>
//                                 </select>
//                             </div>
//                             <div className="flex items-end">
//                                 <button className="px-5 py-2 h-auto bg-blue-600 text-white rounded-xl">Search</button>
//                             </div>
//                         </div>
//                     </div>
//                     <h1 className="mt-4 font-roboto  text-[#222222] font-bold text-4xl leading-[56.25px]">Find your dream home</h1>
//                     <p className="font-roboto mt-2 font-medium text-lg leading-[30px] text-black w-2/3 text-center">
//                         We are recognized for exceeding client expectations and delivering great results through dedication, ease of process, and extraordinary services to our worldwide clients.
//                     </p>
//                 </div>
//             </section> */}
//       <section className="relative px-4 sm:px-6 lg:px-8 h-[720px] sm:h-[530px]  md:h-[510px] xl:h-[450px] bg-cover bg-center flex justify-center">
//         {/* Background Image */}
//         <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-60" style={{ backgroundImage: 'url(/img/Home/banner.png)' }}></div>

//         {/* Content Section */}
//         <div className="container absolute top-12 !opacity-100 flex flex-col justify-center items-center text-center text-white w-full">
//           {/* Buttons (Buy, Rent, PG) */}
//           <div className="flex flex-wrap justify-center lg:justify-start w-full lg:w-2/3 space-x-4 mb-4">
//             <button
//               className={`relative font-roboto font-semibold text-base leading-8 tracking-normal px-4 py-1 rounded-lg ${activeButton === 'Buy' ? 'bg-[#0073E1] text-white' : 'bg-[#FFFFFF] text-black'}`}
//               onClick={() => setActiveButton('Buy')}
//             >
//               Buy
//               {activeButton === 'Buy' && (
//                 <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[10px] border-t-[#0073E1] border-transparent"></span>
//               )}
//             </button>

//             <button
//               className={`relative font-roboto font-semibold text-base leading-8 tracking-normal px-4 py-1 rounded-lg ${activeButton === 'Rent' ? 'bg-[#0073E1] text-white' : 'bg-[#FFFFFF] text-black'}`}
//               onClick={() => setActiveButton('Rent')}
//             >
//               Rent
//               {activeButton === 'Rent' && (
//                 <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[10px] border-t-[#0073E1] border-transparent"></span>
//               )}
//             </button>

//             <button
//               className={`relative font-roboto font-semibold text-base leading-8 tracking-normal px-4 py-1 rounded-lg ${activeButton === 'PG' ? 'bg-[#0073E1] text-white' : 'bg-[#FFFFFF] text-black'}`}
//               onClick={() => setActiveButton('PG')}
//             >
//               PG
//               {activeButton === 'PG' && (
//                 <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[10px] border-t-[#0073E1] border-transparent"></span>
//               )}
//             </button>
//           </div>

//           {/* Search Form */}
//           <div className="bg-white border-[10px] border-gray-300 border-opacity-25 p-4 rounded-3xl shadow-lg w-full sm:w-2/3 md:w-2/3 lg:w-2/3">
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
//               {/* Property Type */}
//               <div className="w-full">
//                 <p className="font-roboto text-start font-medium text-base leading-[30px] text-black ml-1">Property Type</p>
//                 <select className="px-4 py-2 bg-white h-[40px] w-full text-black border rounded-xl focus:outline-none">
//                   <option>Please Select</option>
//                   <option>All Residential</option>
//                 </select>
//               </div>

//               {/* Location */}
//               <div className="w-full">
//                 <p className="font-roboto text-start font-medium text-base leading-[30px] text-black ml-1">Location</p>
//                 <input className="px-4 py-2 border h-[40px] w-full placeholder:text-black text-black rounded-xl focus:outline-none" placeholder="Enter City, Locality" type="text" />
//               </div>

//               {/* Your Budget */}
//               <div className="w-full">
//                 <p className="font-roboto text-start font-medium text-base leading-[30px] text-black ml-1 ">Your Budget</p>
//                 <select className="px-4 py-2 w-full bg-white text-black border rounded-xl focus:outline-none">
//                   <option>Please Select</option>
//                   <option>Max. Price</option>
//                 </select>
//               </div>
//               <div className="flex items-center lg:items-end justify-center lg:justify-end">
//                 <button className="px-5 py-2 h-auto bg-blue-600 text-white rounded-xl">Search</button>
//               </div>
//             </div>



//           </div>

//           {/* Heading and Description */}
//           <h1 className="mt-4 font-roboto text-[#222222] font-bold text-4xl leading-[56.25px]">Find your dream home</h1>
//           <p className="font-roboto mt-2 font-medium text-lg leading-[30px] text-black w-2/3 mx-auto">
//             We are recognized for exceeding client expectations and delivering great results through dedication, ease of process, and extraordinary services to our worldwide clients.
//           </p>
//         </div>
//       </section>


//       <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col lg:flex-row gap-3">
//         <div className="mb-12 flex flex-col w-full lg:w-3/5">
//           <div>
//             <h2 className="font-roboto font-semibold text-black text-4xl leading-[30px]">Welcome to Our Platform</h2>
//             <p className="mt-4 font-roboto font-normal text-[16px] leading-[26px] text-[#2E2E2E]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.</p>
//             <p className="mt-4 font-roboto font-normal text-[16px] leading-[26px] text-[#2E2E2E]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.</p>
//           </div>
//           <div className="w-full flex flex-col sm:flex-row gap-12 py-6">
//             <div className="flex flex-col items-center sm:items-start sm:w-1/2">
//               <ul className="">
//                 <li className="flex items-center gap-1.5 text-black font-roboto font-normal text-[15px] leading-[36px]">
//                   <LuCircleCheckBig className="text-[16px] text-[#4B4B4B]" />
//                   Quality real estate service
//                 </li>
//                 <li className="flex items-center gap-1.5 text-black font-roboto font-normal text-[15px] leading-[36px]">
//                   <LuCircleCheckBig className="text-[16px] text-[#4B4B4B]" />
//                   100% Satisfaction guarantee
//                 </li>
//                 <li className="flex items-center gap-1.5 text-black font-roboto font-normal text-[15px] leading-[36px]">
//                   <LuCircleCheckBig className="text-[16px] text-[#4B4B4B]" />
//                   Highly professional team
//                 </li>
//                 <li className="flex items-center gap-1.5 text-black font-roboto font-normal text-[15px] leading-[36px]">
//                   <LuCircleCheckBig className="text-[16px] text-[#4B4B4B]" />
//                   Dealing always on time
//                 </li>
//               </ul>
//               <div>
//                 <button className="mt-8 px-6 font-medium py-2.5 bg-[#0073E1] text-base text-white rounded-full flex items-center gap-3 cursor-pointer">More About <BsArrowRight className="text-[18px]" /></button>
//               </div>
//             </div>
//             <div className="hidden sm:flex border-r border-[#C7C7C7] mb-16"></div>
//             <div className="sm:w-1/2 flex flex-col items-center sm:items-start gap-3">
//               <div className="bg-[#364440] w-fit p-2 rounded-full">
//                 <IoCallOutline className="text-[35px] text-white" />
//               </div>
//               <p className="font-roboto font-semibold text-[#2A302E] text-[16px] leading-[18.75px]">Call Us 24/7</p>
//               <p className="font-roboto font-bold text-[30px] leading-[30px] text-[#2A302E]">+0123456789</p>
//             </div>

//           </div>
//         </div>
//         <div className="flex w-full lg:w-2/5 relative">
//           <div className="w-full pl-24 p-2">
//             <Image alt="Image of a modern house" className="rounded-xl shadow-lg" width={400} height={400} src="/img/Home/plateform1.png" />
//           </div>
//           <div className="absolute top-3/4 lg:top-1/3 xl:top-1/2 2xl:top-2/3 w-2/3 p-2">
//             <Image alt="Image of a modern living room" width={350} height={350} className="rounded-lg shadow-lg" src="/img/Home/plateform2.png" />
//           </div>
//         </div>
//       </section>

//       <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16 lg:mt-0">
//         <h1 className="text-3xl text-black font-bold text-center mb-2">
//           Latest Properties
//         </h1>
//         <p className="text-center text-gray-600 mb-8">
//           These are the latest properties in the Sales category. You can create the list using the "latest listing shortcode" and show items by specific categories.
//         </p>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

//           <div className="bg-white p-3 rounded-xl shadow-md overflow-hidden border-2 hover:border-[#0073E1]">
//             <div className="relative">
//               <Image alt="House in Upper East Side" width={600} height={600} className="w-full h-48 rounded-xl object-cover" src="https://storage.googleapis.com/a1aa/image/6MQ8dZfrmox3SSiucUGj5dGaWZR-Ffrogq_jcBHsPOI.jpg" />
//               <div className="absolute right-3 bottom-0 flex gap-1 items-center text-white mb-2">
//                 <FaMapMarkerAlt />
//                 Greenview, Jersey City
//               </div>
//             </div>
//             <div className="p-4">
//               <h2 className="text-xl text-black font-bold mb-2">
//                 House in Upper East Side
//               </h2>
//               <p className="text-blue-500 text-lg font-semibold mb-2">
//                 $ 150,000
//               </p>
//               <p className="text-gray-600 mb-2">
//                 Beautiful Huge 1 Family House In Heart Of Westbury. Newly Renovated With New Wood Floors,
//               </p>

//               <div className="flex gap-1 items-center text-gray-600 mb-1">
//                 <AiOutlineHome />
//                 Villa
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="flex items-center gap-1 text-gray-600">
//                   <LiaArrowsAltSolid className="rotate-45" />
//                   2235 sqft
//                 </div>
//                 <div className="flex items-center gap-1 text-gray-600">
//                   <LiaBedSolid className="" />
//                   3 BHK
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-3 rounded-xl shadow-md overflow-hidden border-2 hover:border-[#0073E1]">
//             <div className="relative">
//               <Image alt="House in Upper East Side" width={600} height={600} className="w-full h-48 rounded-xl object-cover" src="https://storage.googleapis.com/a1aa/image/6MQ8dZfrmox3SSiucUGj5dGaWZR-Ffrogq_jcBHsPOI.jpg" />
//               <div className="absolute right-3 bottom-0 flex gap-1 items-center text-white mb-2">
//                 <FaMapMarkerAlt />
//                 Greenview, Jersey City
//               </div>
//             </div>
//             <div className="p-4">
//               <h2 className="text-xl text-black font-bold mb-2">
//                 House in Upper East Side
//               </h2>
//               <p className="text-blue-500 text-lg font-semibold mb-2">
//                 $ 150,000
//               </p>
//               <p className="text-gray-600 mb-2">
//                 Beautiful Huge 1 Family House In Heart Of Westbury. Newly Renovated With New Wood Floors,
//               </p>

//               <div className="flex gap-1 items-center text-gray-600 mb-1">
//                 <AiOutlineHome />
//                 Villa
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="flex items-center gap-1 text-gray-600">
//                   <LiaArrowsAltSolid className="rotate-45" />
//                   2235 sqft
//                 </div>
//                 <div className="flex items-center gap-1 text-gray-600">
//                   <LiaBedSolid className="" />
//                   3 BHK
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-3 rounded-xl shadow-md overflow-hidden border-2 hover:border-[#0073E1]">
//             <div className="relative">
//               <Image alt="House in Upper East Side" width={600} height={600} className="w-full h-48 rounded-xl object-cover" src="https://storage.googleapis.com/a1aa/image/6MQ8dZfrmox3SSiucUGj5dGaWZR-Ffrogq_jcBHsPOI.jpg" />
//               <div className="absolute right-3 bottom-0 flex gap-1 items-center text-white mb-2">
//                 <FaMapMarkerAlt />
//                 Greenview, Jersey City
//               </div>
//             </div>
//             <div className="p-4">
//               <h2 className="text-xl text-black font-bold mb-2">
//                 House in Upper East Side
//               </h2>
//               <p className="text-blue-500 text-lg font-semibold mb-2">
//                 $ 150,000
//               </p>
//               <p className="text-gray-600 mb-2">
//                 Beautiful Huge 1 Family House In Heart Of Westbury. Newly Renovated With New Wood Floors,
//               </p>

//               <div className="flex gap-1 items-center text-gray-600 mb-1">
//                 <AiOutlineHome />
//                 Villa
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="flex items-center gap-1 text-gray-600">
//                   <LiaArrowsAltSolid className="rotate-45" />
//                   2235 sqft
//                 </div>
//                 <div className="flex items-center gap-1 text-gray-600">
//                   <LiaBedSolid className="" />
//                   3 BHK
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-3 rounded-xl shadow-md overflow-hidden border-2 hover:border-[#0073E1]">
//             <div className="relative">
//               <Image alt="House in Upper East Side" width={600} height={600} className="w-full h-48 rounded-xl object-cover" src="https://storage.googleapis.com/a1aa/image/6MQ8dZfrmox3SSiucUGj5dGaWZR-Ffrogq_jcBHsPOI.jpg" />
//               <div className="absolute right-3 bottom-0 flex gap-1 items-center text-white mb-2">
//                 <FaMapMarkerAlt />
//                 Greenview, Jersey City
//               </div>
//             </div>
//             <div className="p-4">
//               <h2 className="text-xl text-black font-bold mb-2">
//                 House in Upper East Side
//               </h2>
//               <p className="text-blue-500 text-lg font-semibold mb-2">
//                 $ 150,000
//               </p>
//               <p className="text-gray-600 mb-2">
//                 Beautiful Huge 1 Family House In Heart Of Westbury. Newly Renovated With New Wood Floors,
//               </p>

//               <div className="flex gap-1 items-center text-gray-600 mb-1">
//                 <AiOutlineHome />
//                 Villa
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="flex items-center gap-1 text-gray-600">
//                   <LiaArrowsAltSolid className="rotate-45" />
//                   2235 sqft
//                 </div>
//                 <div className="flex items-center gap-1 text-gray-600">
//                   <LiaBedSolid className="" />
//                   3 BHK
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-3 rounded-xl shadow-md overflow-hidden border-2 hover:border-[#0073E1]">
//             <div className="relative">
//               <Image alt="House in Upper East Side" width={600} height={600} className="w-full h-48 rounded-xl object-cover" src="https://storage.googleapis.com/a1aa/image/6MQ8dZfrmox3SSiucUGj5dGaWZR-Ffrogq_jcBHsPOI.jpg" />
//               <div className="absolute right-3 bottom-0 flex gap-1 items-center text-white mb-2">
//                 <FaMapMarkerAlt />
//                 Greenview, Jersey City
//               </div>
//             </div>
//             <div className="p-4">
//               <h2 className="text-xl text-black font-bold mb-2">
//                 House in Upper East Side
//               </h2>
//               <p className="text-blue-500 text-lg font-semibold mb-2">
//                 $ 150,000
//               </p>
//               <p className="text-gray-600 mb-2">
//                 Beautiful Huge 1 Family House In Heart Of Westbury. Newly Renovated With New Wood Floors,
//               </p>

//               <div className="flex gap-1 items-center text-gray-600 mb-1">
//                 <AiOutlineHome />
//                 Villa
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="flex items-center gap-1 text-gray-600">
//                   <LiaArrowsAltSolid className="rotate-45" />
//                   2235 sqft
//                 </div>
//                 <div className="flex items-center gap-1 text-gray-600">
//                   <LiaBedSolid className="" />
//                   3 BHK
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white p-3 rounded-xl shadow-md overflow-hidden border-2 hover:border-[#0073E1]">
//             <div className="relative">
//               <Image alt="House in Upper East Side" width={600} height={600} className="w-full h-48 rounded-xl object-cover" src="https://storage.googleapis.com/a1aa/image/6MQ8dZfrmox3SSiucUGj5dGaWZR-Ffrogq_jcBHsPOI.jpg" />
//               <div className="absolute right-3 bottom-0 flex gap-1 items-center text-white mb-2">
//                 <FaMapMarkerAlt />
//                 Greenview, Jersey City
//               </div>
//             </div>
//             <div className="p-4">
//               <h2 className="text-xl text-black font-bold mb-2">
//                 House in Upper East Side
//               </h2>
//               <p className="text-blue-500 text-lg font-semibold mb-2">
//                 $ 150,000
//               </p>
//               <p className="text-gray-600 mb-2">
//                 Beautiful Huge 1 Family House In Heart Of Westbury. Newly Renovated With New Wood Floors,
//               </p>

//               <div className="flex gap-1 items-center text-gray-600 mb-1">
//                 <AiOutlineHome />
//                 Villa
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="flex items-center gap-1 text-gray-600">
//                   <LiaArrowsAltSolid className="rotate-45" />
//                   2235 sqft
//                 </div>
//                 <div className="flex items-center gap-1 text-gray-600">
//                   <LiaBedSolid className="" />
//                   3 BHK
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="flex justify-center mt-8">
//           <Link href="/propertylisting" className="bg-blue-500 text-white font-semibold px-6 py-2 flex items-center gap-2 rounded-full hover:bg-blue-600">
//             ALL PROPERTIES <BsArrowRight className="text-[18px]" />
//           </Link>
//         </div>
//       </section>


//       <div className="relative px-4 sm:px-6 lg:px-8 h-[500px] sm:h-[400px] lg:h-[300px] bg-cover bg-center flex justify-center">
//         <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0" style={{ backgroundImage: 'url(/Home/Awards/awards_background.png)' }}></div>
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
//           <div className="flex flex-col gap-4 items-center justify-center bg-white mx-6 py-12 rounded-3xl my-12">
//             <h2 className="text-2xl sm:text-xl md:text-3xl text-black font-bold mb-4 text-center">Awards and Recognitions</h2>
//             <div className="flex flex-wrap justify-center w-full max-w-4xl gap-10">
//               <Image alt="Wildridge logo" className="h-12 sm:h-10 md:h-12" src="/img/Home/Awards/award1.png" width={130} height={130}/>
//               <Image alt="Ellistone logo" className="h-12 sm:h-10 md:h-12" src="/img/Home/Awards/award2.png" width={130} height={130}/>
//               <Image alt="Home logo" className="h-12 sm:h-10 md:h-12" src="/img/Home/Awards/award3.png" width={130} height={130}/>
//               <Image alt="Horizon Homes logo" className="h-12 sm:h-10 md:h-12" src="/img/Home/Awards/award4.png" width={130} height={130}/>
//               <Image alt="Charles Bentley logo" className="h-12 sm:h-10 md:h-12" src="/img/Home/Awards/award5.png" width={130} height={130}/>
//             </div>
//           </div>
//         </div>
//       </div>

//       <section className="container mx-auto px sm:px-6 lg:px-8 pb-12">
//         <div className="text-center mt-12 flex flex-col items-center justify-center gap-2.5">
//           <h2 className="text-3xl text-black font-bold">Properties by Category</h2>
//           <p className="text-gray-600 w-1/2 ">Highlight the best of your properties by using the List Category shortcode. You can list specific properties categories, types, cities, areas.</p>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mt-8 p-4">
//           <div className="relative col-span-2 row-span-2">
//             <Image width={500} height={500} alt="House interior" className="w-full h-full object-cover rounded-3xl" src="/img/Home/Category/category_house.png" />
//             <div className="absolute inset-0 bg-black opacity-60 hover:opacity-40 flex flex-col justify-end p-4 rounded-3xl"></div>
//             <h3 className="text-white text-xl font-bold absolute top-8 left-8">House</h3>
//             <p className="text-white absolute bottom-8 left-8">17 listings</p>
//           </div>
//           <div className="relative col-span-2">
//             <Image width={500} height={500} alt="Villa interior" className="w-full h-60 md:h-full object-cover rounded-3xl" src="/img/Home/Category/category_villa.png" />
//             <div className="absolute inset-0 bg-black opacity-60 hover:opacity-40 flex flex-col justify-end p-4 rounded-3xl"></div>
//             <h3 className="text-white text-xl font-bold absolute top-6 left-6">Villa</h3>
//             <p className="text-white absolute bottom-6 left-6">12 listings</p>

//           </div>
//           <div className="relative col-span-2 md:col-span-1">
//             <Image width={500} height={500} alt="Flat interior" className="w-full h-60 md:h-full object-cover rounded-3xl" src="/img/Home/Category/category_flat.png" />
//             <div className="absolute inset-0 bg-black opacity-60 hover:opacity-40 flex flex-col justify-end p-4 rounded-3xl"></div>
//             <h3 className="text-white text-xl font-bold absolute top-6 left-6">Flat</h3>
//             <p className="text-white absolute bottom-6 left-6">10 listings</p>

//           </div>

//           <div className="relative col-span-2 md:col-span-1">
//             <Image width={500} height={500} alt="Office interior" className="w-full h-60 md:h-full object-cover rounded-3xl" src="/img/Home/Category/category_office.png" />
//             <div className="absolute inset-0 bg-black opacity-60 hover:opacity-40 flex flex-col justify-end p-4 rounded-3xl"></div>
//             <h3 className="text-white text-xl font-bold absolute top-6 left-6">Office</h3>
//             <p className="text-white absolute bottom-6 left-6">8 listings</p>

//           </div>
//         </div>
//       </section>

//       <section className="relative">
//         <Image width={500} height={500} alt="City skyline background" className="w-full h-[600px] sm:h-[500px] object-cover" src="/img/Home/reviewsbg.png" />
//         <div className="absolute inset-0 bg-black opacity-50">
//         </div>
//         <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
//           <h2 className="text-3xl font-bold">
//             Customer Reviews
//           </h2>
//           <p className="text-center w-1/2 mt-2">
//             Highlight the best of your property by using the List Category shortcode. You can list specific properties categories, types, cities, areas.
//           </p>
//           <div className="bg-white text-black rounded-lg shadow-lg py-20 pb-6 px-8 mt-6 max-w-3xl mx-auto relative">
//             <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
//               <div className="gradient-border-wrapper w-24 h-24 rounded-full ">
//                 <Image  alt="Customer profile picture" className="w-20 h-20 rounded-full" height={100} src="https://storage.googleapis.com/a1aa/image/uB2wOnDwx1NEg3G2rv8Onl6ilY600uTFSK2pP8vP4PY.jpg" width={100} />
//               </div>
//             </div>
//             <p className="text-center mt-10">
//               The WP Estate team delivered on that expectation and I would highly recommend them to anyone who is in the market. Their professionalism is truly exceptional.
//             </p>
//             <p className="text-center text-lg font-bold mt-4">
//               Dana Gilmore
//             </p>
//             <div className="flex justify-center mt-2">
//               <Box sx={{ '& > legend': { mt: 2 } }}>
//                 <Rating name="read-only" value={value} readOnly emptyIcon={<StarIcon style={{ opacity: 0.90, color: "lightgray" }} fontSize="inherit" />} />
//               </Box>
//             </div>
//           </div>
//         </div>
//       </section>
//       <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center">
//         <h2 className="text-3xl text-black font-bold text-center">
//           Featured Properties
//         </h2>
//         <p className="text-center text-black w-1/2 mt-2">
//           Here are two listings displayed with the featured property shortcode, which you can use when you have some special properties to present.
//         </p>
//         <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center mt-8 gap-8">
//           <div className="bg-white flex flex-col lg:flex-row rounded-xl shadow-lg">
//             <div className="lg:w-1/3">
//               <Image width={500} height={500} alt="Villa on Washington Avenue" className="h-full object-cover rounded-l-xl" src="https://storage.googleapis.com/a1aa/image/vylnvq-UQdiDV7z8HMcoA6fbv2X_swo46jE7OKkRrn8.jpg" />
//             </div>
//             <div className="p-6">
//               <h3 className="text-xl text-black font-bold">
//                 Villa on Washington Avenue
//               </h3>
//               <p className="text-blue-500 text-lg font-bold mt-2">
//                 $150,000
//               </p>
//               <p className="text-gray-600 mt-2 flex gap-1 items-center">
//                 <IoLocationOutline /> Greenville, Jersey City
//               </p>
//               <p className="text-gray-600 mt-2">
//                 Beautiful Single Family Home in Heart of Greenville...
//               </p>
//               <div className="flex items-center justify-between mt-4">
//                 <div className="flex items-center">

//                   <span className="ml-2 text-gray-600 flex items-center gap-1">
//                     <AiOutlineHome /> Villa
//                   </span>
//                 </div>
//                 <div className="flex items-center">

//                   <span className="ml-2 text-gray-600 flex items-center gap-1">
//                     <LiaBedSolid /> 3BHK
//                   </span>
//                 </div>
//                 <div className="flex items-center">

//                   <span className="ml-2 text-gray-600 flex items-center gap-1">
//                     <LiaArrowsAltSolid className="rotate-45" /> 2200 sqft
//                   </span>
//                 </div>
//               </div>
//             </div>

//           </div>

//           <div className="bg-white flex flex-col lg:flex-row rounded-xl shadow-lg">
//             <div className="lg:w-1/3">
//               <Image width={500} height={500} alt="Villa on Washington Avenue" className="h-full object-cover rounded-l-xl" src="https://storage.googleapis.com/a1aa/image/vylnvq-UQdiDV7z8HMcoA6fbv2X_swo46jE7OKkRrn8.jpg" />
//             </div>
//             <div className="p-6">
//               <h3 className="text-xl text-black font-bold">
//                 Villa on Washington Avenue
//               </h3>
//               <p className="text-blue-500 text-lg font-bold mt-2">
//                 $150,000
//               </p>
//               <p className="text-gray-600 mt-2 flex gap-1 items-center">
//                 <IoLocationOutline /> Greenville, Jersey City
//               </p>
//               <p className="text-gray-600 mt-2">
//                 Beautiful Single Family Home in Heart of Greenville...
//               </p>
//               <div className="flex items-center justify-between mt-4">
//                 <div className="flex items-center">

//                   <span className="ml-2 text-gray-600 flex items-center gap-1">
//                     <AiOutlineHome /> Villa
//                   </span>
//                 </div>
//                 <div className="flex items-center">

//                   <span className="ml-2 text-gray-600 flex items-center gap-1">
//                     <LiaBedSolid /> 3BHK
//                   </span>
//                 </div>
//                 <div className="flex items-center">

//                   <span className="ml-2 text-gray-600 flex items-center gap-1">
//                     <LiaArrowsAltSolid className="rotate-45" /> 2200 sqft
//                   </span>
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </section>

//       <section className="relative">
//         <Image width={500} height={500} alt="City skyline background" className="w-full h-[360px] md:h-[260px] object-cover" src="/img/Home/subscribebg.png" />
//         {/* <div className="absolute inset-0 bg-black opacity-50">
//                 </div> */}
//         <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
//           <h2 className="text-3xl text-black font-bold mb-4">
//             Subscribe
//           </h2>
//           <p className="text-black text-center mb-6">
//             Subscribe to keep up with fresh news and exciting updates. We promise not to spam you!
//           </p>
//           <form className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
//             <input className="border bg-white border-gray-300 text-black p-2 rounded w-full md:w-auto focus:outline-none" placeholder="Name" type="text" />
//             <input className="border bg-white border-gray-300 text-black p-2 rounded w-full md:w-auto focus:outline-none" placeholder="Email" type="email" />
//             <input className="border bg-white border-gray-300 text-black p-2 rounded w-full md:w-auto focus:outline-none" placeholder="Phone Number" type="text" />
//             <button className="bg-blue-600 text-white px-6 py-2 rounded" type="submit">
//               Submit
//             </button>
//           </form>
//         </div>
//       </section>

//       <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <Image width={500} height={500} src="/img/Home/advertisement1.png" className="h-full rounded-xl" alt="Adv.1" />
//           <Image width={500} height={500} src="/img/Home/advertisement2.png" className="h-full rounded-xl" alt="Adv.2" />
//         </div>
//       </section>
//     </div>
//   )
// }

// export default Page;

'use client';

import { useState } from 'react';
import React from 'react';
import { Box, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { LuCircleCheckBig } from 'react-icons/lu';
import { BsArrowRight } from 'react-icons/bs';
import { IoCallOutline } from 'react-icons/io5';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { AiOutlineHome } from 'react-icons/ai';
import { LiaArrowsAltSolid, LiaBedSolid } from 'react-icons/lia';
import { IoLocationOutline } from 'react-icons/io5';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
// import { div } from 'framer-motion/dist/types/client';

const Page = () => {
  const [value, setValue] = useState(2);
  const [activeButton, setActiveButton] = useState('Buy');

  return (
    <div className="bg-gray-100">
      <section className="relative px-4 sm:px-6 lg:px-8 h-[720px] sm:h-[530px] md:h-[510px] xl:h-[450px] bg-cover bg-center flex justify-center">
        {/* Background Image */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-60"
          style={{ backgroundImage: 'url(/img/Home/banner.png)' }}
        ></div>

        {/* Content Section */}
        <div className="container absolute top-12 !opacity-100 flex flex-col justify-center items-center text-center text-white w-full">
          {/* Buttons (Buy, Rent, PG) */}
          <div className="flex flex-wrap justify-center lg:justify-start w-full lg:w-2/3 space-x-4 mb-4">
            {['Buy', 'Rent', 'PG'].map((type) => (
              <motion.button
                key={type}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative font-roboto font-semibold text-base leading-8 tracking-normal px-4 py-1 rounded-lg ${activeButton === type ? 'bg-red-600 text-white' : 'bg-white text-black'
                  }`}
                onClick={() => setActiveButton(type)}
              >
                {type}
                {activeButton === type && (
                  <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[10px] border-t-red-600 border-transparent"></span>
                )}
              </motion.button>
            ))}
          </div>

          {/* Search Form */}
          {/* <div className="bg-white border-4 border-gray-300 border-opacity-25 p-4 rounded-3xl shadow-lg w-full sm:w-2/3 md:w-2/3 lg:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="w-full">
                <p className="font-roboto text-start font-medium text-base leading-[30px] text-black ml-1">
                  Property Type
                </p>
                <select className="px-4 py-2 bg-white h-[40px] w-full text-black border border-gray-300 rounded-xl focus:outline-none hover:border-red-500">
                  <option>Please Select</option>
                  <option>All Residential</option>
                </select>
              </div>
              <div className="w-full">
                <p className="font-roboto text-start font-medium text-base leading-[30px] text-black ml-1">
                  Location
                </p>
                <input
                  className="px-4 py-2 border border-gray-300 h-[40px] w-full placeholder:text-gray-500 text-black rounded-xl focus:outline-none hover:border-red-500"
                  placeholder="Enter City, Locality"
                  type="text"
                />
              </div>
              <div className="w-full">
                <p className="font-roboto text-start font-medium text-base leading-[30px] text-black ml-1">
                  Your Budget
                </p>
                <select className="px-4 py-2 w-full bg-white text-black border border-gray-300 rounded-xl focus:outline-none hover:border-red-500">
                  <option>Please Select</option>
                  <option>Max. Price</option>
                </select>
              </div>
              <div className="flex items-center lg:items-end justify-center lg:justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2 h-auto bg-gradient-to-r from-red-500 to-red-700 text-white rounded-xl shadow-md hover:shadow-lg"
                >
                  Search
                </motion.button>
              </div>
            </div>
          </div> */}
          <div className="bg-white border-4 border-gray-300 border-opacity-25 p-4 rounded-3xl shadow-lg w-full sm:w-2/3 md:w-2/3 lg:w-2/3">
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="w-full lg:w-1/4">
                <p className="font-roboto text-start font-medium text-base leading-[30px] text-black ml-1">
                  Property Type
                </p>
                <select className="px-4 py-2 bg-white h-[40px] w-full text-black border border-gray-300 rounded-lg focus:outline-none hover:border-red-500">
                  <option>Please Select</option>
                  <option>All Residential</option>
                </select>
              </div>
              <div className="w-full lg:w-1/4">
                <p className="font-roboto text-start font-medium text-base leading-[30px] text-black ml-1">
                  Location
                </p>
                <input
                  className="px-4 py-2 border border-gray-300 h-[40px] w-full placeholder:text-gray-500 text-black rounded-lg focus:outline-none hover:border-red-500"
                  placeholder="Enter City, Locality"
                  type="text"
                />
              </div>
              <div className="w-full lg:w-1/4">
                <p className="font-roboto text-start font-medium text-base leading-[30px] text-black ml-1">
                  Your Budget
                </p>
                <select className="px-4 py-2 w-full bg-white text-black border border-gray-300 rounded-lg focus:outline-none hover:border-red-500">
                  <option>Please Select</option>
                  <option>Max. Price</option>
                </select>
              </div>
              <div className="flex items-center lg:items-end justify-center lg:justify-end mb-0.5 xl:pl-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2 h-auto bg-gradient-to-r from-red-500 to-red-700 text-white rounded-xl shadow-md hover:shadow-lg"
                >
                  Search
                </motion.button>
              </div>
            </div>
          </div>

          {/* Heading and Description */}
          <h1 className="mt-4 font-roboto text-gray-800 font-bold text-4xl leading-[56.25px]">
            Find your dream home
          </h1>
          <p className="font-roboto mt-1 font-medium text-lg leading-[30px] text-gray-700 w-64 sm:w-2/3 mx-auto">
            We are recognized for exceeding client expectations and delivering great results through dedication, ease of process, and extraordinary services.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="mb-12 flex flex-col w-full">
          <div>
            <h2 className="font-roboto text-gray-800 text-3xl font-bold leading-tight">
              Welcome to Our Platform
            </h2>
            <p className="mt-4 font-roboto text-[16px] leading-[26px] text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            </p>
            <p className="mt-4 font-roboto text-[16px] leading-[26px] text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis in arcu.
            </p>
          </div>
          <div className="w-full flex flex-col sm:flex-row gap-12 py-6">
            <div className="flex flex-col items-center sm:items-start sm:w-1/2">
              <ul className="space-y-2">
                {[
                  'Quality real estate service',
                  '100% Satisfaction guarantee',
                  'Highly professional team',
                  'Dealing always on time',
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-1.5 text-gray-600 font-roboto font-normal text-[15px]"
                  >
                    <LuCircleCheckBig className="text-[16px] text-red-600" />
                    {item}
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg flex items-center gap-3"
              >
                More About <BsArrowRight className="text-lg" />
              </motion.button>
            </div>
            <div className="hidden sm:flex border-r border-gray-200 mb-6"></div>
            <div className="sm:w-1/2 flex flex-col items-center sm:items-start gap-3">
              <div className="bg-red-100 p-2 rounded-full">
                <IoCallOutline className="text-[30px] text-red-600" />
              </div>
              <p className="font-roboto font-semibold text-gray-800 text-[16px]">
                Call Us 24/7
              </p>
              <p className="font-roboto font-bold text-[24px] text-gray-900">
                +0123456789
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full relative">
          <div className="w-full pl-24 p-2">
            <Image
              alt="Image of a modern house"
              className="rounded-xl shadow-lg"
              width={450}
              height={400}
              src="/img/Home/plateform1.png"
            />
          </div>
          <div className="absolute top-3/4 lg:top-3/5 w-2/3 p-2">
            <Image
              alt="Image of a modern living room"
              width={350}
              height={350}
              className="rounded-lg shadow-lg"
              src="/img/Home/plateform2.png"
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-24 lg:mt-6">
        <h1 className="text-3xl text-gray-800 font-bold text-center mb-2">
          Latest Properties
        </h1>
        <p className="text-center text-gray-600 mb-8">
          These are the latest properties in the Sales category. You can create the list using the "latest listing shortcode" and show items by specific categories.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill()
            .map((_, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white p-3 rounded-xl shadow-md overflow-hidden border-2 border-gray-200 hover:border-red-500 transition-colors"
              >
                <div className="relative">
                  <Image
                    alt="House in Upper East Side"
                    width={600}
                    height={600}
                    className="w-full h-48 rounded-xl object-cover"
                    src="https://storage.googleapis.com/a1aa/image/6MQ8dZfrmox3SSiucUGj5dGaWZR-Ffrogq_jcBHsPOI.jpg"
                  />
                  <div className="absolute right-3 bottom-0 flex gap-1 items-center text-white mb-2 bg-red-600 px-2 py-1 rounded-lg">
                    <FaMapMarkerAlt />
                    Greenview, Jersey City
                  </div>
                </div>
                <div className="p-4">
                  <h2 className="text-xl text-gray-800 font-bold mb-2">
                    House in Upper East Side
                  </h2>
                  <p className="text-red-600 text-lg font-semibold mb-2">
                    $150,000
                  </p>
                  <p className="text-gray-600 mb-2 line-clamp-2">
                    Beautiful Huge 1 Family House In Heart Of Westbury. Newly Renovated With New Wood Floors.
                  </p>
                  <div className="flex gap-1 items-center text-gray-600 mb-1">
                    <AiOutlineHome />
                    Villa
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-gray-600">
                      <LiaArrowsAltSolid className="rotate-45" />
                      2235 sqft
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <LiaBedSolid />
                      3 BHK
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
        <div className="flex justify-center mt-8">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/propertylisting"
              className="bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg flex items-center gap-2"
            >
              ALL PROPERTIES <BsArrowRight className="text-xl" />
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="relative px-4 sm:px-6 lg:px-8 h-[500px] sm:h-[400px] lg:h-[300px] bg-white">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
          style={{ backgroundImage: 'url(/Home/Awards/image.jpg)' }}
        ></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
          <div className="flex flex-col gap-4 items-center justify-center bg-white mx-6 py-12 rounded-3xl my-12 shadow-lg">
            <h2 className="text-2xl sm:text-xl md:text-3xl text-gray-800 font-bold mb-4 text-center">
              Awards and Recognitions
            </h2>
            <div className="flex flex-wrap justify-center w-full max-w-4xl gap-10">
              {['award1.png', 'award2.png', 'award3.png', 'award4.png', 'award5.png'].map((award, idx) => (
                <Image
                  key={idx}
                  alt={`Award ${idx + 1}`}
                  className="h-12 sm:h-10 md:h-12"
                  src={`/img/Home/Awards/${award}`}
                  width={130}
                  height={130}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mt-12 flex flex-col items-center justify-center gap-2.5">
          <h2 className="text-3xl text-gray-800 font-bold">Properties by Category</h2>
          <p className="text-gray-600 w-1/2">
            Highlight the best of your properties by using the List Category shortcode. You can list specific properties categories, types, cities, areas.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mt-8 p-4">
          {[
            { type: 'House', img: 'category_house.png', count: 17 },
            { type: 'Villa', img: 'category_villa.png', count: 12 },
            { type: 'Flat', img: 'category_flat.png', count: 10 },
            { type: 'Office', img: 'category_office.png', count: 8 },
          ].map((category, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="relative col-span-2 md:col-span-1 lg:col-span-1"
            >
              <Image
                width={500}
                height={500}
                alt={`${category.type} interior`}
                className="w-full h-60 md:h-full object-cover rounded-3xl"
                src={`/img/Home/Category/${category.img}`}
              />
              <div className="absolute inset-0 bg-black opacity-60 hover:opacity-40 flex flex-col justify-end p-4 rounded-3xl transition-opacity">
                <h3 className="text-white text-xl font-bold absolute top-6 left-6">{category.type}</h3>
                <p className="text-white absolute bottom-6 left-6">{category.count} listings</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section> */}

      <section className="container mx-auto px sm:px-6 lg:px-8 pb-12">
        <div className="text-center mt-12 flex flex-col items-center justify-center gap-2.5">
          <h2 className="text-3xl text-black font-bold">Properties by Category</h2>
          <p className="text-gray-600 w-1/2 ">Highlight the best of your properties by using the List Category shortcode. You can list specific properties categories, types, cities, areas.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mt-8 p-4">
          <div className="relative col-span-2 row-span-2">
            <Image width={500} height={500} alt="House interior" className="w-full h-full object-cover rounded-3xl" src="/img/Home/Category/category_house.png" />
            <div className="absolute inset-0 bg-black opacity-60 hover:opacity-40 flex flex-col justify-end p-4 rounded-3xl"></div>
            <h3 className="text-white text-xl font-bold absolute top-8 left-8">House</h3>
            <p className="text-white absolute bottom-8 left-8">17 listings</p>
          </div>
          <div className="relative col-span-2">
            <Image width={500} height={500} alt="Villa interior" className="w-full h-60 md:h-full object-cover rounded-3xl" src="/img/Home/Category/category_villa.png" />
            <div className="absolute inset-0 bg-black opacity-60 hover:opacity-40 flex flex-col justify-end p-4 rounded-3xl"></div>
            <h3 className="text-white text-xl font-bold absolute top-6 left-6">Villa</h3>
            <p className="text-white absolute bottom-6 left-6">12 listings</p>

          </div>
          <div className="relative col-span-2 md:col-span-1">
            <Image width={500} height={500} alt="Flat interior" className="w-full h-60 md:h-full object-cover rounded-3xl" src="/img/Home/Category/category_flat.png" />
            <div className="absolute inset-0 bg-black opacity-60 hover:opacity-40 flex flex-col justify-end p-4 rounded-3xl"></div>
            <h3 className="text-white text-xl font-bold absolute top-6 left-6">Flat</h3>
            <p className="text-white absolute bottom-6 left-6">10 listings</p>

          </div>

          <div className="relative col-span-2 md:col-span-1">
            <Image width={500} height={500} alt="Office interior" className="w-full h-60 md:h-full object-cover rounded-3xl" src="/img/Home/Category/category_office.png" />
            <div className="absolute inset-0 bg-black opacity-60 hover:opacity-40 flex flex-col justify-end p-4 rounded-3xl"></div>
            <h3 className="text-white text-xl font-bold absolute top-6 left-6">Office</h3>
            <p className="text-white absolute bottom-6 left-6">8 listings</p>

          </div>
        </div>
      </section>

      <section className="relative">
        <Image
          width={500}
          height={500}
          alt="City skyline background"
          className="w-full h-[600px] sm:h-[500px] object-cover"
          src="/img/Home/reviewsbg.png"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h2 className="text-3xl font-bold">Customer Reviews</h2>
          <p className="text-center w-1/2 mt-2 text-gray-200">
            Highlight the best of your property by using the List Category shortcode. You can list specific properties categories, types, cities, areas.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white text-black rounded-lg shadow-lg py-20 pb-6 px-8 mt-6 max-w-3xl mx-auto relative"
          >
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
              <div className="gradient-border-wrapper w-24 h-24 rounded-full">
                <Image
                  alt="Customer profile picture"
                  className="w-20 h-20 rounded-full"
                  height={100}
                  src="https://storage.googleapis.com/a1aa/image/uB2wOnDwx1NEg3G2rv8Onl6ilY600uTFSK2pP8vP4PY.jpg"
                  width={100}
                />
              </div>
            </div>
            <p className="text-center mt-10 text-gray-600">
              The WP Estate team delivered on that expectation and I would highly recommend them to anyone who is in the market. Their professionalism is truly exceptional.
            </p>
            <p className="text-center text-lg font-bold mt-4 text-gray-800">Dana Gilmore</p>
            <div className="flex justify-center mt-2">
              <Box sx={{ '& > legend': { mt: 2 } }}>
                <Rating
                  name="read-only"
                  value={value}
                  readOnly
                  emptyIcon={<StarIcon style={{ opacity: 0.9, color: 'lightgray' }} fontSize="inherit" />}
                />
              </Box>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center">
        <h2 className="text-3xl text-gray-800 font-bold text-center">Featured Properties</h2>
        <p className="text-center text-gray-600 w-1/2 mt-2">
          Here are two listings displayed with the featured property shortcode, which you can use when you have some special properties to present.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center mt-8 gap-8">
          {Array(2)
            .fill()
            .map((_, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white flex flex-col lg:flex-row rounded-xl shadow-lg border border-gray-200 hover:border-red-500"
              >
                <div className="lg:w-1/3">
                  <Image
                    width={500}
                    height={500}
                    alt="Villa on Washington Avenue"
                    className="h-full object-cover rounded-l-xl"
                    src="https://storage.googleapis.com/a1aa/image/vylnvq-UQdiDV7z8HMcoA6fbv2X_swo46jE7OKkRrn8.jpg"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl text-gray-800 font-bold">
                    Villa on Washington Avenue
                  </h3>
                  <p className="text-red-600 text-lg font-bold mt-2">$150,000</p>
                  <p className="text-gray-600 mt-2 flex gap-1 items-center">
                    <IoLocationOutline /> Greenville, Jersey City
                  </p>
                  <p className="text-gray-600 mt-2 line-clamp-2">
                    Beautiful Single Family Home in Heart of Greenville...
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                      <span className="ml-2 text-gray-600 flex items-center gap-1">
                        <AiOutlineHome /> Villa
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="ml-2 text-gray-600 flex items-center gap-1">
                        <LiaBedSolid /> 3BHK
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="ml-2 text-gray-600 flex items-center gap-1">
                        <LiaArrowsAltSolid className="rotate-45" /> 2200 sqft
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </section>

      <section className="relative">
        <Image
          width={500}
          height={500}
          alt="City skyline background"
          className="w-full h-[360px] md:h-[260px] object-cover"
          src="/img/Home/subscribebg.png"
        />
        <div className="absolute inset-0 bg-red-700 opacity-30"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h2 className="text-3xl text-white font-bold mb-4">Subscribe</h2>
          <p className="text-white text-center mb-6">
            Subscribe to keep up with fresh news and exciting updates. We promise not to spam you!
          </p>
          <form className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            <input
              className="border bg-white border-gray-300 text-black p-2 rounded w-full md:w-auto focus:outline-none focus:border-red-500"
              placeholder="Name"
              type="text"
            />
            <input
              className="border bg-white border-gray-300 text-black p-2 rounded w-full md:w-auto focus:outline-none focus:border-red-500"
              placeholder="Email"
              type="email"
            />
            <input
              className="border bg-white border-gray-300 text-black p-2 rounded w-full md:w-auto focus:outline-none focus:border-red-500"
              placeholder="Phone Number"
              type="text"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-red-500 to-red-700 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg"
              type="submit"
            >
              Submit
            </motion.button>
          </form>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['advertisement1.png', 'advertisement2.png'].map((ad, idx) => (
            <div className='flex items-center justify-center' key={idx}>
              <Image
                key={idx}
                width={500}
                height={500}
                src={`/img/Home/${ad}`}
                className="h-full rounded-xl shadow-md"
                alt={`Advertisement ${idx + 1}`}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Page;