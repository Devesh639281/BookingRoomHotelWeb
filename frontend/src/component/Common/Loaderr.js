import React, { useState } from "react";
import HashLoader from "react-spinners/HashLoader";
const Loaderr = () => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  //   const override = `
  //       display: "block",
  //       margin: "0 auto",
  //       borderColor: "red",`;
  return (
    <>
      <div className="smartLoading">
        <HashLoader
          color="blue"
          loading={loading}
          size={100}
          css=""
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </>
  );
};

export default Loaderr;
