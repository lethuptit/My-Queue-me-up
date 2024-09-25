import React, { useState } from 'react';
import styles from './Header.module.scss';
import NavBar from '../Nav/Navbar';
import { windowScroll } from '../../../utils/eventHandling'

export const FixedHeader = () => {

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let styleClass = `${styles["fixed-header"]} ${styles["header-transparent"]} fixed-top `;
  const [style, setStyle] = useState(styleClass)
  const handleStyle = () => {
    if (windowScroll()) {
      styleClass += `${styles["header-scrolled"]}`
    }
    else
      styleClass.replace(`${styles["header-scrolled"]}`, '')

    setStyle(styleClass);
  }
  window.addEventListener("scroll", handleStyle );
  

  return (
    <div className={style}>
      <NavBar />
    </div>
  );
}
