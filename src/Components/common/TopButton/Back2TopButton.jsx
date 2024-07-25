import "bootstrap-icons/font/bootstrap-icons.css";
import './Back2TopButton.css'


function BackToTopButton({ visible }) {
    return (
        <>
        {visible  &&
        (<a href="#" className={"back-to-top active d-flex align-items-center justify-content-center"}><i className={"bi bi-arrow-up-short"}></i></a>)}
        </>
    )
}

export default BackToTopButton;