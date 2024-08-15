import { MDBSpinner } from "mdb-react-ui-kit";
import React from "react";

const Loading = () => {
  return (
    <MDBSpinner
      role="status"
      tag="span"
      className="me-2 text-primary"
      style={{
        height: "10vw",
        width: "10vw",
        margin: "auto auto auto calc(50% - 5vw)",
        borderWidth: "10px",
        opacity: "0.8",
      }}
    >
      <span className="visually-hidden">Loading ...</span>
    </MDBSpinner>
  );
};

export default Loading;
