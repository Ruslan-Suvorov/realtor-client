import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Redirect = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    count === 0 && navigate("/");
    return () => clearInterval(interval);
  }, [count, navigate]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        margin: "auto",
      }}
    >
      <h2>Redirecting on home-page in {count} sec ...</h2>
    </div>
  );
};

export default Redirect;
