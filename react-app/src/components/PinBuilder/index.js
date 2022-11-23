import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllPins } from "../../store/pin";
import "./PinBuilder.css";

const PinBuilder = () => {
  return (
    <>
      <div className="main-pin-builder-page">
        <div className="main-pin-builder-container">
          <div className="pin-builder-upper-section-head">
            <div className="triple-dot-buttons">
              <i class="fa-solid fa-ellipsis"></i>
            </div>
            <div className="save-to-board-dropdown-button">
              <div className="save-button-container-header">
                <div className="select-container-pin-builder">Select</div>
                <div className="select-container-angle-down">
                  <i className="fa-solid fa-angle-down"></i>
                </div>
                <div>
                  <button>Save</button>
                </div>
              </div>
            </div>
          </div>
          <div className="center-pin-builder-details">
            <div className="left-drag-and-drop-upload">
              <div className="drag-and-drop-upload-container">
                <div>drag and drop or click to upload</div>
              </div>
              <div className="save-from-site-button">
                <button>Save from site</button>
              </div>
            </div>
            <div className="right-pin-detail-fields">
              <div className="add-your-title-container">
                <input placeholder="Add your title"></input>
              </div>
              <div className="profile-pic-username-container">
                <div className="profile-pic-container-pin-builder">
                  <img src="https://i.pinimg.com/564x/49/40/6b/49406b58f4a68552f26d0c6e4a14c0d2.jpg"></img>
                </div>
                <div>
                  <span>Username</span>
                </div>
              </div>
              <div className="pin-about-container-pin-builder">
                <input placeholder="Tell everyone what your Pin is about"></input>
              </div>
              <div className="add-alt-text-button">
                <button>Add alt text</button>
              </div>
              <div className="add-destination-link-container">
                <input placeholder="Add a destination link"></input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PinBuilder;
