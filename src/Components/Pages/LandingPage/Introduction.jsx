import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './Introduction.scss';
import AppFeatures from './AppFeatures';
import {NavLink} from 'react-router-dom'

const Typewriter = ({ text, delay, infinite }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout;

    if (currentIndex <= text.length) {
      timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);

    } else if (infinite) { // ADD THIS CHECK
      setCurrentIndex(1);
      setCurrentText('G');
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, delay, infinite, text]);

  return <span>{currentText}</span>;
};

function Introduction() {
  let subtitle = 'Give Users a Delightful Waiting Experience!!!';

  return (
    <section id="introduction" className={"introduction"}>
      <div className={"container "}>
        <div className={"row "}>
          <div className={"col-lg-7 order-2 order-lg-1 d-flex flex-column justify-content-center "}>
            <h1 data-aos="fade-up" >Queue Me Up - A virtual queue management system.</h1>
            <h6 className={"d-none d-lg-block"} data-aos="fade-up" data-aos-delay="100"><Typewriter text={subtitle} delay={100} infinite /></h6>
            <div className={"d-flex flex-column flex-md-row"} data-aos="fade-up" data-aos-delay="200">
            <NavLink
                to='/join'
                className={"btn-get-started"}
              >
                Get Started<i className={"ps-2 bi bi-arrow-right"}></i>
              </NavLink>
              {/* <a href="/join" role ='button' className={"btn-get-started"}>Get Started<i className={"ps-2 bi bi-arrow-right"}></i></a> */}
              <a href="https://youtu.be/6dgA_GBno20" target="_blank" className={"glightbox btn-watch-video d-flex align-items-center justify-content-center ms-0 ms-md-4 mt-4 mt-md-0"}>
                <i className={"bi bi-play-circle"}></i><span>Watch Video</span></a>
            </div>
          </div>
          <div className={"d-none d-lg-block col-lg-5 order-1 order-lg-2 hero-img "}>
            <img src="images/hero-pic.png" width={400} className={"img-fluid animated"} alt="" />
          </div>
        </div>
        <div className={"row "}>
          <AppFeatures />
        </div>
      </div>
    </section>
  );
};


export default Introduction;