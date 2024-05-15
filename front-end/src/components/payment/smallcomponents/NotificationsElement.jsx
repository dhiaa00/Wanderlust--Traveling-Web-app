import React from 'react'
import "./notificationselement.css"

const NotificationsElement = ({title,details,srcicon,srcbutton}) => {
  return (
    <div className="notification-element">
                    <div className="the-first-half">
                        <img src={srcicon} alt="" className='the-thingy-SVG'/>
                        <div className="notification-element-content">
                            <h3>{title}</h3>
                            <p>{details}</p>
                        </div>
                    </div>
                    <button className="this-button-that-i-dontknow">
                        <img src={srcbutton} alt="" />
                    </button>
    </div>
  )
}

export default NotificationsElement