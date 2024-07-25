import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './Footer.module.scss';
import "bootstrap-icons/font/bootstrap-icons.css";
import ClickableLogo from '../ClickableLogo';

const dayOfWeek = () =>
  typeof Intl === 'object' && typeof Intl.DateTimeFormat === 'function'
    ? new Intl.DateTimeFormat('default', { weekday: 'long' }).format(new Date())
    : 'day';

function Footer() {
  const Logo = () =>
    (<svg width="112px" height="55px" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="Artboard-1" fill="#6C63FF29"  fillOpacity="1">
            <path d="M0,224L80,192C160,160,320,96,480,101.3C640,107,800,181,960,181.3C1120,181,1280,107,1360,69.3L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"/>
            </g>
        </g>
    </svg>);

  return (
    <footer id="footer" className={styles['footer']}>
      <Container fluid='true' className={styles['footer']}>
        <Row gy={4}>
          <Col lg={4} md={6}className={styles['footer-about']}>
            <a href="index.html" className="d-flex align-items-center">
              <span className="sitename">Queue Me Up</span>
            </a>
            <div pt={3} className={styles["footer-contact"]}>
              <p>Capstone Project - Woman In Tech Course</p>
              <p>Making Changes Association</p>
              <p mt={3}><strong>Phone:</strong> <span>+1 234 567 8910</span></p>
              <p><strong>Email:</strong> <span>info@example.com</span></p>
            </div>
            <br/>
            <i>{`💕 Enjoy the rest of your ${dayOfWeek()}!`}</i>
          </Col>

          <Col lg={3} md={3} className={`${styles["footer-links"]}`}>
            <h4>Useful Techs</h4>
            <ul>
              <li><i className="bi bi-chevron-right"></i> <a href="#">React bootstrap</a></li>
              <li><i className="bi bi-chevron-right"></i> <a href="#">@material-ui</a></li>
              <li><i className="bi bi-chevron-right"></i> <a href="#">Firebase</a></li>
              <li><i className="bi bi-chevron-right"></i> <a href="#">Chartjs</a></li>
            </ul>
          </Col>

          <Col lg={3} md={3} className={styles["footer-links"]}>
            <h4>Our Services</h4>
            <ul>
              <li><i className="bi bi-chevron-right"></i> <a href="#">Manage Queue</a></li>
              <li><i className="bi bi-chevron-right"></i> <a href="#">Queueing</a></li>
            </ul>
          </Col>

          <Col lg={2} md={12}>
            <h4>Follow Us</h4>
            <div className={`${styles["social-links"]}  d-flex`}>
              <a href=""><i className="bi bi-twitter-x"></i></a>
              <a href=""><i className="bi bi-facebook"></i></a>
              <a href=""><i className="bi bi-instagram"></i></a>
              <a href=""><i className="bi bi-linkedin"></i></a>
            </div>
          </Col>
        </Row>
      </Container>

      <Container mt={2} className={`${styles['copyright']} text-center`}>
        <p m='auto'>© <span>Copyright</span> <strong>💙 Queu Me Up Team 💙</strong> <span> © 2024 </span></p>
      </Container>
    </footer>
  );
}

export default Footer;