import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
  MDBValidationItem,
  MDBTextArea,
  MDBCardImage,
} from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import { createAdvert, updateAdvert } from "../redux/feature/advertSlice";
import { GlobalContext } from "../App";

const initialState = {
  title: "",
  description: "",
  price: 0,
  tags: [],
};

const AdvertForm = () => {
  const { id } = useParams();
  const { dispatch, user } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [advertData, setAdvertData] = useState(initialState);
  const { title, description, price, tags, imageFile } = advertData;

  const { loading, error, userAdverts } = useSelector((state) => ({
    ...state.advert,
  }));

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  useEffect(() => {
    if (id) {
      const advert = userAdverts.find((advert) => advert._id === id);
      setAdvertData(advert);
    }
  }, [id]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setAdvertData({ ...advertData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description && tags) {
      const updatedAdvertData = {
        ...advertData,
        creatorId: user?.result?._id,
        creatorFirstName: user?.result?.firstName,
        creatorLastName: user?.result?.lastName,
      };

      if (id) {
        dispatch(updateAdvert({ id, updatedAdvertData, toast, navigate }));
      } else {
        dispatch(
          createAdvert({ advertData: updatedAdvertData, navigate, toast })
        );
      }
      handleClear();
    }
  };
  const handleClear = () => {
    setAdvertData(initialState);
  };

  const handleImageClear = (e) => {
    e.preventDefault();
    setAdvertData({ ...advertData, imageFile: "" });
  };

  const handleAddTag = (tag) => {
    setAdvertData({
      ...advertData,
      tags: [...advertData.tags, tag],
    });
  };
  const handleDeleteTag = (tag) => {
    setAdvertData({
      ...advertData,
      tags: advertData.tags.filter((item) => item !== tag),
    });
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
        style={{ maxWidth: "850px", paddingTop: "25px" }}
      >
        <MDBIcon fas icon="clipboard" className="fa-2x" />
        <h2>Advert Card</h2>
        <MDBCardBody>
          <MDBValidation noValidate className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-12">
              <MDBValidationItem invalid feedback="Please provide title">
                <MDBInput
                  label="Title"
                  type="text"
                  name="title"
                  value={title}
                  onChange={onInputChange}
                  required
                />
              </MDBValidationItem>
            </div>
            <div className="col-md-12">
              <MDBValidationItem invalid feedback="Please provide description">
                <MDBTextArea
                  label="Description"
                  type="text"
                  name="description"
                  value={description}
                  onChange={onInputChange}
                  required
                  rows={4}
                />
              </MDBValidationItem>
            </div>
            <div className="col-md-12">
              <MDBValidationItem invalid feedback="Please provide title">
                <MDBInput
                  label="Price"
                  type="number"
                  name="price"
                  value={price}
                  onChange={onInputChange}
                  required
                />
              </MDBValidationItem>
            </div>
            <div className="col-md-12">
              <ChipInput
                name="Tags"
                variant="outlined"
                placeholder="Tags"
                fullWidth
                value={tags}
                onAdd={(tag) => handleAddTag(tag)}
                onDelete={(tag) => handleDeleteTag(tag)}
              />
            </div>
            <div style={{ display: "flex" }}>
              {id && imageFile ? (
                <div style={{ position: "relative" }}>
                  <MDBCardImage
                    src={imageFile}
                    style={{ height: "60px", borderRadius: "4px" }}
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
                    setAdvertData({ ...advertData, imageFile: base64 });
                  }}
                />
              )}
            </div>
            <div className="col-12">
              <MDBBtn className="m-2">
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                {id ? "Update" : "Create"}
              </MDBBtn>
              <MDBBtn className="m-2" color="danger" onClick={handleClear}>
                Clear
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default AdvertForm;
