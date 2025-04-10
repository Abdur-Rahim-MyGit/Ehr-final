import React, { useState, useContext } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'

const AddPatient = () => {
    const { backendUrl, aToken } = useContext(AdminContext)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        uhid: '',
        alternateUhid: '',
        patientName: '',
        dateOfBirth: '',
        gender: '',
        occupation: '',
        address: '',
        insuranceStatus: '',
        organDonorStatus: ''
    })

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Debug logs
            console.log('Backend URL:', backendUrl)
            console.log('Admin Token:', aToken)
            console.log('Form Data:', formData)

            if (!aToken) {
                toast.error('Not authenticated. Please login again.')
                return;
            }

            const response = await axios.post(
                `${backendUrl}/api/admin/add-patient`,
                formData,
                { 
                    headers: { 
                        'Content-Type': 'application/json',
                        'aToken': aToken 
                    }
                }
            )

            console.log('Full API Response:', response)

            const { data } = response;

            if (data.success) {
                toast.success(data.message || 'Patient added successfully')
                // Reset form
                setFormData({
                    uhid: '',
                    alternateUhid: '',
                    patientName: '',
                    dateOfBirth: '',
                    gender: '',
                    occupation: '',
                    address: '',
                    insuranceStatus: '',
                    organDonorStatus: ''
                })
            } else {
                toast.error(data.message || 'Failed to add patient')
            }
        } catch (error) {
            console.error('Full error object:', error)
            
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Error response data:', error.response.data)
                console.error('Error response status:', error.response.status)
                console.error('Error response headers:', error.response.headers)
                
                const errorMessage = error.response.data?.message || 
                                   error.response.data?.error || 
                                   'Server error occurred';
                toast.error(errorMessage)
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Error request:', error.request)
                toast.error('No response from server. Please check your connection.')
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error message:', error.message)
                toast.error('Error occurred while sending request')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-6">Add New Patient</h2>
            <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* UHID */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            UHID *
                        </label>
                        <input
                            type="text"
                            name="uhid"
                            required
                            value={formData.uhid}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter UHID"
                        />
                    </div>

                    {/* Alternate UHID */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Alternate UHID
                        </label>
                        <input
                            type="text"
                            name="alternateUhid"
                            value={formData.alternateUhid}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter Alternate UHID"
                        />
                    </div>

                    {/* Patient Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Patient Name *
                        </label>
                        <input
                            type="text"
                            name="patientName"
                            required
                            value={formData.patientName}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter Patient Name"
                        />
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Date of Birth *
                        </label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            required
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Gender *
                        </label>
                        <select
                            name="gender"
                            required
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Occupation */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Occupation
                        </label>
                        <input
                            type="text"
                            name="occupation"
                            value={formData.occupation}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter Occupation"
                        />
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Address *
                        </label>
                        <textarea
                            name="address"
                            required
                            value={formData.address}
                            onChange={handleInputChange}
                            rows="3"
                            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter Address"
                        ></textarea>
                    </div>

                    {/* Insurance Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Insurance Status
                        </label>
                        <select
                            name="insuranceStatus"
                            value={formData.insuranceStatus}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select Insurance Status</option>
                            <option value="Insured">Insured</option>
                            <option value="Not Insured">Not Insured</option>
                            <option value="Pending">Pending</option>
                        </select>
                    </div>

                    {/* Organ Donor Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Organ Donor Status
                        </label>
                        <select
                            name="organDonorStatus"
                            value={formData.organDonorStatus}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select Organ Donor Status</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => setFormData({
                            uhid: '',
                            alternateUhid: '',
                            patientName: '',
                            dateOfBirth: '',
                            gender: '',
                            occupation: '',
                            address: '',
                            insuranceStatus: '',
                            organDonorStatus: ''
                        })}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                        Clear
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Adding Patient...' : 'Add Patient'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddPatient 