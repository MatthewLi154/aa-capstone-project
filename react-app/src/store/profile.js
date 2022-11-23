// Constants
const LOAD_ALL_PROFILES = "profiles/loadAllProfiles";
const LOAD_SINGLE_PROFILE = "profiles/loadSingleProfile";

// Actions
export const getAllProfiles = (data) => {
  return {
    type: LOAD_ALL_PROFILES,
    profiles: data,
  };
};

export const getSingleProfile = (data) => {
  return {
    type: LOAD_SINGLE_PROFILE,
    profile: data,
  };
};

// Thunks
export const fetchAllProfiles = () => async (dispatch) => {
  const response = await fetch("/api/profile");

  if (response.ok) {
    const data = await response.json();
    dispatch(getAllProfiles(data));
    return data;
  }
};

export const fetchSingleProfile = (profileId) => async (dispatch) => {
  const response = await fetch(`/api/profile/${profileId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getSingleProfile(data));
    return data;
  }
};

// Reducer
const initialState = { allProfiles: {}, singleProfile: {}, userProfile: {} };

const profileReducer = (state = initialState, action) => {
  let profileStateObj = { ...state };
  switch (action.type) {
    case LOAD_ALL_PROFILES:
      profileStateObj.allProfiles = action.profiles;
      return profileStateObj;
    case LOAD_SINGLE_PROFILE:
      profileStateObj.singleProfile = action.profile;
      return profileStateObj;
    default:
      return profileStateObj;
  }
};

export default profileReducer;
