import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { fetchSinglePin } from "../../store/pin";
import "./EditPin.css";

const EditPin = () => {
  const { pinId } = useParams();
  const dispatch = useDispatch();
  const pin = useSelector((state) => state.pins.singlePin);

  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [destinationLink, setDestinationLink] = useState("");
  const [altText, setAltText] = useState("");

  useEffect(() => {
    dispatch(fetchSinglePin(pinId));
  }, []);

  return (
    <>
      <div className="edit-page-main-container">
        <div className="left-container-image-edit-page">
          <div className="edit-image-container">
            <img src={pin.image} />
          </div>
        </div>
        <div className="right-container-edit-details-container">
          <div className="edit-header-icons-container">
            <div className="edit-header-icons">
              <div>
                <i class="fa-solid fa-ellipsis"></i>
              </div>
              <div className="single-pin-header-save-button">
                <button>Save</button>
              </div>
            </div>
          </div>
          <div className="edit-title-container">
            <input
              placeholder="Edit your title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
            <label>Edit title...</label>
          </div>
          <div className="edit-about-container">
            <input
              placeholder="Edit pin description"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            ></input>
            <label>Edit description...</label>
          </div>
          <div className="edit-about-container">
            <input
              placeholder="Edit destination link"
              value={destinationLink}
              onChange={(e) => setDestinationLink(e.target.value)}
            ></input>
            <label>Edit destination...</label>
          </div>
          <div className="edit-about-container">
            <input
              placeholder="Edit alt text"
              value={altText}
              onChange={setAltText(e.target.value)}
            ></input>
            <label>Edit alt text...</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPin;
