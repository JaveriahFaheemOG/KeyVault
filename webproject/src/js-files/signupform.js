import React, { useState, useEffect, useRef } from 'react';
import 'font-awesome/css/font-awesome.min.css'; 
import '../css-files/homepage.css';
import { Link,useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

// Modal component for displaying Terms and Privacy Policy
function Modal({ showModal, closeModal, title, content }) {
  const okayButtonRef = useRef(null);

  useEffect(() => {
    if (showModal && okayButtonRef.current) {
      okayButtonRef.current.focus(); // Focus on the Okay button when modal opens
    }
  }, [showModal]);

  if (!showModal) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-labelledby="modalTitle">
    <div className="modal-content">
      <h2 id="modalTitle" className="modal-title">{title}</h2>
      <div className="modal-body">
        {content}
      </div>
      <button ref={okayButtonRef} onClick={closeModal} className="modal-btn">
        Okay
      </button>
    </div>
  </div>
  );
}

function Formsign({ onSubmit }) { 
    const [isMasterPasswordVisible, setMasterPasswordVisibility] = useState(false);
    const [isConfirmPasswordVisible, setConfirmPasswordVisibility] = useState(false);
    const [masterPassword, setMasterPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [email, setEmail] = useState('');
    const [termsChecked, setTermsChecked] = useState(false);  
    const [termsError, setTermsError] = useState('');
    const [message] = useState('');
    const navigate = useNavigate();
    
    // Modal state
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);

    // Modal content
    const termsContent =  (
      <ul className="modal-list">
        <li><strong>Acceptance of Terms:</strong> By accessing and using this website or application, you agree to comply with and be bound by these Terms of Use.</li>
        <li><strong>Use of the Service:</strong> You agree to use the service only for lawful purposes and in accordance with these terms.</li>
        <li><strong>User Accounts:</strong> You agree to provide accurate information and keep your account secure by not sharing your password.</li>
        <li><strong>Intellectual Property:</strong> All content is the property of Keyvault or its content suppliers.</li>
        <li><strong>Termination:</strong> We reserve the right to terminate or suspend your access if you breach these Terms.</li>
        <li><strong>Limitation of Liability:</strong> Keyvault will not be liable for any damages arising out of your use.</li>
        <li><strong>Changes to Terms:</strong> We reserve the right to modify these Terms at any time. Continued use of the service constitutes acceptance.</li>
        </ul>
    );
    const privacyContent = (
      <ul className="modal-list">
        <li><strong>Information We Collect:</strong> We may collect personal information such as your name and email address.</li>
        <li><strong>How We Use Your Information:</strong> We use your information to improve the service, personalize your experience, communicate with you, and provide support.</li>
        <li><strong>Sharing Your Information:</strong> We do not sell or trade your personal information without your consent.</li>
        <li><strong>Data Security:</strong> We implement security measures to protect your information, though no method is completely secure.</li>
        <li><strong>Cookies and Tracking Technologies:</strong> We use cookies to enhance your experience, analyze usage, and improve our services.</li>
        <li><strong>Your Rights:</strong> You may have rights regarding your personal information, such as the right to access or delete it.</li>
        <li><strong>Changes to This Policy:</strong> We may update our Privacy Policy periodically, and your continued use signifies acceptance.</li>
        </ul>
    );

    const toggleMasterPasswordVisibility = () => {
        setMasterPasswordVisibility(!isMasterPasswordVisible);  
    };
    
    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisibility(!isConfirmPasswordVisible);
    };
  
    const validatePasswords = () => {
        if (masterPassword && confirmPassword && masterPassword !== confirmPassword) {
            setPasswordError("Passwords do not match!");
        } else {
            setPasswordError(""); // Clear error if passwords match
        }
    };

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email address!");
        } else {
            setEmailError(""); // Clear error if email is valid
        }
    };
  
    const handleMasterPasswordChange = (e) => {
        const newPassword = e.target.value;
        setMasterPassword(newPassword);
        if (confirmPassword && newPassword !== confirmPassword) {
            setPasswordError("Passwords do not match!");
        } else {
            setPasswordError(""); // Clear error if passwords match
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);
        if (masterPassword && masterPassword !== newConfirmPassword) {
            setPasswordError("Passwords do not match!");
        } else {
            setPasswordError(""); // Clear error if passwords match
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        validateEmail(); // Validate email on change
    };
  
    const handleTermsChange = () => {
        setTermsChecked(!termsChecked);
        setTermsError(""); // Clear error if checkbox is checked
    };

    const handleSubmit = (e) => {
      e.preventDefault(); // Prevent default form submission

      // Reset errors before validation
      setEmailError('');
      setPasswordError('');
      setTermsError('');
  
      // Check if fields are empty
      let isFormValid = true;


   /* if (!name) {
        setNameError("Name is required!");
        isFormValid = false;
    }*/
  
      if (!email) {
          setEmailError("Email is required!");
          isFormValid = false;
      } else {
          validateEmail(); // Validate email format if not empty
      }
  
      if (!masterPassword) {
          setPasswordError("Master Password is required!");
          isFormValid = false;
      } else if (masterPassword !== confirmPassword) {
          setPasswordError("Passwords do not match!");
          isFormValid = false;
      }
  
      if (!confirmPassword) {
          setPasswordError("Please confirm your password!");
          isFormValid = false;
      }
  
      if (!termsChecked) {
          setTermsError("You must agree to the terms and conditions!");
          isFormValid = false;
      }
    
    // Validate Master Password
    if (
        masterPassword.length < 12 ||               // At least 12 characters
        !/[A-Z]/.test(masterPassword) ||            // At least one uppercase letter
        !/[a-z]/.test(masterPassword) ||            // At least one lowercase letter
        !/\d/.test(masterPassword) ||               // At least one digit
        !/[!@#$%^&*(),.?":{}|<>]/.test(masterPassword) // At least one special character
    ) {
        setPasswordError('Password must be at least 12 characters long and include uppercase, lowercase, a number, and a special character.');
        isFormValid = false;
    }
  
      // Only submit if there are no errors
      if (isFormValid && !emailError && !passwordError && termsChecked) {
        axios.post('http://localhost:3001/',{email: email,password: masterPassword})
        .then(response => {console.log(response)
            if(response.data.message === 'Email is already in use.')
            {
                    setPasswordError(response.data.message);
            }
            else
            {
                navigate('/');
            }
        })
        .catch(error => {
            console.log(error)
            alert('Something went wrong. Please try again later.');
        });

        //  onSubmit();
      }

    };

    // Open modals for Terms and Privacy Policy
    const openTermsModal = () => {
        setShowTermsModal(true);
    };
  
    const openPrivacyModal = () => {
        setShowPrivacyModal(true);
    };
  
    // Close modals
    const closeTermsModal = () => {
        setShowTermsModal(false);
    };
  
    const closePrivacyModal = () => {
        setShowPrivacyModal(false);
    };
  
    return(
        <GoogleOAuthProvider clientId="804844004814-rv6kvk7jqddlpfdledp29rorr2r4pl39.apps.googleusercontent.com">
        <section className="right-section">
            <fieldset className="formfieldset">
                <form className="sign-up-form" onSubmit={handleSubmit}>
                    <label> Name: </label>
                    <input type="text" name="name" placeholder="Enter your name"/><br></br>
                    <label> * Email:</label>
                    <input type="email" name="email" placeholder="Enter your mail"  value={email}
                    onChange={handleEmailChange} className="email-input"/><br/>
                    {emailError && <div style={{ color: 'red' }}>{emailError}</div>}

                    <label> * Master: </label>
                    <input
                      type={isMasterPasswordVisible ? 'text' : 'password'}
                      name="master"
                      placeholder="Enter your password"
                      value={masterPassword}
                      onChange={handleMasterPasswordChange}
                      className="password-input"
                    />
                    <i
                      className={`fa ${isMasterPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}
                      onClick={toggleMasterPasswordVisibility}
                      style={{ marginLeft: '8px', cursor: 'pointer' }}
                      aria-hidden="true"
                    ></i>
                    <br />
                    <label>*Confirm:</label>
                    <input
                      type={isConfirmPasswordVisible ? 'text' : 'password'}
                      name="master"
                      placeholder="Re-type your password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      className="password-input"
                    />
                    <i
                      className={`fa ${isConfirmPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}
                      onClick={toggleConfirmPasswordVisibility}
                      style={{ marginLeft: '8px', cursor: 'pointer' }}
                      aria-hidden="true"
                    ></i>
                    <br/>
                    {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}

                    <div className="terms">
                        <input type="checkbox" name="terms" 
                        checked={termsChecked} onChange={handleTermsChange}/>
                        <span>I agree to the 
                            <Link to="#" onClick={openTermsModal}> Terms of Use</Link> and 
                            <Link to="#" onClick={openPrivacyModal}> Privacy Policy</Link>
                        </span><br></br>
                        {termsError && <div style={{ color: 'red', marginTop: '5px' }}>{termsError}</div>}
                    </div>
                    <button className="sign-up-btn" type="submit">Sign up</button><br/>
                </form>
                <div className="divider">OR</div>
                {message && <div className="message">{message}</div>}
                <button className="social-signup google">
                <GoogleLogin
                onSuccess={credentialResponse => {
                console.log("Login Successful:", credentialResponse);
                 // Implement further actions like updating state or redirecting
                }}
            onError={() => {
              console.log("Login Failed");
            }}
            /></button>
                 
            </fieldset>

            {/* Modal for Terms */}
            <Modal 
                showModal={showTermsModal}
                closeModal={closeTermsModal}
                title="Terms of Use"
                content={termsContent}
            />

            {/* Modal for Privacy Policy */}
            <Modal 
                showModal={showPrivacyModal}
                closeModal={closePrivacyModal}
                title="Privacy Policy"
                content={privacyContent}
            />
        </section>
        </GoogleOAuthProvider>
    );
}

export default Formsign;
