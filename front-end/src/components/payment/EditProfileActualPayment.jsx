import React from "react";
import "./editprofileactualpayment.css";
import ContactEmails from "./smallcomponents/Paymentprofilecomponent/ContactEmails";
import BilingHistory from "./smallcomponents/Paymentprofilecomponent/BilingHistory";

const EditProfileActualPayment = () => {
  return (
    <div className="editprofileactualpayment">
      <div>
        <h1>Payment</h1>
        <p className="writingstuff">Update your biling details and address</p>
      </div>
      <div className="everything-container">
        <div className="first-half-bro">
          <div className="contact-E-mail-container">
            <ContactEmails
              title={"Contact E-mail"}
              firsttitle={"Send to my account email"}
              firstdetails={"Linktoback@dhia.dz"}
              secondtitle={"Send to an alternative email"}
              seconddetails={"Aw dar haja hna mqewda"}
            />
          </div>
          <div className="card-details-container">
            <ContactEmails
              title={"Card details"}
              firsttitle={"Visa chkoupi"}
              firstdetails={"Up to 50 users and 100GB team"}
              secondtitle={"MasterCard ****1178"}
              seconddetails={"Up to 50 users and 100GB team"}
            />
          </div>
        </div>
        <div className="second-half">
          <BilingHistory />
        </div>
      </div>
    </div>
  );
};

export default EditProfileActualPayment;
