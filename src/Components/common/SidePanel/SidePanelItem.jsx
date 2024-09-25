import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import styles from './SidePanel.module.scss';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpandButton = ({ isOpen }) => {
  const iconStyle = isOpen
    ? `bi bi-chevron-down ${styles['expand-icon']} ${styles['expand-icon-open']}`
    : `bi bi-chevron-down ${styles['expand-icon']}`;

  return (
    <div className={styles['expand-button']}>
      {/* <ExpandMoreIcon
      className={
        isOpen
          ? `${styles['expand-icon']} ${styles['expand-icon-open']}`
          : `${styles['expand-icon']}`
      }
      fontSize="large"
    /> */}
      <i
        className={iconStyle}
        fontSize="large">
      </i>
    </div>
  )
};

const SidePanelItem = ({
  title,
  description,
  Icon,
  expendable = true,
  onClick,
  children,
  style = 'side-panel-item',
}) => {
  const [open, setOpen] = useState(!expendable);
  const onClickHandler = () => {
    if (!expendable) {
      setOpen(true);
    }
    else
      setOpen(!open);
    if (onClick) {
      onClick();
    }
  };

  return (
    <>
      <div className={styles[style]}>
        <div
          className={styles['header']}
          tabIndex={0}
          role="button"
          onKeyDown={onClickHandler}
          onClick={onClickHandler}
        >
          {/* <i className={`${Icon} h4`} /> */}
          <Icon className={styles['icon']} fontSize="medium" />
          <div>
            <h6>{title}</h6>
            <p className={styles['description']}>{description}</p>
          </div>
          {expendable && children && <ExpandButton isOpen={open} />}
        </div>
        {(
          <Collapse in={open}>
            <div>
              {children}
            </div>
          </Collapse>
        )}
      </div>
    </>
  );
};

export default SidePanelItem;
