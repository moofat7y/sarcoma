import React, { useState } from "react";
import { RxUpload } from "react-icons/rx";
import axios from "axios";
import { FaBrain } from "react-icons/fa";
const Uploader = () => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const handleImage = (e) => {
    if (e.target.files) {
      setImage(e.target.files);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!image?.length > 0) {
      setError("Please chosse an image to detect.");
      return;
    }
    setError(null);
    setResponse(null);

    const formData = new FormData();
    formData.append("file", image[0]);
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:8000/predict",
        formData
      );
      setIsLoading(false);
      setResponse(response.data);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <div className="uploader">
      <form onSubmit={(e) => onSubmit(e)}>
        <div
          style={{ width: "240px", height: "240px" }}
          className="image-field d-flex align-items-center justify-content-center border border-1 position-relative"
        >
          <label
            htmlFor="upload"
            className="position-absolute top-0 left-0 w-100 h-100"
          ></label>
          {!image ? (
            <p className="position-absolute top-50 start-50 translate-middle fw-semibold text-secondary">
              Upload Image
            </p>
          ) : null}
          <input
            onChange={(e) => handleImage(e)}
            type="file"
            id="upload"
            className="d-none"
          />
          {image ? <FaBrain className="fs-1 text-secondary" /> : null}
        </div>
        {response ? (
          <div className="text-center">
            <p className="mb-1">
              <span className="text-secondary">Diagnose :</span>{" "}
              {response.Diagnose}
            </p>
            <p>
              <span className="text-secondary">Confidence :</span>{" "}
              {response.Confidence + "%"}
            </p>
          </div>
        ) : null}
        <div className="buttons d-flex justify-content-evenly mt-3">
          <button
            disabled={isLoading}
            type="submit"
            className="btn btn-secondary px-4 text-white"
          >
            Detect
          </button>
          <label htmlFor="upload" className="btn btn-outline-secondary px-3">
            <RxUpload />
          </label>
        </div>
        {error ? <p className="text-danger">{error}</p> : null}
      </form>
    </div>
  );
};

export default Uploader;
