import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { fetchUserBoardPins, fetchUserBoards } from "../../store/board";
import "./DeletePinsFromBoard.css";

const DeletePinsFromBoard = () => {
  const dispatch = useDispatch();
  const { profileId, boardId } = useParams();
  const boardPins = useSelector((state) => state.boards.boardPins);

  const userBoardPins = boardPins[boardId];
  const pins = [];
  for (const pin in userBoardPins) {
    pins.push(userBoardPins[pin]);
  }

  useEffect(() => {
    dispatch(fetchUserBoards(profileId));
    dispatch(fetchUserBoardPins(profileId));
  }, []);
  return (
    <>
      <div className="delete-pins-from-board-main-container">
        <h2>Select pins to delete</h2>
        <div className="delete-pins-from-board-header">
          <div className="organize-pins-container">
            {pins.map((pin) => (
              <div className="pin-container organize-pins">
                <img src={pin.image}></img>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DeletePinsFromBoard;
