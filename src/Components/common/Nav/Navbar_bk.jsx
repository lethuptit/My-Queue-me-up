import React from 'react';
import styles from './Nav.module.scss';
import LeftNav from './LeftNav';
import Logo from '../ClickableLogo';


export const Navbar = () => {
  return (
    <nav className={styles['navbar']}>
      <Logo />
      <LeftNav/>
    </nav>
  );
};

export default Navbar;
