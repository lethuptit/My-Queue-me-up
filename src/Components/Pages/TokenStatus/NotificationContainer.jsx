import React from 'react';
// import { useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Switch from '@material-ui/core/Switch';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Checkbox from '../../common/Checkbox/Checkbox';
import { setNotificationPreference } from '../../../services/notification';
import styles from './status.module.scss';

export default () => {
  //const notificationPermission = useSelector((state) => state.appReducer.notificationPermission);
  const notificationPermission='granted';
  return (
    <div className={styles['notification-container']}>
       <Form.Check // prettier-ignore
        type="switch"
        id="custom-switch"
        label="Enable notification"
        checked={notificationPermission === 'granted'}
        classes={{ thumb: 'switch-thumb' }}
        onChange={(event) => setNotificationPreference(event.target.checked)}
      />

        <Checkbox
          type="switch"
          // name="saveToLocalStorage"
          label="Enable notification"
          checked={notificationPermission === 'granted'}
          onChange={(event) => setNotificationPreference(event.target.checked)}
        />
      {/* <Switch
        checked={notificationPermission === 'granted'}
        classes={{ thumb: 'switch-thumb' }}
        onChange={(event) => setNotificationPreference(event.target.checked)}
        size="small"
      /> */}
      {/* <span>Enable notification</span> */}
      {/* <InfoOutlinedIcon classes={{ root: 'info-icon' }} /> */}
    </div>
  );
};
