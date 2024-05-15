import React from 'react'
import "/src/components/payment/editprofilenotifications.css"
import NotificationsElement from './smallcomponents/NotificationsElement'
import './smallcomponents/notificationselement.css'
const EditProfileNotifications = () => {
  return (
    <div className='editprofile-notifications'>
        <h1>Notifications</h1>
        <div className="notifications-container-everything">
            <div className="the-notification-you-recieve-container-everything">
                <div className="notifications-you-recieve-container">
                    <div className="notification-you-recieve">
                            <h2 className="you-recieve">The Notifications You Receive</h2>
                        <button className='edit-button'>
                            <img src="/Src/SVGs/PaymentPage/EditProfile/Layer 2.svg" alt="" className="edit-button-svg" />Edit
                        </button>
                    </div>
                </div>
                <div className="different-notifications-container">
                    <NotificationsElement title='Commentaries' details='SMS' srcicon={"/src/SVGs/EditProfileNotifcationsSVGS/message-text.svg"} srcbutton={"/src/SVGs/EditProfileNotifcationsSVGS/Vector 48.svg"}/>
                    <NotificationsElement title={'Identifcations'} details={'Push,Email,SMS'} srcicon={"/src/SVGs/EditProfileNotifcationsSVGS/tag-2.svg"} srcbutton={"/src/SVGs/EditProfileNotifcationsSVGS/Vector 48.svg"}/>
                    <NotificationsElement title={"Reminders"} details={'Push,Email,SMS'} srcicon={"/src/SVGs/EditProfileNotifcationsSVGS/repeat-circle.svg"} srcbutton={"/src/SVGs/EditProfileNotifcationsSVGS/Vector 48.svg"}/>
                    <NotificationsElement title={"Page you manage"} details={'Push,Email,SMS'} srcicon={"/src/SVGs/EditProfileNotifcationsSVGS/stickynote.svg"} srcbutton={"/src/SVGs/EditProfileNotifcationsSVGS/Vector 48.svg"}/>
                    <NotificationsElement title={'Other notifications'} details={'Push,Email,SMS'} srcicon={"/src/SVGs/EditProfileNotifcationsSVGS/notification-bing.svg"} srcbutton={"/src/SVGs/EditProfileNotifcationsSVGS/Vector 48.svg"}/>
                </div>
            </div>
            <div className="where-you-recieve-notifications">
                    <div className="notification-you-recieve">
                        <h2 className="you-recieve">Where Do You Recieve Notifications</h2>
                        <button className='edit-button'>
                            <img src="/Src/SVGs/PaymentPage/EditProfile/Layer 2.svg" alt="" className="edit-button-svg" />Edit
                        </button>
                    </div>
                    <div className="different-notifications-container">
                        <NotificationsElement title={"Navigateur"} srcicon={"/src/SVGs/EditProfileNotifcationsSVGS/message-text.svg"} srcbutton={"/src/SVGs/EditProfileNotifcationsSVGS/Vector 48.svg"}/>
                        <NotificationsElement title={"E-mail"} details={'Enabled,suggest'} srcicon={"/src/SVGs/EditProfileNotifcationsSVGS/tag-2.svg"} srcbutton={"/src/SVGs/EditProfileNotifcationsSVGS/Vector 48.svg"}/>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default EditProfileNotifications