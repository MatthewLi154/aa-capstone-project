import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { fetchAllPins, fetchSinglePin } from "../../store/pin";
import { fetchAllProfiles, fetchSingleProfile } from "../../store/profile";
import CreatedPins from "./CreatedPins";
import "./ProfilePage.css";

const ProfilePage = () => {
  const dispatch = useDispatch();

  const { profileId } = useParams();
  const currentProfileId = useSelector((state) => state.session.user.id);
  const currentProfile = useSelector((state) => state.profiles.singleProfile);

  useEffect(() => {
    dispatch(fetchAllProfiles());
    dispatch(fetchSingleProfile(profileId));
  }, []);

  let yourPage = false;
  if (parseInt(profileId) === currentProfileId) {
    yourPage = true;
  }

  return (
    <>
      <div className="main-profile-information-container">
        <div className="main-profile-information-sub-container">
          <img src={currentProfile.profile_img}></img>
          <div className="main-profile-name-container">
            {currentProfile.first_name} {currentProfile.last_name}
          </div>
          <div className="handle-and-pronouns-container">
            @{currentProfile.username} · {currentProfile.pronouns}
          </div>
          <div>{currentProfile.website}</div>
          <div>
            <button>Edit Profile</button>
          </div>
        </div>
        <CreatedPins />
      </div>
    </>
  );
};

export default ProfilePage;
