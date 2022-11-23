import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { fetchAllPins, fetchSinglePin } from "../../store/pin";
import "./SinglePin.css";

const SinglePin = () => {
  const dispatch = useDispatch();
  const { pinId } = useParams();
  const currentPin = useSelector((state) => state.pins.singlePin);

  console.log(currentPin);

  useEffect(() => {
    dispatch(fetchAllPins());
    dispatch(fetchSinglePin(pinId));
  }, []);

  return (
    <>
      <div className="main-single-pin-page">
        <div className="main-single-pin-container">
          <div className="single-pin-left-container">
            <img src={currentPin.image}></img>
          </div>
          <div className="single-pin-right-container">
            <div className="single-pin-right-header">
              <div className="single-pin-header-left-icons">
                <i class="fa-solid fa-ellipsis"></i>
              </div>
              <div className="single-pin-header-save-button">
                <button>Save</button>
              </div>
            </div>
            <div className="single-pin-margin-left single-pin-destination-link">
              {currentPin.destination_link}
            </div>
            <div className="single-pin-margin-left single-pin-title">
              {currentPin.title}
            </div>
            <div className="single-pin-margin-left">{currentPin.about}</div>
            <div className="single-pin-margin-left single-pin-creator-details profile-pic-container-pin-builder main-creator-container">
              <div className="single-pin-creator-details">
                <img src="https://i.pinimg.com/564x/49/40/6b/49406b58f4a68552f26d0c6e4a14c0d2.jpg"></img>
                <div>username</div>
              </div>
              <div className="single-pin-creator-details">
                <button>Follow</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePin;
