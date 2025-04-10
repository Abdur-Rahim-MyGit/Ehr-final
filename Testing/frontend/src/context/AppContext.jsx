import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'

export const AppContext = createContext()

const AppContextProvider = ({ children }) => {
    const currencySymbol = '₹'
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') || '')
    const [userData, setUserData] = useState(false)

    // Getting Doctors using API
    const getDoctosData = async () => {
        try {
            console.log('Fetching doctors data from:', backendUrl + '/api/doctor/list')
            const { data } = await axios.get(backendUrl + '/api/doctor/list')
            console.log('Raw API response:', data)
            
            if (data.success) {
                console.log('Doctor specialties before update:', doctors.map(d => ({ name: d.name, speciality: d.speciality })))
                setDoctors(data.doctors)
                console.log('Doctor specialties after update:', data.doctors.map(d => ({ name: d.name, speciality: d.speciality })))
            } else {
                console.error('API returned error:', data.message)
                toast.error(data.message)
            }
        } catch (error) {
            console.error('Error fetching doctors:', error)
            if (error.response) {
                console.error('Error response:', error.response.data)
            }
            toast.error(error.message)
        }
    }

    // Getting User Profile using API
    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } })
            if (data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Listen for refresh message from admin panel
    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data === 'REFRESH_DOCTORS') {
                getDoctosData()
            }
        }
        window.addEventListener('message', handleMessage)
        return () => window.removeEventListener('message', handleMessage)
    }, [])

    // Initial fetch of doctors
    useEffect(() => {
        getDoctosData()
    }, [])

    // Periodic refresh of doctors
    useEffect(() => {
        const refreshInterval = setInterval(getDoctosData, 30000)
        return () => clearInterval(refreshInterval)
    }, [])

    // Load user profile when token changes
    useEffect(() => {
        if (token) {
            loadUserProfileData()
        }
    }, [token])

    const value = {
        doctors,
        getDoctosData,
        currencySymbol,
        backendUrl,
        token,
        setToken,
        userData,
        setUserData,
        loadUserProfileData
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;