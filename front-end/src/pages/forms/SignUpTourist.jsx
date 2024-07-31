import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import tourist from "../../images/signUpTourist.svg";
import InputField from "../../components/Sign/InputField";
import MainButton from "../../components/buttons/MainButton";
import GoogleAuth from "../../components/Sign/GoogleAuth";
import "./signuptourist.css";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { GoogleOAuthProvider } from "@react-oauth/google";

const SignUpTourist = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { confirmPassword, ...data } = values;
      const response = await axios.post(
        `${backendUrl}/auth/user/register`,
        data,
        {
          withCredentials: true,
        }
      );

      toast.success(response.data.message);
      navigate(`/signup/confirmation/user/${response.data.confirmationId}`, {
        state: { email: values.email },
      });
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error sending signup data:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="bg-image-container"></div>
      <div className="sign-up-tourist">
        <div className="section-info">
          <h1>Create Account</h1>
          <GoogleOAuthProvider clientId={clientId}>
            <GoogleAuth text="Sign up with Google" clientId={clientId} />
          </GoogleOAuthProvider>

          <div className="or">Or</div>
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <div>
                  <Field name="username" as={InputField} title="Username" />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div>
                  <Field name="email" as={InputField} title="Email Adresse" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div>
                  <Field
                    name="password"
                    type="password"
                    as={InputField}
                    title="Password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div>
                  <Field
                    name="confirmPassword"
                    type="password"
                    as={InputField}
                    title="password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="error-message"
                  />
                </div>
                <MainButton
                  text="Create"
                  onClickFunc={() => {}}
                  type="submit"
                  disabled={isSubmitting}
                />
                <p>
                  Already Have An Account? <Link to="/login">Log in</Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
        <div className="section">
          <img src={tourist} alt="tourist" />
        </div>
      </div>
    </>
  );
};

export default SignUpTourist;
