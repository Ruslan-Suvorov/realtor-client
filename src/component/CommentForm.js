import { MDBInput } from "mdb-react-ui-kit";
import React, { useContext, useState } from "react";
import { GlobalContext } from "../App";
import { createComment } from "../redux/feature/commentSlice";
import Image from "../component/Image";

const CommentForm = ({ advertId }) => {
  const { dispatch, user } = useContext(GlobalContext);
  const [text, setText] = useState("");

  const handleComment = (e) => {
    e.preventDefault();
    if (text) {
      const comment = {
        advertId,
        creatorId: user?.result?._id,
        name: `${user?.result?.firstName} ${user?.result?.lastName}`,
        userImage: user?.result?.userImage,
        text: text,
      };
      dispatch(createComment({ comment }));
      setText("");
    }
  };

  const onChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        padding: "5px",
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
      <form onSubmit={handleComment} style={{ width: "100%" }}>
        <MDBInput
          label="Comment"
          name="text"
          value={text}
          required
          onChange={onChange}
          maxLength={255}
        />
      </form>
    </div>
  );
};

export default CommentForm;
