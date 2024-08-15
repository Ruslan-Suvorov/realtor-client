import React from "react";

const Image = ({ src, style = {}, className = "", alt = "" }) => {
  return (
    // variant 1
    <img
      src={src}
      style={{ ...style, objectFit: "cover" }}
      className={className}
      alt={alt}
    />

    // variant 2
    // <div
    //   style={{
    //     ...style,
    //     backgroundImage: `url(${src})`,
    //     backgroundSize: "cover",
    //     backgroundPosition: "center",
    //     display: "inline-block",
    //   }}
    //   className={className}
    // ></div>

    // variant 3 - bed for vertical image
    // <div
    //   style={{
    //     ...style,
    //     overflow: "hidden",
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     position: "relative",
    //   }}
    //   className={className}
    // >
    //   <img
    //     src={src}
    //     alt={alt}
    //     style={{
    //       maxHeight: "100%",
    //       minWidth: "auto",
    //       minHeight: "auto",
    //       position: "absolute",
    //       top: "50%",
    //       left: "50%",
    //       marginRight: "-50%",
    //       transform: "translate(-50%, -50%)",
    //     }}
    //   />
    // </div>
  );
};

export default Image;
