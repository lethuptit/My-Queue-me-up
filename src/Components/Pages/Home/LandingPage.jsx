import React from 'react';
import styles from './Home.module.scss';

import ContactPage from '../Contact/ContactPage';
import Introduction from './Introduction';

function LandingPage() {
  let subtitle = 'Give Users a Delightful Waiting Experience!!!';

  return (
    // <div id="target_top" className={styles['landing-page']}>
    //   <div data-aos="zoom-in">
    //   </div>

    //   {/* <svg xmlns="https://www.w3.org/2000/svg" viewBox="0 0 1440 320">
    //     <path
    //       fill="#6C63FF29"
    //       fillOpacity="1"
    //       d="M0,224L80,192C160,160,320,96,480,101.3C640,107,800,181,960,181.3C1120,181,1280,107,1360,69.3L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
    //     />
    //   </svg> */}
    // </div>
    <main class="main">
      <Introduction/>
      {/* <ContactPage/> */}

    </main>

  );
};


export default LandingPage;