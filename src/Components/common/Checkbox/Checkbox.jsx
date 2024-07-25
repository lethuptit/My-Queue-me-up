import React from 'react';
import styles from './Checkbox.module.scss';
import Form from 'react-bootstrap/Form';

const Checkbox = ({ name, type, label, checked, onChange }) => {
  return (
    /* eslint-disable react/jsx-wrap-multilines */
    <div className={styles['checkbox']}>
        <input
        className={`${styles['checkbox-input']} form-check-input`}
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
