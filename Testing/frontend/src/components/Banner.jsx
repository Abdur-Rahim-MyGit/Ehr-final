import React from 'react'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

    const navigate = useNavigate()

    return (
        <div className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center justify-between">
                    <div className="lg:w-1/2 mb-10 lg:mb-0">
                        <h1 className="text-4xl lg:text-5xl font-bold text-[#2B3674] mb-6">
                            Book Appointment<br />
                            With Trusted Doctors
                        </h1>
                        <p className="text-gray-600 mb-8 text-lg">
                            Simply browse through our extensive list of trusted doctors,
                            schedule your appointment hassle-free.
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => navigate('/doctors')}
                                className="bg-[#2B3674] text-white px-8 py-3 rounded-lg hover:bg-[#1a2147] transition-colors"
                            >
                                Book appointment
                            </button>
                        </div>
                    </div>
                    <div className="lg:w-1/2">
                        <img
                            src="/doctors-team.png"
                            alt="Healthcare Team"
                            className="w-full h-auto rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner