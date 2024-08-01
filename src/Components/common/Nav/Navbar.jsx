import React from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../ClickableLogo';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import { smoothScrollTo, smoothScrollToHomePageTop, onLoadById } from '../../../utils/scrollingOperations';
// import { useNavigate } from 'react-router';
// import { ReactTypeformEmbed } from 'react-typeform-embed';

import { Avatar, Button } from '@material-ui/core';
import Stack from 'react-bootstrap/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import SendIcon from '@mui/icons-material/Send';
import './Navbar.css';
import LoginButton from '../LoginButton';

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const NavBar = () => {
  return (
    <Container fluid='true' id="header" className={`header align-items-center fixed-top `}>
      {/* <Logo/> */}
      <Navbar expand="lg" className="bg-body-tertiary" id='nav-bar'>       
        <Logo/> 
        {/* <Container> */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#about-section">About</Nav.Link>              
              <Nav.Link href="#link">Features</Nav.Link>
              <Nav.Link href="#">Team123</Nav.Link>
              <Nav.Link href="#link">Contact</Nav.Link>
              <Stack direction="horizontal" gap={2} id='btn-stack'>
                <Link to="/login">
                  <LoginButton />
                </Link>
                <Link to='/guest'>
                  <Button variant="contained" endIcon={<SendIcon />}>
                    Guest
                  </Button>
                </Link>
              </Stack>
            </Nav>
          </Navbar.Collapse>
        {/* </Container> */}
      </Navbar>
    </Container>


  );
};

export default NavBar;
