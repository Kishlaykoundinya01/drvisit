import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
const navigate = useNavigate();
const location = useLocation();
const [showMenu, setShowMenu] = useState(false);

const { token, setToken, userData } = useContext(AppContext);
const { theme, toggleTheme } = useTheme();

const logout = () => {
localStorage.removeItem('token');
setToken(false);
navigate('/login');
};

const navLinkClass = ({ isActive }) =>
`relative px-2 py-1 transition-all duration-300 ${
      isActive
        ? 'text-sky-600 dark:text-sky-400 font-semibold'
        : 'text-slate-700 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-400'
    }`;

return (
<>
<motion.div
initial={{ y: -40, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ duration: 0.6 }}
className="sticky top-4 z-50 mb-8"
> <div
       className="
       bg-white/90
       dark:bg-slate-900/90
       backdrop-blur-xl
       rounded-[28px]
       shadow-xl
       border
       border-slate-200
       dark:border-slate-700
       px-5 md:px-8
       py-3
       flex
       items-center
       justify-between
     "
     >
{/* Logo */}


      <div
        onClick={() => navigate('/')}
        className="cursor-pointer flex items-center gap-3"
      >
        <div className="w-14 h-14 overflow-hidden rounded-xl">
          <img
            src={assets.logo}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="hidden sm:block">
          <h2 className="font-bold text-xl text-slate-800 dark:text-slate-100">
            DrVisit
          </h2>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Healthcare Platform
          </p>
        </div>
      </div>

      {/* Desktop Menu */}

      <ul className="hidden md:flex items-center gap-8 font-medium">

        <li>
          <NavLink className={navLinkClass} to="/">
            HOME
          </NavLink>
        </li>

        <li>
          <NavLink className={navLinkClass} to="/doctors">
            DOCTORS
          </NavLink>
        </li>

        <li>
          <NavLink className={navLinkClass} to="/about">
            ABOUT
          </NavLink>
        </li>

        <li>
          <NavLink className={navLinkClass} to="/contact">
            CONTACT
          </NavLink>
        </li>

      </ul>

      {/* Right Side */}

      <div className="flex items-center gap-4">

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="
            w-10
            h-10
            flex
            items-center
            justify-center
            rounded-full
            border
            border-slate-300
            dark:border-slate-600
            text-slate-700
            dark:text-slate-200
            hover:bg-slate-100
            dark:hover:bg-slate-800
            transition-all
          "
        >
          {theme === 'dark' ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        {location.pathname === '/' && (
          <button
            onClick={() =>
              window.location.href =
                import.meta.env.VITE_ADMIN_URL ||
                'http://localhost:5174'
            }
            className="
              hidden lg:block
              bg-slate-800
              text-white
              px-5
              py-2.5
              rounded-full
              hover:scale-105
              transition-all
            "
          >
            Admin Panel
          </button>
        )}

        {token && userData ? (
          <div className="relative group">

            <div className="flex items-center gap-2 cursor-pointer">

              <img
                src={userData.image}
                alt=""
                className="
                  w-11
                  h-11
                  rounded-full
                  border-2
                  border-sky-400
                  object-cover
                "
              />

              <img
                src={assets.dropdown_icon}
                alt=""
                className="w-3"
              />

            </div>

            <div
              className="
                absolute
                right-0
                top-14
                hidden
                group-hover:block
                z-50
              "
            >
              <div
                className="
                  bg-white
                  dark:bg-slate-800
                  shadow-xl
                  rounded-2xl
                  min-w-[220px]
                  border
                  border-slate-100
                  dark:border-slate-700
                  p-3
                "
              >
                <p
                  onClick={() =>
                    navigate('/my-profile')
                  }
                  className="
                    p-3
                    rounded-xl
                    hover:bg-slate-100
                    dark:hover:bg-slate-700
                    cursor-pointer
                  "
                >
                  My Profile
                </p>

                <p
                  onClick={() =>
                    navigate('/my-appointments')
                  }
                  className="
                    p-3
                    rounded-xl
                    hover:bg-slate-100
                    dark:hover:bg-slate-700
                    cursor-pointer
                  "
                >
                  My Appointments
                </p>

                <p
                  onClick={logout}
                  className="
                    p-3
                    rounded-xl
                    hover:bg-red-50
                    dark:hover:bg-red-900/30
                    text-red-500
                    cursor-pointer
                  "
                >
                  Logout
                </p>
              </div>
            </div>

          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="
              hidden md:block
              bg-sky-500
              hover:bg-sky-600
              text-white
              px-6
              py-3
              rounded-full
              transition-all
              hover:scale-105
            "
          >
            Create Account
          </button>
        )}

        {/* Mobile Menu Button */}

        <button
          onClick={() => setShowMenu(true)}
          className="md:hidden"
        >
          <img
            src={assets.menu_icon}
            alt=""
            className="w-6"
          />
        </button>

      </div>
    </div>
  </motion.div>

  <AnimatePresence>
    {showMenu && (
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.35 }}
        className="
          fixed
          top-0
          right-0
          w-full
          h-screen
          bg-white
          dark:bg-slate-950
          z-[100]
        "
      >
        <div className="flex justify-between items-center p-6">

          <h2 className="font-bold text-2xl dark:text-slate-100">
            DrVisit
          </h2>

          <img
            src={assets.cross_icon}
            alt=""
            className="w-8 cursor-pointer dark:invert dark:brightness-200"
            onClick={() => setShowMenu(false)}
          />
        </div>

        <div className="flex flex-col gap-5 p-8 text-xl dark:text-slate-200">

          <NavLink
            to="/"
            onClick={() => setShowMenu(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/doctors"
            onClick={() => setShowMenu(false)}
          >
            Doctors
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => setShowMenu(false)}
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            onClick={() => setShowMenu(false)}
          >
            Contact
          </NavLink>

          <div className="mt-4 flex items-center gap-4">

            <button
              onClick={() => {
                toggleTheme();
                setShowMenu(false);
              }}
              aria-label="Toggle dark mode"
              className="
                flex
                items-center
                justify-center
                w-12
                h-12
                rounded-full
                border
                border-slate-300
                dark:border-slate-600
                text-slate-700
                dark:text-slate-200
                hover:bg-slate-100
                dark:hover:bg-slate-800
                transition-all
              "
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            {!token && (
              <button
                onClick={() => {
                  navigate('/login');
                  setShowMenu(false);
                }}
                className="
                  flex-1
                  bg-sky-500
                  hover:bg-sky-600
                  text-white
                  px-6
                  py-3
                  rounded-full
                  text-base
                  transition-all
                "
              >
                Login
              </button>
            )}

          </div>

        </div>
      </motion.div>
    )}
  </AnimatePresence>
</>


);
};

export default Navbar;
