import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const Navbar = () => {
  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  const logout = () => {
    navigate('/')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  const goToUserPanel = () => {
    window.location.href = 'http://localhost:5173/'
  }

  const isOnDashboard =
    location.pathname === '/admin-dashboard' ||
    location.pathname === '/doctor-dashboard'

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 transition-colors'>
      <div className='flex items-center gap-3 text-xs'>

        {/* Logo */}
        <img
          onClick={() => navigate('/')}
          className='w-36 sm:w-40 cursor-pointer'
          src={assets.admin_logo}
          alt="Logo"
        />

        {/* Role Label */}
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 dark:border-slate-400 text-gray-600 dark:text-slate-300'>
          {aToken ? 'Admin' : 'Doctor'}
        </p>

        {/* User Panel Button (visible on both dashboards) */}
        {isOnDashboard && (
          <button
            onClick={goToUserPanel}
            className='ml-2 text-white bg-primary hover:bg-primary/80 px-3 py-1.5 rounded-full text-xs transition-all'
          >
            User Panel
          </button>
        )}
      </div>

      <div className='flex items-center gap-3'>
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className='w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 dark:border-slate-600 text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all'
        >
          {theme === 'dark' ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        {/* Logout */}
        <button
          onClick={logout}
          className='bg-primary text-white text-sm px-10 py-2 rounded-full hover:bg-primary/80 transition-all'
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar
