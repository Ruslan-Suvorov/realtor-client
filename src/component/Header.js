import React, { useContext, useState } from "react";
import {
  MDBNavbar,
  MDBNavbarItem,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarLink,
  MDBIcon,
  MDBCollapse,
  MDBContainer,
} from "mdb-react-ui-kit";
import { setSignout } from "../redux/feature/authSlice";
import { GlobalContext } from "../App";
import { jwtDecode } from "jwt-decode";
import { googleLogout } from "@react-oauth/google";
import { Link } from "react-router-dom";
import Image from "../component/Image";

const Header = () => {
  const [showBasic, setShowBasic] = useState(false);
  const { dispatch, user } = useContext(GlobalContext);

  const token = user?.token;

  if (token) {
    const decodedToken = jwtDecode(token);

    if (decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(setSignout());
      if (user?.result.googleId) {
        googleLogout();
      }
    }
  }

  const handleSignout = () => {
    dispatch(setSignout());
    if (user?.result.googleId) {
      googleLogout();
    }
  };
  return (
    <>
      <MDBNavbar fixed="top" expand="lg" style={{ backgroundColor: "#598EFF" }}>
        <MDBContainer style={{ alignContent: "end" }}>
          <MDBNavbarBrand
            href="/"
            style={{
              color: "#fff",
              fontSize: "22px",
              fontWeight: "600",
              marginRight: "20vw",
            }}
          >
            <img
              alt="&#8962;"
              src={"logo512.png"}
              style={{
                height: "50px",
                width: "50px",
                margin: "-10px 10px",
              }}
            />
            ReactRealtor
          </MDBNavbarBrand>
          <MDBNavbarToggler
            type="button"
            aria-expanded="false"
            aria-label="Toggle nav"
            onClick={() => setShowBasic(!showBasic)}
            style={{ color: "#fff" }}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>
          <MDBCollapse navbar open={showBasic}>
            <MDBNavbarNav className="mb-2 mb-lg-0">
              {user?.result?._id && (
                <h5
                  style={{
                    color: "white",
                    margin: "-3px 50px -7px 0",
                  }}
                >
                  <Link
                    to="/my-profile"
                    style={{
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      src={user.result.userImage || "img/defaultUserImage.jpg"}
                      style={{
                        height: "50px",
                        width: "50px",
                        borderRadius: "25px",
                        marginRight: "20px",
                      }}
                    />
                    {user.result.firstName} {user.result.lastName}
                  </Link>
                </h5>
              )}
              {user?.result?._id && (
                <>
                  <MDBNavbarItem>
                    <MDBNavbarLink href="/create-advert">
                      <p className="header-text">Add Advert</p>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink href="/dashboard">
                      <p className="header-text">Dashboard</p>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                </>
              )}
              {user?.result?._id ? (
                <MDBNavbarItem>
                  <MDBNavbarLink href="/" onClick={handleSignout}>
                    <p className="header-text">Sign Out</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              ) : (
                <>
                  <MDBNavbarItem>
                    <MDBNavbarLink href="/signin">
                      <p className="header-text">Sign In</p>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                  <MDBNavbarItem>
                    <MDBNavbarLink
                      href="/signup"
                      style={{
                        border: "solid white 2px",
                        borderRadius: "8px",
                        padding: "-2px",
                      }}
                    >
                      <p className="header-text">Sign Up</p>
                    </MDBNavbarLink>
                  </MDBNavbarItem>
                </>
              )}
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
};

export default Header;
