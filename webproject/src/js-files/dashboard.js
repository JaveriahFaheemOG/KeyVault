import '../css-files/dashboard.css';
import React, { useEffect, useState } from 'react';
import Password from './password';
import ChangePasswordForm from './change'; //import the form
import Audit from './audit';
import Notes from './notes';
import Address from './address';
import Bank from './bankaccounts';
import Dash from './dash';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 
import axios from 'axios';

function Dashboard() {
  const [activePage, setActivePage] = useState('dash');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false); // State for pop-up form
  const [showSignOutPopup, setShowSignOutPopup] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [istokenremoved, setistokenremoved] = useState(false);
  const navigate = useNavigate();
  function isTokenExpired(token) {

    try {
      const decoded = jwtDecode(token); // Decode the JWT token
      const exp = decoded.exp; // Get the expiration time from the payload
      const currentTime = Date.now() / 1000; // Current time in seconds

      return exp < currentTime; // Return true if the token is expired
    } catch (error) {
      console.log('Error decoding token:');
      return false;
    }
  }
  // Add active class to the selected option
  useEffect(() => {
    const listItems = document.querySelectorAll('.list');
    listItems.forEach((item) => {
      item.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent page reload
        listItems.forEach((el) => el.classList.remove('active')); // Remove 'active' from all
        item.classList.add('active'); // Add 'active' to the clicked item
      });
    });
    const authToken = localStorage.getItem('authToken');
    if (!authToken && !istokenremoved) {
      setIsLoggedOut(true); // Show logged-out popup if no token
    }
    if (isTokenExpired(authToken)) {
      localStorage.removeItem('authToken'); // Remove expired token
      setIsLoggedOut(true); // Show logged-out popup
    }
if(!istokenremoved)
  {
    axios.post('http://localhost:3001/validate-token', {}, {
      headers: {
        'Authorization': `Bearer ${authToken}`, // Send token in the Authorization header
      },
    })
      .then((response) => {
        if (response.status === 200) {
          // Token is valid, set the dashboard data
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
        if (error.response.status === 401 || error.response.status === 403) {
          // Token is invalid or expired
          localStorage.removeItem('authToken'); // Remove the invalid token
          setIsLoggedOut(true); // Show logged-out popup
        }
      });

  }
    

    // Clean up event listeners on component unmount
    return () => {
      listItems.forEach((item) => {
        item.removeEventListener('click', () => {});
      });
      };
  },[istokenremoved]);

 

  const handlePopState = () => {
    console.log('Back or forward button clicked');
    localStorage.removeItem('authToken'); // Remove the auth token
    //navigate('/'); // Redirect to home page after removing token
  };
  useEffect(() => {
    const handleUnload = () => {
      localStorage.removeItem('authToken');
    };
    window.addEventListener('beforeunload', handleUnload);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);


  const handlePageChange = (page) => {
    setActivePage(page);
  };
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleSignOut = () => {
    setistokenremoved(true);
    setShowSignOutPopup(true);
    localStorage.removeItem('authToken'); // Remove the auth token
    setTimeout(() => {
      navigate('/'); // Redirect to home after a brief delay
    }, 2000);
  };
 window.onpopstate = handlePopState;
  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page in history
  };
  if (isLoggedOut) {
    return (
      <div className="change-password-popup">
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>You are logged out</h2>
            <p>Your session has expired or you are not authorized to view this page.</p>
            <button onClick={handleGoBack}>Go Back</button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={`dashboard-container ${isSidebarOpen ? '' : 'collapsed'}`}>
    <div className='dashboard-container'>
    <div className="body">
      {/* Header */}
      <header className="dashheader">
        <div className="headerlogo2">
          <h1 className="logo2">Keyvault</h1>
          <img src={require('../images/lock2.png')} alt="logo-icon" className="logoimage2" />
        </div>
        <nav className="container">
          <div className="searchbar">
            <i className="fa fa-search"></i>
            <input type="search" placeholder="Search your passwords here" />
          </div>
        </nav>
      </header>

      {/* Main Dashboard Layout */}
      <div className="maindash">
        {/* Sidebar Navigation */}
        <div className="naviagtion">
          <ul>
            <li className="list active" onClick={() => handlePageChange('dash')}>
              <a href="#">
                <span className="icond"><i className="fa fa-home"></i></span>
                <span className="title">Dashboard</span>
              </a>
            </li>
            <li className="list" onClick={() => handlePageChange('audit')}>
              <a href="#">
                <span className="icond"><i className="fa fa-pencil" aria-hidden="true"></i></span>
                <span className="title">Audit</span>
              </a>
            </li>
            <li className="list" onClick={() => handlePageChange('address')}>
              <a href="#">
                <span className="icond"><i className="fa fa-address-card" aria-hidden="true"></i></span>
                <span className="title">Address</span>
              </a>
            </li>
            <li className="list" onClick={() => handlePageChange('bank')}>
              <a href="#">
                <span className="icond"><i className="fa fa-lock"></i></span>
                <span className="title">Bank Accounts</span>
              </a>
            </li>
            <li className="list" onClick={() => handlePageChange('passwords')}>
              <a href="#">
                <span className="icond"><i className="fa fa-key"></i></span>
                <span className="title">Passwords</span>
              </a>
            </li>
            <li className="list" onClick={() => handlePageChange('note')}>
              <a href="#">
                <span className="icond"><i className="fa fa-sticky-note-o"></i></span>
                <span className="title">Notes</span>
              </a>
            </li>
            <li className="list" onClick={() => setShowChangePasswordForm(true)}> {/*added change password form here */}
                <a href="#">
                  <span className="icond"><i className="fa fa-lock"></i></span>
                  <span className="title">Change Password</span>
                </a>
              </li>
            <li className="list" onClick={handleSignOut}>
              <a href="#">
                <span className="icond"><i className="fa fa-sign-out"></i></span>
                <span className="title">Signout</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Toggle Sidebar Button */}
        <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
        <i className={`fa ${isSidebarOpen ? 'fa-arrow-left' : 'fa-bars'}`}></i>
          </button>

        {/* Main Content Area */}
        <div className="mainright">
          {activePage === 'dash' && <Dash />} {/* Render Dash if activePage is 'dash' */}
          {activePage === 'passwords' && <Password />} {/* Render Password if activePage is 'passwords' */}
          {activePage === 'audit' && <Audit />} {/* Render Audit if activePage is 'audit' */}
          {activePage === 'note' && <Notes />} {/* Render Notes if activePage is 'note' */}
          {activePage === 'address' && <Address />} {/* Render Address if activePage is 'address' */}
          {activePage === 'bank' && <Bank />} {/* Render Bank if activePage is 'bank' */}
        </div>
      </div>
    </div>
    </div>
    {showChangePasswordForm && (
        <ChangePasswordForm onClose={() => setShowChangePasswordForm(false)} />
      )}
    {showSignOutPopup && (
        <div className="change-password-popup">
          <div className="popup-overlay">
            <div className="popup-content">
              <h2>Signing you out...</h2>
              <p>Please wait while we redirect you to the home page.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;