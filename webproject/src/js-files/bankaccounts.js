import '../css-files/bankaccount.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Bank() {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isDetailVisible, setIsDetailVisible] = useState(false);
    const [savedAccounts, setSavedAccounts] = useState([]); // To hold saved bank accounts
    const [selectedAccount, setSelectedAccount] = useState(null); // Current account
    const [accountHolder, setAccountHolder] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [bankName, setBankName] = useState('');
    const [editId, setEditId] = useState(null); 

    // Show popup to add new account
    const showPopup = (account = null) => {
        setIsPopupVisible(true);
        if (account) {
            setAccountHolder(account.holder);
            setAccountNumber(account.number);
            setBankName(account.bank);
            setEditId(account._id); // Set the ID for editing
        } else {
            setAccountHolder('');
            setAccountNumber('');
            setBankName('');
            setEditId(null); // Clear edit mode
        }
    };

    // Fetch accounts from the backend
    const fetchAccounts = async () => {
        try {
            const response = await axios.get('http://localhost:3001/accounts', {
                headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
            });
            setSavedAccounts(response.data.accounts); // Assuming the backend returns accounts in `accounts` field
        } catch (error) {
            console.error('Error fetching accounts:', error);
           // alert('Failed to load accounts. Please try again later.');
        }
    };

    // Save a new account to the backend
    const saveAccount = async () => {
        if (accountHolder && accountNumber && bankName) {
            const newAccount = { holder: accountHolder, number: accountNumber, bank: bankName };

            try {
                if (editId) {
                    // Update existing account
                    const response = await axios.put(
                        `http://localhost:3001/accounts/${editId}`,
                        newAccount,
                        { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } }
                    );
                    setSavedAccounts(savedAccounts.map(account =>
                        account._id === editId ? response.data.account : account
                    ));
                } else {
                    // Create new account
                    const response = await axios.post('http://localhost:3001/accounts', newAccount, {
                        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
                    });
                    setSavedAccounts([...savedAccounts, response.data.account]); // Add new account to state
                }
                setIsPopupVisible(false);
            } catch (error) {
                console.error('Error saving account:', error);
                alert('Failed to save account. Please try again later.');
            }
        } else {
            alert('Please fill out all the fields.');
        }
    };

    const handleDeleteAccount = async (id) => {
        if (window.confirm('Are you sure you want to delete this account?')) {
            try {
                await axios.delete(`http://localhost:3001/accounts/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
                });
                setSavedAccounts(savedAccounts.filter(account => account._id !== id)); // Remove deleted account from state
            } catch (error) {
                console.error('Error deleting account:', error);
                alert('Failed to delete account. Please try again later.');
            }
        }
    };

    // Load accounts when the component mounts
    useEffect(() => {
        fetchAccounts();
    }, []);

    const closePopup = () => {
        setIsPopupVisible(false);
        setIsDetailVisible(false);
    };

    const viewAccountDetails = (account) => {
        setSelectedAccount(account);
        setIsDetailVisible(true);
    };

    return (
        <div className={`Bank-container ${savedAccounts.length === 0 ? 'empty' : ''}`}>
            <div className="Bank-div">
                <h1>Bank Account Details</h1>
                <button onClick={showPopup}>Add Account</button>
            </div>
            <hr />

            {/* Popup for adding new account */}
            {isPopupVisible && (
                <div className="bank-popup">
                    <div className="popup-content">
                        <i className="fa fa-close close" onClick={closePopup}></i>
                        <h2>Add Bank Account</h2>
                        <div>
                            <label>Account Holder:</label>
                            <input
                                type="text"
                                value={accountHolder}
                                onChange={(e) => setAccountHolder(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Account Number:</label>
                            <input
                                type="text"
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Bank Name:</label>
                            <input
                                type="text"
                                value={bankName}
                                onChange={(e) => setBankName(e.target.value)}
                            />
                        </div>
                        <div className="form-actions">
                            <button onClick={closePopup} className="btn1">Cancel</button>
                            <button onClick={saveAccount} className="btn1">Save</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Display saved accounts */}
            <div className="bank-container">
                {savedAccounts.map((account, index) => (
                    <div key={index} className="account-card" onClick={() => viewAccountDetails(account)}>
                        <div className="account-icon">
                            <img src={require('../images/bank.png')} alt="Bank" />
                        </div>
                        <div className="account-holder">{account.holder}</div>
                        <div className="entry-actions">
                        <button 
                                onClick={(e) => { 
                                    e.stopPropagation(); // Prevent viewNoteDetails from being triggered
                                    showPopup(account); 
                                }}>
                                Edit
                            </button>
                            <button 
                                onClick={(e) => { 
                                    e.stopPropagation(); // Prevent viewNoteDetails from being triggered
                                    handleDeleteAccount(account._id); 
                                }}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Detailed view of an account */}
            {isDetailVisible && selectedAccount && (
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

export default Bank;
