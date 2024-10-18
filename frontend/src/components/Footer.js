// frontend/src/components/Footer.js
import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import './Footer.css'; // Create a CSS file for styling the footer

const Footer = () => {
    return (
        <footer className="footer">
            <div className="social-icons">
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                </a>
                <a href="https://www.linkedin.com/in/yourusername/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                </a>
                <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">
                    <FaTwitter />
                </a>
            </div>
            <p>&copy; {new Date().getFullYear()} Your Name. All Rights Reserved.</p>
        </footer>
    );
};

export default Footer;
