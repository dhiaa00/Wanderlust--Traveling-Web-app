import React from 'react'
import "./titlebutton.css"
const TitleButton = ({title,buttontext}) => {
  return (
    <div className='title-button-container'>
        <h2>{title='Billing History'}</h2>
        <button className='beautiful-button'>{buttontext="Download All"}</button>
    </div>
  )
}

export default TitleButton