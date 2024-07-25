/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useNavigate } from 'react-router';
// import { smoothScrollToHomePageTop } from '../../../utils/scrollingOperations';
import styles from './ClickableLogo.module.scss';

function ClickableLogo(props)  {
  const navigate = useNavigate();
  const defaultOnClick = () => {
    //  smoothScrollToHomePageTop(navigate);
    navigate('/');
  };
  return (
    <div className={styles['logo']} 
    onClick={props.onClick ? props.onClick : defaultOnClick}
    >
      <img src="/images/Logo-1.jpg" alt="Logi" />
      <p>Queue Me Up</p>
    </div>
  );
};


export default ClickableLogo ;