import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './Introduction.css';

function Introduction() {
  let subtitle = 'Give Users a Delightful Waiting Experience!!!';

  return (
      <div id="introduction" className="introduction section">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
              <h1 data-aos="fade-up">Queue Me Up is a virtual queue management system.</h1>
              <p data-aos="fade-up" data-aos-delay="100">{subtitle}</p>
              <div class="d-flex flex-column flex-md-row" data-aos="fade-up" data-aos-delay="200">
                <a href="#about" class="btn-get-started">Get Started <i class="bi bi-arrow-right"></i></a>
                <a href="https://www.youtube.com/watch?v=LXb3EKWsInQ" class="glightbox btn-watch-video d-flex align-items-center justify-content-center ms-0 ms-md-4 mt-4 mt-md-0"><i class="bi bi-play-circle"></i><span>Watch Video</span></a>
              </div>
            </div>
            <div className="col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-out">
              <img src="assets/img/hero-img.png" className="img-fluid animated" alt=""/>
            </div>
          </div>
        </div>
      </div>
  );
};


export default Introduction;