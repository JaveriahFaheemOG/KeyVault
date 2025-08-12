import '../css-files/mainpage.css';
import { useNavigate } from 'react-router-dom';
import React from 'react';

function Mainpage(){
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate('/dashboard'); // Navigate to the Dashboard route
  };

    return(
      <div>
      <header className="header1">
        <h1>KEYVAULT</h1>
        <img src={require('../images/lock2.png')} alt="logo" className="logo2" />
      </header>
      <div className="welcome-box">
        <h1>Welcome to Keyvault</h1>
        <p>
          Rest easy—your passwords, notes, and digital life are under lock and key.
          We're here to safeguard your data with cutting-edge security at every step.
        </p>
        <div className="gifdiv">
          <img src={require('../images/image.png')} alt="Welcome animation" />
        </div>
        <div className="letsgo">
          <button onClick={handleButtonClick}>Let's Go!</button>
        </div>
      </div>
    </div>
  );
  
}
export default Mainpage;  
