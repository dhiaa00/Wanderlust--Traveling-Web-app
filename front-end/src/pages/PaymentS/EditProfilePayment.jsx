import "./editprofilepayment.css";
import PaymentPageSideBar from "../../components/payment/PaymentPageSideBar";
import EditProfileActualPayment from "../../components/payment/EditProfileActualPayment";
const EditProfilePayment = () => {
  return (
    <div className="payment-page-content">
      <PaymentPageSideBar />
      <div className="the-actual-content-payment">
        <EditProfileActualPayment />
      </div>
    </div>
  );
};

export default EditProfilePayment;
