import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import agency from "../../images/signUpAgency.svg";
import InputField from "../../components/Sign/InputField";
import MainButton from "../../components/buttons/MainButton";
import "./signupagency.css";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignUpAgency = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    agencyName: Yup.string().required("Agency Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    location: Yup.string().required("Location is required"),
    registrationNumber: Yup.string().required(
      "Registration Number is required"
    ),
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
        `${backendUrl}/auth/agency/register`,
        data,
        {
          withCredentials: true,
        }
      );

      toast.success(response.data.message);
      navigate(`/signup/confirmation/agency/${response.data.confirmationId}`, {
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
      <div className="sign-up-agency">
        <div className="section-info">
          <h1>Create Account</h1>
          <Formik
            initialValues={{
              agencyName: "",
              email: "",
              phoneNumber: "",
              location: "",
              registrationNumber: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <div className="left-part">
                  <div>
                    <Field
                      name="agencyName"
                      as={InputField}
                      title="Agency Name"
                    />
                    <ErrorMessage
                      name="agencyName"
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
                      name="phoneNumber"
                      as={InputField}
                      title="Phone Number"
                    />
                    <ErrorMessage
                      name="phoneNumber"
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
                </div>
                <div className="left-part">
                  <div>
                    <Field
                      name="registrationNumber"
                      as={InputField}
                      title="Agency Registration Number"
                    />
                    <ErrorMessage
                      name="registrationNumber"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <div>
                    <Field name="location" as={InputField} title="Location" />
                    <ErrorMessage
                      name="location"
                      component="div"
                      className="error-message"
                    />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <img src={agency} alt="agency" />
      </div>
    </>
  );
};

export default SignUpAgency;
