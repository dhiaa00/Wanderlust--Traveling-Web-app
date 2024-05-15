import React from 'react'
import './contactemail.css'
import NotificationsElement from '../NotificationsElement'
const ContactEmails = ({title,firsttitle,firstdetails,firsticon,secondtitle,seconddetails,secondicon}) => {
  return (
    <div className="contactemails-container">
        <h2>{title}</h2>
        <div className="contact-email-info">
            <NotificationsElement srcicon={firsticon} title={firsttitle} details={firstdetails} srcbutton={"/src/SVGs/EditProfileActualPaymentPage/Group 33842.svg"}/>
            <NotificationsElement srcicon={secondicon} title={secondtitle} details={seconddetails} srcbutton={"/src/SVGs/EditProfileActualPaymentPage/Group 33842.svg"}/>
        </div>
    </div>
  )
}

export default ContactEmails