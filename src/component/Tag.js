import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../App";
import { setTag } from "../redux/feature/advertSlice";

const Tag = ({ tag }) => {
  const { dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();
  return (
    <span
      onClick={() => {
        dispatch(setTag(tag));
        navigate(`/?tag=${tag}`);
      }}
      className="text-start"
      style={{
        backgroundColor: "#aaa",
        borderRadius: "15px",
        padding: "2px 7px",
        marginRight: "5px",
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
    >
      #{tag}
    </span>
  );
};

export default Tag;
