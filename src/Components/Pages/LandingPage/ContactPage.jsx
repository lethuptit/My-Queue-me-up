import React, { useState } from "react";
import './Contact.scss'
import { Button } from '@mui/material';
import { sendEmail } from '../../../api/notify';
// import { SMTPClient } from 'emailjs';
// import { Container, Row, Col } from "react-bootstrap";
import Toast from '../../common/Toast'

function ContactPage() {
    const [isSent, setIsSent] = useState(false)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendEmail({
                toEmail: "queuemeupteam@gmail.com",
                fromEmail: email,
                fromName: name,
                subject,
                message: message
            })

            
            setName('')
            setEmail('')
            setMessage('')
            setSubject('')
            setIsSent(true)
        }
        catch (err) {
            console.log("Error in seding email: ", err.message)
        }
    }

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handleSubjectChange = (e) => {
        setSubject(e.target.value)
    }

    const handleMessageChange = (e) => {
        setMessage(e.target.value)
    }

    return (
        <section id="contact" className="contact section">
            <div className="container section-title" data-aos="fade-up">
                <h2>Contact</h2>
            </div>
            <div className="container" data-aos="fade">
                <div className="row gy-5 gx-lg-5">
                    <div className="col-lg-4">
                        <div className="info">
                            <h3>Get in touch</h3>
                            <p>Please feel free to contact the development team for any suggestions that help us improve this product.</p>
                            <p>Thank you in advance.</p>
                            <div className="info-item d-flex">
                                <i className="bi bi-envelope flex-shrink-0"></i>
                                <div>
                                    <h4>Email:</h4>
                                    <p>queuemeupteam@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-8">
                        <form onSubmit={handleSubmit} role="form" className="email-form">
                            <div className="row">
                                <div className="col-md-6 form-group">
                                    <input type="text" name="name" className="form-control" id="name" placeholder="Your Name"
                                        value={name}
                                        onChange={handleNameChange}
                                        required />
                                </div>
                                <div className="col-md-6 form-group mt-3 mt-md-0">
                                    <input type="email" className="form-control" name="email" id="email" placeholder="Your Email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        required />
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject"
                                    value={subject}
                                    onChange={handleSubjectChange}
                                    required />
                            </div>
                            <div className="form-group mt-3">
                                <textarea className="form-control" name="message" placeholder="Message"
                                    value={message}
                                    onChange={handleMessageChange}
                                    required></textarea>
                            </div>
                            <div className="my-3">
                                {/* <div className="loading">Loading</div> */}
                                {/* <div className="error-message"></div> */}
                                {isSent && <div><Toast title={'Your message has been sent. Thank you!'} /></div>}
                            </div>

                            <div className="text-center"><Button className={'send-email-btn'} type="submit">Send Message</Button></div>
                        </form>
                    </div>

                </div>

            </div>

        </section>
    );
}

export default ContactPage;