import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchAllPins } from "../../store/pin";
import { fetchAllProfiles } from "../../store/profile";
import "./mainpage.css";

const Main = () => {
  const dispatch = useDispatch();
  const allPins = useSelector((state) => Object.values(state.pins.allPins));
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    dispatch(fetchAllPins());
    dispatch(fetchAllProfiles());
  }, []);

  const randomHeight = () => {
    return 9 * Math.ceil(Math.random() * 3);
  };

  return (
    <>
      <div className="all-pins-main-container">
        {allPins &&
          allPins.map((pin) => (
            <div className="pin-container">
              <NavLink to={`/pins/${pin.id}`}>
                <div>
                  <img
                    src={pin.image}
                    style={{ height: `${randomHeight()}rem` }}
                  ></img>
                </div>
                <div>{pin.title}</div>
              </NavLink>
            </div>
          ))}
      </div>
    </>
  );
};

export default Main;
