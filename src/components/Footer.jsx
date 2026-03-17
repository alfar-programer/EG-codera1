import React from 'react';
import { FaLinkedinIn, FaGithub, FaTwitter, FaDribbble, FaArrowRight } from 'react-icons/fa6';
import './styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container" id="footer">
      <div className="footer-glow"></div>
      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="/#" className="footer-logo" data-cursor="disable">
              <img src="/images/logo.png" alt="EG Codera Logo" />
              <span className="footer-logo-text">EG CODERA</span>
            </a>
            <p className="footer-tagline">Building intelligent digital experiences.</p>
            <p className="footer-desc">
              We are a modern software development studio crafting premium, 
              scalable, and award-winning digital solutions for forward-thinking brands.
            </p>
            <div className="footer-socials">
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" data-cursor="disable"><FaLinkedinIn /></a>
              <a href="https://github.com/alfar-programer" target="_blank" rel="noopener noreferrer" className="social-icon" data-cursor="disable"><FaGithub /></a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="social-icon" data-cursor="disable"><FaTwitter /></a>
              <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="social-icon" data-cursor="disable"><FaDribbble /></a>
            </div>
          </div>
          
          <div className="footer-links-group">
            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><a href="#about" data-cursor="disable">About</a></li>
                <li><a href="#services" data-cursor="disable">Services</a></li>
                <li><a href="#work" data-cursor="disable">Projects</a></li>
                <li><a href="#career" data-cursor="disable">Careers</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Resources</h4>
              <ul>
                <li><a href="#blog" data-cursor="disable">Blog</a></li>
                <li><a href="#docs" data-cursor="disable">Documentation</a></li>
                <li><a href="#cases" data-cursor="disable">Case Studies</a></li>
                <li><a href="#contact" data-cursor="disable">Contact</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Services</h4>
              <ul>
                <li><a href="#web" data-cursor="disable">Web Development</a></li>
                <li><a href="#saas" data-cursor="disable">SaaS Products</a></li>
                <li><a href="#uiux" data-cursor="disable">UI/UX Design</a></li>
                <li><a href="#ai" data-cursor="disable">AI Solutions</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-newsletter">
            <h4>Stay Connected</h4>
            <p>Stay updated with our latest projects and insights.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" data-cursor="disable" />
              <button type="submit" data-cursor="disable"><FaArrowRight /></button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-separator"></div>
          <div className="footer-bottom-text">
            <span>©2026 EG Codera. Confidential & Proprietary</span>
            <div className="footer-bottom-links">
              <a href="#privacy" data-cursor="disable">Privacy Policy</a>
              <a href="#terms" data-cursor="disable">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
