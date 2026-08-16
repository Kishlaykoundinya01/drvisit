import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-[#707070] dark:text-slate-400'>
        <p>CONTACT <span className='text-gray-700 dark:text-slate-200 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className=' font-semibold text-lg text-gray-600 dark:text-slate-300'>OUR OFFICE</p>
          <p className=' text-gray-500 dark:text-slate-400'>Patna <br /> Bihar, India</p>
          <p className=' text-gray-500 dark:text-slate-400'>Tel: (+91) 9922992299 <br /> Email: customersupport@DrVisit.in</p>
          <p className=' font-semibold text-lg text-gray-600 dark:text-slate-300'>CAREERS AT DrVisit</p>
          <p className=' text-gray-500 dark:text-slate-400'>Learn more about our teams and job openings.</p>
          <button className='border border-black dark:border-slate-400 px-8 py-4 text-sm hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>

    </div>
  )
}

export default Contact
