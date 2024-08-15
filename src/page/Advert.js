import React, { useEffect, useContext } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBIcon,
} from "mdb-react-ui-kit";

import { GlobalContext } from "../App";
import { useSelector } from "react-redux";
import { getAdvert, setTag } from "../redux/feature/advertSlice";
import { getComments } from "../redux/feature/commentSlice";
import { useParams, Link } from "react-router-dom";
import { getDate } from "../util/getDate";
import Loading from "../component/Loading";
import Tag from "../component/Tag";
//import Likes from "../component/Likes";
import CommentForm from "../component/CommentForm";
import Comment from "../component/Comment";
import Image from "../component/Image";

const Advert = () => {
  const { dispatch, user } = useContext(GlobalContext);
  const { loading, advert } = useSelector((state) => ({ ...state.advert }));
  const { comments } = useSelector((state) => ({ ...state.comment }));

  const { id } = useParams();
  useEffect(() => {
    dispatch(getAdvert(id));
    dispatch(getComments(id));
  }, [id, dispatch]);

  return (
    <MDBCard
      alignment="center"
      style={{
        margin: "auto auto 10px auto",
        maxWidth: "800px",
        alignContent: "center",
        marginTop: "75px",
        minHeight: "calc(100vh - 85px)",
      }}
    >
      {loading ? (
        <Loading />
      ) : (
        <>
          <Image
            src={advert?.imageFile}
            alt={advert?.title}
            style={{
              maxWidth: "100%",
              maxHeight: "450px",
              borderRadius: "10px 10px 0 0",
            }}
          />
          <MDBCardBody>
            <MDBCardTitle>{advert?.title}</MDBCardTitle>
            <div className="text-start">
              <b>Price:</b> {advert?.price} $
            </div>
            <div className="text-start">
              <b>Tags: </b>
              {advert?.tags.map((tag, index) => (
                <Tag key={index} tag={tag} setTag={setTag} />
              ))}
            </div>
            <div className="row">
              <div className="text-start col-6">
                <p style={{ fontWeight: "500", fontSize: "20px" }}>
                  Created by{" "}
                  <Link to={`/profile/${advert?.creatorId}`}>
                    {advert?.creatorFirstName} {advert?.creatorLastName}
                  </Link>
                </p>
              </div>
              <div className="text-end col-6" style={{ color: "#aaa" }}>
                <time dateTime={advert?.createdAt}>
                  {getDate(advert?.createdAt)}
                </time>
                <MDBIcon
                  far
                  size="lg"
                  icon="calendar-alt"
                  style={{ marginLeft: "10px" }}
                />
              </div>
            </div>
            <MDBCardText className="text-start m-2">
              {advert?.description}
            </MDBCardText>
            {/* <Likes
              likes={advert?.likes}
              userId={userId}
              dispatch={dispatch}
              id={advert?._id}
            /> */}
            <MDBCardText className="text-start m-2">
              <b>Likes: </b>
              {advert?.likes.length === 0
                ? "No one likes yet"
                : `${advert?.likes.map((like) => ` ${like.name}`)}`}
            </MDBCardText>
            <div>
              <div
                style={{
                  borderBottom: "1px solid #bbb",
                  textAlign: "left",
                  padding: "0 5px",
                }}
              >
                {comments?.length === 0 && (
                  <span>
                    <b>No comments yet</b>
                  </span>
                )}
                {comments?.length > 1 && (
                  <span>
                    <b>{comments?.length} comments</b>
                  </span>
                )}
                {comments?.length === 1 && (
                  <span>
                    <b>1 comment</b>
                  </span>
                )}
              </div>
              {user?.result ? (
                <CommentForm advertId={advert?._id} />
              ) : (
                <div
                  style={{
                    borderBottom: "1px solid #bbb",
                    textAlign: "left",
                    padding: "0 5px",
                  }}
                >
                  <span>
                    <b>Please log in for comment</b>
                  </span>
                </div>
              )}
              {comments?.map((comment) => (
                <Comment key={comment._id} {...comment} parentId={id} />
              ))}
            </div>
          </MDBCardBody>
        </>
      )}
    </MDBCard>
  );
};

export default Advert;
