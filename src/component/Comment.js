import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { getDate } from "../util/getDate";
import { MDBBtn, MDBIcon, MDBInput } from "mdb-react-ui-kit";
import { GlobalContext } from "../App";
import {
  createComment,
  deleteComment,
  editComment,
} from "../redux/feature/commentSlice";
import Reply from "../component/Reply";
import Image from "../component/Image";

const Comment = ({
  _id,
  name,
  creatorId,
  userImage,
  text,
  date,
  replys,
  parentId,
}) => {
  const { dispatch, user } = useContext(GlobalContext);
  const userId = user?.result?._id;
  const [editText, setEditText] = useState(text);
  const [isEdit, setEdit] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleEdit = () => setEdit(!isEdit);
  const handleIsReply = () => setIsReply(!isReply);
  const handleOpen = () => setIsOpen(!isOpen);

  const handleDeleteComment = () => {
    if (window.confirm("Are you shure you want to delete ?")) {
      dispatch(deleteComment({ id: _id }));
    }
  };

  const onEditChange = (e) => {
    setEditText(e.target.value);
  };

  const onReplyChange = (e) => {
    setReplyText(e.target.value);
  };

  const handleEditComment = (e) => {
    e.preventDefault();
    const comment = {
      text: editText,
    };
    dispatch(editComment({ id: _id, comment }));
    setEdit(false);
  };

  const handleReply = (e) => {
    e.preventDefault();
    if (replyText) {
      const reply = {
        advertId: parentId,
        commentId: _id,
        creatorId: userId,
        name: `${user?.result?.firstName} ${user?.result?.lastName}`,
        userImage: user?.result?.userImage,
        text: replyText,
      };
      dispatch(createComment({ comment: reply }));
      setReplyText("");
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

        {isEdit ? (
          <form
            onSubmit={handleEditComment}
            style={{ width: "100%", margin: "6px 0 10px 0" }}
          >
            <MDBInput
              label="Edit comment"
              name="text"
              value={editText}
              required
              onChange={onEditChange}
              maxLength={255}
              onBlur={(_) => {
                setEditText(text);
                setEdit(false);
              }}
              autoFocus
            />
          </form>
        ) : (
          <div style={{ textAlign: "left", marginTop: "10px" }}>
            <p style={{ wordBreak: "break-all" }}>{text}</p>
          </div>
        )}
        <div style={{ display: "flex", marginTop: "-10px", width: "100%" }}>
          {replys.length === 0 && (
            <MDBBtn
              style={{
                background: "none",
                boxShadow: "none",
                padding: "3px",
                color: `${isEdit ? "#000" : "#bbb"}`,
                textTransform: "none",
              }}
              disabled
            >
              No replys yet
            </MDBBtn>
          )}
          {replys.length > 1 && (
            <MDBBtn
              style={{
                background: "none",
                boxShadow: "none",
                padding: "3px",
                color: `${isOpen ? "#000" : "#bbb"}`,
                textTransform: "none",
              }}
              onClick={handleOpen}
            >
              {isOpen ? "Close" : "Open"} {replys.length} replys
            </MDBBtn>
          )}
          {replys.length === 1 && (
            <MDBBtn
              style={{
                background: "none",
                boxShadow: "none",
                padding: "3px",
                color: `${isOpen ? "#000" : "#bbb"}`,
                textTransform: "none",
              }}
              onClick={handleOpen}
            >
              {isOpen ? "Close" : "Open"} 1 replys
            </MDBBtn>
          )}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {userId && (
            <MDBBtn
              style={{
                background: "none",
                boxShadow: "none",
                padding: "3px",
                color: `${isReply ? "#000" : "#bbb"}`,
                textTransform: "none",
              }}
              onClick={handleIsReply}
            >
              <MDBIcon fas icon="reply" size="sm" />
              &nbsp;Reply
            </MDBBtn>
          )}
          {userId === creatorId && (
            <>
              &nbsp;
              <MDBBtn
                style={{
                  background: "none",
                  boxShadow: "none",
                  padding: "3px",
                  color: `${isEdit ? "#000" : "#bbb"}`,
                  textTransform: "none",
                }}
                onClick={handleEdit}
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
                onClick={handleDeleteComment}
              >
                <MDBIcon far icon="trash-alt" size="sm" />
                &nbsp;Delete
              </MDBBtn>
            </>
          )}
        </div>
        <div style={{ maxWidth: "100%" }}>
          {isReply && (
            <div
              style={{
                display: "flex",
                padding: "5px",
                width: "100%",
              }}
            >
              <Image
                src={user.result.userImage || "img/defaultUserImage.jpg"}
                alt={`${user?.result?.firstName} ${user?.result?.lastName}`}
                style={{
                  height: "50px",
                  width: "50px",
                  borderRadius: "25px",
                  marginRight: "15px",
                }}
              />
              <form onSubmit={handleReply} style={{ width: "100%" }}>
                <MDBInput
                  label="Reply"
                  name="text"
                  value={replyText}
                  required
                  onChange={onReplyChange}
                  maxLength={300}
                />
              </form>
            </div>
          )}
          {isOpen &&
            replys.map((reply) => (
              <Reply key={reply._id} {...reply} userId={userId} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Comment;
