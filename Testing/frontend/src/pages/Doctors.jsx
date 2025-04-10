import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'
import SpecialityMenu from '../components/SpecialityMenu'

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  useEffect(() => {
    // Log all doctors for debugging
    console.log('Current doctors in state:', doctors)
    
    if (speciality) {
      console.log('Filtering for specialty:', speciality)
      const filtered = doctors.filter(doc => {
        const match = doc.speciality === speciality
        console.log(`Doctor ${doc.name} (${doc.speciality}) matches ${speciality}:`, match)
        return match
      })
      console.log('Filtered doctors:', filtered)
      setFilterDoc(filtered)
    } else {
      console.log('No specialty selected, showing all doctors')
      setFilterDoc(doctors)
    }
  }, [doctors, speciality])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-[#2B3674] mb-6">
        {speciality ? `${speciality} Specialists` : 'All Doctors'}
      </h1>
      
      <div className="flex gap-8">
        {/* Left Sidebar */}
        <div className="w-64 flex-shrink-0">
          <SpecialityMenu />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {filterDoc.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No doctors found for {speciality}</p>
              <p className="text-sm mt-2">Total doctors in system: {doctors.length}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterDoc.map((doctor, index) => (
                <div
                  key={doctor._id || index}
                  onClick={() => navigate(`/appointment/${doctor._id}`)}
                  className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                >
                  <img 
                    src={doctor.image} 
                    alt={doctor.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className={`flex items-center gap-2 text-sm ${doctor.available ? 'text-green-500' : 'text-gray-500'}`}>
                      <div className={`w-2 h-2 rounded-full ${doctor.available ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                      <span>{doctor.available ? 'Available' : 'Not Available'}</span>
                    </div>
                    <h3 className="text-lg font-medium mt-2">{doctor.name}</h3>
                    <p className="text-gray-600">{doctor.speciality}</p>
                    <p className="text-sm text-gray-500 mt-1">{doctor.experience}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-medium text-[#4318FF]">₹{doctor.fees}</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/appointment/${doctor._id}`)
                        }}
                        className="px-4 py-2 text-sm font-medium text-white bg-[#4318FF] rounded-lg hover:bg-[#3311CC] transition-colors"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Doctors