import React from 'react';
import styles from './HeaderSection.module.scss';

export default (props) => (
  <div className={styles['header-bar']}>
      <div className={styles['header-title']}>
        <h2 className={styles['header']}>{props.title}  </h2>
        <div className={styles['header-subtitle']}>
          <h5>{props.subTitle}</h5>
        </div>
      </div>      
      {props.children}   

  </div>
);
