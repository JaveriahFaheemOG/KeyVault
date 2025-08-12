import { useState } from 'react';
import axios from 'axios';
import '../css-files/change.css';
import { useNavigate } from 'react-router-dom';

const ChangePasswordForm = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
     // Basic validation
     if (!currentPassword || !newPassword || !confirmPassword) 
      {
      setError('All fields are required');
      return;
      }
    if(currentPassword === newPassword)
      {
      setError('New password cannot be the same as the current password');
      return;
      }
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{12,}$/; // Regex for the password rules
    if (!passwordPattern.test(newPassword)) {
      setError(
        'New password must be at least 12 characters long, contain at least one uppercase letter, one lowercase letter, and one special character'
      );
      return;
    }
  
    const token = localStorage.getItem('authToken'); // JWT token
    if (!token) {
      setError('No authentication token found');
      return;
    }
  
    try {
      const response = await axios.post(
        'http://localhost:3001/change-password',
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Attach JWT token in header
          },
        }
      );
  
      if (response.status === 200) {
        setSuccess(true); // Password change successful
        localStorage.removeItem('authToken'); // Delete the auth token
        setTimeout(() => {
          navigate('/'); // Redirect to home after a brief delay
        }, 2000);
      }
    } catch (err) {
      // Handle error responses
      if (err.response && err.response.data && err.response.data.message) {
        // Use the error message from the backend
        setError(err.response.data.message);
      } else {
        // Fallback to a generic error message
        setError('An error occurred, please try again');
      }
    }
  };

  return (
    <div className="change-password-popup">
      <div className="popup-overlay">
        <div className="popup-content">
          <h2>Change Password</h2>
          {success ? (
            <p>Password changed successfully! Logging you out...</p>
          ) : (
            <>
              {error && <p className="error-message">{error}</p>}
              <form onSubmit={handleSubmit}>
                <label>
                  Current Password:
                  <input
                    type="password"
                    name="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </label>
                <label>
                  New Password:
                  <input
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Confirm New Password:
                  <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </label>
                <button type="submit">Submit</button>
                <button type="button" onClick={onClose}>Close</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
