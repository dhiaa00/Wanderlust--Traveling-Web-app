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
              firstdetails={"Linktoback@test.dz"}
              secondtitle={"Send to an alternative email"}
              seconddetails={"Linktoback@test.dz"}
            />
          </div>
          <div className="card-details-container">
            <ContactEmails
              title={"Card details"}
              firsttitle={"Visa chkoupi"}
              firstdetails={"MasterCard ****1178"}
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
