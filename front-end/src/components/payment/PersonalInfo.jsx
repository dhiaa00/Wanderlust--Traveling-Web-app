import React from 'react'

const PersonalInfo = () => {
  return (
    <div className="personal-info">
        <div className="information-container">
            <div className="information-title">
                    <h2 className="personal-info-title-text">Personal Info</h2>
                <button className='edit-button'>
                    <img src="/Src/SVGs/PaymentPage/EditProfile/Layer 2.svg" alt="" className="edit-button-svg" />Edit
                </button>
            </div>
            <div className="informations-container-the-actualinfo">
                <div className="information-title-info-container">
                    <p className="info-single-title">Full Name</p>
                    <p className="the-infomation-itself">Freedom</p>
                </div>
                <div className="information-title-info-container">
                    <p className="info-single-title">Full Name</p>
                    <p className="the-infomation-itself">Freedom</p>
                </div>
                <div className="information-title-info-container">
                    <p className="info-single-title">Full Name</p>
                    <p className="the-infomation-itself">Freedom</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PersonalInfo