import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-row">
        <nav className="nav-bar" role="navigation" aria-label="footer links">
          <ul>
            <li>
              <a href="#" target="_blank">
                Privacy and Cookies
              </a>
            </li>
            <li>
              <a href="#">Legal</a>
            </li>
            <li>
              <a href="#">Advertise</a>
            </li>
            <li>
              <a href="#">Help</a>
            </li>
            <li>
              <a href="#">Feedback</a>
            </li>
          </ul>
        </nav>
        <div className="copyright">
          <span>Copyright © 2016 Microsoft</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
