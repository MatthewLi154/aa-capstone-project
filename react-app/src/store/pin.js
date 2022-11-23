// Constants
const LOAD_ALL_PINS = "pins/loadAllPins";
const ADD_PIN = "pins/addPin";
const LOAD_PIN = "pins/loadPin";
const DELETE_PIN = "pins/deletePin";

// Actions
export const getAllPins = (data) => {
  return {
    type: LOAD_ALL_PINS,
    pins: data,
  };
};

export const addPin = (data) => {
  return {
    type: ADD_PIN,
    pin: data,
  };
};

export const getPin = (data) => {
  return {
    type: LOAD_PIN,
    pin: data,
  };
};

export const removePin = (data) => {
  return {
    type: DELETE_PIN,
    id: data,
  };
};

// Thunks
export const fetchAllPins = () => async (dispatch) => {
  const response = await fetch("/api/pins");

  if (response.ok) {
    const data = await response.json();
    dispatch(getAllPins(data));
    return data;
  }
};

export const fetchSinglePin = (pinId) => async (dispatch) => {
  const response = await fetch(`/api/pins/${pinId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getPin(data));
    return data;
  }
};

export const addNewPin = (pinData) => async (dispatch) => {
  const response = await fetch("/api/pins", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pinData),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addPin(data));
    return data;
  }
};

export const deletePin = (pinId) => async (dispatch) => {
  const response = await fetch(`/api/pins/${pinId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(removePin(pinId));
  }
};

// Reducer

const initialState = { allPins: {}, singlePin: {} };

const pinsReducer = (state = initialState, action) => {
  let pinsStateObj = { ...state };
  switch (action.type) {
    case LOAD_ALL_PINS:
      pinsStateObj.allPins = action.pins;
      return pinsStateObj;
    case ADD_PIN:
      pinsStateObj.singlePin = action.pin;
      pinsStateObj.allPins[action.pin.id] = action.pin;
      return pinsStateObj;
    case LOAD_PIN:
      pinsStateObj.singlePin = action.pin;
      return pinsStateObj;
    case DELETE_PIN:
      delete pinsStateObj.allPins[action.id];
      pinsStateObj.singlePin = {};
      return pinsStateObj;
    default:
      return state;
  }
};

export default pinsReducer;
