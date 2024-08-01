import React from 'react';
import styles from './Checkbox.module.scss';

const Checkbox = ({ name, type, label, checked, onChange }) => {
  return (
    <div className={styles['checkbox-container']}>
        <input
        className={`${styles['checkbox-input']}`}
        type={type?type:"checkbox"}
        name={name}
        checked={checked}
        onChange={onChange}
      /> 
      <span className="ps-1">{label}</span>
    </div>
  );
};

export default Checkbox;
