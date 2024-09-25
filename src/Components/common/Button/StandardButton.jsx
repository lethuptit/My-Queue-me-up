import React from 'react';
import styles from './Button.module.scss';

const StandardButton = (props) => {
  const { onClick, disabled, type="button" } = props;
  const outlined = props.outlined;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={outlined ? styles['standard-button-outlined'] : styles['standard-button']}
    >
      <div className={styles['text']}>{props.children}</div>
      {props.icon ? <div className={styles['icon']}>{props.icon}</div> : null}
    </button>
  );  
};

export default StandardButton;
