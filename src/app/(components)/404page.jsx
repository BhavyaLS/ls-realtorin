import React from 'react'
import { BiSolidError } from "react-icons/bi";
const Errorpage = () => {
  return (
    <div className='min-h-screen flex flex-col gap-2 items-center justify-center bg-gray-100 w-full'>

      <p className='text-red-700 text-4xl font-bold flex items-center gap-1'><BiSolidError />Error 404</p>
      <p className='text-gray-400 font-semibold text-5xl'>Page Not Found!</p>
    </div>
  )
}

export default Errorpage;