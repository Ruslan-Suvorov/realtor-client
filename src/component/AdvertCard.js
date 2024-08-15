import React from "react";
import { Link } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardGroup,
  MDBCardFooter,
} from "mdb-react-ui-kit";
import { getDate } from "../util/getDate";
import { excerpt } from "../util/excerpt";
import Tag from "../component/Tag";
import Likes from "../component/Likes";
import Image from "../component/Image";

const AdvertCard = ({
  _id,
  imageFile,
  title,
  description,
  price,
  tags,
  creatorId,
  creatorFirstName,
  creatorLastName,
  createdAt,
  likes,
  userId,
}) => {
  return (
    <MDBCardGroup>
      <MDBCard className="h-85 m-2 d-sm-flex" style={{ maxWidth: "20rem" }}>
        <Link to={`/advert/${_id}`}>
          <Image
            src={imageFile}
            alt={title}
            style={{
              maxWidth: "100%",
              height: "180px",
              borderRadius: "10px 10px 0 0",
            }}
          />
        </Link>
        <MDBCardBody>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <MDBCardTitle className="text-start">{title}</MDBCardTitle>

            <Likes likes={likes} userId={userId} id={_id} />
          </div>
          <div className="text-start">
            <span>Price: {price} $</span>
          </div>
          <div className="text-start">
            {tags.map((tag, index) => (
              <Tag key={index} tag={tag} />
            ))}
          </div>

          <MDBCardText className="text-start">
            {excerpt(description)}
            <Link to={`/advert/${_id}`}> Read More</Link>
          </MDBCardText>
        </MDBCardBody>
        <MDBCardFooter>
          <div className="text-end">
            <Link to={`/profile/${creatorId}`}>
              {creatorFirstName} {creatorLastName}
            </Link>
          </div>
          <div className="text-end" style={{ color: "#aaa" }}>
            {getDate(createdAt)}
          </div>
        </MDBCardFooter>
      </MDBCard>
    </MDBCardGroup>
  );
};

export default AdvertCard;
