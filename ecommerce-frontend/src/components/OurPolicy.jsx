import React from 'react'
import exchange from '../assets/exchange.png'
import quality from '../assets/quality1.png' 
import support from '../assets/support.png'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-10 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base'>
      <div>
        <img src={exchange} alt="" className='w-12 m-auto mb-5' />
        <p className='font-semibold text-black '> Easy Exchange Policy</p>
        <p className='text-black'>we offer hassle-free exchange.</p>
      </div>
      <div>
        <img src={quality} alt="" className='w-12 m-auto mb-5' />
        <p className='font-semibold text-black'> Days Return Policy</p>
        <p className='text-black'>we offer 7 days return Policy.</p>
      </div>
      <div>
        <img src={support} alt="" className='w-12 m-auto mb-5' />
        <p className='font-semibold text-black'>best customer support</p>
        <p className='text-black'>we provide 24/7 customer support.</p>
      </div>
    </div>
  )
}

export default OurPolicy
