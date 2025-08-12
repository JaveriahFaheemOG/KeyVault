import React from "react";
import { useInView } from "react-intersection-observer";

function Contentdown() { 
  const { ref: firstRef, inView: firstInView } = useInView({ triggerOnce: true });
  const { ref: secondRef, inView: secondInView } = useInView({ triggerOnce: true });
  const { ref: thirdRef, inView: thirdInView } = useInView({ triggerOnce: true });
  const { ref: fourthRef, inView: fourthInView } = useInView({ triggerOnce: true });
    return(
      <div className="second-section">
      <div className="seconone">
        <div
          className={`secononea slide-in slide-in-left ${firstInView ? "visible" : ""}`}ref={firstRef}>
          <i className="fa fa-lock" aria-hidden="true"></i>
          <p>With our password manager, you can rest assured that your data is truly private. We use zero-knowledge encryption, meaning we don’t have access to your passwords or personal data—only you have the master key. Plus, regular security audits ensure that our security measures are up to date, giving you an added layer of assurance.Take control of your online security today. With a password manager, you can protect your digital assets, maintain privacy, and enjoy a hassle-free online experience—all with just a single master pass.</p>
        </div>
        <div
          className={`secononeb slide-in slide-in-right ${secondInView ? "visible" : ""}`} ref={secondRef}>
          <i className="fa fa-key" aria-hidden="true"></i>
          <p>Security doesn’t end at password storage. Our password manager employs multi-layered security features, including industry-standard encryption, strong master password requirements, and optional multi-factor authentication. These features work together to protect your account from unauthorized access, whether you’re logging in at home or on a public network. With additional options to lock your account if unusual activity is detected, you can have peace of mind that your data is well-protected.</p>
        </div>
      </div>
      <div className="secondtwo">
        <div
          className={`secononec slide-in slide-in-left ${thirdInView ? "visible" : ""}`}
          ref={thirdRef}
        >
          <i className="fa fa-shield" aria-hidden="true"></i>
          <p>Your digital life is mobile, and so is our password manager. With secure, encrypted sync across all your devices, you’ll have instant access to your passwords and important notes wherever you go. Each time you log in on a new device, our system verifies your identity with advanced authentication protocols, so your data remains yours alone. Syncing data is not just convenient—it’s done with your security in mind, keeping your information private and accessible only to you.</p>
        </div>
        <div
          className={`secononed slide-in slide-in-right ${fourthInView ? "visible" : ""}`}
          ref={fourthRef}
        >
          <i className="fa fa-credit-card" aria-hidden="true"></i>
          <p>Our password manager makes staying secure easy. With a built-in password generator, you can create strong, unique passwords for every account, minimizing the risk of breaches. And if a site you use is compromised, our monitoring alerts will notify you to update your credentials promptly. By using our service, you’re not only enhancing your security but also empowering yourself to navigate the digital world confidently and safely.</p>
        </div>
      </div>
    </div>
    );}
export default Contentdown;  