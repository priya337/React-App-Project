import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faXTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

function displayFooter() {
  return (
    <>
      <div>
        <footer>
          <span className="copyright">Copyright © 2024 KanbanBoard</span>
          <div className="footer-content">
            <img
              src="./GitHub-icon-removebg-preview.png"
              alt="github-icon"
              size="2x"
            />
            <a href="https://github.com/priya337/React-App-Project" size="2x">
              Github Repository
            </a>
          </div>
          <span className="social-media">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faXTwitter} size="2x" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
          </span>
        </footer>
      </div>
    </>
  );
}
export default displayFooter;
