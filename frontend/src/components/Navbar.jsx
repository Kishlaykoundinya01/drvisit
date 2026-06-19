import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
const navigate = useNavigate();
const location = useLocation();
const [showMenu, setShowMenu] = useState(false);

const { token, setToken, userData } = useContext(AppContext);

const logout = () => {
localStorage.removeItem('token');
setToken(false);
navigate('/login');
};

const navLinkClass = ({ isActive }) =>
`relative px-2 py-1 transition-all duration-300 ${
      isActive
        ? 'text-sky-600 font-semibold'
        : 'text-slate-700 hover:text-sky-600'
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
       backdrop-blur-xl
       rounded-[28px]
       shadow-xl
       border
       border-slate-200
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
          <h2 className="font-bold text-xl text-slate-800">
            DrVisit
          </h2>

          <p className="text-xs text-slate-500">
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

        {location.pathname === '/' && (
          <button
            onClick={() =>
              window.open(
                import.meta.env.VITE_ADMIN_URL ||
                  'http://localhost:5174',
                '_blank'
              )
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
                  shadow-xl
                  rounded-2xl
                  min-w-[220px]
                  border
                  border-slate-100
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
          z-[100]
        "
      >
        <div className="flex justify-between items-center p-6">

          <h2 className="font-bold text-2xl">
            DrVisit
          </h2>

          <img
            src={assets.cross_icon}
            alt=""
            className="w-8 cursor-pointer"
            onClick={() => setShowMenu(false)}
          />
        </div>

        <div className="flex flex-col gap-5 p-8 text-xl">

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

        </div>
      </motion.div>
    )}
  </AnimatePresence>
</>


);
};

export default Navbar;
