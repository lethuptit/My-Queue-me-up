import styles from './Token.module.scss';
import React, { useState } from 'react';
import { format } from 'date-fns'
import {
  Call as CallIcon,
  HowToRegOutlined,
  ExitToApp as ExitToAppIcon,
  MoreVert as MoreVertIcon,
  NotificationsOff as NotificationsOffIcon,
  Notifications,
  NotificationsActive as NotificationsActiveIcon,
  VisibilityOffTwoTone
} from '@mui/icons-material';

import { Menu, MenuItem, IconButton } from '@mui/material';
import CancelConfirm from '../../../common/Modal'
import { formatTokenNumber } from '../../../../utils/textOperations'

const { cancelGuest, dbQueueWithCurDateRef, moveNoShowUpGuest, updateToken } = require('../../../../api/queue')

const iconSize = 'medium';

const NotifyIcon = ({ tokenStatus, notifyStatus }) => {
  if (tokenStatus === 'waiting-notified') {
    return <NotificationsActiveIcon disabled={true} fontSize={iconSize} className={styles['token-icon-notified']} />;
  }
  return <Notifications fontSize={iconSize} className={styles['token-icon']} />
};


const ActionMenu = ({ token, onCheckIn, onNoShowUp, onCancel , onNotify}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  // const [loading, setLoading] = useState(false)
  const [showConfirmDlg, setShowConfirmDlg] = useState(false);
  const open = Boolean(anchorEl);

  const notifyStatus = false;

  const handle3DotClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNoShowUpGuest = async (t) => {
    try {
      console.log(`Removing no show-up guest number ${t.number}...`)
      const response = await cancelGuest(t.queueId, t.guestId)
      if (response) {
        console.log("\tdone.")
      }
    } catch (error) {
      console.log("\tError by: ", error.message)
    }
  }

  const handleCloseConfirmDlg = () => { setShowConfirmDlg(false) }
  const handleSubmitConfirmDlg = async () => {
    // onNoShowUp(token)
    handleNoShowUpGuest(token)
    handleCloseConfirmDlg();
  }

  const onCheckInClick = async () => {
    await onCheckIn(token)
    handleClose()
  };

  const onNoShowUpClick = async() => {
    await onNoShowUp(token)
    handleClose()
  };

  const onCancelClick = async () => {
    try {
      await onCancel(token)
      handleClose();

    } catch (error) {
      console.log("\tError by: ", error.message)
    }
    finally {
      handleClose();
    }
  };

  const onCallClick = () => {
    handleClose()
    window.open(`tel:+${token.phone}`, '_self');
  };

  const onNotifyClick = async () => {
    try {
      await onNotify(token)
      handleClose();
    }
    catch (error) {
      console.log("Error in sending notification: ", error.message)
    }
    finally{
      handleClose()

    }
  };

  const confirmText = "This guest will be removed from the queue. Are you sure you want to continue?"
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handle3DotClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
        <MenuItem onClick={onCallClick} >
          <CallIcon className={styles['token-icon']} fontSize={iconSize} />
          &nbsp;Call
        </MenuItem>
        <MenuItem onClick={onNotifyClick} >
          {/* <NotifyButton tokenStatus={token.status} notifyStatus={notifyStatus} /> */}
          <NotifyIcon tokenStatus={token.status} notifyStatus={notifyStatus} />
          &nbsp;Notify
        </MenuItem>
        <MenuItem onClick={onCheckInClick} >
          < HowToRegOutlined className={styles['token-icon']} fontSize={iconSize} />
          &nbsp;Check In
        </MenuItem>
        <MenuItem onClick={onNoShowUpClick} >
          < VisibilityOffTwoTone className={styles['token-icon']} fontSize={iconSize} />
          &nbsp;No Show-up
        </MenuItem>

        <MenuItem onClick={onCancelClick} >
          < ExitToAppIcon className={styles['token-icon']} fontSize={iconSize} />
          &nbsp;Cancel
        </MenuItem>

      </Menu>

      {/* Show confirm if needed */}
      {showConfirmDlg && <CancelConfirm show={showConfirmDlg} onClose={handleCloseConfirmDlg} text={confirmText} onSubmit={handleSubmitConfirmDlg} />}
    </div>
  );
}

function Token({ token, onNoShowUp, onCheckIn, onCancel, onNotify }) {
  return (
    <>
      <section className={styles.token}>
        <div className={`${styles['token-position']}`}>
          <p>{token.position}</p>
        </div>
        <div className={styles['token-number']}>
          <p>{formatTokenNumber(token.number)}</p>
        </div>
        <div className={styles['token-details']}>
          <div className={styles['token-name-time']}>
            <p>{format(token.startedTime, 'yyyy-MM-dd HH:mm:ss')}</p>
            {/* <p>{formatTokenNumber(token.number)}</p> */}
            <p>{token.name}</p>
          </div>
          <div className={styles['token-operations']}>
            <div className={styles['token-icon-set']}>
              <ActionMenu token={token} onNoShowUp={onNoShowUp} onCheckIn={onCheckIn} onCancel={onCancel} onNotify={onNotify} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Token;
