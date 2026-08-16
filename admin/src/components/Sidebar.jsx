import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'

const Sidebar = () => {

  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all ${
      isActive
        ? 'bg-primary/10 dark:bg-primary/20 border-r-4 border-primary text-primary dark:text-primary'
        : 'text-[#515151] dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800'
    }`

  return (
    <div className='min-h-screen bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 transition-colors'>
      {aToken && <ul className='mt-5'>

        <NavLink to={'/admin-dashboard'} className={linkClass}>
          <img className='min-w-5' src={assets.home_icon} alt='' />
          <p className='hidden md:block'>Dashboard</p>
        </NavLink>
        <NavLink to={'/all-appointments'} className={linkClass}>
          <img className='min-w-5' src={assets.appointment_icon} alt='' />
          <p className='hidden md:block'>Appointments</p>
        </NavLink>
        <NavLink to={'/add-doctor'} className={linkClass}>
          <img className='min-w-5' src={assets.add_icon} alt='' />
          <p className='hidden md:block'>Add Doctor</p>
        </NavLink>
        <NavLink to={'/doctor-list'} className={linkClass}>
          <img className='min-w-5' src={assets.people_icon} alt='' />
          <p className='hidden md:block'>Doctors List</p>
        </NavLink>
      </ul>}

      {dToken && <ul className='mt-5'>
        <NavLink to={'/doctor-dashboard'} className={linkClass}>
          <img className='min-w-5' src={assets.home_icon} alt='' />
          <p className='hidden md:block'>Dashboard</p>
        </NavLink>
        <NavLink to={'/doctor-appointments'} className={linkClass}>
          <img className='min-w-5' src={assets.appointment_icon} alt='' />
          <p className='hidden md:block'>Appointments</p>
        </NavLink>
        <NavLink to={'/doctor-profile'} className={linkClass}>
          <img className='min-w-5' src={assets.people_icon} alt='' />
          <p className='hidden md:block'>Profile</p>
        </NavLink>
      </ul>}
    </div>
  )
}

export default Sidebar
