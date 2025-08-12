import React, { useState, useEffect } from 'react';
import '../css-files/address.css';
import axios from 'axios';

function Address() {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isDetailVisible, setIsDetailVisible] = useState(false);
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const [name, setName] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [editId, setEditId] = useState(null);

    const token = localStorage.getItem('authToken'); // Retrieve the JWT token for authentication

    const showPopup = (address = null) => {
        setIsPopupVisible(true);
        if (address) {
            setName(address.name);
            setStreet(address.street);
            setCity(address.city);
            setPostalCode(address.postalCode);
            setEditId(address._id); // Set the editId to the current address ID
        } else {
            setName('');
            setStreet('');
            setCity('');
            setPostalCode('');
            setEditId(null);

        }


    };

    // Fetch saved addresses from the backend when the component mounts
    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const res = await axios.get('http://localhost:3001/addresses', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSavedAddresses(res.data.addresses); // Update state with fetched addresses
            } catch (error) {
                console.error('Error fetching addresses:', error);
                //alert('Failed to load addresses. Please try again later.');
            }
        };

        fetchAddresses();
    }, [token]);

    

    const closePopup = () => {
        setIsPopupVisible(false);
        setIsDetailVisible(false);
    };
    const saveAddress = async () => {
        if (name.trim() && street.trim() && city.trim() && postalCode.trim()) {
            const newAddress = { name, street, city, postalCode };

            try {
                if (editId) {
                    // Update existing address if editId is set
                    const res = await axios.put(`http://localhost:3001/addresses/${editId}`, newAddress, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setSavedAddresses(
                        savedAddresses.map((address) =>
                            address._id === editId ? res.data.address : address
                        )
                    );
                } else {
                    // Create new address if no editId
                    const res = await axios.post('http://localhost:3001/addresses', newAddress, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setSavedAddresses((prev) => [...prev, res.data.address]); // Update state with the new address
                }
                setIsPopupVisible(false);  // Close the popup
            } catch (error) {
                console.error('Error saving/updating address:', error);
                //alert('Failed to save address. Please try again later.');
            }
        } else {
            alert('Please fill all fields');
        }
    };

    const handleDeleteAddress = async (id) => {
        if (window.confirm('Are you sure you want to delete this address?')) {
            try {
                await axios.delete(`http://localhost:3001/addresses/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSavedAddresses(savedAddresses.filter((address) => address._id !== id)); // Remove deleted address from state
            } catch (error) {
                console.error('Error deleting address:', error);
                alert('Failed to delete address. Please try again later.');
            }
        }
    };


    const showDetails = (address) => {
        setSelectedAddress(address);
        setIsDetailVisible(true);
    };

    return (
        <div className={`Address-container ${savedAddresses.length === 0 ? 'empty' : ''}`}>
            <div className="Address-div">
                <h1>Addresses</h1>
                <button onClick={showPopup}>Add Addresses</button>
            </div>
            <hr />

            {/* Popup for adding a new address */}
            {isPopupVisible && (
                <div className="address-popup">
                    <div className="popup-content">
                        <h2>Add New Address</h2>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label>Name:</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Street:</label>
                                <input
                                    type="text"
                                    value={street}
                                    onChange={(e) => setStreet(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>City:</label>
                                <input
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Postal Code:</label>
                                <input
                                    type="text"
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                />
                            </div>
                            <div className="form-actions">
                                <button className="btn1" type="button" onClick={closePopup}>
                                    Cancel
                                </button>
                                <button className="btn1" type="button" onClick={saveAddress}>
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Grid for displaying saved addresses */}
            <div className="address-container">
                {savedAddresses.map((address, index) => (
                    <div
                        className="address-card"
                        key={index} // Added key for unique identification
                        onClick={() => showDetails(address)}
                    >
                        <div className="address-icon">
                            <img src={require('../images/address.png')} alt="Address Icon" />
                        </div>
                        <div className="address-title">{address.name}</div>
                        <div className="entry-actions">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    showPopup(address);
                                }}
                            >
                                Edit
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteAddress(address._id);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Popup for detailed address view */}
            {isDetailVisible && selectedAddress && (
                <div className="address-detail-popup">
                    <div className="popup-content">
                        <h2>Address Details</h2>
                        <p>
                            <strong>Name:</strong> {selectedAddress.name}
                        </p>
                        <p>
                            <strong>Street:</strong> {selectedAddress.street}
                        </p>
                        <p>
                            <strong>City:</strong> {selectedAddress.city}
                        </p>
                        <p>
                            <strong>Postal Code:</strong> {selectedAddress.postalCode}
                        </p>
                        <button className="close-info" onClick={closePopup}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Address;
