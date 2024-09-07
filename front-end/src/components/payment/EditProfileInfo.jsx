import React, { useState } from "react";
import "/src/components/payment/editprofileinfo.css";
import axios from "axios";
import toast from "react-hot-toast";

const EditProfileInfo = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const cloud_name = import.meta.env.VITE_CLOUD_NAME;
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  // handle editing personal info
  const [editPersonalInfo, setEditPersonalInfo] = useState(false);
  const [username, setUsername] = useState(
    user.agencyName ? user.agencyName : user.username
  );
  const handleEditPersonalInfo = () => {
    setEditPersonalInfo(!editPersonalInfo);
  };
  const handleSavePersonalInfo = async () => {
    try {
      const result = user.agencyName
        ? await axios.put(
            `${backendUrl}/agency/update/username/${user._id}`,
            {
              agencyName: username,
            },
            {
              withCredentials: true,
            }
          )
        : await axios.put(
            `${backendUrl}/user/update/username/${user._id}`,
            {
              username: username,
            },
            {
              withCredentials: true,
            }
          );
      console.log(result.data);
      // update user info in local storage
      localStorage.setItem("user", JSON.stringify(result.data.data));
      setEditPersonalInfo(!editPersonalInfo);
      toast.success(result.data.message);
      location.reload();
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  // handle update profile photo
  const handleUpdateProfilePhoto = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "e_travelling");
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/upload`,
        formData
      );
      console.log(response.data.secure_url);
      const result = user.agencyName
        ? await axios.put(
            `${backendUrl}/agency/update/profilePhoto/${user._id}`,
            {
              profilePhoto: response.data.secure_url,
            },
            {
              withCredentials: true,
            }
          )
        : await axios.put(
            `${backendUrl}/user/update/profilePhoto/${user._id}`,
            {
              profilePhoto: response.data.secure_url,
            },
            {
              withCredentials: true,
            }
          );
      // update user info in local storage
      localStorage.setItem("user", JSON.stringify(result.data.data));
      toast.success(result.data.message);
      location.reload();
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  // handle update location
  const [agencyLocation, setAgencyLocation] = useState(user.location);

  const handleUpdateLocation = async () => {
    if (loading) return; // Prevent multiple requests if already loading
    setLoading(true);
    try {
      const result = await axios.put(
        `${backendUrl}/agency/update/location/${user._id}`,
        {
          location: agencyLocation,
        },
        {
          withCredentials: true,
        }
      );
      console.log(result.data);
      // update user info in local storage
      localStorage.setItem("user", JSON.stringify(result.data.data));
      toast.success(result.data.message);
    } catch (error) {
      toast.error(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // handle update bio
  const [editBio, setEditBio] = useState(false);
  const handleEditBio = () => {
    setEditBio(!editBio);
  };
  const [bio, setBio] = useState(user.bio);
  const handleSaveBio = async () => {
    try {
      const result = await axios.put(
        `${backendUrl}/agency/update/bio/${user._id}`,
        {
          bio: bio,
        },
        {
          withCredentials: true,
        }
      );
      console.log(result.data);
      // update user info in local storage
      localStorage.setItem("user", JSON.stringify(result.data.data));
      toast.success(result.data.message);
      setEditBio(!editBio);
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  return (
    <div className="edit-profile-payment-page">
      <h1>Edit Profile</h1>
      <div className="editing-profile-changing-stuff">
        <div className="profile-picture-container">
          <img
            src={user.profilePhoto || user.agencyPhoto}
            alt="profile picture"
            className="profile-picture"
          />
          <div className="upload-picutre-profile">
            <input
              type="file"
              accept="image/*"
              className="upload-new-photo"
              onChange={handleUpdateProfilePhoto}
              placeholder="Upload New Photo"
            />
            <div className="instruction-text-container">
              <p className="recommended-size">
                At least 800x800px recommended.
              </p>
            </div>
          </div>
        </div>
        <div className="personal-info">
          <div className="information-container1">
            <div className="information-title">
              <h2 className="personal-info-title-text">Personal Info</h2>
              {editPersonalInfo ? (
                <button
                  className="edit-button"
                  onClick={handleSavePersonalInfo}>
                  <img
                    src="/Src/SVGs/PaymentPage/EditProfile/Layer 2.svg"
                    alt=""
                    className="edit-button-svg"
                  />
                  Save
                </button>
              ) : (
                <button
                  className="edit-button"
                  onClick={handleEditPersonalInfo}>
                  <img
                    src="/Src/SVGs/PaymentPage/EditProfile/Layer 2.svg"
                    alt=""
                    className="edit-button-svg"
                  />
                  Edit
                </button>
              )}
            </div>
            <div className="informations-container-the-actualinfo">
              <div className="information-title-info-container">
                <p className="info-single-title">Full Name</p>
                {editPersonalInfo ? (
                  <input
                    type="text"
                    className="the-infomation-itself"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}></input>
                ) : (
                  <p className="the-infomation-itself">
                    {user.agencyName ? user.agencyName : user.username}
                  </p>
                )}
              </div>
              <div className="information-title-info-container">
                <p className="info-single-title">Email</p>
                {editPersonalInfo ? (
                  <input
                    type="text"
                    className="the-infomation-itself"
                    disabled
                    placeholder={user.email}></input>
                ) : (
                  <p className="the-infomation-itself">{user.email}</p>
                )}
              </div>
              <div className="information-title-info-container">
                <p className="info-single-title">Phone</p>
                {editPersonalInfo ? (
                  <input
                    type="text"
                    className="the-infomation-itself"
                    placeholder={user.phoneNumber}></input>
                ) : (
                  <p className="the-infomation-itself">{user.phoneNumber}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        {user.agencyName && (
          <>
            <div className="location">
              <h2 className="location-title">Agency Location</h2>
              <div className="text-save-button">
                <div className="focus-outline">
                  <input
                    type="text"
                    className="location-input"
                    value={agencyLocation}
                    onChange={(e) => setAgencyLocation(e.target.value)}
                    placeholder={`Actually: ${agencyLocation}`}></input>
                </div>
                <button
                  className={`savechange-button ${
                    agencyLocation != user.location
                      ? "savechange-button-active"
                      : ""
                  }`}
                  onClick={
                    agencyLocation != user.location
                      ? handleUpdateLocation
                      : null
                  }>
                  Save changes
                </button>
              </div>
            </div>
            <div className="bio">
              <div className="information-title">
                <h2 className="personal-info-title-text">Personal Info</h2>
                {editBio ? (
                  <button className="edit-button" onClick={handleSaveBio}>
                    <img
                      src="/Src/SVGs/PaymentPage/EditProfile/Layer 2.svg"
                      alt=""
                      className="edit-button-svg"
                    />
                    Save
                  </button>
                ) : (
                  <button className="edit-button" onClick={handleEditBio}>
                    <img
                      src="/Src/SVGs/PaymentPage/EditProfile/Layer 2.svg"
                      alt=""
                      className="edit-button-svg"
                    />
                    Edit
                  </button>
                )}
              </div>
              {editBio ? (
                <div className="bio-editing">
                  <textarea
                    className="bio-textarea"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}></textarea>
                </div>
              ) : (
                <div className="bio-text">
                  <p>{bio}</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EditProfileInfo;
