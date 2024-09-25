import React from 'react';

import styles from './Footer.module.scss';
// import "bootstrap-icons/font/bootstrap-icons.css";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const dayOfWeek = () =>
  typeof Intl === 'object' && typeof Intl.DateTimeFormat === 'function'
    ? new Intl.DateTimeFormat('default', { weekday: 'long' }).format(new Date())
    : 'day';

function Footer() {

  return (
    <footer>
      <div className={`constainer-fluid ${styles['footer']}`}>
        <div className={'row gy-4'}>
          <div className={` col col-lg-4 col-md-6 ${styles['footer-about']}`}>
              <span className={styles["sitename"]}>Queue Me Up</span>
            <div className={`pt-3 ${styles["footer-contact"]}`}>
              <p><strong>Capstone Project - Woman In Tech Course</strong></p>
              <p><i>Making Changes Association</i></p>
              <p className={'mt-3'} ><strong>Phone:</strong> <span>+1 762 422 4677</span></p>
              <p><strong>Email:</strong> <span>queuemeup@gmail.com</span></p>
            </div>
            <br/>
            <i>{`💕 Enjoy the rest of your ${dayOfWeek()}!`}</i>
          </div>

          <div className={`col-md-3 ${styles["footer-links"]}`}>
            <h4>Quick Links</h4>
            <ul>
              <li><ChevronRightIcon/> <a href="https://react-bootstrap.netlify.app/" target="_blank" rel="noreferrer">React bootstrap</a></li>
              <li><ChevronRightIcon/> <a href="https://mui.com/" target="_blank" >@material-ui</a></li>
              <li><ChevronRightIcon/> <a href="https://console.firebase.google.com/" target="_blank" >Firebase</a></li>
              <li><ChevronRightIcon/> <a href="https://www.chartjs.org/" target="_blank" >Chartjs</a></li>
            </ul>
          </div>

          <div className={` col-md-3 ${styles["footer-links"]}`}>
            <h4>Our Services</h4>
            <ul> 
              <li><ChevronRightIcon/> <a href="/join">Queueing</a></li>
              <li><ChevronRightIcon/> <a href="/dashboard/queue/list">Manage Queues</a></li>      
              <li><ChevronRightIcon/> <a href="/dashboard/queue/monitor">Monitor Queues</a></li>           
              <li><ChevronRightIcon/> <a href="/dashboard" >Data Analytics</a></li>
            </ul>
          </div>

          <div className={` col-md-12 col-lg-2 `}>
            <h4>Follow Us</h4>
            <ul className={`${styles["social-links"]}  d-flex`}>
              <li><TwitterIcon fontSize='small'/></li>
              <li><FacebookIcon fontSize='small'/></li>
              <li ><GitHubIcon fontSize='small'/></li>
              <li ><LinkedInIcon fontSize='small'/></li>
            </ul>
          </div>
        </div>
      </div>

      <div className={`constainer-fluid mt-2 ${styles['copyright']} text-center`}>
        <p>© <span>Copyright</span> <strong>💜 Queue Me Up Team 💜</strong> <span> © 2024 </span></p>
      </div>
    </footer>
  );
}

export default Footer;