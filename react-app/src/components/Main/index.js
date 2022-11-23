import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllPins } from "../../store/pin";
import "./mainpage.css";

const Main = () => {
  const dispatch = useDispatch();
  const allPins = useSelector((state) => Object.values(state.pins.allPins));
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    dispatch(fetchAllPins());
  }, []);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const randomHeight = () => {
    return 9 * Math.ceil(Math.random() * 3);
  };

  return (
    <>
      <div className="all-pins-main-container">
        {allPins &&
          allPins.map((pin) => (
            <div className="pin-container">
              <div>
                <img
                  src={pin.image}
                  style={{ height: `${randomHeight()}rem` }}
                ></img>
              </div>
              <div>{pin.title}</div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Main;
