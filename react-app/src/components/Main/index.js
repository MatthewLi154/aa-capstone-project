import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllPins } from "../../store/pin";
import "./mainpage.css";

const Main = () => {
  const dispatch = useDispatch();
  const allPins = useSelector((state) => Object.values(state.pins.allPins));

  useEffect(() => {
    dispatch(fetchAllPins());
  }, []);

  return (
    <>
      <div className="all-pins-main-container">
        {allPins &&
          allPins.map((pin) => (
            <div className="pin-container">
              <div>
                <img src={pin.image}></img>
              </div>
              <div>{pin.title}</div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Main;
