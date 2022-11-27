// Constants
const LOAD_ALL_BOARDS = "boards/loadAllBoards";
const LOAD_USER_BOARDS = "boards/loadUserBoards";
const LOAD_BOARD_PINS = "boards/loadBoardPins";

// Actions
export const getAllBoards = (data, boardId) => {
  return {
    type: LOAD_ALL_BOARDS,
    pins: data,
    id: boardId,
  };
};

export const getUserBoards = (data) => {
  return {
    type: LOAD_USER_BOARDS,
    boards: data,
  };
};

export const getBoardPins = (data) => {
  return {
    type: LOAD_BOARD_PINS,
    pins: data,
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

export const fetchUserBoardPins = (profileId) => async (dispatch) => {
  const response = await fetch(`/api/boards/profile/${profileId}/pins`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getBoardPins(data));
    return data;
  }
};
// Reducer
const initialState = {
  allBoards: {},
  userBoards: {},
  profileBoards: {},
  boardPins: {},
};

const boardReducer = (state = initialState, action) => {
  let boardStateObj = { ...state };
  switch (action.type) {
    case LOAD_ALL_BOARDS:
      boardStateObj.allBoards = action.boards;
      return boardStateObj;
    case LOAD_USER_BOARDS:
      boardStateObj.userBoards = action.boards;
      return boardStateObj;
    case LOAD_BOARD_PINS:
      boardStateObj.boardPins = action.pins;
      return boardStateObj;
    default:
      return state;
  }
};

export default boardReducer;
