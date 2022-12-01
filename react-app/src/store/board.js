// Constants
const LOAD_ALL_BOARDS = "boards/loadAllBoards";
const LOAD_USER_BOARDS = "boards/loadUserBoards";
const LOAD_BOARD_PINS = "boards/loadBoardPins";
const ADD_BOARD = "boards/addBoard";
const DELETE_BOARD = "boards/deleteBoard";
const EDIT_BOARD = "boards/editBoard";
const ADD_PIN_TO_BOARD = "boards/addPinToBoard";
const DELETE_PIN_FROM_BOARD = "/boards/deletePinFromBoard";

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

export const addBoard = (data) => {
  return {
    type: ADD_BOARD,
    board: data,
  };
};

export const deleteBoard = (boardId) => {
  return {
    type: DELETE_BOARD,
    id: boardId,
  };
};

export const editBoard = (data, boardId) => {
  return {
    type: EDIT_BOARD,
    board: data,
    id: boardId,
  };
};

export const addPinToBoard = (data) => {
  return {
    type: ADD_PIN_TO_BOARD,
    boardPin: data,
  };
};

export const removePinFromBoard = (data) => {
  return {
    type: DELETE_PIN_FROM_BOARD,
    boardId: data.boardId,
    pinId: data.pinId,
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

export const createNewBoard = (data, profileId) => async (dispatch) => {
  const response = await fetch(`/api/profile/${profileId}/boards`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addBoard(data));
  }
};

export const deleteBoardById = (boardId) => async (dispatch) => {
  const response = await fetch(`/api/boards/${boardId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteBoard(boardId));
    return data;
  }
};

export const editBoardById = (data, boardId) => async (dispatch) => {
  const response = await fetch(`/api/boards/${boardId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(editBoard(data, boardId));
  }
};

export const addPinToBoardPins =
  (pinId, boardName, profileId) => async (dispatch) => {
    const response = await fetch(
      `/api/boards/${boardName}/pins/${pinId}/${profileId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pinId),
      }
    );

    // if (response.ok) {
    //   const data = await response.json();
    //   dispatch()
    // }
  };

export const deletePinFromBoard = (boardId, pinId) => async (dispatch) => {
  const response = await fetch(`/api/boards/${boardId}/pins/${pinId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(removePinFromBoard(data));
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
    case ADD_BOARD:
      boardStateObj.allBoards[action.board.id] = action.board;
      boardStateObj.userBoards[action.board.id] = action.board;
      boardStateObj.boardPins[action.board.id] = {};
      return boardStateObj;
    case EDIT_BOARD:
      boardStateObj.allBoards[action.id] = action.board;
      boardStateObj.userBoards[action.id] = action.board;
      return boardStateObj;
    case DELETE_BOARD:
      delete boardStateObj.allBoards[action.id];
      delete boardStateObj.userBoards[action.id];
      delete boardStateObj.boardPins[action.id];
      return boardStateObj;
    // case DELETE_PIN_FROM_BOARD:

    default:
      return state;
  }
};

export default boardReducer;
