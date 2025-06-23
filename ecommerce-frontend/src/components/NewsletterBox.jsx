import React from 'react'

const NewsletterBox = () => {
    const onSubmitHandler=(event)=>{
        event.preventDefault();
    }
  return (
    <div className='text-center border-t border-gray-500  py-5'>
        < p className='font-medium text-2xl text-gray-800'>
            Subscribe to our Newsletter

        </p>
        <p className='text-gray-500 mt-3 text-sm'>
            Stay updated with our latest trends and offers.
        </p>
        <form  onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center  mx-auto my-6 border pl-3 '>
            <input type="email" placeholder="Enter your email" className='w-full h-10 text-black outline-none pl-3' />
            <button className='bg-black text-white text-xs px-5 py-2 h-10'>Subscribe</button>
      </form>
    </div>
  )
}

export default NewsletterBox;
