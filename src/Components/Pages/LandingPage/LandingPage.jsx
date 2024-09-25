import React from 'react';

import ContactPage from './ContactPage';
import Introduction from './Introduction';
import AboutTeam from './AboutTeam/AboutTeam';
import BackToTopButton from '../../common/TopButton/Back2TopButton';

function LandingPage() {

  return (
    <>
      <Introduction />
      <AboutTeam/>
      <ContactPage />
      <BackToTopButton />
    </>
  );
};


export default LandingPage;