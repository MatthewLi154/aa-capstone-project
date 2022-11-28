import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { fetchUserBoardPins, fetchUserBoards } from "../../store/board";
import "./DeletePinsFromBoard.css";

const DeletePinsFromBoard = () => {
  const dispatch = useDispatch();
  const { profileId, boardId } = useParams();
  const boardPins = useSelector((state) => state.boards.boardPins[boardId]);

  const boardPinsArr = [];
  for (const pin in boardPins) {
    boardPinsArr.push(boardPins[pin]);
  }

  console.log(boardPinsArr);

  useEffect(() => {
    dispatch(fetchUserBoards(profileId));
    dispatch(fetchUserBoardPins(profileId));
  }, []);
  return (
    <>
      <div className="delete-pins-from-board-main-container">
        <div className="delete-pins-from-board-header">
          <h2>Select pins to delete</h2>
        </div>
      </div>
    </>
  );
};

export default DeletePinsFromBoard;
