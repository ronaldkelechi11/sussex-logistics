import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Login Admin
export const loginAdmin = (payload) => {
    return api.post('/auth', payload)
}

// Search Package
export const searchPackage = ({ trackingId }) => {
    return api.get(`/package/${trackingId}`)
}

// Add Package
export const addPackage = (payload) => {
    return api.post('/package', payload)
}

// All Package
export const allPackage = () => {
    return api.get('/package')
}

// Edit Package
export const editPackage = (payload) => {
    return api.put('/package', payload)
}

// Delete Package
export const deletePackage = (trackingId) => {
    return api.delete(`/package/${trackingId}`)
}