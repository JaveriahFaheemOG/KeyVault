function Why(){
    return(
      <div className="why-container">
      <h2 className="why-title">Why Choose Keyvault?</h2>
      <p className="why-intro">
          Discover the advanced features that make Keyvault the best choice for secure and seamless password management.
      </p>

      <div className="feature-grid">
          <div className="feature-card">
          <video
        src={require('../images/2fa.webm')} 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="background-video"
        style={{ width: '270px', height: 'auto', maxHeight: '100px' }}>
        </video>
              <h3 className="feature-title">Auto-Fill Passwords</h3>
              <p className="feature-description">
                  Save time by letting Keyvault automatically fill in your passwords across websites and apps securely.
              </p>
          </div>

          <div className="feature-card">
          <video
        src={require('../images/authenticate2.webm')} 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="background-video"
        style={{ width: '270px', height: 'auto', maxHeight: '100px' }}>
        </video>
              <h3 className="feature-title">Biometric Login</h3>
              <p className="feature-description">
                  Use your fingerprint or face recognition for quick, secure access to your vault without needing your master password.
              </p>
          </div>

          <div className="feature-card">
          <video
        src={require('../images/security.webm')} 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="background-video"
        style={{ width: '270px', height: 'auto', maxHeight: '110px' }}>
        </video>
              <h3 className="feature-title">Real-Time Security Alerts</h3>
              <p className="feature-description">
                  Get notified if any of your passwords are compromised, so you can take action immediately.
              </p>
          </div>

          <div className="feature-card">
          <video
        src={require('../images/pin.webm')} 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="background-video"
        style={{ width: '270px', height: 'auto', maxHeight: '110px' }}>
        </video>
              <h3 className="feature-title">Strong Password Generator</h3>
              <p className="feature-description">
                  Generate complex passwords with one click, ensuring maximum security for all your accounts.
              </p>
          </div>
      </div>
  </div>
    );
}
export default Why;  
