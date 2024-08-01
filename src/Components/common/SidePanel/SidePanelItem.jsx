import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import styles from './SidePanel.module.scss';

const ExpandButton = ({ isOpen }) => {
  const name= isOpen ? `${styles['expand-icon']} ${styles['expand-icon-open']}`
  : `${styles['expand-icon']}`
  return (
  <div className={styles['expand-button']}>
    <i className={`${name} bi bi-arrow-bar-down h3`}></i>
  </div>
)};

const SidePanelItem = ({
  title,
  description,
  Icon,
  expendable = false,
  onClick,
  children,
  style = 'side-panel-item',
}) => {
  const [open, setOpen] = useState(expendable);
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
          <i className={`${Icon} h4`} />
          <div>
            <h6>{title}</h6>
            <p className={styles['description']}>{description}</p>
          </div>
          {expendable && children&&<ExpandButton isOpen={open} />}
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
