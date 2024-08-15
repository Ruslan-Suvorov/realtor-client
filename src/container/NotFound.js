import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto ",
        marginTop: "60px",
        textAlign: "start",
        backgroundColor: "#F5F5F5",
        height: "calc(100vh - 60px)",
      }}
    >
      <img src="/img/http-404.png" style={{ maxHeight: "400px" }} />
      <div style={{ maxWidth: "350px", marginLeft: "50px" }}>
        <h1 style={{ maxWidth: "300px", fontSize: "50px" }}>
          OOPS! PAGE NOT FOUND.
        </h1>
        <p>
          You must have picked the wrong door because I haven't been able to lay
          my eye on the page you've been searching for.
        </p>
        <Link
          to="/"
          style={{
            backgroundColor: "#598EFF",
            borderRadius: "25px",
            padding: "10px 30px",
            color: "#fff",
          }}
        >
          BACK TO HOME
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
