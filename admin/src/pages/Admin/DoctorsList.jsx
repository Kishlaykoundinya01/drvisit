import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'

const DoctorsList = () => {

  const { doctors , aToken , getAllDoctors, changeAvailability, deleteDoctor, changeDoctorPassword} = useContext(AdminContext)
  const [passwordDoctorId, setPasswordDoctorId] = useState(null)
  const [newPassword, setNewPassword] = useState('')

  useEffect(() => {
    if (aToken) {
        getAllDoctors()
    }
}, [aToken])

  const handleDelete = (doctorId, doctorName) => {
    if (window.confirm(`Are you sure you want to delete Dr. ${doctorName}?`)) {
      deleteDoctor(doctorId)
    }
  }

  const handleChangePassword = async () => {
    if (!newPassword || newPassword.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }
    const success = await changeDoctorPassword(passwordDoctorId, newPassword)
    if (success) {
      setPasswordDoctorId(null)
      setNewPassword('')
    }
  }

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium text-gray-800 dark:text-slate-200'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {doctors.map((item, index) => (
          <div className='border border-[#C9D8FF] dark:border-slate-700 rounded-xl max-w-56 overflow-hidden cursor-pointer group bg-white dark:bg-slate-800 transition-colors' key={index}>
            <img className='bg-[#EAEFFF] dark:bg-slate-700 group-hover:bg-primary transition-all duration-500' src={item.image} alt="" />
            <div className='p-4'>
              <p className='text-[#262626] dark:text-slate-200 text-lg font-medium group-hover:text-primary'>{item.name}</p>
              <p className='text-[#5C5C5C] dark:text-slate-400 text-sm group-hover:text-primary'>{item.speciality}</p>
              <div className='mt-2 flex items-center gap-1 text-sm'>
                <span className='text-yellow-500'>
                  {item.rating ? Math.round(item.rating) : 'No ratings'}
                </span>
                <span className='text-xs text-gray-500 dark:text-slate-500'>({item.totalRatings || 0} {item.totalRatings === 1 ? 'review' : 'reviews'})</span>
              </div>
              <div className='mt-2 flex items-center gap-1 text-sm text-gray-600 dark:text-slate-400'>
                <input onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available} />
                <p>Available</p>
              </div>

              {/* Password change section */}
              {passwordDoctorId === item._id ? (
                <div className='mt-2 flex flex-col gap-1'>
                  <input
                    type='password'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className='w-full border border-gray-300 dark:border-slate-600 rounded px-2 py-1 text-xs bg-white dark:bg-slate-700 dark:text-slate-200 outline-none focus:border-primary'
                    placeholder='New password (min 8 chars)'
                    autoFocus
                  />
                  <div className='flex gap-1'>
                    <button
                      onClick={handleChangePassword}
                      className='flex-1 py-1 bg-primary text-white text-xs rounded hover:bg-primary/80 transition-all'
                    >
                      Save
                    </button>
                    <button
                      onClick={() => { setPasswordDoctorId(null); setNewPassword('') }}
                      className='flex-1 py-1 bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-slate-300 text-xs rounded hover:bg-gray-300 dark:hover:bg-slate-500 transition-all'
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => { setPasswordDoctorId(item._id); setNewPassword('') }}
                  className='mt-2 w-full py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-500 border border-blue-200 dark:border-blue-800 text-sm rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all'
                >
                  Change Password
                </button>
              )}

              <button
                onClick={() => handleDelete(item._id, item.name)}
                className='mt-2 w-full py-1.5 bg-red-50 dark:bg-red-900/20 text-red-500 border border-red-200 dark:border-red-800 text-sm rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 hover:text-red-600 transition-all'
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList
