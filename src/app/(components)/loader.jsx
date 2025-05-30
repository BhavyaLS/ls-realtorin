import React from 'react'
import { FallingLines, MagnifyingGlass } from 'react-loader-spinner'

const Loader = () => {
    return (
        <div className='flex h-[90vh] bg-white w-full items-center justify-center'>

            <div className='relative flex items-center gap-3'>
                <img src="/logo.png" className="h-10" alt="" />
                {/* <span className="font-cambria text-[#2D2D2D] font-normal text-[34px] leading-[39.86px] tracking-normal">
                    Real Estate
                </span> */}
                <div className='absolute -top-4 -right-20'>
                    <MagnifyingGlass
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="magnifying-glass-loading"
                        wrapperStyle={{}}
                        wrapperClass="magnifying-glass-wrapper"
                        glassColor="#c0efff"
                        color="#2D2D2D"
                    />
                    {/* <FallingLines
                        color="#2D2D2D"
                        width="100"
                        visible={true}
                        ariaLabel="falling-circles-loading"
                    /> */}
                </div>
            </div>
        </div>
    )
}

export default Loader;