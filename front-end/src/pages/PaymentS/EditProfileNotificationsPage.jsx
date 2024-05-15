import "./editprofilenotifcationspage.css";
import PaymentPageSideBar from "../../components/payment/PaymentPageSideBar";
import EditProfileNotifications from "../../components/payment/EditProfileNotifications";

const EditProfileNotificationsPage = () => {
  return (
    <div className="payment-page-content">
      <PaymentPageSideBar />
      <div className="the-actual-content1">
        <EditProfileNotifications />
      </div>
    </div>
  );
};

export default EditProfileNotificationsPage;
