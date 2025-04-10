import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { FaHospital, FaUserMd, FaPills, FaLaptopMedical } from 'react-icons/fa'

const About = () => {
  const navigate = useNavigate();
  
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      {/* Header Section */}
      <div className='text-center mb-16'>
        <h1 className='text-4xl font-bold text-primary mb-4'>SMAART Healthcare</h1>
        <p className='text-xl text-gray-600'>Your one-stop integrated healthcare provider</p>
      </div>

      {/* Main Content Section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16'>
        {/* Healthcare Ecosystem Image */}
        <div className='flex justify-center'>
          <img 
            src={assets.about_image} 
            alt="Healthcare Ecosystem" 
            className='max-w-full h-auto rounded-lg shadow-xl'
          />
        </div>

        {/* Introduction Text */}
        <div className='space-y-6 text-gray-600'>
          <p className='text-lg leading-relaxed'>
            <span className='text-primary font-semibold'>SMAART Healthcare</span> is revolutionizing the way healthcare is delivered by combining <span className='text-primary font-semibold'>multispeciality expertise</span> with the latest advancements in <span className='text-primary font-semibold'>AI-powered technologies</span> and <span className='text-primary font-semibold'>digital medicine</span>.
          </p>
          <p className='text-lg leading-relaxed'>
            We offer a seamless blend of <span className='text-primary font-semibold'>holistic preventive care</span>, precise diagnostics, advanced treatment, and compassionate patient-centric care, ensuring that every individual receives the highest standards of medical excellence.
          </p>
        </div>
      </div>

      {/* Healthcare Excellence Section */}
      <div className='mb-16'>
        <h2 className='text-2xl font-bold text-gray-800 mb-8 text-center'>Healthcare Excellence & Operational Efficiency</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          <div className='bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'>
            <FaHospital className='text-primary text-4xl mb-4' />
            <h3 className='text-xl font-semibold mb-2'>World-class Technologies</h3>
            <p className='text-gray-600'>Equipped with cutting-edge facility designed for exceptional healthcare experience</p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'>
            <FaUserMd className='text-primary text-4xl mb-4' />
            <h3 className='text-xl font-semibold mb-2'>Expert Specialists</h3>
            <p className='text-gray-600'>Highly skilled and internationally trained specialists in their respective fields</p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'>
            <FaLaptopMedical className='text-primary text-4xl mb-4' />
            <h3 className='text-xl font-semibold mb-2'>Telehealth Services</h3>
            <p className='text-gray-600'>Quality care at your fingertips, ensuring accessibility and convenience</p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'>
            <FaPills className='text-primary text-4xl mb-4' />
            <h3 className='text-xl font-semibold mb-2'>Comprehensive Care</h3>
            <p className='text-gray-600'>Complete healthcare solutions under one roof</p>
          </div>
        </div>
      </div>

      {/* Our SMAART Values Section */}
      <div className='mb-16'>
        <h2 className='text-2xl font-bold text-gray-800 mb-8 text-center'>Our 'SMAART' Values</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='space-y-4'>
            <div className='flex items-center space-x-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-300'>
              <span className='text-primary font-semibold'>Service Quality</span>
              <span className='text-gray-600'>|</span>
              <span className='text-gray-600'>Delivering excellence in healthcare</span>
            </div>
            <div className='flex items-center space-x-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-300'>
              <span className='text-primary font-semibold'>Medical Excellence</span>
              <span className='text-gray-600'>|</span>
              <span className='text-gray-600'>Following global quality standards</span>
            </div>
            <div className='flex items-center space-x-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-300'>
              <span className='text-primary font-semibold'>Accessible</span>
              <span className='text-gray-600'>|</span>
              <span className='text-gray-600'>Healthcare available when you need it</span>
            </div>
          </div>
          <div className='space-y-4'>
            <div className='flex items-center space-x-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-300'>
              <span className='text-primary font-semibold'>Affordable</span>
              <span className='text-gray-600'>|</span>
              <span className='text-gray-600'>Quality care at reasonable costs</span>
            </div>
            <div className='flex items-center space-x-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-300'>
              <span className='text-primary font-semibold'>Responsible</span>
              <span className='text-gray-600'>|</span>
              <span className='text-gray-600'>Committed to patient well-being</span>
            </div>
            <div className='flex items-center space-x-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-300'>
              <span className='text-primary font-semibold'>Technology</span>
              <span className='text-gray-600'>|</span>
              <span className='text-gray-600'>Leveraging modern healthcare solutions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className='text-center bg-gradient-to-r from-primary/10 to-primary/5 p-12 rounded-2xl'>
        <h2 className='text-2xl font-bold text-primary mb-4'>
          Your health is not just our priority—it's our purpose
        </h2>
        <p className='text-gray-600 mb-8'>Experience a smarter way to care</p>
        <button 
          onClick={() => navigate('/book-appointment')}
          className='bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl'
        >
          Book an Appointment
        </button>
      </div>
    </div>
  )
}

export default About

