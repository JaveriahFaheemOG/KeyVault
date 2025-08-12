import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css-files/dash.css';  // Assuming the styles are similar to Address's styles

function Dash() {
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [savedNotes, setSavedNotes] = useState([]); // To store fetched notes
    const [selectedNote, setSelectedNote] = useState(null); // Current note
    const [isDetailVisible, setIsDetailVisible] = useState(false);
    const [isNoteDetailVisible, setIsNoteDetailVisible] = useState(false); // To manage notes detail view
    const [savedEntries, setSavedEntries] = useState([]); // Passwords entries
    const [selectedEntry, setSelectedEntry] = useState(null); // Current selected entry
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [savedAccounts, setSavedAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null); // Current account
    const [isbankDetailVisible, setIsbankDetailVisible] = useState(false);
    const [isbankPopupVisible, setIsbankPopupVisible] = useState(false);

    const token = localStorage.getItem('authToken');  // Retrieve the JWT token for authentication

    // Fetch saved addresses and notes from the backend when the component mounts
    useEffect(() => {
        const fetchAddressesAndNotesAndPasswords = async () => {
            try {
                const addressResponse = await axios.get('http://localhost:3001/addresses', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSavedAddresses(addressResponse.data.addresses);  // Update state with fetched addresses

                const notesResponse = await axios.get('http://localhost:3001/notes', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSavedNotes(notesResponse.data.notes); // Update state with fetched notes

                const response = await axios.get('http://localhost:3001/passwords', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
                });
                setSavedEntries(response.data.passwords); // Set entries from API response
                const bankresponse = await axios.get('http://localhost:3001/accounts', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
                });
                setSavedAccounts(bankresponse.data.accounts); 
            } catch (error) {
                console.error('Error fetching addresses or notes or passwords:', error);
            }
        };

        fetchAddressesAndNotesAndPasswords();
    }, [token]);

    const showAddressDetails = (address) => {
        setSelectedAddress(address);
        setIsDetailVisible(true);
    };

    const showNoteDetails = (note) => {
        setSelectedNote(note);
        setIsNoteDetailVisible(true);
    };

    const closeDetail = () => {
        setIsDetailVisible(false);
        setSelectedAddress(null);
        setIsNoteDetailVisible(false);
        setSelectedNote(null);
    };

    const getFolderImage = (folderName) => {
        switch (folderName) {
            case 'Instagram':
                return 'instagram.png';
            case 'Facebook':
                return 'facebook.png';
            case 'Gmail':
                return 'gmail.png';
            case 'LinkedIn':
                return 'linkedin.png';
            case 'Twitter':
                return 'twitter.png';
            case 'Amazon':
                return 'amazon.png';
            case 'Reddit':
                return 'reddit.png';
            case 'Netflix':
                return 'netflix.png';
            case 'PayPal':
                return 'paypal.png';
            case 'Dropbox':
                return 'dropbox.png';
            case 'Youtube':
                return 'youtube.png';
            case 'Github':
                return 'github.png';
            case 'Spotify':
                return 'spotify.png';
            case 'Snapchat':
                return 'snapchat.png';
            default:
                return ''; // Default case if no folder matches
        }
    };

    const handleInfoClick = (entry) => {
        setSelectedEntry(entry); // Set selected entry
        setIsPopupVisible(true); // Show the detailed entry popup
    };

    const submitDetail = () => {
        setIsPopupVisible(false);
        setIsDetailVisible(false);
    };
    const viewAccountDetails = (account) => {
        setSelectedAccount(account);
        setIsbankDetailVisible(true);
    };
    const closePopup = () => {
        setIsbankPopupVisible(false);
        setIsbankDetailVisible(false);
    };
    const isDashboardEmpty =
        savedAddresses.length === 0 &&
        savedNotes.length === 0 &&
        savedEntries.length === 0 &&
        savedAccounts.length === 0;

    return (
        <div className={`Dash-container ${isDashboardEmpty ? 'empty-dashboard' : ''}`}>
            <div className="Dash-div">
                <h1>Dashboard</h1>
            </div>
            <hr />

            {/* Grid for displaying saved addresses */}
            <div className="address-container">
                {savedAddresses.map((address, index) => (
                    <div
                        className="address-card"
                        key={index}
                        onClick={() => showAddressDetails(address)}  // Handle click to show details
                    >
                        <div className="address-icon">
                            <img src={require('../images/address.png')} alt="Address Icon" />
                        </div>
                        <div className="address-title">{address.name}</div>
                    </div>
                ))}
            </div>

            {/* Grid for displaying saved notes */}
            <div className="notes-container">
                {savedNotes.map((note, index) => (
                    <div
                        className="note-card"
                        key={index}
                        onClick={() => showNoteDetails(note)}  // Handle click to show details
                    >
                        <div className="note-icon">
                            <img src={require('../images/notes.png')} alt="Note Icon" />
                        </div>
                        <div className="note-title">{note.title}</div>
                    </div>
                ))}
            </div>

            {/* Popup for detailed address view */}
            {isDetailVisible && selectedAddress && (
                <div className="address-detail-popup">
                    <div className="popup-content3">
                        <h2>Address Details</h2>
                        <p><strong>Name:</strong> {selectedAddress.name}</p>
                        <p><strong>Street:</strong> {selectedAddress.street}</p>
                        <p><strong>City:</strong> {selectedAddress.city}</p>
                        <p><strong>Postal Code:</strong> {selectedAddress.postalCode}</p>
                        <button className="close-info" onClick={closeDetail}>Close</button>
                    </div>
                </div>
            )}

            {/* Popup for detailed note view */}
            {isNoteDetailVisible && selectedNote && (
                <div className="notes-detail-popup">
                    <div className="popup-content3">
                        <h2>Note Details</h2>
                        <p><strong>Title:</strong> {selectedNote.title}</p>
                        <p><strong>Content:</strong> {selectedNote.content}</p>
                        <button className="close-info" onClick={closeDetail}>Close</button>
                    </div>
                </div>
            )}

            {/* Display saved password entries */}
            <div className="password-container">
                {savedEntries.map((entry, index) => (
                    <div key={index} className="card1">
                        <div className="card-image1">
                            <img src={require(`../images/${getFolderImage(entry.folder)}`)} alt={entry.folder} />
                        </div>
                        <div className="category1">{entry.folder}</div>
                        <div className="heading1">{entry.username}</div>
                        <i className="fa fa-info-circle" onClick={() => handleInfoClick(entry)}></i>
                    </div>
                ))}
            </div>

            {/* Popup for showing detailed entry information */}
            {isPopupVisible && selectedEntry && (
                <div className='cont-popup2'>
                    <div className='popup-content2'>
                        <h2>Detailed Info!</h2>
                        <p><strong>Folder:</strong> {selectedEntry.folder}</p>
                        <p><strong>Name:</strong> {selectedEntry.name}</p>
                        <p><strong>URL:</strong> {selectedEntry.url}</p>
                        <p><strong>Username:</strong> {selectedEntry.username}</p>
                        <p><strong>Password:</strong> {selectedEntry.password}</p>
                        <button className="okbtn" onClick={submitDetail}>OK</button>
                    </div>
                </div>
            )}
            {/* Display saved accounts */}
            <div className="bank-container">
                {savedAccounts.map((account, index) => (
                    <div key={index} className="account-card1" onClick={() => viewAccountDetails(account)}>
                        <div className="account-icon">
                            <img src={require('../images/bank.png')} alt="Bank" />
                        </div>
                        <div className="account-holder">{account.holder}</div>
                    </div>
                ))}
            </div>

            {/* Detailed view of an account */}
            {isbankDetailVisible && selectedAccount && (
                <div className="bank-detail-popup">
                    <div className="popup-content">
                        <h2>Account Details</h2>
                        <p><strong>Account Holder:</strong> {selectedAccount.holder}</p>
                        <p><strong>Account Number:</strong> {selectedAccount.number}</p>
                        <p><strong>Bank Name:</strong> {selectedAccount.bank}</p>
                        <button className="close-info" onClick={closePopup}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Dash;
