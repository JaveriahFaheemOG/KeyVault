import axios from 'axios';

export const fetchAddresses = async (token) => {
    try {
        const response = await axios.get('http://localhost:3001/addresses', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data.addresses; // Return the list of addresses
    } catch (error) {
        console.error('Error fetching addresses:', error);
        throw error;
    }
};