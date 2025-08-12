import React, {useEffect,useState } from 'react';
import 'font-awesome/css/font-awesome.min.css'; 
import '../css-files/homepage.css';
import '../images/lock.png';
import {Link} from 'react-router-dom';

function Homepage() { 

  const [isMasterPasswordVisible, setMasterPasswordVisibility] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisibility] = useState(false);
  const [masterPassword, setMasterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [email, setEmail] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);  
  const [termsError, setTermsError] = useState('');
  const [message, setMessage] = useState('');
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
    setMasterPassword(e.target.value);
    validatePasswords(); // Validate on password change
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    validatePasswords(); // Validate on confirmation password change
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
    validateEmail();
    validatePasswords();
    if (!termsChecked) {
      setTermsError("You must agree to the terms and conditions!");
    }

    // Only submit if there are no errors
    if (!emailError && !passwordError && termsChecked) {
      // Proceed with form submission logic (e.g., API call)
      alert("Form submitted successfully!");
    }
  };
    return (
      <div className="homepage">
        <header className="header">
          <div className="header-content">
            <div className='headerlogo'>
            <h1 className="logo"><Link to='./homepage.js' >Keyvault</Link></h1>
            <img src={require('../images/lock.png')} alt='logo-icon' className='logoimage'/>
            </div>
            <nav className="nav">
              <Link to='/Blog'>Blog</Link>
              <Link to='/Help'>Help</Link>
              <Link to='/WhyKeyvault'>Why Keyvault</Link>
              <Link to='/sign-in'>
              <button className="sign-in">
                Sign in
                </button>
                </Link>
            </nav>
          </div>
        </header>
        <div className="content">
        <section className="left-section">
          <hr className="selfhr"/>
          <h2>Let us remember your passwords for you!</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
          </p>
          <i className="fa fa-file" aria-hidden="true"></i>
          <Link to='/details'> Click for more details</Link>
        </section>
        
        <section className="right-section">
        <fieldset className="formfieldset">
          <form className="sign-up-form" onSubmit={handleSubmit}>
            <label> * Name: </label>
            <input type="text" name="name" placeholder="Enter your name"/><br></br>
            <label> * Email:</label>
            <input type="email" name="email" placeholder="Enter your mail"  value={email}
            onChange={handleEmailChange} // Update state and validate email
          className="email-input"/><br/>
           {emailError && <div style={{ color: 'red' }}>{emailError}</div>} {/* Display email error directly under input */} 

            <label>  * Master: </label>

            <input
              type={isMasterPasswordVisible ? 'text' : 'password'}
              name="master"
              placeholder="Enter your password"
              value={masterPassword}
          onChange={handleMasterPasswordChange} // Update state and validate
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
          onChange={handleConfirmPasswordChange} // Update state and validate
          className="password-input"
            />
            <i
              className={`fa ${isConfirmPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}
              onClick={toggleConfirmPasswordVisibility}
              style={{ marginLeft: '8px', cursor: 'pointer' }}
              aria-hidden="true"
            ></i>
            <br/>
            {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>} {/* Display password error */}

            <div className="terms">
              <input type="checkbox" name="terms" 
              checked={termsChecked} onChange={handleTermsChange}/>
              <span>I agree to the <Link to='/terms'>Terms of Use</Link> and <Link to='/policy'>Privacy Policy</Link>
              </span>
              <br/>
              {termsError && <div style={{ color: 'red', marginTop: '5px' }}>{termsError}</div>} {/* Display terms error */}
            </div>
            <button className="sign-up-btn" type="submit">Sign up</button><br></br></form>
            <div className="divider">OR</div>
            <button className="social-signup facebook">Sign up using Facebook</button><br/>
            {message && <div className="message">{message}</div>}
            <button className="social-signup google">Sign up using Google</button>
            
          </fieldset>
        </section>
      </div>
      <div className="second-section">
        <div className="seconone">
            <div className="secononea">
            <i className="fa fa-lock" aria-hidden="true"></i>
            <p>
            Certainly! Here's a placeholder paragraph you can use
              --Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              ---Let me know if you need something more specific or a different style!
            </p>
            </div>
            <div className="secononeb">
            <i className="fa fa-key" aria-hidden="true"></i>
            <p>
            Certainly! Here's a placeholder paragraph you can use
              --Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              ---Let me know if you need something more specific or a different style!
            </p>
            </div>
        </div>
        <div className="secondtwo">
          <div className="secononec">
          <i className="fa fa-shield" aria-hidden="true"></i>
          <p>
            Certainly! Here's a placeholder paragraph you can use
              --Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              ---Let me know if you need something more specific or a different style!
            </p>
          </div>
          <div className="secononed">
          <i className="fa fa-credit-card" aria-hidden="true"></i>
          <p>
            Certainly! Here's a placeholder paragraph you can use
              --Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              ---Let me know if you need something more specific or a different style!
            </p>
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="bottom-bar">
          {/*no referrer to direct to te new page, */}
        <a href="https://twitter.com" target="_blank" 
          rel="noopener noreferrer"
          aria-label="Twitter"><i className="fa fa-twitter icon" aria-hidden="true"></i></a>
        <a  href="https://facebook.com" target="_blank" 
          rel="noopener noreferrer"
          aria-label="Facebook"><i className="fa fa-facebook icon" aria-hidden="true"></i></a>
        <a  href="https://instagram.com"   target="_blank" 
          rel="noopener noreferrer"
          aria-label="Instagram" ><i className="fa fa-instagram icon" aria-hidden="true"></i></a>
          <p>Terms of Services | Support | &copy; 2024 Keyvault, Inc. All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}
export default Homepage;  

