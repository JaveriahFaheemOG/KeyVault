import React, {useState } from 'react';
import 'font-awesome/css/font-awesome.min.css'; 
import '../css-files/homepage.css';
import '../images/lock2.png'; 
import {Link} from 'react-router-dom';
import Formsign from './signupform.js';
import Formlogin from './loginform.js';
import Contentdown from './contentdown.js';
import Blog from './blog.js';
import Help from'./help.js';
import Why from './whykepvault.js';
import { FaCheckCircle } from 'react-icons/fa'; 


function Homepage({ onFormSubmit }) { 

  const [showLogin, setShowLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks login status
  const [showBlog, setShowBlog] = useState(false); // Track whether to show the Blog component
  const [showHelp, setShowHelp] = useState(false); // Track whether to show the Blog component
  const [showWhy, setShowWhy] = useState(false); // Track whether to show the Blog component
  const [showContentdown, setShowContentdown] = useState(true); // State to control Contentdown visibility
  const [isContentRemoved, setIsContentRemoved] = useState(false); // Track if content has been removed
  const [isOpen, setIsOpen] = useState(false);//for dropdown
  const [isOpenfuture, setIsOpenfuture] = useState(false);//for dropdown
  const [showFullText, setShowFullText] = useState(false); // To toggle full text
   // Toggle function to switch forms
  const toggleForm = () => {
    setShowLogin((prevShowLogin) => !prevShowLogin);
    setShowContentdown(true);
    setIsContentRemoved(false);
    setShowHelp(false);
    setShowWhy(false);
    setShowBlog(false);
    setIsContentRemoved(false);
  };
  const handleFormSubmit = () => {
    // Call the onFormSubmit function passed from App.js
    if (onFormSubmit) onFormSubmit();
    console.log('Logged in homepage'); // Log for verification
    setIsLoggedIn(true); // Change login state after form submission
    updateButtonHtml();

  };
  // Function to change the HTML of the button with class 'sign-in'
  const updateButtonHtml = () => {
    const signInButton = document.querySelector('.sign-in');
    if (signInButton) {
      signInButton.remove(); // Remove the button from the DOM
    }
  };
  const handleBlogClick = (e) => {
    e.preventDefault();
    setShowBlog(true); // Set state to show Blog component
    setShowHelp(false);
    setShowWhy(false);
    setIsContentRemoved(true);
    setShowContentdown(false); // Hide Contentdown component
    setIsContentRemoved(true); // Update state to mark content as removed

  };
  const handleWhyClick = (e) => {
    e.preventDefault();
    setShowBlog(false); // Set state to show Blog component
    setShowHelp(false);
    setShowWhy(true);
    setIsContentRemoved(true);
    setShowContentdown(false); // Hide Contentdown component
    setIsContentRemoved(true); // Update state to mark content as removed
  };
  const handleHelpClick = (e) => {
    e.preventDefault();
    setShowBlog(false);
    setShowWhy(false);
    setShowHelp(true); // Set state to show Blog component
    setIsContentRemoved(true);
    setShowContentdown(false); // Hide Contentdown component
    setIsContentRemoved(true); // Update state to mark content as removed
  };
  const handleWhyFeatures=(e)=>{
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  const handleFuture=(e)=>{
    e.preventDefault();
    setIsOpenfuture(!isOpenfuture);
  };
  const handleMouseLeave = () => {
    setIsOpen(false);
  };
  const handleMouseLeave1 = () => {
    setIsOpenfuture(false);
  };
  const handleSectionClick = (e, sectionId) => {
    e.preventDefault(); // Prevent default anchor link behavior
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the section
  };
  // Toggle function for showing full text
  const toggleFullText = () => {
    setShowFullText((prevShowFullText) => !prevShowFullText);
  };
  const SectionWithTick = ({ title, description }) => (
    <section className="section-item">
        <FaCheckCircle className="tick-icon" />
        <div>
            <h2 className="section-item-title">{title}</h2>
            <p className="section-item-description">{description}</p>
        </div>
    </section>
);

const handleLogoClick = (e) => {
  e.preventDefault(); // Prevent default navigation
  setShowLogin(true); // Ensure the login form is displayed
  setShowContentdown(true); // Show the content down component
  setIsContentRemoved(false); // Ensure content isn't marked as removed
  setShowBlog(false); // Hide the blog
  setShowHelp(false); // Hide help
  setShowWhy(false); // Hide why section
  };
    return (
      <div className="homepage">
        <header className="header">
          <div className="header-content">
            <div className='headerlogo'>
              {/*this line was also changed*/}
              <h1 className="logo"><Link to='/' onClick={handleLogoClick}>Keyvault</Link></h1>
            <img src={require('../images/lock2.png')} alt='logo-icon' className='logoimage'/>
            </div>
            <nav className="nav">
            <a href="/Blog" onClick={handleBlogClick}>Blog</a>
            <a href="/Help" onClick={handleHelpClick}>Help</a>
            <a href="/Why" onClick={handleWhyClick}>Why Keyvault</a>
            <div className="dropdown"  onMouseLeave={handleMouseLeave}>
            <button onMouseEnter={handleWhyFeatures} className="dropdown-button" >Features <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span></button>
            {isOpen && (
                <div className="dropdown-menu">
                <a href="Document-Notes"onClick={(e) => handleSectionClick(e, "Document-Notes")}>Document/Notes</a>
                <a href="Maintain-Logs"onClick={(e) => handleSectionClick(e, "Maintain-Logs")}>Maintain Logs</a>
                <a href="Password-Generation"onClick={(e) => handleSectionClick(e, "Password-Generation")}>Password Generation</a>
                <a href="Data-Privacy"onClick={(e) => handleSectionClick(e, "Data-Privacy")}>Data Privacy</a>
                <a href="Security-Dashboard"onClick={(e) => handleSectionClick(e, "Security-Dashboard")}>Security Dashboard</a>
                <a href="Client-Side-Encryption-Decryption"onClick={(e) => handleSectionClick(e, "Client-Side-Encryption-Decryption")}>Client Side Encryption/Decryption</a>
            </div>

            )}
            </div>
            <div className="dropdown"  onMouseLeave={handleMouseLeave1}>
            <button onMouseEnter={handleFuture} className="dropdown-button" >Future Enhancements <span className={`arrow1 ${isOpenfuture ? 'open1' : ''}`}>▼</span></button>
            {isOpenfuture && (
                <div className="dropdown-menu">
                    <a href="AI-Powered Security-Insights" onClick={(e) => handleSectionClick(e, "AI-Powered Security-Insights")}>AI-Powered Security-Insights</a>
                    <a href="Password-Breach-Monitoring"onClick={(e) => handleSectionClick(e, "Password-Breach-Monitoring")}>Password-Breach-Monitoring</a>
                    <a href="Biometric-Authentication"onClick={(e) => handleSectionClick(e, "Biometric-Authentication")}>Biometric-Authentication</a>
                    <a href="Advanced-Account-Recovery"onClick={(e) => handleSectionClick(e, "Advanced-Account-Recovery")}>Advanced-Account-Recovery</a>
                    <a href="Offline-Access"onClick={(e) => handleSectionClick(e, "Offline-Access")}>Offline-Access-with-Local-Encryption</a>
                    <a href="Custom-Security"onClick={(e) => handleSectionClick(e, "Custom-Security")}>Custom-Security-Settings</a>
                    <a href="auto-fills"onClick={(e) => handleSectionClick(e, "auto-fills")}>Smart auto-fills</a>
                </div>
            )}
            </div>
             {/*} <Link to='/sign-in'> this was acahngedd*/}
              <button className="sign-in" onClick={toggleForm}>
              {showLogin ? 'Sign Up' : 'Sign In'}
                </button>
                {/*</Link>*/}
            </nav>
          </div>
        </header>
        {!isContentRemoved && (
        <div className="content">
        <section className="left-section">
        <video
        src={require('../images/Search-bar-[remix].webm')} 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="background-video"
        style={{ width: '500px', height: 'auto', maxHeight: '100px' }}>
        </video>
          <hr className="selfhr"/>
          <h2>Let us remember your passwords for you!</h2>
          <p className='more-left-section'>
              With so many accounts and logins to manage, it’s easy to feel overwhelmed by the need to remember every password. Our password management solution steps in to simplify your life...
              {showFullText && (
                <>
                  No more scribbling passwords on sticky notes or using the same password across sites. We securely store your credentials in one encrypted, easy-to-access place, allowing you to log in with just a click. By letting us take care of your passwords, you can focus on what really matters—knowing your accounts are safe, secure, and ready whenever you need them. Enjoy a seamless, secure digital experience without the hassle of password overload!
                </>
              )}
            </p>
            <i className="fa fa-file" aria-hidden="true"></i>
            <Link to="#" onClick={toggleFullText}>
              {showFullText ? ' Show less' : ' Click for more details'}
            </Link>
        </section>
        {/*{showLogin ? <Formlogin /> : <Formsign />} {/*for togglibg up forms*/}
        {showLogin ? <Formlogin onSubmit={handleFormSubmit} /> : <Formsign onSubmit={handleFormSubmit} />}
      </div>
        )}
      {/* Conditionally render Contentdown */}
      {showContentdown && <Contentdown />}
       {/* Render Blog component when showBlog is true */}
      {showBlog && <Blog />}
      {/* Render Blog component when showHelp is true */}
      {showHelp && <Help />}
      {/* Render Blog component when WhyKeyvault is true */}
      {showWhy && <Why />}
      <div className='Content2'>
      <div className="Section-group-1">
            <div className="image-container">
            <img src={require('../images/vector.png')}  alt="Compliance Banner" />
            </div>
            <div className="content-container">
            <SectionWithTick 
             title="Enhanced Security" 
             description="multi-factor authentication, and continuous monitoring of potential vulnerabilities to prevent unauthorized access." />

            <SectionWithTick 
             title="Authentication" 
             description="multi-factor authentication (MFA), and biometric recognition to ensure only authorized users can access critical information." />

            <SectionWithTick 
             title="Device Authentication" 
             description="device-specific certificates, or biometric data tied to the device, making it more difficult for unauthorized devices to gain access." />

            <SectionWithTick 
             title="Password Management" 
             description="using features like password strength meters and auto-generation tools to ensure passwords are complex and unique for every service." />
            </div>
        </div>
        <br></br><br></br><br></br><br></br>
        <div class="hero-text">
         <h1>Secured Digital World With <span class="highlight-red">Enhanced Password Management</span></h1>
         <p>Our platform streamlines password security with centralized storage, robust encryption, and seamless access control. Empower your organization to protect sensitive information, simplify workflows, and maintain compliance with advanced auditing and reporting tools—security and efficiency, all in one place</p>
        </div>
        <br></br><br></br><br></br><br></br>
        <div class="scrollable-section">
        <div className="styled-container">
      {/* Row 1: Two Sections Side by Side */}
      <div className="styled-row">
        <section id="Document-Notes" className="card">
          <h2 className="card-title">Document/Notes</h2>
          <p className="card-text">
            Maintaining secure documentation is crucial in today's digital landscape. Our enhanced security protocols ensure that all sensitive information is stored and accessed with the highest level of encryption. With detailed access logs and role-based permissions, our system safeguards documents from unauthorized access while allowing seamless collaboration for authorized users.
          </p>
        </section>
        
        <section id="Maintain-Logs" className="card">
          <h2 className="card-title">Maintain Logs</h2>
          <p className="card-text">
            Effective security requires accountability. Our logging system meticulously tracks user activities, providing real-time insights into access patterns, modifications, and system interactions. This enables proactive monitoring, rapid incident response, and compliance with industry standards, helping organizations maintain transparency and bolster their security framework.
          </p>
        </section>
      </div>

      {/* Row 2: Two Sections Side by Side */}
      <div className="styled-row">
        <section id="Security-Dashboard" className="card">
          <h2 className="card-title">Security Dashboard</h2>
          <p className="card-text">
            The Security Dashboard provides a centralized view of all security events and alerts, allowing for real-time monitoring and management. With intuitive data visualizations and customizable alerts, you can quickly identify potential threats and respond effectively to maintain a secure environment.
          </p>
        </section>
        
        <section id="Client-Side-Encryption-Decryption" className="card">
          <h2 className="card-title">Client-Side Encryption/Decryption</h2>
          <p className="card-text">
            Our client-side encryption and decryption features ensure that data remains protected at every stage. By encrypting data on the user's device before transmission, we eliminate third-party access, allowing only authorized users to decrypt information locally.
          </p>
        </section>
      </div>

      {/* Row 3: Two Sections on Left, Image on Right */}
      <div className="styled-row reverse">
      <div className="image-group">
          <img
            src={require('../images/vector4.png')}
            alt="Security Illustration"
            className="styled-img"
          />
        </div>
        <div className="section-group">
          <section id="Password-Generation" className="card">
            <h2 className="card-title">Password Generation</h2>
            <p className="card-text">
              Strong, unique passwords are the first line of defense against cyber threats. Our advanced password generation tool creates highly secure passwords tailored to your specific security needs. With automatic renewal options and multi-factor authentication integration, you can rest assured that your credentials are both strong and safe.
            </p>
          </section>
          
          <section id="Data-Privacy" className="card">
            <h2 className="card-title">Data Privacy</h2>
            <p className="card-text">
              Protecting user data is at the core of our security philosophy. Our platform is designed with robust privacy features, ensuring that personal and sensitive information is handled with the utmost care. From data encryption and anonymization to strict access controls, we prioritize safeguarding user privacy and complying with global data protection standards to keep information secure and private.
            </p>
          </section>
        </div>
      </div>
    </div>
    </div>
    <br></br><br></br><br></br>
    <div class="hero2-container">
    <div class="hero2-text">
        <h1>Powerful Future Enhancements <span class="highlight2-red">For Superior Protection</span></h1>
        <p>Our password management platform is continually evolving to meet the highest standards of security and usability. With upcoming enhancements, we’re integrating cutting-edge features like biometric authentication, AI-powered anomaly detection, and seamless multi-device synchronization to provide a stronger, more intuitive user experience. These innovations will not only reinforce your protection against unauthorized access and data breaches but also streamline your workflow, allowing you to manage passwords effortlessly across all your accounts.</p>
    </div>
    <div class="hero2-media">
    <img src={require('../images/vector5.png')} alt="Hero Image" className="hero2-image"></img>
    </div>
    </div>
    <br></br><br></br><br></br>
    <div class="Section-group-3">
  <section id="Password-Breach-Monitoring">
    <h2>Password Breach Monitoring</h2>
    <p>Our platform constantly monitors online data breaches to alert you if any of your saved credentials are compromised. This real-time monitoring provides an additional layer of security, allowing you to take quick action to protect your accounts.</p>
  </section>
  
  <section id="Biometric-Authentication">
    <h2>Biometric Authentication</h2>
    <p>Enhance your account security with biometric authentication, which uses your unique fingerprint or facial recognition data to verify identity. This ensures that only you can access sensitive information, providing an intuitive and secure experience.</p>
  </section>
  
  <section id="Advanced-Account-Recovery">
    <h2>Advanced Account Recovery</h2>
    <p>Our advanced account recovery process helps you regain access to your account even in challenging situations, with secure multi-factor authentication and identity verification steps tailored to ensure both convenience and security.</p>
  </section>
  
  <section id="Offline-Access">
    <h2>Offline Access</h2>
    <p>Access your most critical data even without an internet connection. Our platform enables offline access to selected data, ensuring you’re always prepared, no matter your network situation.</p>
  </section>
  
  <section id="auto-fills">
    <h2>Auto-Fills</h2>
    <p>With our auto-fill feature, securely store and automatically fill in your credentials on trusted sites, saving time and reducing the risk of password exposure while ensuring a seamless login experience across your devices.</p>
  </section>
  
  <section id="Custom-Security">
    <h2>Custom Security</h2>
    <p>Customize your security settings to fit your unique needs. Set specific authentication methods, access restrictions, and notifications, allowing you to create a personalized security environment.</p>
  </section>
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

