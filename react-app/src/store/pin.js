// Constants
const LOAD_ALL_PINS = "pins/loadAllPins";

// Actions
export const getAllPins = (data) => {
  return {
    type: LOAD_ALL_PINS,
    pins: data,
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

// Reducer

const initialState = { allPins: {}, singlePin: {} };

const pinsReducer = (state = initialState, action) => {
  let pinsStateObj = { ...state };
  switch (action.type) {
    case LOAD_ALL_PINS:
      pinsStateObj.allPins = action.pins;
      return pinsStateObj;
    default:
      return state;
  }
};

export default pinsReducer;
