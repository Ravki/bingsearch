import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-row">
        <nav className="nav-bar" role="navigation" aria-label="footer links">
          <ul>
            <li>
              <a
                href="https://privacy.microsoft.com/en-gb/privacystatement"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy and Cookies
              </a>
            </li>
            <li>
              <a
                href="https://www.microsoft.com/en-gb/servicesagreement/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Legal
              </a>
            </li>
            <li>
              <a
                href="https://about.ads.microsoft.com/en-gb/h/a/microsoft-advertising?s_cid=GB-Acq-DIG-src_Foot-sub_serp"
                target="_blank"
                rel="noopener noreferrer"
              >
                Advertise
              </a>
            </li>
            <li>
              <a
                href="https://help.bing.microsoft.com/#apex/18/en-gb/n1999/-1/en-gb"
                target="_blank"
                rel="noopener noreferrer"
              >
                Help
              </a>
            </li>
            <li>
              <a href="#">Feedback</a>
            </li>
          </ul>
        </nav>
        <div className="copyright">
          <span>Copyright &#169; {new Date().getFullYear()} Microsoft</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
