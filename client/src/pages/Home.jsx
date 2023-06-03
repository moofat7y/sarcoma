import React from "react";
import Uploader from "../components/home/Uploader";

const Home = () => {
  return (
    <div className="vh-100">
      <div className="container">
        <div className="vh-100 w-100 d-flex align-items-center justify-content-center">
          <Uploader />
        </div>
      </div>
    </div>
  );
};

export default Home;
