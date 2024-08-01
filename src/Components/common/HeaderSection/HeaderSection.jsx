import React from 'react';
import styles from './HeaderSection.module.scss';

export default (props) => (
  <div className={styles['header-bar']}>
      <div className={styles['header-title']}>
        <h1 className={styles['header']}>{props.queueName}  </h1>
      </div>
      <div className={styles['header-subtitle']}>
        <h3>{props.subTitle}111</h3>
      </div>
  </div>
);
