import React, {useState} from 'react';
// import "bootstrap-icons/font/bootstrap-icons.css";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Link } from 'react-router-dom';
import styles from './Back2TopButton.module.scss'
import {windowScroll} from '../../../utils/eventHandling'

function BackToTopButton() {

    const [visible, setVisible] = useState(false)
    const toggleVisible = () => {
        setVisible(windowScroll())
    };
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
            /* you can also use 'auto' behaviour in place of 'smooth' */
        });
    };

    window.addEventListener('scroll', toggleVisible);
    const styleClass = `${styles['back-to-top']} active`;
    return (
        <>
            {visible &&
                (<Link to="/#introduction" className={styleClass}>
                    {/* <i className={"bi bi-arrow-up-short"}></i> */}
                    <KeyboardArrowUpIcon onClick={scrollToTop} />
                </Link>)                
            }
        </>
    )
}


export default BackToTopButton;