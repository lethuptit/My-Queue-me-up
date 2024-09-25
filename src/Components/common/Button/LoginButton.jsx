import React, { useState, useEffect } from 'react';
// import styles from './LoginButton.module.scss';
import { useNavigate } from 'react-router-dom';
import { auth, signOut } from '../../../FirebaseConfig';
import { Avatar, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)({
  border: '1px solid  #4a3768',
  color:'#4a3768',
  borderColor: '#4a3768',
  '&:hover': {
    border: '2px solid  #4a3768',
    backgroundColor: 'white',
    borderColor: '#4a3768',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

const LoginButton = (props) => {
  const [open, setOpen] = useState(false);

  const anchorRef = React.useRef(null);
  const navigate = useNavigate();
  const user = props.user;
 
  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // setUser(null);
      setOpen(false);
      localStorage.removeItem('hostId')
      navigate('/');
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };


  const handleClose = (event) => {
    if (event && anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  const handleMenuItemClick = (callback) => {
    setOpen(false); // Close the menu first
    setTimeout(() => {
      if (callback) {
        callback(); // Perform navigation or any other action
      }
    }, 150); // Delay to allow the menu to close properly before navigation
  };
  // Function to get the username part of the email
  const getUsername = (email) => {
    return email.split('@')[0];
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  if (user) {
    const username = getUsername(user.email);
    return (
      <Stack direction="row" spacing={2}>
        <div>
          <StyledButton
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleToggle} // Only toggles the menu
            sx={{ border: 'none'}}
          >
            <Avatar alt={username} 
              // src={user.photoURL}
              src='/images/avatar-unisex.png' 
              sx={{ width: 24, height: 24 }}
              // onClick={handleToggle} // Only toggles the menu
              // ref={anchorRef}
              >
              {username[0].toUpperCase()}
            </Avatar>
            &nbsp;&nbsp;{username}
          </StyledButton>
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
                      {/* No navigation on button click, only when menu item is selected */}
                      <MenuItem onClick={() => handleMenuItemClick(() => navigate('/dashboard'))}>
                        Dashboard
                      </MenuItem>
                      <MenuItem onClick={() => handleMenuItemClick(handleLogout)}>
                        Logout
                      </MenuItem>
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
    <StyledButton color="primary" onClick={handleLogin} variant="outlined">
      <Avatar alt="user" sx={{ width: 20, height: 20 }}>
        <AccountCircleIcon />
      </Avatar>
      &nbsp;&nbsp;Host
    </StyledButton>
  );
};

export default LoginButton;
