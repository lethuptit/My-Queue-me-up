/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import { Link } from 'react-router-dom';
import { smoothScrollTo, smoothScrollToHomePageTop, onLoadById } from '../../../utils/scrollingOperations';
// import { useNavigate } from 'react-router';
// import { ReactTypeformEmbed } from 'react-typeform-embed';
import styles from './Nav.module.scss';
import LoginButton from '../LoginButton';

const LeftNav = ({ open, toggleClose }) => {
  // const navigate = useNavigate();
  let typeformEmbed = null;

  // const scrollToHowItWorks = () => {
  //   // Close the navbar on click
  //   toggleClose();
  //   // get the target div by ID
  //   const element = document.getElementById('target_how_it_works');
  //   if (element) {
  //     // element is on the current page, just have to scroll to it
  //     smoothScrollTo(element);
  //   } else {
  //     navigate('/');
  //     // wait till page loads before getting element
  //     onLoadById('target_how_it_works', smoothScrollTo);
  //   }
  // };

  // const openContactUs = () => {
  //   typeformEmbed.typeform.open();
  // };

  return (
    <div>
      <ul className={styles['left-nav']} open={open}>
        <li>
          <Link to="/">
            Home
          </Link>
        </li>
        <li><Link to="/queue-view">Queue View</Link></li>
        <li>
          <Link to="/contact">
            Contact Us
          </Link>
        </li>
        <li>
          <Link to="/login">
            <LoginButton />
          </Link>
        </li>
      </ul>
      {/* <ReactTypeformEmbed
        popup
        url="https://kss9gyhvcy3.typeform.com/to/kHJHPLEr"
        hideHeaders
        hideFooter
        style={{ top: -100 }}
        ref={(tf) => {
          typeformEmbed = tf;
        }}
        buttonText="Contact Us"
      /> */}
    </div>
  );
};

export default LeftNav;
