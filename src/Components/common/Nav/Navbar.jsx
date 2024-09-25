import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Nav.module.scss';
import {LoginButton} from '../Button';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { auth } from '../../../FirebaseConfig';

function NavMenu() {

    const [user, setUser] = useState(null)
    const [hostId, setHostId] = useState(localStorage.getItem('hostId'))

    const getActiveItemClass = (value) => {
        // if (value === selectedValue) {
        //     return styles['active'];
        // }
        return '';
    };

    const handleClick = (e) => {
        //setSelectedValue(e.target.tetx);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                try {
                    setHostId(user.email);
                    setUser(user);
                    localStorage.setItem('hostId', user.email)
                } catch (error) {
                    console.error("Error getting user email", error);
                }
            } else {
                setHostId(null);
                setUser(null);
                localStorage.removeItem('hostId')
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <Navbar collapseOnSelect expand="lg" className={styles["navmenu"]}>
            <Container>
                <Navbar.Brand href="/" >
                    <div className={styles["logo"]}>
                        <img src="/images/main-logo.png" alt="Queue Logo" />
                        <h6 >Queue Me Up</h6>
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className={'ms-5 '}>
                    <Nav className="me-auto justify-content-end flex-grow-1">
                        <Nav.Link href="/#introduction" className={`${styles["navmenu-item"]}`} >Introduction</Nav.Link>                        
                        <Nav.Link href="/#about-team" value="team" className={`${styles["navmenu-item"]}`}>Team</Nav.Link>
                        <Nav.Link href="/#contact"   className={`${styles["navmenu-item"]} `}>Contact</Nav.Link>
                    </Nav>
                    <Nav className={'ps-2 '}>
                        <Stack direction="horizontal" gap={3} className={styles['btn-stack']}>
                            {!hostId && < Link to='/join'>
                                <Button className={styles['guest-btn']} variant="contained" endIcon={<SendIcon />}>
                                    Guest
                                </Button>
                            </Link>}
                            <LoginButton user={user} />
                        </Stack>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default NavMenu;