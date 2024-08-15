import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import { getDate } from "../util/getDate";
import { excerpt } from "../util/excerpt";
import { deleteAdvert } from "../redux/feature/advertSlice";
import { toast } from "react-toastify";
import { GlobalContext } from "../App";
import Image from "../component/Image";

const DashboardCard = ({
  _id,
  imageFile,
  title,
  description,
  price,
  createdAt,
}) => {
  const { dispatch } = useContext(GlobalContext);
  const handleDelete = (id) => {
    if (window.confirm("Are you shure you want to delete ?")) {
      dispatch(deleteAdvert({ id, toast }));
    }
  };

  return (
    <MDBCard
      style={{
        display: "flex",
        flexDirection: "row",
        margin: "20px",
      }}
    >
      <Image
        src={imageFile}
        alt={title}
        style={{
          width: "300px",
          height: "175px",
          borderRadius: "10px 0 0 10px",
        }}
      />
      <MDBCardBody style={{ margin: "-15px 0" }}>
        <MDBCardTitle className="text-start">{title}</MDBCardTitle>
        <div className="text-start col-6" style={{ color: "#aaa" }}>
          <MDBIcon
            far
            size="lg"
            icon="calendar-alt"
            style={{ marginRight: "10px" }}
          />
          <time dateTime={createdAt}>{getDate(createdAt)}</time>
        </div>
        <div className="row">
          <span className="text-start col-6">Price: {price} $</span>
        </div>

        <MDBCardText className="text-start">{excerpt(description)}</MDBCardText>

        <div className="text-start">
          <Link to={`/advert/${_id}`}> Read More</Link>
        </div>
      </MDBCardBody>
      <div
        style={{
          alignSelf: "flex-end",
          margin: "auto 0",
          gap: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MDBBtn
          style={{
            border: "none",
            color: "none",
            background: "none",
            boxShadow: "none",
            marginRight: "6px",
          }}
        >
          <MDBIcon
            fas
            icon="trash"
            size="lg"
            style={{ color: "#dd4b39" }}
            onClick={() => handleDelete(_id)}
          />
        </MDBBtn>
        <Link to={`/edit-advert/${_id}`}>
          <MDBIcon fas icon="edit" size="lg" style={{ color: "#55acee" }} />
          <MDBIcon />
        </Link>
      </div>
    </MDBCard>
  );
};

export default DashboardCard;
