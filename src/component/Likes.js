import React, { useContext } from "react";
import { MDBBtn, MDBIcon, MDBTooltip } from "mdb-react-ui-kit";
import { likeAdvert } from "../redux/feature/advertSlice";
import { GlobalContext } from "../App";
import { toast } from "react-toastify";

const Likes = ({ likes, id, userId }) => {
  const { dispatch, user } = useContext(GlobalContext);
  let firstLike = "";

  if (likes.length !== 0) {
    firstLike = likes[0].name;
  }

  const handleClick = () => {
    if (!user?.result) {
      toast.error("Please log in for like");
    } else {
      dispatch(likeAdvert({ id }));
    }
  };

  if (likes.find((like) => like.id === userId)) {
    return (
      <MDBBtn
        style={{
          background: "none",
          boxShadow: "none",
          padding: "0",
          color: "#3B71CA",
          marginTop: "5px",
          marginRight: "-10px",
          textTransform: "none",
          whiteSpace: "nowrap",
        }}
        tag="a"
        onClick={handleClick}
      >
        {likes.length >= 2 ? (
          <MDBTooltip tag="p" title={`You and ${likes.length - 1} other likes`}>
            <MDBIcon fas icon="thumbs-up" />
            &nbsp;{likes.length} Likes
          </MDBTooltip>
        ) : (
          <MDBTooltip tag="p" title={`You like this advert`}>
            <MDBIcon fas icon="thumbs-up" />
            &nbsp;{likes.length || ""} Like
          </MDBTooltip>
        )}
      </MDBBtn>
    );
  } else {
    return (
      <MDBBtn
        style={{
          background: "none",
          boxShadow: "none",
          padding: "0",
          color: "#3B71CA",
          marginTop: "5px",
          marginRight: "-10px",
          textTransform: "none",
          whiteSpace: "nowrap",
        }}
        tag="a"
        onClick={handleClick}
      >
        {likes.length >= 2 ? (
          <MDBTooltip
            tag="p"
            title={`${firstLike} and ${likes?.length - 1} other likes`}
          >
            <MDBIcon far icon="thumbs-up" />
            &nbsp;{likes.length} Likes
          </MDBTooltip>
        ) : (
          <MDBTooltip
            tag="p"
            title={
              likes.length !== 0
                ? `${firstLike} like this advert`
                : "No one likes yet"
            }
          >
            <MDBIcon far icon="thumbs-up" />
            &nbsp;{likes.length || ""} Like
          </MDBTooltip>
        )}
      </MDBBtn>
    );
  }
};

export default Likes;
