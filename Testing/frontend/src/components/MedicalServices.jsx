import React from 'react';
import { FaStethoscope, FaHeartbeat, FaTooth, FaBrain } from 'react-icons/fa';
import { GiMedicines, GiLungs } from 'react-icons/gi';
import { MdChildCare } from 'react-icons/md';
import { AiOutlineEye } from 'react-icons/ai';
import { IoIosFitness } from 'react-icons/io';
import { RiMentalHealthLine } from 'react-icons/ri';

const services = [
  { icon: <FaStethoscope className="w-8 h-8 text-[#2B3674]" />, name: 'General Medicine' },
  { icon: <FaHeartbeat className="w-8 h-8 text-red-500" />, name: 'Cardiology' },
  { icon: <FaTooth className="w-8 h-8 text-blue-400" />, name: 'Dental Care' },
  { icon: <FaBrain className="w-8 h-8 text-purple-500" />, name: 'Neurology' },
  { icon: <MdChildCare className="w-8 h-8 text-pink-500" />, name: 'Pediatrics' },
  { icon: <AiOutlineEye className="w-8 h-8 text-green-500" />, name: 'Ophthalmology' },
  { icon: <IoIosFitness className="w-8 h-8 text-orange-500" />, name: 'Orthopedics' },
  { icon: <GiLungs className="w-8 h-8 text-cyan-500" />, name: 'Pulmonology' },
  { icon: <GiMedicines className="w-8 h-8 text-yellow-500" />, name: 'Allergology' },
  { icon: <RiMentalHealthLine className="w-8 h-8 text-red-400" />, name: 'Mental Health' },
];

const MedicalServices = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#2B3674] mb-4">Our Medical Services</h2>
        <p className="text-center text-gray-600 mb-12">
          Discover our comprehensive range of medical services delivered by expert healthcare professionals
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-[#2B3674] font-medium">{service.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicalServices; 