import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-[#2B3674] mb-4">SMAART HEALTHCARE</h3>
            <p className="text-gray-600 mb-4">
              Empowering healthcare through innovative solutions and compassionate care.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#2B3674]"><FaFacebookF /></a>
              <a href="#" className="text-gray-400 hover:text-[#2B3674]"><FaTwitter /></a>
              <a href="#" className="text-gray-400 hover:text-[#2B3674]"><FaInstagram /></a>
              <a href="#" className="text-gray-400 hover:text-[#2B3674]"><FaLinkedinIn /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-[#2B3674] mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-[#2B3674]">Home</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-[#2B3674]">About Us</Link></li>
              <li><Link to="/services" className="text-gray-600 hover:text-[#2B3674]">Services</Link></li>
              <li><Link to="/doctors" className="text-gray-600 hover:text-[#2B3674]">Doctors</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-[#2B3674] mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li><Link to="/services/medical-records" className="text-gray-600 hover:text-[#2B3674]">Medical Records</Link></li>
              <li><Link to="/services/appointments" className="text-gray-600 hover:text-[#2B3674]">Appointments</Link></li>
              <li><Link to="/services/telemedicine" className="text-gray-600 hover:text-[#2B3674]">Telemedicine</Link></li>
              <li><Link to="/services/emergency" className="text-gray-600 hover:text-[#2B3674]">Emergency Care</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-[#2B3674] mb-4">Contact Info</h4>
            <ul className="space-y-2">
              <li className="text-gray-600">+1 234 567 8900</li>
              <li className="text-gray-600">contact@example.com</li>
              <li className="text-gray-600">123 Medical Center Drive,<br />Healthcare City, HC 12345</li>
              <li className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600">
            © 2024 SMAART HEALTHCARE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
