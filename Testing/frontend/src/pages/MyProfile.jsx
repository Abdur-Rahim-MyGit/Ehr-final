import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const MyProfile = () => {
    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)
    const [appointments, setAppointments] = useState([])
    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)
    const navigate = useNavigate()

    useEffect(() => {
        loadUserAppointments()
    }, [])

    const loadUserAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
            setAppointments(data.appointments.slice(0, 3)) // Show only 3 recent appointments
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const updateUserProfileData = async () => {
        try {
            const formData = new FormData();
            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)
            image && formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        })
    }

    return userData ? (
        <div className='max-w-4xl mx-auto py-8 px-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                {/* Profile Section */}
                <div className='bg-white rounded-lg shadow-md p-6'>
                    <div className='flex items-center gap-4 mb-6'>
                        {isEdit ? (
                            <label htmlFor='image' className='cursor-pointer'>
                                <div className='relative'>
                                    <img className='w-24 h-24 rounded-full object-cover opacity-75' 
                                         src={image ? URL.createObjectURL(image) : userData.image} alt="Profile" />
                                    <img className='w-8 absolute bottom-2 right-2' 
                                         src={image ? '' : assets.upload_icon} alt="Upload" />
                                </div>
                                <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                            </label>
                        ) : (
                            <img className='w-24 h-24 rounded-full object-cover' src={userData.image} alt="Profile" />
                        )}
                        <div>
                            {isEdit ? (
                                <input className='text-2xl font-semibold bg-gray-50 p-2 rounded' 
                                       type="text" 
                                       onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} 
                                       value={userData.name} />
                            ) : (
                                <h2 className='text-2xl font-semibold'>{userData.name}</h2>
                            )}
                            <p className='text-gray-500'>{userData.email}</p>
                        </div>
                    </div>

                    <div className='space-y-4'>
                        <div>
                            <h3 className='text-gray-600 font-medium mb-2'>Contact Information</h3>
                            <div className='space-y-2'>
                                <div className='flex items-center gap-2'>
                                    <span className='text-gray-500'>Phone:</span>
                                    {isEdit ? (
                                        <input className='bg-gray-50 p-2 rounded' 
                                               type="text" 
                                               onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} 
                                               value={userData.phone} />
                                    ) : (
                                        <span>{userData.phone}</span>
                                    )}
                                </div>
                                <div className='flex items-center gap-2'>
                                    <span className='text-gray-500'>Address:</span>
                                    {isEdit ? (
                                        <div className='space-y-2'>
                                            <input className='bg-gray-50 p-2 rounded w-full' 
                                                   type="text" 
                                                   onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} 
                                                   value={userData.address.line1} />
                                            <input className='bg-gray-50 p-2 rounded w-full' 
                                                   type="text" 
                                                   onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} 
                                                   value={userData.address.line2} />
                                        </div>
                                    ) : (
                                        <span>{userData.address.line1}, {userData.address.line2}</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className='text-gray-600 font-medium mb-2'>Basic Information</h3>
                            <div className='space-y-2'>
                                <div className='flex items-center gap-2'>
                                    <span className='text-gray-500'>Gender:</span>
                                    {isEdit ? (
                                        <select className='bg-gray-50 p-2 rounded' 
                                                onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} 
                                                value={userData.gender}>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    ) : (
                                        <span>{userData.gender}</span>
                                    )}
                                </div>
                                <div className='flex items-center gap-2'>
                                    <span className='text-gray-500'>Date of Birth:</span>
                                    {isEdit ? (
                                        <input className='bg-gray-50 p-2 rounded' 
                                               type="date" 
                                               onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} 
                                               value={userData.dob} />
                                    ) : (
                                        <span>{formatDate(userData.dob)}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='mt-6 flex gap-4'>
                        {isEdit ? (
                            <>
                                <button onClick={updateUserProfileData} 
                                        className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
                                    Save Changes
                                </button>
                                <button onClick={() => setIsEdit(false)} 
                                        className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'>
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button onClick={() => setIsEdit(true)} 
                                    className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>

                {/* Recent Appointments Section */}
                <div className='bg-white rounded-lg shadow-md p-6'>
                    <div className='flex justify-between items-center mb-6'>
                        <h2 className='text-xl font-semibold'>Recent Appointments</h2>
                        <button onClick={() => navigate('/my-appointments')} 
                                className='text-blue-500 hover:text-blue-600'>
                            View All
                        </button>
                    </div>
                    
                    {appointments.length > 0 ? (
                        <div className='space-y-4'>
                            {appointments.map((appointment) => (
                                <div key={appointment._id} className='border rounded-lg p-4'>
                                    <div className='flex justify-between items-start'>
                                        <div>
                                            <h3 className='font-medium'>{appointment.doctor.name}</h3>
                                            <p className='text-gray-500'>{appointment.doctor.speciality}</p>
                                        </div>
                                        <span className={`px-2 py-1 rounded text-sm ${
                                            appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                                            appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {appointment.status}
                                        </span>
                                    </div>
                                    <div className='mt-2 text-sm text-gray-600'>
                                        <p>Date: {formatDate(appointment.date)}</p>
                                        <p>Time: {appointment.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className='text-gray-500 text-center py-4'>No appointments found</p>
                    )}
                </div>
            </div>
        </div>
    ) : null
}

export default MyProfile