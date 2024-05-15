import React from "react";
import "/src/components/payment/editprofileinfo.css";
const EditProfileInfo = () => {
  return (
    <div className="edit-profile-payment-page">
      <h1>Edit Profile</h1>
      <div className="editing-profile-changing-stuff">
        <div className="profile-picture-container">
          <img
            src="/src/SVGs/PaymentPage/EditProfile/Ellipse 20.svg"
            alt=""
            className="profile-picture"
          />
          <div className="upload-picutre-profile">
            <button className="upload-new-photo">
              <p className="upload-new-photo-text">Upload New Photo</p>
            </button>
            <div className="instruction-text-container">
              <p className="recommended-size">
                At least 800x800px recommended.
              </p>
              <p className="recommended-size">JPG or PNJ are allowed.</p>
            </div>
          </div>
        </div>
        <div className="personal-info">
          <div className="information-container1">
            <div className="information-title">
              <h2 className="personal-info-title-text">Personal Info</h2>
              <button className="edit-button">
                <img
                  src="/Src/SVGs/PaymentPage/EditProfile/Layer 2.svg"
                  alt=""
                  className="edit-button-svg"
                />
                Edit
              </button>
            </div>
            <div className="informations-container-the-actualinfo">
              <div className="information-title-info-container">
                <p className="info-single-title">Full Name</p>
                <p className="the-infomation-itself">Freedom</p>
              </div>
              <div className="information-title-info-container">
                <p className="info-single-title">Email</p>
                <p className="the-infomation-itself">Freedom</p>
              </div>
              <div className="information-title-info-container">
                <p className="info-single-title">Phone</p>
                <p className="the-infomation-itself">Freedom</p>
              </div>
            </div>
          </div>
        </div>
        <div className="location">
          <h2 className="location-title">Location</h2>
          <div className="text-save-button">
            <div className="focus-outline">
              <input type="text" className="location-input"></input>
            </div>
            <button className="savechange-button">Save changes</button>
          </div>
        </div>
        <div className="bio">
          <div className="information-title">
            <h2 className="personal-info-title-text">Personal Info</h2>
            <button className="edit-button">
              <img
                src="/Src/SVGs/PaymentPage/EditProfile/Layer 2.svg"
                alt=""
                className="edit-button-svg"
              />
              Edit
            </button>
          </div>
          <p className="bio-text">
            🌍 Welcome to Freedom Travel Agency, where every journey embodies
            the spirit of liberation and exploration. At Freedom, we're
            dedicated to crafting unforgettable travel experiences that break
            boundaries and ignite a sense of adventure. ✈️ Whether it's
            uncovering hidden gems off the beaten path or indulging in luxurious
            escapes, our expert team is committed to turning your travel dreams
            into reality. Join us in discovering the world with boundless
            freedom and endless possibilities. 🌟
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditProfileInfo;
