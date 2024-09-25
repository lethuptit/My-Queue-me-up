import React from 'react';
import styles from './SidePanel.module.scss';

export default function SidePanel(props) {
  return (
    <div className={styles['side-panel']}>{props.children}</div>
  )
};