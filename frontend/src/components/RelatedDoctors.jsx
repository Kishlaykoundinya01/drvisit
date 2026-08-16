import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext)
  const navigate = useNavigate()

  const [relDoc, setRelDoc] = useState([])

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      )
      setRelDoc(doctorsData)
    }
  }, [doctors, speciality, docId])

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-[#262626] dark:text-slate-100'>
      <h1 className='text-3xl font-medium'>Related Doctors</h1>
      <p className='sm:w-1/3 text-center text-sm dark:text-slate-400'>Simply browse through our extensive list of trusted doctors.</p>
      <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {relDoc.map((item, index) => (
          <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='border border-[#C9D8FF] dark:border-slate-700 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
            <img className='bg-[#EAEFFF] dark:bg-slate-800' src={item.image} alt="" />
            <div className='p-4'>
              <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : "text-gray-500 dark:text-slate-400"}`}>
                <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-500 dark:bg-slate-400"}`}></p><p>{item.available ? 'Available' : "Not Available"}</p>
              </div>
              <p className='text-[#262626] dark:text-slate-100 text-lg font-medium'>{item.name}</p>
              <p className='text-[#5C5C5C] dark:text-slate-400 text-sm'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      {/* <button className='bg-[#EAEFFF] text-gray-600 px-12 py-3 rounded-full mt-10'>more</button> */}
    </div>
  )
}

export default RelatedDoctors
