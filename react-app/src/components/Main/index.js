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
  const [showMenu, setShowMenu] = useState(false);

  useEffect(async () => {
    dispatch(fetchAllPins());
    dispatch(fetchAllProfiles());
  }, []);

  const getProfilePic = (profileId) => {
    for (const profile in allProfiles) {
      console.log(allProfiles[profile]);
      if (profileId == profile) {
        return allProfiles[profile].profileImg;
      }
    }
  };

  return (
    <>
      <div>
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
                    ></img>
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
