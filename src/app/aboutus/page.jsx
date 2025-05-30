'use client'
import Image from 'next/image';
import React from 'react'

const Page = () => {
  return (
    <div className="bg-white">
      <div className="relative w-full h-[150px] bg-cover bg-center" style={{ backgroundImage: "url('/img/Aboutus/about.png')" }}>
        <div className="top-0 left-0 w-full h-full bg-black opacity-50 "></div>
        <h1 className="w-full text-center text-2xl font-semibold text-white absolute top-14 z-10">About Us</h1>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="mb-12">
          <h2 className="font-roboto text-black font-bold text-[30px] leading-[35.16px]mb-4">
            About
            <span className="text-blue-600 font-normal ml-1">
              Real Estate
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="mb-4 font-roboto font-normal text-base leading-[25px] text-[#494949]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laborum odio id voluptatibus incidunt cum? Atque quasi eum debitis optio ab. Esse itaque officiis tempora possimus odio rerum aperiam ratione, sunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laborum odio id voluptatibus incidunt cum? Atque quasi eum debitis optio ab. Esse itaque officiis tempora possimus odio rerum aperiam ratione, sunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit sunt.
              </p>
              <p className="mb-4 font-roboto font-normal text-base leading-[25px] text-[#494949]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laborum odio id voluptatibus incidunt cum? Atque quasi eum debitis optio ab. Esse itaque officiis tempora possimus odio rerum aperiam ratione, sunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Laborum odio id voluptatibus incidunt cum? Atque quasi eum debitis optio ab. Esse itaque officiis tempora possimus odio rerum aperiam ratione, sunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit sunt.
              </p>
            </div>
            <div className="relative flex items-start justify-end">
              <Image width={500} height={500} className='xl:w-4/5 h-2/3 lg:h-auto xl:h-4/5 object-contain' alt="A modern house with a wooden staircase and large windows" src="/img/Aboutus/about1.png" />
              <Image width={500} height={500} className='absolute w-3/5 xl:w-1/2 p-2 bg-white bottom-0 left-0' alt="A family looking at a laptop in front of a modern house" src="/img/Aboutus/about2.png" />
            </div>
          </div>
        </div>
      </div>
      <div className='bg-gray-200 py-12'>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-roboto font-bold text-[32px] leading-[37.5px] text-center text-[#202020] mb-8">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg flex flex-col items-center shadow-md text-center gap-3">
              <Image width={70} height={70} src='/img/Aboutus/house.png' alt='House-1' />
              <h3 className="font-roboto font-semibold text-[20px] leading-[23.44px] text-[#333333]">
                Wide Range Of Properties
              </h3>
              <p className='text-[#585858] font-roboto font-normal text-base leading-[23px] text-center'>
                Lorem ipsum dolor sit amet, consectetur pro adipisici consectetur debitis adipisciing lacus consectetur Business Directory.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg flex flex-col items-center shadow-md text-center gap-3">
              <Image width={70} height={70} src='/img/Aboutus/hand.png' alt='House-2' />
              <h3 className="font-roboto font-semibold text-[20px] leading-[23.44px] text-[#333333]">
                Trusted by thousands
              </h3>
              <p className='text-[#585858] font-roboto font-normal text-base leading-[23px] text-center'>
                Lorem ipsum dolor sit amet, consectetur pro adipisici consectetur debitis adipisciing lacus consectetur Business Directory.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg flex flex-col items-center shadow-md text-center gap-3">
              <Image width={70} height={70} src="/img/Aboutus/wallet.png" alt="" />
              <h3 className="font-roboto font-semibold text-[20px] leading-[23.44px] text-[#333333]">
                Financing made easy
              </h3>
              <p className='text-[#585858] font-roboto font-normal text-base leading-[23px] text-center'>
                Lorem ipsum dolor sit amet, consectetur pro adipisici consectetur debitis adipisciing lacus consectetur Business Directory.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="bg-cover bg-center py-16" style={{ backgroundImage: "url('Aboutus/statistics.png')" }}>
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
        <div className="container mx-auto flex justify-center gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg flex items-center gap-4">
            <img src='Aboutus/home.png' />
            <div className='flex flex-col items-start justify-start'>
              <h2 className="text-3xl font-bold">300</h2>
              <p className="text-gray-600">Sold Houses</p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg flex items-center gap-4">
            <img src="Aboutus/listing.png" alt="" />
            <div className='flex flex-col items-start justify-start'>
              <h2 className="text-3xl font-bold">400</h2>
              <p className="text-gray-600">Daily Listings</p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg flex items-center gap-4">
            <img src="Aboutus/agent.png" alt="" />
            <div className='flex flex-col items-start justify-start'>
              <h2 className="text-3xl font-bold">250</h2>
              <p className="text-gray-600">Expert Agents</p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg flex items-center gap-4">
            <img src="Aboutus/badge.png" alt="" />
            <div className='flex flex-col items-start justify-start'>
              <h2 className="text-3xl font-bold">150</h2>
              <p className="text-gray-600">Won Awards</p>
            </div>
          </div>
        </div>
      </div> */}
      <div className="relative bg-cover bg-center py-16" style={{ backgroundImage: "url('/img/Aboutus/statistics.png')" }}>
        {/* Black overlay with 50% opacity */}
        <div className="absolute inset-0 bg-black opacity-60 z-0"></div>

        <div className="container mx-auto flex justify-center gap-8 relative z-10">
          <div className="bg-white px-8 py-6 rounded-lg shadow-lg flex items-center gap-8">
            <Image width={60} height={60} src='/img/Aboutus/home.png' alt="Sold Houses" />
            <div className='flex flex-col items-start justify-start'>
              <h2 className="text-3xl text-black font-bold">300</h2>
              <p className="text-gray-600">Sold Houses</p>
            </div>
          </div>
          <div className="bg-white px-8 py-6 rounded-lg shadow-lg flex items-center gap-8">
            <Image width={50} height={50} src="/img/Aboutus/listing.png" alt="Daily Listings" />
            <div className='flex flex-col items-start justify-start'>
              <h2 className="text-3xl text-black font-bold">400</h2>
              <p className="text-gray-600">Daily Listings</p>
            </div>
          </div>
          <div className="bg-white px-8 py-6 rounded-lg shadow-lg flex items-center gap-8">
            <Image width={65} height={65} src="/img/Aboutus/agent.png" alt="Expert Agents" />
            <div className='flex flex-col items-start justify-start'>
              <h2 className="text-3xl text-black font-bold">250</h2>
              <p className="text-gray-600">Expert Agents</p>
            </div>
          </div>
          <div className="bg-white px-8 py-6 rounded-lg shadow-lg flex items-center gap-8">
            <Image width={65} height={65} src="/img/Aboutus/badge.png" alt="Won Awards" />
            <div className='flex flex-col items-start justify-start'>
              <h2 className="text-3xl text-black font-bold">150</h2>
              <p className="text-gray-600">Won Awards</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl text-black font-bold text-center mb-12">More About Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className=''>
            <h3 className="text-xl text-black font-semibold mb-4">Our Mission</h3>
            <p className="text-gray-600">With over $3.5 Billion in sales, Ls Real Estate Group is the industry's top luxury producer, with over 30 years of experience in marketing Seattle's most prestigious waterfront properties.</p>
          </div>
          <div>
            <h3 className="text-xl text-black font-semibold mb-4">Our Vision</h3>
            <p className="text-gray-600">Due to our unmatched results, expertise, and dedication, Ls Real Estate Group ranks among the Top 3 agencies in Seattle and the surrounding area. We aim to stay the best for always.</p>
          </div>
          <div>
            <h3 className="text-xl text-black font-semibold mb-4">Our Values</h3>
            <p className="text-gray-600">With her years of experience, impressive property portfolio, celebrity clientele, and unparalleled knowledge of the market and pedigree estates, Simone estimable business is sophisticated and renowned.</p>
          </div>
          <div>
            <h3 className="text-xl text-black font-semibold mb-4">Our Resources</h3>
            <p className="text-gray-600">With her years of experience, impressive property portfolio, celebrity clientele, and unparalleled knowledge of the market and pedigree estates, Simone estimable business is sophisticated and renowned.</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Page;