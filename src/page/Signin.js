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
import { googleSignIn, signin } from "../redux/feature/authSlice";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { GlobalContext } from "../App";

const initialState = {
  email: "",
  password: "",
};

const Signin = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { email, password } = formValue;

  const { dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => ({ ...state.auth }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(signin({ formValue, navigate, toast }));
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const googleSuccess = (response) => {
    const responseCredential = jwtDecode(response.credential);
    const email = responseCredential.email;
    const firstName = responseCredential.given_name;
    const lastName = responseCredential.family_name || "";
    const userImage = responseCredential.picture;
    const googleId = responseCredential.sub;
    const result = {
      email,
      firstName,
      lastName,
      googleId,
      userImage,
    };

    dispatch(googleSignIn({ result, navigate, toast }));
  };

  const googleError = (error) => {
    toast.error(error);
  };

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

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
        <h2>Sign In</h2>
        <MDBCardBody>
          <MDBValidation noValidate className="row g-3" onSubmit={handleSubmit}>
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
              <MDBBtn className="mt-2">
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Login
              </MDBBtn>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <GoogleLogin onSuccess={googleSuccess} onError={googleError} />
            </div>
          </MDBValidation>
        </MDBCardBody>

        <MDBCardFooter>
          <span>
            Don`t have an account? <Link to="/signup">Sign Up →</Link>
          </span>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Signin;
