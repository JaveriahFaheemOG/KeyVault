import React, {useState } from 'react';
import 'font-awesome/css/font-awesome.min.css'; 
import '../css-files/homepage.css';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';


function Formlogin({onSubmit}) { 

    const [isMasterPasswordVisible, setMasterPasswordVisibility] = useState(false);
    const [masterPassword, setMasterPassword] = useState(''); // Initialize state to hold the password
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const toggleMasterPasswordVisibility = () => {
        setMasterPasswordVisibility(!isMasterPasswordVisible);  
      };
      const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          setEmailError("Please enter a valid email address!");
        } else {
          setEmailError(""); // Clear error if email is valid
        }
      };
      const handleEmailChange = (e) => {
        setEmail(e.target.value);
        validateEmail(); // Validate email on change
      };
  const handlePasswordChange = (e) => {
        setMasterPassword(e.target.value);
      if (e.target.value) {
      setPasswordError(''); // Clear the error when password is entered
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    validateEmail();
    if (!email) 
      {
      setEmailError("Please enter your email.");
    }
    if (!masterPassword) {
      setPasswordError("Please enter your master password.");
    }
    if (!emailError && email && masterPassword) { // Only call onSubmit if there's no email error
      axios.post('http://localhost:3001/login', { email:email, password: masterPassword })
    .then(res => {
        console.log(res);
        if (res.data.message === 'Login successful') {
          localStorage.setItem('authToken', res.data.token);
            navigate('/dashboard');
        } else {
            setPasswordError(res.data.message); // Show error message to the user
        }
    })
    .catch(err => {
        console.error(err);
        alert('Something went wrong. Please try again later.');
    });


        //onSubmit();
        // Call the onSubmit prop to notify the parent component
    }
  };
  
    return(
<section className="right-section">
        <fieldset className="formfieldset">
          <form className="sign-up-form"  onSubmit={handleSubmit}>
            <label> * Email:</label>
            <input type="email" name="email" placeholder="Enter your mail"  value={email}
            onChange={handleEmailChange} // Update state and validate email
          className="email-input"/><br/>
           {emailError && <div style={{ color: 'red' }}>{emailError}</div>} {/* Display email error directly under input */} 
            <label>  * Master Password: </label>
            <input
              type={isMasterPasswordVisible ? 'text' : 'password'}
              name="master"
              placeholder="Enter your password"
              value={masterPassword}
              onChange={handlePasswordChange} // Update password state on change
            className="password-input"
            />
            <i
              className={`fa ${isMasterPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}
              onClick={toggleMasterPasswordVisibility}
              style={{ marginLeft: '8px', cursor: 'pointer' }}
              aria-hidden="true"></i>
              {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
            <br />
          
            <button className="sign-up-btn" type="submit">Sign in</button><br></br></form>
          </fieldset>
        </section>
);}
export default Formlogin;  