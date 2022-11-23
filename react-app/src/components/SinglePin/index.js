import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { fetchAllPins, fetchSinglePin } from "../../store/pin";
import "./SinglePin.css";

const SinglePin = () => {
  const dispatch = useDispatch();
  const { pinId } = useParams();
  console.log(pinId);

  useEffect(() => {
    dispatch(fetchAllPins());
    dispatch(fetchSinglePin(pinId));
  }, []);

  return (
    <>
      <div className="main-pin-builder-page">
        <div className="main-pin-builder-container">
          <div className="single-pin-left-container">
            <img src=""></img>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePin;
