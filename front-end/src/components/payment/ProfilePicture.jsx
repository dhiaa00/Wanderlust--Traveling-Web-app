import React from 'react'

const ProfilePicture = () => {
  return (
    <div className="profile-picture-container">
            <img src="/src/SVGs/PaymentPage/EditProfile/Ellipse 20.svg" alt="" className="profile-picture" />
            <div className="upload-picutre-profile">
                <button className="upload-new-photo"><p className="upload-new-photo-text">Upload New Photo</p></button>
            <div className="instruction-text-container">
                <p className="recommended-size">At least 800x800px recommended.</p>
                <p className="recommended-size">JPG or PNJ are allowed.</p>
            </div>
        </div>
    </div>
  )
}

export default ProfilePicture