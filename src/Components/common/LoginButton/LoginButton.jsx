import React, { useState } from 'react';
import { Avatar, Button } from '@material-ui/core';
// import { useAuth0 } from '@auth0/auth0-react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import styles from './LoginButton.module.scss';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';

// Docs: https://auth0.com/docs/quickstart/spa/react
const LoginButton = (props) => {
  // const { user, isAuthenticated, logout, loginWithRedirect } = useAuth0();
  const [isAuthenticated, setIsAuthticated] = useState(false)
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleClick =()=>{

  }
  
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  //ThuLe
  if (isAuthenticated) {
    // return (
    //   <Button
    //     color="primary"
    //     // onClick={() => logout({ returnTo: window.location.origin })}
    //     variant="outlined"
    //   >
    //     {/* <Avatar id={styles.avatar} alt={user.name} src={user.picture} /> */}
    //     &nbsp;&nbsp;Logout
    //   </Button>
    // );

    return (
      <Stack direction="row" spacing={2}>
        <Paper>
          <MenuList>
            <MenuItem>Profile</MenuItem>
            <MenuItem>My account</MenuItem>
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Paper>
        <div>
          <Button
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            Dashboard
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem onClick={handleClose}>My account</MenuItem>
                      <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </Stack>
    );
  }
  return (
    <Button color="primary" onClick={handleClick} variant="outlined">
      <Avatar id={styles.avatar} alt="user">
        {' '}
        <AccountCircleIcon />
      </Avatar>
      &nbsp;&nbsp;Host
    </Button>
  );
};




export default LoginButton;
