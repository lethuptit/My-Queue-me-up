import React, { useState } from 'react';
import { Avatar, Button } from '@material-ui/core';
// import { useAuth0 } from '@auth0/auth0-react';
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import styles from './LoginButton.module.scss';

// Docs: https://auth0.com/docs/quickstart/spa/react
const LoginButton = (props) => {
  // const { user, isAuthenticated, logout, loginWithRedirect } = useAuth0();
  const [isAuthenticated, setIsAuthticated] = useState(false)

  const handleClick= ()=>{
    return;
  }
  //ThuLe
  // if (isAuthenticated) {
  //   return (
  //     <Button
  //       color="primary"
  //       onClick={() => logout({ returnTo: window.location.origin })}
  //       variant="outlined"
  //     >
  //       {/* <Avatar id={styles.avatar} alt={user.name} src={user.picture} /> */}
  //       &nbsp;&nbsp;Logout
  //     </Button>
  //   );
  // }
  return (
    <Button color="primary" onClick={handleClick} variant="outlined">
      <Avatar id={styles.avatar} alt="user">
        {' '}
        {/* <AccountCircleIcon /> */}
      </Avatar>
      &nbsp;&nbsp;Host
    </Button>
  );
};

export default LoginButton;
