import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import { signup } from "../redux/feature/authSlice";
import { GlobalContext } from "../App";
import FileBase from "react-file-base64";
import Image from "../component/Image";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

const Signup = () => {
  const { dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => ({ ...state.auth }));

  const [formValue, setFormValue] = useState(initialState);
  const { email, password, passwordConfirm, firstName, lastName, userImage } =
    formValue;

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return toast.error("Password and confirm password should match");
    }
    if (firstName && lastName && email && password && passwordConfirm) {
      dispatch(signup({ formValue, navigate, toast }));
    }
  };

  const handleImageClear = (e) => {
    e.preventDefault();
    setFormValue({ ...formValue, userImage: "" });
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <div
      style={{
        alignContent: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <MDBCard
        alignment="center"
        style={{ maxWidth: "450px", paddingTop: "25px" }}
      >
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h2>Sign Up</h2>
        <MDBCardBody>
          <MDBValidation noValidate className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-12">
              <MDBValidationItem
                invalid
                feedback="Please provide your first name"
              >
                <MDBInput
                  label="First name"
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={onInputChange}
                  required
                />
              </MDBValidationItem>
            </div>
            <div className="col-md-12">
              <MDBValidationItem
                invalid
                feedback="Please provide your last name"
              >
                <MDBInput
                  label="Last name"
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={onInputChange}
                  required
                />
              </MDBValidationItem>
            </div>
            <div className="col-md-12">
              <MDBValidationItem invalid feedback="Please provide your e-mail">
                <MDBInput
                  label="E-mail"
                  type="email"
                  name="email"
                  value={email}
                  onChange={onInputChange}
                  required
                />
              </MDBValidationItem>
            </div>
            <div className="col-md-12">
              <MDBValidationItem
                invalid
                feedback="Please provide your password"
              >
                <MDBInput
                  label="Password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={onInputChange}
                  required
                />
              </MDBValidationItem>
            </div>
            <div className="col-md-12">
              <MDBValidationItem
                invalid
                feedback="Please provide your password again"
              >
                <MDBInput
                  label="Password confirm"
                  type="password"
                  name="passwordConfirm"
                  value={passwordConfirm}
                  onChange={onInputChange}
                  required
                />
              </MDBValidationItem>
            </div>

            <div style={{ display: "flex" }}>
              <p
                style={{
                  whiteSpace: "nowrap",
                }}
              >
                Avatar image:
              </p>
              &nbsp;
              {userImage ? (
                <div
                  style={{
                    position: "relative",
                    height: "100px",
                    width: "100px",
                  }}
                >
                  <Image
                    src={userImage}
                    style={{
                      height: "100px",
                      width: "100px",
                      borderRadius: "4px",
                    }}
                  />
                  <MDBBtn
                    onClick={handleImageClear}
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      color: "#fff",
                      backgroundColor: "#dd4b39",
                      padding: "1px 6px",
                    }}
                  >
                    <MDBIcon fas icon="times" size="sm" />
                  </MDBBtn>
                </div>
              ) : (
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) => {
                    setFormValue({ ...formValue, userImage: base64 });
                  }}
                />
              )}
            </div>
            <div className="col-12">
              <MDBBtn className="mt-2">
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Register
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <span>
            Already have an account? <Link to="/signin">Sign In →</Link>
          </span>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Signup;
