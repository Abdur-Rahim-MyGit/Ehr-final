import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import { FaUserCircle } from 'react-icons/fa'

const Navbar = () => {
  const navigate = useNavigate()
  const { token, setToken } = useContext(AppContext)
  const [showMenu, setShowMenu] = useState(false)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  return (
    <nav className="bg-white py-4 px-6 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          {/* <img src={assets.logo} alt="SMAART Healthcare" className="h-8" /> */}
          <span className="text-xl font-semibold text-[#2B3674]">SMAART Healthcare</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink to="/" className={({ isActive }) => 
            `text-sm font-medium ${isActive ? 'text-[#4318FF]' : 'text-[#2B3674]'}`
          }>
            Home
          </NavLink>
          <NavLink to="/doctors" className={({ isActive }) => 
            `text-sm font-medium ${isActive ? 'text-[#4318FF]' : 'text-[#2B3674]'}`
          }>
            Find Doctors
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => 
            `text-sm font-medium ${isActive ? 'text-[#4318FF]' : 'text-[#2B3674]'}`
          }>
            About Us
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => 
            `text-sm font-medium ${isActive ? 'text-[#4318FF]' : 'text-[#2B3674]'}`
          }>
            Contact
          </NavLink>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {token ? (
            <div className="relative">
              <FaUserCircle className="text-2xl text-[#2B3674] cursor-pointer" onClick={() => setShowMenu(!showMenu)} />
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                  <NavLink to="/my-appointments" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    My Appointments
                  </NavLink>
                  <NavLink to="/health-record" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Health Record
                  </NavLink>
                  <button 
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={() => navigate('/login')}
              className="px-6 py-2 text-sm font-medium text-white bg-[#4318FF] rounded-lg hover:bg-[#3311CC] transition-colors"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-500 hover:text-gray-700"
          onClick={() => setShowMenu(!showMenu)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {showMenu && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg py-2">
          <NavLink to="/" 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setShowMenu(false)}
          >
            Home
          </NavLink>
          <NavLink to="/doctors" 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setShowMenu(false)}
          >
            Find Doctors
          </NavLink>
          <NavLink to="/about" 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setShowMenu(false)}
          >
            About Us
          </NavLink>
          <NavLink to="/contact" 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setShowMenu(false)}
          >
            Contact
          </NavLink>
          <div className="px-4 py-2">
            <button 
              className="w-full mb-2 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
              onClick={() => {
                navigate('/emergency')
                setShowMenu(false)
              }}
            >
              🚑 Emergency Care
            </button>
            {token ? (
              <button 
                onClick={() => {
                  logout()
                  setShowMenu(false)
                }}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-[#4318FF] rounded-lg hover:bg-[#3311CC]"
              >
                Sign Out
              </button>
            ) : (
              <button 
                onClick={() => {
                  navigate('/login')
                  setShowMenu(false)
                }}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-[#4318FF] rounded-lg hover:bg-[#3311CC]"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar