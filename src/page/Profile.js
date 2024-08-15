import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../App";
import { useSelector } from "react-redux";
import { getProfile, updateUser } from "../redux/feature/authSlice";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import Loading from "../component/Loading";
import Image from "../component/Image";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";

const Profile = () => {
  const { dispatch, user } = useContext(GlobalContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const { profile, loading } = useSelector((state) => ({ ...state.auth }));

  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const isMyProfile = url.pathname === "/my-profile";

  useEffect(() => {
    if (id === user?.result?._id) {
      navigate("/my-profile");
    }
    if (!id) {
      dispatch(getProfile(user?.result?._id));
    } else {
      dispatch(getProfile(id));
    }
  }, [id]);

  const initialFormState = {
    email: user?.result?.email,
    password: "",
    passwordConfirm: "",
    firstName: user?.result?.firstName,
    lastName: user?.result?.lastName,
    userImage: user?.result?.userImage,
  };

  const [formValue, setFormValue] = useState(initialFormState);
  const { userImage, firstName, lastName, email, password, passwordConfirm } =
    formValue;

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const [isEdit, setEdit] = useState(false);
  const [isChangeAvatar, setChangeAvatar] = useState(false);

  const handleEdit = () => setEdit(!isEdit);

  const handleChangeAvatar = (e) => {
    e.preventDefault();
    setChangeAvatar(!isChangeAvatar);
  };

  const handleCancelEdit = (e) => {
    e.preventDefault();
    setEdit(false);
    setChangeAvatar(false);
    setFormValue(initialFormState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let userData = {};
    if (userImage !== profile?.userImage) {
      userData = { ...userData, userImage };
    }
    if (firstName !== profile?.firstName) {
      userData = { ...userData, firstName };
    }
    if (lastName !== profile?.lastName) {
      userData = { ...userData, lastName };
    }
    if (email !== profile?.email) {
      userData = { ...userData, email };
    }
    if (password) {
      if (password !== passwordConfirm) {
        return toast.error("Password and confirm password should match");
      } else {
        userData = { ...userData, password };
      }
    }
    dispatch(updateUser({ id: user?.result?._id, userData }));
    setEdit(false);
  };

  return (
    <MDBCard
      alignment="center"
      style={{
        margin: "auto auto 10px auto",
        maxWidth: "800px",
        marginTop: "75px",
        minHeight: "calc(100vh - 85px)",
      }}
    >
      {loading ? (
        <Loading />
      ) : (
        <MDBCardBody
          style={{
            display: "flex",
            gap: "25px",
            flexWrap: "wrap",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Image
              src={userImage || "/img/defaultUserImage.jpg"}
              alt={`${profile?.firstName} ${profile?.lastName}`}
              style={{
                height: "200px",
                width: "200px",
                borderRadius: "10px",
              }}
            />
            <div style={{ marginTop: "25px" }}>
              {isMyProfile && !isEdit && (
                <MDBBtn
                  style={{
                    textTransform: "none",
                  }}
                  onClick={handleEdit}
                >
                  <MDBIcon far icon="edit" size="sm" />
                  &nbsp;Edit profile
                </MDBBtn>
              )}
              {isEdit && !isChangeAvatar && (
                <MDBBtn
                  style={{
                    textTransform: "none",
                  }}
                  onClick={handleChangeAvatar}
                >
                  <MDBIcon far icon="edit" size="sm" />
                  &nbsp;Change avatar
                </MDBBtn>
              )}
            </div>
          </div>
          <div style={{ textAlign: "start", minWidth: "310px" }}>
            <div>
              <span>First name:</span>{" "}
              {!isEdit ? (
                <p>
                  <b>{profile?.firstName}</b>
                </p>
              ) : (
                <MDBInput
                  label="First name"
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={onInputChange}
                  style={{ marginBottom: "6px" }}
                />
              )}
            </div>
            <div>
              <span>Last name:</span>{" "}
              {!isEdit ? (
                <p>
                  <b>{profile?.lastName}</b>
                </p>
              ) : (
                <MDBInput
                  label="Last name"
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={onInputChange}
                  style={{ marginBottom: "6px" }}
                />
              )}
            </div>
            <div>
              <span>Email: </span>
              {!isEdit ? (
                <p>
                  <a href={`mailto:${profile?.email}`}>
                    <b>{profile?.email}</b>
                  </a>
                </p>
              ) : (
                <MDBInput
                  label="Email"
                  type="text"
                  name="email"
                  value={email}
                  onChange={onInputChange}
                  style={{ marginBottom: "6px" }}
                />
              )}
            </div>
            {!isEdit && (
              <div>
                <span>
                  <b>Adverts:</b>{" "}
                </span>
                <p style={{ maxWidth: "300px" }}>
                  {profile?.adverts.length === 0
                    ? "Haven't created any adverts"
                    : profile?.adverts.map((advert, index) => (
                        <span>
                          <Link key={advert._id} to={`/advert/${advert._id}`}>
                            {advert.title}
                          </Link>
                          {index !== profile?.adverts.length - 1 && ", "}{" "}
                        </span>
                      ))}
                </p>
              </div>
            )}
            {isEdit && isChangeAvatar && (
              <div style={{ marginTop: "10px" }}>
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) => {
                    setChangeAvatar(false);
                    setFormValue({ ...formValue, userImage: base64 });
                  }}
                />
              </div>
            )}
            {isEdit && (
              <div>
                <MDBBtn
                  style={{
                    textTransform: "none",
                    marginTop: "25px",
                    marginRight: "25px",
                  }}
                  onClick={handleSubmit}
                >
                  <MDBIcon far icon="save" size="sm" />
                  &nbsp;Save
                </MDBBtn>
                <MDBBtn
                  style={{
                    textTransform: "none",
                    marginTop: "25px",
                  }}
                  color="danger"
                  onClick={handleCancelEdit}
                >
                  <MDBIcon fas icon="undo" size="sm" />
                  &nbsp;Cancel
                </MDBBtn>
              </div>
            )}
          </div>
        </MDBCardBody>
      )}
    </MDBCard>
  );
};

export default Profile;
