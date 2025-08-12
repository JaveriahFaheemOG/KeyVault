
import React, { useState } from 'react';

function Help(){
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "How do I reset my master password?",
            answer: "If you forget your master password, you can reset it by going to the login page, clicking 'Forgot Password,' and following the prompts to reset it."
        },
        {
            question: "Can I import my existing passwords?",
            answer: "Yes, Keyvault allows you to import passwords from a variety of sources. Go to the Settings page, select 'Import,' and follow the instructions."
        },
        {
            question: "Is my data secure with Keyvault?",
            answer: "Absolutely! Keyvault uses advanced encryption to ensure that only you have access to your data. Learn more on our Security page."
        },
        {
            question: "How do I create a new password entry?",
            answer: "To add a new password, go to your dashboard, click 'Add New Password' and enter the details for your account."
        },
        {
            question: "Can I access my passwords on multiple devices?",
            answer: "Yes, as long as you're signed in to your Keyvault account, you can access your passwords from any device with an internet connection."
        },
        {
            question: "What happens if I lose my device?",
            answer: "If you lose your device, your passwords are still safe. Just log in from another device to access your information, and consider changing your master password."
        },
        {
            question: "Does Keyvault automatically log me out after a period of inactivity?",
            answer: "For security reasons, Keyvault automatically logs you out after a set period of inactivity. You can adjust this setting in your account preferences."
        },
        {
            question: "Can I share passwords with others?",
            answer: "Yes, you can share individual passwords securely with trusted contacts. Go to the password entry, click 'Share' and enter the recipient's email."
        },
        {
            question: "What should I do if I suspect unauthorized access to my account?",
            answer: "If you suspect unauthorized access, change your master password immediately and review your login history in the Security section of your account."
        }
    ];

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="help-container">
            <h2 className="help-title">Need Assistance? We're Here to Help!</h2>
            <div className="faq-section">
                {faqs.map((faq, index) => (
                    <div 
                        key={index} 
                        className={`faq-item ${activeIndex === index ? 'active' : ''}`} 
                        onClick={() => toggleAnswer(index)}
                    >
                        <div className="faq-question">
                            <span>{faq.question}</span>
                            <span className={`arrow ${activeIndex === index ? 'open' : ''}`}>&#9660;</span>
                        </div>
                        {activeIndex === index && (
                            <div className="faq-answer">{faq.answer}</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Help;  
