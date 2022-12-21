import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchAllPins } from "../../store/pin";
import { fetchAllProfiles } from "../../store/profile";
import "./mainpage.css";

const Main = () => {
  const dispatch = useDispatch();
  const allPins = useSelector((state) => Object.values(state.pins.allPins));
  const allProfiles = useSelector((state) => state.profiles.allProfiles);
  const user = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(async () => {
    dispatch(fetchAllPins());
    dispatch(fetchAllProfiles());
  }, []);

  const getProfilePic = (profileId) => {
    for (const profile in allProfiles) {
      if (profileId == profile) {
        if (!allProfiles[profile].profileImg) {
          return "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg";
        }
        return allProfiles[profile].profileImg;
      }
    }
  };

  return (
    <>
      <div className="main-container-parent">
        <div className="all-pins-main-container">
          {allPins &&
            allProfiles &&
            allPins.map((pin) => (
              <div className="pin-container">
                <NavLink
                  to={`/pins/${pin.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div>
                    <img
                      src={pin.image}
                      className="pin-container-main-img"
                    ></img>
                  </div>
                  <div className="pin-creator-details-container">
                    <img
                      src={getProfilePic(pin.profileId)}
                      alt="pin"
                      className="pin-container-profile-img"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg";
                      }}
                    />
                    {pin.title}
                  </div>
                </NavLink>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Main;
