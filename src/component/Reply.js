import { MDBBtn, MDBIcon, MDBInput } from "mdb-react-ui-kit";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { getDate } from "../util/getDate";
import { deleteReply, editComment } from "../redux/feature/commentSlice";
import { GlobalContext } from "../App";
import Image from "../component/Image";

const Reply = ({
  _id,
  name,
  commentId,
  creatorId,
  userImage,
  text,
  date,
  userId,
}) => {
  const { dispatch } = useContext(GlobalContext);
  const [editReplyText, setEditReplyText] = useState(text);
  const [isReplyEdit, setReplyEdit] = useState(false);

  const onEditReplyChange = (e) => {
    setEditReplyText(e.target.value);
  };

  const handleReplyEdit = () => setReplyEdit(!isReplyEdit);

  const handleEditReply = (e) => {
    e.preventDefault();
    const comment = {
      commentId,
      text: editReplyText,
    };
    dispatch(editComment({ id: _id, comment }));
    setReplyEdit(false);
  };

  const handleDeleteReply = () => {
    if (window.confirm("Are you shure you want to delete ?")) {
      dispatch(deleteReply({ id: _id, commentId: { id: commentId } }));
    }
  };
  return (
    <div
      style={{
        display: "flex",
        borderTop: "1px solid #bbb",
        padding: "5px",
        width: "100%",
      }}
    >
      <Image
        src={userImage || "img/defaultUserImage.jpg"}
        alt={name}
        style={{
          height: "50px",
          width: "50px",
          borderRadius: "25px",
          marginRight: "15px",
        }}
      />
      <div style={{ width: "100%" }}>
        <div style={{ display: "flex", marginTop: "-5px" }}>
          <Link to={`/profile/${creatorId}`}>{name}</Link>{" "}
          <MDBIcon
            far
            size="sm"
            icon="calendar-alt"
            style={{ margin: "12px 5px 0 15px" }}
          />
          <time dateTime={date}>{getDate(date)}</time>
        </div>

        {isReplyEdit ? (
          <form
            onSubmit={handleEditReply}
            style={{ width: "100%", margin: "6px 0 10px 0" }}
          >
            <MDBInput
              label="Edit reply"
              name="text"
              value={editReplyText}
              required
              onChange={onEditReplyChange}
              maxLength={300}
              onBlur={(_) => {
                setEditReplyText(text);
                setReplyEdit(false);
              }}
              autoFocus
            />
          </form>
        ) : (
          <div style={{ textAlign: "left", marginTop: "10px" }}>
            <p style={{ wordBreak: "break-all" }}>{text}</p>
          </div>
        )}
        <div style={{ display: "flex", marginTop: "-10px" }}>
          {userId === creatorId && (
            <>
              <MDBBtn
                style={{
                  background: "none",
                  boxShadow: "none",
                  padding: "3px",
                  color: `${isReplyEdit ? "#000" : "#bbb"}`,
                  textTransform: "none",
                }}
                onClick={handleReplyEdit}
              >
                <MDBIcon far icon="edit" size="sm" />
                &nbsp;Edit
              </MDBBtn>
              &nbsp;
              <MDBBtn
                style={{
                  background: "none",
                  boxShadow: "none",
                  padding: "3px",
                  color: "#bbb",
                  textTransform: "none",
                }}
                onClick={() => handleDeleteReply(_id)}
              >
                <MDBIcon far icon="trash-alt" size="sm" />
                &nbsp;Delete
              </MDBBtn>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reply;
