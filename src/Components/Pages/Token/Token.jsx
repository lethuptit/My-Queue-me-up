import styles from './Token.module.scss';
import React, { useState } from 'react';
import {
  Call as CallIcon,
  HowToRegOutlined,
  ExitToApp as ExitToAppIcon,
  MoreVert as MoreVertIcon,
  NotificationsOff as NotificationsOffIcon,
  Notifications,
  NotificationsActive as NotificationsActiveIcon
} from '@mui/icons-material';
import { Menu, MenuItem, IconButton } from '@mui/material';
import moment from 'moment';
// import { useDeleteToken, useNotifyToken } from 'store/asyncActions';

const iconSize = 'medium';

const NotifyButton = ({ tokenStatus, notifiable, notifyStatus }) => {
  const [isNotifyHovering, setIsNotifyHovering] = useState(false);
  const handleMouseHover = () => {
    setIsNotifyHovering(!isNotifyHovering);
  };

  return (
    <IconButton
      disabled={notifiable === false || tokenStatus === 'NOTIFIED' || notifyStatus === 'pending'}
      color="primary"
      aria-label="notify"
      // onClick={onNotifyClick}
      onMouseEnter={handleMouseHover}
      onMouseLeave={handleMouseHover}
    >
      <NotifyIcon tokenStatus={tokenStatus} notifiable={notifiable} notifyStatus={notifyStatus} isNotifyHovering={isNotifyHovering} />
    </IconButton>)
};

const NotifyIcon = ({ tokenStatus, notifiable,notifyStatus,isNotifyHovering }) => {
  if (notifiable === false) {
    return <NotificationsOffIcon fontSize={iconSize} />;
  }
  // TODO: Add some visual (blinking) while notifyToken is pending
  if (notifyStatus === 'pending') {
    return <NotificationsOffIcon fontSize={iconSize} />;
  }
  if (tokenStatus === 'NOTIFIED') {
    return <NotificationsActiveIcon fontSize={iconSize} className={styles['token-icon-notified']} />;
  }
  return isNotifyHovering ? (
    <NotificationsActiveIcon fontSize={iconSize} className={styles['token-icon']} />
  ) : (
    <Notifications fontSize={iconSize} className={styles['token-icon']} />
  );
};

function Token({ token }) {

  const {
    name,
    tokenId,
    tokenNumber,
    contactNumber,
    notifiable,
    tokenCreationTimestamp,
    tokenStatus,
  } = token;

  
  // const dispatch = useDispatch();
  // const deleteToken = useDeleteToken();
  //  const notifyToken = useNotifyToken();

  // const notifyStatus = useSelector((state) => state.actionStatus['notifyToken']);
  const notifyStatus = ''

  // const deleteStatus = useSelector((state) => state.actionStatus['deleteToken']);
  const deleteStatus = '';



  const ActionMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const onCheckInClick = () => {
      // if (deleteStatus !== 'pending') 
      //   dispatch(deleteToken({ tokenId }));
    };

    const onExitClick = () => {
      // if (deleteStatus !== 'pending') 
      //   dispatch(deleteToken({ tokenId }));
    };

    const onCallClick = () => {
      window.open(`tel:+${contactNumber}`, '_self');
    };

    const onNotifyClick = () => {
      //dispatch(notifyToken({ tokenId }));
    };


    return (
      <div>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          // id="long-menu"
          // MenuListProps={{
          //   'aria-labelledby': 'long-button',
          // }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}

        >
          <MenuItem onClick={onCallClick} >
            <CallIcon className={styles['token-icon']} fontSize={iconSize} />
            &nbsp;Call
          </MenuItem>
          <MenuItem onClick={onNotifyClick} >
            <NotifyButton notifiable={notifiable} tokenStatus={tokenStatus} notifyStatus={notifyStatus} />
            Notify
          </MenuItem>
          <MenuItem onClick={onCheckInClick} >
            < HowToRegOutlined className={styles['token-icon']} fontSize={iconSize} />
            &nbsp;Check In
          </MenuItem>
          <MenuItem onClick={onExitClick} disableRipple={false}>
            < ExitToAppIcon className={styles['token-icon']} fontSize={iconSize} />
            &nbsp;No Show up
          </MenuItem>
        </Menu>
      </div>
    );
  }

  return (
    <section className={styles.token}>
      <div className={styles['token-number']}>
        <p>{tokenNumber < 99 ? `00${tokenNumber}` : tokenNumber}</p>
      </div>
      <div className={styles['token-details']}>
        <div className={styles['token-name-time']}>
          <p>{moment(tokenCreationTimestamp).format('hh:mm A')}</p>
          <p>{name}</p>
        </div>
        <div className={styles['token-operations']}>
          <div className={styles['token-icon-set']}>
            <ActionMenu />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Token;
