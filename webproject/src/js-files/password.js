import '../css-files/password.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Password() {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isSuccessVisible, setIsSuccessVisible] = useState(false);
    const [isDetailVisible, setIsDetailVisible] = useState(false);

    // State for form fields
    const [url, setUrl] = useState('');
    const [name, setName] = useState('');
    const [folder, setFolder] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [savedEntries, setSavedEntries] = useState([]); // Array to hold saved entries
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [editId, setEditId] = useState(null);

    // Show popup to add new entry
    const showPopup = (id = null) => {
        setIsPopupVisible(true); 
        if (id) {
        //         setUrl(selectedEntry.url);
        //         setName(selectedEntry.name);
        //         setFolder(selectedEntry.folder);
        //         setUsername(selectedEntry.username);
        //         setPassword(selectedEntry.password);
        //         console.log(selectedEntry);
        //       //  setEditId(id); // Set the ID of the entry being edite
         } else {
            // Creating a new entry
            setUrl('');
            setName('');
            setFolder('');
            setUsername('');
            setPassword('');
            setEditId(null); // Clear edit mode
         }// Show the popup
    };

    // Fetch saved entries from the backend API
    useEffect(() => {
        const fetchPasswords = async () => {
            try {
                const response = await axios.get('http://localhost:3001/passwords', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
                });
                setSavedEntries(response.data.passwords); // Set entries from API response
            } catch (error) {
                console.error('Error fetching passwords:', error);
         //       alert('Failed to fetch passwords. Please try again later.');
            }
        };
        fetchPasswords();
    }, []);

    const closePopup = () => {
        setIsPopupVisible(false);
        setIsDetailVisible(false);
        setEditId(null); // Clear the edit ID
        setUrl('');
        setName('');
        setFolder('');
        setUsername('');
        setPassword('');
    };

    const submitPopup = async () => {
        if (url && name && folder && username && password) {
            const newEntry = { folder, url, name, username, password };

            if (editId) {
                // Update an existing entry
                try {
                    const response = await axios.put(
                        `http://localhost:3001/passwords/${editId}`,
                        newEntry,
                        { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } }
                    );
                    // Update the local state
                    setSavedEntries(savedEntries.map(entry => 
                        entry._id === editId ? response.data.password : entry
                    ));
                    setEditId(null); // Clear edit mode
                    setIsPopupVisible(false);
                } catch (error) {
                    console.error('Error updating password:', error);
                }
            }
            else
            {
                try {
                    const response = await axios.post('http://localhost:3001/passwords', newEntry, {
                        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
                    });
                    // Add new entry to the list
                    setSavedEntries([...savedEntries, response.data.password]);
                    setIsPopupVisible(false);
                    setIsSuccessVisible(true);
                } catch (error) {
                    console.error('Error saving password:', error);
               //     alert('Failed to save password. Please try again later.');
                }
            }
            closePopup();

           
        } else {
            alert("Please fill all fields");
        }
        setIsPopupVisible(false);
            setIsSuccessVisible(true);
    };

    const submitSuccess = () => {
        setIsPopupVisible(false);
        setIsSuccessVisible(false);
        setIsDetailVisible(false);
    };

    const submitDetail = () => {
        setIsPopupVisible(false);
        setIsSuccessVisible(false);
        setIsDetailVisible(false);
    };

    const handleEditClick = (id) => {
        
        const entryToEdit = savedEntries.find(entry => entry._id === id);
        if (entryToEdit) {
            console.log(entryToEdit);
            setUrl(entryToEdit.url);
             setName(entryToEdit.name);
             setFolder(entryToEdit.folder);
             setUsername(entryToEdit.username);
             setPassword(entryToEdit.password);
             setEditId(id); // Set the ID of the entry being edited
             showPopup(id);
             setEditId(id);
             showPopup(id);

        }
    };

 
        const handleDeleteClick = async (id) => {
            if (window.confirm('Are you sure you want to delete this entry?')) {
                try {
                    await axios.delete(`http://localhost:3001/passwords/${id}`, {
                        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
                    });
                    // Update the local state
                    setSavedEntries(savedEntries.filter(entry => entry._id !== id));
                } catch (error) {
                    console.error('Error deleting password:', error);
                }
            }
        };

    // Function to handle info icon click and show details
    const handleInfoClick = (entry) => {

        setSelectedEntry(entry); // Set selected entry
        setIsDetailVisible(true); // Show the detail popup
        console.log(entry);
    };

    // Get folder image based on folder name
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
    

    return (
        <div className={`Password-container ${savedEntries.length === 0 ? 'empty' : ''}`}>
            <div className="Password-div">
                <h1>Passwords</h1>
                <button onClick={showPopup}>Add Passwords</button>
            </div>
            <hr />

            {/* Popup for adding new password entry */}
            {isPopupVisible && (
                <div className='cont-popup'>
                    <div className='popup-content'>
                        <i className="fa fa-close close" onClick={closePopup}></i>
                        <form className='formpassword' onSubmit={(e) => e.preventDefault()}>
                            {/* Form fields */}
                            <div>
                                <label>URL:</label>
                                <input type="text" name="url" value={url} onChange={(e) => setUrl(e.target.value)} />
                            </div>
                            <div className='form-cont'>
                                <div>
                                    <label>Name:</label>
                                    <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className='selfodler'>
                                    <label>Folder:</label>
                                    <select value={folder}  onChange={(e) => setFolder(e.target.value)}>
                                        <option value="">Select Folder</option>
                                        <option value="Instagram">Instagram</option>
                                        <option value="Facebook">Facebook</option>
                                        <option value="Gmail">Gmail</option>
                                        <option value="LinkedIn">LinkedIn</option>
                                        <option value="Twitter">Twitter</option>
                                        <option value="Amazon">Amazon</option>
                                        <option value="Reddit">Reddit</option>
                                        <option value="Netflix">Netflix</option>
                                        <option value="PayPal">PayPal</option>
                                        <option value="Dropbox">Dropbox</option>
                                        <option value="Youtube">Youtube</option>
                                        <option value="Github">Github</option>
                                        <option value="Spotify">Spotify</option>
                                        <option value="Snapchat">Snapchat</option>
                                    </select>
                                </div>
                            </div>
                            <div className='form-cont'>
                                <div>
                                    <label>Username:</label>
                                    <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div>
                                    <label>Site Password:</label>
                                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-actions">
                                <button className='btn1' type="button" onClick={closePopup}>Cancel</button>
                                <button className='btn1' type="submit" onClick={submitPopup}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Success message after saving password */}
            {isSuccessVisible && (
                <div className='cont-popup1'>
                    <div className='popup-content1'>
                        <h2>Password successfully Saved!</h2>
                        <button className="okbtn" onClick={submitSuccess}>OK</button>
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
                        <div className="entry-actions">
                        <button onClick={() => handleEditClick(entry._id)}>Edit</button>
                        <button onClick={() => handleDeleteClick(entry._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
{/* Popup for showing detailed entry information */}
{isDetailVisible && (
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
            {isDetailVisible && (
    <div className={`cont-popup2 ${isDetailVisible ? 'show' : ''}`}>
        <div className='popup-content2'>
            <h2>Detailed Info!</h2>
            <p><strong>Folder:</strong> {selectedEntry.folder}</p>
            <p><strong>Name:</strong> {selectedEntry.name}</p>
            <p><strong>URL:</strong> {selectedEntry.url}</p>
            <p><strong>Username:</strong> {selectedEntry.username}</p>
            <p><strong>Password:</strong> {selectedEntry.password}</p>
            <button className="close-info" onClick={submitDetail}>X</button>
        </div>
    </div>
)}
        </div>
    );
}

export default Password;
