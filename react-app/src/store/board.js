// Constants
const LOAD_ALL_BOARDS = "boards/loadAllBoards";
const LOAD_USER_BOARDS = "boards/loadUserBoards";

// Actions
export const getAllBoards = (data) => {
  return {
    type: LOAD_ALL_BOARDS,
    boards: data,
  };
};

export const getUserBoards = (data) => {
  return {
    type: LOAD_USER_BOARDS,
    boards: data,
  };
};

// Thunks

export const fetchUserBoards = (profileId) => async (dispatch) => {
  const response = await fetch(`/api/profile/${profileId}/boards`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getUserBoards(data));
    return data;
  }
};

// Reducer
const initialState = { allBoards: {}, userBoards: {}, profileBoards: {} };

const boardReducer = (state = initialState, action) => {
  let boardStateObj = { ...state };
  switch (action.type) {
    case LOAD_ALL_BOARDS:
      boardStateObj.allBoards = action.boards;
      return boardStateObj;
    case LOAD_USER_BOARDS:
      boardStateObj.userBoards = action.boards;
      return boardStateObj;
    default:
      return state;
  }
};

export default boardReducer;
